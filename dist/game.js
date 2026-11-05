(()=>{function De(r){let t=r>>>0;return function(){t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function yr(r,t,e){let n=Math.imul(r,374761393)^Math.imul(t,668265263)^Math.imul(e,2246822519);return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967296}var sh=r=>r*r*(3-2*r);function pn(r,t,e=0){let n=Math.floor(r),i=Math.floor(t),s=sh(r-n),a=sh(t-i),o=yr(n,i,e),l=yr(n+1,i,e),c=yr(n,i+1,e),h=yr(n+1,i+1,e);return(o+(l-o)*s+(c-o)*a+(o-l-c+h)*s*a)*2-1}function Cn(r,t,e=3,n=0){let i=0,s=.5,a=1,o=0;for(let l=0;l<e;l++)i+=s*pn(r*a,t*a,n+l*17),o+=s,s*=.5,a*=2.03;return i/o}var le=(r,t,e)=>r<t?t:r>e?e:r,ae=(r,t,e)=>r+(t-r)*e;function Ht(r,t,e){let n=le((e-r)/(t-r),0,1);return n*n*(3-2*n)}var xr=.008333333333333333,vr=2.5,Zt=98.5,Be=99.25,rt=[{id:"grounds",name:"Old Rolling Grounds",s:92,cost:0,base:10,eta:5.5,target:"5 s",after:null,layer:"base",blurb:"A short launch chute, exposed roots, and a gravel-bed bend."},{id:"waterfall",name:"Waterfall Run",s:80.7,cost:350,base:30,eta:16,target:"14\u201318 s",after:"grounds",layer:"base",blurb:"A rock chute to the route split. The primary creek-right route goes over the falls; the alternate route steps down on the left."},{id:"flatrocks",name:"Flat Rocks",s:73.6,cost:900,base:45,eta:23,target:"20\u201326 s",after:"waterfall",layer:"field",blurb:"The usual historical start: broad, low slabs with an undercut at the water. Its game placement on the Shelf route is approximate."},{id:"shelf",name:"Continental Shelf",s:68,cost:1500,base:65,eta:31,target:"26\u201334 s",after:"waterfall",layer:"base",blurb:"A ledge along the creek\u2019s right side near the waterfall. A short exposed drop in the Folk Draft feeds the waterfall approach."},{id:"springs",name:"Crawfish Springs",s:54,cost:6500,base:120,eta:48,target:"42\u201352 s",after:"shelf",layer:"base",blurb:"A shaded spring pool above the Shelf, a double-pond runoff on the right bank, and a narrow rocky spillway."},{id:"alder",name:"Alder Bend",s:34,cost:22e3,base:220,eta:72,target:"60\u201374 s",after:"springs",layer:"base",blurb:"An undercut bank, a split around a gravel island, then the open Clearing before the Springs."},{id:"gorge",name:"Upper Gorge",s:0,cost:75e3,base:400,eta:100,target:"85\u2013105 s",after:"alder",layer:"base",blurb:"Two steep rock steps and a short stretch of whitewater above Alder Bend."},{id:"slate",name:"Slate Steps",s:-16,cost:14e4,base:620,eta:110,target:"100\u2013120 s",after:"gorge",layer:"game",blurb:"Three irregular slabs and shallow pocket pools. A fast roll can bounce out; a clean line glances off the slabs."},{id:"willow",name:"Willow Narrows",s:-34,cost:23e4,base:850,eta:128,target:"118\u2013138 s",after:"slate",layer:"game",blurb:"A fast pinch between roots. Balls bunch at the exit, so feeder speed only helps once the pinch is fixed."},{id:"splitstone",name:"Splitstone Fork",s:-56,cost:365e3,base:1140,eta:147,target:"135\u2013158 s",after:"willow",layer:"game",blurb:"A direct rocky lane and a longer calm lane around an island. Both rejoin before Willow Narrows."},{id:"longeddy",name:"Long Eddy Basin",s:-78,cost:56e4,base:1500,eta:166,target:"153\u2013179 s",after:"splitstone",layer:"game",blurb:"A wide bend with a visible recirculation and a fast tongue of water near the outside bank."},{id:"spillway",name:"Spillway Falls",s:-102,cost:83e4,base:1950,eta:189,target:"174\u2013204 s",after:"longeddy",layer:"game",blurb:"A 3.2 m waterfall onto a rock apron and a deep pool."},{id:"sluice",name:"Boulder Sluice",s:-126,cost:122e4,base:2550,eta:212,target:"196\u2013228 s",after:"spillway",layer:"game",blurb:"Staggered rocks in two lanes around a rock rib, recombining at a gravel bar."},{id:"coldspring",name:"Cold Spring Headwaters",s:-148,cost:18e5,base:3300,eta:238,target:"220\u2013255 s",after:"sluice",layer:"game",blurb:"The top of the creek: a calm spring pool narrowing into a steep outflow."}],Ke=Object.fromEntries(rt.map((r,t)=>[r.id,t])),mu=[{s:90.3,name:"Waterfall route merge"},{s:50.6,name:"Alder island rejoin"},{s:-40,name:"Splitstone rejoin"},{s:-107.6,name:"Sluice gravel bar"}];function rh(r){let t=rt[r].s,e=[];for(let n of rt)n.s>t+.01&&e.push(n.s);for(let n of mu)n.s>t+.01&&e.push(n.s);return e.sort((n,i)=>n-i),[...new Set(e)]}var Re=[{id:"grounds",name:"Old Rolling Grounds",s0:92,s1:99.3,cap:26},{id:"waterfall",name:"Waterfall Run",s0:80.7,s1:92,cap:34},{id:"shelf",name:"Continental Shelf",s0:68,s1:80.7,cap:34},{id:"springs",name:"Crawfish Springs",s0:54,s1:68,cap:46},{id:"alder",name:"Alder Bend & the Clearing",s0:34,s1:54,cap:50},{id:"gorge",name:"Upper Gorge",s0:0,s1:34,cap:70},{id:"slate",name:"Slate Steps",s0:-16,s1:0,cap:34},{id:"willow",name:"Willow Narrows",s0:-34,s1:-16,cap:34,capStock:16,capFix:"willowFlare"},{id:"splitstone",name:"Splitstone Fork",s0:-56,s1:-34,cap:50},{id:"longeddy",name:"Long Eddy Basin",s0:-78,s1:-56,cap:50},{id:"spillway",name:"Spillway Falls",s0:-102,s1:-78,cap:50},{id:"sluice",name:"Boulder Sluice",s0:-126,s1:-102,cap:50},{id:"coldspring",name:"Cold Spring Headwaters",s0:-152,s1:-126,cap:50}];function Vs(r){for(let t=0;t<Re.length;t++)if(r>=Re[t].s0&&r<Re[t].s1)return t;return r>=99.3?0:Re.length-1}var Ze=[{id:"standard",name:"Standard",area:null,pct:0,felt:[1,1,1],tag:"STD",note:"The current ball with your installed upgrades."},{id:"dryweave",name:"Dry-Weave",area:"shelf",pct:.04,felt:[1.12,1.1,1.25],tag:"DRY",note:"Repels water and sheds its wake sooner. Slightly less grip on dry wood. +4% of route base."},{id:"softcore",name:"Soft-Core",area:"springs",pct:.06,felt:[1.15,.86,.55],tag:"SOFT",note:"Takes more energy out of hard bounces. Rolls a little slower through shallow dry stretches. +6% of route base."},{id:"cleanseam",name:"Clean-Seam",area:"alder",pct:.08,felt:[.78,1.08,.7],tag:"SEAM",note:"Much less low-speed wobble. No change to buoyancy. +8% of route base."},{id:"rapids",name:"Rapids Felt",area:"slate",pct:.1,felt:[.72,.82,.45],tag:"RAPID",note:"Keeps traction on wet rock. Its rougher finish adds drag in long calm pools. +10% of route base."},{id:"select",name:"Workshop Select",area:"splitstone",pct:.14,felt:[1.18,.98,.5],tag:"SEL",note:"Measured quality sorting for steadier travel times. 15% longer to make. +14% of route base."}],uo=Object.fromEntries(Ze.map((r,t)=>[r.id,t]));function Ws(r,t){let e=Ze[t]||Ze[0];return Math.floor(r*e.pct+.5)}var Xn=[{id:"dry",name:"Dry Delivery",recipe:"dryweave",minSite:"springs",target:20,bonus:30,opens:"springs",text:"Dry-Weave from Crawfish Springs or farther"},{id:"soft",name:"Norway-Style Soft Landing",recipe:"softcore",minSite:"gorge",target:35,bonus:70,opens:"gorge",text:"Soft-Core from Upper Gorge or farther"},{id:"slatebatch",name:"Slate Test Batch",recipe:null,onlySite:"slate",target:50,bonus:105,opens:"slate",text:"Any recipe launched from Slate Steps"},{id:"cleanrun",name:"Clean-Seam Run",recipe:"cleanseam",minSite:"willow",target:65,bonus:130,opens:"willow",text:"Clean-Seam from Willow Narrows or farther"},{id:"twopost",name:"Two-Post Service",recipe:null,twoPosts:!0,target:80,bonus:165,perPostCap:50,opens:"willow",text:"Deliveries from two launches you pick, at least 30 from each"},{id:"basin",name:"Basin Batch",recipe:"select",minSite:"longeddy",target:100,bonus:230,opens:"longeddy",text:"Workshop Select from Long Eddy Basin or farther"},{id:"rapidship",name:"Rapids Shipment",recipe:"rapids",minSite:"spillway",target:125,bonus:290,opens:"spillway",text:"Rapids Felt from Spillway Falls or farther"},{id:"ncnhead",name:"New Creek Nation Headwater Batch",recipe:null,onlySite:"coldspring",target:150,bonus:425,opens:"coldspring",text:"Any recipe launched from Cold Spring Headwaters"}],ah=[{id:"factory",name:"Factory"},{id:"logistics",name:"Logistics"},{id:"creek",name:"Creek"},{id:"balls",name:"Balls"},{id:"finish",name:"Finish"},{id:"controls",name:"Controls"}],Ae="site",Li=[{id:"press",tab:"factory",scope:Ae,name:"Auto Press",price:25,requires:[],effect:"Makes one ball every 3 s and adds an eight-ball hopper."},{id:"feeder",tab:"factory",scope:Ae,name:"Auto Feeder",price:45,requires:["press"],effect:"Launches one queued ball every 2.5 s when the chute is clear."},{id:"quickMold",tab:"factory",scope:Ae,name:"Quick Mold",price:95,requires:["press"],effect:"Press interval 3 s \u2192 2.2 s. The brass mold opens faster."},{id:"lowFriction",tab:"factory",scope:Ae,name:"Low-Friction Chute",price:140,requires:["feeder"],effect:"Feeder interval 2.5 s \u2192 1.8 s. Launch speed spread \xB122% \u2192 \xB17%."},{id:"hopperExt",tab:"factory",scope:Ae,name:"Hopper Extension",price:240,requires:["press"],effect:"Hopper storage 8 \u2192 20 balls to hold a reserve during blockages."},{id:"twinPress",tab:"factory",scope:Ae,name:"Twin Press",price:650,requires:["quickMold"],effect:"Adds a second press head. Combined production 2.2 s \u2192 1.55 s per ball."},{id:"indexed",tab:"factory",scope:Ae,name:"Indexed Feeder",price:850,requires:["lowFriction"],effect:"Rotating pocket wheel. Release interval 1.8 s \u2192 1.3 s."},{id:"servo",tab:"factory",scope:Ae,name:"Servo Drive",price:3200,requires:["twinPress"],effect:"Twin Press interval 1.55 s \u2192 1.15 s."},{id:"bulkHopper",tab:"factory",scope:Ae,name:"Bulk Hopper",price:4500,requires:["hopperExt"],effect:"Hopper storage 20 \u2192 40 balls, with a visible fill gauge."},{id:"turbo",tab:"factory",scope:Ae,name:"Turbo Line",price:18e3,requires:["servo","indexed"],effect:"Press and feeder both run at one ball every 0.85 s (felt handling permitting)."},{id:"batchCounter",tab:"factory",scope:Ae,name:"Batch Counter",price:1200,requires:["press"],effect:"A physical counter for balls made by recipe, showing actual press output per minute."},{id:"infeedTray",tab:"factory",scope:Ae,name:"Infeed Tray",price:3800,requires:["press"],effect:"A small buffer before the press. Recipe changeover 6 s \u2192 2 s."},{id:"fastFelt",tab:"factory",scope:Ae,name:"Fast Felt Table",price:9e3,requires:["press"],effect:"Felt processing 0.9 s \u2192 0.55 s per ball. Does not speed up the press itself."},{id:"bankWorkshop",tab:"factory",name:"Bank Workshop",price:18e3,requires:[],area:"alder",effect:"A fixed supply yard at Alder Bend with one transfer route for surplus balls."},{id:"shapeGauge",tab:"factory",scope:Ae,name:"Inline Shape Gauge",price:28e3,requires:["press"],effect:"Sends unusually wobbly balls back to the press before launch: steadier runs, a little less output. Has an on/off switch."},{id:"parallelFelt",tab:"factory",scope:Ae,name:"Parallel Felt Station",price:88e3,requires:["fastFelt"],requiresGlobal:["bankWorkshop"],effect:"A second felt station: felt handling 0.55 s \u2192 0.28 s effective."},{id:"continuousPress",tab:"factory",scope:Ae,name:"Continuous Press",price:21e4,requires:["turbo","parallelFelt"],effect:"Press interval 0.85 s \u2192 0.5 s. The feeder, post and creek can still limit launches."},{id:"secondPost",tab:"logistics",name:"Second Supply Route",price:24e3,requires:["bankWorkshop"],effect:"The workshop can supply two factories at once."},{id:"silos",tab:"logistics",name:"Staging Silos",price:36e3,requires:["bankWorkshop"],effect:"Each launch post holds 12 more delivered balls, so long cart cycles leave fewer gaps."},{id:"doubleDeck",tab:"logistics",name:"Double-Deck Tray Cart",price:55e3,requires:["bankWorkshop"],effect:"Carts carry 12 balls a trip instead of 6. Both trays fill visibly."},{id:"passingLoop",tab:"logistics",name:"Passing Loop",price:105e3,requires:["bankWorkshop"],effect:"Two carts can pass on the busy bank segment instead of one waiting."},{id:"thirdPost",tab:"logistics",name:"Third Supply Route",price:145e3,requires:["secondPost"],area:"slate",effect:"The workshop can supply three factories at once."},{id:"prioritySwitch",tab:"logistics",name:"Priority Switch",price:195e3,requires:["bankWorkshop"],effect:"A loading switch that can reserve a minimum share of transfers for one chosen factory."},{id:"fastLift",tab:"logistics",name:"Fast Bank Lift",price:31e4,requires:["doubleDeck"],effect:"Loading and unloading on the steepest deliveries 4 s \u2192 1.5 s."},{id:"rootRail",tab:"creek",name:"Root Bend Rail",price:75,requires:[],area:"grounds",spot:"root",effect:"Rail across the gap under the exposed root at Old Rolling Grounds so balls cannot wedge there."},{id:"gravelMat",tab:"creek",name:"Gravel Run Mat",price:120,requires:[],area:"grounds",spot:"gravel",effect:"Rubber mat over the roughest gravel patch. Removes random slowdowns there."},{id:"splashGuard",tab:"creek",name:"Splash Guard",price:280,requires:[],area:"waterfall",spot:"lip",effect:"Side boards at the waterfall lip turn balls that glance off the lip rocks back into the centre, away from the side notches."},{id:"poolGuide",tab:"creek",name:"Pool Guide",price:525,requires:[],area:"waterfall",spot:"pool",effect:"Floating boom on the outside of the plunge pool keeps balls out of its slow eddy."},{id:"catchRamp",tab:"creek",name:"Shelf Catch Ramp",price:1100,requires:[],area:"shelf",spot:"catch",effect:"Ramp under the Shelf drop that receives falling balls and sends them into the waterfall approach."},{id:"debrisScreen",tab:"creek",name:"Spring Debris Screen",price:2800,requires:[],area:"springs",spot:"springs",effect:"Screen that holds the drifting driftwood in the Springs pool out of the ball channel."},{id:"spillRail",tab:"creek",name:"Spillway Rail",price:3600,requires:[],area:"springs",spot:"spillway",effect:"Twin rails keep balls centred through the narrow spillway, away from the snag rocks."},{id:"alderBypass",tab:"creek",name:"Alder Bypass",price:8500,requires:[],area:"alder",spot:"island",effect:"Bank-side guide at the island split so balls skip the dead pocket and rejoin below the island."},{id:"landingBoards",tab:"creek",name:"Gorge Landing Boards",price:24e3,requires:[],area:"gorge",spot:"gorgeStep",effect:"Angled boards soften hard deflections at the first Gorge drop and keep balls in the main flow."},{id:"clearingArm",tab:"creek",name:"Automatic Clearing Arm",price:32e3,requires:[],area:"gorge",spot:"arm",effect:"Mechanical sweep at the Springs outlet returns stalled balls to the same channel. No cash, no skipped checkpoints."},{id:"slateBumpers",tab:"creek",name:"Slate Edge Bumpers",price:32e3,requires:[],area:"slate",spot:"slateEdge",effect:"Returns sideways deflections on the first slab to the main channel."},{id:"slateOutlet",tab:"creek",name:"Slate Pool Outlet",price:43e3,requires:[],area:"slate",spot:"slatePool",effect:"Opens a low outlet lip that cuts the time balls spend in the second pocket pool."},{id:"willowShield",tab:"creek",name:"Willow Root Shield",price:65e3,requires:[],area:"willow",spot:"willowRoot",effect:"Covers the snagging gap at the inside root without narrowing the main flow."},{id:"willowFlare",tab:"creek",name:"Willow Exit Flare",price:82e3,requires:["willowShield"],area:"willow",spot:"willowExit",effect:"Removes the pinching root ends and flares the outlet, raising safe throughput at the pinch."},{id:"splitGate",tab:"creek",name:"Splitstone Gate",price:115e3,requires:[],area:"splitstone",spot:"splitGate",effect:"A real adjustable gate at the island tip: Direct, Calm or Balanced."},{id:"splitMergeRail",tab:"creek",name:"Splitstone Merge Rail",price:15e4,requires:[],area:"splitstone",spot:"splitMerge",effect:"Guides the two lanes into a staggered merge and cuts head-on bumps."},{id:"basinBoom",tab:"creek",name:"Basin Float Boom",price:175e3,requires:[],area:"longeddy",spot:"basin",effect:"Redirects balls out of the strongest recirculation while leaving the eddy visible."},{id:"basinVane",tab:"creek",name:"Basin Flow Vane",price:205e3,requires:["basinBoom"],area:"longeddy",spot:"basinVane",effect:"Steers surface flow towards the fast tongue in the basin."},{id:"spillApron",tab:"creek",name:"Spillway Splash Apron",price:245e3,requires:[],area:"spillway",spot:"spillApron",effect:"Covers the apron rocks under Spillway Falls so landings stop scattering."},{id:"spillSkimmer",tab:"creek",name:"Spillway Pool Skimmer",price:29e4,requires:[],area:"spillway",spot:"spillPool",effect:"Sweeps stray balls along the edge of the pool towards the legal outlet."},{id:"sluiceAlternator",tab:"creek",name:"Sluice Alternator",price:35e4,requires:[],area:"sluice",spot:"sluiceSplit",effect:"Alternates balls into the two lanes when both are clear, and falls back to one when needed."},{id:"sluiceMerge",tab:"creek",name:"Sluice Merge Basin",price:415e3,requires:[],area:"sluice",spot:"sluiceMerge",effect:"A wider, calmer rejoin at the gravel bar that reduces backups."},{id:"headGuide",tab:"creek",name:"Headwater Surface Guide",price:525e3,requires:[],area:"coldspring",spot:"headPool",effect:"Pulls drifting balls out of the quiet spring margin into the outflow."},{id:"headRails",tab:"creek",name:"Headwater Intake Rails",price:64e4,requires:["headGuide"],area:"coldspring",spot:"headOutflow",effect:"Rails that keep spacing steady through the steep outflow."},{id:"draftRibbon",tab:"creek",lore:!0,name:"Shelf Draft Ribbon",price:2400,requires:[],area:"shelf",spot:"draft",effect:"A ribbon post and a map arrow showing the local downdraft. Logs how many balls drop into the lower catch area."},{id:"windScreen",tab:"creek",lore:!0,name:"Shelf Wind Screen",price:9500,requires:[],area:"shelf",spot:"windScreen",effect:"Breaks the downdraft along the protected launch lane and cuts sideways spill from gusts. The open Shelf still shows the Draft."},{id:"springsSampler",tab:"creek",lore:!0,name:"Springs Bank Sampler",price:12e3,requires:[],area:"springs",spot:"sampler",effect:"A sampling post. Its panel separates Code Rot observations, normal current and Draft exposure, and names the lane slowing production."},{id:"habitatBypass",tab:"creek",lore:!0,name:"Crayfish Habitat Bypass",price:22e3,requires:[],area:"springs",spot:"habitat",effect:"A raised guide around the habitat edge that rejoins at the spillway. Keeps balls out of the Code Rot pocket and the crayfish area."},{id:"branchSweeper",tab:"creek",lore:!0,name:"Norway-Style Branch Sweeper",price:35e3,requires:[],area:"alder",spot:"sweeper",effect:"A pivoting branch, inspired by the Norway Cavern recovery, returns stalled factory balls at Alder Bend to the same lane."},{id:"leafGrate",tab:"creek",lore:!0,name:"Leaf-Cavern Grate",price:48e3,requires:[],area:"slate",spot:"leafPocket",effect:"A guard over a fictional leaf-covered pocket at Slate Steps that otherwise traps balls."},{id:"premiumFelt",tab:"balls",scope:Ae,name:"Premium Felt",price:180,requires:[],effect:"New balls get a blue band and +$5 on their finish payout."},{id:"cores",tab:"balls",scope:Ae,name:"Consistent Cores",price:380,requires:[],effect:"Rounder cores: low-speed wobble reduced by about 70%."},{id:"seamPress",tab:"balls",scope:Ae,name:"Seam Press",price:900,requires:["cores"],effect:"Even seams: launch-to-launch speed and aim variation reduced by about 75%."},{id:"waterResist",tab:"balls",scope:Ae,name:"Water-Resistant Felt",price:2100,requires:["premiumFelt"],effect:"Water uptake cut by 75%. Balls stay lighter and ride higher through the plunge pool."},{id:"reinforced",tab:"balls",scope:Ae,name:"Reinforced Core",price:5200,requires:["seamPress"],effect:"Bounce after hard drops becomes consistent (restitution spread \xB10.13 \u2192 \xB10.03)."},{id:"batchStamp",tab:"balls",scope:Ae,name:"Finished Batch Stamp",price:9500,requires:["waterResist"],effect:"Readable production stamp and a +$25 finish bonus on new balls."},{id:"replicaJig",tab:"balls",scope:Ae,lore:!0,name:"Archive Replica Stencil Jig",price:75e3,requires:[],requiresGlobal:["bankWorkshop"],effect:"Opt-in cosmetic markings based on archived competitors, marked Replica. The recipe still sets handling and payout."},{id:"ncnStamp",tab:"balls",scope:Ae,lore:!0,name:"New Creek Nation Batch Stamp",price:125e3,requires:[],requiresGlobal:["bankWorkshop"],area:"slate",effect:"A stamping station that gives this factory\u2019s balls an NCN production number and shows made and finished counts per batch."},{id:"wideBasket",tab:"finish",name:"Wide Catch Basket",price:200,requires:[],effect:"Basket room 6 \u2192 14 balls and settling time 1.6 s \u2192 0.9 s, so the exit clears faster."},{id:"timingGate",tab:"finish",name:"Timing Gate",price:800,requires:[],effect:"In-world board: last finish time, balls per minute, and average travel time from the selected start."},{id:"spacingSensor",tab:"finish",scope:Ae,name:"Spacing Sensor",price:4e3,requires:["feeder"],effect:"Replaces this feeder\u2019s 1.25 s / 1 m landing buffer with a sensor that releases at the earliest safe moment."},{id:"conveyor",tab:"finish",name:"Automatic Basket Conveyor",price:14e3,requires:["wideBasket"],effect:"Empties the basket continuously (0.3 s per ball) and stacks finished balls in a crate."},{id:"laneMarkers",tab:"finish",name:"Gate Lane Markers",price:12e3,requires:[],effect:"Paints both catch approaches and shows the last arrival time on each side of the gate."},{id:"splitTray",tab:"finish",name:"Split Catch Tray",price:45e3,requires:[],effect:"Two catch positions just past the same payout plane: twice the room, faster settling."},{id:"poweredBelt",tab:"finish",name:"Powered Return Belt",price:78e3,requires:["conveyor"],effect:"Clears caught balls 0.3 s \u2192 0.2 s each."},{id:"overflowCrate",tab:"finish",name:"Overflow Crate",price:11e4,requires:[],effect:"Buffers up to 40 caught balls during clustered arrivals and drains automatically."},{id:"twinPacking",tab:"finish",name:"Twin Packing Conveyor",price:175e3,requires:["poweredBelt"],effect:"Clearing 0.2 s \u2192 0.12 s per ball at high throughput."},{id:"stacker",tab:"finish",name:"Production Stacker",price:255e3,requires:[],effect:"Paid balls collect in crates by recipe and clear in batches. No extra payout."},{id:"industrialCatch",tab:"finish",name:"Industrial Catch Station",price:39e4,requires:["splitTray","twinPacking"],effect:"Automates both catch approaches: clearing 0.06 s per ball for the full industrial line."},{id:"flowMonitor",tab:"controls",name:"Flow Monitor",price:950,requires:[],area:"shelf",effect:"Shows balls in flight and average delay for every reach, and which reach is holding back the line."},{id:"splitTimers",tab:"controls",name:"Split Timers",price:4800,requires:["timingGate"],effect:"Section-by-section times for the selected start or the ball you follow."},{id:"pressureAlerts",tab:"controls",name:"Pressure Alerts",price:16e3,requires:[],effect:"Points to the first queue slowing the line and links straight to it on the map."},{id:"autoGap",tab:"controls",name:"Automatic Gap Tuning",price:7e4,requires:[],effect:"Adjusts feeder spacing within safe limits from real downstream congestion. Manual override per site."},{id:"batchScheduler",tab:"controls",name:"Batch Scheduler",price:12e4,requires:[],effect:"Queues up to three recipe batches per factory and switches as each target is made."},{id:"routePresets",tab:"controls",name:"Route Presets",price:185e3,requires:[],effect:"Saves and restores up to five sets of feeder settings, transfer priorities and gate settings, with a preview."},{id:"efficiencyBench",tab:"controls",name:"Efficiency Bench",price:275e3,requires:[],effect:"Compares two finished measurement windows: finish rate, escape rate, average delay and cash per minute."}],ze=Object.fromEntries(Li.map(r=>[r.id,r])),sn=r=>ze[r]?.scope==="site",Ce={PREMIUM:1,CORES:2,SEAM:4,WATER:8,REINFORCED:16,STAMP:32,NCN:64,REPLICA:128};function oh(r){let t=0;return r.has("premiumFelt")&&(t|=Ce.PREMIUM),r.has("cores")&&(t|=Ce.CORES),r.has("seamPress")&&(t|=Ce.SEAM),r.has("waterResist")&&(t|=Ce.WATER),r.has("reinforced")&&(t|=Ce.REINFORCED),r.has("batchStamp")&&(t|=Ce.STAMP),r.has("ncnStamp")&&(t|=Ce.NCN),t}function qs(r){return(r&Ce.PREMIUM?5:0)+(r&Ce.STAMP?25:0)}function _r(r){let t=3;r.has("quickMold")&&(t=2.2),r.has("twinPress")&&(t=1.55),r.has("servo")&&(t=1.15),r.has("turbo")&&(t=.85),r.has("continuousPress")&&(t=.5);let e=2.5;r.has("lowFriction")&&(e=1.8),r.has("indexed")&&(e=1.3),r.has("turbo")&&(e=.85),r.has("continuousPress")&&(e=.5);let n=.9;r.has("fastFelt")&&(n=.55),r.has("parallelFelt")&&(n=.28);let i=8;r.has("hopperExt")&&(i=20),r.has("bulkHopper")&&(i=40);let s=r.has("infeedTray")?2:6;return{press:t,feeder:e,felt:n,hopper:i,changeover:s,cycle:Math.max(t,n)}}function fo(r){let t=r.has("wideBasket")?14:6,e=1.6;r.has("wideBasket")&&(e=.9),r.has("conveyor")&&(e=.3),r.has("poweredBelt")&&(e=.2),r.has("twinPacking")&&(e=.12),r.has("splitTray")&&(t*=2,e*=.7),r.has("industrialCatch")&&(e=Math.min(e,.06));let n=r.has("overflowCrate")?40:0;return{basketCap:t,drain:e,overflow:n}}var Wt=-152,Ie=108,Qi=-10,gu=10,qe=.05,Di=.04,ts=.25,gt={GRAVEL:0,ROCK:1,SAND:2,DIRT:3,MAT:4,WOOD:5,METAL:6,RUBBER:7},mo=[{e:.42,mu:.6,crr:.05,bump:.05,name:"gravel"},{e:.72,mu:.5,crr:.015,bump:.015,name:"rock"},{e:.28,mu:.7,crr:.08,bump:.008,name:"sand"},{e:.32,mu:.8,crr:.1,bump:.03,name:"dirt"},{e:.4,mu:.55,crr:.006,bump:0,name:"mat"},{e:.55,mu:.4,crr:.012,bump:.004,name:"wood"},{e:.6,mu:.3,crr:.008,bump:0,name:"metal"},{e:.35,mu:.6,crr:.02,bump:0,name:"rubber"}],be=gt.GRAVEL,st=gt.ROCK,Ne=gt.SAND,Xt=gt.DIRT,br=[[-152,.9,.9,.5,0,.54,.5,.5,1.2,.01,.05,Ne,Xt],[-146,1.15,1.15,.62,.25,.54,.5,.55,1.2,.01,.05,Ne,Xt],[-140.5,.85,.85,.42,0,.76,.6,.6,1,.01,.07,Ne,Xt],[-138,.26,.26,.13,0,1.59,.8,.8,.5,.02,.16,st,st],[-129.5,.26,.26,.12,.2,1.98,.9,.9,.5,.025,.24,st,st],[-126,.4,.4,.15,0,1.76,.7,.7,.6,.03,.16,st,st],[-121.5,.72,.72,.15,0,1.62,.7,.7,.6,.03,.18,st,st],[-111,.72,.72,.15,0,1.62,.6,.6,.6,.03,.18,st,st],[-108.6,.62,.62,.1,0,1.23,.4,.4,.8,.015,.1,be,Xt],[-105.5,.42,.42,.15,0,1.62,.5,.5,.7,.02,.12,be,Xt],[-102,.36,.36,.14,0,1.57,.8,.8,.5,.025,.14,st,st],[-91.1,.3,.3,.12,0,2.18,1,1,.45,.02,.14,st,st],[-90.88,.7,.7,1,0,.69,1.4,1.4,.45,.02,.3,Ne,st],[-87.6,.66,.66,.6,0,.87,1,1,.5,.015,.2,Ne,st],[-85.2,.4,.4,.15,0,1.46,.6,.6,.7,.02,.12,be,Xt],[-78,.42,.42,.16,0,1.76,.5,.5,.8,.015,.1,be,Xt],[-73,1,.85,.36,.55,1.23,.45,.6,.9,.012,.12,Ne,Xt],[-67.5,1.25,.95,.42,.85,1.1,.45,.65,.9,.012,.12,Ne,Xt],[-62.5,.62,.6,.25,.3,1.49,.45,.5,.9,.012,.1,be,Xt],[-56,.42,.42,.15,0,2.1,.5,.5,.8,.02,.12,st,Xt],[-51.5,.8,.72,.16,-.15,1.96,.5,.5,.8,.025,.14,st,Xt],[-46.5,1.55,.72,.18,-.4,1.81,.5,.6,.8,.025,.14,st,Xt],[-41.8,.95,.7,.16,-.2,1.96,.5,.5,.8,.02,.12,st,Xt],[-38.6,.42,.42,.15,0,2.1,.5,.5,.8,.02,.1,be,Xt],[-34,.45,.45,.16,0,1.45,.5,.5,.8,.015,.1,be,Xt],[-27.2,.3,.3,.15,0,1.55,.6,.6,.6,.02,.15,be,Xt],[-25.4,.15,.15,.14,0,1.65,.6,.6,.5,.02,.2,st,Xt],[-23.4,.15,.15,.14,0,1.65,.6,.6,.5,.02,.2,st,Xt],[-22.5,.62,.62,.3,0,.7,.5,.5,.8,.015,.12,Ne,Xt],[-19.6,.4,.4,.15,0,1.35,.5,.5,.8,.015,.1,be,Xt],[-16,.5,.5,.12,0,1.32,.7,.7,.6,.015,.1,st,st],[-12.62,.55,.55,.07,0,1.57,.7,.7,.6,.012,.1,st,st],[-12.38,.6,.6,.3,0,.68,.5,.5,.6,.015,.22,Ne,st],[-11,.5,.5,.1,0,1.36,.6,.6,.6,.012,.1,st,st],[-9.12,.5,.5,.07,0,1.57,.6,.6,.6,.012,.1,st,st],[-8.88,.66,.66,.32,0,.53,.5,.5,.6,.015,.2,Ne,st],[-7.2,.5,.5,.1,0,1.36,.6,.6,.6,.012,.1,st,st],[-5.72,.5,.5,.07,0,1.57,.6,.6,.6,.012,.1,st,st],[-5.48,.55,.55,.28,0,.72,.6,.6,.6,.015,.2,Ne,st],[-3.2,.38,.38,.12,0,1.3,1.2,1.2,.45,.03,.1,st,st],[0,.34,.34,.11,0,1.35,1.25,1.25,.45,.03,.1,st,st],[8.9,.28,.28,.09,0,1.7,1.2,1.2,.45,.025,.12,st,st],[9.1,.5,.5,.36,0,.9,1,.22,.12,.02,.25,st,st],[10.6,.5,.45,.3,.05,1,1,.4,.3,.02,.18,st,st],[11.6,.33,.33,.12,.1,1.5,1.1,1.1,.45,.03,.12,st,st],[19.9,.28,.28,.09,0,1.75,1.2,1.2,.45,.025,.12,st,st],[20.1,.48,.48,.34,0,.9,1,1,.5,.02,.25,st,st],[21.4,.42,.42,.25,0,1.1,1,1,.5,.02,.2,st,st],[22.4,.27,.27,.11,0,1.95,1.1,1.1,.45,.04,.38,st,st],[29.5,.29,.29,.12,0,1.8,1,1,.45,.035,.32,st,st],[33,.38,.38,.15,0,1.15,.6,.6,.8,.02,.12,st,Xt],[34.5,.42,.42,.17,0,2.16,.45,.45,.9,.012,.08,be,Xt],[38,.48,.55,.24,.9,1.93,.42,.6,.9,.012,.08,be,Xt],[41.5,.45,.5,.2,.6,2.05,.42,.5,.9,.012,.08,be,Xt],[44.2,.62,.68,.18,.05,1.87,.4,.42,.9,.012,.08,be,Xt],[45.6,.78,1.05,.18,-.1,1.73,.4,.42,.9,.012,.08,be,Xt],[46.7,.8,1.3,.18,-.1,1.64,.42,.42,.9,.012,.08,be,Xt],[48,.75,1,.18,-.2,1.77,.42,.42,.9,.012,.08,be,Xt],[50.2,.48,.48,.2,-.3,2.1,.42,.42,.9,.012,.08,be,Xt],[51,.8,.9,.45,-.15,1,.25,.55,1.2,.012,.07,be,Xt],[52.4,.95,1,.6,0,.9,.25,.6,1.2,.012,.07,Ne,Xt],[53.5,.5,.5,.22,0,1.6,.35,.4,.9,.012,.08,be,Xt],[54.6,.62,.62,.3,0,1.08,.35,.35,1.2,.01,.08,Ne,Xt],[55.8,.98,.98,.55,.2,.8,.35,.35,1.2,.01,.1,Ne,Xt],[61,.92,.92,.5,.1,.85,.38,.38,1.2,.01,.1,Ne,Xt],[62.3,.4,.4,.2,0,.85,.5,.5,.5,.02,.12,st,st],[62.9,.12,.12,.1,.1,1.55,.6,.6,.35,.02,.18,st,st],[66.4,.12,.12,.1,1.2,1.6,.6,.6,.35,.02,.18,st,st],[67.3,.27,.27,.09,2,1.2,.5,.9,.4,.02,.12,st,st],[68,.27,.27,.075,2,1,-1.25,1.5,.16,.012,.08,st,st],[71.6,.27,.3,.075,2.1,1,-1.25,1.2,.2,.012,.08,st,st],[72.6,.27,.5,.1,2.15,.9,-1.25,.1,.35,.01,.08,st,st],[75,.27,.48,.1,2.2,.95,-1.25,.12,.35,.01,.08,st,st],[76,.26,.26,.07,2.2,1,-1.25,1.5,.16,.012,.08,st,st],[77.9,.26,.26,.07,1.6,1.15,-1.25,1.4,.16,.012,.1,st,st],[78.3,.28,.28,.07,1.4,1.2,-1.25,1.4,.16,.012,.1,st,st],[78.7,.36,.36,.17,1.25,1,.35,.45,.4,.02,.2,st,st],[79.6,.3,.3,.14,.75,1.6,.45,.5,.4,.025,.15,st,st],[80.7,.28,.28,.14,.2,1.8,.45,.5,.4,.025,.15,st,st],[85.25,.25,.25,.12,0,2.05,.5,.5,.4,.02,.12,st,st],[85.55,.25,.25,.12,0,2.1,.5,.5,.4,.02,.12,st,st],[85.9,.25,.25,.12,0,2.1,.5,.5,.4,.02,.12,st,st],[86.1,.42,.42,.9,0,.6,.14,.14,.06,.015,.3,Ne,Ne],[86.9,.5,.5,.8,0,.6,.18,.18,.08,.015,.25,Ne,Ne],[87.6,.65,.65,.7,0,.62,1,1,.4,.015,.22,Ne,st],[88.6,.8,.98,.45,0,.8,1,.8,.5,.015,.14,Ne,st],[90.5,.42,.42,.18,0,1.35,.4,.4,.8,.012,.08,be,Xt],[92,.4,.42,.06,0,1.74,.26,.3,.8,.01,.08,be,Xt],[93.6,.42,.45,.055,.15,1.74,.26,.28,.8,.01,.08,be,Xt],[95.3,.48,.42,.05,.55,1.79,.26,.3,.8,.012,.08,be,Xt],[97,.42,.42,.06,.2,1.85,.26,.28,.8,.01,.08,be,Xt],[98.5,.36,.36,.08,0,1.5,.25,.25,.8,.008,.06,be,Xt],[99.6,.42,.42,.14,0,.55,.25,.25,.8,.008,.04,be,Xt],[108,.45,.45,.18,0,.5,.25,.25,.8,.008,.04,be,Xt]],yu=[[-152,.002],[-138.3,.09],[-128.5,.035],[-108.6,.012],[-105.5,.03],[-91,0],[-86.8,.03],[-78,.006],[-61,.03],[-56,.028],[-38.6,.02],[-27.2,.045],[-22.6,.004],[-19.6,.025],[-16,.02],[-3.2,.045],[-5,.045],[34,.012],[54,.003],[62.3,.11],[67.6,.02],[79,.06],[86,0],[90,.035],[92,.035],[108,.02]],es=[{s:-12.5,h:.35,len:.12,name:"slate1"},{s:-9,h:.35,len:.12,name:"slate2"},{s:-5.6,h:.35,len:.12,name:"slate3"},{s:-91,h:3.2,len:.12,name:"spillwayFalls"},{s:9,h:1.1,len:.1,name:"gorge1"},{s:20,h:.9,len:.1,name:"gorge2"},{s:78.45,h:1.3,len:.16,name:"shelf"},{s:86,h:2.3,len:.1,name:"waterfall"}],lh=[{s:-91,len:1.7,w:.55,jet:1,jetDepth:.35,under:.6,boil:.35},{s:86,len:1.45,w:.62,jet:.9,jetDepth:.32,under:.55,boil:.35},{s:9,len:.6,w:.35,jet:.6,jetDepth:.22,under:.5,boil:.25},{s:20,len:.6,w:.35,jet:.6,jetDepth:.22,under:.5,boil:.25}];function xu(r,t){let e=0;for(;e<br.length-2&&br[e+1][0]<=r;)e++;let n=br[e],i=br[e+1],s=Ht(n[0],i[0],r);return t.wL=ae(n[1],i[1],s),t.wR=ae(n[2],i[2],s),t.D=ae(n[3],i[3],s),t.c=ae(n[4],i[4],s),t.U=ae(n[5],i[5],s),t.bankL=ae(n[6],i[6],s),t.bankR=ae(n[7],i[7],s),t.bankW=ae(n[8],i[8],s),t.rough=ae(n[9],i[9],s),t.turb=ae(n[10],i[10],s),t.bedMat=s<.5?n[11]:i[11],t.bankMat=s<.5?n[12]:i[12],t}function po(r){return 3.6*Math.sin(2*Math.PI*(r+18)/66)+1.2*Math.sin(2*Math.PI*(r-5)/41)}var wr=class{constructor(){this.buildCentreline(),this.buildRows(),this.buildFeatures(),this.bakeBed(),this.buildRocks(),this.bakeFlow(),this.buildColliders()}buildCentreline(){let e=[],n=[],i=0,s=-140,a=po(s),o=[];for(;s<=30;s+=.005){let d=po(s);o.length&&(i+=Math.hypot(d-a,.005)),o.push([s,i]),a=d}let l=0;for(let[d,u]of o)if(d>=0){l=u;break}for(let[d,u]of o)e.push(d),n.push(u-l+Zt);let c=Math.round((Ie-Wt)/ts)+1;this.nC=c,this.cx=new Float64Array(c),this.cz=new Float64Array(c),this.tx=new Float64Array(c),this.tz=new Float64Array(c),this.kap=new Float64Array(c);let h=0;for(let d=0;d<c;d++){let u=Wt+d*ts;for(;h<n.length-2&&n[h+1]<u;)h++;let f=(u-n[h])/(n[h+1]-n[h]),y=ae(e[h],e[h+1],f);this.cz[d]=y,this.cx[d]=po(y)}for(let d=0;d<c;d++){let u=Math.max(0,d-1),f=Math.min(c-1,d+1),y=this.cx[f]-this.cx[u],g=this.cz[f]-this.cz[u],m=Math.hypot(y,g);this.tx[d]=y/m,this.tz[d]=g/m}for(let d=0;d<c;d++){let u=Math.max(0,d-1),f=Math.min(c-1,d+1),y=this.tx[u]*this.tz[f]-this.tz[u]*this.tx[f];this.kap[d]=y/((f-u)*ts)}}worldXZ(t,e,n={}){let i=(t-Wt)/ts;i=le(i,0,this.nC-1.0001);let s=Math.floor(i),a=i-s,o=ae(this.cx[s],this.cx[s+1],a),l=ae(this.cz[s],this.cz[s+1],a),c=ae(this.tx[s],this.tx[s+1],a),h=ae(this.tz[s],this.tz[s+1],a),d=Math.hypot(c,h);return c/=d,h/=d,n.x=o-h*e,n.z=l+c*e,n}frame(t,e={}){let n=le((t-Wt)/ts,0,this.nC-1.0001),i=Math.floor(n),s=n-i,a=ae(this.tx[i],this.tx[i+1],s),o=ae(this.tz[i],this.tz[i+1],s),l=Math.hypot(a,o);return a/=l,o/=l,e.tx=a,e.tz=o,e.nx=-o,e.nz=a,e.kap=ae(this.kap[i],this.kap[i+1],s),e}locate(t,e,n,i){let s,a;n<0?(s=0,a=this.nC-2):(s=Math.max(0,n-3),a=Math.min(this.nC-2,n+3));let o=1/0,l=0,c=0;for(let p=s;p<=a;p++){let _=this.cx[p],x=this.cz[p],v=this.cx[p+1]-_,b=this.cz[p+1]-x,S=((t-_)*v+(e-x)*b)/(v*v+b*b);S=S<0?0:S>1?1:S;let A=_+v*S-t,E=x+b*S-e,w=A*A+E*E;w<o&&(o=w,l=p,c=S)}if(n>=0&&(l===s||l===a)&&s>0&&a<this.nC-2)return this.locate(t,e,l,i);let h=this.cx[l],d=this.cz[l],u=h+(this.cx[l+1]-h)*c,f=d+(this.cz[l+1]-d)*c,y=ae(this.tx[l],this.tx[l+1],c),g=ae(this.tz[l],this.tz[l+1],c),m=Math.hypot(y,g);return y/=m,g/=m,i.s=Wt+(l+c)*ts+((t-u)*y+(e-f)*g),i.d=(t-u)*-g+(e-f)*y,i.idx=l,i.tx=y,i.tz=g,i.kap=ae(this.kap[l],this.kap[l+1],c),i}buildRows(){let t=Math.round((Ie-Wt)/qe)+1;this.nS=t;let e=()=>new Float32Array(t);this.rY0=e(),this.rC=e(),this.rWL=e(),this.rWR=e(),this.rD=e(),this.rU=e(),this.rBankL=e(),this.rBankR=e(),this.rBankW=e(),this.rRough=e(),this.rTurb=e(),this.rBedMat=new Uint8Array(t),this.rBankMat=new Uint8Array(t),this.rFoam=e(),this.rY0s=e(),this.rDcds=e();let n={},i=0,s=new Float64Array(t),a=yu.slice().sort((d,u)=>d[0]-u[0]);for(let d=0;d<t;d++){let u=Wt+d*qe;if(d>0){let f=0;for(let[y,g]of a)u>=y&&(f=g);i-=f*qe}s[d]=i}let o=d=>{let u=0;for(let f of es)u+=f.h*Ht(f.s-f.len/2,f.s+f.len/2,d);return u};for(let d=0;d<t;d++)s[d]-=o(Wt+d*qe);let l=Math.round((Zt-Wt)/qe),c=-s[l];for(let d=0;d<t;d++){let u=Wt+d*qe;xu(u,n),this.rY0[d]=s[d]+c,this.rC[d]=n.c,this.rWL[d]=n.wL,this.rWR[d]=n.wR,this.rD[d]=n.D,this.rU[d]=n.U,this.rBankL[d]=n.bankL,this.rBankR[d]=n.bankR,this.rBankW[d]=n.bankW,this.rRough[d]=n.rough,this.rTurb[d]=n.turb,this.rBedMat[d]=n.bedMat,this.rBankMat[d]=n.bankMat}let h=Math.round(5/qe);for(let d=0;d<t;d++){let u=0,f=0;for(let y=-h;y<=h;y+=4){let g=le(d+y,0,t-1);u+=this.rY0[g],f++}this.rY0s[d]=u/f}for(let d=0;d<t;d++){let u=Math.max(0,d-2),f=Math.min(t-1,d+2);this.rDcds[d]=(this.rC[f]-this.rC[u])/((f-u)*qe)}for(let d=0;d<t;d++){let u=Wt+d*qe,f=le((this.rTurb[d]-.1)*2.5,0,1);for(let y of es){let g=u-y.s;g>-.15&&g<2.2&&(f=Math.max(f,(g<0?.5:1)*Math.exp(-Math.max(0,g)/(.5+y.h*.4))))}this.rFoam[d]=f}}rowIndex(t){return le((t-Wt)/qe,0,this.nS-1.0001)}row(t,e){let n=this.rowIndex(e),i=n|0,s=n-i;return t[i]+(t[i+1]-t[i])*s}y0(t){return this.row(this.rY0,t)}c(t){return this.row(this.rC,t)}wL(t){return this.row(this.rWL,t)}wR(t){return this.row(this.rWR,t)}buildFeatures(){this.pads=rt.map((t,e)=>{let n=t.s,i=this.c(n),s=this.wR(n),a=this.y0(n),o={k:e,s0:n-1.55,s1:n+.35,d0:i+s+.3,d1:i+s+1.8,y:a+.27,sC:n-.6,dC:i+s+1.05};return o.chute=[{s:n-.62,d:i+s+.75,y:o.y+.56},{s:n-.16,d:i+s-.02,y:a+.11},{s:n+.12,d:i+s-.2,y:a+.075}],o}),this.island={s0:44.9,s1:49.4,dOff:.36,halfW:.25,h:.09},this.islands=[this.island,{s0:-51,s1:-41.5,dOff:-.36,halfW:.3,h:.14,rock:!0,name:"Splitstone"},{s0:-120.8,s1:-110.6,dOff:0,halfW:.12,h:.28,rock:!0,name:"Sluice rib"}],this.alt={s0:83.3,s1:89.9,w:.2,D:.09,U:1.25,off:-1.35},this.alt.ya=null,this.ponds=[{s:56.9,dOff:1.75,rs:.95,rd:.62,depth:.32,lift:.34},{s:58.5,dOff:1.9,rs:.85,rd:.58,depth:.3,lift:.3}],this.runoff={s0:58.9,s1:59.6,dTop:1.35,dBot:.85},this.codeRot=[{s:58.2,dOff:.9,r:1.4,k:1},{s:56.3,dOff:-1.2,r:1,k:.7},{s:60.8,dOff:.8,r:.9,k:.8},{s:63.8,dOff:.5,r:.7,k:.45},{s:66.5,dOff:1.6,r:.8,k:.35}],this.slabs=[{s0:72.7,s1:74.1,d0:.06,d1:.9,h:.05,undercut:!0},{s0:74,s1:75,d0:.08,d1:.75,h:.07,undercut:!0}],this.gravelBar={s0:94.4,s1:96.6,side:1},this.roughPatch={s0:95.05,s1:95.95},this.matOn=!1,this.mods={},this.potholes=[]}altD(t){let e=this.alt,n=this.c(t),i=le((t-e.s0)/(e.s1-e.s0),0,1),s=Ht(0,.2,i)*(1-Ht(.82,1,i)*.62);return n+e.off*s}altY(t){let e=this.alt,n=le((t-e.s0)/(e.s1-e.s0),0,1),i=this.y0(e.s0),s=this.y0(e.s1),a=n*4,o=Math.min(3,Math.floor(a)),l=a-o,c=(o+Ht(.78,.92,l))/4,h=.35*n+.65*c;return i+(s-i)*h}channelOf(t,e,n=0){let i=this.c(t),s=e-i,a=s<0?this.wL(t):this.wR(t);if(Math.abs(s)<=a+n)return"main";let o=this.alt;return t>o.s0&&t<o.s1&&Math.abs(e-this.altD(t))<=o.w+n?"alt":null}bedRaw(t,e,n){let i=Math.round(this.rowIndex(t)),s=this.rY0[i],a=this.rC[i],o=this.rD[i],l=e-a,c=l<0,h=c?this.rWL[i]:this.rWR[i],d=c?this.rBankL[i]:this.rBankR[i],u=this.rBankW[i],f=Math.abs(l)/h,y,g,m=Ht(1.5,4.5,Math.abs(l)),p=ae(s,this.rY0s[i],m);if(f<=1){let E=1-f*f;y=s+.012-(o+.012)*Math.pow(E,.55),g=this.rBedMat[i]}else{let E=(f-1)*h,w=d*Ht(0,u,E);d<0&&(w+=.045*Math.exp(-((E-.04)*(E-.04))/.0012),w=d*Ht(.07,.07+u,E)+.045*Ht(0,.04,E)*(1-Ht(.06,.1,E)));let M=.11*Math.max(0,E-u)+.04*Math.max(0,E-u-3);y=p+.012+w+M,g=E<.06?this.rBedMat[i]:this.rBankMat[i],d>.8&&E<u+.2&&(g=gt.ROCK)}let _=this.rRough[i],x=Cn(t*1.3,e*1.3,3,11),v=Cn(t*7,e*7,2,23);if(f<=1)y+=_*.8*x+_*.5*v;else{let E=g===gt.ROCK?1:.5,w=(f-1)*h;if(y+=(.08*x+.02*v*E)*Ht(0,.6,w),g===gt.ROCK&&Math.abs(d)>.4){let M=Math.abs(Cn(t*2.2,e*2.2+3.1,3,41));y+=(.1*M-.03)*Ht(.02,.25,w)*(1-Ht(u+.5,u+1.6,w))}}for(let E of this.islands){if(t<=E.s0||t>=E.s1)continue;let w=(t-E.s0)/(E.s1-E.s0),M=E.halfW*Math.sin(Math.PI*w)**.6,R=Math.abs(e-(a+E.dOff));if(R<M+.12){let k=1-Ht(M-.05,M+.12,R),I=s+E.h*Math.sin(Math.PI*w)**.4+(E.rock?.03*x:.015*v);I>y&&(y=ae(y,I,k),k>.4&&(g=E.rock?gt.ROCK:gt.GRAVEL))}}let b=this.alt;if(t>b.s0-.2&&t<b.s1+.2){let E=this.altD(t),w=Math.abs(e-E),M=b.w+.5;if(w<M+.3){let R=this.altY(t),k;if(w<=b.w){let N=1-(w/b.w)**2;k=R+.01-(b.D+.01)*Math.pow(N,.55)}else k=R+.01+.3*Ht(0,.18,w-b.w)+.04*x;let I=1-Ht(M,M+.3,w),D=Ht(b.s0+.6,b.s0+1.4,t)*(1-Ht(b.s1-1,b.s1-.3,t)),U=ae(Math.min(y,k),k,D);y=ae(y,U,I),w<=b.w+.02&&I>.5&&(g=gt.ROCK)}}for(let E of this.ponds){let w=(t-E.s)/E.rs,M=(e-(this.c(E.s)+E.dOff))/E.rd,R=Math.sqrt(w*w+M*M);if(R<1.6){let k=this.y0(E.s)+E.lift,I=k+.06+.04*v,D=R<1?k-E.depth*(1-R*R)**.6:I+.08*Ht(1,1.6,R),U=1-Ht(1.3,1.6,R);y=ae(y,D,U),R<1.05&&(g=gt.SAND)}}{let E=this.runoff;if(t>E.s0-.2&&t<E.s1+.2){let w=le((t-E.s0)/(E.s1-E.s0),0,1),M=this.c(t)+ae(E.dTop,E.dBot,w),R=Math.abs(e-M);if(R<.22){let k=this.y0(58.5)+.3,I=this.y0(t)+.01,D=ae(k,I,w)-.04*(1-(R/.22)**2);y=Math.min(y,ae(y,D,1-Ht(.1,.22,R)))}}}for(let E of this.slabs){if(t<E.s0-.2||t>E.s1+.2)continue;let w=e-(a+this.rWR[i]);if(w<E.d0-.08||w>E.d1+.3)continue;let M=Ht(E.s0-.15,E.s0+.05,t)*(1-Ht(E.s1-.05,E.s1+.15,t)),R=Ht(E.d0-.06,E.d0,w)*(1-Ht(E.d1,E.d1+.25,w)),k=s+E.h+.008*v;y=ae(y,Math.max(y,k),M*R),M*R>.5&&(g=gt.ROCK)}let S=this.gravelBar;if(t>S.s0&&t<S.s1&&l>0){let E=(t-S.s0)/(S.s1-S.s0),w=Math.sin(Math.PI*E)*Ht(.1,.38,l);y=ae(y,Math.max(y,s+.006+.01*v),w)}let A=this.roughPatch;if(t>A.s0&&t<A.s1&&f<1&&!this._noPatch){let E=Math.sin(Math.PI*(t-A.s0)/(A.s1-A.s0));y+=.022*E*(pn(t*14,e*14,77)+.6)}for(let E of this.pads)if(t>E.s0-.6&&t<E.s1+.6){let w=a+this.rWR[i],M=w+.3,R=w+1.8;if(e<M-.3||e>R+.7)continue;let k=Ht(E.s0-.5,E.s0,t)*(1-Ht(E.s1,E.s1+.5,t)),I=Ht(M-.25,M+.05,e)*(1-Ht(R,R+.6,e)),D=k*I;D>0&&(y=ae(y,E.y+.004*v,D),D>.5&&(g=gt.DIRT))}for(let E of this.pads){let w=E.chute;if(!(t<w[0].s-.3||t>w[2].s+.3))for(let M=0;M<2;M++){let R=w[M],k=w[M+1],I=k.s-R.s,D=k.d-R.d,U=((t-R.s)*I+(e-R.d)*D)/(I*I+D*D);U=le(U,0,1);let N=Math.hypot(t-(R.s+I*U),e-(R.d+D*U));if(N<.16){let W=R.y+(k.y-R.y)*U-.035,F=1-Ht(.07,.16,N);y>W&&(y=ae(y,W,F))}}}if(t>86.25&&t<88.4&&f>1){let E=(f-1)*h,w=Math.sin(Math.PI*(t-86.25)/2.15);y-=.16*w*Math.exp(-((E-.32)**2)/.012)}for(let[E,w,M]of[[-12.4,-11.2,.12],[-90.85,-88.6,.18]])if(t>E&&t<w&&f>1){let R=(f-1)*h,k=Math.sin(Math.PI*(t-E)/(w-E));y-=M*k*Math.exp(-((R-.3)**2)/.012)}for(let E of this.potholes){let w=t-E.s,M=e-(a+E.d),R=w*w+M*M;R<E.r*E.r*2.2&&(y-=E.depth*Math.exp(-R/(E.r*E.r*.5)))}return n&&(n.mat=g),y}bakeBed(){let t=Math.round((gu-Qi)/Di)+1;this.nD=t,this.bed=new Float32Array(this.nS*t),this.mat=new Uint8Array(this.nS*t);let e={};for(let i=0;i<this.nS;i++){let s=Wt+i*qe;for(let a=0;a<t;a++){let o=Qi+a*Di,l=i*t+a;this.bed[l]=this.bedRaw(s,o,e),this.mat[l]=e.mat}}let n=this.roughPatch;this.matI0=Math.floor((n.s0-.3-Wt)/qe),this.matI1=Math.ceil((n.s1+.3-Wt)/qe),this.matBed=new Float32Array((this.matI1-this.matI0+1)*t),this._noPatch=!0;for(let i=this.matI0;i<=this.matI1;i++){let s=Wt+i*qe;for(let a=0;a<t;a++){let o=Qi+a*Di,l=this.bedRaw(s,o,e),c=s>n.s0-.05&&s<n.s1+.05&&this.inChannel(s,o,-.04);this.matBed[(i-this.matI0)*t+a]=c?Math.max(l+.012,this.bed[i*t+a]-.004):this.bed[i*t+a]}}this._noPatch=!1}matH(t,e){let n=(t-Wt)/qe,i=le((e-Qi)/Di,0,this.nD-1.001),s=Math.floor(n);if(s<this.matI0||s>=this.matI1)return this.bedH(t,e);let a=i|0,o=n-s,l=i-a,c=this.nD,h=this.matBed,d=(s-this.matI0)*c+a,u=h[d]+(h[d+1]-h[d])*l,f=h[d+c]+(h[d+c+1]-h[d+c])*l;return u+(f-u)*o}bedAt(t,e,n){let i=(t-Wt)/qe,s=(e-Qi)/Di;i<0?i=0:i>this.nS-1.001&&(i=this.nS-1.001),s<0?s=0:s>this.nD-1.001&&(s=this.nD-1.001);let a=i|0,o=s|0,l=i-a,c=s-o,h=this.nD,d=this.bed,u=a*h+o,f=d[u],y=d[u+1],g=d[u+h],m=d[u+h+1],p=f+(y-f)*c,_=g+(m-g)*c;return n.h=p+(_-p)*l,n.hs=(_-p)/qe,n.hd=(y-f+(m-g-(y-f))*l)/Di,n.mat=this.mat[(l<.5?u:u+h)+(c<.5?0:1)],n}bedH(t,e){let n=le((t-Wt)/qe,0,this.nS-1.001),i=le((e-Qi)/Di,0,this.nD-1.001),s=n|0,a=i|0,o=n-s,l=i-a,c=this.nD,h=this.bed,d=s*c+a,u=h[d]+(h[d+1]-h[d])*l,f=h[d+c]+(h[d+c+1]-h[d+c])*l;return u+(f-u)*o}waterLevel(t,e){let n=this.rowIndex(t),i=n|0,s=n-i,a=this.rC[i]+(this.rC[i+1]-this.rC[i])*s,o=e-a,l=o<0?this.rWL[i]+(this.rWL[i+1]-this.rWL[i])*s:this.rWR[i]+(this.rWR[i+1]-this.rWR[i])*s;if(Math.abs(o)<=l+.03)return this.rY0[i]+(this.rY0[i+1]-this.rY0[i])*s;let c=this.alt;if(t>c.s0&&t<c.s1&&Math.abs(e-this.altD(t))<=c.w+.03)return this.altY(t);if(t>55.5&&t<60)for(let h of this.ponds){let d=(t-h.s)/h.rs,u=(e-(this.c(h.s)+h.dOff))/h.rd;if(d*d+u*u<1)return this.y0(h.s)+h.lift}return-1/0}inChannel(t,e,n=0){return this.channelOf(t,e,n)!==null}inMain(t,e,n=0){let i=this.c(t),s=e-i,a=s<0?this.wL(t):this.wR(t);return Math.abs(s)<=a+n}buildRocks(){let t=De(1234),e=[],n=(i,s,a,o={})=>{let l=this.worldXZ(i,s),c=this.bedH(i,s),h=o.bury??.35,d=(o.y??c)+a*(1-2*h);e.push({s:i,d:s,x:l.x,y:d,z:l.z,r:a,tag:o.tag||"rock",group:o.group||null,decor:!!o.decor,solid:o.solid!==!1})};for(let i=Wt+1;i<Ie-2;i+=.35+t()*.6)for(let s of[-1,1]){if(t()<.3)continue;let a=this.c(i),o=s<0?this.wL(i):this.wR(i),l=this.row(s<0?this.rBankL:this.rBankR,i),c=!1;for(let f of this.pads)s>0&&i>f.s0-.4&&i<f.s1+.4&&(c=!0);if(i>Zt-.8&&i<Be+1.2&&(c=!0),c)continue;let d=l>.8||this.row(this.rRough,i)>.018?.08+t()*.22:.04+t()*.12;l<0&&s<0&&(d=.05+t()*.08);let u=a+s*(o+.02+d*(.2+t()*.9));n(i,u,d,{bury:.3+t()*.15,tag:"bank"})}for(let i=0;i<260;i++){let s=Wt+1+t()*(Ie-Wt-3),a=t()<.5?-1:1,o=this.c(s),l=a<0?this.wL(s):this.wR(s),c=o+a*(l+.6+t()*6),h=!1;for(let d of this.pads)s>d.s0-.5&&s<d.s1+.5&&c>d.d0-.4&&c<d.d1+.6&&(h=!0);s>Zt-1.5&&s<Be+2&&Math.abs(c-o)<2.5&&(h=!0),!h&&n(s,c,.1+t()*t()*.6,{bury:.35,tag:"boulder",decor:Math.abs(c-o)>2.5})}for(let i of es.filter(s=>s.name==="gorge1"||s.name==="gorge2")){let s=this.c(i.s-.15);n(i.s-.12,s-.3,.09,{bury:.4,tag:"lip"}),n(i.s-.12,s+.3,.09,{bury:.4,tag:"lip"})}{let s=this.c(9.55);n(9.55+.05,s-.2,.085,{bury:.25,tag:"landing",group:"gorgeLanding"}),n(9.55-.08,s+.09,.08,{bury:.05,tag:"landing",group:"gorgeLanding"}),n(9.55+.35,s+.02,.07,{bury:.3,tag:"landing",group:"gorgeLanding"}),n(10,this.c(10)+.18,.045,{y:this.y0(10)-.03,bury:.5,tag:"landing",group:"gorgeLanding"}),n(10.08,this.c(10.08)+.28,.05,{y:this.y0(10.08)-.03,bury:.5,tag:"landing",group:"gorgeLanding"})}for(let i=22.8;i<29.2;i+=.9+t()*.5){let s=this.c(i),a=t()<.5?-1:1;n(i,s+a*(.1+t()*.08),.05+t()*.03,{bury:.45,tag:"whitewater"})}for(let[i,s,a]of[[36,-.15,.06],[39.2,.2,.07],[42.5,-.1,.06],[52,.15,.06]])n(i,this.c(i)+s,a,{bury:.45,tag:"stone"});for(let[i,s,a]of[[57,-.6,.12],[59,.55,.11],[60.3,-.3,.08]])n(i,this.c(i)+s,a,{bury:.5,tag:"stone"});for(let[i,s]of[[63.4,1],[64.3,-1],[65.1,1],[65.9,-1]]){let a=this.c(i);n(i,a+s*(.12+.03),.085,{bury:.12,tag:"snag"})}for(let[i,s,a,o]of[[78.9,1,.075,.05],[79.05,1.5,.075,.3],[78.62,1.55,.065,.3],[79.3,1.1,.06,.3],[78.95,.68,.07,.2]])n(i,s,a,{bury:o,tag:"catch",group:"catchJumble"});n(61.92,this.c(61.92)-.44,.045,{y:this.y0(61.92)-.02,bury:.5,tag:"snag",group:"outletNotch"}),n(62,this.c(62)-.54,.05,{y:this.y0(62)-.02,bury:.5,tag:"snag",group:"outletNotch"}),n(79.22,this.c(79.22)+.1,.045,{y:this.y0(79.22)-.02,bury:.5,tag:"catch",group:"catchJumble"}),n(79.3,this.c(79.3)+.2,.05,{y:this.y0(79.3)-.02,bury:.5,tag:"catch",group:"catchJumble"});for(let i of[-1,1])n(85.95,this.c(85.95)+i*.13,.05,{y:this.y0(85.95)-.02,bury:.5,tag:"lip"}),n(85.99,this.c(85.99)+i*.235,.045,{y:this.y0(85.99)-.015,bury:.5,tag:"lip"});n(85.9,this.c(85.9)+.23,.07,{bury:.3,tag:"lip"});for(let[i,s,a]of[[81.5,.18,.05],[83.2,-.16,.05],[84.6,.15,.045]])n(i,this.c(i)+s,a,{bury:.45,tag:"stone"});for(let[i,s,a]of[[96.2,-.28,.06],[97.5,.3,.05]])n(i,this.c(i)+s,a,{bury:.45,tag:"stone"});for(let i of[-1,1])n(-12.58,this.c(-12.58)+i*.4,.07,{y:this.y0(-12.58)-.03,bury:.5,tag:"slateEdge"});n(-12.6,this.c(-12.6)+.18,.05,{y:this.y0(-12.6)-.035,bury:.5,tag:"slateEdge"});for(let i of[-.2,.2])n(-7.75,this.c(-7.75)+i,.06,{y:this.y0(-7.75)-.035,bury:.5,tag:"slateLip",group:"slateLip"});n(-14.62,this.c(-14.62)-.37,.045,{y:this.y0(-14.62)-.02,bury:.5,tag:"leafPocket",group:"leafPocket"}),n(-14.52,this.c(-14.52)-.475,.05,{y:this.y0(-14.52)-.02,bury:.5,tag:"leafPocket",group:"leafPocket"}),n(-25.9,this.c(-25.9)+.12,.04,{y:this.y0(-25.9)-.02,bury:.5,tag:"willowSnag",group:"willowSnag"}),n(-25.8,this.c(-25.8)+.21,.045,{y:this.y0(-25.8)-.02,bury:.5,tag:"willowSnag",group:"willowSnag"});for(let[i,s]of[[-49.4,.4],[-47.6,.12],[-45.5,.42],[-43.6,.1]])n(i,this.c(i)+s,.05,{bury:.4,tag:"splitRock"});n(-90.25,this.c(-90.25)-.13,.08,{y:this.y0(-90.25)+.03,bury:.5,tag:"apron",group:"spillApronRocks"}),n(-90.1,this.c(-90.1)+.15,.075,{y:this.y0(-90.1)+.03,bury:.5,tag:"apron",group:"spillApronRocks"});for(let[i,s]of[[-119.6,.42],[-118,-.45],[-116.4,.5],[-114.8,-.4],[-113.2,.45],[-111.8,-.48]])n(i,this.c(i)+s,.055,{bury:.35,tag:"sluiceRock"});for(let i of[-.34,.34])n(-108.3,this.c(-108.3)+i,.1,{y:this.y0(-108.3)-.04,bury:.5,tag:"mergeRock",group:"sluiceMergeRocks"});for(let[i,s]of[[-136.5,.12],[-134.8,-.1],[-132.9,.1],[-131,-.12]])n(i,this.c(i)+s,.04,{bury:.45,tag:"stone"});for(let i=0;i<18;i++){let s=50.8+t()*2.8;n(s,this.c(s)+this.wR(s)+.05+t()*.3,.04+t()*.05,{bury:.35,tag:"cobble"})}for(let i=0;i<7;i++){let s=this.roughPatch.s0+.08+t()*.75,a=this.c(s)+(t()-.5)*.55;n(s,a,.016+t()*.01,{bury:.3,tag:"pebble",group:"roughPebbles"})}this.rocks=e}bakeFlow(){this.fD0=-3.2,this.fDD=.05,this.fDS=.1;let t=Math.round((3.8-this.fD0)/this.fDD)+1,e=Math.round((Ie-Wt)/this.fDS)+1;this.fnD=t,this.fnS=e,this.flowS=new Float32Array(e*t),this.flowD=new Float32Array(e*t);let n=[{s:9.35,d:.32,R:.2,v:.25},{s:9.35,d:-.32,R:.2,v:-.25},{s:20.4,d:.3,R:.2,v:.22},{s:20.4,d:-.3,R:.2,v:-.22},{s:38.8,d:.5,R:.25,v:.12,tag:"undercut"},{s:93.12,d:-.3,R:.12,v:.05,trap:.05,tag:"rootPocket"},{s:46.7,d:.98,R:.34,v:-.22,trap:.11,tag:"deadPocket"},{s:56.6,d:-.55,R:.36,v:.15,trap:.05,ring:!0,tag:"springsL"},{s:59.8,d:.55,R:.32,v:-.14,trap:.04,ring:!0,tag:"springsR"},{s:61.75,d:-.52,R:.17,v:.05,trap:.14,tag:"cornerL"},{s:61.75,d:.5,R:.17,v:-.05,trap:.14,tag:"cornerR"},{s:88.2,d:.6,R:.34,v:-.32,trap:.45,tag:"poolEddy"},{s:58.9,d:.74,R:.24,v:-.06,trap:.22,tag:"codeRot"},{s:52.3,d:-.55,R:.38,v:.12,trap:.03,ring:!0,tag:"clearing"},{s:-145.5,d:.78,R:.42,v:-.08,trap:.22,tag:"headMargin"},{s:-89.6,d:.42,R:.24,v:-.22,trap:.12,tag:"spillPoolR"},{s:-89.6,d:-.42,R:.24,v:.22,trap:.12,tag:"spillPoolL"},{s:-68.2,d:-.62,R:.62,v:.32,trap:.12,ring:!0,tag:"basinEddy"},{s:-8.45,d:0,R:.36,v:.14,trap:.22,tag:"slatePocket"},{s:-21.3,d:.35,R:.24,v:-.12,trap:.06,tag:"willowExitR"},{s:-21.3,d:-.35,R:.24,v:.12,trap:.06,tag:"willowExitL"},{s:-109.2,d:.42,R:.2,v:-.1,trap:.1,tag:"sluiceBar"}];this.eddies=n;let i=this.rocks.filter(a=>{let o=this.waterLevel(a.s,a.d);return o>-1e9&&a.y-a.r<o&&a.y+a.r>o-.05}),s={};for(let a=0;a<e;a++){let o=Wt+a*this.fDS,l=Math.round(this.rowIndex(o)),c=this.rC[l],h=this.rU[l],d=this.rDcds[l],u=this.rWL[l],f=this.rWR[l],y=this.rY0[l],g=i.filter(v=>Math.abs(v.s-o)<v.r*5+.2),m=n.filter(v=>Math.abs(v.s-o)<v.R*3),p=1,_=d,x=Math.hypot(p,_);p/=x,_/=x;for(let v=0;v<t;v++){let b=this.fD0+v*this.fDD,S=b-c,A=S<0?u:f,E=Math.abs(S)/A,w=0,M=0;if(E<1.15){let k=Math.sqrt(le(1-Math.pow(Math.min(E,1),4),0,1))*.88+.12,I=h*k;for(let D of this.islands){if(o<=D.s0-.4||o>=D.s1+.4)continue;let U=b-(c+D.dOff),N=le((o-D.s0)/(D.s1-D.s0),0,1),W=Math.exp(-U*U/.08)*Math.sin(Math.PI*N);M+=Math.sign(U||1)*W*.25*(o<(D.s0+D.s1)/2?1:-1),D.name==="Splitstone"&&U<0&&o>D.s0&&o<D.s1&&(I*=.55)}if(S>.8&&o>45.8&&o<47.8&&(I*=.15),o>-73.5&&o<-62.5&&S>.25&&(I*=1+.45*Math.sin(Math.PI*(o+73.5)/11)),o>-22.6&&o<-19.8&&(I*=.75),o>82.9&&o<84.4&&S<.02&&(M-=.95*Math.sin(Math.PI*(o-82.9)/1.5)*Ht(-.02,.12,-S)),o>86.02&&o<87.25){let D=(o-86.02)/1.23,U=1-Ht(.1,.24,Math.abs(S));I=ae(Math.max(I,.45),-.28*Math.sin(Math.PI*le(D*1.05,0,1)),U),M+=Math.sign(S||.01)*.06*Math.sin(Math.PI*D)*(1-Ht(.2,.32,Math.abs(S)))}for(let D of es.filter(U=>U.name==="gorge1"||U.name==="gorge2"))if(o>D.s+.02&&o<D.s+.55){let U=(o-D.s-.02)/.53,N=1-Ht(.15,.4,Math.abs(S));I=ae(I,-.25*Math.sin(Math.PI*U),N)}w=p*I,M+=_*I;for(let D of g){let N=y-D.y;if(Math.abs(N)>=D.r)continue;let W=Math.sqrt(D.r*D.r-N*N),F=o-D.s,J=b-D.d,it=F*F+J*J;if(it>(W*5)**2)continue;let at=F*p+J*_,ft=-F*_+J*p,It=Math.max(it,W*W),Y=W*W,et=1-Y*(at*at-ft*ft)/(It*It),X=-Y*2*at*ft/(It*It);if(it<Y&&(et=0,X=0),at>0&&Math.abs(ft)<W*1.3&&at<W*4.5){let se=1-(1-at/(W*4.5))*(1-Math.abs(ft)/(W*1.3));et*=.15+.85*se,X+=-Math.sign(ft)*.25*(1-se)}let K=I*et,Mt=I*X,Et=K*p-Mt*_,Ot=K*_+Mt*p;w+=Et-p*I,M+=Ot-_*I}for(let D of m){if(!D.trap)continue;let U=Math.hypot(o-D.s,S-D.d),N=.08+.92*Ht(D.R*.55,D.R*1.25,U);w*=N,M*=N}for(let D of m){let U=o-D.s,N=S-D.d,W=Math.hypot(U,N);if(W<1e-4)continue;let F=W<D.R?W/D.R:Math.exp(-(W-D.R)/(D.R*.6)),J=D.v*F/W;if(w+=J*N*1,M+=J*-U,D.trap){let it=D.ring?D.trap*(W-D.R*.6)/D.R*(1-Ht(D.R,D.R*1.5,W))/W:D.trap*F/W;w-=it*U,M-=it*N}W<D.R*1.2&&(w*=.7,M*=.7)}if(E>1){let D=1-Ht(1,1.15,E);w*=D,M*=D}}let R=this.alt;if(o>R.s0&&o<R.s1&&(E>=1||w===0)){let k=b-this.altD(o),I=Math.abs(k)/R.w;if(I<1.15){let D=(this.altD(o+.1)-this.altD(o-.1))/.2,U=Math.hypot(1,D),N=R.U*(Math.sqrt(le(1-Math.min(I,1)**4,0,1))*.85+.15)*(1-Ht(1,1.15,I)),W=E>=1?1:.5;w=w*(1-W)+N/U*W,M=M*(1-W)+N*D/U*W}}this.flowS[a*t+v]=w,this.flowD[a*t+v]=M}}this.boils=[{s:56.4,d:.1,r:.18},{s:58.3,d:-.25,r:.15},{s:59.6,d:.3,r:.16}]}flowAt(t,e,n,i,s,a,o){let l=(t-Wt)/this.fDS,c=(e-this.fD0)/this.fDD;if(o.vx=0,o.vy=0,o.vz=0,l<0||l>this.fnS-1.001||c<0||c>this.fnD-1.001)return o;let h=l|0,d=c|0,u=l-h,f=c-d,y=this.fnD,g=h*y+d,m=this.flowS,p=this.flowD,_=(m[g]*(1-f)+m[g+1]*f)*(1-u)+(m[g+y]*(1-f)+m[g+y+1]*f)*u,x=(p[g]*(1-f)+p[g+1]*f)*(1-u)+(p[g+y]*(1-f)+p[g+y+1]*f)*u,v=Math.round(this.rowIndex(t)),b=this.rTurb[v];if(_!==0||x!==0){let w=Math.sin(1.9*t+2.3*e+1.7*i)*.6+Math.sin(3.7*t-1.1*e-2.9*i+1.3)*.4,M=Math.sin(2.6*t-1.7*e+2.1*i+.7)*.6+Math.sin(4.3*t+2.9*e+3.3*i)*.4,R=b*(.4+.6*Math.min(1,Math.hypot(_,x)));if(_+=w*R,x+=M*R,t>55.5&&t<60.5)for(let k of this.boils){let I=t-k.s,D=e-this.c(k.s)-k.d,U=I*I+D*D;if(U<k.r*k.r*4){let N=.12*Math.exp(-U/(k.r*k.r))/Math.sqrt(U+1e-4);_+=I*N,x+=D*N}}for(let k=0;k<lh.length;k++){let I=lh[k];if(t<I.s-.02||t>I.s+I.len)continue;let D=this.rY0[v]-n,U=1-Ht(I.w*.5,I.w,Math.abs(e-this.rC[v])),N=(t-I.s)/I.len;if(N<.3&&D>-.05&&D<I.jetDepth&&(o.vy=-I.jet*(1-N/.3)*U),D>.06){let W=Math.min(1,(D-.06)/.06)*U;_=_*(1-W)+I.under*W,x*=1-W*.5}N>.62&&N<.95&&D>-.05&&(o.vy=Math.max(o.vy,I.boil*Math.sin(Math.PI*(N-.62)/.33)*U))}}let S=this.mods;if(S){if(S.basinVane&&t>-73&&t<-62.5){let w=e-this.rC[v];if(w<.3&&w>-1.3){let M=Math.sin(Math.PI*(t+73)/10.5);x+=.32*M,_+=.22*M}}if(S.slateOutlet&&t>-8.9&&t<-7.4){let w=e-this.rC[v];Math.abs(w)<.6&&(_+=.4*(1-Math.abs(w)/.6))}if(S.headGuide&&t>-148.5&&t<-139.5&&e-this.rC[v]>.3&&(x-=.28,_+=.12),S.sluiceMerge&&t>-110.8&&t<-105.8){let w=e-this.rC[v];Math.abs(w)<.6&&(_+=.3)}S.habitatGuide&&t>57.2&&t<60.6&&e-this.rC[v]>.45&&(x-=.2)}let A=-a,E=s;return o.vx=s*_+A*x,o.vz=a*_+E*x,o}windAt(t,e,n,i,s){if(s.vx=0,s.vy=0,s.vz=0,t>76.6&&t<79.6){let a=Math.round(this.rowIndex(t)),o=Math.sin(Math.PI*(t-76.6)/3)*(1-Ht(1.2,3.2,Math.abs(e-1.4))),l=.75+.25*Math.sin(i*1.3)*Math.sin(i*.37+1),c=this.mods&&this.mods.windScreen&&Math.abs(e-1.6)<.7&&t<78.6?.3:1;s.vy=-5*o*l*c;let h=le((1.2-e)*1.5,-2.2,2.2)*o*l*c,d=this.frame(t);s.vx=d.nx*h+d.tx*.6*o,s.vz=d.nz*h+d.tz*.6*o}return s}buildColliders(){let t=[];this.colliders=t;let e=(i,s,a)=>{let o=this.worldXZ(i,s);return[o.x,a,o.z]};for(let i of this.rocks)i.decor||!i.solid||t.push({type:0,x:i.x,y:i.y,z:i.z,r:i.r*.94,mat:gt.ROCK,group:i.group,tag:i.tag});let n=(i,s,a,o,l,c)=>t.push({type:1,ax:i[0],ay:i[1],az:i[2],bx:s[0],by:s[1],bz:s[2],r:a,mat:o,group:l,tag:c});this.capsule=n;{let o=this.c(92.98),l=this.c(93.36),c=this.c(93.62),h=e(92.98-.12,o-this.wL(92.98)-.32,this.bedH(92.98-.12,o-this.wL(92.98)-.32)+.015),d=e(92.98,o-this.wL(92.98)+.04,this.y0(92.98)+.03),u=e(93.36,l-.13,this.y0(93.36)+.014),f=e(93.62,c+.03,this.bedH(93.62,c+.03)-.005),y=e(92.98-.13,this.c(92.98-.13)-.3,this.y0(92.98-.13)+.012);n(h,d,.028,gt.WOOD,"root","root"),n(d,u,.026,gt.WOOD,"root","root"),n(u,f,.022,gt.WOOD,"root","root"),n(d,y,.02,gt.WOOD,"root","root"),this.rootPts=[h,d,u,f],this.rootSpur=[d,y];let g=92.98-.36,m=this.c(g)-this.wL(g)-.12,p=e(g,m,Math.max(this.bedH(g,m),this.y0(g))+.016),_=e(92.98-.06,this.c(92.98-.06)-.19,this.y0(92.98-.06)+.016);n(p,_,.012,gt.METAL,"rootRail","rail"),this.rootRailPts=[p,_]}for(let i of[-1,1]){let s=e(85.4,this.c(85.4)+i*.25,this.y0(85.4)+.03),a=e(85.92,this.c(85.92)+i*.112,this.y0(85.92)+.03);t.push(this.obbFromSegment(s,a,.01,.06,gt.WOOD,"splashGuard"))}{let i=this.y0(88),s=[[86.9,.5],[87.6,.4],[88.6,.36],[89.5,.3]].map(([a,o])=>e(a,this.c(a)+o,i+.01));for(let a=0;a<s.length-1;a++)n(s[a],s[a+1],.03,gt.RUBBER,"poolGuide","boom");this.poolGuidePts=s}{let a=e(78.5,1.32,this.y0(78.8)+.16),o=e(79.55,.8,this.y0(79.55)+.004),l=this.obbFromSegment(a,o,.42,.01,gt.WOOD,"catchRamp",!0);t.push(l),this.catchRamp={a,b:o,halfW:.42};for(let c of[-1,1]){let h=e(78.5,1.32+c*.42,this.y0(78.8)+.2),d=e(79.55,.8+c*.42,this.y0(79.55)+.05);n(h,d,.015,gt.WOOD,"catchRamp","lip")}}for(let i of[-1,1]){let s=[],a=i<0?this.wL(62.15):this.wR(62.15);s.push(e(62.15,this.c(62.15)+i*(a+.03),this.y0(62.15)+.02)),s.push(e(62.6,this.c(62.6)+i*.17,this.y0(62.6)+.022));for(let o=62.95;o<=66.9;o+=.35)s.push(e(o,this.c(o)+i*.075,this.y0(o)+.025));for(let o=0;o<s.length-1;o++)n(s[o],s[o+1],.01,gt.METAL,"spillRail","rail")}{let i=[[44.9,.56],[45.8,.66],[46.7,.73],[47.5,.76],[48.4,.74]].map(([s,a])=>e(s,this.c(s)+a,this.y0(s)+.02));for(let s=0;s<i.length-1;s++)n(i[s],i[s+1],.02,gt.WOOD,"alderBypass","boom");this.bypassPts=i}{let i=this.y0(9.5),s=e(9.12,this.c(9.12),i+.02),a=e(9.95,this.c(9.95),i-.02);t.push(this.obbFromSegment(s,a,.5,.012,gt.WOOD,"landingBoards",!0));let o=e(9.6,this.c(9.6)+.32,this.y0(9.6)+.03),l=e(10.12,this.c(10.12)+.05,this.y0(10.12)+.03);t.push(this.obbFromSegment(o,l,.01,.05,gt.WOOD,"landingBoards")),this.landingBoards={a:s,b:a}}{let i=[[55.6,-.25],[57.2,-.45],[59.2,-.45],[60.8,-.3]].map(([s,a])=>e(s,this.c(s)+a,this.y0(s)+.03));for(let s=0;s<i.length-1;s++)n(i[s],i[s+1],.012,gt.METAL,"debrisScreen","screen");this.screenPts=i}{let i=this.y0(-23.5),s=[[[-23.75,-.22],[-23.35,-.055]],[[-23.7,.23],[-23.3,.062]]];for(let[l,c]of s)n(e(l[0],this.c(l[0])+l[1],i+.05),e(c[0],this.c(c[0])+c[1],i+.012),.026,gt.WOOD,"willowPinch","root");this.willowRoots=s.map(([l,c])=>[e(l[0],this.c(l[0])+l[1],i+.05),e(c[0],this.c(c[0])+c[1],i+.012)]),n(e(-26.15,this.c(-26.15)+.3,this.y0(-26.15)+.06),e(-25.75,this.c(-25.75)+.13,this.y0(-25.75)+.012),.022,gt.WOOD,null,"root"),this.willowInsideRoot=[e(-26.15,this.c(-26.15)+.3,this.y0(-26.15)+.06),e(-25.75,this.c(-25.75)+.13,this.y0(-25.75)+.012)];let a=e(-26.35,this.c(-26.35)+.2,this.y0(-26.35)+.016),o=e(-25.95,this.c(-25.95)+.075,this.y0(-25.95)+.016);n(a,o,.012,gt.METAL,"willowShield","rail"),this.willowShieldPts=[a,o];for(let l of[-1,1]){let c=e(-23.9,this.c(-23.9)+l*.13,i+.04),h=e(-22.9,this.c(-22.9)+l*.34,i+.03);t.push(this.obbFromSegment(c,h,.01,.05,gt.WOOD,"willowFlare"))}}{for(let a of[-1,1]){let o=e(-12.85,this.c(-12.85)+a*.34,this.y0(-12.8)+.06),l=e(-11.5,this.c(-11.5)+a*.5,this.y0(-11.6)+.06);t.push(this.obbFromSegment(o,l,.012,.12,gt.WOOD,"slateBumpers"))}let i=e(-14.9,this.c(-14.9)-.49,this.y0(-14.9)+.03),s=e(-14.55,this.c(-14.55)-.31,this.y0(-14.55)+.03);t.push(this.obbFromSegment(i,s,.008,.06,gt.METAL,"leafGrate"))}{let i=[-51.15,this.c(-51.15)-.36],s=this.y0(-51.2)+.02,a=e(i[0],i[1],s);n(a,e(-52,this.c(-52)-.95,s),.02,gt.WOOD,"gateDirect","gate"),n(a,e(-52,this.c(-52)+.55,s),.02,gt.WOOD,"gateCalm","gate"),this.splitGatePivot=a;let o=e(-41.6,this.c(-41.6)-.36,this.y0(-41.6)+.02),l=e(-40.2,this.c(-40.2)-.12,this.y0(-40.2)+.02);n(o,l,.018,gt.WOOD,"splitMergeRail","rail")}{let i=[[-72.4,-.15],[-70,-.18],[-67.5,-.12],[-65,-.05],[-63.2,.05]].map(([s,a])=>e(s,this.c(s)+a,this.y0(s)+.01));for(let s=0;s<i.length-1;s++)n(i[s],i[s+1],.03,gt.RUBBER,"basinBoom","boom");this.basinBoomPts=i}{let i=e(-90.82,this.c(-90.82),this.y0(-90.5)+.13),s=e(-89.4,this.c(-89.4),this.y0(-89.4)+0);t.push(this.obbFromSegment(i,s,.4,.012,gt.WOOD,"spillApron",!0));for(let a of[-1,1])n(e(-90.8,this.c(-90.8)+a*.4,this.y0(-90.5)+.2),e(-89.4,this.c(-89.4)+a*.4,this.y0(-89.4)+.06),.015,gt.WOOD,"spillApron","lip")}{let i=e(-121,this.c(-121),this.y0(-121)+.02);n(i,e(-121.7,this.c(-121.7)-.6,this.y0(-121.7)+.02),.02,gt.METAL,"sluiceToRight","flap"),n(i,e(-121.7,this.c(-121.7)+.6,this.y0(-121.7)+.02),.02,gt.METAL,"sluiceToLeft","flap"),this.sluicePivot=i}{let i=[[-148.6,.42],[-146,.38],[-143,.32],[-140.2,.2]].map(([s,a])=>e(s,this.c(s)+a,this.y0(s)+.01));for(let s=0;s<i.length-1;s++)n(i[s],i[s+1],.028,gt.RUBBER,"headGuide","boom");this.headGuidePts=i;for(let s of[-1,1]){let a=[];a.push(e(-138.7,this.c(-138.7)+s*.5,this.y0(-138.7)+.02));for(let o=-137.9;o<=-130;o+=.4)a.push(e(o,this.c(o)+s*.09,this.y0(o)+.025));for(let o=0;o<a.length-1;o++)n(a[o],a[o+1],.01,gt.METAL,"headRails","rail")}}{let i=[[56.9,.5],[58,.48],[59.2,.5],[60.4,.45],[61.6,.3]].map(([s,a])=>e(s,this.c(s)+a,this.y0(s)+.02));for(let s=0;s<i.length-1;s++)n(i[s],i[s+1],.02,gt.WOOD,"habitatBypass","boom");this.habitatPts=i}{let i=Zt,s=this.c(i);for(let a of[-1,1]){let o=s+a*(this.wR(i)+.07),l=e(i,o,this.bedH(i,o)-.05),c=[l[0],l[1]+.9,l[2]];n(l,c,.04,gt.WOOD,null,"gate")}}this.buildColliderGrid()}obbFromSegment(t,e,n,i,s,a,o=!1){let l=e[0]-t[0],c=e[1]-t[1],h=e[2]-t[2],d=Math.hypot(l,c,h);l/=d,c/=d,h/=d;let u=-h,f=l,y=Math.hypot(u,f);u/=y,f/=y;let g=c*f-h*0,m=h*u-l*f,p=l*0-c*u;m<0&&(g=-g,m=-m,p=-p,u=-u,f=-f);let _=Math.hypot(g,m,p);g/=_,m/=_,p/=_;let x=(t[0]+e[0])/2,v=(t[1]+e[1])/2,b=(t[2]+e[2])/2,S=d/2,A=i,E=n;if(o)x-=g*i,v-=m*i,b-=p*i;else return A=i,E=n,{type:2,cx:x,cy:v,cz:b,ax:[l,c,h],ay:[g,m,p],az:[u,0,f],h:[S,i,n],mat:s,group:a,wall:!0};return{type:2,cx:x,cy:v,cz:b,ax:[l,c,h],ay:[g,m,p],az:[u,0,f],h:[S,A,E],mat:s,group:a}}buildColliderGrid(){this.gcell=.5,this.grid=new Map,this.colliders.forEach((t,e)=>this.insertCollider(t,e))}colliderBounds(t){if(t.type===0)return[t.x-t.r,t.z-t.r,t.x+t.r,t.z+t.r];if(t.type===1)return[Math.min(t.ax,t.bx)-t.r,Math.min(t.az,t.bz)-t.r,Math.max(t.ax,t.bx)+t.r,Math.max(t.az,t.bz)+t.r];let e=Math.abs(t.ax[0])*t.h[0]+Math.abs(t.ay[0])*t.h[1]+Math.abs(t.az[0])*t.h[2],n=Math.abs(t.ax[2])*t.h[0]+Math.abs(t.ay[2])*t.h[1]+Math.abs(t.az[2])*t.h[2];return[t.cx-e,t.cz-n,t.cx+e,t.cz+n]}insertCollider(t,e){let[n,i,s,a]=this.colliderBounds(t),o=this.gcell,l=.0335+.02;for(let c=Math.floor((n-l)/o);c<=Math.floor((s+l)/o);c++)for(let h=Math.floor((i-l)/o);h<=Math.floor((a+l)/o);h++){let d=c*100003+h,u=this.grid.get(d);u||(u=[],this.grid.set(d,u)),u.push(e)}}cellList(t,e){return this.grid.get(Math.floor(t/this.gcell)*100003+Math.floor(e/this.gcell))}chuteFor(t){let n=rt[t].s,i=this.pads[t],s=this.c(n),a=this.wR(n),o=this.y0(n),l=(m,p,_)=>{let x=this.worldXZ(m,p);return[x.x,_,x.z]},c=i.y+.55,[h,d,u]=i.chute,f=l(h.s,h.d,h.y),y=l(d.s,d.d,d.y),g=l(u.s,u.d,u.y);return{R0:f,M:y,E:g,benchTop:c,pad:i}}chuteColliders(t){let{R0:e,M:n,E:i}=this.chuteFor(t),s=[],a=(o,l)=>{s.push(this.obbFromSegment(o,l,.048,.006,gt.WOOD,"chute",!0));let c=l[0]-o[0],h=l[2]-o[2],d=Math.hypot(c,h);c/=d,h/=d;let u=-h,f=c;for(let y of[-1,1]){let g=.052*y,m=[o[0]+u*g,o[1]+.03,o[2]+f*g],p=[l[0]+u*g,l[1]+.03,l[2]+f*g];s.push(this.obbFromSegment(m,p,.005,.032,gt.WOOD,"chute"))}};return a(e,n),a(n,i),s}};var go=9.81,Mr=1e3,_u=1.2,bu=4/3*Math.PI*.0335**3,wu=Math.PI*.0335*.0335,ch=.55,Mu=.55,Su=.55;function Pn(r){let e=r.rs=r.rs+1831565813>>>0;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function yo(r,t,e){return{id:r,spec:t,x:0,y:0,z:0,vx:0,vy:0,vz:0,wx:0,wy:0,wz:0,qx:0,qy:0,qz:0,qw:1,hint:-1,s:0,d:0,rs:e>>>0,wet:0,sub:0,ground:!1,groundMat:-1,speedAvg:1,stallT:0,age:0,wob:0,airT:0,lastSplash:-1,start:0,site:0,recipe:0,payout:0,cps:[],cpi:0,state:"roll",paid:!1,maxS:0}}var Sr=class{constructor(t){this.creek=t,this.balls=[],this.t=0,this.disabled=new Set(["rootRail","splashGuard","poolGuide","catchRamp","spillRail","alderBypass","landingBoards","debrisScreen","willowShield","willowFlare","slateBumpers","leafGrate","gateDirect","gateCalm","splitMergeRail","basinBoom","spillApron","sluiceToRight","sluiceToLeft","headGuide","headRails","habitatBypass"]),this.extra=[],this.matOn=!1,this.events=[],this.loc={},this.bedTmp={},this.flowTmp={},this.windTmp={},this.hash=new Map,this.wobbleAmp=e=>(e.spec&Ce.CORES?.08:.32)*(e.recipe===3?.35:e.recipe===5?.7:1)*(e.gauged?.6:1)}setGroup(t,e){e?this.disabled.delete(t):this.disabled.add(t)}step(t){this.t+=t;let e=this.balls;for(let n=0;n<e.length;n++){let i=e[n];if(i.state!=="roll")continue;let s=Math.hypot(i.vx,i.vy,i.vz),a=Math.ceil(s*t/(.4*.0335));a<1?a=1:a>14&&(a=14);let o=t/a;for(let l=0;l<a;l++)this.stepBall(i,o);i.age+=t,i.speedAvg+=(Math.hypot(i.vx,i.vy,i.vz)-i.speedAvg)*Math.min(1,t*2)}this.ballBall()}stepBall(t,e){let n=this.creek,i=n.locate(t.x,t.z,t.hint,this.loc);t.hint=i.idx,t.s=i.s,t.d=i.d;let s=.058+(t.spec&Ce.WATER?.003:.012)*t.wet,a=n.waterLevel(i.s,i.d),o=0,l=0,c=t.y-.0335;a>c&&(o=Math.min(2*.0335,a-c),l=Math.PI*o*o*(3*.0335-o)/3);let h=t.sub<=0&&o>0;t.sub=o;let d=s+.5*Mr*l,u=(-s*go+Mr*go*l)/d;if(t.vy+=u*e,o>0){let m=n.flowAt(i.s,i.d,t.y,this.t,i.tx,i.tz,this.flowTmp);h&&t.vy<-.6&&(this.events.push({type:"splash",x:t.x,y:a,z:t.z,v:-t.vy,id:t.id}),t.lastSplash=this.t);let p=.0335,_=Math.min(o,2*p-1e-6),x=p*p*Math.acos((p-_)/p)-(p-_)*Math.sqrt(Math.max(0,2*p*_-_*_)),v=t.recipe===4&&Math.hypot(m.vx,m.vz)<.45?1.25:1,b=.5*Mr*Mu*v*x/d,S=t.vx-m.vx,A=t.vy-m.vy,E=t.vz-m.vz,w=Math.hypot(S,A,E),M=1/(1+b*w*e),R=1/(1+6*(o/(2*p))*e);S*=M,A*=M*R,E*=M,t.vx=S+m.vx,t.vy=A+m.vy,t.vz=E+m.vz;let k=l/bu,I=Math.exp(-3.5*k*e);if(t.wx*=I,t.wy*=I,t.wz*=I,!t.ground){let D=t.vz/p*.35,U=-t.vx/p*.35,N=1-Math.exp(-2*k*e);t.wx+=(D-t.wx)*N,t.wz+=(U-t.wz)*N}t.wet=Math.min(1,t.wet+e*k*(t.spec&Ce.WATER?.08:.32)*(t.recipe===1?.45:1)),t.airT=0}else{let m=n.windAt(i.s,i.d,t.y,this.t,this.windTmp),p=t.vx-m.vx,_=t.vy-m.vy,x=t.vz-m.vz,v=Math.hypot(p,_,x),b=.5*_u*Su*wu/s;t.vx-=b*v*p*e,t.vy-=b*v*_*e,t.vz-=b*v*x*e,t.wet=Math.max(0,t.wet-e*.004),t.ground||(t.airT+=e)}if(t.ground){let m=Math.hypot(t.vx,t.vz);if(m<.5&&m>.005){t.wob+=m*e/.0335;let _=this.wobbleAmp(t)*(1-m/.5)*Math.sin(t.wob*1+t.id%7);t.vx+=-t.vz/m*_*e,t.vz+=t.vx/m*_*e}}t.x+=t.vx*e,t.y+=t.vy*e,t.z+=t.vz*e,t.ground=!1,this.collideBed(t,e,s,i);let f=n.cellList(t.x,t.z);if(f){let m=n.colliders;for(let p=0;p<f.length;p++){let _=m[f[p]];_.group&&this.disabled.has(_.group)||this.collide(t,_,e,s)}}let y=this.extra;for(let m=0;m<y.length;m++){let p=y[m];if(p.off)continue;let _=t.x-p.bcx,x=t.z-p.bcz;_*_+x*x>p.br*p.br||this.collide(t,p,e,s)}let g=Math.hypot(t.wx,t.wy,t.wz);if(g>1e-6){let m=g*e*.5,p=Math.sin(m)/g,_=Math.cos(m),x=t.wx*p,v=t.wy*p,b=t.wz*p,{qx:S,qy:A,qz:E,qw:w}=t;t.qx=_*S+x*w+v*E-b*A,t.qy=_*A-x*E+v*w+b*S,t.qz=_*E+x*A-v*S+b*w,t.qw=_*w-x*S-v*A-b*E;let M=Math.hypot(t.qx,t.qy,t.qz,t.qw);t.qx/=M,t.qy/=M,t.qz/=M,t.qw/=M}}collideBed(t,e,n,i){let s=this.creek,a=s.locate(t.x,t.z,t.hint,this.loc),o=s.bedAt(a.s,a.d,this.bedTmp),l=a.tx,c=a.tz,h=-c,d=l,u=1/Math.max(.3,1-a.kap*a.d),f=o.hs*u*l+o.hd*h,y=o.hs*u*c+o.hd*d,g=1/Math.sqrt(f*f+y*y+1),m=-f*g,p=g,_=-y*g,x=o.h,v=o.mat;this.matOn&&a.s>s.roughPatch.s0-.05&&a.s<s.roughPatch.s1+.05&&s.inChannel(a.s,a.d,-.04)&&(x=s.matH(a.s,a.d),v=gt.MAT);let b=(t.y-x)*p,S=.0335-b;S>0&&this.contact(t,m,p,_,S,v,e,n,!0)}collide(t,e,n,i){let s,a,o,l,c;if(e.type===0){if(s=t.x-e.x,a=t.y-e.y,o=t.z-e.z,l=Math.hypot(s,a,o),c=e.r+.0335,l>=c||l<1e-9)return;s/=l,a/=l,o/=l,this.contact(t,s,a,o,c-l,e.mat,n,i,!1)}else if(e.type===1){let h=e.bx-e.ax,d=e.by-e.ay,u=e.bz-e.az,f=((t.x-e.ax)*h+(t.y-e.ay)*d+(t.z-e.az)*u)/(h*h+d*d+u*u);if(f=f<0?0:f>1?1:f,s=t.x-(e.ax+h*f),a=t.y-(e.ay+d*f),o=t.z-(e.az+u*f),l=Math.hypot(s,a,o),c=e.r+.0335,l>=c||l<1e-9)return;s/=l,a/=l,o/=l,this.contact(t,s,a,o,c-l,e.mat,n,i,!1)}else{let h=t.x-e.cx,d=t.y-e.cy,u=t.z-e.cz,f=e.ax,y=e.ay,g=e.az,m=e.h,p=h*f[0]+d*f[1]+u*f[2],_=h*y[0]+d*y[1]+u*y[2],x=h*g[0]+d*g[1]+u*g[2],v=p<-m[0]?-m[0]:p>m[0]?m[0]:p,b=_<-m[1]?-m[1]:_>m[1]?m[1]:_,S=x<-m[2]?-m[2]:x>m[2]?m[2]:x,A=p-v,E=_-b,w=x-S,M=A*A+E*E+w*w,R;if(M>1e-12){if(l=Math.sqrt(M),l>=.0335)return;A/=l,E/=l,w/=l,R=.0335-l}else{let k=m[0]-Math.abs(p),I=m[1]-Math.abs(_),D=m[2]-Math.abs(x);A=0,E=0,w=0,I<=k&&I<=D?(E=_>=0?1:-1,R=I+.0335):D<=k?(w=x>=0?1:-1,R=D+.0335):(A=p>=0?1:-1,R=k+.0335)}s=A*f[0]+E*y[0]+w*g[0],a=A*f[1]+E*y[1]+w*g[1],o=A*f[2]+E*y[2]+w*g[2],this.contact(t,s,a,o,R,e.mat,n,i,!1,e)}}contact(t,e,n,i,s,a,o,l,c,h){let d=mo[a]||mo[1];t.x+=e*s,t.y+=n*s,t.z+=i*s,n>.35&&(t.ground=!0,t.groundMat=a);let u=t.vx*e+t.vy*n+t.vz*i,f=0;if(h&&h.vx!==void 0){let M=h.vx*e+h.vy*n+h.vz*i;u-=M}if(u<0){let M=0,R=-u;if(R>.22){let k=R>2,I=t.spec&Ce.REINFORCED?.03:.13,D=.76;if(k&&(D+=I*(Pn(t)*2-1)),k&&t.recipe===2&&(D*=.82),M=Math.min(.92,Math.sqrt(D*d.e/.72)*.86)*(1-.35*t.wet),t.sub>.0335&&(M*=.35),R>.5&&this.events.push({type:"hit",mat:a,v:R,x:t.x,y:t.y,z:t.z,id:t.id}),k){let U=(t.spec&Ce.SEAM?.04:.1)*Math.min(1,R/5),N=(Pn(t)-.5)*U*R,W=(Pn(t)-.5)*U*R,F=-i,J=e,it=Math.hypot(F,J)||1;F/=it,J/=it,t.vx+=F*N,t.vz+=J*N,t.vy+=W*.3}}if(f=-(1+M)*u*l,t.vx+=e*f/l,t.vy+=n*f/l,t.vz+=i*f/l,c&&d.bump>0&&R>.3){let k=d.bump*R;t.vx+=(Pn(t)-.5)*k,t.vz+=(Pn(t)-.5)*k}}let y=Math.min(1,Math.PI*t.sub*t.sub*(3*.0335-t.sub)/3*Mr/l),g=Math.max(0,1-y)*l*go*Math.max(0,n)*o,m=Math.max(f,g),p=.0335,_=t.vx+(t.wy*-i*p-t.wz*-n*p),x=t.vy+(t.wz*-e*p-t.wx*-i*p),v=t.vz+(t.wx*-n*p-t.wy*-e*p),b=_*e+x*n+v*i,S=_-b*e,A=x-b*n,E=v-b*i,w=Math.hypot(S,A,E);if(w>1e-6){S/=w,A/=w,E/=w;let M=w*l/(1+1/ch),R=d.mu;t.recipe===1&&a===gt.WOOD&&t.sub<=0&&(R*=.85),t.recipe===4&&a===gt.ROCK&&t.wet>.25&&(R*=1.25);let k=Math.min(M,R*m);t.vx-=S*k/l,t.vy-=A*k/l,t.vz-=E*k/l;let I=ch*l*p*p,D=p*k/I;t.wx+=D*(n*E-i*A),t.wy+=D*(i*S-e*E),t.wz+=D*(e*A-n*S)}if(g>0){let M=d.crr;if(a===gt.GRAVEL){let U=Math.sin(t.x*37.1+t.z*11.3)*Math.sin(t.z*29.7-t.x*7.9);M*=1+2.2*Math.max(0,U),t.s>this.creek.roughPatch.s0&&t.s<this.creek.roughPatch.s1&&(M*=2.5)}M*=1+.6*t.wet,t.recipe===2&&t.sub<.0335*.5&&(M*=1.2);let R=t.vx-(t.vx*e+t.vy*n+t.vz*i)*e,k=t.vy-(t.vx*e+t.vy*n+t.vz*i)*n,I=t.vz-(t.vx*e+t.vy*n+t.vz*i)*i,D=Math.hypot(R,k,I);if(D>1e-5){let U=Math.min(D,M*g/l),N=U/D;t.vx-=R*N,t.vy-=k*N,t.vz-=I*N;let W=1-Math.min(1,U/Math.max(D,1e-4));t.wx*=W,t.wy*=W,t.wz*=W}}}ballBall(){let t=this.balls,e=this.hash;e.clear();let n=.09;for(let s=0;s<t.length;s++){let a=t[s];if(a.state!=="roll")continue;let o=Math.floor(a.x/n)*73856093^Math.floor(a.z/n)*19349663,l=e.get(o);l||(l=[],e.set(o,l)),l.push(a)}let i=4*.0335*.0335;for(let s=0;s<t.length;s++){let a=t[s];if(a.state!=="roll")continue;let o=Math.floor(a.x/n),l=Math.floor(a.z/n);for(let c=-1;c<=1;c++)for(let h=-1;h<=1;h++){let d=e.get((o+c)*73856093^(l+h)*19349663);if(d)for(let u=0;u<d.length;u++){let f=d[u];if(f.id<=a.id)continue;let y=f.x-a.x,g=f.y-a.y,m=f.z-a.z,p=y*y+g*g+m*m;if(p>=i||p<1e-12)continue;let _=Math.sqrt(p);y/=_,g/=_,m/=_;let x=2*.0335-_;a.x-=y*x*.5,a.y-=g*x*.5,a.z-=m*x*.5,f.x+=y*x*.5,f.y+=g*x*.5,f.z+=m*x*.5;let v=(f.vx-a.vx)*y+(f.vy-a.vy)*g+(f.vz-a.vz)*m;if(v<0){let b=-1.55*v/2;a.vx-=y*b,a.vy-=g*b,a.vz-=m*b,f.vx+=y*b,f.vy+=g*b,f.vz+=m*b,-v>.25&&this.events.push({type:"bump",v:-v,x:(a.x+f.x)/2,y:(a.y+f.y)/2,z:(a.z+f.z)/2})}}}}}};var $s=2,Er=["grounds","waterfall","shelf","springs","alder","gorge"],Tr=[{id:"root",s0:92.6,s1:94.2,fix:"rootRail",label:"the exposed root"},{id:"gravel",s0:94.2,s1:96.4,fix:"gravelMat",label:"the rough gravel"},{id:"lip",s0:85,s1:87.6,fix:"splashGuard",label:"the waterfall lip"},{id:"pool",s0:87.6,s1:90.5,fix:"poolGuide",label:"the plunge pool eddy"},{id:"catch",s0:76,s1:80.5,fix:"catchRamp",label:"the Shelf drop"},{id:"codeRot",s0:57.6,s1:60.4,fix:"habitatBypass",label:"the Code Rot pocket at the Springs",side:1},{id:"springs",s0:54,s1:61.6,fix:"debrisScreen",label:"the Springs driftwood"},{id:"outlet",s0:61.6,s1:62.15,fix:"clearingArm",label:"the Springs outlet notch"},{id:"spillway",s0:62.15,s1:68,fix:"spillRail",label:"the narrow spillway"},{id:"island",s0:44,s1:50.5,fix:"alderBypass",label:"the dead pocket at the island"},{id:"gorgeStep",s0:8.6,s1:11,fix:"landingBoards",label:"the first Gorge drop"},{id:"slateEdge",s0:-12.9,s1:-11,fix:"slateBumpers",label:"the first slab at Slate Steps"},{id:"leafPocket",s0:-15.2,s1:-14,fix:"leafGrate",label:"the leaf-covered pocket"},{id:"slatePool",s0:-9,s1:-7.3,fix:"slateOutlet",label:"the second Slate pocket pool"},{id:"willowRoot",s0:-26.5,s1:-25.4,fix:"willowShield",label:"the inside root at Willow Narrows"},{id:"willowExit",s0:-25.4,s1:-19.6,fix:"willowFlare",label:"the Willow Narrows pinch"},{id:"basin",s0:-73.5,s1:-62.5,fix:"basinBoom",label:"the Long Eddy recirculation"},{id:"spillApron",s0:-91.2,s1:-89.2,fix:"spillApron",label:"the Spillway apron rocks"},{id:"spillPool",s0:-89.2,s1:-85.5,fix:"spillSkimmer",label:"the Spillway pool edges"},{id:"sluiceMerge",s0:-111,s1:-105.5,fix:"sluiceMerge",label:"the Sluice merge"},{id:"headPool",s0:-152,s1:-138.3,fix:"headGuide",label:"the quiet spring margin"}],ns=[{id:"arm",up:"clearingArm",s0:59.4,s1:62.9,pivotS:61.4,side:1,name:"Clearing Arm"},{id:"branch",up:"branchSweeper",s0:44,s1:50.8,pivotS:47.4,side:-1,name:"Branch Sweeper"},{id:"skimmer",up:"spillSkimmer",s0:-90.9,s1:-85.6,pivotS:-88.2,side:1,name:"Pool Skimmer"}],xo=ns[0],In={s:38.5,side:-1},Eu=["rootRail","splashGuard","poolGuide","catchRamp","spillRail","alderBypass","landingBoards","debrisScreen","willowShield","willowFlare","slateBumpers","leafGrate","splitMergeRail","basinBoom","spillApron","headGuide","headRails","habitatBypass"];function Tu(r){return{id:rt[r].id,open:r===0,owned:new Set,hopper:[],post:[],pressProg:0,pressCount:0,feederT:0,manualCD:0,lastLaunch:null,recipe:0,changeT:0,batch:[],madeBy:[0,0,0,0,0,0],enabled:{press:!0,feeder:!0,release:!0},gap:0,autoGapK:1,waitT:0,status:"",reason:"",stats:{made:0,launched:0,finished:0,lost:0,revenue:0,rejected:0,transferredOut:0,transferredIn:0},ncnBatch:1,ncnMade:0,ncnFinished:0,replica:null,gauge:!0,chuteCols:[]}}var Ar=class{constructor(t,e=null,n={}){this.creek=t,this.phys=new Sr(t),this.events=[],this.acc=0,this.headless=!!n.headless,this.reset(),e&&this.load(e),this.applyOwned(),this.installChutes(),this.lastSaveT=this.t}reset(){this.t=0,this.status={press:"",feeder:"",creek:""},this.cash=0,this.owned=new Set,this.sites=rt.map((t,e)=>Tu(e)),this.sel=0,this.nextId=1,this.ncnSerial=0,this.stats={made:0,launched:0,finished:0,lost:0,paid:0,completed:0,rejected:0,draftCatch:0},this.recent=[],this.basket=[],this.overflow=0,this.drainT=0,this.crate=0,this.crates=[0,0,0,0,0,0],this.settings={sound:!0,auto:!0,quality:"high",sens:1,fov:70,headBob:!0,quiet:!1,firstPerson:!0},this.routeStats=rt.map(()=>({n:0,avg:0,last:0,best:0})),this.records={bestCpm:0,bestRun:{},finishesByRecipe:[0,0,0,0,0,0],gorgeFirst:null,headFirst:null},this.lastFinish=null,this.laneLast=[null,null],this.bestCpm=0,this.gorgeFinished=!1,this.lossBySpot={},this.lossLog=[],this.stallLog=[],this.sweep=ns.map(()=>({phase:0,cd:0})),this.arm=this.sweep[0],this.seenStatus={},this.logs=[0,2.1,4.2].map(t=>({ph:t,x:0,y:0,z:0,ax:0,az:0,bx:0,bz:0,ang:0})),this.finishTimes=[],this.launchSeed=99,this.order=null,this.orderLog=[],this.orderSeq=1,this.workshop={routes:[],carts:[],priority:{site:null,share:.5},shipped:0,yard:[],tripsTo:{}},this.splitGate="balanced",this.gatePhase=0,this.sluiceLane=0,this.presets=[null,null,null,null,null],this.bench={windows:[],current:null},this.trial=null,this.milestones={},this.player=null,this.reachStats=Re.map(()=>({count:0,delay:0,delayN:0,delayAvg:0,congested:!1})),this.splits=[],this.sessionStart=void 0,this.phys.balls=[]}get site(){return this.sites[this.sel]}get unlocked(){let t=0;for(let e of this.sites)e.open&&t++;return t}openSites(){let t=[];return this.sites.forEach((e,n)=>{e.open&&t.push(n)}),t}isOpen(t){let e=Ke[t];return e!==void 0&&this.sites[e].open}siteNumbers(t){return _r(this.sites[t].owned)}get numbers(){let t=this.siteNumbers(this.sel),e=fo(this.owned);return{...t,...e}}get finish(){return fo(this.owned)}has(t,e=this.sel){return sn(t)?this.sites[e].owned.has(t):this.owned.has(t)}anySite(t){return this.sites.some(e=>e.open&&e.owned.has(t))}ballsRolling(){let t=0;for(let e of this.phys.balls)e.state==="roll"&&!e.paid&&t++;return t}queueCount(){let t=0;for(let e of this.phys.balls)e.state==="queue"&&t++;return t}hopperTotal(){let t=0;for(let e of this.sites)t+=e.hopper.length+e.post.length;return t}get hopper(){return this.site.hopper}cashPerMin(t=60){let e=0;for(let i=this.recent.length-1;i>=0;i--){let[s,a]=this.recent[i];if(this.t-s>t)break;e+=a}let n=Math.min(t,Math.max(10,this.t-(this.sessionStart??0)));return e*60/n}ballsPerMin(t=60){let e=0;for(let i=this.finishTimes.length-1;i>=0&&!(this.t-this.finishTimes[i]>t);i--)e++;let n=Math.min(t,Math.max(10,this.t-(this.sessionStart??0)));return e*60/n}etaFor(t){let e=this.routeStats[t];return e.n>=3?e.avg:rt[t].eta}specFor(t){let e=this.sites[t],n=oh(e.owned);return e.owned.has("replicaJig")&&e.replica&&(n|=Ce.REPLICA),n}payoutFor(t,e=this.specFor(t),n=this.sites[t].recipe){return rt[t].base+qs(e)+Ws(rt[t].base,n)}nextArrival(){let t=1/0;for(let e of this.phys.balls){if(e.state!=="roll"||e.paid)continue;let n=this.etaFor(e.start)-e.age;n<t&&(t=n)}return t===1/0?null:Math.max(0,t)}recipeAvailable(t){let e=Ze[t];return!e.area||this.isOpen(e.area)}canBuy(t,e=this.sel){let n=ze[t];if(!n)return{ok:!1,why:"Unknown"};if(sn(t)&&!this.sites[e].open)return{ok:!1,why:"Site not open"};if(this.has(t,e))return{ok:!1,why:"Owned"};for(let s of n.requires)if(!this.has(s,e))return{ok:!1,why:`Requires ${ze[s].name}`};for(let s of n.requiresGlobal||[])if(!this.owned.has(s))return{ok:!1,why:`Requires ${ze[s].name}`};return n.area&&!this.isOpen(n.area)?{ok:!1,why:`Requires ${rt[Ke[n.area]].name}`}:this.cash<n.price?{ok:!1,why:"Not enough cash",afford:!1,avail:!0}:{ok:!0}}blocked(t,e=this.sel){let n=this.canBuy(t,e);return!n.ok&&!n.avail&&n.why!=="Owned"}buy(t,e=this.sel){if(!this.canBuy(t,e).ok)return!1;let i=ze[t],s=this.measureNow();return this.cash-=i.price,sn(t)?this.sites[e].owned.add(t):this.owned.add(t),this.applyOwned(),t==="bankWorkshop"&&!this.workshop.routes.length&&(this.workshop.routes=[this.defaultRouteDest()]),this.trial={id:t,site:sn(t)?e:null,t0:this.t,before:s,after:null,startFin:this.stats.finished,startCash:this.stats.paid,startLost:this.stats.lost},this.events.push({type:"purchase",id:t,site:e}),!0}siteCost(t){return rt[t].cost}canUnlock(t){let e=rt[t];return!e||this.sites[t].open||e.after&&!this.isOpen(e.after)?!1:this.cash>=e.cost}unlockable(t){let e=rt[t];return!this.sites[t].open&&(!e.after||this.isOpen(e.after))}unlock(t){if(!this.canUnlock(t))return!1;this.cash-=rt[t].cost;let e=this.sites[t];e.open=!0,this.anySite("press")&&e.owned.add("press"),this.anySite("feeder")&&e.owned.add("feeder"),this.installChutes(),this.events.push({type:"unlock",k:t});let n={shelf:"shelf",springs:"springs",alder:"alder",gorge:"gorge",slate:"slate"}[rt[t].id];return n&&!this.milestones[n]&&(this.milestones[n]=this.t,this.events.push({type:"intro",what:n})),!0}selectSite(t){return!this.sites[t]||!this.sites[t].open?!1:(this.sel=t,this.events.push({type:"selectSite",k:t}),!0)}selectStart(t){return this.selectSite(t)}applyOwned(){let t=this.owned,e=this.phys;for(let s of Eu)e.setGroup(s,t.has(s));e.matOn=t.has("gravelMat"),e.setGroup("roughPebbles",!t.has("gravelMat")),e.setGroup("willowPinch",!t.has("willowFlare")),e.setGroup("slateLip",!t.has("slateOutlet")),e.setGroup("sluiceMergeRocks",!t.has("sluiceMerge"));let n=this.creek.mods;n.basinVane=t.has("basinVane"),n.slateOutlet=t.has("slateOutlet"),n.headGuide=t.has("headGuide"),n.sluiceMerge=t.has("sluiceMerge"),n.habitatGuide=t.has("habitatBypass"),n.windScreen=t.has("windScreen"),this.updateGates(0);let i=1+(t.has("secondPost")?1:0)+(t.has("thirdPost")?1:0);if(t.has("bankWorkshop"))for(;this.workshop.routes.length>i;)this.workshop.routes.pop();else this.workshop.routes=[]}routeLimit(){return this.owned.has("bankWorkshop")?1+(this.owned.has("secondPost")?1:0)+(this.owned.has("thirdPost")?1:0):0}installChutes(){let t=[];this.sites.forEach((e,n)=>{if(!e.open){e.chuteCols=[];return}if(!e.chuteCols.length){let i=this.creek.chuteColliders(n);for(let s of i)s.bcx=s.cx,s.bcz=s.cz,s.br=Math.hypot(s.h[0],s.h[2])+.0335+.05;e.chuteCols=i}t.push(...e.chuteCols)}),this.chuteCols=t,this.rebuildExtra()}rebuildExtra(){this.phys.extra=[...this.chuteCols||[],...this.logCols()]}makeItem(t,e=!1){let n=this.sites[t],i={id:this.nextId++,spec:this.specFor(t),recipe:n.recipe,site:t,made:this.t};return n.owned.has("ncnStamp")&&(i.ncn=++this.ncnSerial,i.batch=n.ncnBatch,n.ncnMade++),n.owned.has("replicaJig")&&n.replica&&(i.replica=n.replica),n.owned.has("shapeGauge")&&n.gauge&&(i.gauged=!0),n.madeBy[i.recipe]++,n.stats.made++,this.stats.made++,e&&this.events.push({type:"handMade",site:t}),i}manualRoll(t=this.sel){let e=this.sites[t];if(!e||!e.open)return"closed";if(e.manualCD>0)return"cooldown";let n=e.hopper.length?e.hopper.shift():e.post.length?e.post.shift():this.makeItem(t,!0);return this.launch(t,n,!0),e.manualCD=vr,"ok"}setRecipe(t,e){let n=this.sites[t];return!this.recipeAvailable(e)||n.recipe===e?!1:(n.recipe=e,n.changeT=this.siteNumbers(t).changeover,this.events.push({type:"recipe",site:t,recipe:e}),!0)}launch(t,e,n=!1){let i=this.creek.chuteFor(t),s=this.sites[t],a=yo(e.id,e.spec,e.id*2654435761^this.launchSeed),[o,l,c]=i.R0,[h,d,u]=i.M,f=h-o,y=d-l,g=u-c,m=Math.hypot(f,y,g);f/=m,y/=m,g/=m;let p=Math.hypot(f,g),_=-f*y/p,x=p,v=-g*y/p;a.x=o+f*.05+_*(.0335+.002),a.y=l+y*.05+x*(.0335+.002),a.z=c+g*.05+v*(.0335+.002),a.recipe=e.recipe||0,a.site=e.site??t,a.ncn=e.ncn||0,a.batch=e.batch||0,a.replica=e.replica||null,a.gauged=!!e.gauged;let b=s.owned.has("lowFriction")?.07:.22;e.spec&Ce.SEAM&&(b*=.25),a.recipe===uo.select&&(b*=.3),a.gauged&&(b*=.7);let S=.55*(1+b*(Pn(a)*2-1)),A=(e.spec&Ce.SEAM?.01:.04)*(Pn(a)*2-1),E=-g/p,w=f/p;a.vx=f*S+E*A,a.vy=y*S,a.vz=g*S+w*A,a.start=t,a.payout=this.payoutFor(t,e.spec,a.recipe),a.cps=rh(t),a.cpi=0,a.cpT=[],a.launchT=this.t,this.reserveOrder(a);let M=this.creek.locate(a.x,a.z,-1,{});return a.hint=M.idx,a.s=M.s,a.d=M.d,a.prevS=M.s,a.maxS=M.s,this.phys.balls.push(a),s.lastLaunch={id:e.id,t:this.t,x:a.x,y:a.y,z:a.z},s.stats.launched++,this.stats.launched++,this.events.push({type:"launch",id:e.id,manual:n,spec:e.spec,k:t,recipe:a.recipe}),a}chuteClear(t){let e=this.sites[t],n=e.lastLaunch;if(!n)return!0;let i=this.phys.balls.find(o=>o.id===n.id),s=this.t-n.t;if(!i||i.state!=="roll")return s>.2;let a=Math.hypot(i.x-n.x,i.y-n.y,i.z-n.z);return e.owned.has("spacingSensor")?a>=.3&&s>=.2:s>=1.25&&a>=1||s>4}admission(t){let e=this.sites[t],n=rt[t];if(this.ballsRolling()>=this.ballBudget)return"Network ball budget full";if(this.queueCount()>=7+this.finish.overflow/8)return"Finish backed up";let s=Vs(n.s);for(let a=s;a>=0;a--){let o=this.reachStats[a];if(o.count>=this.reachCap(a)&&(o.count>=this.reachCap(a)+1||o.turn!==void 0&&o.turn!==t))return`${Re[a].name} backed up`}for(let a of this.phys.balls)if(!(a.state!=="roll"||a.start===t)&&a.s>n.s-.9&&a.s<n.s+.35&&(e.waitT<3||Math.abs(a.s-(n.s+.1))<.35))return"Yielding to passing balls";return""}reachCap(t){let e=Re[t];return e.capStock&&!this.owned.has(e.capFix)?e.capStock:e.cap}get ballBudget(){return this.settings.ballBudget||650}update(t){this.acc+=Math.min(t,.25);let e=0;for(;this.acc>=xr&&e<30;)this.tick(xr),this.acc-=xr,e++;return e>=30&&(this.acc=0),e}tick(t){this.t+=t,this.sessionStart===void 0&&(this.sessionStart=this.t-t);let e=this.settings.auto,n=this.finish,i=this.queueCount();this.status=this.status||{},this.status.creek=i>=2?"Creek backed up":"",(this.t/t|0)%6===0&&this.updateReaches();let s=null;for(let o=0;o<this.sites.length;o++){let l=this.sites[o];if(!l.open)continue;l.manualCD=Math.max(0,l.manualCD-t);let c=this.siteNumbers(o);if(l.status="",l.owned.has("press"))if(!e||!l.enabled.press)l.pressStatus="Paused";else if(l.changeT>0)l.changeT-=t,l.pressStatus="Changing recipe";else if(l.hopper.length>=c.hopper)l.pressStatus="Press waiting",l.pressProg=Math.min(l.pressProg,1);else{l.pressStatus="";let h=c.cycle*(l.recipe===uo.select?1.15:1);l.pressProg+=t/h,l.pressProg>=1&&(l.pressProg-=1,l.pressCount++,l.owned.has("shapeGauge")&&l.gauge&&Pn(this.gaugeRng)<(l.owned.has("cores")?.03:.07)?(l.stats.rejected++,this.stats.rejected++,this.events.push({type:"gaugeReject",site:o})):(l.hopper.push(this.makeItem(o)),this.events.push({type:"pressed",head:l.pressCount%2,site:o}),this.advanceBatch(o)))}else l.pressStatus="";if(l.feederStatus="",l.owned.has("feeder")){let h=c.feeder;if(l.gap>0?h=Math.max(c.feeder,l.gap):this.owned.has("autoGap")&&(h=c.feeder*l.autoGapK),i>=2&&(h*=1+i*.5),l.feederT+=t,!e||!l.enabled.feeder)l.feederStatus="Paused";else if(!l.enabled.release)l.feederStatus="Releases off";else if(l.feederT>=h)if(!l.hopper.length&&!l.post.length)l.feederStatus="Hopper empty";else if(!this.chuteClear(o))l.feederStatus="";else{let d=this.admission(o);if(d)l.feederStatus=d,l.waitT+=t,(!s||l.waitT>s.waitT)&&(s=l);else{let u=l.hopper.length?l.hopper.shift():l.post.shift();this.launch(o,u),l.feederT=0,l.waitT=0}}l.feederT>h*3&&(l.feederT=h*3)}l.reason=this.siteReason(o)}for(let o of this.reachStats)o.turn=void 0;let a=this.sites.map((o,l)=>({s:o,k:l})).filter(o=>o.s.open&&o.s.waitT>0).sort((o,l)=>l.s.waitT-o.s.waitT);for(let{k:o}of a)for(let l=Vs(rt[o].s);l>=0;l--)this.reachStats[l].count>=this.reachCap(l)&&this.reachStats[l].turn===void 0&&(this.reachStats[l].turn=o);this.status.press=this.site.pressStatus||"",this.status.feeder=this.site.feederStatus||"";for(let o of["press","feeder","creek"])this.status[o]&&(this.seenStatus[this.status[o]]=this.t);this.updateLogs(t),this.updateGates(t),this.updateSweepers(t),this.updateWorkshop(t),this.phys.step(t);for(let o of this.phys.events)this.events.push(o);if(this.phys.events.length=0,this.trackBalls(t),this.basket.length){if(this.drainT+=t,this.drainT>=n.drain){this.drainT=0;let o=this.basket.shift();this.stats.completed++,this.owned.has("conveyor")&&this.crate++,this.owned.has("stacker")&&this.crates[o.recipe||0]++,this.events.push({type:"drain",recipe:o.recipe||0})}}else this.drainT=0;for(;this.basket.length<n.basketCap;){let o=null;for(let l of this.phys.balls)l.state==="queue"&&(!o||l.qT<o.qT)&&(o=l);if(o){this.toBasket(o);continue}if(this.overflow>0){this.overflow--,this.basket.push({recipe:0,spec:0});continue}break}if(this.owned.has("stacker"))for(let o=0;o<6;o++)this.crates[o]>=24&&(this.crates[o]=0,this.events.push({type:"crateOut",recipe:o}));for(;this.recent.length&&this.t-this.recent[0][0]>300;)this.recent.shift();for(;this.finishTimes.length&&this.t-this.finishTimes[0]>120;)this.finishTimes.shift();for(;this.lossLog.length&&this.t-this.lossLog[0][0]>240;)this.lossLog.shift();for(;this.stallLog.length&&this.t-this.stallLog[0][0]>240;)this.stallLog.shift();if(this.t-(this.sessionStart??0)>120){let o=this.cashPerMin(120);o>this.bestCpm&&(this.bestCpm=o,this.records.bestCpm=o)}this.updateTrial(),this.updateBench(),this.owned.has("autoGap")&&(this.t/t|0)%60===0&&this.tuneGaps()}get gaugeRng(){return this._grng||(this._grng={rs:777}),this._grng}advanceBatch(t){if(!this.owned.has("batchScheduler"))return;let e=this.sites[t],n=e.batch[0];if(n)if(n.recipe===e.recipe&&n.made++,n.made>=n.count){e.batch.shift();let i=e.batch[0];i&&this.setRecipe(t,i.recipe)}else n.recipe!==e.recipe&&e.changeT<=0&&this.setRecipe(t,n.recipe)}queueBatch(t,e,n){let i=this.sites[t];return!this.owned.has("batchScheduler")||i.batch.length>=3||!this.recipeAvailable(e)?!1:(i.batch.push({recipe:e,count:Math.max(1,n|0),made:0}),i.batch.length===1&&i.recipe!==e&&this.setRecipe(t,e),!0)}siteReason(t){let e=this.sites[t];return!e.owned.has("press")&&!e.owned.has("feeder")?"Hand-rolled only: buy an Auto Press here":e.pressStatus==="Paused"&&e.feederStatus==="Paused"?"Paused":e.feederStatus&&e.feederStatus!=="Paused"?e.feederStatus==="Hopper empty"?e.changeT>0?"Changing recipe: hopper empty meanwhile":"Hopper empty: the press is slower than the feeder":e.feederStatus:e.pressStatus==="Press waiting"?e.owned.has("feeder")?"Press waiting: the feeder or the creek limits launches":"Press waiting: hopper full, no feeder":e.pressStatus?e.pressStatus:""}updateReaches(){let t=Re.length,e=new Array(t).fill(0);for(let n of this.phys.balls)n.state==="roll"&&!n.paid&&e[Vs(n.s)]++;for(let n=0;n<t;n++){let i=this.reachStats[n];i.count=e[n],i.congested=e[n]>=this.reachCap(n)*.85}}tuneGaps(){for(let t=0;t<this.sites.length;t++){let e=this.sites[t];if(!e.open||e.gap>0)continue;let n=0;for(let s=Vs(rt[t].s);s>=0;s--)n=Math.max(n,this.reachStats[s].count/this.reachCap(s));let i=n>.85?1.6:n>.6?1.2:1;e.autoGapK+=(i-e.autoGapK)*.5}}trackBalls(t){let e=this.creek,n=this.phys.balls,i=this.finish;for(let s=n.length-1;s>=0;s--){let a=n[s];if(a.state==="queue")continue;if(a.state!=="roll"){n.splice(s,1);continue}let o=a.s,l=a.d;for(;a.cpi<a.cps.length&&o>=a.cps[a.cpi];)e.inChannel(a.cps[a.cpi],l,.4)?(a.cpT&&a.cpT.push([a.cps[a.cpi],this.t]),a.cpi++,this.events.push({type:"checkpoint",id:a.id})):(a.missed=!0,a.cpi++);if(o>a.maxS&&(a.maxS=o),a.prevS<78.45&&o>=78.45&&a.y>e.y0(79)+.4&&this.stats.draftCatch++,!a.paid&&a.prevS<Zt&&o>=Zt&&e.inChannel(Zt,l,.06)&&a.cpi>=a.cps.length&&!a.missed&&this.pay(a),a.prevS=o,o>=Be-.2){if(!a.paid){this.lose(a,"missed the gate",s);continue}if(this.basket.length<i.basketCap&&!this.queueCount()){this.toBasket(a);continue}if(this.overflow<i.overflow){this.overflow++,a.state="done",n.splice(s,1),this.events.push({type:"overflowIn"});continue}a.state="queue",a.qT=this.t,this.placeQueue();continue}if(a.paid)continue;let c=a.sub>0;a.progS===void 0&&(a.progS=o),o>a.progS+.08?(a.progS=o,a.stallT>4&&this.stallLog.push([this.t,o,a.stallT]),a.stallT=0):a.stallT+=t;let h=a.speedAvg>.06,d=h?5:2;if(a.stallT>(h?6:3)&&c&&Math.floor(a.stallT/d)!==Math.floor((a.stallT-t)/d)){let g=e.frame(o),m=(h?.15:.25)+Pn(a)*.25,p=(Pn(a)-.5)*.5;a.vx+=g.tx*m+g.nx*p,a.vz+=g.tz*m+g.nz*p,a.vy+=.15,this.events.push({type:"surge",x:a.x,y:a.y,z:a.z})}let u=e.channelOf(o,l,0),f=0;if(!u){let g=e.c(o),m=l<g?e.wL(o):e.wR(o);f=Math.abs(l-g)-m;let p=e.alt;o>p.s0&&o<p.s1&&(f=Math.min(f,Math.abs(l-e.altD(o))-p.w))}let y=null;o<-151.5||o>107||Math.abs(l)>9.5||a.y<e.bedH(o,l)-.25?y="left the creek":f>.5&&a.stallT>3?y="escaped onto the bank":a.stallT>(c?22:8)?y=a.speedAvg>.05?"stuck in an eddy":"wedged":a.age>Math.max(40,this.etaFor(a.start)*3.2)&&(y="took too long"),y&&this.lose(a,y,s)}}pay(t){t.paid=!0,this.cash+=t.payout,this.stats.paid+=t.payout,this.stats.finished++;let e=this.sites[t.start];e.stats.finished++,e.stats.revenue+=t.payout,t.ncn&&this.sites[t.site]&&this.sites[t.site].ncnFinished++,this.recent.push([this.t,t.payout]),this.finishTimes.push(this.t);let n=this.t-t.launchT,i=this.routeStats[t.start];if(i.n++,i.last=n,i.avg=i.n===1?n:i.avg+(n-i.avg)*(i.n<10?1/i.n:.1),(!i.best||n<i.best)&&(i.best=n),this.records.finishesByRecipe[t.recipe||0]++,t.cpT&&t.cpT.length){let a=t.launchT,o=rt[t.start].s,l=[];for(let[c,h]of t.cpT)l.push({s0:o,s1:c,t:h-a}),a=h,o=c;l.push({s0:o,s1:Zt,t:this.t-a}),this.splits.push({id:t.id,start:t.start,parts:l,total:n,t:this.t}),this.splits.length>40&&this.splits.shift()}if(t.orderId){let a=this.findOrder(t.orderId);a&&(a.reserved=Math.max(0,a.reserved-1),a.paid++,a.earned+=t.orderBonus,a.twoPosts&&(a.perPost[t.start]=(a.perPost[t.start]||0)+1,a.perPostRes[t.start]=Math.max(0,(a.perPostRes[t.start]||0)-1)),a===this.order&&a.paid>=a.target&&this.completeOrder())}let s=this.creek.c(Zt)>t.d?0:1;this.laneLast[s]={t:this.t,time:n},this.lastFinish={time:n,start:t.start,t:this.t,amount:t.payout},t.start===Ke.gorge&&!this.gorgeFinished&&(this.gorgeFinished=!0,this.records.gorgeFirst=this.t,this.events.push({type:"milestone",what:"gorge"})),t.start===Ke.coldspring&&!this.records.headFirst&&(this.records.headFirst=this.t,this.events.push({type:"milestone",what:"headwaters"})),this.events.push({type:"finish",id:t.id,amount:t.payout,time:n,start:t.start,recipe:t.recipe,x:t.x,y:t.y,z:t.z,lane:s})}lose(t,e,n){t.state="lost",this.stats.lost++,this.sites[t.start].stats.lost++;let i="other";for(let s of Tr)if(t.s>=s.s0&&t.s<s.s1){i=s.id;break}if(this.lossBySpot[i]=(this.lossBySpot[i]||0)+1,this.lossLog.push([this.t,i]),t.orderId){let s=this.findOrder(t.orderId);s&&(s.reserved=Math.max(0,s.reserved-1),s.twoPosts&&(s.perPostRes[t.start]=Math.max(0,(s.perPostRes[t.start]||0)-1)))}this.events.push({type:"lost",id:t.id,reason:e,x:t.x,y:t.y,z:t.z,spot:i,start:t.start}),this.phys.balls.splice(n,1)}toBasket(t){this.basket.push({recipe:t.recipe||0,spec:t.spec}),t.state="done";let e=this.phys.balls.indexOf(t);e>=0&&this.phys.balls.splice(e,1),this.events.push({type:"basketIn",id:t.id}),this.placeQueue()}placeQueue(){let t=this.phys.balls.filter(n=>n.state==="queue").sort((n,i)=>n.qT-i.qT),e=this.creek;t.forEach((n,i)=>{let s=Be-.22-i*.072,a=e.worldXZ(s,e.c(s));n.x=a.x,n.z=a.z,n.y=e.y0(s)+.0335*.3,n.vx=n.vy=n.vz=0,n.wx=n.wy=n.wz=0,n.s=s,n.qi=i})}orderOpen(t){return this.isOpen(t.opens)}findOrder(t){return this.order&&this.order.uid===t?this.order:this.orderLog.find(e=>e.uid===t)||null}acceptOrder(t,e=null){if(this.order)return!1;let n=Xn.find(i=>i.id===t);return!n||!this.orderOpen(n)||n.twoPosts&&(!e||e.length!==2||e[0]===e[1])?!1:(this.order={uid:this.orderSeq++,id:t,target:n.target,bonus:n.bonus,paid:0,reserved:0,earned:0,accepted:this.t,posts:e,perPost:{},perPostRes:{},twoPosts:!!n.twoPosts},this.events.push({type:"orderAccepted",id:t}),!0)}cancelOrder(){if(!this.order)return!1;let t=this.order;return t.cancelled=this.t,this.orderLog.push(t),this.order=null,this.events.push({type:"orderCancelled",id:t.id}),!0}completeOrder(){let t=this.order;t.done=this.t,this.orderLog.push(t),this.order=null,this.events.push({type:"orderDone",id:t.id,earned:t.earned,paid:t.paid})}orderQualifies(t,e,n){let i=Xn.find(s=>s.id===t.id);return!(i.recipe&&Ze[n].id!==i.recipe||i.onlySite&&rt[e].id!==i.onlySite||i.minSite&&rt[e].s>rt[Ke[i.minSite]].s+.01||i.twoPosts&&(!t.posts||!t.posts.includes(e)||(t.perPost[e]||0)+(t.perPostRes[e]||0)>=i.perPostCap))}reserveOrder(t){let e=this.order;e&&(e.paid+e.reserved>=e.target||this.orderQualifies(e,t.start,t.recipe)&&(e.reserved++,e.twoPosts&&(e.perPostRes[t.start]=(e.perPostRes[t.start]||0)+1),t.orderId=e.uid,t.orderBonus=e.bonus,t.payout+=e.bonus))}logCols(){return this.logs.map(t=>({type:1,ax:t.ax,ay:t.y,az:t.az,bx:t.bx,by:t.y,bz:t.bz,r:.032,mat:gt.WOOD,bcx:t.x,bcz:t.z,br:.45,off:!1,vx:t.vx||0,vy:0,vz:t.vz||0,log:t}))}updateLogs(t){let e=this.creek,n=this.owned.has("debrisScreen");this.logs.forEach((i,s)=>{i.ph+=t*.055;let a,o,l;if(n)a=56.3+s*1.45+Math.sin(this.t*.3+s)*.03,o=e.c(a)-.72-s%2*.08,l=.15*Math.sin(this.t*.2+s*2);else{let m=i.ph;a=58.2+2.1*Math.cos(m),o=e.c(a)+.05+.62*Math.sin(m),l=m+Math.PI/2+.4*Math.sin(this.t*.25+s)}let c=e.worldXZ(a,o),h=e.frame(a),d=e.y0(a)+.005,u=Math.cos(l),f=Math.sin(l),y=(h.tx*u+h.nx*f)*.27,g=(h.tz*u+h.nz*f)*.27;i.vx=(c.x-i.x)/t,i.vz=(c.z-i.z)/t,(!isFinite(i.vx)||Math.abs(i.vx)>2)&&(i.vx=0,i.vz=0),i.x=c.x,i.y=d,i.z=c.z,i.ax=c.x-y,i.az=c.z-g,i.bx=c.x+y,i.bz=c.z+g,i.ang=Math.atan2(g,y)});for(let i of this.phys.extra){if(!i.log)continue;let s=i.log;i.ax=s.ax,i.ay=s.y,i.az=s.az,i.bx=s.bx,i.by=s.y,i.bz=s.bz,i.vx=s.vx,i.vz=s.vz,i.bcx=s.x,i.bcz=s.z}}updateGates(t){let e=this.phys,n=this.owned.has("splitGate")?this.splitGate:"none";this.gatePhase+=t;let i=Math.floor(this.gatePhase/1.4)%2===0;if(e.setGroup("gateDirect",n==="direct"||n==="balanced"&&i),e.setGroup("gateCalm",n==="calm"||n==="balanced"&&!i),this.owned.has("sluiceAlternator")){if(t>0&&(this.t/t|0)%12===0){let s=0,a=0;for(let l of this.phys.balls)l.state!=="roll"||l.s<-121||l.s>-110.5||(l.d<this.creek.c(l.s)?s++:a++);this.phys.balls.some(l=>l.state==="roll"&&l.s>-122.6&&l.s<-121.3)||(s>a+2?this.sluiceLane=1:a>s+2?this.sluiceLane=0:this._sluiceLast!==this.stats.launched&&(this.sluiceLane^=1,this._sluiceLast=this.stats.launched))}e.setGroup("sluiceToRight",this.sluiceLane===1),e.setGroup("sluiceToLeft",this.sluiceLane===0)}else e.setGroup("sluiceToRight",!1),e.setGroup("sluiceToLeft",!1)}updateSweepers(t){let e=this.creek;ns.forEach((n,i)=>{let s=this.sweep[i];if(s.cd=Math.max(0,s.cd-t),s.phase>0){let a=s.phase;if(s.phase+=t/1.1,a<.5&&s.phase>=.5)for(let o of this.phys.balls){if(o.state!=="roll"||o.paid||o.s<n.s0||o.s>n.s1||o.stallT<1.5)continue;let l=o.s,c=e.channelOf(l,o.d,.3),h=e.c(l);if(c==="alt")h=e.altD(l);else if(n.id==="branch"){let f=e.island;l>f.s0&&l<f.s1&&(h=e.c(l)+f.dOff+(o.d>e.c(l)+f.dOff?.45:-.45))}else n.id==="arm"&&(h+=l>62.2?0:.1);let d=e.worldXZ(l,h);o.x=d.x,o.z=d.z,o.y=e.waterLevel(l,h)+.0335*.25,o.y>-1e8||(o.y=e.y0(l)+.0335*.25);let u=e.frame(l);o.vx=u.tx*.35,o.vz=u.tz*.35,o.vy=0,o.stallT=0,o.progS=l,o.speedAvg=.4,o.hint=-1,this.events.push({type:"armClear",id:o.id,x:o.x,y:o.y,z:o.z,sweeper:n.id})}s.phase>=1&&(s.phase=0,s.cd=.6);return}if(!(!this.owned.has(n.up)||s.cd>0)){for(let a of this.phys.balls)if(a.state==="roll"&&!a.paid&&a.s>=n.s0&&a.s<=n.s1&&a.stallT>2.2){s.phase=1e-6,this.events.push({type:"armSweep",sweeper:n.id});break}}})}defaultRouteDest(){let t=null,e=-1/0;for(let n of this.openSites()){let i=this.siteNumbers(n),s=this.sites[n].owned.has("feeder")?i.cycle-i.feeder:-1;s>e&&(e=s,t=n)}return{dest:t??0,enabled:!0}}setRoute(t,e){let n=this.workshop;return t>=this.routeLimit()||!this.sites[e]?.open?!1:(n.routes[t]={dest:e,enabled:!0},!0)}postCap(t){return 8+(this.owned.has("silos")?12:0)}cartCap(){return this.owned.has("doubleDeck")?12:6}cartSpeed(){return 1.6}legTime(t,e){let n=Math.abs(e-t)*1.12+1.5,s=Math.abs(this.creek.y0(Math.max(-151,Math.min(107,t)))-this.creek.y0(Math.max(-151,Math.min(107,e))))>2?this.owned.has("fastLift")?1.5:4:0;return n/this.cartSpeed()+s}planShipment(t){let e=this.workshop,n=e.routes[t];if(!n)return null;let i=this.sites[n.dest],s=null,a=0;for(let u of this.openSites()){if(u===n.dest)continue;let f=this.sites[u];if(!f.owned.has("press"))continue;let y=this.siteNumbers(u),g=f.enabled.release&&f.owned.has("feeder")?Math.ceil(y.hopper*.4):0,m=f.hopper.length-g;m>a&&(a=m,s=u)}let o=e.carts.filter(u=>u.dest===n.dest&&u.state!=="idle").reduce((u,f)=>u+f.reserved,0),l=this.postCap(n.dest)-i.post.length-o,c=Math.min(this.cartCap(),Math.max(0,a),Math.max(0,l)),h=In.s,d=s===null?null:this.legTime(h,rt[s].s)+this.legTime(rt[s].s,rt[n.dest].s)+4;return{src:s,dest:n.dest,n:c,space:l,eta:d}}updateWorkshop(t){let e=this.workshop;if(!this.owned.has("bankWorkshop"))return;for(;e.carts.length<e.routes.length;)e.carts.push({state:"idle",route:e.carts.length,s:In.s,load:[],reserved:0,t:0,dur:0,from:In.s,to:In.s,wait:0});e.carts.length=Math.min(e.carts.length,e.routes.length);let n=this.owned.has("prioritySwitch")?e.priority:null;e.carts.forEach((i,s)=>{let a=e.routes[s];if(!a)return;if(i.state==="idle"){let c=this.planShipment(s);if(n&&n.site!==null&&n.site!==a.dest&&this.sites[n.site]?.open){let h=Object.values(e.tripsTo).reduce((d,u)=>d+u,0)||1;if((e.tripsTo[n.site]||0)/h<n.share){let d=this.planShipment(s),u=a.dest;a.dest=n.site,c=this.planShipment(s),a.dest=u,(!c||c.n<2)&&(c=d)}}if(!c||c.src===null||c.n<2)return;i.src=c.src,i.dest=c.dest,i.reserved=c.n,this.goCart(i,rt[c.src].s,"toSource");return}let o=c=>c.state!=="idle"&&Math.abs(c.s-In.s)<6;if(!this.owned.has("passingLoop")&&i.state.startsWith("to")&&o(i)){let c=e.carts.find(h=>h!==i&&o(h)&&h.t>i.t);if(c&&c.t<c.dur){i.wait+=t;return}}i.t+=t;let l=Math.min(1,i.t/i.dur);if(i.s=i.from+(i.to-i.from)*(l*l*(3-2*l)),!(l<1))if(i.state==="toSource"){let c=this.sites[i.src],h=Math.min(i.reserved,c.hopper.length);if(i.load=c.hopper.splice(Math.max(0,c.hopper.length-h),h),c.stats.transferredOut+=i.load.length,i.reserved=i.load.length,this.events.push({type:"cartLoad",route:s,n:i.load.length,site:i.src}),!i.load.length){i.state="idle";return}this.goCart(i,rt[i.dest].s,"toDest")}else if(i.state==="toDest"){let c=this.sites[i.dest],h=this.postCap(i.dest)-c.post.length,d=Math.min(h,i.load.length);c.post.push(...i.load.splice(0,d)),c.stats.transferredIn+=d,e.shipped+=d,e.tripsTo[i.dest]=(e.tripsTo[i.dest]||0)+1,this.events.push({type:"cartUnload",route:s,n:d,site:i.dest}),i.load.length?this.goCart(i,rt[i.src].s,"returning"):(i.reserved=0,this.goCart(i,In.s,"toYard"))}else if(i.state==="returning"){let c=this.sites[i.src];c.stats.transferredOut-=i.load.length,c.hopper.push(...i.load.splice(0)),i.reserved=0,this.goCart(i,In.s,"toYard")}else i.state==="toYard"&&(i.state="idle")})}goCart(t,e,n){t.from=t.s,t.to=e,t.t=0,t.state=n,t.dur=this.legTime(t.from,e)+(n==="toSource"||n==="toDest"?2:0)}measureNow(t=90){let e=0,n=0;for(let l=this.recent.length-1;l>=0;l--){let[c,h]=this.recent[l];if(this.t-c>t)break;e++,n+=h}let i=0;for(let l=this.lossLog.length-1;l>=0&&!(this.t-this.lossLog[l][0]>t);l--)i++;let s=Math.min(t,Math.max(1,this.t-(this.sessionStart??0))),a=0,o=0;for(let l of this.splits)this.t-l.t<t&&(a+=l.total-this.etaFor(l.start),o++);return{span:s,finishes:e,cpm:n*60/s,bpm:e*60/s,escapeRate:e+i?i/(e+i):0,avgDelay:o?a/o:0}}updateTrial(){let t=this.trial;if(!t||t.after)return;let e=this.t-t.t0,n=this.stats.finished-t.startFin;if(e>=90&&n>=15||e>=240){let i=e,s=this.stats.paid-t.startCash,a=this.stats.lost-t.startLost;t.after={span:i,finishes:n,cpm:s*60/i,bpm:n*60/i,escapeRate:n+a?a/(n+a):0},this.events.push({type:"trialDone",id:t.id})}}startBenchWindow(){return!this.owned.has("efficiencyBench")||this.bench.current?!1:(this.bench.current={t0:this.t,fin:this.stats.finished,cash:this.stats.paid,lost:this.stats.lost,delay:0,n:0,startSplits:this.splits.length?this.splits[this.splits.length-1].id:0},!0)}stopBenchWindow(){let t=this.bench.current;if(!t)return!1;let e=Math.max(1,this.t-t.t0),n=this.stats.finished-t.fin,i=this.stats.lost-t.lost,s=0,a=0;for(let o of this.splits)o.t>=t.t0&&(s+=o.total-this.etaFor(o.start),a++);return this.bench.windows.push({t0:t.t0,span:e,finishRate:n*60/e,escapeRate:n+i?i/(n+i):0,avgDelay:a?s/a:0,cpm:(this.stats.paid-t.cash)*60/e,site:this.sel}),this.bench.windows.length>2&&this.bench.windows.shift(),this.bench.current=null,!0}updateBench(){}savePreset(t){return!this.owned.has("routePresets")||t<0||t>4?!1:(this.presets[t]={sites:this.sites.map(e=>({gap:e.gap,release:e.enabled.release})),priority:{...this.workshop.priority},routes:this.workshop.routes.map(e=>({...e})),gate:this.splitGate,saved:this.t},!0)}presetDiff(t){let e=this.presets[t];if(!e)return[];let n=[];return e.sites.forEach((i,s)=>{let a=this.sites[s];a.open&&(i.gap!==a.gap&&n.push(`${rt[s].name}: feeder gap ${a.gap?a.gap.toFixed(2)+" s":"auto"} \u2192 ${i.gap?i.gap.toFixed(2)+" s":"auto"}`),i.release!==a.enabled.release&&n.push(`${rt[s].name}: releases ${a.enabled.release?"on":"off"} \u2192 ${i.release?"on":"off"}`))}),this.owned.has("splitGate")&&e.gate!==this.splitGate&&n.push(`Splitstone Gate: ${this.splitGate} \u2192 ${e.gate}`),this.owned.has("prioritySwitch")&&(e.priority.site!==this.workshop.priority.site||e.priority.share!==this.workshop.priority.share)&&n.push("Priority Switch target/share changes"),e.routes.forEach((i,s)=>{let a=this.workshop.routes[s];a&&i&&a.dest!==i.dest&&n.push(`Supply route ${s+1}: \u2192 ${rt[i.dest].name}`)}),n}loadPreset(t){let e=this.presets[t];return!e||!this.owned.has("routePresets")?!1:(e.sites.forEach((n,i)=>{let s=this.sites[i];s.open&&(s.gap=n.gap,s.enabled.release=n.release)}),this.owned.has("splitGate")&&(this.splitGate=e.gate),this.owned.has("prioritySwitch")&&(this.workshop.priority={...e.priority}),e.routes.forEach((n,i)=>{n&&i<this.routeLimit()&&this.sites[n.dest]?.open&&(this.workshop.routes[i]={...n})}),!0)}suggestions(){let t={},e=this.site,n=l=>l.find(c=>!this.has(c)&&!this.blocked(c)),i=l=>e.feederStatus===l||e.pressStatus===l||this.status.creek===l||this.seenStatus[l]!==void 0&&this.t-this.seenStatus[l]<12;if(i("Hopper empty")){let l=n(["quickMold","twinPress","servo","turbo","fastFelt","parallelFelt","continuousPress"]);l&&(t[l]="This factory\u2019s hopper keeps running empty")}if(i("Press waiting")){let l=e.owned.has("feeder")?n(["lowFriction","indexed","spacingSensor","hopperExt","bulkHopper"]):"feeder";l&&(t[l]="This factory\u2019s press is waiting on a full hopper")}if(i("Creek backed up")){let l=n(["wideBasket","conveyor","splitTray","poweredBelt","overflowCrate","twinPacking","industrialCatch"]);l&&(t[l]="Balls are backing up at the finish")}let s={};for(let[,l]of this.lossLog)s[l]=(s[l]||0)+1;let a={};for(let[,l]of this.stallLog)for(let c of Tr)l>=c.s0&&l<c.s1&&(a[c.id]=(a[c.id]||0)+1);for(let l of Tr)this.has(l.fix)||this.blocked(l.fix)||((s[l.id]||0)>=2?t[l.fix]=`${s[l.id]} balls lost recently at ${l.label}`:(a[l.id]||0)>=4&&(t[l.fix]=`Balls keep stalling at ${l.label}`));for(let l=0;l<Re.length;l++)this.reachStats[l].count>=this.reachCap(l)&&Re[l].id==="willow"&&!this.owned.has("willowFlare")&&!this.blocked("willowFlare")&&(t.willowFlare="Willow Narrows is full: the pinch limits every factory above it");let o=this.siteNumbers(this.sel);return e.owned.has("feeder")&&!e.owned.has("spacingSensor")&&o.feeder<1.25&&!this.blocked("spacingSensor")&&(t.spacingSensor="This feeder is faster than its landing buffer"),o.press<o.felt&&!e.owned.has("parallelFelt")&&!this.blocked("fastFelt")&&(t[e.owned.has("fastFelt")?"parallelFelt":"fastFelt"]="Felt handling is slower than the press"),t}pressureAlert(){let t=null;for(let e=Re.length-1;e>=0;e--){let n=this.reachStats[e],i=n.count/this.reachCap(e);i>=.9&&(!t||i>t.ratio)&&(t={kind:"reach",r:e,ratio:i,text:`${Re[e].name} is full (${n.count}/${this.reachCap(e)} balls): factories above it are waiting`,s:(Re[e].s0+Re[e].s1)/2})}if(this.queueCount()>=2)return{kind:"finish",text:`${this.queueCount()} paid balls queued at the finish basket`,s:Zt};if(t)return t;for(let e of this.openSites()){let n=this.sites[e];if(n.feederStatus&&n.feederStatus!=="Paused"&&n.feederStatus!=="Releases off"&&n.feederStatus!=="Hopper empty")return{kind:"site",k:e,text:`${rt[e].name}: ${n.feederStatus}`,s:rt[e].s}}return null}serialize(){let t=n=>({...n}),e=this.phys.balls.filter(n=>n.state==="roll"||n.state==="queue").map(n=>({id:n.id,spec:n.spec,st:n.state,x:n.x,y:n.y,z:n.z,vx:n.vx,vy:n.vy,vz:n.vz,wx:n.wx,wy:n.wy,wz:n.wz,q:[n.qx,n.qy,n.qz,n.qw],k:rt[n.start].id,site:rt[n.site??n.start].id,rec:n.recipe||0,pay:n.payout,cps:n.cps,cpi:n.cpi,cpT:n.cpT||[],paid:n.paid,missed:!!n.missed,wet:n.wet,age:n.age,lt:n.launchT,stall:n.stallT,rs:n.rs,ps:n.prevS,ms:n.maxS,qT:n.qT||0,wob:n.wob,pg:n.progS,sa:n.speedAvg,sub:n.sub,qi:n.qi,ord:n.orderId||0,ob:n.orderBonus||0,ncn:n.ncn||0,bat:n.batch||0,rep:n.replica||null,gau:!!n.gauged}));return{v:$s,savedAt:Date.now(),t:this.t,cash:this.cash,owned:[...this.owned],sel:rt[this.sel].id,sites:this.sites.map(n=>({id:n.id,open:n.open,owned:[...n.owned],hopper:n.hopper.map(t),post:n.post.map(t),pressProg:n.pressProg,pressCount:n.pressCount,feederT:n.feederT,manualCD:n.manualCD,lastLaunch:n.lastLaunch,recipe:n.recipe,changeT:n.changeT,batch:n.batch,madeBy:n.madeBy,enabled:n.enabled,gap:n.gap,autoGapK:n.autoGapK,stats:n.stats,ncnBatch:n.ncnBatch,ncnMade:n.ncnMade,ncnFinished:n.ncnFinished,replica:n.replica,gauge:n.gauge})),nextId:this.nextId,ncnSerial:this.ncnSerial,stats:this.stats,recent:this.recent.filter(([n])=>this.t-n<300),basket:this.basket,overflow:this.overflow,drainT:this.drainT,crate:this.crate,crates:this.crates,settings:this.settings,sweep:this.sweep,acc:this.acc,physT:this.phys.t,routeStats:Object.fromEntries(rt.map((n,i)=>[n.id,this.routeStats[i]])),records:this.records,bestCpm:this.bestCpm,gorgeFinished:this.gorgeFinished,lossBySpot:this.lossBySpot,finishTimes:this.finishTimes,lastFinish:this.lastFinish&&{...this.lastFinish,start:rt[this.lastFinish.start].id},logs:this.logs.map(n=>n.ph),order:this.order,orderLog:this.orderLog.filter(n=>n.reserved>0||this.t-(n.done||n.cancelled||0)<1800).slice(-12),orderSeq:this.orderSeq,workshop:{routes:this.workshop.routes,carts:this.workshop.carts.map(n=>({...n,load:n.load.map(t)})),priority:this.workshop.priority,shipped:this.workshop.shipped,tripsTo:this.workshop.tripsTo},splitGate:this.splitGate,gatePhase:this.gatePhase,sluiceLane:this.sluiceLane,presets:this.presets,bench:this.bench,milestones:this.milestones,player:this.player,trial:this.trial,balls:e}}load(t){if(!t||(t.v===1&&(t=Au(t)),!t||t.v!==$s))return;let e=n=>Ke[n]!==void 0?Ke[n]:0;this.t=t.t||0,this.cash=t.cash||0,this.owned=new Set((t.owned||[]).filter(n=>ze[n]&&!sn(n)));for(let n of t.sites||[]){let i=Ke[n.id];if(i===void 0)continue;let s=this.sites[i];s.open=!!n.open||i===0,s.owned=new Set((n.owned||[]).filter(a=>ze[a]&&sn(a))),s.hopper=(n.hopper||[]).slice(0,60),s.post=(n.post||[]).slice(0,40);for(let a of[...s.hopper,...s.post])typeof a.site=="string"&&(a.site=e(a.site));Object.assign(s,{pressProg:n.pressProg||0,pressCount:n.pressCount||0,feederT:n.feederT||0,manualCD:n.manualCD||0,lastLaunch:n.lastLaunch||null,recipe:n.recipe||0,changeT:n.changeT||0,batch:n.batch||[],madeBy:n.madeBy||[0,0,0,0,0,0],gap:n.gap||0,autoGapK:n.autoGapK||1,ncnBatch:n.ncnBatch||1,ncnMade:n.ncnMade||0,ncnFinished:n.ncnFinished||0,replica:n.replica||null,gauge:n.gauge!==!1}),Object.assign(s.enabled,n.enabled||{}),Object.assign(s.stats,n.stats||{})}if(this.sel=e(t.sel),this.sites[this.sel].open||(this.sel=0),this.nextId=t.nextId||1,this.ncnSerial=t.ncnSerial||0,Object.assign(this.stats,t.stats||{}),this.recent=t.recent||[],this.basket=(t.basket||[]).map(n=>typeof n=="number"?{spec:n,recipe:0}:n),this.overflow=t.overflow||0,this.drainT=t.drainT||0,this.crate=t.crate||0,this.crates=t.crates||[0,0,0,0,0,0],Object.assign(this.settings,t.settings||{}),t.routeStats)for(let[n,i]of Object.entries(t.routeStats))Ke[n]!==void 0&&(this.routeStats[Ke[n]]={best:0,...i});Object.assign(this.records,t.records||{}),this.bestCpm=t.bestCpm||0,this.gorgeFinished=!!t.gorgeFinished,this.lossBySpot=t.lossBySpot||{},this.finishTimes=t.finishTimes||[],this.lastFinish=t.lastFinish?{...t.lastFinish,start:e(t.lastFinish.start)}:null,Array.isArray(t.logs)&&t.logs.forEach((n,i)=>{this.logs[i]&&(this.logs[i].ph=n)}),Array.isArray(t.sweep)&&t.sweep.forEach((n,i)=>{this.sweep[i]&&Object.assign(this.sweep[i],n)}),this.order=t.order||null,this.orderLog=t.orderLog||[],this.orderSeq=t.orderSeq||1,t.workshop&&(this.workshop.routes=t.workshop.routes||[],this.workshop.carts=(t.workshop.carts||[]).map(n=>({...n,load:n.load||[]})),Object.assign(this.workshop.priority,t.workshop.priority||{}),this.workshop.shipped=t.workshop.shipped||0,this.workshop.tripsTo=t.workshop.tripsTo||{}),this.splitGate=t.splitGate||"balanced",this.gatePhase=t.gatePhase||0,this.sluiceLane=t.sluiceLane||0,this.presets=t.presets||[null,null,null,null,null],t.bench&&(this.bench=t.bench),this.milestones=t.milestones||{},this.player=t.player||null,this.trial=t.trial||null,this.sessionStart=this.t-60,this.phys.t=t.physT??this.t,this.acc=t.acc||0,this.phys.balls=(t.balls||[]).map(n=>{let i=yo(n.id,n.spec,n.rs);Object.assign(i,{x:n.x,y:n.y,z:n.z,vx:n.vx,vy:n.vy,vz:n.vz,wx:n.wx,wy:n.wy,wz:n.wz,qx:n.q[0],qy:n.q[1],qz:n.q[2],qw:n.q[3],start:e(n.k),site:e(n.site??n.k),recipe:n.rec||0,payout:n.pay,cps:n.cps,cpi:n.cpi,cpT:n.cpT||[],paid:n.paid,missed:n.missed,wet:n.wet,age:n.age,launchT:n.lt,stallT:n.stall,state:n.st,prevS:n.ps,maxS:n.ms,qT:n.qT,wob:n.wob||0,progS:n.pg,speedAvg:n.sa??.5,sub:n.sub??0,qi:n.qi,orderId:n.ord||0,orderBonus:n.ob||0,ncn:n.ncn||0,batch:n.bat||0,replica:n.rep||null,gauged:!!n.gau});let s=this.creek.locate(i.x,i.z,-1,{});i.hint=s.idx,i.s=s.s,i.d=s.d;let a=this.creek.bedH(i.s,i.d)+.0335*.9;return i.y<a&&(i.y=a),i});for(let n of this.sites)n.lastLaunch=n.lastLaunch&&this.phys.balls.some(i=>i.id===n.lastLaunch.id)?n.lastLaunch:null}get pressProg(){return this.site.pressProg}get pressCount(){return this.site.pressCount}get manualCD(){return this.site.manualCD}set manualCD(t){this.site.manualCD=t}};function Au(r){let t=h=>Er[h]||"grounds",e=t(r.sel||0),n=(r.owned||[]).filter(h=>ze[h]),i=n.filter(h=>sn(h)),s=n.filter(h=>!sn(h)),a=Math.max(1,Math.min(6,r.unlocked||1)),o=r.nextId||1,l=rt.map(h=>{let d=Er.indexOf(h.id),u=d>=0&&d<a,f=[];h.id===e?f=i.slice():u&&(f=i.filter(g=>g==="press"||g==="feeder"));let y=h.id===e?(r.hopper||[]).map(g=>({id:o++,spec:g,recipe:0,site:h.id,made:r.t||0})):[];return{id:h.id,open:u,owned:f,hopper:y,post:[],pressProg:h.id===e&&r.pressProg||0,pressCount:h.id===e&&r.pressCount||0,feederT:h.id===e&&r.feederT||0,manualCD:h.id===e&&r.manualCD||0,recipe:0}}),c={};return(r.routeStats||[]).forEach((h,d)=>{c[t(d)]=h}),{v:$s,migratedFrom:1,t:r.t||0,cash:r.cash||0,owned:s,sel:e,sites:l,nextId:o,stats:{...r.stats||{}},recent:r.recent||[],basket:(r.basket||[]).map(h=>({spec:h,recipe:0})),drainT:r.drainT||0,crate:r.crate||0,settings:r.settings||{},routeStats:c,bestCpm:r.bestCpm||0,gorgeFinished:!!r.gorgeFinished,records:{bestCpm:r.bestCpm||0},lossBySpot:r.lossBySpot||{},finishTimes:r.finishTimes||[],lastFinish:r.lastFinish?{...r.lastFinish,start:t(r.lastFinish.start)}:null,logs:r.logs,physT:r.physT,acc:r.acc,sweep:r.arm?[r.arm]:void 0,milestones:Object.fromEntries(["shelf","springs","alder","gorge"].filter(h=>Er.indexOf(h)<a&&Er.indexOf(h)>=0).map(h=>[h,r.t||0])),balls:(r.balls||[]).map(h=>({...h,k:t(h.k),site:t(h.k),rec:0}))}}var Ac="170";var Ru=0,hh=1,Cu=2;var vd=1,Rc=2,Qn=3,Ei=0,nn=1,ye=2,bi=0,wi=1,la=2,dh=3,uh=4,Pu=5,Hi=100,Iu=101,Lu=102,Du=103,ku=104,Fu=200,Uu=201,Nu=202,Bu=203,tl=204,el=205,Ou=206,zu=207,Hu=208,Gu=209,Vu=210,Wu=211,qu=212,$u=213,Xu=214,nl=0,il=1,sl=2,Ts=3,rl=4,al=5,ol=6,ll=7,_d=0,Yu=1,Zu=2,Mi=0,Ku=1,Ju=2,ju=3,Cc=4,Qu=5,tf=6,ef=7;var bd=300,As=301,Rs=302,cl=303,hl=304,Ga=306,ii=1e3,Vi=1001,dl=1002,yn=1003,nf=1004;var Rr=1005;var Gn=1006,vo=1007;var Wi=1008;var si=1009,wd=1010,Md=1011,or=1012,Pc=1013,qi=1014,Vn=1015,pr=1016,Ic=1017,Lc=1018,Cs=1020,Sd=35902,Ed=1021,Td=1022,Fn=1023,Ad=1024,Rd=1025,Ms=1026,Ps=1027,Dc=1028,kc=1029,Cd=1030,Fc=1031;var Uc=1033,ia=33776,sa=33777,ra=33778,aa=33779,ul=35840,fl=35841,pl=35842,ml=35843,gl=36196,yl=37492,xl=37496,vl=37808,_l=37809,bl=37810,wl=37811,Ml=37812,Sl=37813,El=37814,Tl=37815,Al=37816,Rl=37817,Cl=37818,Pl=37819,Il=37820,Ll=37821,oa=36492,Dl=36494,kl=36495,Pd=36283,Fl=36284,Ul=36285,Nl=36286;var ca=2300,Bl=2301,_o=2302,fh=2400,ph=2401,mh=2402;var sf=3200,rf=3201;var Id=0,af=1,vi="",He="srgb",Fs="srgb-linear",Va="linear",ve="srgb";var is=7680;var gh=519,of=512,lf=513,cf=514,Ld=515,hf=516,df=517,uf=518,ff=519,Ol=35044,li=35048;var yh="300 es",ei=2e3,ha=2001,Ti=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let i=this._listeners[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,t);t.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var bo=Math.PI/180,zl=180/Math.PI;function Si(){let r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[r&255]+tn[r>>8&255]+tn[r>>16&255]+tn[r>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function Xe(r,t,e){return Math.max(t,Math.min(e,r))}function pf(r,t){return(r%t+t)%t}function wo(r,t,e){return(1-e)*r+e*t}function Hn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _e(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}var dt=class r{constructor(t=0,e=0){r.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*i+t.x,this.y=s*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Qt=class r{constructor(t,e,n,i,s,a,o,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c)}set(t,e,n,i,s,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],y=n[8],g=i[0],m=i[3],p=i[6],_=i[1],x=i[4],v=i[7],b=i[2],S=i[5],A=i[8];return s[0]=a*g+o*_+l*b,s[3]=a*m+o*x+l*S,s[6]=a*p+o*v+l*A,s[1]=c*g+h*_+d*b,s[4]=c*m+h*x+d*S,s[7]=c*p+h*v+d*A,s[2]=u*g+f*_+y*b,s[5]=u*m+f*x+y*S,s[8]=u*p+f*v+y*A,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*s,f=c*s-a*l,y=e*d+n*u+i*f;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/y;return t[0]=d*g,t[1]=(i*c-h*n)*g,t[2]=(o*n-i*a)*g,t[3]=u*g,t[4]=(h*e-i*l)*g,t[5]=(i*s-o*e)*g,t[6]=f*g,t[7]=(n*l-c*e)*g,t[8]=(a*e-n*s)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Mo.makeScale(t,e)),this}rotate(t){return this.premultiply(Mo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Mo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Mo=new Qt;function Dd(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function da(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function mf(){let r=da("canvas");return r.style.display="block",r}var xh={};function nr(r){r in xh||(xh[r]=!0,console.warn(r))}function gf(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function yf(r){let t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function xf(r){let t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var de={enabled:!0,workingColorSpace:Fs,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ve&&(r.r=ni(r.r),r.g=ni(r.g),r.b=ni(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ve&&(r.r=Ss(r.r),r.g=Ss(r.g),r.b=Ss(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===vi?Va:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function ni(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ss(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var vh=[.64,.33,.3,.6,.15,.06],_h=[.2126,.7152,.0722],bh=[.3127,.329],wh=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Mh=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);de.define({[Fs]:{primaries:vh,whitePoint:bh,transfer:Va,toXYZ:wh,fromXYZ:Mh,luminanceCoefficients:_h,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:vh,whitePoint:bh,transfer:ve,toXYZ:wh,fromXYZ:Mh,luminanceCoefficients:_h,outputColorSpaceConfig:{drawingBufferColorSpace:He}}});var ss,Hl=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ss===void 0&&(ss=da("canvas")),ss.width=t.width,ss.height=t.height;let n=ss.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ss}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=da("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=ni(s[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ni(e[n]/255)*255):e[n]=ni(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},vf=0,ua=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=Si(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(So(i[a].image)):s.push(So(i[a]))}else s=So(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function So(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Hl.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var _f=0,hn=class r extends Ti{constructor(t=r.DEFAULT_IMAGE,e=r.DEFAULT_MAPPING,n=Vi,i=Vi,s=Gn,a=Wi,o=Fn,l=si,c=r.DEFAULT_ANISOTROPY,h=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=Si(),this.name="",this.source=new ua(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new dt(0,0),this.repeat=new dt(1,1),this.center=new dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==bd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ii:t.x=t.x-Math.floor(t.x);break;case Vi:t.x=t.x<0?0:1;break;case dl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ii:t.y=t.y-Math.floor(t.y);break;case Vi:t.y=t.y<0?0:1;break;case dl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=bd;hn.DEFAULT_ANISOTROPY=1;var ke=class r{constructor(t=0,e=0,n=0,i=1){r.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],y=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-g)<.01&&Math.abs(y-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+g)<.1&&Math.abs(y+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,v=(f+1)/2,b=(p+1)/2,S=(h+u)/4,A=(d+g)/4,E=(y+m)/4;return x>v&&x>b?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=S/n,s=A/n):v>b?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=S/i,s=E/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=A/s,i=E/s),this.set(n,i,s,e),this}let _=Math.sqrt((m-y)*(m-y)+(d-g)*(d-g)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(m-y)/_,this.y=(d-g)/_,this.z=(u-h)/_,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Gl=class extends Ti{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ke(0,0,t,e),this.scissorTest=!1,this.viewport=new ke(0,0,t,e);let i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new hn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new ua(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},ri=class extends Gl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},fa=class extends hn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=yn,this.minFilter=yn,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Vl=class extends hn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=yn,this.minFilter=yn,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ge=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=s[a+0],f=s[a+1],y=s[a+2],g=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=f,t[e+2]=y,t[e+3]=g;return}if(d!==g||l!==u||c!==f||h!==y){let m=1-o,p=l*u+c*f+h*y+d*g,_=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){let b=Math.sqrt(x),S=Math.atan2(b,p*_);m=Math.sin(m*S)/b,o=Math.sin(o*S)/b}let v=o*_;if(l=l*m+u*v,c=c*m+f*v,h=h*m+y*v,d=d*m+g*v,m===1-o){let b=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=b,c*=b,h*=b,d*=b}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[a],u=s[a+1],f=s[a+2],y=s[a+3];return t[e]=o*y+h*d+l*f-c*u,t[e+1]=l*y+h*u+c*d-o*f,t[e+2]=c*y+h*f+o*u-l*d,t[e+3]=h*y-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(s/2),u=l(n/2),f=l(i/2),y=l(s/2);switch(a){case"XYZ":this._x=u*h*d+c*f*y,this._y=c*f*d-u*h*y,this._z=c*h*y+u*f*d,this._w=c*h*d-u*f*y;break;case"YXZ":this._x=u*h*d+c*f*y,this._y=c*f*d-u*h*y,this._z=c*h*y-u*f*d,this._w=c*h*d+u*f*y;break;case"ZXY":this._x=u*h*d-c*f*y,this._y=c*f*d+u*h*y,this._z=c*h*y+u*f*d,this._w=c*h*d-u*f*y;break;case"ZYX":this._x=u*h*d-c*f*y,this._y=c*f*d+u*h*y,this._z=c*h*y-u*f*d,this._w=c*h*d+u*f*y;break;case"YZX":this._x=u*h*d+c*f*y,this._y=c*f*d+u*h*y,this._z=c*h*y-u*f*d,this._w=c*h*d-u*f*y;break;case"XZY":this._x=u*h*d-c*f*y,this._y=c*f*d-u*h*y,this._z=c*h*y+u*f*d,this._w=c*h*d+u*f*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*t._w+n*t._x+i*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=s*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},P=class r{constructor(t=0,e=0,n=0){r.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Sh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Sh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-s*i),d=2*(s*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=i+l*d+s*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Eo.copy(this).projectOnVector(t),this.sub(Eo)}reflect(t){return this.sub(Eo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Eo=new P,Sh=new Ge,ai=class{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ln):Ln.fromBufferAttribute(s,a),Ln.applyMatrix4(t.matrixWorld),this.expandByPoint(Ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cr.copy(n.boundingBox)),Cr.applyMatrix4(t.matrixWorld),this.union(Cr)}let i=t.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ln),Ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xs),Pr.subVectors(this.max,Xs),rs.subVectors(t.a,Xs),as.subVectors(t.b,Xs),os.subVectors(t.c,Xs),fi.subVectors(as,rs),pi.subVectors(os,as),ki.subVectors(rs,os);let e=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-ki.z,ki.y,fi.z,0,-fi.x,pi.z,0,-pi.x,ki.z,0,-ki.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-ki.y,ki.x,0];return!To(e,rs,as,os,Pr)||(e=[1,0,0,0,1,0,0,0,1],!To(e,rs,as,os,Pr))?!1:(Ir.crossVectors(fi,pi),e=[Ir.x,Ir.y,Ir.z],To(e,rs,as,os,Pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Yn=[new P,new P,new P,new P,new P,new P,new P,new P],Ln=new P,Cr=new ai,rs=new P,as=new P,os=new P,fi=new P,pi=new P,ki=new P,Xs=new P,Pr=new P,Ir=new P,Fi=new P;function To(r,t,e,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Fi.fromArray(r,s);let o=i.x*Math.abs(Fi.x)+i.y*Math.abs(Fi.y)+i.z*Math.abs(Fi.z),l=t.dot(Fi),c=e.dot(Fi),h=n.dot(Fi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var bf=new ai,Ys=new P,Ao=new P,Ai=class{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):bf.setFromPoints(t).getCenter(n);let i=0;for(let s=0,a=t.length;s<a;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ys.subVectors(t,this.center);let e=Ys.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ys,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ao.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ys.copy(t.center).add(Ao)),this.expandByPoint(Ys.copy(t.center).sub(Ao))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Zn=new P,Ro=new P,Lr=new P,mi=new P,Co=new P,Dr=new P,Po=new P,$i=class{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ro.copy(t).add(e).multiplyScalar(.5),Lr.copy(e).sub(t).normalize(),mi.copy(this.origin).sub(Ro);let s=t.distanceTo(e)*.5,a=-this.direction.dot(Lr),o=mi.dot(this.direction),l=-mi.dot(Lr),c=mi.lengthSq(),h=Math.abs(1-a*a),d,u,f,y;if(h>0)if(d=a*l-o,u=a*o-l,y=s*h,d>=0)if(u>=-y)if(u<=y){let g=1/h;d*=g,u*=g,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-y?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c):u<=y?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+c):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+c);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ro).addScaledVector(Lr,u),f}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);let n=Zn.dot(this.direction),i=Zn.dot(Zn)-n*n,s=t.radius*t.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(s=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(s=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,i,s){Co.subVectors(e,t),Dr.subVectors(n,t),Po.crossVectors(Co,Dr);let a=this.direction.dot(Po),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;mi.subVectors(this.origin,t);let l=o*this.direction.dot(Dr.crossVectors(mi,Dr));if(l<0)return null;let c=o*this.direction.dot(Co.cross(mi));if(c<0||l+c>a)return null;let h=-o*mi.dot(Po);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},te=class r{constructor(t,e,n,i,s,a,o,l,c,h,d,u,f,y,g,m){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,a,o,l,c,h,d,u,f,y,g,m)}set(t,e,n,i,s,a,o,l,c,h,d,u,f,y,g,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=y,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/ls.setFromMatrixColumn(t,0).length(),s=1/ls.setFromMatrixColumn(t,1).length(),a=1/ls.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){let u=a*h,f=a*d,y=o*h,g=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+y*c,e[5]=u-g*c,e[9]=-o*l,e[2]=g-u*c,e[6]=y+f*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,y=c*h,g=c*d;e[0]=u+g*o,e[4]=y*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-y,e[6]=g+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,y=c*h,g=c*d;e[0]=u-g*o,e[4]=-a*d,e[8]=y+f*o,e[1]=f+y*o,e[5]=a*h,e[9]=g-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,f=a*d,y=o*h,g=o*d;e[0]=l*h,e[4]=y*c-f,e[8]=u*c+g,e[1]=l*d,e[5]=g*c+u,e[9]=f*c-y,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,f=a*c,y=o*l,g=o*c;e[0]=l*h,e[4]=g-u*d,e[8]=y*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+y,e[10]=u-g*d}else if(t.order==="XZY"){let u=a*l,f=a*c,y=o*l,g=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+g,e[5]=a*h,e[9]=f*d-y,e[2]=y*d-f,e[6]=o*h,e[10]=g*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(wf,t,Mf)}lookAt(t,e,n){let i=this.elements;return mn.subVectors(t,e),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),gi.crossVectors(n,mn),gi.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),gi.crossVectors(n,mn)),gi.normalize(),kr.crossVectors(mn,gi),i[0]=gi.x,i[4]=kr.x,i[8]=mn.x,i[1]=gi.y,i[5]=kr.y,i[9]=mn.y,i[2]=gi.z,i[6]=kr.z,i[10]=mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],y=n[2],g=n[6],m=n[10],p=n[14],_=n[3],x=n[7],v=n[11],b=n[15],S=i[0],A=i[4],E=i[8],w=i[12],M=i[1],R=i[5],k=i[9],I=i[13],D=i[2],U=i[6],N=i[10],W=i[14],F=i[3],J=i[7],it=i[11],at=i[15];return s[0]=a*S+o*M+l*D+c*F,s[4]=a*A+o*R+l*U+c*J,s[8]=a*E+o*k+l*N+c*it,s[12]=a*w+o*I+l*W+c*at,s[1]=h*S+d*M+u*D+f*F,s[5]=h*A+d*R+u*U+f*J,s[9]=h*E+d*k+u*N+f*it,s[13]=h*w+d*I+u*W+f*at,s[2]=y*S+g*M+m*D+p*F,s[6]=y*A+g*R+m*U+p*J,s[10]=y*E+g*k+m*N+p*it,s[14]=y*w+g*I+m*W+p*at,s[3]=_*S+x*M+v*D+b*F,s[7]=_*A+x*R+v*U+b*J,s[11]=_*E+x*k+v*N+b*it,s[15]=_*w+x*I+v*W+b*at,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],y=t[3],g=t[7],m=t[11],p=t[15];return y*(+s*l*d-i*c*d-s*o*u+n*c*u+i*o*f-n*l*f)+g*(+e*l*f-e*c*u+s*a*u-i*a*f+i*c*h-s*l*h)+m*(+e*c*d-e*o*f-s*a*d+n*a*f+s*o*h-n*c*h)+p*(-i*o*h-e*l*d+e*o*u+i*a*d-n*a*u+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],y=t[12],g=t[13],m=t[14],p=t[15],_=d*m*c-g*u*c+g*l*f-o*m*f-d*l*p+o*u*p,x=y*u*c-h*m*c-y*l*f+a*m*f+h*l*p-a*u*p,v=h*g*c-y*d*c+y*o*f-a*g*f-h*o*p+a*d*p,b=y*d*l-h*g*l-y*o*u+a*g*u+h*o*m-a*d*m,S=e*_+n*x+i*v+s*b;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/S;return t[0]=_*A,t[1]=(g*u*s-d*m*s-g*i*f+n*m*f+d*i*p-n*u*p)*A,t[2]=(o*m*s-g*l*s+g*i*c-n*m*c-o*i*p+n*l*p)*A,t[3]=(d*l*s-o*u*s-d*i*c+n*u*c+o*i*f-n*l*f)*A,t[4]=x*A,t[5]=(h*m*s-y*u*s+y*i*f-e*m*f-h*i*p+e*u*p)*A,t[6]=(y*l*s-a*m*s-y*i*c+e*m*c+a*i*p-e*l*p)*A,t[7]=(a*u*s-h*l*s+h*i*c-e*u*c-a*i*f+e*l*f)*A,t[8]=v*A,t[9]=(y*d*s-h*g*s-y*n*f+e*g*f+h*n*p-e*d*p)*A,t[10]=(a*g*s-y*o*s+y*n*c-e*g*c-a*n*p+e*o*p)*A,t[11]=(h*o*s-a*d*s-h*n*c+e*d*c+a*n*f-e*o*f)*A,t[12]=b*A,t[13]=(h*g*i-y*d*i+y*n*u-e*g*u-h*n*m+e*d*m)*A,t[14]=(y*o*i-a*g*i-y*n*l+e*g*l+a*n*m-e*o*m)*A,t[15]=(a*d*i-h*o*i+h*n*l-e*d*l-a*n*u+e*o*u)*A,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,a){return this.set(1,n,s,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,d=o+o,u=s*c,f=s*h,y=s*d,g=a*h,m=a*d,p=o*d,_=l*c,x=l*h,v=l*d,b=n.x,S=n.y,A=n.z;return i[0]=(1-(g+p))*b,i[1]=(f+v)*b,i[2]=(y-x)*b,i[3]=0,i[4]=(f-v)*S,i[5]=(1-(u+p))*S,i[6]=(m+_)*S,i[7]=0,i[8]=(y+x)*A,i[9]=(m-_)*A,i[10]=(1-(u+g))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=ls.set(i[0],i[1],i[2]).length(),a=ls.set(i[4],i[5],i[6]).length(),o=ls.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],Dn.copy(this);let c=1/s,h=1/a,d=1/o;return Dn.elements[0]*=c,Dn.elements[1]*=c,Dn.elements[2]*=c,Dn.elements[4]*=h,Dn.elements[5]*=h,Dn.elements[6]*=h,Dn.elements[8]*=d,Dn.elements[9]*=d,Dn.elements[10]*=d,e.setFromRotationMatrix(Dn),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,a,o=ei){let l=this.elements,c=2*s/(e-t),h=2*s/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i),f,y;if(o===ei)f=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===ha)f=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,a,o=ei){let l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(a-s),u=(e+t)*c,f=(n+i)*h,y,g;if(o===ei)y=(a+s)*d,g=-2*d;else if(o===ha)y=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=g,l[14]=-y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ls=new P,Dn=new te,wf=new P(0,0,0),Mf=new P(1,1,1),gi=new P,kr=new P,mn=new P,Eh=new te,Th=new Ge,ln=class r{constructor(t=0,e=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Eh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Eh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Th.setFromEuler(this),this.setFromQuaternion(Th,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ln.DEFAULT_ORDER="XYZ";var lr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Sf=0,Ah=new P,cs=new Ge,Kn=new te,Fr=new P,Zs=new P,Ef=new P,Tf=new Ge,Rh=new P(1,0,0),Ch=new P(0,1,0),Ph=new P(0,0,1),Ih={type:"added"},Af={type:"removed"},hs={type:"childadded",child:null},Io={type:"childremoved",child:null},Je=class r extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let t=new P,e=new ln,n=new Ge,i=new P(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new te},normalMatrix:{value:new Qt}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return cs.setFromAxisAngle(t,e),this.quaternion.multiply(cs),this}rotateOnWorldAxis(t,e){return cs.setFromAxisAngle(t,e),this.quaternion.premultiply(cs),this}rotateX(t){return this.rotateOnAxis(Rh,t)}rotateY(t){return this.rotateOnAxis(Ch,t)}rotateZ(t){return this.rotateOnAxis(Ph,t)}translateOnAxis(t,e){return Ah.copy(t).applyQuaternion(this.quaternion),this.position.add(Ah.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Rh,t)}translateY(t){return this.translateOnAxis(Ch,t)}translateZ(t){return this.translateOnAxis(Ph,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fr.copy(t):Fr.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Zs,Fr,this.up):Kn.lookAt(Fr,Zs,this.up),this.quaternion.setFromRotationMatrix(Kn),i&&(Kn.extractRotation(i.matrixWorld),cs.setFromRotationMatrix(Kn),this.quaternion.premultiply(cs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ih),hs.child=t,this.dispatchEvent(hs),hs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Af),Io.child=t,this.dispatchEvent(Io),Io.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ih),hs.child=t,this.dispatchEvent(hs),hs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,t,Ef),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zs,Tf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),y=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),y.length>0&&(n.nodes=y)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};Je.DEFAULT_UP=new P(0,1,0);Je.DEFAULT_MATRIX_AUTO_UPDATE=!0;Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var kn=new P,Jn=new P,Lo=new P,jn=new P,ds=new P,us=new P,Lh=new P,Do=new P,ko=new P,Fo=new P,Uo=new ke,No=new ke,Bo=new ke,_i=class r{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),kn.subVectors(t,e),i.cross(kn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){kn.subVectors(i,e),Jn.subVectors(n,e),Lo.subVectors(t,e);let a=kn.dot(kn),o=kn.dot(Jn),l=kn.dot(Lo),c=Jn.dot(Jn),h=Jn.dot(Lo),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,y=(a*h-o*l)*u;return s.set(1-f-y,y,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(t,e,n,i,s,a,o,l){return this.getBarycoord(t,e,n,i,jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,jn.x),l.addScaledVector(a,jn.y),l.addScaledVector(o,jn.z),l)}static getInterpolatedAttribute(t,e,n,i,s,a){return Uo.setScalar(0),No.setScalar(0),Bo.setScalar(0),Uo.fromBufferAttribute(t,e),No.fromBufferAttribute(t,n),Bo.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Uo,s.x),a.addScaledVector(No,s.y),a.addScaledVector(Bo,s.z),a}static isFrontFacing(t,e,n,i){return kn.subVectors(n,e),Jn.subVectors(t,e),kn.cross(Jn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),kn.cross(Jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return r.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return r.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return r.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return r.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return r.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,a,o;ds.subVectors(i,n),us.subVectors(s,n),Do.subVectors(t,n);let l=ds.dot(Do),c=us.dot(Do);if(l<=0&&c<=0)return e.copy(n);ko.subVectors(t,i);let h=ds.dot(ko),d=us.dot(ko);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(ds,a);Fo.subVectors(t,s);let f=ds.dot(Fo),y=us.dot(Fo);if(y>=0&&f<=y)return e.copy(s);let g=f*c-l*y;if(g<=0&&c>=0&&y<=0)return o=c/(c-y),e.copy(n).addScaledVector(us,o);let m=h*y-f*d;if(m<=0&&d-h>=0&&f-y>=0)return Lh.subVectors(s,i),o=(d-h)/(d-h+(f-y)),e.copy(i).addScaledVector(Lh,o);let p=1/(m+g+u);return a=g*p,o=u*p,e.copy(n).addScaledVector(ds,a).addScaledVector(us,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function Oo(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}var ut=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=de.workingColorSpace){if(t=pf(t,1),e=Xe(e,0,1),n=Xe(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=Oo(a,s,t+1/3),this.g=Oo(a,s,t),this.b=Oo(a,s,t-1/3)}return de.toWorkingColorSpace(this,i),this}setStyle(t,e=He){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){let n=kd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ni(t.r),this.g=ni(t.g),this.b=ni(t.b),this}copyLinearToSRGB(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return de.fromWorkingColorSpace(en.copy(this),t),Math.round(Xe(en.r*255,0,255))*65536+Math.round(Xe(en.g*255,0,255))*256+Math.round(Xe(en.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.fromWorkingColorSpace(en.copy(this),e);let n=en.r,i=en.g,s=en.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.fromWorkingColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=He){de.fromWorkingColorSpace(en.copy(this),t);let e=en.r,n=en.g,i=en.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(yi),this.setHSL(yi.h+t,yi.s+e,yi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(yi),t.getHSL(Ur);let n=wo(yi.h,Ur.h,e),i=wo(yi.s,Ur.s,e),s=wo(yi.l,Ur.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new ut;ut.NAMES=kd;var Rf=0,oi=class extends Ti{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Si(),this.name="",this.blending=wi,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tl,this.blendDst=el,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ut(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==Ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==tl&&(n.blendSrc=this.blendSrc),this.blendDst!==el&&(n.blendDst=this.blendDst),this.blendEquation!==Hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(n.stencilFail=this.stencilFail),this.stencilZFail!==is&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(e){let s=i(t.textures),a=i(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},wn=class extends oi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=_d,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Oe=new P,Nr=new dt,oe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ol,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Nr.fromBufferAttribute(this,e),Nr.applyMatrix3(t),this.setXY(e,Nr.x,Nr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Hn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_e(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Hn(e,this.array)),e}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Hn(e,this.array)),e}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Hn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Hn(e,this.array)),e}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array),s=_e(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ol&&(t.usage=this.usage),t}};var pa=class extends oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var ma=class extends oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var ie=class extends oe{constructor(t,e,n){super(new Float32Array(t),e,n)}},Cf=0,bn=new te,zo=new Je,fs=new P,gn=new ai,Ks=new ai,$e=new P,fe=class r extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Dd(t)?ma:pa)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Qt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,n){return bn.makeTranslation(t,e,n),this.applyMatrix4(bn),this}scale(t,e,n){return bn.makeScale(t,e,n),this.applyMatrix4(bn),this}lookAt(t){return zo.lookAt(t),zo.updateMatrix(),this.applyMatrix4(zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ie(n,3))}else{for(let n=0,i=e.count;n<i;n++){let s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];gn.setFromBufferAttribute(s),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){let n=this.boundingSphere.center;if(gn.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){let o=e[s];Ks.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(gn.min,Ks.min),gn.expandByPoint($e),$e.addVectors(gn.max,Ks.max),gn.expandByPoint($e)):(gn.expandByPoint(Ks.min),gn.expandByPoint(Ks.max))}gn.getCenter(n);let i=0;for(let s=0,a=t.count;s<a;s++)$e.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared($e));if(e)for(let s=0,a=e.length;s<a;s++){let o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)$e.fromBufferAttribute(o,c),l&&(fs.fromBufferAttribute(t,c),$e.add(fs)),i=Math.max(i,n.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new oe(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let E=0;E<n.count;E++)o[E]=new P,l[E]=new P;let c=new P,h=new P,d=new P,u=new dt,f=new dt,y=new dt,g=new P,m=new P;function p(E,w,M){c.fromBufferAttribute(n,E),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,M),u.fromBufferAttribute(s,E),f.fromBufferAttribute(s,w),y.fromBufferAttribute(s,M),h.sub(c),d.sub(c),f.sub(u),y.sub(u);let R=1/(f.x*y.y-y.x*f.y);isFinite(R)&&(g.copy(h).multiplyScalar(y.y).addScaledVector(d,-f.y).multiplyScalar(R),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-y.x).multiplyScalar(R),o[E].add(g),o[w].add(g),o[M].add(g),l[E].add(m),l[w].add(m),l[M].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let E=0,w=_.length;E<w;++E){let M=_[E],R=M.start,k=M.count;for(let I=R,D=R+k;I<D;I+=3)p(t.getX(I+0),t.getX(I+1),t.getX(I+2))}let x=new P,v=new P,b=new P,S=new P;function A(E){b.fromBufferAttribute(i,E),S.copy(b);let w=o[E];x.copy(w),x.sub(b.multiplyScalar(b.dot(w))).normalize(),v.crossVectors(S,w);let R=v.dot(l[E])<0?-1:1;a.setXYZW(E,x.x,x.y,x.z,R)}for(let E=0,w=_.length;E<w;++E){let M=_[E],R=M.start,k=M.count;for(let I=R,D=R+k;I<D;I+=3)A(t.getX(I+0)),A(t.getX(I+1)),A(t.getX(I+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new P,s=new P,a=new P,o=new P,l=new P,c=new P,h=new P,d=new P;if(t)for(let u=0,f=t.count;u<f;u+=3){let y=t.getX(u+0),g=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,y),s.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),o.fromBufferAttribute(n,y),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(y,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,y=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?f=l[g]*o.data.stride+o.offset:f=l[g]*h;for(let p=0;p<h;p++)u[y++]=c[f++]}return new oe(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=t(l,n);e.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let s=t.morphAttributes;for(let c in s){let h=[],d=s[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Dh=new te,Ui=new $i,Br=new Ai,kh=new P,Or=new P,zr=new P,Hr=new P,Ho=new P,Gr=new P,Fh=new P,Vr=new P,Nt=class extends Je{constructor(t=new fe,e=new wn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let o=this.morphTargetInfluences;if(s&&o){Gr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(Ho.fromBufferAttribute(d,t),a?Gr.addScaledVector(Ho,h):Gr.addScaledVector(Ho.sub(e),h))}e.add(Gr)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(s),Ui.copy(t.ray).recast(t.near),!(Br.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(Br,kh)===null||Ui.origin.distanceToSquared(kh)>(t.far-t.near)**2))&&(Dh.copy(s).invert(),Ui.copy(t.ray).applyMatrix4(Dh),!(n.boundingBox!==null&&Ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ui)))}_computeIntersections(t,e,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let y=0,g=u.length;y<g;y++){let m=u[y],p=a[m.materialIndex],_=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=_,b=x;v<b;v+=3){let S=o.getX(v),A=o.getX(v+1),E=o.getX(v+2);i=Wr(this,p,t,n,c,h,d,S,A,E),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let y=Math.max(0,f.start),g=Math.min(o.count,f.start+f.count);for(let m=y,p=g;m<p;m+=3){let _=o.getX(m),x=o.getX(m+1),v=o.getX(m+2);i=Wr(this,a,t,n,c,h,d,_,x,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let y=0,g=u.length;y<g;y++){let m=u[y],p=a[m.materialIndex],_=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=_,b=x;v<b;v+=3){let S=v,A=v+1,E=v+2;i=Wr(this,p,t,n,c,h,d,S,A,E),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let y=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let m=y,p=g;m<p;m+=3){let _=m,x=m+1,v=m+2;i=Wr(this,a,t,n,c,h,d,_,x,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function Pf(r,t,e,n,i,s,a,o){let l;if(t.side===nn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,t.side===Ei,o),l===null)return null;Vr.copy(o),Vr.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Vr);return c<e.near||c>e.far?null:{distance:c,point:Vr.clone(),object:r}}function Wr(r,t,e,n,i,s,a,o,l,c){r.getVertexPosition(o,Or),r.getVertexPosition(l,zr),r.getVertexPosition(c,Hr);let h=Pf(r,t,e,n,Or,zr,Hr,Fh);if(h){let d=new P;_i.getBarycoord(Fh,Or,zr,Hr,d),i&&(h.uv=_i.getInterpolatedAttribute(i,o,l,c,d,new dt)),s&&(h.uv1=_i.getInterpolatedAttribute(s,o,l,c,d,new dt)),a&&(h.normal=_i.getInterpolatedAttribute(a,o,l,c,d,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new P,materialIndex:0};_i.getNormal(Or,zr,Hr,u.normal),h.face=u,h.barycoord=d}return h}var Xi=class r extends fe{constructor(t=1,e=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;y("z","y","x",-1,-1,n,e,t,a,s,0),y("z","y","x",1,-1,n,e,-t,a,s,1),y("x","z","y",1,1,t,n,e,i,a,2),y("x","z","y",1,-1,t,n,-e,i,a,3),y("x","y","z",1,-1,t,e,n,i,s,4),y("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new ie(c,3)),this.setAttribute("normal",new ie(h,3)),this.setAttribute("uv",new ie(d,2));function y(g,m,p,_,x,v,b,S,A,E,w){let M=v/A,R=b/E,k=v/2,I=b/2,D=S/2,U=A+1,N=E+1,W=0,F=0,J=new P;for(let it=0;it<N;it++){let at=it*R-I;for(let ft=0;ft<U;ft++){let It=ft*M-k;J[g]=It*_,J[m]=at*x,J[p]=D,c.push(J.x,J.y,J.z),J[g]=0,J[m]=0,J[p]=S>0?1:-1,h.push(J.x,J.y,J.z),d.push(ft/A),d.push(1-it/E),W+=1}}for(let it=0;it<E;it++)for(let at=0;at<A;at++){let ft=u+at+U*it,It=u+at+U*(it+1),Y=u+(at+1)+U*(it+1),et=u+(at+1)+U*it;l.push(ft,It,et),l.push(It,Y,et),F+=6}o.addGroup(f,F,w),f+=F,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Is(r){let t={};for(let e in r){t[e]={};for(let n in r[e]){let i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function an(r){let t={};for(let e=0;e<r.length;e++){let n=Is(r[e]);for(let i in n)t[i]=n[i]}return t}function If(r){let t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Fd(r){let t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}var Us={clone:Is,merge:an},Lf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Df=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,je=class extends oi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lf,this.fragmentShader=Df,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Is(t.uniforms),this.uniformsGroups=If(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},ga=class extends Je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=ei}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},xi=new P,Uh=new dt,Nh=new dt,on=class extends ga{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=zl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(bo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zl*2*Math.atan(Math.tan(bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(xi.x,xi.y).multiplyScalar(-t/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(xi.x,xi.y).multiplyScalar(-t/xi.z)}getViewSize(t,e){return this.getViewBounds(t,Uh,Nh),e.subVectors(Nh,Uh)}setViewOffset(t,e,n,i,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(bo*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ps=-90,ms=1,Wl=class extends Je{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new on(ps,ms,t,e);i.layers=this.layers,this.add(i);let s=new on(ps,ms,t,e);s.layers=this.layers,this.add(s);let a=new on(ps,ms,t,e);a.layers=this.layers,this.add(a);let o=new on(ps,ms,t,e);o.layers=this.layers,this.add(o);let l=new on(ps,ms,t,e);l.layers=this.layers,this.add(l);let c=new on(ps,ms,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,a,o,l]=e;for(let c of e)this.remove(c);if(t===ei)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ha)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),y=t.xr.enabled;t.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=y,n.texture.needsPMREMUpdate=!0}},ya=class extends hn{constructor(t,e,n,i,s,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:As,super(t,e,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ql=class extends ri{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new ya(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Xi(5,5,5),s=new je({name:"CubemapFromEquirect",uniforms:Is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:nn,blending:bi});s.uniforms.tEquirect.value=e;let a=new Nt(i,s),o=e.minFilter;return e.minFilter===Wi&&(e.minFilter=Gn),new Wl(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){let s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(s)}},Go=new P,kf=new P,Ff=new Qt,ti=class{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Go.subVectors(n,e).cross(kf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Go),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ff.getNormalMatrix(t),i=this.coplanarPoint(Go).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ni=new Ai,qr=new P,cr=class{constructor(t=new ti,e=new ti,n=new ti,i=new ti,s=new ti,a=new ti){this.planes=[t,e,n,i,s,a]}set(t,e,n,i,s,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ei){let n=this.planes,i=t.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],y=i[9],g=i[10],m=i[11],p=i[12],_=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-s,u-c,m-f,v-p).normalize(),n[1].setComponents(l+s,u+c,m+f,v+p).normalize(),n[2].setComponents(l+a,u+h,m+y,v+_).normalize(),n[3].setComponents(l-a,u-h,m-y,v-_).normalize(),n[4].setComponents(l-o,u-d,m-g,v-x).normalize(),e===ei)n[5].setComponents(l+o,u+d,m+g,v+x).normalize();else if(e===ha)n[5].setComponents(o,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(t){return Ni.center.set(0,0,0),Ni.radius=.7071067811865476,Ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(qr.x=i.normal.x>0?t.max.x:t.min.x,qr.y=i.normal.y>0?t.max.y:t.min.y,qr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(qr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ud(){let r=null,t=!1,e=null,n=null;function i(s,a){e(s,a),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Uf(r){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,h);else{d.sort((f,y)=>f.start-y.start);let u=0;for(let f=1;f<d.length;f++){let y=d[u],g=d[f];g.start<=y.start+y.count+1?y.count=Math.max(y.count,g.start+g.count-y.start):(++u,d[u]=g)}d.length=u+1;for(let f=0,y=d.length;f<y;f++){let g=d[f];r.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var Se=class r extends fe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=t/o,u=e/l,f=[],y=[],g=[],m=[];for(let p=0;p<h;p++){let _=p*u-a;for(let x=0;x<c;x++){let v=x*d-s;y.push(v,-_,0),g.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<o;_++){let x=_+c*p,v=_+c*(p+1),b=_+1+c*(p+1),S=_+1+c*p;f.push(x,v,S),f.push(v,b,S)}this.setIndex(f),this.setAttribute("position",new ie(y,3)),this.setAttribute("normal",new ie(g,3)),this.setAttribute("uv",new ie(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.width,t.height,t.widthSegments,t.heightSegments)}},Nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bf=`#ifdef USE_ALPHAHASH
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
#endif`,Of=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vf=`#ifdef USE_AOMAP
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
#endif`,Wf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qf=`#ifdef USE_BATCHING
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
#endif`,$f=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Kf=`#ifdef USE_IRIDESCENCE
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
#endif`,Jf=`#ifdef USE_BUMPMAP
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
#endif`,jf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,np=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ap=`#define PI 3.141592653589793
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
} // validated`,op=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lp=`vec3 transformedNormal = objectNormal;
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
#endif`,cp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fp="gl_FragColor = linearToOutputTexel( gl_FragColor );",pp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mp=`#ifdef USE_ENVMAP
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
#endif`,gp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yp=`#ifdef USE_ENVMAP
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
#endif`,xp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vp=`#ifdef USE_ENVMAP
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
#endif`,_p=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sp=`#ifdef USE_GRADIENTMAP
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
}`,Ep=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Tp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rp=`uniform bool receiveShadow;
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
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kp=`PhysicalMaterial material;
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
#endif`,Fp=`struct PhysicalMaterial {
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
}`,Up=`
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
#endif`,Np=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Op=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$p=`#if defined( USE_POINTS_UV )
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
#endif`,Xp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Kp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jp=`#ifdef USE_MORPHTARGETS
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
#endif`,Qp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,t0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,e0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,n0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,i0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,s0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,r0=`#ifdef USE_NORMALMAP
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
#endif`,a0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,o0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,l0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,c0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,h0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,d0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,u0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,f0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,p0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,m0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,g0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,y0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,x0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,v0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,b0=`float getShadowMask() {
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
}`,w0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,M0=`#ifdef USE_SKINNING
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
#endif`,S0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,E0=`#ifdef USE_SKINNING
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
#endif`,T0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,A0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,R0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,C0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,P0=`#ifdef USE_TRANSMISSION
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
#endif`,I0=`#ifdef USE_TRANSMISSION
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
#endif`,L0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,U0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,N0=`uniform sampler2D t2D;
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
}`,B0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G0=`#include <common>
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
}`,V0=`#if DEPTH_PACKING == 3200
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
}`,W0=`#define DISTANCE
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
}`,q0=`#define DISTANCE
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
}`,$0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,X0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y0=`uniform float scale;
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
}`,Z0=`uniform vec3 diffuse;
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
}`,K0=`#include <common>
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
}`,J0=`uniform vec3 diffuse;
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
}`,j0=`#define LAMBERT
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
}`,Q0=`#define LAMBERT
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
}`,tm=`#define MATCAP
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
}`,em=`#define MATCAP
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
}`,nm=`#define NORMAL
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
}`,im=`#define NORMAL
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
}`,sm=`#define PHONG
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
}`,rm=`#define PHONG
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
}`,am=`#define STANDARD
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
}`,om=`#define STANDARD
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
}`,lm=`#define TOON
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
}`,cm=`#define TOON
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
}`,hm=`uniform float size;
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
}`,dm=`uniform vec3 diffuse;
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
}`,um=`#include <common>
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
}`,fm=`uniform vec3 color;
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
}`,pm=`uniform float rotation;
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
}`,mm=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:Nf,alphahash_pars_fragment:Bf,alphamap_fragment:Of,alphamap_pars_fragment:zf,alphatest_fragment:Hf,alphatest_pars_fragment:Gf,aomap_fragment:Vf,aomap_pars_fragment:Wf,batching_pars_vertex:qf,batching_vertex:$f,begin_vertex:Xf,beginnormal_vertex:Yf,bsdfs:Zf,iridescence_fragment:Kf,bumpmap_pars_fragment:Jf,clipping_planes_fragment:jf,clipping_planes_pars_fragment:Qf,clipping_planes_pars_vertex:tp,clipping_planes_vertex:ep,color_fragment:np,color_pars_fragment:ip,color_pars_vertex:sp,color_vertex:rp,common:ap,cube_uv_reflection_fragment:op,defaultnormal_vertex:lp,displacementmap_pars_vertex:cp,displacementmap_vertex:hp,emissivemap_fragment:dp,emissivemap_pars_fragment:up,colorspace_fragment:fp,colorspace_pars_fragment:pp,envmap_fragment:mp,envmap_common_pars_fragment:gp,envmap_pars_fragment:yp,envmap_pars_vertex:xp,envmap_physical_pars_fragment:Cp,envmap_vertex:vp,fog_vertex:_p,fog_pars_vertex:bp,fog_fragment:wp,fog_pars_fragment:Mp,gradientmap_pars_fragment:Sp,lightmap_pars_fragment:Ep,lights_lambert_fragment:Tp,lights_lambert_pars_fragment:Ap,lights_pars_begin:Rp,lights_toon_fragment:Pp,lights_toon_pars_fragment:Ip,lights_phong_fragment:Lp,lights_phong_pars_fragment:Dp,lights_physical_fragment:kp,lights_physical_pars_fragment:Fp,lights_fragment_begin:Up,lights_fragment_maps:Np,lights_fragment_end:Bp,logdepthbuf_fragment:Op,logdepthbuf_pars_fragment:zp,logdepthbuf_pars_vertex:Hp,logdepthbuf_vertex:Gp,map_fragment:Vp,map_pars_fragment:Wp,map_particle_fragment:qp,map_particle_pars_fragment:$p,metalnessmap_fragment:Xp,metalnessmap_pars_fragment:Yp,morphinstance_vertex:Zp,morphcolor_vertex:Kp,morphnormal_vertex:Jp,morphtarget_pars_vertex:jp,morphtarget_vertex:Qp,normal_fragment_begin:t0,normal_fragment_maps:e0,normal_pars_fragment:n0,normal_pars_vertex:i0,normal_vertex:s0,normalmap_pars_fragment:r0,clearcoat_normal_fragment_begin:a0,clearcoat_normal_fragment_maps:o0,clearcoat_pars_fragment:l0,iridescence_pars_fragment:c0,opaque_fragment:h0,packing:d0,premultiplied_alpha_fragment:u0,project_vertex:f0,dithering_fragment:p0,dithering_pars_fragment:m0,roughnessmap_fragment:g0,roughnessmap_pars_fragment:y0,shadowmap_pars_fragment:x0,shadowmap_pars_vertex:v0,shadowmap_vertex:_0,shadowmask_pars_fragment:b0,skinbase_vertex:w0,skinning_pars_vertex:M0,skinning_vertex:S0,skinnormal_vertex:E0,specularmap_fragment:T0,specularmap_pars_fragment:A0,tonemapping_fragment:R0,tonemapping_pars_fragment:C0,transmission_fragment:P0,transmission_pars_fragment:I0,uv_pars_fragment:L0,uv_pars_vertex:D0,uv_vertex:k0,worldpos_vertex:F0,background_vert:U0,background_frag:N0,backgroundCube_vert:B0,backgroundCube_frag:O0,cube_vert:z0,cube_frag:H0,depth_vert:G0,depth_frag:V0,distanceRGBA_vert:W0,distanceRGBA_frag:q0,equirect_vert:$0,equirect_frag:X0,linedashed_vert:Y0,linedashed_frag:Z0,meshbasic_vert:K0,meshbasic_frag:J0,meshlambert_vert:j0,meshlambert_frag:Q0,meshmatcap_vert:tm,meshmatcap_frag:em,meshnormal_vert:nm,meshnormal_frag:im,meshphong_vert:sm,meshphong_frag:rm,meshphysical_vert:am,meshphysical_frag:om,meshtoon_vert:lm,meshtoon_frag:cm,points_vert:hm,points_frag:dm,shadow_vert:um,shadow_frag:fm,sprite_vert:pm,sprite_frag:mm},ht={common:{diffuse:{value:new ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new ut(16777215)},opacity:{value:1},center:{value:new dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},zn={basic:{uniforms:an([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:an([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new ut(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:an([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new ut(0)},specular:{value:new ut(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:an([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:an([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new ut(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:an([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:an([ht.points,ht.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:an([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:an([ht.common,ht.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:an([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:an([ht.sprite,ht.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:an([ht.common,ht.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:an([ht.lights,ht.fog,{color:{value:new ut(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};zn.physical={uniforms:an([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new ut(0)},specularColor:{value:new ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};var $r={r:0,b:0,g:0},Bi=new ln,gm=new te;function ym(r,t,e,n,i,s,a){let o=new ut(0),l=s===!0?0:1,c,h,d=null,u=0,f=null;function y(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?e:t).get(x)),x}function g(_){let x=!1,v=y(_);v===null?p(o,l):v&&v.isColor&&(p(v,1),x=!0);let b=r.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(_,x){let v=y(x);v&&(v.isCubeTexture||v.mapping===Ga)?(h===void 0&&(h=new Nt(new Xi(1,1,1),new je({name:"BackgroundCubeMaterial",uniforms:Is(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,S,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Bi.copy(x.backgroundRotation),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(gm.makeRotationFromEuler(Bi)),h.material.toneMapped=de.getTransfer(v.colorSpace)!==ve,(d!==v||u!==v.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,d=v,u=v.version,f=r.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Nt(new Se(2,2),new je({name:"BackgroundMaterial",uniforms:Is(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=de.getTransfer(v.colorSpace)!==ve,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||u!==v.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,d=v,u=v.version,f=r.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,x){_.getRGB($r,Fd(r)),n.buffers.color.setClear($r.r,$r.g,$r.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(_,x=1){o.set(_),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(o,l)},render:g,addToRenderList:m}}function xm(r,t){let e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null),s=i,a=!1;function o(M,R,k,I,D){let U=!1,N=d(I,k,R);s!==N&&(s=N,c(s.object)),U=f(M,I,k,D),U&&y(M,I,k,D),D!==null&&t.update(D,r.ELEMENT_ARRAY_BUFFER),(U||a)&&(a=!1,v(M,R,k,I),D!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function d(M,R,k){let I=k.wireframe===!0,D=n[M.id];D===void 0&&(D={},n[M.id]=D);let U=D[R.id];U===void 0&&(U={},D[R.id]=U);let N=U[I];return N===void 0&&(N=u(l()),U[I]=N),N}function u(M){let R=[],k=[],I=[];for(let D=0;D<e;D++)R[D]=0,k[D]=0,I[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:k,attributeDivisors:I,object:M,attributes:{},index:null}}function f(M,R,k,I){let D=s.attributes,U=R.attributes,N=0,W=k.getAttributes();for(let F in W)if(W[F].location>=0){let it=D[F],at=U[F];if(at===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(at=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(at=M.instanceColor)),it===void 0||it.attribute!==at||at&&it.data!==at.data)return!0;N++}return s.attributesNum!==N||s.index!==I}function y(M,R,k,I){let D={},U=R.attributes,N=0,W=k.getAttributes();for(let F in W)if(W[F].location>=0){let it=U[F];it===void 0&&(F==="instanceMatrix"&&M.instanceMatrix&&(it=M.instanceMatrix),F==="instanceColor"&&M.instanceColor&&(it=M.instanceColor));let at={};at.attribute=it,it&&it.data&&(at.data=it.data),D[F]=at,N++}s.attributes=D,s.attributesNum=N,s.index=I}function g(){let M=s.newAttributes;for(let R=0,k=M.length;R<k;R++)M[R]=0}function m(M){p(M,0)}function p(M,R){let k=s.newAttributes,I=s.enabledAttributes,D=s.attributeDivisors;k[M]=1,I[M]===0&&(r.enableVertexAttribArray(M),I[M]=1),D[M]!==R&&(r.vertexAttribDivisor(M,R),D[M]=R)}function _(){let M=s.newAttributes,R=s.enabledAttributes;for(let k=0,I=R.length;k<I;k++)R[k]!==M[k]&&(r.disableVertexAttribArray(k),R[k]=0)}function x(M,R,k,I,D,U,N){N===!0?r.vertexAttribIPointer(M,R,k,D,U):r.vertexAttribPointer(M,R,k,I,D,U)}function v(M,R,k,I){g();let D=I.attributes,U=k.getAttributes(),N=R.defaultAttributeValues;for(let W in U){let F=U[W];if(F.location>=0){let J=D[W];if(J===void 0&&(W==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),W==="instanceColor"&&M.instanceColor&&(J=M.instanceColor)),J!==void 0){let it=J.normalized,at=J.itemSize,ft=t.get(J);if(ft===void 0)continue;let It=ft.buffer,Y=ft.type,et=ft.bytesPerElement,X=Y===r.INT||Y===r.UNSIGNED_INT||J.gpuType===Pc;if(J.isInterleavedBufferAttribute){let K=J.data,Mt=K.stride,Et=J.offset;if(K.isInstancedInterleavedBuffer){for(let Ot=0;Ot<F.locationSize;Ot++)p(F.location+Ot,K.meshPerAttribute);M.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Ot=0;Ot<F.locationSize;Ot++)m(F.location+Ot);r.bindBuffer(r.ARRAY_BUFFER,It);for(let Ot=0;Ot<F.locationSize;Ot++)x(F.location+Ot,at/F.locationSize,Y,it,Mt*et,(Et+at/F.locationSize*Ot)*et,X)}else{if(J.isInstancedBufferAttribute){for(let K=0;K<F.locationSize;K++)p(F.location+K,J.meshPerAttribute);M.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let K=0;K<F.locationSize;K++)m(F.location+K);r.bindBuffer(r.ARRAY_BUFFER,It);for(let K=0;K<F.locationSize;K++)x(F.location+K,at/F.locationSize,Y,it,at*et,at/F.locationSize*K*et,X)}}else if(N!==void 0){let it=N[W];if(it!==void 0)switch(it.length){case 2:r.vertexAttrib2fv(F.location,it);break;case 3:r.vertexAttrib3fv(F.location,it);break;case 4:r.vertexAttrib4fv(F.location,it);break;default:r.vertexAttrib1fv(F.location,it)}}}}_()}function b(){E();for(let M in n){let R=n[M];for(let k in R){let I=R[k];for(let D in I)h(I[D].object),delete I[D];delete R[k]}delete n[M]}}function S(M){if(n[M.id]===void 0)return;let R=n[M.id];for(let k in R){let I=R[k];for(let D in I)h(I[D].object),delete I[D];delete R[k]}delete n[M.id]}function A(M){for(let R in n){let k=n[R];if(k[M.id]===void 0)continue;let I=k[M.id];for(let D in I)h(I[D].object),delete I[D];delete k[M.id]}}function E(){w(),a=!0,s!==i&&(s=i,c(s.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:E,resetDefaultState:w,dispose:b,releaseStatesOfGeometry:S,releaseStatesOfProgram:A,initAttributes:g,enableAttribute:m,disableUnusedAttributes:_}}function vm(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(r.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let y=0;y<d;y++)f+=h[y];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let y=0;y<c.length;y++)a(c[y],h[y],u[y]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let y=0;for(let g=0;g<d;g++)y+=h[g]*u[g];e.update(y,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function _m(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let A=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==Fn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){let E=A===pr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==si&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Vn&&!E)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),y=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),_=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),b=y>0,S=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:y,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:b,maxSamples:S}}function bm(r){let t=this,e=null,n=0,i=!1,s=!1,a=new ti,o=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let y=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||y===null||y.length===0||s&&!m)s?h(null):c();else{let _=s?0:n,x=_*4,v=p.clippingState||null;l.value=v,v=h(y,u,x,f);for(let b=0;b!==x;++b)v[b]=e[b];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,y){let g=d!==null?d.length:0,m=null;if(g!==0){if(m=l.value,y!==!0||m===null){let p=f+g*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=f;x!==g;++x,v+=4)a.copy(d[x]).applyMatrix4(_,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function wm(r){let t=new WeakMap;function e(a,o){return o===cl?a.mapping=As:o===hl&&(a.mapping=Rs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===cl||o===hl)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new ql(l.height);return c.fromEquirectangularTexture(r,a),t.set(a,c),a.addEventListener("dispose",i),e(c.texture,a.mapping)}else return null}}return a}function i(a){let o=a.target;o.removeEventListener("dispose",i);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}var xa=class extends ga{constructor(t=-1,e=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},ws=4,Bh=[.125,.215,.35,.446,.526,.582],Gi=20,Vo=new xa,Oh=new ut,Wo=null,qo=0,$o=0,Xo=!1,zi=(1+Math.sqrt(5))/2,gs=1/zi,zh=[new P(-zi,gs,0),new P(zi,gs,0),new P(-gs,0,zi),new P(gs,0,zi),new P(0,zi,-gs),new P(0,zi,gs),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],va=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Wo=this._renderer.getRenderTarget(),qo=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel(),Xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Wo,qo,$o),this._renderer.xr.enabled=Xo,t.scissorTest=!1,Xr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===As||t.mapping===Rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wo=this._renderer.getRenderTarget(),qo=this._renderer.getActiveCubeFace(),$o=this._renderer.getActiveMipmapLevel(),Xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:pr,format:Fn,colorSpace:Fs,depthBuffer:!1},i=Hh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hh(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Mm(s)),this._blurMaterial=Sm(s,t,e)}return i}_compileMaterial(t){let e=new Nt(this._lodPlanes[0],t);this._renderer.compile(e,Vo)}_sceneToCubeUV(t,e,n,i){let o=new on(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Oh),h.toneMapping=Mi,h.autoClear=!1;let f=new wn({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1}),y=new Nt(new Xi,f),g=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,g=!0):(f.color.copy(Oh),g=!0);for(let p=0;p<6;p++){let _=p%3;_===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):_===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));let x=this._cubeSize;Xr(i,_*x,p>2?x:0,x,x),h.setRenderTarget(i),g&&h.render(y,o),h.render(t,o)}y.geometry.dispose(),y.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===As||t.mapping===Rs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gh());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new Nt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;let l=this._cubeSize;Xr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Vo)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=zh[(i-s-1)%zh.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",s),this._halfBlur(a,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Nt(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,y=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Gi-1),g=s/y,m=isFinite(s)?1+Math.floor(h*g):Gi;m>Gi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gi}`);let p=[],_=0;for(let A=0;A<Gi;++A){let E=A/g,w=Math.exp(-E*E/2);p.push(w),A===0?_+=w:A<m&&(_+=2*w)}for(let A=0;A<p.length;A++)p[A]=p[A]/_;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:x}=this;u.dTheta.value=y,u.mipInt.value=x-n;let v=this._sizeLods[i],b=3*v*(i>x-ws?i-x+ws:0),S=4*(this._cubeSize-v);Xr(e,b,S,3*v,2*v),l.setRenderTarget(e),l.render(d,Vo)}};function Mm(r){let t=[],e=[],n=[],i=r,s=r-ws+1+Bh.length;for(let a=0;a<s;a++){let o=Math.pow(2,i);e.push(o);let l=1/o;a>r-ws?l=Bh[a-r+ws-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,y=6,g=3,m=2,p=1,_=new Float32Array(g*y*f),x=new Float32Array(m*y*f),v=new Float32Array(p*y*f);for(let S=0;S<f;S++){let A=S%3*2/3-1,E=S>2?0:-1,w=[A,E,0,A+2/3,E,0,A+2/3,E+1,0,A,E,0,A+2/3,E+1,0,A,E+1,0];_.set(w,g*y*S),x.set(u,m*y*S);let M=[S,S,S,S,S,S];v.set(M,p*y*S)}let b=new fe;b.setAttribute("position",new oe(_,g)),b.setAttribute("uv",new oe(x,m)),b.setAttribute("faceIndex",new oe(v,p)),t.push(b),i>ws&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Hh(r,t,e){let n=new ri(r,t,e);return n.texture.mapping=Ga,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Sm(r,t,e){let n=new Float32Array(Gi),i=new P(0,1,0);return new je({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Gh(){return new je({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Vh(){return new je({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Nc(){return`

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
	`}function Em(r){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===cl||l===hl,h=l===As||l===Rs;if(c||h){let d=t.get(o),u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new va(r)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let f=o.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new va(r)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function i(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){let l=o.target;l.removeEventListener("dispose",s);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Tm(r){let t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&nr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Am(r,t,e,n){let i={},s=new WeakMap;function a(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let y in u.attributes)t.remove(u.attributes[y]);for(let y in u.morphAttributes){let g=u.morphAttributes[y];for(let m=0,p=g.length;m<p;m++)t.remove(g[m])}u.removeEventListener("dispose",a),delete i[u.id];let f=s.get(u);f&&(t.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let y in u)t.update(u[y],r.ARRAY_BUFFER);let f=d.morphAttributes;for(let y in f){let g=f[y];for(let m=0,p=g.length;m<p;m++)t.update(g[m],r.ARRAY_BUFFER)}}function c(d){let u=[],f=d.index,y=d.attributes.position,g=0;if(f!==null){let _=f.array;g=f.version;for(let x=0,v=_.length;x<v;x+=3){let b=_[x+0],S=_[x+1],A=_[x+2];u.push(b,S,S,A,A,b)}}else if(y!==void 0){let _=y.array;g=y.version;for(let x=0,v=_.length/3-1;x<v;x+=3){let b=x+0,S=x+1,A=x+2;u.push(b,S,S,A,A,b)}}else return;let m=new(Dd(u)?ma:pa)(u,1);m.version=g;let p=s.get(d);p&&t.remove(p),s.set(d,m)}function h(d){let u=s.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Rm(r,t,e){let n;function i(u){n=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,f){r.drawElements(n,f,s,u*a),e.update(f,n,1)}function c(u,f,y){y!==0&&(r.drawElementsInstanced(n,f,s,u*a,y),e.update(f,n,y))}function h(u,f,y){if(y===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,u,0,y);let m=0;for(let p=0;p<y;p++)m+=f[p];e.update(m,n,1)}function d(u,f,y,g){if(y===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/a,f[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,s,u,0,g,0,y);let p=0;for(let _=0;_<y;_++)p+=f[_]*g[_];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Cm(r){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Pm(r,t,e){let n=new WeakMap,i=new ke;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let w=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[],x=0;f===!0&&(x=1),y===!0&&(x=2),g===!0&&(x=3);let v=o.attributes.position.count*x,b=1;v>t.maxTextureSize&&(b=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let S=new Float32Array(v*b*4*d),A=new fa(S,v,b,d);A.type=Vn,A.needsUpdate=!0;let E=x*4;for(let M=0;M<d;M++){let R=m[M],k=p[M],I=_[M],D=v*b*4*M;for(let U=0;U<R.count;U++){let N=U*E;f===!0&&(i.fromBufferAttribute(R,U),S[D+N+0]=i.x,S[D+N+1]=i.y,S[D+N+2]=i.z,S[D+N+3]=0),y===!0&&(i.fromBufferAttribute(k,U),S[D+N+4]=i.x,S[D+N+5]=i.y,S[D+N+6]=i.z,S[D+N+7]=0),g===!0&&(i.fromBufferAttribute(I,U),S[D+N+8]=i.x,S[D+N+9]=i.y,S[D+N+10]=i.z,S[D+N+11]=I.itemSize===4?i.w:1)}}u={count:d,texture:A,size:new dt(v,b)},n.set(o,u),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let f=0;for(let g=0;g<c.length;g++)f+=c[g];let y=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(r,"morphTargetBaseInfluence",y),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function Im(r,t,e,n){let i=new WeakMap;function s(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function a(){i=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}var _a=class extends hn{constructor(t,e,n,i,s,a,o,l,c,h=Ms){if(h!==Ms&&h!==Ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ms&&(n=qi),n===void 0&&h===Ps&&(n=Cs),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:yn,this.minFilter=l!==void 0?l:yn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Nd=new hn,Wh=new _a(1,1),Bd=new fa,Od=new Vl,zd=new ya,qh=[],$h=[],Xh=new Float32Array(16),Yh=new Float32Array(9),Zh=new Float32Array(4);function Ns(r,t,e){let n=r[0];if(n<=0||n>0)return r;let i=t*e,s=qh[i];if(s===void 0&&(s=new Float32Array(i),qh[i]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function Ve(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function We(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Wa(r,t){let e=$h[t];e===void 0&&(e=new Int32Array(t),$h[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Lm(r,t){let e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Dm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;r.uniform2fv(this.addr,t),We(e,t)}}function km(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ve(e,t))return;r.uniform3fv(this.addr,t),We(e,t)}}function Fm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;r.uniform4fv(this.addr,t),We(e,t)}}function Um(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;Zh.set(n),r.uniformMatrix2fv(this.addr,!1,Zh),We(e,n)}}function Nm(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;Yh.set(n),r.uniformMatrix3fv(this.addr,!1,Yh),We(e,n)}}function Bm(r,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;Xh.set(n),r.uniformMatrix4fv(this.addr,!1,Xh),We(e,n)}}function Om(r,t){let e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function zm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;r.uniform2iv(this.addr,t),We(e,t)}}function Hm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;r.uniform3iv(this.addr,t),We(e,t)}}function Gm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;r.uniform4iv(this.addr,t),We(e,t)}}function Vm(r,t){let e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Wm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;r.uniform2uiv(this.addr,t),We(e,t)}}function qm(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;r.uniform3uiv(this.addr,t),We(e,t)}}function $m(r,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;r.uniform4uiv(this.addr,t),We(e,t)}}function Xm(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Wh.compareFunction=Ld,s=Wh):s=Nd,e.setTexture2D(t||s,i)}function Ym(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Od,i)}function Zm(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||zd,i)}function Km(r,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Bd,i)}function Jm(r){switch(r){case 5126:return Lm;case 35664:return Dm;case 35665:return km;case 35666:return Fm;case 35674:return Um;case 35675:return Nm;case 35676:return Bm;case 5124:case 35670:return Om;case 35667:case 35671:return zm;case 35668:case 35672:return Hm;case 35669:case 35673:return Gm;case 5125:return Vm;case 36294:return Wm;case 36295:return qm;case 36296:return $m;case 35678:case 36198:case 36298:case 36306:case 35682:return Xm;case 35679:case 36299:case 36307:return Ym;case 35680:case 36300:case 36308:case 36293:return Zm;case 36289:case 36303:case 36311:case 36292:return Km}}function jm(r,t){r.uniform1fv(this.addr,t)}function Qm(r,t){let e=Ns(t,this.size,2);r.uniform2fv(this.addr,e)}function tg(r,t){let e=Ns(t,this.size,3);r.uniform3fv(this.addr,e)}function eg(r,t){let e=Ns(t,this.size,4);r.uniform4fv(this.addr,e)}function ng(r,t){let e=Ns(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function ig(r,t){let e=Ns(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function sg(r,t){let e=Ns(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function rg(r,t){r.uniform1iv(this.addr,t)}function ag(r,t){r.uniform2iv(this.addr,t)}function og(r,t){r.uniform3iv(this.addr,t)}function lg(r,t){r.uniform4iv(this.addr,t)}function cg(r,t){r.uniform1uiv(this.addr,t)}function hg(r,t){r.uniform2uiv(this.addr,t)}function dg(r,t){r.uniform3uiv(this.addr,t)}function ug(r,t){r.uniform4uiv(this.addr,t)}function fg(r,t,e){let n=this.cache,i=t.length,s=Wa(e,i);Ve(n,s)||(r.uniform1iv(this.addr,s),We(n,s));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Nd,s[a])}function pg(r,t,e){let n=this.cache,i=t.length,s=Wa(e,i);Ve(n,s)||(r.uniform1iv(this.addr,s),We(n,s));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Od,s[a])}function mg(r,t,e){let n=this.cache,i=t.length,s=Wa(e,i);Ve(n,s)||(r.uniform1iv(this.addr,s),We(n,s));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||zd,s[a])}function gg(r,t,e){let n=this.cache,i=t.length,s=Wa(e,i);Ve(n,s)||(r.uniform1iv(this.addr,s),We(n,s));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Bd,s[a])}function yg(r){switch(r){case 5126:return jm;case 35664:return Qm;case 35665:return tg;case 35666:return eg;case 35674:return ng;case 35675:return ig;case 35676:return sg;case 5124:case 35670:return rg;case 35667:case 35671:return ag;case 35668:case 35672:return og;case 35669:case 35673:return lg;case 5125:return cg;case 36294:return hg;case 36295:return dg;case 36296:return ug;case 35678:case 36198:case 36298:case 36306:case 35682:return fg;case 35679:case 36299:case 36307:return pg;case 35680:case 36300:case 36308:case 36293:return mg;case 36289:case 36303:case 36311:case 36292:return gg}}var $l=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Jm(e.type)}},Xl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=yg(e.type)}},Yl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(t,e[o.id],n)}}},Yo=/(\w+)(\])?(\[|\.)?/g;function Kh(r,t){r.seq.push(t),r.map[t.id]=t}function xg(r,t,e){let n=r.name,i=n.length;for(Yo.lastIndex=0;;){let s=Yo.exec(n),a=Yo.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Kh(e,c===void 0?new $l(o,r,t):new Xl(o,r,t));break}else{let d=e.map[o];d===void 0&&(d=new Yl(o),Kh(e,d)),e=d}}}var Es=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),a=t.getUniformLocation(e,s.name);xg(s,a,this)}}setValue(t,e,n,i){let s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,a=e.length;s!==a;++s){let o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let a=t[i];a.id in e&&n.push(a)}return n}};function Jh(r,t,e){let n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}var vg=37297,_g=0;function bg(r,t){let e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=i;a<s;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var jh=new Qt;function wg(r){de._getMatrix(jh,de.workingColorSpace,r);let t=`mat3( ${jh.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(r)){case Va:return[t,"LinearTransferOETF"];case ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Qh(r,t,e){let n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+bg(r.getShaderSource(t),a)}else return i}function Mg(r,t){let e=wg(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Sg(r,t){let e;switch(t){case Ku:e="Linear";break;case Ju:e="Reinhard";break;case ju:e="Cineon";break;case Cc:e="ACESFilmic";break;case tf:e="AgX";break;case ef:e="Neutral";break;case Qu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Yr=new P;function Eg(){de.getLuminanceCoefficients(Yr);let r=Yr.x.toFixed(4),t=Yr.y.toFixed(4),e=Yr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tg(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ir).join(`
`)}function Ag(r){let t=[];for(let e in r){let n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Rg(r,t){let e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(t,i),a=s.name,o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function ir(r){return r!==""}function td(r,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ed(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Cg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zl(r){return r.replace(Cg,Ig)}var Pg=new Map;function Ig(r,t){let e=Yt[t];if(e===void 0){let n=Pg.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Zl(e)}var Lg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nd(r){return r.replace(Lg,Dg)}function Dg(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function id(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function kg(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===vd?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Rc?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Qn&&(t="SHADOWMAP_TYPE_VSM"),t}function Fg(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case As:case Rs:t="ENVMAP_TYPE_CUBE";break;case Ga:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ug(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Rs:t="ENVMAP_MODE_REFRACTION";break}return t}function Ng(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case _d:t="ENVMAP_BLENDING_MULTIPLY";break;case Yu:t="ENVMAP_BLENDING_MIX";break;case Zu:t="ENVMAP_BLENDING_ADD";break}return t}function Bg(r){let t=r.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Og(r,t,e,n){let i=r.getContext(),s=e.defines,a=e.vertexShader,o=e.fragmentShader,l=kg(e),c=Fg(e),h=Ug(e),d=Ng(e),u=Bg(e),f=Tg(e),y=Ag(s),g=i.createProgram(),m,p,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(ir).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(ir).join(`
`),p.length>0&&(p+=`
`)):(m=[id(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ir).join(`
`),p=[id(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Mi?"#define TONE_MAPPING":"",e.toneMapping!==Mi?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Mi?Sg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,Mg("linearToOutputTexel",e.outputColorSpace),Eg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ir).join(`
`)),a=Zl(a),a=td(a,e),a=ed(a,e),o=Zl(o),o=td(o,e),o=ed(o,e),a=nd(a),o=nd(o),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let x=_+m+a,v=_+p+o,b=Jh(i,i.VERTEX_SHADER,x),S=Jh(i,i.FRAGMENT_SHADER,v);i.attachShader(g,b),i.attachShader(g,S),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function A(R){if(r.debug.checkShaderErrors){let k=i.getProgramInfoLog(g).trim(),I=i.getShaderInfoLog(b).trim(),D=i.getShaderInfoLog(S).trim(),U=!0,N=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(U=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,b,S);else{let W=Qh(i,b,"vertex"),F=Qh(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+W+`
`+F)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(I===""||D==="")&&(N=!1);N&&(R.diagnostics={runnable:U,programLog:k,vertexShader:{log:I,prefix:m},fragmentShader:{log:D,prefix:p}})}i.deleteShader(b),i.deleteShader(S),E=new Es(i,g),w=Rg(i,g)}let E;this.getUniforms=function(){return E===void 0&&A(this),E};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(g,vg)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=_g++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=S,this}var zg=0,Kl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Jl(t),e.set(t,n)),n}},Jl=class{constructor(t){this.id=zg++,this.code=t,this.usedTimes=0}};function Hg(r,t,e,n,i,s,a){let o=new lr,l=new Kl,c=new Set,h=[],d=i.logarithmicDepthBuffer,u=i.vertexTextures,f=i.precision,y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,M,R,k,I){let D=k.fog,U=I.geometry,N=w.isMeshStandardMaterial?k.environment:null,W=(w.isMeshStandardMaterial?e:t).get(w.envMap||N),F=W&&W.mapping===Ga?W.image.height:null,J=y[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));let it=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,at=it!==void 0?it.length:0,ft=0;U.morphAttributes.position!==void 0&&(ft=1),U.morphAttributes.normal!==void 0&&(ft=2),U.morphAttributes.color!==void 0&&(ft=3);let It,Y,et,X;if(J){let ge=zn[J];It=ge.vertexShader,Y=ge.fragmentShader}else It=w.vertexShader,Y=w.fragmentShader,l.update(w),et=l.getVertexShaderID(w),X=l.getFragmentShaderID(w);let K=r.getRenderTarget(),Mt=r.state.buffers.depth.getReversed(),Et=I.isInstancedMesh===!0,Ot=I.isBatchedMesh===!0,se=!!w.map,At=!!w.matcap,Kt=!!W,O=!!w.aoMap,Ue=!!w.lightMap,ee=!!w.bumpMap,re=!!w.normalMap,zt=!!w.displacementMap,xe=!!w.emissiveMap,Bt=!!w.metalnessMap,L=!!w.roughnessMap,T=w.anisotropy>0,V=w.clearcoat>0,Q=w.dispersion>0,nt=w.iridescence>0,j=w.sheen>0,Pt=w.transmission>0,mt=T&&!!w.anisotropyMap,Tt=V&&!!w.clearcoatMap,he=V&&!!w.clearcoatNormalMap,ot=V&&!!w.clearcoatRoughnessMap,Rt=nt&&!!w.iridescenceMap,Gt=nt&&!!w.iridescenceThicknessMap,Vt=j&&!!w.sheenColorMap,Ct=j&&!!w.sheenRoughnessMap,ce=!!w.specularMap,ne=!!w.specularColorMap,we=!!w.specularIntensityMap,B=Pt&&!!w.transmissionMap,yt=Pt&&!!w.thicknessMap,Z=!!w.gradientMap,tt=!!w.alphaMap,wt=w.alphaTest>0,vt=!!w.alphaHash,Jt=!!w.extensions,Le=Mi;w.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Le=r.toneMapping);let Qe={shaderID:J,shaderType:w.type,shaderName:w.name,vertexShader:It,fragmentShader:Y,defines:w.defines,customVertexShaderID:et,customFragmentShaderID:X,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Ot,batchingColor:Ot&&I._colorsTexture!==null,instancing:Et,instancingColor:Et&&I.instanceColor!==null,instancingMorph:Et&&I.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:K===null?r.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Fs,alphaToCoverage:!!w.alphaToCoverage,map:se,matcap:At,envMap:Kt,envMapMode:Kt&&W.mapping,envMapCubeUVHeight:F,aoMap:O,lightMap:Ue,bumpMap:ee,normalMap:re,displacementMap:u&&zt,emissiveMap:xe,normalMapObjectSpace:re&&w.normalMapType===af,normalMapTangentSpace:re&&w.normalMapType===Id,metalnessMap:Bt,roughnessMap:L,anisotropy:T,anisotropyMap:mt,clearcoat:V,clearcoatMap:Tt,clearcoatNormalMap:he,clearcoatRoughnessMap:ot,dispersion:Q,iridescence:nt,iridescenceMap:Rt,iridescenceThicknessMap:Gt,sheen:j,sheenColorMap:Vt,sheenRoughnessMap:Ct,specularMap:ce,specularColorMap:ne,specularIntensityMap:we,transmission:Pt,transmissionMap:B,thicknessMap:yt,gradientMap:Z,opaque:w.transparent===!1&&w.blending===wi&&w.alphaToCoverage===!1,alphaMap:tt,alphaTest:wt,alphaHash:vt,combine:w.combine,mapUv:se&&g(w.map.channel),aoMapUv:O&&g(w.aoMap.channel),lightMapUv:Ue&&g(w.lightMap.channel),bumpMapUv:ee&&g(w.bumpMap.channel),normalMapUv:re&&g(w.normalMap.channel),displacementMapUv:zt&&g(w.displacementMap.channel),emissiveMapUv:xe&&g(w.emissiveMap.channel),metalnessMapUv:Bt&&g(w.metalnessMap.channel),roughnessMapUv:L&&g(w.roughnessMap.channel),anisotropyMapUv:mt&&g(w.anisotropyMap.channel),clearcoatMapUv:Tt&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:he&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:Gt&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Vt&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&g(w.sheenRoughnessMap.channel),specularMapUv:ce&&g(w.specularMap.channel),specularColorMapUv:ne&&g(w.specularColorMap.channel),specularIntensityMapUv:we&&g(w.specularIntensityMap.channel),transmissionMapUv:B&&g(w.transmissionMap.channel),thicknessMapUv:yt&&g(w.thicknessMap.channel),alphaMapUv:tt&&g(w.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(re||T),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!U.attributes.uv&&(se||tt),fog:!!D,useFog:w.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Mt,skinning:I.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:ft,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:Le,decodeVideoTexture:se&&w.map.isVideoTexture===!0&&de.getTransfer(w.map.colorSpace)===ve,decodeVideoTextureEmissive:xe&&w.emissiveMap.isVideoTexture===!0&&de.getTransfer(w.emissiveMap.colorSpace)===ve,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===ye,flipSided:w.side===nn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Jt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Jt&&w.extensions.multiDraw===!0||Ot)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Qe.vertexUv1s=c.has(1),Qe.vertexUv2s=c.has(2),Qe.vertexUv3s=c.has(3),c.clear(),Qe}function p(w){let M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(let R in w.defines)M.push(R),M.push(w.defines[R]);return w.isRawShaderMaterial===!1&&(_(M,w),x(M,w),M.push(r.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function _(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function x(w,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),w.push(o.mask)}function v(w){let M=y[w.type],R;if(M){let k=zn[M];R=Us.clone(k.uniforms)}else R=w.uniforms;return R}function b(w,M){let R;for(let k=0,I=h.length;k<I;k++){let D=h[k];if(D.cacheKey===M){R=D,++R.usedTimes;break}}return R===void 0&&(R=new Og(r,M,w,s),h.push(R)),R}function S(w){if(--w.usedTimes===0){let M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function A(w){l.remove(w)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:b,releaseProgram:S,releaseShaderCache:A,programs:h,dispose:E}}function Gg(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function Vg(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function sd(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function rd(){let r=[],t=0,e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function a(d,u,f,y,g,m){let p=r[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:y,renderOrder:d.renderOrder,z:g,group:m},r[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=y,p.renderOrder=d.renderOrder,p.z=g,p.group=m),t++,p}function o(d,u,f,y,g,m){let p=a(d,u,f,y,g,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(d,u,f,y,g,m){let p=a(d,u,f,y,g,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||Vg),n.length>1&&n.sort(u||sd),i.length>1&&i.sort(u||sd)}function h(){for(let d=t,u=r.length;d<u;d++){let f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function Wg(){let r=new WeakMap;function t(n,i){let s=r.get(n),a;return s===void 0?(a=new rd,r.set(n,[a])):i>=s.length?(a=new rd,s.push(a)):a=s[i],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function qg(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new ut};break;case"SpotLight":e={position:new P,direction:new P,color:new ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new ut,groundColor:new ut};break;case"RectAreaLight":e={color:new ut,position:new P,halfWidth:new P,halfHeight:new P};break}return r[t.id]=e,e}}}function $g(){let r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}var Xg=0;function Yg(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Zg(r){let t=new qg,e=$g(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);let i=new P,s=new te,a=new te;function o(c){let h=0,d=0,u=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,y=0,g=0,m=0,p=0,_=0,x=0,v=0,b=0,S=0,A=0;c.sort(Yg);for(let w=0,M=c.length;w<M;w++){let R=c[w],k=R.color,I=R.intensity,D=R.distance,U=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=k.r*I,d+=k.g*I,u+=k.b*I;else if(R.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(R.sh.coefficients[N],I);A++}else if(R.isDirectionalLight){let N=t.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let W=R.shadow,F=e.get(R);F.shadowIntensity=W.intensity,F.shadowBias=W.bias,F.shadowNormalBias=W.normalBias,F.shadowRadius=W.radius,F.shadowMapSize=W.mapSize,n.directionalShadow[f]=F,n.directionalShadowMap[f]=U,n.directionalShadowMatrix[f]=R.shadow.matrix,_++}n.directional[f]=N,f++}else if(R.isSpotLight){let N=t.get(R);N.position.setFromMatrixPosition(R.matrixWorld),N.color.copy(k).multiplyScalar(I),N.distance=D,N.coneCos=Math.cos(R.angle),N.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),N.decay=R.decay,n.spot[g]=N;let W=R.shadow;if(R.map&&(n.spotLightMap[b]=R.map,b++,W.updateMatrices(R),R.castShadow&&S++),n.spotLightMatrix[g]=W.matrix,R.castShadow){let F=e.get(R);F.shadowIntensity=W.intensity,F.shadowBias=W.bias,F.shadowNormalBias=W.normalBias,F.shadowRadius=W.radius,F.shadowMapSize=W.mapSize,n.spotShadow[g]=F,n.spotShadowMap[g]=U,v++}g++}else if(R.isRectAreaLight){let N=t.get(R);N.color.copy(k).multiplyScalar(I),N.halfWidth.set(R.width*.5,0,0),N.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=N,m++}else if(R.isPointLight){let N=t.get(R);if(N.color.copy(R.color).multiplyScalar(R.intensity),N.distance=R.distance,N.decay=R.decay,R.castShadow){let W=R.shadow,F=e.get(R);F.shadowIntensity=W.intensity,F.shadowBias=W.bias,F.shadowNormalBias=W.normalBias,F.shadowRadius=W.radius,F.shadowMapSize=W.mapSize,F.shadowCameraNear=W.camera.near,F.shadowCameraFar=W.camera.far,n.pointShadow[y]=F,n.pointShadowMap[y]=U,n.pointShadowMatrix[y]=R.shadow.matrix,x++}n.point[y]=N,y++}else if(R.isHemisphereLight){let N=t.get(R);N.skyColor.copy(R.color).multiplyScalar(I),N.groundColor.copy(R.groundColor).multiplyScalar(I),n.hemi[p]=N,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let E=n.hash;(E.directionalLength!==f||E.pointLength!==y||E.spotLength!==g||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==_||E.numPointShadows!==x||E.numSpotShadows!==v||E.numSpotMaps!==b||E.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=m,n.point.length=y,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+b-S,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,E.directionalLength=f,E.pointLength=y,E.spotLength=g,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=_,E.numPointShadows=x,E.numSpotShadows=v,E.numSpotMaps=b,E.numLightProbes=A,n.version=Xg++)}function l(c,h){let d=0,u=0,f=0,y=0,g=0,m=h.matrixWorldInverse;for(let p=0,_=c.length;p<_;p++){let x=c[p];if(x.isDirectionalLight){let v=n.directional[d];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(x.isSpotLight){let v=n.spot[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),f++}else if(x.isRectAreaLight){let v=n.rectArea[y];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),a.identity(),s.copy(x.matrixWorld),s.premultiply(m),a.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),y++}else if(x.isPointLight){let v=n.point[u];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),u++}else if(x.isHemisphereLight){let v=n.hemi[g];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function ad(r){let t=new Zg(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Kg(r){let t=new WeakMap;function e(i,s=0){let a=t.get(i),o;return a===void 0?(o=new ad(r),t.set(i,[o])):s>=a.length?(o=new ad(r),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var jl=class extends oi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=sf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ql=class extends oi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Jg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jg=`uniform sampler2D shadow_pass;
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
}`;function Qg(r,t,e){let n=new cr,i=new dt,s=new dt,a=new ke,o=new jl({depthPacking:rf}),l=new Ql,c={},h=e.maxTextureSize,d={[Ei]:nn,[nn]:Ei,[ye]:ye},u=new je({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new dt},radius:{value:4}},vertexShader:Jg,fragmentShader:jg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let y=new fe;y.setAttribute("position",new oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new Nt(y,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vd;let p=this.type;this.render=function(S,A,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;let w=r.getRenderTarget(),M=r.getActiveCubeFace(),R=r.getActiveMipmapLevel(),k=r.state;k.setBlending(bi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let I=p!==Qn&&this.type===Qn,D=p===Qn&&this.type!==Qn;for(let U=0,N=S.length;U<N;U++){let W=S[U],F=W.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);let J=F.getFrameExtents();if(i.multiply(J),s.copy(F.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/J.x),i.x=s.x*J.x,F.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/J.y),i.y=s.y*J.y,F.mapSize.y=s.y)),F.map===null||I===!0||D===!0){let at=this.type!==Qn?{minFilter:yn,magFilter:yn}:{};F.map!==null&&F.map.dispose(),F.map=new ri(i.x,i.y,at),F.map.texture.name=W.name+".shadowMap",F.camera.updateProjectionMatrix()}r.setRenderTarget(F.map),r.clear();let it=F.getViewportCount();for(let at=0;at<it;at++){let ft=F.getViewport(at);a.set(s.x*ft.x,s.y*ft.y,s.x*ft.z,s.y*ft.w),k.viewport(a),F.updateMatrices(W,at),n=F.getFrustum(),v(A,E,F.camera,W,this.type)}F.isPointLightShadow!==!0&&this.type===Qn&&_(F,E),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(w,M,R)};function _(S,A){let E=t.update(g);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new ri(i.x,i.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(A,null,E,u,g,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(A,null,E,f,g,null)}function x(S,A,E,w){let M=null,R=E.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(R!==void 0)M=R;else if(M=E.isPointLight===!0?l:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){let k=M.uuid,I=A.uuid,D=c[k];D===void 0&&(D={},c[k]=D);let U=D[I];U===void 0&&(U=M.clone(),D[I]=U,A.addEventListener("dispose",b)),M=U}if(M.visible=A.visible,M.wireframe=A.wireframe,w===Qn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:d[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,E.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let k=r.properties.get(M);k.light=E}return M}function v(S,A,E,w,M){if(S.visible===!1)return;if(S.layers.test(A.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&M===Qn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,S.matrixWorld);let I=t.update(S),D=S.material;if(Array.isArray(D)){let U=I.groups;for(let N=0,W=U.length;N<W;N++){let F=U[N],J=D[F.materialIndex];if(J&&J.visible){let it=x(S,J,w,M);S.onBeforeShadow(r,S,A,E,I,it,F),r.renderBufferDirect(E,null,I,it,S,F),S.onAfterShadow(r,S,A,E,I,it,F)}}}else if(D.visible){let U=x(S,D,w,M);S.onBeforeShadow(r,S,A,E,I,U,null),r.renderBufferDirect(E,null,I,U,S,null),S.onAfterShadow(r,S,A,E,I,U,null)}}let k=S.children;for(let I=0,D=k.length;I<D;I++)v(k[I],A,E,w,M)}function b(S){S.target.removeEventListener("dispose",b);for(let E in c){let w=c[E],M=S.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}var t1={[nl]:il,[sl]:ol,[rl]:ll,[Ts]:al,[il]:nl,[ol]:sl,[ll]:rl,[al]:Ts};function e1(r,t){function e(){let B=!1,yt=new ke,Z=null,tt=new ke(0,0,0,0);return{setMask:function(wt){Z!==wt&&!B&&(r.colorMask(wt,wt,wt,wt),Z=wt)},setLocked:function(wt){B=wt},setClear:function(wt,vt,Jt,Le,Qe){Qe===!0&&(wt*=Le,vt*=Le,Jt*=Le),yt.set(wt,vt,Jt,Le),tt.equals(yt)===!1&&(r.clearColor(wt,vt,Jt,Le),tt.copy(yt))},reset:function(){B=!1,Z=null,tt.set(-1,0,0,0)}}}function n(){let B=!1,yt=!1,Z=null,tt=null,wt=null;return{setReversed:function(vt){if(yt!==vt){let Jt=t.get("EXT_clip_control");yt?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT);let Le=wt;wt=null,this.setClear(Le)}yt=vt},getReversed:function(){return yt},setTest:function(vt){vt?K(r.DEPTH_TEST):Mt(r.DEPTH_TEST)},setMask:function(vt){Z!==vt&&!B&&(r.depthMask(vt),Z=vt)},setFunc:function(vt){if(yt&&(vt=t1[vt]),tt!==vt){switch(vt){case nl:r.depthFunc(r.NEVER);break;case il:r.depthFunc(r.ALWAYS);break;case sl:r.depthFunc(r.LESS);break;case Ts:r.depthFunc(r.LEQUAL);break;case rl:r.depthFunc(r.EQUAL);break;case al:r.depthFunc(r.GEQUAL);break;case ol:r.depthFunc(r.GREATER);break;case ll:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}tt=vt}},setLocked:function(vt){B=vt},setClear:function(vt){wt!==vt&&(yt&&(vt=1-vt),r.clearDepth(vt),wt=vt)},reset:function(){B=!1,Z=null,tt=null,wt=null,yt=!1}}}function i(){let B=!1,yt=null,Z=null,tt=null,wt=null,vt=null,Jt=null,Le=null,Qe=null;return{setTest:function(ge){B||(ge?K(r.STENCIL_TEST):Mt(r.STENCIL_TEST))},setMask:function(ge){yt!==ge&&!B&&(r.stencilMask(ge),yt=ge)},setFunc:function(ge,An,qn){(Z!==ge||tt!==An||wt!==qn)&&(r.stencilFunc(ge,An,qn),Z=ge,tt=An,wt=qn)},setOp:function(ge,An,qn){(vt!==ge||Jt!==An||Le!==qn)&&(r.stencilOp(ge,An,qn),vt=ge,Jt=An,Le=qn)},setLocked:function(ge){B=ge},setClear:function(ge){Qe!==ge&&(r.clearStencil(ge),Qe=ge)},reset:function(){B=!1,yt=null,Z=null,tt=null,wt=null,vt=null,Jt=null,Le=null,Qe=null}}}let s=new e,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],y=null,g=!1,m=null,p=null,_=null,x=null,v=null,b=null,S=null,A=new ut(0,0,0),E=0,w=!1,M=null,R=null,k=null,I=null,D=null,U=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,W=0,F=r.getParameter(r.VERSION);F.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=W>=1):F.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=W>=2);let J=null,it={},at=r.getParameter(r.SCISSOR_BOX),ft=r.getParameter(r.VIEWPORT),It=new ke().fromArray(at),Y=new ke().fromArray(ft);function et(B,yt,Z,tt){let wt=new Uint8Array(4),vt=r.createTexture();r.bindTexture(B,vt),r.texParameteri(B,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(B,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Jt=0;Jt<Z;Jt++)B===r.TEXTURE_3D||B===r.TEXTURE_2D_ARRAY?r.texImage3D(yt,0,r.RGBA,1,1,tt,0,r.RGBA,r.UNSIGNED_BYTE,wt):r.texImage2D(yt+Jt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,wt);return vt}let X={};X[r.TEXTURE_2D]=et(r.TEXTURE_2D,r.TEXTURE_2D,1),X[r.TEXTURE_CUBE_MAP]=et(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[r.TEXTURE_2D_ARRAY]=et(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),X[r.TEXTURE_3D]=et(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(r.DEPTH_TEST),a.setFunc(Ts),ee(!1),re(hh),K(r.CULL_FACE),O(bi);function K(B){h[B]!==!0&&(r.enable(B),h[B]=!0)}function Mt(B){h[B]!==!1&&(r.disable(B),h[B]=!1)}function Et(B,yt){return d[B]!==yt?(r.bindFramebuffer(B,yt),d[B]=yt,B===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=yt),B===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=yt),!0):!1}function Ot(B,yt){let Z=f,tt=!1;if(B){Z=u.get(yt),Z===void 0&&(Z=[],u.set(yt,Z));let wt=B.textures;if(Z.length!==wt.length||Z[0]!==r.COLOR_ATTACHMENT0){for(let vt=0,Jt=wt.length;vt<Jt;vt++)Z[vt]=r.COLOR_ATTACHMENT0+vt;Z.length=wt.length,tt=!0}}else Z[0]!==r.BACK&&(Z[0]=r.BACK,tt=!0);tt&&r.drawBuffers(Z)}function se(B){return y!==B?(r.useProgram(B),y=B,!0):!1}let At={[Hi]:r.FUNC_ADD,[Iu]:r.FUNC_SUBTRACT,[Lu]:r.FUNC_REVERSE_SUBTRACT};At[Du]=r.MIN,At[ku]=r.MAX;let Kt={[Fu]:r.ZERO,[Uu]:r.ONE,[Nu]:r.SRC_COLOR,[tl]:r.SRC_ALPHA,[Vu]:r.SRC_ALPHA_SATURATE,[Hu]:r.DST_COLOR,[Ou]:r.DST_ALPHA,[Bu]:r.ONE_MINUS_SRC_COLOR,[el]:r.ONE_MINUS_SRC_ALPHA,[Gu]:r.ONE_MINUS_DST_COLOR,[zu]:r.ONE_MINUS_DST_ALPHA,[Wu]:r.CONSTANT_COLOR,[qu]:r.ONE_MINUS_CONSTANT_COLOR,[$u]:r.CONSTANT_ALPHA,[Xu]:r.ONE_MINUS_CONSTANT_ALPHA};function O(B,yt,Z,tt,wt,vt,Jt,Le,Qe,ge){if(B===bi){g===!0&&(Mt(r.BLEND),g=!1);return}if(g===!1&&(K(r.BLEND),g=!0),B!==Pu){if(B!==m||ge!==w){if((p!==Hi||v!==Hi)&&(r.blendEquation(r.FUNC_ADD),p=Hi,v=Hi),ge)switch(B){case wi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case la:r.blendFunc(r.ONE,r.ONE);break;case dh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case uh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case wi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case la:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case dh:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case uh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}_=null,x=null,b=null,S=null,A.set(0,0,0),E=0,m=B,w=ge}return}wt=wt||yt,vt=vt||Z,Jt=Jt||tt,(yt!==p||wt!==v)&&(r.blendEquationSeparate(At[yt],At[wt]),p=yt,v=wt),(Z!==_||tt!==x||vt!==b||Jt!==S)&&(r.blendFuncSeparate(Kt[Z],Kt[tt],Kt[vt],Kt[Jt]),_=Z,x=tt,b=vt,S=Jt),(Le.equals(A)===!1||Qe!==E)&&(r.blendColor(Le.r,Le.g,Le.b,Qe),A.copy(Le),E=Qe),m=B,w=!1}function Ue(B,yt){B.side===ye?Mt(r.CULL_FACE):K(r.CULL_FACE);let Z=B.side===nn;yt&&(Z=!Z),ee(Z),B.blending===wi&&B.transparent===!1?O(bi):O(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),s.setMask(B.colorWrite);let tt=B.stencilWrite;o.setTest(tt),tt&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),xe(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?K(r.SAMPLE_ALPHA_TO_COVERAGE):Mt(r.SAMPLE_ALPHA_TO_COVERAGE)}function ee(B){M!==B&&(B?r.frontFace(r.CW):r.frontFace(r.CCW),M=B)}function re(B){B!==Ru?(K(r.CULL_FACE),B!==R&&(B===hh?r.cullFace(r.BACK):B===Cu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Mt(r.CULL_FACE),R=B}function zt(B){B!==k&&(N&&r.lineWidth(B),k=B)}function xe(B,yt,Z){B?(K(r.POLYGON_OFFSET_FILL),(I!==yt||D!==Z)&&(r.polygonOffset(yt,Z),I=yt,D=Z)):Mt(r.POLYGON_OFFSET_FILL)}function Bt(B){B?K(r.SCISSOR_TEST):Mt(r.SCISSOR_TEST)}function L(B){B===void 0&&(B=r.TEXTURE0+U-1),J!==B&&(r.activeTexture(B),J=B)}function T(B,yt,Z){Z===void 0&&(J===null?Z=r.TEXTURE0+U-1:Z=J);let tt=it[Z];tt===void 0&&(tt={type:void 0,texture:void 0},it[Z]=tt),(tt.type!==B||tt.texture!==yt)&&(J!==Z&&(r.activeTexture(Z),J=Z),r.bindTexture(B,yt||X[B]),tt.type=B,tt.texture=yt)}function V(){let B=it[J];B!==void 0&&B.type!==void 0&&(r.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function Q(){try{r.compressedTexImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function nt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Pt(){try{r.texSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function mt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Tt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function he(){try{r.texStorage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ot(){try{r.texStorage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Rt(){try{r.texImage2D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Gt(){try{r.texImage3D.apply(r,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Vt(B){It.equals(B)===!1&&(r.scissor(B.x,B.y,B.z,B.w),It.copy(B))}function Ct(B){Y.equals(B)===!1&&(r.viewport(B.x,B.y,B.z,B.w),Y.copy(B))}function ce(B,yt){let Z=c.get(yt);Z===void 0&&(Z=new WeakMap,c.set(yt,Z));let tt=Z.get(B);tt===void 0&&(tt=r.getUniformBlockIndex(yt,B.name),Z.set(B,tt))}function ne(B,yt){let tt=c.get(yt).get(B);l.get(yt)!==tt&&(r.uniformBlockBinding(yt,tt,B.__bindingPointIndex),l.set(yt,tt))}function we(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},J=null,it={},d={},u=new WeakMap,f=[],y=null,g=!1,m=null,p=null,_=null,x=null,v=null,b=null,S=null,A=new ut(0,0,0),E=0,w=!1,M=null,R=null,k=null,I=null,D=null,It.set(0,0,r.canvas.width,r.canvas.height),Y.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:K,disable:Mt,bindFramebuffer:Et,drawBuffers:Ot,useProgram:se,setBlending:O,setMaterial:Ue,setFlipSided:ee,setCullFace:re,setLineWidth:zt,setPolygonOffset:xe,setScissorTest:Bt,activeTexture:L,bindTexture:T,unbindTexture:V,compressedTexImage2D:Q,compressedTexImage3D:nt,texImage2D:Rt,texImage3D:Gt,updateUBOMapping:ce,uniformBlockBinding:ne,texStorage2D:he,texStorage3D:ot,texSubImage2D:j,texSubImage3D:Pt,compressedTexSubImage2D:mt,compressedTexSubImage3D:Tt,scissor:Vt,viewport:Ct,reset:we}}function od(r,t,e,n){let i=n1(n);switch(e){case Ed:return r*t;case Ad:return r*t;case Rd:return r*t*2;case Dc:return r*t/i.components*i.byteLength;case kc:return r*t/i.components*i.byteLength;case Cd:return r*t*2/i.components*i.byteLength;case Fc:return r*t*2/i.components*i.byteLength;case Td:return r*t*3/i.components*i.byteLength;case Fn:return r*t*4/i.components*i.byteLength;case Uc:return r*t*4/i.components*i.byteLength;case ia:case sa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ra:case aa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case fl:case ml:return Math.max(r,16)*Math.max(t,8)/4;case ul:case pl:return Math.max(r,8)*Math.max(t,8)/2;case gl:case yl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case xl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case vl:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case _l:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case bl:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case wl:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Ml:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Sl:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case El:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Tl:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Al:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Rl:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Cl:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case Pl:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Il:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Ll:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case oa:case Dl:case kl:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Pd:case Fl:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Ul:case Nl:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function n1(r){switch(r){case si:case wd:return{byteLength:1,components:1};case or:case Md:case pr:return{byteLength:2,components:1};case Ic:case Lc:return{byteLength:2,components:4};case qi:case Pc:case Vn:return{byteLength:4,components:1};case Sd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function i1(r,t,e,n,i,s,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new dt,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(L,T){return f?new OffscreenCanvas(L,T):da("canvas")}function g(L,T,V){let Q=1,nt=Bt(L);if((nt.width>V||nt.height>V)&&(Q=V/Math.max(nt.width,nt.height)),Q<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let j=Math.floor(Q*nt.width),Pt=Math.floor(Q*nt.height);d===void 0&&(d=y(j,Pt));let mt=T?y(j,Pt):d;return mt.width=j,mt.height=Pt,mt.getContext("2d").drawImage(L,0,0,j,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+j+"x"+Pt+")."),mt}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){r.generateMipmap(L)}function _(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(L,T,V,Q,nt=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let j=T;if(T===r.RED&&(V===r.FLOAT&&(j=r.R32F),V===r.HALF_FLOAT&&(j=r.R16F),V===r.UNSIGNED_BYTE&&(j=r.R8)),T===r.RED_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.R8UI),V===r.UNSIGNED_SHORT&&(j=r.R16UI),V===r.UNSIGNED_INT&&(j=r.R32UI),V===r.BYTE&&(j=r.R8I),V===r.SHORT&&(j=r.R16I),V===r.INT&&(j=r.R32I)),T===r.RG&&(V===r.FLOAT&&(j=r.RG32F),V===r.HALF_FLOAT&&(j=r.RG16F),V===r.UNSIGNED_BYTE&&(j=r.RG8)),T===r.RG_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RG8UI),V===r.UNSIGNED_SHORT&&(j=r.RG16UI),V===r.UNSIGNED_INT&&(j=r.RG32UI),V===r.BYTE&&(j=r.RG8I),V===r.SHORT&&(j=r.RG16I),V===r.INT&&(j=r.RG32I)),T===r.RGB_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RGB8UI),V===r.UNSIGNED_SHORT&&(j=r.RGB16UI),V===r.UNSIGNED_INT&&(j=r.RGB32UI),V===r.BYTE&&(j=r.RGB8I),V===r.SHORT&&(j=r.RGB16I),V===r.INT&&(j=r.RGB32I)),T===r.RGBA_INTEGER&&(V===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),V===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),V===r.UNSIGNED_INT&&(j=r.RGBA32UI),V===r.BYTE&&(j=r.RGBA8I),V===r.SHORT&&(j=r.RGBA16I),V===r.INT&&(j=r.RGBA32I)),T===r.RGB&&V===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),T===r.RGBA){let Pt=nt?Va:de.getTransfer(Q);V===r.FLOAT&&(j=r.RGBA32F),V===r.HALF_FLOAT&&(j=r.RGBA16F),V===r.UNSIGNED_BYTE&&(j=Pt===ve?r.SRGB8_ALPHA8:r.RGBA8),V===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),V===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function v(L,T){let V;return L?T===null||T===qi||T===Cs?V=r.DEPTH24_STENCIL8:T===Vn?V=r.DEPTH32F_STENCIL8:T===or&&(V=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===qi||T===Cs?V=r.DEPTH_COMPONENT24:T===Vn?V=r.DEPTH_COMPONENT32F:T===or&&(V=r.DEPTH_COMPONENT16),V}function b(L,T){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==yn&&L.minFilter!==Gn?Math.log2(Math.max(T.width,T.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?T.mipmaps.length:1}function S(L){let T=L.target;T.removeEventListener("dispose",S),E(T),T.isVideoTexture&&h.delete(T)}function A(L){let T=L.target;T.removeEventListener("dispose",A),M(T)}function E(L){let T=n.get(L);if(T.__webglInit===void 0)return;let V=L.source,Q=u.get(V);if(Q){let nt=Q[T.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&w(L),Object.keys(Q).length===0&&u.delete(V)}n.remove(L)}function w(L){let T=n.get(L);r.deleteTexture(T.__webglTexture);let V=L.source,Q=u.get(V);delete Q[T.__cacheKey],a.memory.textures--}function M(L){let T=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(T.__webglFramebuffer[Q]))for(let nt=0;nt<T.__webglFramebuffer[Q].length;nt++)r.deleteFramebuffer(T.__webglFramebuffer[Q][nt]);else r.deleteFramebuffer(T.__webglFramebuffer[Q]);T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer[Q])}else{if(Array.isArray(T.__webglFramebuffer))for(let Q=0;Q<T.__webglFramebuffer.length;Q++)r.deleteFramebuffer(T.__webglFramebuffer[Q]);else r.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&r.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&r.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let Q=0;Q<T.__webglColorRenderbuffer.length;Q++)T.__webglColorRenderbuffer[Q]&&r.deleteRenderbuffer(T.__webglColorRenderbuffer[Q]);T.__webglDepthRenderbuffer&&r.deleteRenderbuffer(T.__webglDepthRenderbuffer)}let V=L.textures;for(let Q=0,nt=V.length;Q<nt;Q++){let j=n.get(V[Q]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(V[Q])}n.remove(L)}let R=0;function k(){R=0}function I(){let L=R;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),R+=1,L}function D(L){let T=[];return T.push(L.wrapS),T.push(L.wrapT),T.push(L.wrapR||0),T.push(L.magFilter),T.push(L.minFilter),T.push(L.anisotropy),T.push(L.internalFormat),T.push(L.format),T.push(L.type),T.push(L.generateMipmaps),T.push(L.premultiplyAlpha),T.push(L.flipY),T.push(L.unpackAlignment),T.push(L.colorSpace),T.join()}function U(L,T){let V=n.get(L);if(L.isVideoTexture&&zt(L),L.isRenderTargetTexture===!1&&L.version>0&&V.__version!==L.version){let Q=L.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(V,L,T);return}}e.bindTexture(r.TEXTURE_2D,V.__webglTexture,r.TEXTURE0+T)}function N(L,T){let V=n.get(L);if(L.version>0&&V.__version!==L.version){Y(V,L,T);return}e.bindTexture(r.TEXTURE_2D_ARRAY,V.__webglTexture,r.TEXTURE0+T)}function W(L,T){let V=n.get(L);if(L.version>0&&V.__version!==L.version){Y(V,L,T);return}e.bindTexture(r.TEXTURE_3D,V.__webglTexture,r.TEXTURE0+T)}function F(L,T){let V=n.get(L);if(L.version>0&&V.__version!==L.version){et(V,L,T);return}e.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+T)}let J={[ii]:r.REPEAT,[Vi]:r.CLAMP_TO_EDGE,[dl]:r.MIRRORED_REPEAT},it={[yn]:r.NEAREST,[nf]:r.NEAREST_MIPMAP_NEAREST,[Rr]:r.NEAREST_MIPMAP_LINEAR,[Gn]:r.LINEAR,[vo]:r.LINEAR_MIPMAP_NEAREST,[Wi]:r.LINEAR_MIPMAP_LINEAR},at={[of]:r.NEVER,[ff]:r.ALWAYS,[lf]:r.LESS,[Ld]:r.LEQUAL,[cf]:r.EQUAL,[uf]:r.GEQUAL,[hf]:r.GREATER,[df]:r.NOTEQUAL};function ft(L,T){if(T.type===Vn&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Gn||T.magFilter===vo||T.magFilter===Rr||T.magFilter===Wi||T.minFilter===Gn||T.minFilter===vo||T.minFilter===Rr||T.minFilter===Wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,J[T.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,J[T.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,J[T.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,it[T.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,it[T.minFilter]),T.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,at[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===yn||T.minFilter!==Rr&&T.minFilter!==Wi||T.type===Vn&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){let V=t.get("EXT_texture_filter_anisotropic");r.texParameterf(L,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,i.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function It(L,T){let V=!1;L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",S));let Q=T.source,nt=u.get(Q);nt===void 0&&(nt={},u.set(Q,nt));let j=D(T);if(j!==L.__cacheKey){nt[j]===void 0&&(nt[j]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,V=!0),nt[j].usedTimes++;let Pt=nt[L.__cacheKey];Pt!==void 0&&(nt[L.__cacheKey].usedTimes--,Pt.usedTimes===0&&w(T)),L.__cacheKey=j,L.__webglTexture=nt[j].texture}return V}function Y(L,T,V){let Q=r.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(Q=r.TEXTURE_2D_ARRAY),T.isData3DTexture&&(Q=r.TEXTURE_3D);let nt=It(L,T),j=T.source;e.bindTexture(Q,L.__webglTexture,r.TEXTURE0+V);let Pt=n.get(j);if(j.version!==Pt.__version||nt===!0){e.activeTexture(r.TEXTURE0+V);let mt=de.getPrimaries(de.workingColorSpace),Tt=T.colorSpace===vi?null:de.getPrimaries(T.colorSpace),he=T.colorSpace===vi||mt===Tt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);let ot=g(T.image,!1,i.maxTextureSize);ot=xe(T,ot);let Rt=s.convert(T.format,T.colorSpace),Gt=s.convert(T.type),Vt=x(T.internalFormat,Rt,Gt,T.colorSpace,T.isVideoTexture);ft(Q,T);let Ct,ce=T.mipmaps,ne=T.isVideoTexture!==!0,we=Pt.__version===void 0||nt===!0,B=j.dataReady,yt=b(T,ot);if(T.isDepthTexture)Vt=v(T.format===Ps,T.type),we&&(ne?e.texStorage2D(r.TEXTURE_2D,1,Vt,ot.width,ot.height):e.texImage2D(r.TEXTURE_2D,0,Vt,ot.width,ot.height,0,Rt,Gt,null));else if(T.isDataTexture)if(ce.length>0){ne&&we&&e.texStorage2D(r.TEXTURE_2D,yt,Vt,ce[0].width,ce[0].height);for(let Z=0,tt=ce.length;Z<tt;Z++)Ct=ce[Z],ne?B&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,Ct.width,Ct.height,Rt,Gt,Ct.data):e.texImage2D(r.TEXTURE_2D,Z,Vt,Ct.width,Ct.height,0,Rt,Gt,Ct.data);T.generateMipmaps=!1}else ne?(we&&e.texStorage2D(r.TEXTURE_2D,yt,Vt,ot.width,ot.height),B&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ot.width,ot.height,Rt,Gt,ot.data)):e.texImage2D(r.TEXTURE_2D,0,Vt,ot.width,ot.height,0,Rt,Gt,ot.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ne&&we&&e.texStorage3D(r.TEXTURE_2D_ARRAY,yt,Vt,ce[0].width,ce[0].height,ot.depth);for(let Z=0,tt=ce.length;Z<tt;Z++)if(Ct=ce[Z],T.format!==Fn)if(Rt!==null)if(ne){if(B)if(T.layerUpdates.size>0){let wt=od(Ct.width,Ct.height,T.format,T.type);for(let vt of T.layerUpdates){let Jt=Ct.data.subarray(vt*wt/Ct.data.BYTES_PER_ELEMENT,(vt+1)*wt/Ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,vt,Ct.width,Ct.height,1,Rt,Jt)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,Ct.width,Ct.height,ot.depth,Rt,Ct.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Z,Vt,Ct.width,Ct.height,ot.depth,0,Ct.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ne?B&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,Ct.width,Ct.height,ot.depth,Rt,Gt,Ct.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Z,Vt,Ct.width,Ct.height,ot.depth,0,Rt,Gt,Ct.data)}else{ne&&we&&e.texStorage2D(r.TEXTURE_2D,yt,Vt,ce[0].width,ce[0].height);for(let Z=0,tt=ce.length;Z<tt;Z++)Ct=ce[Z],T.format!==Fn?Rt!==null?ne?B&&e.compressedTexSubImage2D(r.TEXTURE_2D,Z,0,0,Ct.width,Ct.height,Rt,Ct.data):e.compressedTexImage2D(r.TEXTURE_2D,Z,Vt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?B&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,Ct.width,Ct.height,Rt,Gt,Ct.data):e.texImage2D(r.TEXTURE_2D,Z,Vt,Ct.width,Ct.height,0,Rt,Gt,Ct.data)}else if(T.isDataArrayTexture)if(ne){if(we&&e.texStorage3D(r.TEXTURE_2D_ARRAY,yt,Vt,ot.width,ot.height,ot.depth),B)if(T.layerUpdates.size>0){let Z=od(ot.width,ot.height,T.format,T.type);for(let tt of T.layerUpdates){let wt=ot.data.subarray(tt*Z/ot.data.BYTES_PER_ELEMENT,(tt+1)*Z/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,tt,ot.width,ot.height,1,Rt,Gt,wt)}T.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,Rt,Gt,ot.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Vt,ot.width,ot.height,ot.depth,0,Rt,Gt,ot.data);else if(T.isData3DTexture)ne?(we&&e.texStorage3D(r.TEXTURE_3D,yt,Vt,ot.width,ot.height,ot.depth),B&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,Rt,Gt,ot.data)):e.texImage3D(r.TEXTURE_3D,0,Vt,ot.width,ot.height,ot.depth,0,Rt,Gt,ot.data);else if(T.isFramebufferTexture){if(we)if(ne)e.texStorage2D(r.TEXTURE_2D,yt,Vt,ot.width,ot.height);else{let Z=ot.width,tt=ot.height;for(let wt=0;wt<yt;wt++)e.texImage2D(r.TEXTURE_2D,wt,Vt,Z,tt,0,Rt,Gt,null),Z>>=1,tt>>=1}}else if(ce.length>0){if(ne&&we){let Z=Bt(ce[0]);e.texStorage2D(r.TEXTURE_2D,yt,Vt,Z.width,Z.height)}for(let Z=0,tt=ce.length;Z<tt;Z++)Ct=ce[Z],ne?B&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,Rt,Gt,Ct):e.texImage2D(r.TEXTURE_2D,Z,Vt,Rt,Gt,Ct);T.generateMipmaps=!1}else if(ne){if(we){let Z=Bt(ot);e.texStorage2D(r.TEXTURE_2D,yt,Vt,Z.width,Z.height)}B&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Rt,Gt,ot)}else e.texImage2D(r.TEXTURE_2D,0,Vt,Rt,Gt,ot);m(T)&&p(Q),Pt.__version=j.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function et(L,T,V){if(T.image.length!==6)return;let Q=It(L,T),nt=T.source;e.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+V);let j=n.get(nt);if(nt.version!==j.__version||Q===!0){e.activeTexture(r.TEXTURE0+V);let Pt=de.getPrimaries(de.workingColorSpace),mt=T.colorSpace===vi?null:de.getPrimaries(T.colorSpace),Tt=T.colorSpace===vi||Pt===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,T.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,T.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let he=T.isCompressedTexture||T.image[0].isCompressedTexture,ot=T.image[0]&&T.image[0].isDataTexture,Rt=[];for(let tt=0;tt<6;tt++)!he&&!ot?Rt[tt]=g(T.image[tt],!0,i.maxCubemapSize):Rt[tt]=ot?T.image[tt].image:T.image[tt],Rt[tt]=xe(T,Rt[tt]);let Gt=Rt[0],Vt=s.convert(T.format,T.colorSpace),Ct=s.convert(T.type),ce=x(T.internalFormat,Vt,Ct,T.colorSpace),ne=T.isVideoTexture!==!0,we=j.__version===void 0||Q===!0,B=nt.dataReady,yt=b(T,Gt);ft(r.TEXTURE_CUBE_MAP,T);let Z;if(he){ne&&we&&e.texStorage2D(r.TEXTURE_CUBE_MAP,yt,ce,Gt.width,Gt.height);for(let tt=0;tt<6;tt++){Z=Rt[tt].mipmaps;for(let wt=0;wt<Z.length;wt++){let vt=Z[wt];T.format!==Fn?Vt!==null?ne?B&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,0,0,vt.width,vt.height,Vt,vt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,ce,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ne?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,0,0,vt.width,vt.height,Vt,Ct,vt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,ce,vt.width,vt.height,0,Vt,Ct,vt.data)}}}else{if(Z=T.mipmaps,ne&&we){Z.length>0&&yt++;let tt=Bt(Rt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,yt,ce,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ot){ne?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Rt[tt].width,Rt[tt].height,Vt,Ct,Rt[tt].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ce,Rt[tt].width,Rt[tt].height,0,Vt,Ct,Rt[tt].data);for(let wt=0;wt<Z.length;wt++){let Jt=Z[wt].image[tt].image;ne?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,0,0,Jt.width,Jt.height,Vt,Ct,Jt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,ce,Jt.width,Jt.height,0,Vt,Ct,Jt.data)}}else{ne?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Vt,Ct,Rt[tt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,ce,Vt,Ct,Rt[tt]);for(let wt=0;wt<Z.length;wt++){let vt=Z[wt];ne?B&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,0,0,Vt,Ct,vt.image[tt]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,ce,Vt,Ct,vt.image[tt])}}}m(T)&&p(r.TEXTURE_CUBE_MAP),j.__version=nt.version,T.onUpdate&&T.onUpdate(T)}L.__version=T.version}function X(L,T,V,Q,nt,j){let Pt=s.convert(V.format,V.colorSpace),mt=s.convert(V.type),Tt=x(V.internalFormat,Pt,mt,V.colorSpace),he=n.get(T),ot=n.get(V);if(ot.__renderTarget=T,!he.__hasExternalTextures){let Rt=Math.max(1,T.width>>j),Gt=Math.max(1,T.height>>j);nt===r.TEXTURE_3D||nt===r.TEXTURE_2D_ARRAY?e.texImage3D(nt,j,Tt,Rt,Gt,T.depth,0,Pt,mt,null):e.texImage2D(nt,j,Tt,Rt,Gt,0,Pt,mt,null)}e.bindFramebuffer(r.FRAMEBUFFER,L),re(T)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Q,nt,ot.__webglTexture,0,ee(T)):(nt===r.TEXTURE_2D||nt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Q,nt,ot.__webglTexture,j),e.bindFramebuffer(r.FRAMEBUFFER,null)}function K(L,T,V){if(r.bindRenderbuffer(r.RENDERBUFFER,L),T.depthBuffer){let Q=T.depthTexture,nt=Q&&Q.isDepthTexture?Q.type:null,j=v(T.stencilBuffer,nt),Pt=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,mt=ee(T);re(T)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,mt,j,T.width,T.height):V?r.renderbufferStorageMultisample(r.RENDERBUFFER,mt,j,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,j,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Pt,r.RENDERBUFFER,L)}else{let Q=T.textures;for(let nt=0;nt<Q.length;nt++){let j=Q[nt],Pt=s.convert(j.format,j.colorSpace),mt=s.convert(j.type),Tt=x(j.internalFormat,Pt,mt,j.colorSpace),he=ee(T);V&&re(T)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,he,Tt,T.width,T.height):re(T)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,he,Tt,T.width,T.height):r.renderbufferStorage(r.RENDERBUFFER,Tt,T.width,T.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Mt(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(T.depthTexture);Q.__renderTarget=T,(!Q.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),U(T.depthTexture,0);let nt=Q.__webglTexture,j=ee(T);if(T.depthTexture.format===Ms)re(T)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,nt,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,nt,0);else if(T.depthTexture.format===Ps)re(T)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,nt,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function Et(L){let T=n.get(L),V=L.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==L.depthTexture){let Q=L.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),Q){let nt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,Q.removeEventListener("dispose",nt)};Q.addEventListener("dispose",nt),T.__depthDisposeCallback=nt}T.__boundDepthTexture=Q}if(L.depthTexture&&!T.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Mt(T.__webglFramebuffer,L)}else if(V){T.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer[Q]),T.__webglDepthbuffer[Q]===void 0)T.__webglDepthbuffer[Q]=r.createRenderbuffer(),K(T.__webglDepthbuffer[Q],L,!1);else{let nt=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=T.__webglDepthbuffer[Q];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,nt,r.RENDERBUFFER,j)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=r.createRenderbuffer(),K(T.__webglDepthbuffer,L,!1);else{let Q=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,nt=T.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,nt),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,nt)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ot(L,T,V){let Q=n.get(L);T!==void 0&&X(Q.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),V!==void 0&&Et(L)}function se(L){let T=L.texture,V=n.get(L),Q=n.get(T);L.addEventListener("dispose",A);let nt=L.textures,j=L.isWebGLCubeRenderTarget===!0,Pt=nt.length>1;if(Pt||(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=T.version,a.memory.textures++),j){V.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer[mt]=[];for(let Tt=0;Tt<T.mipmaps.length;Tt++)V.__webglFramebuffer[mt][Tt]=r.createFramebuffer()}else V.__webglFramebuffer[mt]=r.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){V.__webglFramebuffer=[];for(let mt=0;mt<T.mipmaps.length;mt++)V.__webglFramebuffer[mt]=r.createFramebuffer()}else V.__webglFramebuffer=r.createFramebuffer();if(Pt)for(let mt=0,Tt=nt.length;mt<Tt;mt++){let he=n.get(nt[mt]);he.__webglTexture===void 0&&(he.__webglTexture=r.createTexture(),a.memory.textures++)}if(L.samples>0&&re(L)===!1){V.__webglMultisampledFramebuffer=r.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let mt=0;mt<nt.length;mt++){let Tt=nt[mt];V.__webglColorRenderbuffer[mt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,V.__webglColorRenderbuffer[mt]);let he=s.convert(Tt.format,Tt.colorSpace),ot=s.convert(Tt.type),Rt=x(Tt.internalFormat,he,ot,Tt.colorSpace,L.isXRRenderTarget===!0),Gt=ee(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,Gt,Rt,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,V.__webglColorRenderbuffer[mt])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(V.__webglDepthRenderbuffer=r.createRenderbuffer(),K(V.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){e.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),ft(r.TEXTURE_CUBE_MAP,T);for(let mt=0;mt<6;mt++)if(T.mipmaps&&T.mipmaps.length>0)for(let Tt=0;Tt<T.mipmaps.length;Tt++)X(V.__webglFramebuffer[mt][Tt],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Tt);else X(V.__webglFramebuffer[mt],L,T,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(T)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let mt=0,Tt=nt.length;mt<Tt;mt++){let he=nt[mt],ot=n.get(he);e.bindTexture(r.TEXTURE_2D,ot.__webglTexture),ft(r.TEXTURE_2D,he),X(V.__webglFramebuffer,L,he,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,0),m(he)&&p(r.TEXTURE_2D)}e.unbindTexture()}else{let mt=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(mt=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(mt,Q.__webglTexture),ft(mt,T),T.mipmaps&&T.mipmaps.length>0)for(let Tt=0;Tt<T.mipmaps.length;Tt++)X(V.__webglFramebuffer[Tt],L,T,r.COLOR_ATTACHMENT0,mt,Tt);else X(V.__webglFramebuffer,L,T,r.COLOR_ATTACHMENT0,mt,0);m(T)&&p(mt),e.unbindTexture()}L.depthBuffer&&Et(L)}function At(L){let T=L.textures;for(let V=0,Q=T.length;V<Q;V++){let nt=T[V];if(m(nt)){let j=_(L),Pt=n.get(nt).__webglTexture;e.bindTexture(j,Pt),p(j),e.unbindTexture()}}}let Kt=[],O=[];function Ue(L){if(L.samples>0){if(re(L)===!1){let T=L.textures,V=L.width,Q=L.height,nt=r.COLOR_BUFFER_BIT,j=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Pt=n.get(L),mt=T.length>1;if(mt)for(let Tt=0;Tt<T.length;Tt++)e.bindFramebuffer(r.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,Pt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let Tt=0;Tt<T.length;Tt++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(nt|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(nt|=r.STENCIL_BUFFER_BIT)),mt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Pt.__webglColorRenderbuffer[Tt]);let he=n.get(T[Tt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,he,0)}r.blitFramebuffer(0,0,V,Q,0,0,V,Q,nt,r.NEAREST),l===!0&&(Kt.length=0,O.length=0,Kt.push(r.COLOR_ATTACHMENT0+Tt),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Kt.push(j),O.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,O)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Kt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),mt)for(let Tt=0;Tt<T.length;Tt++){e.bindFramebuffer(r.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,Pt.__webglColorRenderbuffer[Tt]);let he=n.get(T[Tt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,Pt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,he,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){let T=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[T])}}}function ee(L){return Math.min(i.maxSamples,L.samples)}function re(L){let T=n.get(L);return L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function zt(L){let T=a.render.frame;h.get(L)!==T&&(h.set(L,T),L.update())}function xe(L,T){let V=L.colorSpace,Q=L.format,nt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||V!==Fs&&V!==vi&&(de.getTransfer(V)===ve?(Q!==Fn||nt!==si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),T}function Bt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=k,this.setTexture2D=U,this.setTexture2DArray=N,this.setTexture3D=W,this.setTextureCube=F,this.rebindTextures=Ot,this.setupRenderTarget=se,this.updateRenderTargetMipmap=At,this.updateMultisampleRenderTarget=Ue,this.setupDepthRenderbuffer=Et,this.setupFrameBufferTexture=X,this.useMultisampledRTT=re}function s1(r,t){function e(n,i=vi){let s,a=de.getTransfer(i);if(n===si)return r.UNSIGNED_BYTE;if(n===Ic)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Lc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Sd)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===wd)return r.BYTE;if(n===Md)return r.SHORT;if(n===or)return r.UNSIGNED_SHORT;if(n===Pc)return r.INT;if(n===qi)return r.UNSIGNED_INT;if(n===Vn)return r.FLOAT;if(n===pr)return r.HALF_FLOAT;if(n===Ed)return r.ALPHA;if(n===Td)return r.RGB;if(n===Fn)return r.RGBA;if(n===Ad)return r.LUMINANCE;if(n===Rd)return r.LUMINANCE_ALPHA;if(n===Ms)return r.DEPTH_COMPONENT;if(n===Ps)return r.DEPTH_STENCIL;if(n===Dc)return r.RED;if(n===kc)return r.RED_INTEGER;if(n===Cd)return r.RG;if(n===Fc)return r.RG_INTEGER;if(n===Uc)return r.RGBA_INTEGER;if(n===ia||n===sa||n===ra||n===aa)if(a===ve)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ia)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===sa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ra)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===aa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ia)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===sa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ra)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===aa)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ul||n===fl||n===pl||n===ml)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ul)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ml)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gl||n===yl||n===xl)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===gl||n===yl)return a===ve?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===xl)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vl||n===_l||n===bl||n===wl||n===Ml||n===Sl||n===El||n===Tl||n===Al||n===Rl||n===Cl||n===Pl||n===Il||n===Ll)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===vl)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_l)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bl)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wl)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ml)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Sl)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===El)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Tl)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Al)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Rl)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Cl)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pl)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Il)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ll)return a===ve?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===oa||n===Dl||n===kl)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===oa)return a===ve?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Dl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Pd||n===Fl||n===Ul||n===Nl)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===oa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Fl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ul)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Nl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Cs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}var tc=class extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},pt=class extends Je{constructor(){super(),this.isGroup=!0,this.type="Group"}},r1={type:"move"},sr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let g of t.hand.values()){let m=e.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,y=.005;c.inputState.pinching&&u>f+y?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-y&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(r1)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new pt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},a1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,o1=`
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

}`,ec=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let i=new hn,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new je({vertexShader:a1,fragmentShader:o1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Nt(new Se(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},nc=class extends Ti{constructor(t,e){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,y=null,g=new ec,m=e.getContextAttributes(),p=null,_=null,x=[],v=[],b=new dt,S=null,A=new on;A.viewport=new ke;let E=new on;E.viewport=new ke;let w=[A,E],M=new tc,R=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let et=x[Y];return et===void 0&&(et=new sr,x[Y]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Y){let et=x[Y];return et===void 0&&(et=new sr,x[Y]=et),et.getGripSpace()},this.getHand=function(Y){let et=x[Y];return et===void 0&&(et=new sr,x[Y]=et),et.getHandSpace()};function I(Y){let et=v.indexOf(Y.inputSource);if(et===-1)return;let X=x[et];X!==void 0&&(X.update(Y.inputSource,Y.frame,c||a),X.dispatchEvent({type:Y.type,data:Y.inputSource}))}function D(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",U);for(let Y=0;Y<x.length;Y++){let et=v[Y];et!==null&&(v[Y]=null,x[Y].disconnect(et))}R=null,k=null,g.reset(),t.setRenderTarget(p),f=null,u=null,d=null,i=null,_=null,It.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return y},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",D),i.addEventListener("inputsourceschange",U),m.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(b),i.renderState.layers===void 0){let et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new ri(f.framebufferWidth,f.framebufferHeight,{format:Fn,type:si,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let et=null,X=null,K=null;m.depth&&(K=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?Ps:Ms,X=m.stencil?Cs:qi);let Mt={colorFormat:e.RGBA8,depthFormat:K,scaleFactor:s};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(Mt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new ri(u.textureWidth,u.textureHeight,{format:Fn,type:si,depthTexture:new _a(u.textureWidth,u.textureHeight,X,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),It.setContext(i),It.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function U(Y){for(let et=0;et<Y.removed.length;et++){let X=Y.removed[et],K=v.indexOf(X);K>=0&&(v[K]=null,x[K].disconnect(X))}for(let et=0;et<Y.added.length;et++){let X=Y.added[et],K=v.indexOf(X);if(K===-1){for(let Et=0;Et<x.length;Et++)if(Et>=v.length){v.push(X),K=Et;break}else if(v[Et]===null){v[Et]=X,K=Et;break}if(K===-1)break}let Mt=x[K];Mt&&Mt.connect(X)}}let N=new P,W=new P;function F(Y,et,X){N.setFromMatrixPosition(et.matrixWorld),W.setFromMatrixPosition(X.matrixWorld);let K=N.distanceTo(W),Mt=et.projectionMatrix.elements,Et=X.projectionMatrix.elements,Ot=Mt[14]/(Mt[10]-1),se=Mt[14]/(Mt[10]+1),At=(Mt[9]+1)/Mt[5],Kt=(Mt[9]-1)/Mt[5],O=(Mt[8]-1)/Mt[0],Ue=(Et[8]+1)/Et[0],ee=Ot*O,re=Ot*Ue,zt=K/(-O+Ue),xe=zt*-O;if(et.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(xe),Y.translateZ(zt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Mt[10]===-1)Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{let Bt=Ot+zt,L=se+zt,T=ee-xe,V=re+(K-xe),Q=At*se/L*Bt,nt=Kt*se/L*Bt;Y.projectionMatrix.makePerspective(T,V,Q,nt,Bt,L),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function J(Y,et){et===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(et.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let et=Y.near,X=Y.far;g.texture!==null&&(g.depthNear>0&&(et=g.depthNear),g.depthFar>0&&(X=g.depthFar)),M.near=E.near=A.near=et,M.far=E.far=A.far=X,(R!==M.near||k!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,k=M.far),A.layers.mask=Y.layers.mask|2,E.layers.mask=Y.layers.mask|4,M.layers.mask=A.layers.mask|E.layers.mask;let K=Y.parent,Mt=M.cameras;J(M,K);for(let Et=0;Et<Mt.length;Et++)J(Mt[Et],K);Mt.length===2?F(M,A,E):M.projectionMatrix.copy(A.projectionMatrix),it(Y,M,K)};function it(Y,et,X){X===null?Y.matrix.copy(et.matrixWorld):(Y.matrix.copy(X.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(et.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=zl*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let at=null;function ft(Y,et){if(h=et.getViewerPose(c||a),y=et,h!==null){let X=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let K=!1;X.length!==M.cameras.length&&(M.cameras.length=0,K=!0);for(let Et=0;Et<X.length;Et++){let Ot=X[Et],se=null;if(f!==null)se=f.getViewport(Ot);else{let Kt=d.getViewSubImage(u,Ot);se=Kt.viewport,Et===0&&(t.setRenderTargetTextures(_,Kt.colorTexture,u.ignoreDepthValues?void 0:Kt.depthStencilTexture),t.setRenderTarget(_))}let At=w[Et];At===void 0&&(At=new on,At.layers.enable(Et),At.viewport=new ke,w[Et]=At),At.matrix.fromArray(Ot.transform.matrix),At.matrix.decompose(At.position,At.quaternion,At.scale),At.projectionMatrix.fromArray(Ot.projectionMatrix),At.projectionMatrixInverse.copy(At.projectionMatrix).invert(),At.viewport.set(se.x,se.y,se.width,se.height),Et===0&&(M.matrix.copy(At.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),K===!0&&M.cameras.push(At)}let Mt=i.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")){let Et=d.getDepthInformation(X[0]);Et&&Et.isValid&&Et.texture&&g.init(t,Et,i.renderState)}}for(let X=0;X<x.length;X++){let K=v[X],Mt=x[X];K!==null&&Mt!==void 0&&Mt.update(K,et,c||a)}at&&at(Y,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),y=null}let It=new Ud;It.setAnimationLoop(ft),this.setAnimationLoop=function(Y){at=Y},this.dispose=function(){}}},Oi=new ln,l1=new te;function c1(r,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Fd(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,_,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),y(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,_,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let _=t.get(p),x=_.envMap,v=_.envMapRotation;x&&(m.envMap.value=x,Oi.copy(v),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),m.envMapRotation.value.setFromMatrix4(l1.makeRotationFromEuler(Oi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,_,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function y(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){let _=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function h1(r,t,e,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,x){let v=x.program;n.uniformBlockBinding(_,v)}function c(_,x){let v=i[_.id];v===void 0&&(y(_),v=h(_),i[_.id]=v,_.addEventListener("dispose",m));let b=x.program;n.updateUBOMapping(_,b);let S=t.render.frame;s[_.id]!==S&&(u(_),s[_.id]=S)}function h(_){let x=d();_.__bindingPointIndex=x;let v=r.createBuffer(),b=_.__size,S=_.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,b,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){let x=i[_.id],v=_.uniforms,b=_.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let S=0,A=v.length;S<A;S++){let E=Array.isArray(v[S])?v[S]:[v[S]];for(let w=0,M=E.length;w<M;w++){let R=E[w];if(f(R,S,w,b)===!0){let k=R.__offset,I=Array.isArray(R.value)?R.value:[R.value],D=0;for(let U=0;U<I.length;U++){let N=I[U],W=g(N);typeof N=="number"||typeof N=="boolean"?(R.__data[0]=N,r.bufferSubData(r.UNIFORM_BUFFER,k+D,R.__data)):N.isMatrix3?(R.__data[0]=N.elements[0],R.__data[1]=N.elements[1],R.__data[2]=N.elements[2],R.__data[3]=0,R.__data[4]=N.elements[3],R.__data[5]=N.elements[4],R.__data[6]=N.elements[5],R.__data[7]=0,R.__data[8]=N.elements[6],R.__data[9]=N.elements[7],R.__data[10]=N.elements[8],R.__data[11]=0):(N.toArray(R.__data,D),D+=W.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,R.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(_,x,v,b){let S=_.value,A=x+"_"+v;if(b[A]===void 0)return typeof S=="number"||typeof S=="boolean"?b[A]=S:b[A]=S.clone(),!0;{let E=b[A];if(typeof S=="number"||typeof S=="boolean"){if(E!==S)return b[A]=S,!0}else if(E.equals(S)===!1)return E.copy(S),!0}return!1}function y(_){let x=_.uniforms,v=0,b=16;for(let A=0,E=x.length;A<E;A++){let w=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,R=w.length;M<R;M++){let k=w[M],I=Array.isArray(k.value)?k.value:[k.value];for(let D=0,U=I.length;D<U;D++){let N=I[D],W=g(N),F=v%b,J=F%W.boundary,it=F+J;v+=J,it!==0&&b-it<W.storage&&(v+=b-it),k.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=v,v+=W.storage}}}let S=v%b;return S>0&&(v+=b-S),_.__size=v,_.__cache={},this}function g(_){let x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function m(_){let x=_.target;x.removeEventListener("dispose",m);let v=a.indexOf(x.__bindingPointIndex);a.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(let _ in i)r.deleteBuffer(i[_]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}var ba=class{constructor(t={}){let{canvas:e=mf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;let y=new Uint32Array(4),g=new Int32Array(4),m=null,p=null,_=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=He,this.toneMapping=Mi,this.toneMappingExposure=1;let v=this,b=!1,S=0,A=0,E=null,w=-1,M=null,R=new ke,k=new ke,I=null,D=new ut(0),U=0,N=e.width,W=e.height,F=1,J=null,it=null,at=new ke(0,0,N,W),ft=new ke(0,0,N,W),It=!1,Y=new cr,et=!1,X=!1,K=new te,Mt=new te,Et=new P,Ot=new ke,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},At=!1;function Kt(){return E===null?F:1}let O=n;function Ue(C,z){return e.getContext(C,z)}try{let C={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ac}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",wt,!1),e.addEventListener("webglcontextcreationerror",vt,!1),O===null){let z="webgl2";if(O=Ue(z,C),O===null)throw Ue(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ee,re,zt,xe,Bt,L,T,V,Q,nt,j,Pt,mt,Tt,he,ot,Rt,Gt,Vt,Ct,ce,ne,we,B;function yt(){ee=new Tm(O),ee.init(),ne=new s1(O,ee),re=new _m(O,ee,t,ne),zt=new e1(O,ee),re.reverseDepthBuffer&&u&&zt.buffers.depth.setReversed(!0),xe=new Cm(O),Bt=new Gg,L=new i1(O,ee,zt,Bt,re,ne,xe),T=new wm(v),V=new Em(v),Q=new Uf(O),we=new xm(O,Q),nt=new Am(O,Q,xe,we),j=new Im(O,nt,Q,xe),Vt=new Pm(O,re,L),ot=new bm(Bt),Pt=new Hg(v,T,V,ee,re,we,ot),mt=new c1(v,Bt),Tt=new Wg,he=new Kg(ee),Gt=new ym(v,T,V,zt,j,f,l),Rt=new Qg(v,j,re),B=new h1(O,xe,re,zt),Ct=new vm(O,ee,xe),ce=new Rm(O,ee,xe),xe.programs=Pt.programs,v.capabilities=re,v.extensions=ee,v.properties=Bt,v.renderLists=Tt,v.shadowMap=Rt,v.state=zt,v.info=xe}yt();let Z=new nc(v,O);this.xr=Z,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let C=ee.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=ee.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(C){C!==void 0&&(F=C,this.setSize(N,W,!1))},this.getSize=function(C){return C.set(N,W)},this.setSize=function(C,z,q=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=C,W=z,e.width=Math.floor(C*F),e.height=Math.floor(z*F),q===!0&&(e.style.width=C+"px",e.style.height=z+"px"),this.setViewport(0,0,C,z)},this.getDrawingBufferSize=function(C){return C.set(N*F,W*F).floor()},this.setDrawingBufferSize=function(C,z,q){N=C,W=z,F=q,e.width=Math.floor(C*q),e.height=Math.floor(z*q),this.setViewport(0,0,C,z)},this.getCurrentViewport=function(C){return C.copy(R)},this.getViewport=function(C){return C.copy(at)},this.setViewport=function(C,z,q,$){C.isVector4?at.set(C.x,C.y,C.z,C.w):at.set(C,z,q,$),zt.viewport(R.copy(at).multiplyScalar(F).round())},this.getScissor=function(C){return C.copy(ft)},this.setScissor=function(C,z,q,$){C.isVector4?ft.set(C.x,C.y,C.z,C.w):ft.set(C,z,q,$),zt.scissor(k.copy(ft).multiplyScalar(F).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(C){zt.setScissorTest(It=C)},this.setOpaqueSort=function(C){J=C},this.setTransparentSort=function(C){it=C},this.getClearColor=function(C){return C.copy(Gt.getClearColor())},this.setClearColor=function(){Gt.setClearColor.apply(Gt,arguments)},this.getClearAlpha=function(){return Gt.getClearAlpha()},this.setClearAlpha=function(){Gt.setClearAlpha.apply(Gt,arguments)},this.clear=function(C=!0,z=!0,q=!0){let $=0;if(C){let H=!1;if(E!==null){let lt=E.texture.format;H=lt===Uc||lt===Fc||lt===kc}if(H){let lt=E.texture.type,_t=lt===si||lt===qi||lt===or||lt===Cs||lt===Ic||lt===Lc,Lt=Gt.getClearColor(),Dt=Gt.getClearAlpha(),$t=Lt.r,jt=Lt.g,kt=Lt.b;_t?(y[0]=$t,y[1]=jt,y[2]=kt,y[3]=Dt,O.clearBufferuiv(O.COLOR,0,y)):(g[0]=$t,g[1]=jt,g[2]=kt,g[3]=Dt,O.clearBufferiv(O.COLOR,0,g))}else $|=O.COLOR_BUFFER_BIT}z&&($|=O.DEPTH_BUFFER_BIT),q&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",wt,!1),e.removeEventListener("webglcontextcreationerror",vt,!1),Tt.dispose(),he.dispose(),Bt.dispose(),T.dispose(),V.dispose(),j.dispose(),we.dispose(),B.dispose(),Pt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Kc),Z.removeEventListener("sessionend",Jc),Ii.stop()};function tt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let C=xe.autoReset,z=Rt.enabled,q=Rt.autoUpdate,$=Rt.needsUpdate,H=Rt.type;yt(),xe.autoReset=C,Rt.enabled=z,Rt.autoUpdate=q,Rt.needsUpdate=$,Rt.type=H}function vt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Jt(C){let z=C.target;z.removeEventListener("dispose",Jt),Le(z)}function Le(C){Qe(C),Bt.remove(C)}function Qe(C){let z=Bt.get(C).programs;z!==void 0&&(z.forEach(function(q){Pt.releaseProgram(q)}),C.isShaderMaterial&&Pt.releaseShaderCache(C))}this.renderBufferDirect=function(C,z,q,$,H,lt){z===null&&(z=se);let _t=H.isMesh&&H.matrixWorld.determinant()<0,Lt=uu(C,z,q,$,H);zt.setMaterial($,_t);let Dt=q.index,$t=1;if($.wireframe===!0){if(Dt=nt.getWireframeAttribute(q),Dt===void 0)return;$t=2}let jt=q.drawRange,kt=q.attributes.position,ue=jt.start*$t,Me=(jt.start+jt.count)*$t;lt!==null&&(ue=Math.max(ue,lt.start*$t),Me=Math.min(Me,(lt.start+lt.count)*$t)),Dt!==null?(ue=Math.max(ue,0),Me=Math.min(Me,Dt.count)):kt!=null&&(ue=Math.max(ue,0),Me=Math.min(Me,kt.count));let Ee=Me-ue;if(Ee<0||Ee===1/0)return;we.setup(H,$,Lt,q,Dt);let cn,pe=Ct;if(Dt!==null&&(cn=Q.get(Dt),pe=ce,pe.setIndex(cn)),H.isMesh)$.wireframe===!0?(zt.setLineWidth($.wireframeLinewidth*Kt()),pe.setMode(O.LINES)):pe.setMode(O.TRIANGLES);else if(H.isLine){let Ut=$.linewidth;Ut===void 0&&(Ut=1),zt.setLineWidth(Ut*Kt()),H.isLineSegments?pe.setMode(O.LINES):H.isLineLoop?pe.setMode(O.LINE_LOOP):pe.setMode(O.LINE_STRIP)}else H.isPoints?pe.setMode(O.POINTS):H.isSprite&&pe.setMode(O.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)pe.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(ee.get("WEBGL_multi_draw"))pe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{let Ut=H._multiDrawStarts,$n=H._multiDrawCounts,me=H._multiDrawCount,Rn=Dt?Q.get(Dt).bytesPerElement:1,ji=Bt.get($).currentProgram.getUniforms();for(let fn=0;fn<me;fn++)ji.setValue(O,"_gl_DrawID",fn),pe.render(Ut[fn]/Rn,$n[fn])}else if(H.isInstancedMesh)pe.renderInstances(ue,Ee,H.count);else if(q.isInstancedBufferGeometry){let Ut=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,$n=Math.min(q.instanceCount,Ut);pe.renderInstances(ue,Ee,$n)}else pe.render(ue,Ee)};function ge(C,z,q){C.transparent===!0&&C.side===ye&&C.forceSinglePass===!1?(C.side=nn,C.needsUpdate=!0,gr(C,z,q),C.side=Ei,C.needsUpdate=!0,gr(C,z,q),C.side=ye):gr(C,z,q)}this.compile=function(C,z,q=null){q===null&&(q=C),p=he.get(q),p.init(z),x.push(p),q.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),C!==q&&C.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();let $=new Set;return C.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;let lt=H.material;if(lt)if(Array.isArray(lt))for(let _t=0;_t<lt.length;_t++){let Lt=lt[_t];ge(Lt,q,H),$.add(Lt)}else ge(lt,q,H),$.add(lt)}),x.pop(),p=null,$},this.compileAsync=function(C,z,q=null){let $=this.compile(C,z,q);return new Promise(H=>{function lt(){if($.forEach(function(_t){Bt.get(_t).currentProgram.isReady()&&$.delete(_t)}),$.size===0){H(C);return}setTimeout(lt,10)}ee.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let An=null;function qn(C){An&&An(C)}function Kc(){Ii.stop()}function Jc(){Ii.start()}let Ii=new Ud;Ii.setAnimationLoop(qn),typeof self<"u"&&Ii.setContext(self),this.setAnimationLoop=function(C){An=C,Z.setAnimationLoop(C),C===null?Ii.stop():Ii.start()},Z.addEventListener("sessionstart",Kc),Z.addEventListener("sessionend",Jc),this.render=function(C,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(z),z=Z.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,z,E),p=he.get(C,x.length),p.init(z),x.push(p),Mt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Y.setFromProjectionMatrix(Mt),X=this.localClippingEnabled,et=ot.init(this.clippingPlanes,X),m=Tt.get(C,_.length),m.init(),_.push(m),Z.enabled===!0&&Z.isPresenting===!0){let lt=v.xr.getDepthSensingMesh();lt!==null&&ho(lt,z,-1/0,v.sortObjects)}ho(C,z,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(J,it),At=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,At&&Gt.addToRenderList(m,C),this.info.render.frame++,et===!0&&ot.beginShadows();let q=p.state.shadowsArray;Rt.render(q,C,z),et===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();let $=m.opaque,H=m.transmissive;if(p.setupLights(),z.isArrayCamera){let lt=z.cameras;if(H.length>0)for(let _t=0,Lt=lt.length;_t<Lt;_t++){let Dt=lt[_t];Qc($,H,C,Dt)}At&&Gt.render(C);for(let _t=0,Lt=lt.length;_t<Lt;_t++){let Dt=lt[_t];jc(m,C,Dt,Dt.viewport)}}else H.length>0&&Qc($,H,C,z),At&&Gt.render(C),jc(m,C,z);E!==null&&(L.updateMultisampleRenderTarget(E),L.updateRenderTargetMipmap(E)),C.isScene===!0&&C.onAfterRender(v,C,z),we.resetDefaultState(),w=-1,M=null,x.pop(),x.length>0?(p=x[x.length-1],et===!0&&ot.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function ho(C,z,q,$){if(C.visible===!1)return;if(C.layers.test(z.layers)){if(C.isGroup)q=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(z);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Y.intersectsSprite(C)){$&&Ot.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Mt);let _t=j.update(C),Lt=C.material;Lt.visible&&m.push(C,_t,Lt,q,Ot.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Y.intersectsObject(C))){let _t=j.update(C),Lt=C.material;if($&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ot.copy(C.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Ot.copy(_t.boundingSphere.center)),Ot.applyMatrix4(C.matrixWorld).applyMatrix4(Mt)),Array.isArray(Lt)){let Dt=_t.groups;for(let $t=0,jt=Dt.length;$t<jt;$t++){let kt=Dt[$t],ue=Lt[kt.materialIndex];ue&&ue.visible&&m.push(C,_t,ue,q,Ot.z,kt)}}else Lt.visible&&m.push(C,_t,Lt,q,Ot.z,null)}}let lt=C.children;for(let _t=0,Lt=lt.length;_t<Lt;_t++)ho(lt[_t],z,q,$)}function jc(C,z,q,$){let H=C.opaque,lt=C.transmissive,_t=C.transparent;p.setupLightsView(q),et===!0&&ot.setGlobalState(v.clippingPlanes,q),$&&zt.viewport(R.copy($)),H.length>0&&mr(H,z,q),lt.length>0&&mr(lt,z,q),_t.length>0&&mr(_t,z,q),zt.buffers.depth.setTest(!0),zt.buffers.depth.setMask(!0),zt.buffers.color.setMask(!0),zt.setPolygonOffset(!1)}function Qc(C,z,q,$){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new ri(1,1,{generateMipmaps:!0,type:ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float")?pr:si,minFilter:Wi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));let lt=p.state.transmissionRenderTarget[$.id],_t=$.viewport||R;lt.setSize(_t.z,_t.w);let Lt=v.getRenderTarget();v.setRenderTarget(lt),v.getClearColor(D),U=v.getClearAlpha(),U<1&&v.setClearColor(16777215,.5),v.clear(),At&&Gt.render(q);let Dt=v.toneMapping;v.toneMapping=Mi;let $t=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),et===!0&&ot.setGlobalState(v.clippingPlanes,$),mr(C,q,$),L.updateMultisampleRenderTarget(lt),L.updateRenderTargetMipmap(lt),ee.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let kt=0,ue=z.length;kt<ue;kt++){let Me=z[kt],Ee=Me.object,cn=Me.geometry,pe=Me.material,Ut=Me.group;if(pe.side===ye&&Ee.layers.test($.layers)){let $n=pe.side;pe.side=nn,pe.needsUpdate=!0,th(Ee,q,$,cn,pe,Ut),pe.side=$n,pe.needsUpdate=!0,jt=!0}}jt===!0&&(L.updateMultisampleRenderTarget(lt),L.updateRenderTargetMipmap(lt))}v.setRenderTarget(Lt),v.setClearColor(D,U),$t!==void 0&&($.viewport=$t),v.toneMapping=Dt}function mr(C,z,q){let $=z.isScene===!0?z.overrideMaterial:null;for(let H=0,lt=C.length;H<lt;H++){let _t=C[H],Lt=_t.object,Dt=_t.geometry,$t=$===null?_t.material:$,jt=_t.group;Lt.layers.test(q.layers)&&th(Lt,z,q,Dt,$t,jt)}}function th(C,z,q,$,H,lt){C.onBeforeRender(v,z,q,$,H,lt),C.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),H.onBeforeRender(v,z,q,$,C,lt),H.transparent===!0&&H.side===ye&&H.forceSinglePass===!1?(H.side=nn,H.needsUpdate=!0,v.renderBufferDirect(q,z,$,H,C,lt),H.side=Ei,H.needsUpdate=!0,v.renderBufferDirect(q,z,$,H,C,lt),H.side=ye):v.renderBufferDirect(q,z,$,H,C,lt),C.onAfterRender(v,z,q,$,H,lt)}function gr(C,z,q){z.isScene!==!0&&(z=se);let $=Bt.get(C),H=p.state.lights,lt=p.state.shadowsArray,_t=H.state.version,Lt=Pt.getParameters(C,H.state,lt,z,q),Dt=Pt.getProgramCacheKey(Lt),$t=$.programs;$.environment=C.isMeshStandardMaterial?z.environment:null,$.fog=z.fog,$.envMap=(C.isMeshStandardMaterial?V:T).get(C.envMap||$.environment),$.envMapRotation=$.environment!==null&&C.envMap===null?z.environmentRotation:C.envMapRotation,$t===void 0&&(C.addEventListener("dispose",Jt),$t=new Map,$.programs=$t);let jt=$t.get(Dt);if(jt!==void 0){if($.currentProgram===jt&&$.lightsStateVersion===_t)return nh(C,Lt),jt}else Lt.uniforms=Pt.getUniforms(C),C.onBeforeCompile(Lt,v),jt=Pt.acquireProgram(Lt,Dt),$t.set(Dt,jt),$.uniforms=Lt.uniforms;let kt=$.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(kt.clippingPlanes=ot.uniform),nh(C,Lt),$.needsLights=pu(C),$.lightsStateVersion=_t,$.needsLights&&(kt.ambientLightColor.value=H.state.ambient,kt.lightProbe.value=H.state.probe,kt.directionalLights.value=H.state.directional,kt.directionalLightShadows.value=H.state.directionalShadow,kt.spotLights.value=H.state.spot,kt.spotLightShadows.value=H.state.spotShadow,kt.rectAreaLights.value=H.state.rectArea,kt.ltc_1.value=H.state.rectAreaLTC1,kt.ltc_2.value=H.state.rectAreaLTC2,kt.pointLights.value=H.state.point,kt.pointLightShadows.value=H.state.pointShadow,kt.hemisphereLights.value=H.state.hemi,kt.directionalShadowMap.value=H.state.directionalShadowMap,kt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,kt.spotShadowMap.value=H.state.spotShadowMap,kt.spotLightMatrix.value=H.state.spotLightMatrix,kt.spotLightMap.value=H.state.spotLightMap,kt.pointShadowMap.value=H.state.pointShadowMap,kt.pointShadowMatrix.value=H.state.pointShadowMatrix),$.currentProgram=jt,$.uniformsList=null,jt}function eh(C){if(C.uniformsList===null){let z=C.currentProgram.getUniforms();C.uniformsList=Es.seqWithValue(z.seq,C.uniforms)}return C.uniformsList}function nh(C,z){let q=Bt.get(C);q.outputColorSpace=z.outputColorSpace,q.batching=z.batching,q.batchingColor=z.batchingColor,q.instancing=z.instancing,q.instancingColor=z.instancingColor,q.instancingMorph=z.instancingMorph,q.skinning=z.skinning,q.morphTargets=z.morphTargets,q.morphNormals=z.morphNormals,q.morphColors=z.morphColors,q.morphTargetsCount=z.morphTargetsCount,q.numClippingPlanes=z.numClippingPlanes,q.numIntersection=z.numClipIntersection,q.vertexAlphas=z.vertexAlphas,q.vertexTangents=z.vertexTangents,q.toneMapping=z.toneMapping}function uu(C,z,q,$,H){z.isScene!==!0&&(z=se),L.resetTextureUnits();let lt=z.fog,_t=$.isMeshStandardMaterial?z.environment:null,Lt=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Fs,Dt=($.isMeshStandardMaterial?V:T).get($.envMap||_t),$t=$.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,jt=!!q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),kt=!!q.morphAttributes.position,ue=!!q.morphAttributes.normal,Me=!!q.morphAttributes.color,Ee=Mi;$.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Ee=v.toneMapping);let cn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,pe=cn!==void 0?cn.length:0,Ut=Bt.get($),$n=p.state.lights;if(et===!0&&(X===!0||C!==M)){let _n=C===M&&$.id===w;ot.setState($,C,_n)}let me=!1;$.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==$n.state.version||Ut.outputColorSpace!==Lt||H.isBatchedMesh&&Ut.batching===!1||!H.isBatchedMesh&&Ut.batching===!0||H.isBatchedMesh&&Ut.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ut.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ut.instancing===!1||!H.isInstancedMesh&&Ut.instancing===!0||H.isSkinnedMesh&&Ut.skinning===!1||!H.isSkinnedMesh&&Ut.skinning===!0||H.isInstancedMesh&&Ut.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ut.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ut.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ut.instancingMorph===!1&&H.morphTexture!==null||Ut.envMap!==Dt||$.fog===!0&&Ut.fog!==lt||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==ot.numPlanes||Ut.numIntersection!==ot.numIntersection)||Ut.vertexAlphas!==$t||Ut.vertexTangents!==jt||Ut.morphTargets!==kt||Ut.morphNormals!==ue||Ut.morphColors!==Me||Ut.toneMapping!==Ee||Ut.morphTargetsCount!==pe)&&(me=!0):(me=!0,Ut.__version=$.version);let Rn=Ut.currentProgram;me===!0&&(Rn=gr($,z,H));let ji=!1,fn=!1,Hs=!1,Te=Rn.getUniforms(),On=Ut.uniforms;if(zt.useProgram(Rn.program)&&(ji=!0,fn=!0,Hs=!0),$.id!==w&&(w=$.id,fn=!0),ji||M!==C){zt.buffers.depth.getReversed()?(K.copy(C.projectionMatrix),yf(K),xf(K),Te.setValue(O,"projectionMatrix",K)):Te.setValue(O,"projectionMatrix",C.projectionMatrix),Te.setValue(O,"viewMatrix",C.matrixWorldInverse);let di=Te.map.cameraPosition;di!==void 0&&di.setValue(O,Et.setFromMatrixPosition(C.matrixWorld)),re.logarithmicDepthBuffer&&Te.setValue(O,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Te.setValue(O,"isOrthographic",C.isOrthographicCamera===!0),M!==C&&(M=C,fn=!0,Hs=!0)}if(H.isSkinnedMesh){Te.setOptional(O,H,"bindMatrix"),Te.setOptional(O,H,"bindMatrixInverse");let _n=H.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),Te.setValue(O,"boneTexture",_n.boneTexture,L))}H.isBatchedMesh&&(Te.setOptional(O,H,"batchingTexture"),Te.setValue(O,"batchingTexture",H._matricesTexture,L),Te.setOptional(O,H,"batchingIdTexture"),Te.setValue(O,"batchingIdTexture",H._indirectTexture,L),Te.setOptional(O,H,"batchingColorTexture"),H._colorsTexture!==null&&Te.setValue(O,"batchingColorTexture",H._colorsTexture,L));let Gs=q.morphAttributes;if((Gs.position!==void 0||Gs.normal!==void 0||Gs.color!==void 0)&&Vt.update(H,q,Rn),(fn||Ut.receiveShadow!==H.receiveShadow)&&(Ut.receiveShadow=H.receiveShadow,Te.setValue(O,"receiveShadow",H.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(On.envMap.value=Dt,On.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&z.environment!==null&&(On.envMapIntensity.value=z.environmentIntensity),fn&&(Te.setValue(O,"toneMappingExposure",v.toneMappingExposure),Ut.needsLights&&fu(On,Hs),lt&&$.fog===!0&&mt.refreshFogUniforms(On,lt),mt.refreshMaterialUniforms(On,$,F,W,p.state.transmissionRenderTarget[C.id]),Es.upload(O,eh(Ut),On,L)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Es.upload(O,eh(Ut),On,L),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Te.setValue(O,"center",H.center),Te.setValue(O,"modelViewMatrix",H.modelViewMatrix),Te.setValue(O,"normalMatrix",H.normalMatrix),Te.setValue(O,"modelMatrix",H.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){let _n=$.uniformsGroups;for(let di=0,ui=_n.length;di<ui;di++){let ih=_n[di];B.update(ih,Rn),B.bind(ih,Rn)}}return Rn}function fu(C,z){C.ambientLightColor.needsUpdate=z,C.lightProbe.needsUpdate=z,C.directionalLights.needsUpdate=z,C.directionalLightShadows.needsUpdate=z,C.pointLights.needsUpdate=z,C.pointLightShadows.needsUpdate=z,C.spotLights.needsUpdate=z,C.spotLightShadows.needsUpdate=z,C.rectAreaLights.needsUpdate=z,C.hemisphereLights.needsUpdate=z}function pu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(C,z,q){Bt.get(C.texture).__webglTexture=z,Bt.get(C.depthTexture).__webglTexture=q;let $=Bt.get(C);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=q===void 0,$.__autoAllocateDepthBuffer||ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,z){let q=Bt.get(C);q.__webglFramebuffer=z,q.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(C,z=0,q=0){E=C,S=z,A=q;let $=!0,H=null,lt=!1,_t=!1;if(C){let Dt=Bt.get(C);if(Dt.__useDefaultFramebuffer!==void 0)zt.bindFramebuffer(O.FRAMEBUFFER,null),$=!1;else if(Dt.__webglFramebuffer===void 0)L.setupRenderTarget(C);else if(Dt.__hasExternalTextures)L.rebindTextures(C,Bt.get(C.texture).__webglTexture,Bt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){let kt=C.depthTexture;if(Dt.__boundDepthTexture!==kt){if(kt!==null&&Bt.has(kt)&&(C.width!==kt.image.width||C.height!==kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(C)}}let $t=C.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(_t=!0);let jt=Bt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(jt[z])?H=jt[z][q]:H=jt[z],lt=!0):C.samples>0&&L.useMultisampledRTT(C)===!1?H=Bt.get(C).__webglMultisampledFramebuffer:Array.isArray(jt)?H=jt[q]:H=jt,R.copy(C.viewport),k.copy(C.scissor),I=C.scissorTest}else R.copy(at).multiplyScalar(F).floor(),k.copy(ft).multiplyScalar(F).floor(),I=It;if(zt.bindFramebuffer(O.FRAMEBUFFER,H)&&$&&zt.drawBuffers(C,H),zt.viewport(R),zt.scissor(k),zt.setScissorTest(I),lt){let Dt=Bt.get(C.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+z,Dt.__webglTexture,q)}else if(_t){let Dt=Bt.get(C.texture),$t=z||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Dt.__webglTexture,q||0,$t)}w=-1},this.readRenderTargetPixels=function(C,z,q,$,H,lt,_t){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Lt=Bt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_t!==void 0&&(Lt=Lt[_t]),Lt){zt.bindFramebuffer(O.FRAMEBUFFER,Lt);try{let Dt=C.texture,$t=Dt.format,jt=Dt.type;if(!re.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=C.width-$&&q>=0&&q<=C.height-H&&O.readPixels(z,q,$,H,ne.convert($t),ne.convert(jt),lt)}finally{let Dt=E!==null?Bt.get(E).__webglFramebuffer:null;zt.bindFramebuffer(O.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(C,z,q,$,H,lt,_t){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Lt=Bt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_t!==void 0&&(Lt=Lt[_t]),Lt){let Dt=C.texture,$t=Dt.format,jt=Dt.type;if(!re.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=C.width-$&&q>=0&&q<=C.height-H){zt.bindFramebuffer(O.FRAMEBUFFER,Lt);let kt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,kt),O.bufferData(O.PIXEL_PACK_BUFFER,lt.byteLength,O.STREAM_READ),O.readPixels(z,q,$,H,ne.convert($t),ne.convert(jt),0);let ue=E!==null?Bt.get(E).__webglFramebuffer:null;zt.bindFramebuffer(O.FRAMEBUFFER,ue);let Me=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await gf(O,Me,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,kt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,lt),O.deleteBuffer(kt),O.deleteSync(Me),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,z=null,q=0){C.isTexture!==!0&&(nr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,C=arguments[1]);let $=Math.pow(2,-q),H=Math.floor(C.image.width*$),lt=Math.floor(C.image.height*$),_t=z!==null?z.x:0,Lt=z!==null?z.y:0;L.setTexture2D(C,0),O.copyTexSubImage2D(O.TEXTURE_2D,q,0,0,_t,Lt,H,lt),zt.unbindTexture()},this.copyTextureToTexture=function(C,z,q=null,$=null,H=0){C.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,C=arguments[1],z=arguments[2],H=arguments[3]||0,q=null);let lt,_t,Lt,Dt,$t,jt,kt,ue,Me,Ee=C.isCompressedTexture?C.mipmaps[H]:C.image;q!==null?(lt=q.max.x-q.min.x,_t=q.max.y-q.min.y,Lt=q.isBox3?q.max.z-q.min.z:1,Dt=q.min.x,$t=q.min.y,jt=q.isBox3?q.min.z:0):(lt=Ee.width,_t=Ee.height,Lt=Ee.depth||1,Dt=0,$t=0,jt=0),$!==null?(kt=$.x,ue=$.y,Me=$.z):(kt=0,ue=0,Me=0);let cn=ne.convert(z.format),pe=ne.convert(z.type),Ut;z.isData3DTexture?(L.setTexture3D(z,0),Ut=O.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(L.setTexture2DArray(z,0),Ut=O.TEXTURE_2D_ARRAY):(L.setTexture2D(z,0),Ut=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,z.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,z.unpackAlignment);let $n=O.getParameter(O.UNPACK_ROW_LENGTH),me=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Rn=O.getParameter(O.UNPACK_SKIP_PIXELS),ji=O.getParameter(O.UNPACK_SKIP_ROWS),fn=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Ee.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ee.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Dt),O.pixelStorei(O.UNPACK_SKIP_ROWS,$t),O.pixelStorei(O.UNPACK_SKIP_IMAGES,jt);let Hs=C.isDataArrayTexture||C.isData3DTexture,Te=z.isDataArrayTexture||z.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){let On=Bt.get(C),Gs=Bt.get(z),_n=Bt.get(On.__renderTarget),di=Bt.get(Gs.__renderTarget);zt.bindFramebuffer(O.READ_FRAMEBUFFER,_n.__webglFramebuffer),zt.bindFramebuffer(O.DRAW_FRAMEBUFFER,di.__webglFramebuffer);for(let ui=0;ui<Lt;ui++)Hs&&O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Bt.get(C).__webglTexture,H,jt+ui),C.isDepthTexture?(Te&&O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Bt.get(z).__webglTexture,H,Me+ui),O.blitFramebuffer(Dt,$t,lt,_t,kt,ue,lt,_t,O.DEPTH_BUFFER_BIT,O.NEAREST)):Te?O.copyTexSubImage3D(Ut,H,kt,ue,Me+ui,Dt,$t,lt,_t):O.copyTexSubImage2D(Ut,H,kt,ue,Me+ui,Dt,$t,lt,_t);zt.bindFramebuffer(O.READ_FRAMEBUFFER,null),zt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Te?C.isDataTexture||C.isData3DTexture?O.texSubImage3D(Ut,H,kt,ue,Me,lt,_t,Lt,cn,pe,Ee.data):z.isCompressedArrayTexture?O.compressedTexSubImage3D(Ut,H,kt,ue,Me,lt,_t,Lt,cn,Ee.data):O.texSubImage3D(Ut,H,kt,ue,Me,lt,_t,Lt,cn,pe,Ee):C.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,H,kt,ue,lt,_t,cn,pe,Ee.data):C.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,H,kt,ue,Ee.width,Ee.height,cn,Ee.data):O.texSubImage2D(O.TEXTURE_2D,H,kt,ue,lt,_t,cn,pe,Ee);O.pixelStorei(O.UNPACK_ROW_LENGTH,$n),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,me),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Rn),O.pixelStorei(O.UNPACK_SKIP_ROWS,ji),O.pixelStorei(O.UNPACK_SKIP_IMAGES,fn),H===0&&z.generateMipmaps&&O.generateMipmap(Ut),zt.unbindTexture()},this.copyTextureToTexture3D=function(C,z,q=null,$=null,H=0){return C.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,$=arguments[1]||null,C=arguments[2],z=arguments[3],H=arguments[4]||0),nr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,z,q,$,H)},this.initRenderTarget=function(C){Bt.get(C).__webglFramebuffer===void 0&&L.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?L.setTextureCube(C,0):C.isData3DTexture?L.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?L.setTexture2DArray(C,0):L.setTexture2D(C,0),zt.unbindTexture()},this.resetState=function(){S=0,A=0,E=null,zt.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}};var wa=class r{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ut(t),this.near=e,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ma=class extends Je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},ic=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ol,this.updateRanges=[],this.version=0,this.uuid=Si()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Si()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},rn=new P,Sa=class r{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyMatrix4(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyNormalMatrix(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.transformDirection(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Hn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_e(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=_e(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Hn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Hn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Hn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Hn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=_e(e,this.array),n=_e(n,this.array),i=_e(i,this.array),s=_e(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new r(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},hr=class extends oi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ys,Js=new P,xs=new P,vs=new P,_s=new dt,js=new dt,Hd=new te,Zr=new P,Qs=new P,Kr=new P,ld=new dt,Zo=new dt,cd=new dt,Ea=class extends Je{constructor(t=new hr){if(super(),this.isSprite=!0,this.type="Sprite",ys===void 0){ys=new fe;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ic(e,5);ys.setIndex([0,1,2,0,2,3]),ys.setAttribute("position",new Sa(n,3,0,!1)),ys.setAttribute("uv",new Sa(n,2,3,!1))}this.geometry=ys,this.material=t,this.center=new dt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),xs.setFromMatrixScale(this.matrixWorld),Hd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),vs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&xs.multiplyScalar(-vs.z);let n=this.material.rotation,i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));let a=this.center;Jr(Zr.set(-.5,-.5,0),vs,a,xs,i,s),Jr(Qs.set(.5,-.5,0),vs,a,xs,i,s),Jr(Kr.set(.5,.5,0),vs,a,xs,i,s),ld.set(0,0),Zo.set(1,0),cd.set(1,1);let o=t.ray.intersectTriangle(Zr,Qs,Kr,!1,Js);if(o===null&&(Jr(Qs.set(-.5,.5,0),vs,a,xs,i,s),Zo.set(0,1),o=t.ray.intersectTriangle(Zr,Kr,Qs,!1,Js),o===null))return;let l=t.ray.origin.distanceTo(Js);l<t.near||l>t.far||e.push({distance:l,point:Js.clone(),uv:_i.getInterpolation(Js,Zr,Qs,Kr,ld,Zo,cd,new dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Jr(r,t,e,n,i,s){_s.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(js.x=s*_s.x-i*_s.y,js.y=i*_s.x+s*_s.y):js.copy(_s),r.copy(t),r.x+=js.x,r.y+=js.y,r.applyMatrix4(Hd)}var sc=class extends hn{constructor(t=null,e=1,n=1,i,s,a,o,l,c=yn,h=yn,d,u){super(null,a,o,l,c,h,i,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Mn=class extends oe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},bs=new te,hd=new te,jr=[],dd=new ai,d1=new te,tr=new Nt,er=new Ai,dn=class extends Nt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Mn(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,d1)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ai),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bs),dd.copy(t.boundingBox).applyMatrix4(bs),this.boundingBox.union(dd)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ai),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,bs),er.copy(t.boundingSphere).applyMatrix4(bs),this.boundingSphere.union(er)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(tr.geometry=this.geometry,tr.material=this.material,tr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),er.copy(this.boundingSphere),er.applyMatrix4(n),t.ray.intersectsSphere(er)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,bs),hd.multiplyMatrices(n,bs),tr.matrixWorld=hd,tr.raycast(t,jr);for(let a=0,o=jr.length;a<o;a++){let l=jr[a];l.instanceId=s,l.object=this,e.push(l)}jr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Mn(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new sc(new Float32Array(i*this.count),i,this.count,Dc,Vn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}};var dr=class extends oi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ud=new te,rc=new $i,Qr=new Ai,ta=new P,Ta=class extends Je{constructor(t=new fe,e=new dr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(i),Qr.radius+=s,t.ray.intersectsSphere(Qr)===!1)return;ud.copy(i).invert(),rc.copy(t.ray).applyMatrix4(ud);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let y=u,g=f;y<g;y++){let m=c.getX(y);ta.fromBufferAttribute(d,m),fd(ta,m,l,i,t,e,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let y=u,g=f;y<g;y++)ta.fromBufferAttribute(d,y),fd(ta,y,l,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function fd(r,t,e,n,i,s,a){let o=rc.distanceSqToPoint(r);if(o<e){let l=new P;rc.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Ri=class extends hn{constructor(t,e,n,i,s,a,o,l,c){super(t,e,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),i=0,s=n.length,a;e?a=e:a=t*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(s-1);let h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=e||(a.isVector2?new dt:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new P,i=[],s=[],a=[],o=new P,l=new te;for(let f=0;f<=t;f++){let y=f/t;i[f]=this.getTangentAt(y,new P)}s[0]=new P,a[0]=new P;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let y=Math.acos(Xe(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,y))}a[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(Xe(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let y=1;y<=t;y++)s[y].applyMatrix4(l.makeRotationAxis(i[y],f*y)),a[y].crossVectors(i[y],s[y])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},ur=class extends Sn{constructor(t=0,e=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new dt){let n=e,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);let o=this.aStartAngle+t*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},ac=class extends ur{constructor(t,e,n,i,s,a){super(t,e,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Bc(){let r=0,t=0,e=0,n=0;function i(s,a,o,l){r=s,t=o,e=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,d){let u=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(s){let a=s*s,o=a*s;return r+t*s+e*a+n*o}}}var ea=new P,Ko=new Bc,Jo=new Bc,jo=new Bc,Ls=class extends Sn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){let n=e,i=this.points,s=i.length,a=(s-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%s]:(ea.subVectors(i[0],i[1]).add(i[0]),c=ea);let d=i[o%s],u=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(ea.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=ea),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,y=Math.pow(c.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);g<1e-4&&(g=1),y<1e-4&&(y=g),m<1e-4&&(m=g),Ko.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,y,g,m),Jo.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,y,g,m),jo.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,y,g,m)}else this.curveType==="catmullrom"&&(Ko.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Jo.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),jo.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Ko.calc(l),Jo.calc(l),jo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function pd(r,t,e,n,i){let s=(n-t)*.5,a=(i-e)*.5,o=r*r,l=r*o;return(2*e-2*n+s+a)*l+(-3*e+3*n-2*s-a)*o+s*r+e}function u1(r,t){let e=1-r;return e*e*t}function f1(r,t){return 2*(1-r)*r*t}function p1(r,t){return r*r*t}function rr(r,t,e,n){return u1(r,t)+f1(r,e)+p1(r,n)}function m1(r,t){let e=1-r;return e*e*e*t}function g1(r,t){let e=1-r;return 3*e*e*r*t}function y1(r,t){return 3*(1-r)*r*r*t}function x1(r,t){return r*r*r*t}function ar(r,t,e,n,i){return m1(r,t)+g1(r,e)+y1(r,n)+x1(r,i)}var Aa=class extends Sn{constructor(t=new dt,e=new dt,n=new dt,i=new dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new dt){let n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ar(t,i.x,s.x,a.x,o.x),ar(t,i.y,s.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},oc=class extends Sn{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){let n=e,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ar(t,i.x,s.x,a.x,o.x),ar(t,i.y,s.y,a.y,o.y),ar(t,i.z,s.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ra=class extends Sn{constructor(t=new dt,e=new dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new dt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},lc=class extends Sn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ca=class extends Sn{constructor(t=new dt,e=new dt,n=new dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new dt){let n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(rr(t,i.x,s.x,a.x),rr(t,i.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Pa=class extends Sn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){let n=e,i=this.v0,s=this.v1,a=this.v2;return n.set(rr(t,i.x,s.x,a.x),rr(t,i.y,s.y,a.y),rr(t,i.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ia=class extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new dt){let n=e,i=this.points,s=(i.length-1)*t,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(pd(o,l.x,c.x,h.x,d.x),pd(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new dt().fromArray(i))}return this}},cc=Object.freeze({__proto__:null,ArcCurve:ac,CatmullRomCurve3:Ls,CubicBezierCurve:Aa,CubicBezierCurve3:oc,EllipseCurve:ur,LineCurve:Ra,LineCurve3:lc,QuadraticBezierCurve:Ca,QuadraticBezierCurve3:Pa,SplineCurve:Ia}),hc=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new cc[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}s++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new cc[i.type]().fromJSON(i))}return this}},dc=class extends hc{constructor(t){super(),this.type="Path",this.currentPoint=new dt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ra(this.currentPoint.clone(),new dt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let s=new Ca(this.currentPoint.clone(),new dt(t,e),new dt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,a){let o=new Aa(this.currentPoint.clone(),new dt(t,e),new dt(n,i),new dt(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Ia(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,s,a),this}absarc(t,e,n,i,s,a){return this.absellipse(t,e,n,n,i,s,a),this}ellipse(t,e,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,s,a,o,l),this}absellipse(t,e,n,i,s,a,o,l){let c=new ur(t,e,n,i,s,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},uc=class r extends fe{constructor(t=[new dt(0,-.5),new dt(.5,0),new dt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Xe(i,0,Math.PI*2);let s=[],a=[],o=[],l=[],c=[],h=1/e,d=new P,u=new dt,f=new P,y=new P,g=new P,m=0,p=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:m=t[_+1].x-t[_].x,p=t[_+1].y-t[_].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(g.x,g.y,g.z);break;default:m=t[_+1].x-t[_].x,p=t[_+1].y-t[_].y,f.x=p*1,f.y=-m,f.z=p*0,y.copy(f),f.x+=g.x,f.y+=g.y,f.z+=g.z,f.normalize(),l.push(f.x,f.y,f.z),g.copy(y)}for(let _=0;_<=e;_++){let x=n+_*h*i,v=Math.sin(x),b=Math.cos(x);for(let S=0;S<=t.length-1;S++){d.x=t[S].x*v,d.y=t[S].y,d.z=t[S].x*b,a.push(d.x,d.y,d.z),u.x=_/e,u.y=S/(t.length-1),o.push(u.x,u.y);let A=l[3*S+0]*v,E=l[3*S+1],w=l[3*S+0]*b;c.push(A,E,w)}}for(let _=0;_<e;_++)for(let x=0;x<t.length-1;x++){let v=x+_*t.length,b=v,S=v+t.length,A=v+t.length+1,E=v+1;s.push(b,S,E),s.push(A,E,S)}this.setIndex(s),this.setAttribute("position",new ie(a,3)),this.setAttribute("uv",new ie(o,2)),this.setAttribute("normal",new ie(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.points,t.segments,t.phiStart,t.phiLength)}},La=class r extends uc{constructor(t=1,e=1,n=4,i=8){let s=new dc;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new r(t.radius,t.length,t.capSegments,t.radialSegments)}},Da=class r extends fe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let s=[],a=[],o=[],l=[],c=new P,h=new dt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=n+d/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new ie(a,3)),this.setAttribute("normal",new ie(o,3)),this.setAttribute("uv",new ie(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Wn=class r extends fe{constructor(t=1,e=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],d=[],u=[],f=[],y=0,g=[],m=n/2,p=0;_(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ie(d,3)),this.setAttribute("normal",new ie(u,3)),this.setAttribute("uv",new ie(f,2));function _(){let v=new P,b=new P,S=0,A=(e-t)/n;for(let E=0;E<=s;E++){let w=[],M=E/s,R=M*(e-t)+t;for(let k=0;k<=i;k++){let I=k/i,D=I*l+o,U=Math.sin(D),N=Math.cos(D);b.x=R*U,b.y=-M*n+m,b.z=R*N,d.push(b.x,b.y,b.z),v.set(U,A,N).normalize(),u.push(v.x,v.y,v.z),f.push(I,1-M),w.push(y++)}g.push(w)}for(let E=0;E<i;E++)for(let w=0;w<s;w++){let M=g[w][E],R=g[w+1][E],k=g[w+1][E+1],I=g[w][E+1];(t>0||w!==0)&&(h.push(M,R,I),S+=3),(e>0||w!==s-1)&&(h.push(R,k,I),S+=3)}c.addGroup(p,S,0),p+=S}function x(v){let b=y,S=new dt,A=new P,E=0,w=v===!0?t:e,M=v===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,m*M,0),u.push(0,M,0),f.push(.5,.5),y++;let R=y;for(let k=0;k<=i;k++){let D=k/i*l+o,U=Math.cos(D),N=Math.sin(D);A.x=w*N,A.y=m*M,A.z=w*U,d.push(A.x,A.y,A.z),u.push(0,M,0),S.x=U*.5+.5,S.y=N*.5*M+.5,f.push(S.x,S.y),y++}for(let k=0;k<i;k++){let I=b+k,D=R+k;v===!0?h.push(D,D+1,I):h.push(D+1,D,I),E+=3}c.addGroup(p,E,v===!0?1:2),p+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ds=class r extends Wn{constructor(t=1,e=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new r(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},fc=class r extends fe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new ie(s,3)),this.setAttribute("normal",new ie(s.slice(),3)),this.setAttribute("uv",new ie(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){let x=new P,v=new P,b=new P;for(let S=0;S<e.length;S+=3)f(e[S+0],x),f(e[S+1],v),f(e[S+2],b),l(x,v,b,_)}function l(_,x,v,b){let S=b+1,A=[];for(let E=0;E<=S;E++){A[E]=[];let w=_.clone().lerp(v,E/S),M=x.clone().lerp(v,E/S),R=S-E;for(let k=0;k<=R;k++)k===0&&E===S?A[E][k]=w:A[E][k]=w.clone().lerp(M,k/R)}for(let E=0;E<S;E++)for(let w=0;w<2*(S-E)-1;w++){let M=Math.floor(w/2);w%2===0?(u(A[E][M+1]),u(A[E+1][M]),u(A[E][M])):(u(A[E][M+1]),u(A[E+1][M+1]),u(A[E+1][M]))}}function c(_){let x=new P;for(let v=0;v<s.length;v+=3)x.x=s[v+0],x.y=s[v+1],x.z=s[v+2],x.normalize().multiplyScalar(_),s[v+0]=x.x,s[v+1]=x.y,s[v+2]=x.z}function h(){let _=new P;for(let x=0;x<s.length;x+=3){_.x=s[x+0],_.y=s[x+1],_.z=s[x+2];let v=m(_)/2/Math.PI+.5,b=p(_)/Math.PI+.5;a.push(v,1-b)}y(),d()}function d(){for(let _=0;_<a.length;_+=6){let x=a[_+0],v=a[_+2],b=a[_+4],S=Math.max(x,v,b),A=Math.min(x,v,b);S>.9&&A<.1&&(x<.2&&(a[_+0]+=1),v<.2&&(a[_+2]+=1),b<.2&&(a[_+4]+=1))}}function u(_){s.push(_.x,_.y,_.z)}function f(_,x){let v=_*3;x.x=t[v+0],x.y=t[v+1],x.z=t[v+2]}function y(){let _=new P,x=new P,v=new P,b=new P,S=new dt,A=new dt,E=new dt;for(let w=0,M=0;w<s.length;w+=9,M+=6){_.set(s[w+0],s[w+1],s[w+2]),x.set(s[w+3],s[w+4],s[w+5]),v.set(s[w+6],s[w+7],s[w+8]),S.set(a[M+0],a[M+1]),A.set(a[M+2],a[M+3]),E.set(a[M+4],a[M+5]),b.copy(_).add(x).add(v).divideScalar(3);let R=m(b);g(S,M+0,_,R),g(A,M+2,x,R),g(E,M+4,v,R)}}function g(_,x,v,b){b<0&&_.x===1&&(a[x]=_.x-1),v.x===0&&v.z===0&&(a[x]=b/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.vertices,t.indices,t.radius,t.details)}};var Ci=class r extends fc{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new r(t.radius,t.detail)}};var ka=class r extends fe{constructor(t=.5,e=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],d=t,u=(e-t)/i,f=new P,y=new dt;for(let g=0;g<=i;g++){for(let m=0;m<=n;m++){let p=s+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),y.x=(f.x/e+1)/2,y.y=(f.y/e+1)/2,h.push(y.x,y.y)}d+=u}for(let g=0;g<i;g++){let m=g*(n+1);for(let p=0;p<n;p++){let _=p+m,x=_,v=_+n+1,b=_+n+2,S=_+1;o.push(x,v,S),o.push(v,b,S)}}this.setIndex(o),this.setAttribute("position",new ie(l,3)),this.setAttribute("normal",new ie(c,3)),this.setAttribute("uv",new ie(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var un=class r extends fe{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new P,u=new P,f=[],y=[],g=[],m=[];for(let p=0;p<=n;p++){let _=[],x=p/n,v=0;p===0&&a===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let b=0;b<=e;b++){let S=b/e;d.x=-t*Math.cos(i+S*s)*Math.sin(a+x*o),d.y=t*Math.cos(a+x*o),d.z=t*Math.sin(i+S*s)*Math.sin(a+x*o),y.push(d.x,d.y,d.z),u.copy(d).normalize(),g.push(u.x,u.y,u.z),m.push(S+v,1-x),_.push(c++)}h.push(_)}for(let p=0;p<n;p++)for(let _=0;_<e;_++){let x=h[p][_+1],v=h[p][_],b=h[p+1][_],S=h[p+1][_+1];(p!==0||a>0)&&f.push(x,v,S),(p!==n-1||l<Math.PI)&&f.push(v,b,S)}this.setIndex(f),this.setAttribute("position",new ie(y,3)),this.setAttribute("normal",new ie(g,3)),this.setAttribute("uv",new ie(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new r(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var fr=class r extends fe{constructor(t=new Pa(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};let a=t.computeFrenetFrames(e,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,l=new P,c=new dt,h=new P,d=[],u=[],f=[],y=[];g(),this.setIndex(y),this.setAttribute("position",new ie(d,3)),this.setAttribute("normal",new ie(u,3)),this.setAttribute("uv",new ie(f,2));function g(){for(let x=0;x<e;x++)m(x);m(s===!1?e:0),_(),p()}function m(x){h=t.getPointAt(x/e,h);let v=a.normals[x],b=a.binormals[x];for(let S=0;S<=i;S++){let A=S/i*Math.PI*2,E=Math.sin(A),w=-Math.cos(A);l.x=w*v.x+E*b.x,l.y=w*v.y+E*b.y,l.z=w*v.z+E*b.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function p(){for(let x=1;x<=e;x++)for(let v=1;v<=i;v++){let b=(i+1)*(x-1)+(v-1),S=(i+1)*x+(v-1),A=(i+1)*x+v,E=(i+1)*(x-1)+v;y.push(b,S,E),y.push(S,A,E)}}function _(){for(let x=0;x<=e;x++)for(let v=0;v<=i;v++)c.x=x/e,c.y=v/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new r(new cc[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Ft=class extends oi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Id,this.normalScale=new dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Fa=class extends Ft{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new dt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ut(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ut(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ut(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function na(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function v1(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}var ks=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let a;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break t}a=e.length;break e}if(!(t>=s)){let o=e[1];t<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=e[--n-1],t>=s)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let a=0;a!==i;++a)e[a]=n[s+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},pc=class extends ks{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fh,endingEnd:fh}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,a=t+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case ph:s=t,o=2*e-n;break;case mh:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ph:a=t,l=2*n-e;break;case mh:a=1,l=n+i[1]-i[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,y=(n-e)/(i-e),g=y*y,m=g*y,p=-u*m+2*u*g-u*y,_=(1+u)*m+(-1.5-2*u)*g+(-.5+u)*y+1,x=(-1-f)*m+(1.5+f)*g+.5*y,v=f*m-f*g;for(let b=0;b!==o;++b)s[b]=p*a[h+b]+_*a[c+b]+x*a[l+b]+v*a[d+b];return s}},mc=class extends ks{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==o;++u)s[u]=a[c+u]*d+a[l+u]*h;return s}},gc=class extends ks{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Un=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=na(e,this.TimeBufferType),this.values=na(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:na(t.times,Array),values:na(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new gc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new mc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new pc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ca:e=this.InterpolantFactoryMethodDiscrete;break;case Bl:e=this.InterpolantFactoryMethodLinear;break;case _o:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ca;case this.InterpolantFactoryMethodLinear:return Bl;case this.InterpolantFactoryMethodSmooth:return _o}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<t;)++s;for(;a!==-1&&n[a]>e;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(i!==void 0&&v1(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===_o,s=t.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(i)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let y=0;y!==n;++y){let g=e[d+y];if(g!==e[u+y]||g!==e[f+y]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++a}}if(s>0){t[a]=t[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};Un.prototype.TimeBufferType=Float32Array;Un.prototype.ValueBufferType=Float32Array;Un.prototype.DefaultInterpolation=Bl;var Yi=class extends Un{constructor(t,e,n){super(t,e,n)}};Yi.prototype.ValueTypeName="bool";Yi.prototype.ValueBufferType=Array;Yi.prototype.DefaultInterpolation=ca;Yi.prototype.InterpolantFactoryMethodLinear=void 0;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;var yc=class extends Un{};yc.prototype.ValueTypeName="color";var xc=class extends Un{};xc.prototype.ValueTypeName="number";var vc=class extends ks{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(i-e),c=t*o;for(let h=c+o;c!==h;c+=4)Ge.slerpFlat(s,0,a,c-o,a,c,l);return s}},Ua=class extends Un{InterpolantFactoryMethodLinear(t){return new vc(this.times,this.values,this.getValueSize(),t)}};Ua.prototype.ValueTypeName="quaternion";Ua.prototype.InterpolantFactoryMethodSmooth=void 0;var Zi=class extends Un{constructor(t,e,n){super(t,e,n)}};Zi.prototype.ValueTypeName="string";Zi.prototype.ValueBufferType=Array;Zi.prototype.DefaultInterpolation=ca;Zi.prototype.InterpolantFactoryMethodLinear=void 0;Zi.prototype.InterpolantFactoryMethodSmooth=void 0;var _c=class extends Un{};_c.prototype.ValueTypeName="vector";var bc=class{constructor(t,e,n){let i=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],y=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return y}return null}}},_1=new bc,wc=class{constructor(t){this.manager=t!==void 0?t:_1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};wc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Na=class extends Je{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},Ba=class extends Na{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ut(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Qo=new te,md=new P,gd=new P,Mc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new dt(512,512),this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cr,this._frameExtents=new dt(1,1),this._viewportCount=1,this._viewports=[new ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;md.setFromMatrixPosition(t.matrixWorld),e.position.copy(md),gd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(gd),e.updateMatrixWorld(),Qo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Qo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Qo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Sc=class extends Mc{constructor(){super(new xa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Oa=class extends Na{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.target=new Je,this.shadow=new Sc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var za=class extends fe{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var Oc="\\[\\]\\.:\\/",b1=new RegExp("["+Oc+"]","g"),zc="[^"+Oc+"]",w1="[^"+Oc.replace("\\.","")+"]",M1=/((?:WC+[\/:])*)/.source.replace("WC",zc),S1=/(WCOD+)?/.source.replace("WCOD",w1),E1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",zc),T1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",zc),A1=new RegExp("^"+M1+S1+E1+T1+"$"),R1=["material","materials","bones","map"],Ec=class{constructor(t,e,n){let i=n||Pe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Pe=class r{constructor(t,e,n){this.path=e,this.parsedPath=n||r.parseTrackName(e),this.node=r.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new r.Composite(t,e,n):new r(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(b1,"")}static parseTrackName(t){let e=A1.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);R1.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=r.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[i];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pe.Composite=Ec;Pe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pe.prototype.GetterByBindingType=[Pe.prototype._getValue_direct,Pe.prototype._getValue_array,Pe.prototype._getValue_arrayElement,Pe.prototype._getValue_toArray];Pe.prototype.SetterByBindingTypeAndVersioning=[[Pe.prototype._setValue_direct,Pe.prototype._setValue_direct_setNeedsUpdate,Pe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_array,Pe.prototype._setValue_array_setNeedsUpdate,Pe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_arrayElement,Pe.prototype._setValue_arrayElement_setNeedsUpdate,Pe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pe.prototype._setValue_fromArray,Pe.prototype._setValue_fromArray_setNeedsUpdate,Pe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var cy=new Float32Array(1);var yd=new te,Ha=class{constructor(t,e,n=0,i=1/0){this.ray=new $i(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new lr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return yd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yd),this}intersectObject(t,e=!0,n=[]){return Tc(t,this,n,e),n.sort(xd),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)Tc(t[i],this,n,e);return n.sort(xd),n}};function xd(r,t){return r.distance-t.distance}function Tc(r,t,e,n){let i=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let a=0,o=s.length;a<o;a++)Tc(s[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ac}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ac);function Gd(r,t=1e-4){t=Math.max(t,Number.EPSILON);let e={},n=r.getIndex(),i=r.getAttribute("position"),s=n?n.count:i.count,a=0,o=Object.keys(r.attributes),l={},c={},h=[],d=["getX","getY","getZ","getW"],u=["setX","setY","setZ","setW"];for(let _=0,x=o.length;_<x;_++){let v=o[_],b=r.attributes[v];l[v]=new b.constructor(new b.array.constructor(b.count*b.itemSize),b.itemSize,b.normalized);let S=r.morphAttributes[v];S&&(c[v]||(c[v]=[]),S.forEach((A,E)=>{let w=new A.array.constructor(A.count*A.itemSize);c[v][E]=new A.constructor(w,A.itemSize,A.normalized)}))}let f=t*.5,y=Math.log10(1/t),g=Math.pow(10,y),m=f*g;for(let _=0;_<s;_++){let x=n?n.getX(_):_,v="";for(let b=0,S=o.length;b<S;b++){let A=o[b],E=r.getAttribute(A),w=E.itemSize;for(let M=0;M<w;M++)v+=`${~~(E[d[M]](x)*g+m)},`}if(v in e)h.push(e[v]);else{for(let b=0,S=o.length;b<S;b++){let A=o[b],E=r.getAttribute(A),w=r.morphAttributes[A],M=E.itemSize,R=l[A],k=c[A];for(let I=0;I<M;I++){let D=d[I],U=u[I];if(R[U](a,E[D](x)),w)for(let N=0,W=w.length;N<W;N++)k[N][U](a,w[N][D](x))}}e[v]=a,h.push(a),a++}}let p=r.clone();for(let _ in r.attributes){let x=l[_];if(p.setAttribute(_,new x.constructor(x.array.slice(0,a*x.itemSize),x.itemSize,x.normalized)),_ in c)for(let v=0;v<c[_].length;v++){let b=c[_][v];p.morphAttributes[_][v]=new b.constructor(b.array.slice(0,a*b.itemSize),b.itemSize,b.normalized)}}return p.setIndex(h),p}function En(r,t){let e=document.createElement("canvas");return e.width=r,e.height=t,e}function Tn(r,{repeat:t=!1,srgb:e=!0,aniso:n=4}={}){let i=new Ri(r);return t&&(i.wrapS=i.wrapT=ii),e&&(i.colorSpace=He),i.anisotropy=n,i.needsUpdate=!0,i}function Bs({band:r=!1,stamp:t=!1,ncn:e=!1,replica:n=!1,size:i=1024}={}){let s=i,a=i/2,o=En(s,a),l=o.getContext("2d"),c=De(r?7:3);l.fillStyle="#cfe03c",l.fillRect(0,0,s,a);let h=l.getImageData(0,0,s,a),d=h.data;for(let m=0;m<a;m++)for(let p=0;p<s;p++){let _=pn(p*.09,m*.09,5)*10+pn(p*.5,m*.5,9)*9+(c()-.5)*22,x=(m*s+p)*4;d[x]=Math.max(0,Math.min(255,d[x]+_)),d[x+1]=Math.max(0,Math.min(255,d[x+1]+_)),d[x+2]=Math.max(0,Math.min(255,d[x+2]+_*.5))}l.putImageData(h,0,0);for(let m=0;m<6e3;m++){let p=c()*s,_=c()*a,x=c()*Math.PI,v=2+c()*5;l.strokeStyle=c()<.5?"rgba(240,255,140,0.35)":"rgba(120,140,20,0.25)",l.lineWidth=.8,l.beginPath(),l.moveTo(p,_),l.lineTo(p+Math.cos(x)*v,_+Math.sin(x)*v),l.stroke()}if(r){l.fillStyle="#1f4aa8";for(let m=0;m<s;m++){let p=a/2+Math.sin(m/s*Math.PI*2)*a*.14;l.fillRect(m,p-a*.035,1,a*.07)}l.fillStyle="rgba(255,255,255,0.75)";for(let m=0;m<s;m++){let p=a/2+Math.sin(m/s*Math.PI*2)*a*.14;l.fillRect(m,p-a*.037,1,1.5),l.fillRect(m,p+a*.035,1,1.5)}}let u=.7,f=.3,y=2*Math.sqrt(u*f),g=(m,p)=>{l.fillStyle=p;for(let _=0;_<2400;_++){let x=_/2400*Math.PI*2,v=u*Math.cos(x)+f*Math.cos(3*x),b=u*Math.sin(x)-f*Math.sin(3*x),S=y*Math.sin(2*x),A=Math.hypot(v,S,b);v/=A,S/=A,b/=A;let E=Math.acos(S),R=(Math.atan2(b,-v)/(Math.PI*2)+1)%1*s,k=E/Math.PI*a,I=m/(Math.PI*2)*s/Math.max(.12,Math.sin(E)),D=m/Math.PI*a;for(let U of[-s,0,s])l.beginPath(),l.ellipse(R+U,k,I,D,0,0,Math.PI*2),l.fill()}};return g(.13,"#b6bf8e"),g(.1,"#f4f2e6"),e||n?(l.save(),l.translate(s*.25,a*.5),l.scale(1.6,1),l.fillStyle=n?"#5a2a8a":"#7a1d14",l.font=`bold ${Math.round(a*.09)}px Arial, sans-serif`,l.textAlign="center",l.fillText(n?"REPLICA":"NCN",0,-a*.01),l.font=`${Math.round(a*.045)}px Arial, sans-serif`,l.fillText(n?"New Creek Nation":"New Creek Nation batch",0,a*.06),l.restore()):t?(l.save(),l.translate(s*.25,a*.5),l.scale(1.6,1),l.fillStyle="#16161a",l.font=`bold ${Math.round(a*.07)}px Arial, sans-serif`,l.textAlign="center",l.fillText("CREEK ROLLING",0,-a*.02),l.font=`${Math.round(a*.05)}px Arial, sans-serif`,l.fillText("BATCH No. 42",0,a*.05),l.restore()):(l.save(),l.translate(s*.25,a*.5),l.scale(1.6,1),l.fillStyle="rgba(30,30,30,0.55)",l.font=`bold ${Math.round(a*.055)}px Arial, sans-serif`,l.textAlign="center",l.fillText("CRT",0,a*.02),l.restore()),Tn(o,{aniso:8})}function qa(r=256,t=1,e=.35){let n=En(r,r),i=n.getContext("2d"),s=i.createImageData(r,r),a=(l,c,h,d)=>{let u=Math.round(r*h),f=l*h,y=c*h,g=Math.floor(f),m=Math.floor(y),p=f-g,_=y-m,x=(E,w)=>(pn((E%u+u)%u+.5,(w%u+u)%u+.5,d)+1)/2,v=p*p*(3-2*p),b=_*_*(3-2*_),S=x(g,m)+(x(g+1,m)-x(g,m))*v,A=x(g,m+1)+(x(g+1,m+1)-x(g,m+1))*v;return S+(A-S)*b},o=De(t);for(let l=0;l<r;l++)for(let c=0;c<r;c++){let h=a(c,l,.03125,t)*.5+a(c,l,.125,t+3)*.3+a(c,l,.5,t+7)*.2;h=1-e+h*e*2+(o()-.5)*.06;let d=(l*r+c)*4,u=Math.max(0,Math.min(255,h*200));s.data[d]=s.data[d+1]=s.data[d+2]=u,s.data[d+3]=255}return i.putImageData(s,0,0),Tn(n,{repeat:!0,srgb:!1})}function Vd(r=256){let t=En(r,r),e=t.getContext("2d"),n=e.createImageData(r,r),i=new Float32Array(r*r),s=[],a=De(42);for(let o=0;o<26;o++){let l=Math.round((a()-.5)*16),c=Math.round((a()-.5)*16);s.push({kx:l,ky:c,a:1/(1+Math.hypot(l,c)),p:a()*6.283})}for(let o=0;o<r;o++)for(let l=0;l<r;l++){let c=0;for(let h of s)c+=h.a*Math.sin((h.kx*l+h.ky*o)/r*Math.PI*2+h.p);i[o*r+l]=c}for(let o=0;o<r;o++)for(let l=0;l<r;l++){let c=i[o*r+(l+1)%r]-i[o*r+(l-1+r)%r],h=i[(o+1)%r*r+l]-i[(o-1+r)%r*r+l],d=-c*1.2,u=-h*1.2,f=1,y=Math.hypot(d,u,f);d/=y,u/=y,f/=y;let g=(o*r+l)*4;n.data[g]=(d*.5+.5)*255,n.data[g+1]=(u*.5+.5)*255,n.data[g+2]=(f*.5+.5)*255,n.data[g+3]=255}return e.putImageData(n,0,0),Tn(t,{repeat:!0,srgb:!1})}function $a(r=64,t=0){let e=En(r,r),n=e.getContext("2d"),i=n.createRadialGradient(r/2,r/2,r*t*.5,r/2,r/2,r/2);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.5,"rgba(255,255,255,0.5)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,r,r),Tn(e,{srgb:!1})}function Wd(r=128){let t=En(r,r),e=t.getContext("2d"),n=e.createRadialGradient(r/2,r/2,r*.3,r/2,r/2,r/2);return n.addColorStop(0,"rgba(255,255,255,0)"),n.addColorStop(.72,"rgba(255,255,255,0.0)"),n.addColorStop(.86,"rgba(255,255,255,0.9)"),n.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=n,e.fillRect(0,0,r,r),Tn(t,{srgb:!1})}function Xa(r=64){let t=En(r,r),e=t.getContext("2d"),n=De(5);for(let i=0;i<18;i++){let s=r/2+(n()-.5)*r*.5,a=r/2+(n()-.5)*r*.5,o=r*(.06+n()*.12),l=e.createRadialGradient(s,a,0,s,a,o);l.addColorStop(0,"rgba(255,255,255,0.9)"),l.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=l,e.beginPath(),e.arc(s,a,o,0,Math.PI*2),e.fill()}return Tn(t,{srgb:!1})}function qd(r=64){let t=En(r,r),e=t.getContext("2d");e.translate(r/2,r/2),e.rotate(.6);let n=e.createLinearGradient(-r*.4,0,r*.4,0);return n.addColorStop(0,"#b5651d"),n.addColorStop(.5,"#d9a23a"),n.addColorStop(1,"#8a5a1c"),e.fillStyle=n,e.beginPath(),e.moveTo(-r*.42,0),e.quadraticCurveTo(0,-r*.28,r*.42,0),e.quadraticCurveTo(0,r*.28,-r*.42,0),e.fill(),e.strokeStyle="rgba(90,50,10,0.8)",e.lineWidth=1.5,e.beginPath(),e.moveTo(-r*.45,0),e.lineTo(r*.4,0),e.stroke(),Tn(t)}function Ya(r=64,t=128){let e=En(r,t),n=e.getContext("2d"),i=De(11);for(let s=0;s<26;s++){let a=r*(.15+i()*.7),o=(i()-.5)*r*.5,l=t*(.45+i()*.55),c=`hsl(${85+i()*30}, ${35+i()*25}%, ${22+i()*22}%)`;n.strokeStyle=c,n.lineWidth=1.5+i()*2,n.beginPath(),n.moveTo(a,t),n.quadraticCurveTo(a+o*.3,t-l*.6,a+o,t-l),n.stroke()}return Tn(e)}function $d(r=64,t=256){let e=En(r,t),n=e.getContext("2d"),i=De(8);n.fillStyle="rgba(255,255,255,0.25)",n.fillRect(0,0,r,t);for(let s=0;s<90;s++){let a=i()*r,o=i()*t,l=20+i()*90;n.strokeStyle=`rgba(255,255,255,${.3+i()*.6})`,n.lineWidth=1+i()*3,n.beginPath(),n.moveTo(a,o),n.lineTo(a+(i()-.5)*3,o+l),n.stroke(),n.beginPath(),n.moveTo(a,o-t),n.lineTo(a,o-t+l),n.stroke()}return Tn(e,{repeat:!0,srgb:!1})}function Hc(r=256,t="#9a6a3c"){let e=En(r,r),n=e.getContext("2d");n.fillStyle=t,n.fillRect(0,0,r,r);let i=De(21);for(let s=0;s<70;s++){let a=i()*r;n.strokeStyle=`rgba(${i()<.5?"60,35,15":"200,160,110"},${.1+i()*.25})`,n.lineWidth=1+i()*2.5,n.beginPath(),n.moveTo(0,a);for(let o=0;o<=r;o+=16)n.lineTo(o,a+Math.sin(o*.03+s)*3);n.stroke()}return Tn(e,{repeat:!0})}function Ki(r=128){let t=En(r,r),e=t.getContext("2d");e.fillStyle="#4a3a2a",e.fillRect(0,0,r,r);let n=De(31);for(let i=0;i<60;i++){let s=n()*r;e.strokeStyle=`rgba(${n()<.5?"25,18,10":"110,90,70"},0.5)`,e.lineWidth=1+n()*3,e.beginPath(),e.moveTo(s,0),e.lineTo(s+(n()-.5)*8,r),e.stroke()}return Tn(t,{repeat:!0})}function xn(r,{w:t=512,h:e=128,bg:n="#2d3a1f",fg:i="#f6f1d8",font:s="bold 54px Georgia, serif",border:a="#c9a45a"}={}){let o=En(t,e),l=o.getContext("2d");l.fillStyle=n,l.fillRect(0,0,t,e),l.strokeStyle=a,l.lineWidth=8,l.strokeRect(4,4,t-8,e-8),l.fillStyle=i,l.textAlign="center",l.textBaseline="middle",l.font=s;let c=Array.isArray(r)?r:[r];return c.forEach((h,d)=>l.fillText(h,t/2,e/(c.length+1)*(d+1))),Tn(o)}var ci={gravel:new ut(.5,.42,.31),rock:new ut(.5,.49,.46),sand:new ut(.64,.57,.43),dirt:new ut(.4,.31,.21),grass:new ut(.2,.31,.11),grass2:new ut(.32,.38,.14),litter:new ut(.36,.3,.18),moss:new ut(.25,.33,.14)};function C1(r){let t=r==="low"?.09:r==="medium"?.06:.045,e=[];for(let n=-10;n<-3.2;n+=.4)e.push(n);for(let n=-3.2;n<4.4;n+=t)e.push(n);for(let n=4.4;n<=10.001;n+=.4)e.push(n);return e[e.length-1]<10&&e.push(10),e}var Za=[new ut(.46,.45,.42),new ut(.55,.52,.46),new ut(.36,.36,.35)];function Vc(r,t,e){let n=Cn(r*.15,t*.15,2,5);e.copy(ci.grass).lerp(ci.grass2,.5+n*.5);let i=Cn(r*.06+7,t*.06,2,9);return i>.15&&e.lerp(ci.litter,Math.min(.55,(i-.15)*2)),e}function P1(r,t,e,n,i,s,a=0,o=0,l=0){let c=r.y0(t),h=r.c(t),d=pn(t*3.1,e*3.1,3)*.5+pn(t*13,e*13,4)*.5,f=Math.abs(e-h)-(e<h?r.wL(t):r.wR(t)),y=n-c,g=Ht(.7,1.8,a),m=f<.04,p=i===gt.ROCK;if(m)s.copy(i===gt.GRAVEL?ci.gravel:i===gt.SAND?ci.sand:i===gt.ROCK?Za[0]:ci.dirt);else{Vc(o,l,s);let v=1-Ht(.05,.35+Math.max(0,d)*.3,f);s.lerp(i===gt.GRAVEL?ci.gravel:ci.dirt,Math.max(v,Ht(-.02,.06,-y+.06)*.6));let b=Math.max(g,p?1-Ht(.25,1.4+d*.6,f):0);if(b>0){let S=pn(t*1.7+n*2.1,e*1.7,12)*.5+.5,A=Za[0].clone().lerp(S>.5?Za[1]:Za[2],Math.abs(S-.5)*2);g>.3&&A.multiplyScalar(.82-.1*g),s.lerp(A,b),!g&&y>.3&&s.lerp(ci.moss,le(.25+d*.4,0,.5)*(1-g))}}let _=1+d*.16+(i===gt.GRAVEL&&m?pn(t*40,e*40,8)*.2:0);if(s.multiplyScalar(_),y<.035&&r.inChannel(t,e,.2)){let v=1-Ht(-.01,.035,y);if(s.multiplyScalar(1-.42*v),y<0){let b=Math.min(1,-y/.1);s.r*=.78-.2*b,s.g*=.8-.15*b,s.b*=.62-.12*b}}let x=Ht(7.5,9.8,Math.abs(e));return x>0&&s.lerp(Vc(o,l,new ut),x),s}function Xd(r,t){let e=t==="low"?.2:t==="medium"?.13:.1,n=C1(t),i=Math.floor((Ie-Wt)/e)+1,s=n.length,a=new Float32Array(i*s*3),o=new Float32Array(i*s*3),l=new Float32Array(i*s*2),c={},h=new ut,d={};for(let p=0;p<i;p++){let _=Math.min(Ie,Wt+p*e);for(let x=0;x<s;x++){let v=n[x];r.worldXZ(_,v,c),r.bedAt(_,v,d);let b=p*s+x,S=d.h;(x===0||x===s-1)&&(S-=.25),a[b*3]=c.x,a[b*3+1]=S,a[b*3+2]=c.z,P1(r,_,v,d.h,d.mat,h,Math.hypot(d.hs,d.hd),c.x,c.z),o[b*3]=h.r,o[b*3+1]=h.g,o[b*3+2]=h.b,l[b*2]=c.x*1.5,l[b*2+1]=c.z*1.5}}let u=[];for(let p=0;p<i-1;p++)for(let _=0;_<s-1;_++){let x=p*s+_,v=x+1,b=x+s,S=b+1;u.push(x,v,b,v,S,b)}let f=new fe;f.setAttribute("position",new oe(a,3)),f.setAttribute("color",new oe(o,3)),f.setAttribute("uv",new oe(l,2)),f.setIndex(u),f.computeVertexNormals();let y=qa(256,3,.42),g=new Ft({vertexColors:!0,map:y,roughness:.92,metalness:0}),m=new pt;m.name="terrain";for(let p of Wc(f,i,s,Math.max(8,Math.round(10/e)))){let _=new Nt(p,g);_.receiveShadow=!0,m.add(_)}return f.dispose(),m}function Wc(r,t,e,n){let i=[],s=Object.keys(r.attributes);for(let a=0;a<t-1;a+=n){let o=Math.min(t-1,a+n),l=o-a+1,c=new fe;for(let d of s){let u=r.attributes[d],f=u.itemSize;c.setAttribute(d,new oe(u.array.slice(a*e*f,(o+1)*e*f),f))}let h=[];for(let d=0;d<l-1;d++)for(let u=0;u<e-1;u++){let f=d*e+u,y=f+1,g=f+e,m=g+1;h.push(f,y,g,y,m,g)}c.setIndex(h),c.computeBoundingSphere(),i.push(c)}return i}function Yd(r,t,e,n={}){let i=r.locate(t,e,-1,n),s=le(i.s,Wt,Ie),a=r.bedRaw(s,i.d,{}),o=Math.abs(i.d-r.c(s));return a+=(Cn(t*.025,e*.025,3,91)*5+1.2)*Ht(9,35,o),i.s<Wt&&(a+=(Wt-i.s)*.12),{h:a,s:i.s,d:i.d,ad:o}}function Zd(r,t){let e=t==="low"?2:1.25,n=-90,i=90,s=-290,a=50,o=Math.round((i-n)/e)+1,l=Math.round((a-s)/e)+1,c=new Float32Array(o*l*3),h=new Float32Array(o*l*3),d=new Float32Array(o*l*2),u=new Uint8Array(o*l),f=new ut;for(let _=0;_<l;_++)for(let x=0;x<o;x++){let v=n+x*e,b=s+_*e,S=Yd(r,v,b),A=_*o+x;u[A]=S.s>Wt+.3&&S.s<Ie-.3&&Math.abs(S.d)<9.7?1:0,c[A*3]=v,c[A*3+1]=S.h-.04,c[A*3+2]=b,Vc(v,b,f),S.ad>30&&f.lerp(new ut(.24,.32,.15),Ht(30,70,S.ad)),h[A*3]=f.r,h[A*3+1]=f.g,h[A*3+2]=f.b,d[A*2]=v*1.5,d[A*2+1]=b*1.5}let y=[];for(let _=0;_<l-1;_++)for(let x=0;x<o-1;x++){let v=_*o+x,b=v+1,S=v+o,A=S+1;u[v]&&u[b]&&u[S]&&u[A]||y.push(v,S,b,b,S,A)}let g=new fe;g.setAttribute("position",new oe(c,3)),g.setAttribute("color",new oe(h,3)),g.setAttribute("uv",new oe(d,2)),g.setIndex(y),g.computeVertexNormals();let m=new Ft({vertexColors:!0,map:qa(256,9,.3),roughness:.95}),p=new Nt(g,m);return p.receiveShadow=!0,p}function Gc(r){let t=new Ci(1,3);t.deleteAttribute("normal"),t.deleteAttribute("uv"),t=Gd(t);let e=t.attributes.position,n=new P;for(let i=0;i<e.count;i++){n.fromBufferAttribute(e,i);let s=Cn(n.x*1.6+r,n.y*1.6+n.z*.7,3,r)*.16+pn(n.x*5+r,n.z*5+n.y*3,r+1)*.04;n.multiplyScalar(1+s),n.y<-.4&&(n.y=-.4+(n.y+.4)*.6),e.setXYZ(i,n.x,n.y,n.z)}return t.computeVertexNormals(),t}function Kd(r){let t=[Gc(1),Gc(7),Gc(13)],e=qa(128,17,.45),n=r.rocks,i=t.map(()=>[]),s=De(77);n.forEach((u,f)=>i[f%3].push(u));let a=[],o=new te,l=new Ge,c=new ln,h=new P,d=new P;return i.forEach((u,f)=>{let y=new Ft({color:9078656,map:e,roughness:.88});y.onBeforeCompile=_=>{_.vertexShader=_.vertexShader.replace("#include <common>",`#include <common>
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
          roughnessFactor = mix(roughnessFactor, 0.28, wetBand * (1.0 - under));`)};let g=new dn(t[f],y,u.length),m=new Float32Array(u.length),p=new Float32Array(u.length);u.forEach((_,x)=>{c.set(s()*6.28,s()*6.28,s()*.4),l.setFromEuler(c);let v=.95+s()*.1;h.set(_.r*v*1.03,_.r*(.9+s()*.08),_.r*(1+s()*.06)),d.set(_.x,_.y,_.z),o.compose(d,l,h),g.setMatrixAt(x,o);let b=r.waterLevel(_.s,_.d);m[x]=b>-1e8?b:r.y0(_.s)+(r.inChannel(_.s,_.d,.4)?0:-50),p[x]=_.tag==="boulder"||_.tag==="bank"?.4+s()*.6:.15}),g.geometry=g.geometry.clone(),g.geometry.setAttribute("aWaterY",new Mn(m,1)),g.geometry.setAttribute("aMoss",new Mn(p,1)),g.castShadow=!0,g.receiveShadow=!0,g.instanceMatrix.needsUpdate=!0,a.push(g)}),a}function Jd(r,t){let e=new pt,n=De(5150),i=t==="low"?220:480,s=[],a=[],o=[],l=F=>{for(let J of rt)if(Math.abs(F.s-J.s)<2.5&&F.d>r.c(J.s))return!0;return Math.abs(F.s-Zt)<3},c=0;for(;s.length<i&&c++<2e4;){let F=-80+n()*160,J=-285+n()*330,it=Yd(r,F,J);if(it.ad<9.5||l(it)||it.ad<9&&n()<.5)continue;let at=n()<.55,ft=(at?7:5)+n()*6,It={x:F,y:it.h,z:J,h:ft,conifer:at,r:.12+n()*.12};s.push(It),at?a.push(It):o.push(It)}let h=Ki(),d=new Wn(.6,1,1,7,1);d.translate(0,.5,0);let u=new dn(d,new Ft({map:h,roughness:1}),s.length),f=new Ds(1,1,9,3);f.translate(0,.5,0);let y=(F,J,it)=>{let at=F.attributes.position,ft=De(it);for(let It=0;It<at.count;It++)at.setXYZ(It,at.getX(It)*(1+(ft()-.5)*J),at.getY(It),at.getZ(It)*(1+(ft()-.5)*J));return F.computeVertexNormals(),F};y(f,.25,3);let g=new dn(f,new Ft({color:3099174,roughness:.95,flatShading:!0}),a.length*3),m=y(new Ci(1,1),.35,9),p=new dn(m,new Ft({color:5204778,roughness:.95,flatShading:!0}),o.length*3),_=new te,x=new Ge,v=new P,b=new P,S=new ut;s.forEach((F,J)=>{x.setFromAxisAngle(new P(0,1,0),n()*6.28),_.compose(b.set(F.x,F.y-.2,F.z),x,v.set(F.r,F.h*(F.conifer?.9:.65),F.r)),u.setMatrixAt(J,_)});let A=0;a.forEach(F=>{for(let J=0;J<3;J++){let it=F.y+F.h*(.22+J*.22),at=F.h*(.27-J*.07),ft=F.h*(.42-J*.07);x.setFromAxisAngle(new P(0,1,0),n()*6.28),_.compose(b.set(F.x,it,F.z),x,v.set(at,ft,at)),g.setMatrixAt(A,_),g.setColorAt(A,S.setHSL(.3+n()*.06,.35,.18+n()*.08)),A++}});let E=0;o.forEach(F=>{for(let J=0;J<3;J++){let it=F.h*(.2+n()*.1);x.setFromAxisAngle(new P(0,1,0),n()*6.28),_.compose(b.set(F.x+(n()-.5)*it,F.y+F.h*(.6+n()*.25),F.z+(n()-.5)*it),x,v.set(it,it*.8,it)),p.setMatrixAt(E,_),p.setColorAt(E,S.setHSL(.2+n()*.08,.4,.26+n()*.1)),E++}});for(let F of[u,g,p])F.castShadow=!0,F.receiveShadow=!0,e.add(F);let w=t==="low"?1200:t==="medium"?2600:4200,M=Ya(),R=new Se(1,1);R.translate(0,.5,0);let k=R.clone().rotateY(Math.PI/2),I=I1([R,k]);{let F=I.attributes.normal;for(let J=0;J<F.count;J++)F.setXYZ(J,0,1,0)}let D=new Ft({map:M,alphaTest:.45,side:ye,roughness:1});D.onBeforeCompile=F=>{F.fragmentShader=F.fragmentShader.replace("#include <normal_fragment_begin>",Yt.normal_fragment_begin.replace("normal *= faceDirection;",""))};let U=new dn(I,D,w),N=0;c=0;let W={};for(;N<w&&c++<w*8;){let F=Wt+1+n()*(Ie-Wt-2),J=n()<.5?-1:1,it=r.c(F),at=J<0?r.wL(F):r.wR(F),ft=it+J*(at+.25+n()*n()*7.5);if(Math.abs(ft)>9.8)continue;let It=r.bedAt(F,ft,{});if(It.mat===gt.ROCK||It.mat===gt.GRAVEL&&n()<.8||It.h<r.y0(F)+.04)continue;let Y=!1;for(let X=0;X<rt.length;X++){let K=r.pads[X];F>K.s0-.2&&F<K.s1+.2&&J>0&&Math.abs(ft-it)<2.4&&(Y=!0)}if(Math.abs(F-Zt)<1.4&&Math.abs(ft-it)<1.6&&(Y=!0),Y)continue;r.worldXZ(F,ft,W);let et=.08+n()*n()*.3;x.setFromAxisAngle(new P(0,1,0),n()*6.28),_.compose(b.set(W.x,It.h-.01,W.z),x,v.set(et*(.8+n()*.6),et,et)),U.setMatrixAt(N,_),U.setColorAt(N,S.setHSL(.2+n()*.07,.45,.75+n()*.25)),N++}return U.count=N,U.receiveShadow=!0,e.add(U),e}function I1(r){let t=0,e=0;for(let c of r)t+=c.attributes.position.count,e+=c.index.count;let n=new Float32Array(t*3),i=new Float32Array(t*3),s=new Float32Array(t*2),a=[],o=0;for(let c of r){n.set(c.attributes.position.array,o*3),i.set(c.attributes.normal.array,o*3),s.set(c.attributes.uv.array,o*2);for(let h=0;h<c.index.count;h++)a.push(c.index.array[h]+o);o+=c.attributes.position.count}let l=new fe;return l.setAttribute("position",new oe(n,3)),l.setAttribute("normal",new oe(i,3)),l.setAttribute("uv",new oe(s,2)),l.setIndex(a),l}function L1(r,t){let e=1;return r>80&&(e=.55),r>54&&r<68&&(e=1.7),r>50.3&&r<54&&(e=t<0?0:.85),r>72.4&&r<75.2&&t>0&&(e=.3),r<0&&(e=1.25),r<-138&&(e=1.4),e}function Qd(r,t){let e=t==="low"?.4:t==="medium"?.7:1,n=De(8080),i=new pt,s=new pt;s.name="canopy",i.add(s);let a=[],o=Ki(),l=new Ft({map:o,color:13156528,roughness:.95}),c=new Ft({map:o,color:8021584,roughness:1}),h=new Ft({color:16777215,roughness:.9,flatShading:!0}),d=new Ft({color:16777215,roughness:.95,flatShading:!0}),u=Ya(64,128),f=new Ft({map:u,alphaTest:.45,side:ye,roughness:1});f.onBeforeCompile=R=>{R.fragmentShader=R.fragmentShader.replace("#include <normal_fragment_begin>",Yt.normal_fragment_begin.replace("normal *= faceDirection;",""))};let y=new Wn(.55,1,1,7,1);y.translate(0,.5,0);let g=jd(new Ci(1,1),.3,3),m=jd(new Ci(1,1),.4,5),p=new Wn(.5,1,1,5,1);p.translate(0,.5,0);let _=D1(),x=(R,k)=>{let I=r.c(R);for(let D of rt){let U=D.s;if(R>U-2.4&&R<U+2.6&&k>I&&k<I+r.wR(U)+3.4||Math.abs(R-U)<.8&&k<I&&k>I-r.wL(U)-1||Math.abs(R-(U-1.9))<.7&&k>I&&Math.abs(k-(I+r.wR(U)+1.1))<.8)return!1}return!(R>Zt-2.6&&R<Zt+4&&Math.abs(k-I)<3.2||Math.abs(R-In.s)<2.2&&k<I&&k>I-r.wL(R)-3.2||R>55.4&&R<60&&k>I+.9&&k<I+3)},v=12,b=new te,S=new Ge,A=new P,E=new P,w=new ut,M=new P(0,1,0);for(let R=Wt+.5;R<Ie-1;R+=v){let k=[],I=[],D=[],U=[],N=[],W=[];for(let X of[-1,1])for(let K=R;K<Math.min(Ie-1,R+v);K+=.25){let Mt=L1(K,X)*e,Et=r.c(K),Ot=X<0?r.wL(K):r.wR(K);if(n()<.24*Mt){let se=Ot+.9+Math.pow(n(),1.4)*6.5,At=Et+X*se;if(Math.abs(At)>9.4||!x(K,At))continue;let Kt=r.worldXZ(K,At),O=r.bedH(K,At)-.05,Ue=4+n()*7,ee=.09+n()*.16,re=(n()-.5)*.25-X*.12,zt=n()<.55;k.push({x:Kt.x,y:O,z:Kt.z,h:Ue,r:ee,lean:re,pale:zt,s:K,d:At}),a.push({x:Kt.x,z:Kt.z,r:ee+.05});let xe=n()<.14,Bt=r.frame(K),L=xe?0:3+Math.floor(n()*3);for(let V=0;V<L;V++){let Q=(n()*1.6+.2)*(se<3?1:.5),nt=K+(n()-.5)*2.2,j=At-X*Q,Pt=r.worldXZ(nt,j),mt=1+n()*1.6;I.push({x:Pt.x,y:O+Ue*(.62+n()*.32),z:Pt.z,r:mt,sy:.65+n()*.3,hue:n(),lit:n()})}let T=xe?6:2;for(let V=0;V<T;V++)U.push({x:Kt.x,y:O+Ue*(.35+n()*.5),z:Kt.z,len:.8+n()*2.2,rx:(n()-.5)*2.4,ry:n()*6.28,r:.025+n()*.03})}if(n()<.55*Mt){let se=Ot+.3+Math.pow(n(),1.6)*4,At=Et+X*se;if(Math.abs(At)>9.6||!x(K,At))continue;let Kt=r.worldXZ(K,At),O=r.bedH(K,At),Ue=.3+n()*.7;for(let ee=0;ee<2;ee++)D.push({x:Kt.x+(n()-.5)*Ue,y:O+Ue*.35,z:Kt.z+(n()-.5)*Ue,r:Ue*(.7+n()*.5),hue:n()})}if(n()<.9*Mt){let se=Ot+.2+Math.pow(n(),1.3)*6,At=Et+X*se;if(Math.abs(At)>9.7||!x(K,At))continue;let Kt=r.worldXZ(K,At);W.push({x:Kt.x,y:r.bedH(K,At)-.01,z:Kt.z,h:.25+n()*.6,rot:n()*6.28,hue:n()})}if(n()<.025*Mt){let se=Ot+.25+n()*3,At=Et+X*se;if(!x(K,At))continue;let Kt=r.worldXZ(K,At);N.push({x:Kt.x,y:r.bedH(K,At)+.07,z:Kt.z,len:1+n()*2.5,r:.06+n()*.08,rot:n()*6.28})}}if(R<=53.8&&R+v>=50.4)for(let X=0;X<260*e;X++){let K=50.4+n()*3.4,Et=r.c(K)-r.wL(K)-.1-n()*4,Ot=r.worldXZ(K,Et);W.push({x:Ot.x,y:r.bedH(K,Et)-.01,z:Ot.z,h:.6+n()*.9,rot:n()*6.28,hue:.3+n()*.4})}let F=(X,K,Mt,Et,Ot=!0,se=i)=>{if(!Mt)return;let At=new dn(X,K,Mt);for(let Kt=0;Kt<Mt;Kt++)Et(Kt);return At.instanceMatrix.needsUpdate=!0,At.instanceColor&&(At.instanceColor.needsUpdate=!0),At.castShadow=Ot,At.receiveShadow=!0,At.computeBoundingSphere(),se.add(At),At},J=k.filter(X=>X.pale),it=k.filter(X=>!X.pale);for(let[X,K]of[[J,l],[it,c]]){let Mt=F(y,K,X.length,()=>{});Mt&&(X.forEach((Et,Ot)=>{S.setFromAxisAngle(new P(Math.cos(Et.s),0,Math.sin(Et.s)),Et.lean),b.compose(E.set(Et.x,Et.y,Et.z),S,A.set(Et.r,Et.h*.82,Et.r)),Mt.setMatrixAt(Ot,b)}),Mt.instanceMatrix.needsUpdate=!0,Mt.computeBoundingSphere())}let at=F(g,h,I.length,()=>{},!0,s);at&&(I.forEach((X,K)=>{S.setFromAxisAngle(M,X.hue*6.28),b.compose(E.set(X.x,X.y,X.z),S,A.set(X.r,X.r*X.sy,X.r)),at.setMatrixAt(K,b),w.setHSL(.22+X.hue*.08,.42+X.hue*.15,.2+X.lit*.14),at.setColorAt(K,w)}),at.instanceMatrix.needsUpdate=!0,at.instanceColor.needsUpdate=!0,at.computeBoundingSphere());let ft=F(m,d,D.length,()=>{});ft&&(D.forEach((X,K)=>{S.setFromAxisAngle(M,X.hue*6.28),b.compose(E.set(X.x,X.y,X.z),S,A.set(X.r,X.r*.75,X.r)),ft.setMatrixAt(K,b),w.setHSL(.17+X.hue*.12,.38+X.hue*.2,.17+X.hue*.12),ft.setColorAt(K,w)}),ft.instanceMatrix.needsUpdate=!0,ft.instanceColor.needsUpdate=!0,ft.computeBoundingSphere());let It=F(p,c,U.length,()=>{},!1);It&&(U.forEach((X,K)=>{S.setFromEuler(new ln(X.rx,X.ry,0)),b.compose(E.set(X.x,X.y,X.z),S,A.set(X.r,X.len,X.r)),It.setMatrixAt(K,b)}),It.instanceMatrix.needsUpdate=!0,It.computeBoundingSphere());let Y=F(p,l,N.length,()=>{});Y&&(N.forEach((X,K)=>{S.setFromEuler(new ln(Math.PI/2,X.rot,0,"YXZ")),b.compose(E.set(X.x,X.y,X.z),S,A.set(X.r,X.len,X.r)),Y.setMatrixAt(K,b)}),Y.instanceMatrix.needsUpdate=!0,Y.computeBoundingSphere());let et=F(_,f,W.length,()=>{},!1);et&&(W.forEach((X,K)=>{S.setFromAxisAngle(M,X.rot),b.compose(E.set(X.x,X.y,X.z),S,A.set(X.h*.9,X.h,X.h)),et.setMatrixAt(K,b),w.setHSL(.16+X.hue*.12,.45,.62+X.hue*.3),et.setColorAt(K,w)}),et.instanceMatrix.needsUpdate=!0,et.instanceColor.needsUpdate=!0,et.computeBoundingSphere())}return i.userData.trunks=a,i.userData.canopy=s,i}function jd(r,t,e){let n=r.attributes.position,i=De(e);for(let s=0;s<n.count;s++){let a=n.getX(s),o=n.getY(s),l=n.getZ(s),c=1+Cn(a*2+e,l*2+o,2,e)*t+(i()-.5)*t*.3;n.setXYZ(s,a*c,o*c,l*c)}return r.computeVertexNormals(),r}function D1(){let r=new Se(1,1);r.translate(0,.5,0);let t=r.clone();t.rotateY(Math.PI/2);let e=new Float32Array([...r.attributes.position.array,...t.attributes.position.array]),n=new Float32Array([...r.attributes.uv.array,...t.attributes.uv.array]),i=new Float32Array(e.length);for(let o=0;o<i.length;o+=3)i[o+1]=1;let s=[...r.index.array,...Array.from(t.index.array).map(o=>o+4)],a=new fe;return a.setAttribute("position",new oe(e,3)),a.setAttribute("normal",new oe(i,3)),a.setAttribute("uv",new oe(n,2)),a.setIndex(s),a}function k1(r){let t=[],e={},n={},i={};{let s=r.alt,a=8,o=.06,l=[],c=[],h=[],d=[],u=[],f=0;for(let y=s.s0+.3;y<=s.s1-.1;y+=o){let g=r.altD(y),m=r.altY(y);r.frame(y,n);let p=r.altY(y+.08);for(let _=0;_<a;_++){let x=-1.05+2.1*_/(a-1),v=g+x*s.w;r.worldXZ(y,v,i),l.push(i.x,m+.003,i.z),c.push(Math.max(0,m-r.bedH(y,v))),r.flowAt(y,v,m,0,n.tx,n.tz,e),h.push(e.vx,e.vz),d.push(Math.min(1,Math.max(.15,(m-p)*9)))}f++}for(let y=0;y<f-1;y++)for(let g=0;g<a-1;g++){let m=y*a+g;u.push(m,m+1,m+a,m+1,m+a+1,m+a)}t.push(tu(l,c,h,d,u))}for(let s of r.ponds){let a=[],o=[],l=[],c=[],h=[],d=r.y0(s.s)+s.lift,u=r.c(s.s)+s.dOff,f=20,y=5;for(let g=0;g<=y;g++)for(let m=0;m<f;m++){let p=g/y*1.04,_=m/f*Math.PI*2,x=s.s+Math.cos(_)*s.rs*p,v=u+Math.sin(_)*s.rd*p;r.worldXZ(x,v,i),a.push(i.x,d+.003,i.z),o.push(Math.max(0,d-r.bedH(x,v))),l.push(.02,.01),c.push(.02)}for(let g=0;g<y;g++)for(let m=0;m<f;m++){let p=g*f+m,_=g*f+(m+1)%f,x=p+f,v=_+f;h.push(p,x,_,_,x,v)}t.push(tu(a,o,l,c,h))}return t}function tu(r,t,e,n,i){let s=new fe;return s.setAttribute("position",new ie(r,3)),s.setAttribute("aDepth",new ie(t,1)),s.setAttribute("aFlow",new ie(e,2)),s.setAttribute("aFoam",new ie(n,1)),s.setIndex(i),s.computeBoundingSphere(),s}var F1=`
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
`,U1=`
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
`;function eu(r,t,e){let n=t==="low"?.12:.06,i=t==="low"?12:22,s=Math.floor((Ie-Wt)/n)+1,a=new Float32Array(s*i*3),o=new Float32Array(s*i),l=new Float32Array(s*i),c=new Float32Array(s*i*2),h={},d={},u={},f=r.rocks.filter(x=>{let v=r.waterLevel(x.s,x.d);return v>-1e8&&x.y+x.r>v&&x.y-x.r<v});for(let x=0;x<s;x++){let v=Math.min(Ie,Wt+x*n),b=r.c(v),S=r.wL(v),A=r.wR(v),E=r.y0(v),w=r.row(r.rFoam,v);r.frame(v,u);let M=f.filter(R=>Math.abs(R.s-v)<.5);for(let R=0;R<i;R++){let k=-1.04+2.08*R/(i-1),I=b+(k<0?k*S:k*A);r.worldXZ(v,I,h);let D=x*i+R;a[D*3]=h.x,a[D*3+1]=E+.003,a[D*3+2]=h.z,o[D]=E-r.bedH(v,I),r.flowAt(v,I,E,0,u.tx,u.tz,d),c[D*2]=d.vx,c[D*2+1]=d.vz;let U=w;for(let N of M){let W=Math.hypot(v-N.s,I-N.d),F=Math.sqrt(Math.max(0,N.r*N.r-(E-N.y)**2));W<F*3.2&&(U=Math.max(U,.75*Math.exp(-Math.max(0,W-F)/(F*.7))*Math.min(1,Math.hypot(d.vx,d.vz)*1.2)))}l[D]=U}}let y=[];for(let x=0;x<s-1;x++)for(let v=0;v<i-1;v++){let b=x*i+v,S=b+1,A=b+i,E=A+1;y.push(b,S,A,S,E,A)}let g=new fe;g.setAttribute("position",new oe(a,3)),g.setAttribute("aDepth",new oe(o,1)),g.setAttribute("aFlow",new oe(c,2)),g.setAttribute("aFoam",new oe(l,1)),g.setIndex(y),g.computeBoundingSphere();let m=Us.merge([ht.fog,{uTime:{value:0},uNormal:{value:null},uFoamTex:{value:null},uSunDir:{value:e.clone()},uSunColor:{value:new ut(1,.94,.82)},uSkyTop:{value:new ut(.36,.55,.82)},uSkyHorizon:{value:new ut(.78,.86,.9)},uShallow:{value:new ut(.1,.19,.17)},uDeep:{value:new ut(.025,.08,.08)},uDetail:{value:t==="low"?0:1}}]);m.uNormal.value=Vd(),m.uFoamTex.value=Xa(128),m.uFoamTex.value.wrapS=m.uFoamTex.value.wrapT=ii;let p=new je({vertexShader:F1,fragmentShader:U1,uniforms:m,transparent:!0,depthWrite:!1,fog:!0}),_=new pt;_.material=p;for(let x of Wc(g,s,i,Math.round(10/n))){let v=new Nt(x,p);v.renderOrder=2,_.add(v)}for(let x of k1(r)){let v=new Nt(x,p);v.renderOrder=2,_.add(v)}return _.name="water",_}var N1=`
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
`,B1=`
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
`;function nu(r){let t=new pt,e=$d(),n=Us.merge([ht.fog,{uTex:{value:null},uTime:{value:0}}]);n.uTex.value=e;let i=new je({vertexShader:N1,fragmentShader:B1,uniforms:n,transparent:!0,depthWrite:!1,side:ye,fog:!0}),s={},a=[];for(let o of es){let l=o.s-o.len/2-.01,c=r.y0(l-.02),h=r.y0(o.s+.6),d=r.row(r.rU,l-.1),u=Math.sqrt(2*(c-h)/9.81),f=12,y=14,g=[],m=[],p=[],_=[];for(let b=0;b<y;b++){let S=b/(y-1),A=u*S,E=d*A*.9,w=c+.012-.5*9.81*A*A;for(let M=0;M<f;M++){let R=-.92+1.84*M/(f-1),k=l+E,I=r.c(l)+(r.c(k)-r.c(l))*.6,D=R<0?r.wL(l):r.wR(l),U=1+S*.25;r.worldXZ(k,I+R*D*U,s),g.push(s.x,w,s.z),m.push(M/(f-1),S*(c-h)*1.5),p.push(Math.min(1,.35+o.h*.4)*(1-.3*S))}}for(let b=0;b<y-1;b++)for(let S=0;S<f-1;S++){let A=b*f+S,E=A+1,w=A+f,M=w+1;_.push(A,w,E,E,w,M)}let x=new fe;x.setAttribute("position",new ie(g,3)),x.setAttribute("uv",new ie(m,2)),x.setAttribute("aAlpha",new ie(p,1)),x.setIndex(_),x.computeBoundingSphere();let v=new Nt(x,i);v.renderOrder=3,t.add(v),r.worldXZ(o.s+d*u*.9,r.c(o.s+.3),s),a.push({step:o,base:new P(s.x,h,s.z),h:o.h,width:r.wL(l)+r.wR(l)})}return t.userData.uniforms=n,t.userData.sheets=a,t}function O1(r){return r&Ce.REPLICA?4:r&Ce.NCN?3:r&Ce.STAMP?2:r&Ce.PREMIUM?1:0}var Ka=class{constructor(t,e){this.cap=520;let n=e==="low"?16:32,i=new un(.0335,n,Math.round(n*.6)),s=e==="low"?512:1024,a=[Bs({size:s}),Bs({band:!0,size:s}),Bs({band:!0,stamp:!0,size:s}),Bs({band:!0,ncn:!0,size:s}),Bs({band:!0,replica:!0,size:s})];this.meshes=a.map(c=>{let h=new Fa({map:c,roughness:.92,metalness:0,sheen:1,sheenRoughness:.55,sheenColor:new ut(.85,.95,.5)}),d=new dn(i,h,this.cap);return d.instanceMatrix.setUsage(li),d.setColorAt(0,new ut(1,1,1)),d.instanceColor.setUsage(li),d.castShadow=!0,d.receiveShadow=!0,d.frustumCulled=!1,d.count=0,t.add(d),d}),this.counts=[0,0,0,0,0],this.m4=new te,this.q=new Ge,this.p=new P,this.sc=new P(1,1,1),this.col=new ut;let o=new fe;this.markerPos=new Float32Array(this.cap*3),o.setAttribute("position",new oe(this.markerPos,3).setUsage(li)),this.markers=new Ta(o,new dr({color:15269690,size:7,sizeAttenuation:!1,depthTest:!0,transparent:!0,opacity:.95})),this.markers.frustumCulled=!1,this.markers.renderOrder=5,t.add(this.markers),this.nMarkers=0;let l=new Nt(new ka(.0335*1.5,.0335*1.9,32),new wn({color:16777215,transparent:!0,opacity:.8,depthWrite:!1,side:ye}));l.rotation.x=-Math.PI/2,l.visible=!1,l.renderOrder=4,t.add(l),this.ring=l}begin(){this.counts.fill(0),this.nMarkers=0}add(t,e,n,i,s,a,o,l,c=0,h=!1,d=0){let u=O1(t),f=this.counts[u];if(f>=this.cap)return;this.counts[u]++,this.q.set(s,a,o,l),this.p.set(e,n,i),this.m4.compose(this.p,this.q,this.sc);let y=this.meshes[u];y.setMatrixAt(f,this.m4);let g=1-.5*c,m=(Ze[d]||Ze[0]).felt;if(this.col.setRGB(g*m[0],g*m[1]*(1-.04*c),g*m[2]*(1-.1*c)),y.setColorAt(f,this.col),h&&this.nMarkers<this.cap){let p=this.nMarkers++*3;this.markerPos[p]=e,this.markerPos[p+1]=n+.05,this.markerPos[p+2]=i}}end(t){for(let e=0;e<this.meshes.length;e++){let n=this.meshes[e];n.count=this.counts[e],n.instanceMatrix.needsUpdate=!0,n.instanceColor&&(n.instanceColor.needsUpdate=!0)}this.markers.geometry.setDrawRange(0,this.nMarkers),this.markers.geometry.attributes.position.needsUpdate=!0,this.markers.visible=t}};var z1=`
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
`,H1=`
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
`,Pi=class{constructor(t,{cap:e,map:n,flat:i,color:s=16777215,blending:a=wi,order:o=3,lit:l=!1}){this.cap=e;let c=new za,h=new Se(1,1);c.index=h.index,c.attributes.position=h.attributes.position,c.attributes.uv=h.attributes.uv,this.pos=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),this.rot=new Float32Array(e),c.setAttribute("iPos",new Mn(this.pos,3).setUsage(li)),c.setAttribute("iSize",new Mn(this.size,1).setUsage(li)),c.setAttribute("iAlpha",new Mn(this.alpha,1).setUsage(li)),c.setAttribute("iRot",new Mn(this.rot,1).setUsage(li)),c.instanceCount=0;let d=Us.merge([ht.fog,{uMap:{value:null},uFlat:{value:i?1:0},uColor:{value:new ut(s)}}]);d.uMap.value=n;let u=new je({vertexShader:z1,fragmentShader:H1,uniforms:d,transparent:!0,depthWrite:!1,blending:a,fog:!0,side:ye});this.mesh=new Nt(c,u),this.mesh.frustumCulled=!1,this.mesh.renderOrder=o,t.add(this.mesh),this.items=[]}spawn(t){return this.items.length>=this.cap&&this.items.shift(),t.age=0,this.items.push(t),t}upload(){let t=this.items.length;for(let n=0;n<t;n++){let i=this.items[n];this.pos[n*3]=i.x,this.pos[n*3+1]=i.y,this.pos[n*3+2]=i.z,this.size[n]=i.size,this.alpha[n]=i.alpha,this.rot[n]=i.rot||0}let e=this.mesh.geometry;e.instanceCount=t;for(let n of["iPos","iSize","iAlpha","iRot"])e.attributes[n].needsUpdate=!0}},Ja=class{constructor(t,e,n){this.creek=e,this.q=n;let i=n==="low"?.4:n==="medium"?.7:1;this.mult=i,this.rnd=De(4),this.foam=new Pi(t,{cap:Math.round(1600*i),map:Xa(64),flat:!0,order:3}),this.ripples=new Pi(t,{cap:Math.round(500*i)+100,map:Wd(),flat:!0,order:3}),this.drops=new Pi(t,{cap:500,map:$a(32),flat:!1,color:15267071,order:4}),this.mist=new Pi(t,{cap:Math.round(160*i)+20,map:$a(64),flat:!1,color:15922936,order:4}),this.leaves=new Pi(t,{cap:220,map:qd(),flat:!0,order:3}),this.sparks=new Pi(t,{cap:80,map:$a(32),flat:!1,color:16773536,order:6,blending:la}),this.fl={},this.loc={},this.fr={},this.spawnAcc=0,this.falls=[];for(let s=0;s<70*i;s++)this.spawnLeafOnWater(-5+this.rnd()*110)}setFalls(t){this.falls=t}spawnLeafOnWater(t){let e=this.creek,i=e.c(t)+(this.rnd()-.5)*(e.wL(t)+e.wR(t))*.8,s=e.worldXZ(t,i,{});this.leaves.spawn({x:s.x,y:e.y0(t)+.004,z:s.z,size:.045+this.rnd()*.03,alpha:1,rot:this.rnd()*6.28,life:60+this.rnd()*60,hint:-1,vy:0,air:!1,spin:(this.rnd()-.5)*.5})}splash(t,e,n,i){let s=Math.min(26,6+i*4)*this.mult;for(let a=0;a<s;a++){let o=this.rnd()*6.28,l=(.3+this.rnd()*.6)*Math.min(3,i)*.6;this.drops.spawn({x:t,y:e+.01,z:n,vx:Math.cos(o)*l,vy:.6+this.rnd()*i*.5,vz:Math.sin(o)*l,size:.008+this.rnd()*.01,alpha:.9,life:.7})}this.ripple(t,e,n,.05,.6,1.4),this.ripple(t,e,n,.03,.45,1)}ripple(t,e,n,i,s,a,o=.55){this.ripples.spawn({x:t,y:e+.002,z:n,size:i,grow:s,alpha:o,a0:o,life:a,rot:0})}sparkle(t,e,n){for(let i=0;i<14;i++){let s=this.rnd()*6.28;this.sparks.spawn({x:t,y:e,z:n,vx:Math.cos(s)*.4,vy:.4+this.rnd()*.6,vz:Math.sin(s)*.4,size:.02,alpha:1,life:.6})}}update(t,e,n){let i=this.creek,s=this.rnd,a=this.mult;this.spawnAcc+=t;let l=i.locate(n.x,n.z,-1,this.loc).s,c=Math.max(8,Math.min(60,n.y*1.2+6)),h=160*a,d=Math.floor(this.spawnAcc*h);this.spawnAcc-=d/h;for(let v=0;v<d;v++){let b=l+(s()-.5)*2*c;if(b<-5||b>107)continue;let S=i.row(i.rFoam,b);if(s()>S*.9+.04)continue;let E=i.c(b)+(s()-.5)*(i.wL(b)+i.wR(b))*.85,w=i.worldXZ(b,E,{});this.foam.spawn({x:w.x,y:i.y0(b)+.004,z:w.z,size:.03+s()*.05*(.5+S),alpha:0,a0:.5+S*.4,life:2+s()*3,rot:s()*6.28,hint:-1})}for(let v of this.falls){let b=v.h*8*t*a;for(let S=0;S<b||S===0&&s()<b;S++)this.mist.spawn({x:v.base.x+(s()-.5)*v.width,y:v.base.y+.05,z:v.base.z+(s()-.5)*v.width,vx:(s()-.5)*.3,vy:.2+s()*.4,vz:(s()-.5)*.3,size:.1+s()*.2*v.h,alpha:0,a0:.18,life:1.6+s(),grow:.3})}if(s()<t*6*a){let v=76.8+s()*2.6,b=.5+s()*2.2,S=i.worldXZ(v,b,{}),A=i.y0(78.3)+1.2+s()*1.5;this.mist.spawn({x:S.x,y:A,z:S.z,vx:0,vy:-.6,vz:0,size:.25+s()*.3,alpha:0,a0:.16,life:2.5,grow:.2,wind:!0})}if(s()<t*.9){let v=76.5+s()*3,b=.3+s()*2.5,S=i.worldXZ(v,b,{});this.leaves.spawn({x:S.x,y:i.y0(78.3)+2.5+s()*2,z:S.z,size:.05,alpha:1,rot:s()*6.28,life:50,hint:-1,vy:-.4,air:!0,spin:2})}s()<t*.25&&this.leaves.items.length<160&&this.spawnLeafOnWater(-4+s()*108);let u=(v,b)=>{let S=i.locate(v.x,v.z,v.hint??-1,this.loc);return v.hint=S.idx,i.flowAt(S.s,S.d,i.y0(S.s),e,S.tx,S.tz,this.fl),v.x+=this.fl.vx*t*b,v.z+=this.fl.vz*t*b,v.y=i.y0(S.s)+.004,S},f=this.foam.items;for(let v=f.length-1;v>=0;v--){let b=f[v];if(b.age+=t,b.age>b.life){f.splice(v,1);continue}let S=u(b,1);if(!i.inChannel(S.s,S.d,0)){f.splice(v,1);continue}b.alpha=b.a0*Math.min(1,b.age*3)*(1-b.age/b.life)}this.foam.upload();let y=this.ripples.items;for(let v=y.length-1;v>=0;v--){let b=y[v];if(b.age+=t,b.age>b.life){y.splice(v,1);continue}b.size+=b.grow*t,b.alpha=b.a0*(1-b.age/b.life)}this.ripples.upload();let g=this.drops.items;for(let v=g.length-1;v>=0;v--){let b=g[v];if(b.age+=t,b.age>b.life){g.splice(v,1);continue}b.vy-=9.81*t,b.x+=b.vx*t,b.y+=b.vy*t,b.z+=b.vz*t,b.alpha=.9*(1-b.age/b.life)}this.drops.upload();let m=this.sparks.items;for(let v=m.length-1;v>=0;v--){let b=m[v];if(b.age+=t,b.age>b.life){m.splice(v,1);continue}b.vy-=2*t,b.x+=b.vx*t,b.y+=b.vy*t,b.z+=b.vz*t,b.alpha=1-b.age/b.life}this.sparks.upload();let p=this.mist.items,_={};for(let v=p.length-1;v>=0;v--){let b=p[v];if(b.age+=t,b.age>b.life){p.splice(v,1);continue}if(b.wind){let A=i.locate(b.x,b.z,-1,this.loc);i.windAt(A.s,A.d,b.y,e,_),b.vx+=(_.vx*.4-b.vx)*t*2,b.vy+=(_.vy*.35-b.vy)*t*2,b.vz+=(_.vz*.4-b.vz)*t*2}b.x+=b.vx*t,b.y+=b.vy*t,b.z+=b.vz*t,b.size+=(b.grow||0)*t;let S=b.age/b.life;b.alpha=b.a0*Math.sin(Math.PI*S)}this.mist.upload();let x=this.leaves.items;for(let v=x.length-1;v>=0;v--){let b=x[v];if(b.age+=t,b.age>b.life){x.splice(v,1);continue}if(b.air){let S=i.locate(b.x,b.z,-1,this.loc);i.windAt(S.s,S.d,b.y,e,_),b.x+=(_.vx*.5+Math.sin(e*3+v)*.2)*t,b.z+=(_.vz*.5+Math.cos(e*2.6+v)*.2)*t,b.y+=(b.vy+_.vy*.25)*t,b.rot+=b.spin*t;let A=Math.max(i.bedH(S.s,S.d),i.waterLevel(S.s,S.d));b.y<=A+.004&&(b.air=!1,b.y=A+.004,b.hint=-1,i.waterLevel(S.s,S.d)<-1e8&&(b.life=b.age+8))}else{let S=i.locate(b.x,b.z,b.hint??-1,this.loc);b.hint=S.idx,i.inChannel(S.s,S.d,0)&&(i.flowAt(S.s,S.d,i.y0(S.s),e,S.tx,S.tz,this.fl),b.x+=this.fl.vx*t*.9,b.z+=this.fl.vz*t*.9,b.y=i.y0(S.s)+.004,b.rot+=b.spin*t*.3,S.s>106&&(b.life=0))}b.alpha=Math.min(1,(b.life-b.age)*.5)}this.leaves.upload()}};var Bn=r=>new P(r[0],r[1],r[2]),G={};function Os(){return G.wood||(G.wood=new Ft({map:Hc(256,"#a0703f"),roughness:.8}),G.darkWood=new Ft({map:Hc(256,"#6b4a2a"),roughness:.85}),G.steel=new Ft({color:10134443,metalness:.75,roughness:.35}),G.darkSteel=new Ft({color:4014922,metalness:.6,roughness:.45}),G.green=new Ft({color:3107653,metalness:.3,roughness:.5}),G.brass=new Ft({color:13214026,metalness:.85,roughness:.3}),G.blue=new Ft({color:2384568,metalness:.4,roughness:.4}),G.red=new Ft({color:12728875,metalness:.4,roughness:.35}),G.rubber=new Ft({color:2236964,roughness:.9}),G.yellow=new Ft({color:15906354,roughness:.55}),G.orange=new Ft({color:15299883,roughness:.6}),G.white=new Ft({color:15790314,roughness:.35}),G.bark=new Ft({map:Ki(),roughness:1}),G.root=new Ft({color:5980976,map:Ki(),roughness:.95}),G.glass=new Ft({color:12572896,transparent:!0,opacity:.35,roughness:.1,metalness:.1}),G.mesh=(()=>{let r=document.createElement("canvas");r.width=r.height=64;let t=r.getContext("2d");t.strokeStyle="#cfd5d8",t.lineWidth=3;for(let n=0;n<=64;n+=16)t.beginPath(),t.moveTo(n,0),t.lineTo(n,64),t.stroke(),t.beginPath(),t.moveTo(0,n),t.lineTo(64,n),t.stroke();let e=new Ri(r);return e.wrapS=e.wrapT=ii,e.repeat.set(6,3),new Ft({map:e,transparent:!0,alphaTest:.3,side:ye,metalness:.6,roughness:.4})})(),G.lamp=new Ft({color:3359795,emissive:0,roughness:.3}),G.laser=new wn({color:16719904,transparent:!0,opacity:.8})),G}function xt(r,t,e,n,i=0,s=0,a=0){let o=new Nt(new Xi(r,t,e),n);return o.position.set(i,s,a),o.castShadow=!0,o.receiveShadow=!0,o}function Ye(r,t,e,n,i=12){let s=new Nt(new Wn(r,t,e,i),n);return s.castShadow=!0,s.receiveShadow=!0,s}function qt(r,t,e,n,i=10){let s=r.isVector3?r:Bn(r),a=t.isVector3?t:Bn(t),o=s.distanceTo(a),l=Ye(e,e,o,n,i);return l.position.copy(s).add(a).multiplyScalar(.5),l.quaternion.setFromUnitVectors(new P(0,1,0),a.clone().sub(s).normalize()),l}function qc(r,t){let e=xt(r.h[0]*2,r.h[1]*2,r.h[2]*2,t),n=new te().makeBasis(Bn(r.ax),Bn(r.ay),Bn(r.az));return e.quaternion.setFromRotationMatrix(n),e.position.set(r.cx,r.cy,r.cz),e}function $c(r,t){let e=new pt,n=new P(r.ax,r.ay,r.az),i=new P(r.bx,r.by,r.bz);e.add(qt(n,i,r.r,t));for(let s of[n,i]){let a=new Nt(new un(r.r,10,8),t);a.position.copy(s),a.castShadow=!0,e.add(a)}return e}function hi(r,t,e){let n=new Ea(new hr({map:r,depthWrite:!1}));return n.scale.set(t,e,1),n}var ja=class{constructor(t,e,n=0){this.creek=e,this.site=n,Os();let i=new pt;this.group=i,t.add(i);let s=xt(1.35,.045,.62,G.wood,-.15,.53,0);i.add(s);for(let[c,h]of[[-.78,-.26],[-.78,.26],[.47,-.26],[.47,.26]]){i.add(xt(.05,.5,.05,G.darkWood,c,.26,h));let d=Ye(.06,.06,.03,G.rubber,14);d.rotation.x=Math.PI/2,d.position.set(c,.06,h+(h>0?.04:-.04)),i.add(d)}i.add(xt(1.3,.03,.5,G.darkWood,-.15,.16,0));let a=qt([.55,.4,-.22],[.75,.62,-.22],.012,G.darkWood);i.add(a);let o=qt([.55,.4,.22],[.75,.62,.22],.012,G.darkWood);i.add(o),i.add(qt([.75,.62,-.22],[.75,.62,.22],.014,G.darkWood)),this.hand=new pt,this.hand.add(xt(.18,.03,.14,G.darkSteel,0,.565,0));let l=Ye(.04,.04,.16,new Ft({color:13623356,roughness:1}),16);l.rotation.z=Math.PI/2,l.position.set(0,.6,.12),this.hand.add(l),this.hand.position.set(.27,0,.06),i.add(this.hand),this.press=new pt,i.add(this.press),this.heads=[],this.hopper=new pt,i.add(this.hopper),this.feeder=new pt,i.add(this.feeder),this.chute=new pt,i.add(this.chute),this.config=null,this.slots=[],this.k=-1,this.anim={press:0,flap:0,wheel:0,hand:0,headKick:[0,0]},this.home=new te,this.extras=new pt,i.add(this.extras),this.signLabel=hi(xn([rt[n].name,"New Creek Nation factory"],{w:640,h:160,font:"bold 46px Georgia, serif",bg:"#24361f"}),.72,.18),this.signLabel.position.set(.45,2.25,.3),i.add(qt([.45,0,.3],[.45,2.14,.3],.018,G.darkWood)),i.add(this.signLabel),this.counterCanvas=document.createElement("canvas"),this.counterCanvas.width=256,this.counterCanvas.height=128,this.counterTex=new Ri(this.counterCanvas),this.counterTex.colorSpace=He,this.counterT=0,this.placeAt(n)}frameFor(t,e={}){let n=this.creek,i=n.pads[t],s=i.sC,a=n.c(rt[t].s),o=n.wR(rt[t].s),l=n.worldXZ(s,a+o+1.05),c=n.frame(s);return e.pos=new P(l.x,i.y,l.z),e.yaw=Math.atan2(-c.tz,c.tx),e}placeAt(t){let e=this.frameFor(t);this.group.position.copy(e.pos),this.group.rotation.set(0,e.yaw,0),this.group.updateMatrixWorld(!0),this.k!==t&&(this.k=t,this.buildChute(t))}buildChute(t){this.chute.clear();let e=this.creek.chuteFor(t),n=new te().copy(this.group.matrixWorld).invert(),i=[Bn(e.R0),Bn(e.M),Bn(e.E)].map(d=>d.applyMatrix4(n));this.chutePts=i;for(let d=0;d<2;d++){let u=i[d],f=i[d+1],y=f.clone().sub(u),g=y.length();y.normalize();let m=new Ge().setFromUnitVectors(new P(1,0,0),y),p=new pt;p.quaternion.copy(m),p.position.copy(u).add(f).multiplyScalar(.5),p.add(xt(g+.02,.012,.11,G.wood,0,-.006,0)),p.add(xt(g+.02,.07,.01,G.wood,0,.03,.057)),p.add(xt(g+.02,.07,.01,G.wood,0,.03,-.057));let _=xt(g,.003,.07,G.white,0,.001,0);if(_.name="lining",p.add(_),this.chute.add(p),d===0){let x=u.clone().lerp(f,.55);this.chute.add(qt([x.x,x.y-.01,x.z-.05],[x.x,x.y-.45,x.z-.05],.01,G.darkWood)),this.chute.add(qt([x.x,x.y-.01,x.z+.05],[x.x,x.y-.45,x.z+.05],.01,G.darkWood))}}let s=i[2],a=i[1];this.sensor=new pt;let o=xt(.04,.05,.03,G.darkSteel,0,.06,-.08),l=xt(.04,.05,.03,G.darkSteel,0,.06,.08),c=xt(.004,.004,.16,G.laser,0,.045,0);this.sensor.add(o,l,c),this.sensor.position.copy(a.clone().lerp(s,.4));let h=s.clone().sub(a).normalize();this.sensor.rotation.y=Math.atan2(-h.z,h.x),this.chute.add(this.sensor),this.config=null}configure(t){let e=[...t].sort().join(",");if(e===this.config)return;this.config=e;let n=i=>t.has(i);if(this.extras.clear(),this.counter=null,n("batchCounter")){let i=new Nt(new Se(.22,.11),new wn({map:this.counterTex}));i.position.set(-.3,1,-.17),this.extras.add(xt(.24,.13,.03,G.darkSteel,-.3,1,-.19)),this.extras.add(i),this.extras.add(qt([-.3,.6,-.19],[-.3,.94,-.19],.008,G.darkSteel)),this.counter=i}if(n("infeedTray")&&this.extras.add(xt(.16,.02,.12,G.steel,-.82,.62,.12)),n("fastFelt")&&this.extras.add(xt(.22,.03,.18,new Ft({color:13623356,roughness:1}),-.15,.565,.18)),n("parallelFelt")&&this.extras.add(xt(.22,.03,.18,new Ft({color:12110896,roughness:1}),.1,.565,.2)),n("shapeGauge")&&(this.extras.add(xt(.08,.12,.08,G.blue,-.08,.66,-.06)),this.extras.add(qt([-.08,.72,-.06],[-.2,.72,-.06],.006,G.steel))),n("ncnStamp")){this.extras.add(xt(.12,.2,.1,G.red,.3,.66,-.15));let i=hi(xn("NCN",{w:256,h:96,font:"bold 64px sans-serif",bg:"#7a1d14",border:"#f6f1d8"}),.14,.05);i.position.set(.3,.84,-.15),this.extras.add(i)}if(n("replicaJig")&&this.extras.add(xt(.1,.1,.1,G.brass,.42,.61,.15)),this.press.clear(),this.heads=[],n("press")){let i=n("twinPress")?2:1,s=n("turbo")?G.red:G.green,a=xt(.3,.03,i===2?.46:.24,G.darkSteel,-.6,.565,i===2?0:.12);this.press.add(a);let o=i===2?[.12,-.12]:[.12],l=Math.min(...o)-.11,c=Math.max(...o)+.11;for(let h of[l,c])this.press.add(xt(.05,.5,.05,s,-.6,.83,h));this.press.add(xt(.12,.08,c-l+.05,s,-.6,1.09,(l+c)/2));for(let h of o){let d=new pt;d.add(qt([0,0,0],[0,.22,0],.018,G.steel)),d.add(xt(.12,.05,.12,s,0,-.01,0));let u=n("quickMold")?G.brass:G.steel,f=new Nt(new un(.045,16,8,0,Math.PI*2,0,Math.PI/2),u);f.rotation.x=Math.PI,f.position.y=-.035,d.add(f),d.position.set(-.6,.86,h),this.press.add(d);let y=new Nt(new un(.045,16,8,0,Math.PI*2,0,Math.PI/2),u);y.rotation.x=Math.PI,y.position.set(-.6,.625,h),this.press.add(y),this.heads.push({head:d,z:h,lower:y}),this.press.add(qt([-.52,.62,h],[-.38,.68,-.06],.008,G.steel))}if(n("servo")||n("turbo")){let h=Ye(.05,.05,.14,G.blue,16);h.rotation.z=Math.PI/2,h.position.set(-.6,1.17,(l+c)/2),this.press.add(h),this.press.add(qt([-.6,1.17,c],[-.6,.6,c+.06],.006,G.rubber))}if(n("turbo")){let h=Ye(.09,.09,.02,G.darkSteel,20);h.rotation.x=Math.PI/2,h.position.set(-.6,.95,c+.05),this.flywheel=h,this.press.add(h);let d=xt(.02,.4,.01,new Ft({color:16733491,emissive:16724753,emissiveIntensity:1.2}),-.53,.83,c);this.press.add(d)}else this.flywheel=null}if(this.hopper.clear(),n("press")){let i=n("bulkHopper")?40:n("hopperExt")?20:8,s=i===40?.3:i===20?.24:.2,a=i===40?.3:.2,o=i===40?.3:i===20?.32:.16,l=-.3,c=-.06,h=.6,d=G.glass;this.hopper.add(xt(s,.01,a,G.darkSteel,l,h-.005,c)),this.hopper.add(xt(s,o,.006,d,l,h+o/2,c-a/2)),this.hopper.add(xt(s,o,.006,d,l,h+o/2,c+a/2)),this.hopper.add(xt(.006,o,a,d,l-s/2,h+o/2,c)),this.hopper.add(xt(.006,o,a,d,l+s/2,h+o/2,c));for(let[g,m]of[[-1,-1],[-1,1],[1,-1],[1,1]])this.hopper.add(xt(.012,o+.02,.012,G.darkSteel,l+g*s/2,h+o/2,c+m*a/2));this.hopper.add(xt(.012,.012,a,G.darkSteel,l-s/2,h+o,c)),this.hopper.add(xt(.012,.012,a,G.darkSteel,l+s/2,h+o,c));let u=Math.max(1,Math.floor((s-.01)/(.0335*2.05)))*Math.max(1,Math.floor((a-.01)/(.0335*2.05))),f=Math.max(1,Math.floor((s-.01)/(.0335*2.05))),y=Math.max(1,Math.floor((a-.01)/(.0335*2.05)));this.slots=[];for(let g=0;g<i;g++){let m=Math.floor(g/u),p=g%u,_=p%f,x=Math.floor(p/f);this.slots.push(new P(l-(f-1)*.0335*2.05/2+_*.0335*2.05+m%2*.008,h+.0335+.003+m*.0335*1.75,c-(y-1)*.0335*2.05/2+x*.0335*2.05))}i===40?(this.gaugeBg=xt(.03,o,.01,G.rubber,l+s/2+.03,h+o/2,c-a/2+.02),this.gauge=xt(.022,o,.012,new Ft({color:5627221,emissive:2271778,emissiveIntensity:.8}),l+s/2+.03,h+o/2,c-a/2+.02),this.gaugeH=o,this.gaugeY=h,this.hopper.add(this.gaugeBg,this.gauge)):this.gauge=null}else this.slots=[];if(this.feeder.clear(),this.wheel=null,this.flap=null,n("feeder"))if(this.feeder.add(xt(.12,.08,.1,G.green,-.13,.6,-.2)),n("indexed")||n("turbo")){let i=new pt,s=Ye(.07,.07,.03,G.yellow,8);s.rotation.x=Math.PI/2,i.add(s);for(let a=0;a<6;a++){let o=a/6*Math.PI*2,l=xt(.02,.025,.034,G.darkSteel,Math.cos(o)*.06,Math.sin(o)*.06,0);l.rotation.z=o,i.add(l)}i.position.set(-.04,.63,-.26),this.wheel=i,this.feeder.add(i)}else{let i=xt(.01,.07,.09,G.steel,0,.035,0),s=new pt;s.add(i),s.position.set(-.04,.58,-.28),this.flap=s,this.feeder.add(s)}this.chute.traverse(i=>{i.name==="lining"&&(i.visible=n("lowFriction"))}),this.sensor&&(this.sensor.visible=n("spacingSensor"))}hopperSlotsWorld(){return this.slots.map(t=>t.clone().applyMatrix4(this.group.matrixWorld))}moldWorld(t){let e=this.heads[t];return e?new P(-.6,.625+.0335*.2,e.z).applyMatrix4(this.group.matrixWorld):null}handWorld(){return new P(.27,.58+.0335,.06).applyMatrix4(this.group.matrixWorld)}feederWorld(){return new P(-.1,.8,-.2).applyMatrix4(this.group.matrixWorld)}pressWorld(){return new P(-.6,1.25,0).applyMatrix4(this.group.matrixWorld)}update(t,e){let n=this.anim,i=e.sites[this.site];n.flap=Math.max(0,n.flap-t*3),n.hand=Math.max(0,n.hand-t*2);let s=e.siteNumbers(this.site),a=i.pressProg;if(this.heads.forEach((o,l)=>{let c;this.heads.length===2?c=(a+(l===i.pressCount%2?0:.5))%1:c=a;let h=c>.75&&!i.pressStatus?Math.sin((c-.75)/.25*Math.PI):0,d=n.headKick[l];o.head.position.y=.86-h*.14+d*.04,n.headKick[l]=Math.max(0,d-t*(i.owned.has("quickMold")?6:3))}),this.flywheel&&(this.flywheel.rotation.y+=t*20),this.wheel&&(this.wheel.rotation.z-=t*(i.feederStatus?.3:6/Math.max(.5,s.feeder))*(e.settings.auto&&i.enabled.feeder?1:0)),this.flap&&(this.flap.rotation.z=-n.flap*1.1),this.counter&&(this.counterT-=t,this.counterT<=0)){this.counterT=.5;let o=this.counterCanvas.getContext("2d");o.fillStyle="#081008",o.fillRect(0,0,256,128),o.fillStyle="#9dff8a",o.font="bold 20px monospace";let l=["STD","DRY","SOFT","SEAM","RAPID","SEL"];i.madeBy.forEach((h,d)=>{(h||d===i.recipe)&&o.fillText(`${l[d]} ${h}`,8+d%2*124,24+Math.floor(d/2)*26)});let c=60/(s.cycle*(i.recipe===5?1.15:1));o.fillStyle="#ffcf4a",o.fillText(`${i.pressStatus?"0":c.toFixed(0)}/min`,8,116),this.counterTex.needsUpdate=!0}if(this.gauge){let o=Math.max(.02,i.hopper.length/40);this.gauge.scale.y=o,this.gauge.position.y=this.gaugeY+this.gaugeH*o/2}this.hand.position.y=Math.sin(n.hand*Math.PI)*.02}onEvent(t){t.type==="pressed"&&t.site===this.site&&(this.anim.headKick[t.head%Math.max(1,this.heads.length)]=1),t.type==="launch"&&t.k===this.site&&(this.anim.flap=1),t.type==="handMade"&&t.site===this.site&&(this.anim.hand=1)}},Qa=class{constructor(t,e){Os(),this.creek=e;let n=new pt;t.add(n),this.group=n;let i=Zt,s=e.c(i),a=e.wR(i)+.07,o=(p,_,x)=>{let v=e.worldXZ(p,_);return new P(v.x,x,v.z)},l=e.frame(i),c=Math.atan2(-l.tz,l.tx),h=o(i,s-a,e.bedH(i,s-a)-.05),d=o(i,s+a,e.bedH(i,s+a)-.05),u=.9;n.add(qt(h,h.clone().setY(h.y+u),.04,G.wood)),n.add(qt(d,d.clone().setY(d.y+u),.04,G.wood));let f=Math.max(h.y,d.y)+u-.05;n.add(qt(h.clone().setY(f),d.clone().setY(f),.03,G.wood));let y=new Ft({map:xn("FINISH",{w:512,h:112,bg:"#1e3b23",border:"#e8d27a",font:"bold 70px Georgia, serif"}),roughness:.7});for(let p of[0,Math.PI]){let _=new Nt(new Se(a*1.6,.16),y);_.position.copy(h).lerp(d,.5).setY(f-.12),_.rotation.y=c-Math.PI/2+p,n.add(_)}this.lamps=[];for(let p of[h,d]){let _=new Nt(new un(.035,12,10),G.lamp.clone());_.position.copy(p).setY(p.y+u+.04),n.add(_),this.lamps.push(_)}let g=e.y0(i)+.09;n.add(qt(h.clone().setY(g),d.clone().setY(g),.002,G.darkSteel)),this.flag=new pt;let m=new Nt(new Se(.12,.08),new Ft({color:2867035,side:ye}));m.position.x=.06,this.flag.add(m),this.flag.position.copy(d).setY(d.y+u-.12),this.flag.rotation.y=c,n.add(this.flag),this.flash=0,this.yaw=c,this.basketGroup=new pt,n.add(this.basketGroup),this.P=o,this.board=null,this.boardCanvas=document.createElement("canvas"),this.boardCanvas.width=512,this.boardCanvas.height=320,this.boardTex=new Ri(this.boardCanvas),this.boardTex.colorSpace=He,this.boardT=0,this.conv=new pt,n.add(this.conv),this.config="",this.slots=[],this.crateSlots=[],this.convBalls=[]}configure(t){let e=["wideBasket","conveyor","timingGate","splitTray","overflowCrate","laneMarkers","poweredBelt","twinPacking","stacker","industrialCatch"].map(w=>t.has(w)?1:0).join("");if(e===this.config)return;this.config=e;let n=this.creek,i=this.P,s=t.has("wideBasket");this.basketGroup.clear();let a=Be-.05,o=s?.55:.32,l=n.c(Be),c=s?.32:.22,h=n.bedH(Be,l),d=n.y0(Be)+(s?.16:.12),u=n.frame(Be),f=Math.atan2(-u.tz,u.tx),y=i(a+o/2,l,(h+d)/2),g=new pt;g.position.copy(y),g.rotation.y=f;let m=d-h,p=(w,M,R,k,I,D)=>{let U=new Nt(new Se(w,M),G.mesh);U.position.set(R,k,I),U.rotation.y=D,g.add(U)};p(o,m,0,0,c,0),p(o,m,0,0,-c,0),p(c*2,m,o/2,0,0,Math.PI/2);let _=new Nt(new Se(o,c*2),G.mesh);_.rotation.x=-Math.PI/2,_.position.y=-m/2+.01,g.add(_);for(let[w,M]of[[-o/2,-c],[-o/2,c],[o/2,-c],[o/2,c]])g.add(xt(.012,m+.02,.012,G.steel,w,0,M));g.add(xt(o,.012,.012,G.steel,0,m/2,c)),g.add(xt(o,.012,.012,G.steel,0,m/2,-c)),this.basketGroup.add(g),this.slots=[];let x=Math.floor(o/(.0335*2.1)),v=Math.floor(c*2/(.0335*2.1)),b=s?14:6;for(let w=0;w<b;w++){let M=Math.floor(w/(x*v)),R=w%(x*v),k=-o/2+.0335*1.1+R%x*.0335*2.1,I=-c+.0335*1.1+Math.floor(R/x)*.0335*2.1,D=new P(k,-m/2+.0335+.012+M*.0335*1.8,I);g.updateMatrixWorld(!0),this.slots.push(D.applyMatrix4(g.matrixWorld))}let S=i(Be+o,l+.1,h+.02),A=i(Be+o+.6,l+.9,h-.05);if(this.basketGroup.add(qt(S,A,.045,G.darkSteel)),this.drainEnd=A,this.conv.clear(),this.crateSlots=[],t.has("conveyor")){let w=i(Be+o*.5,l-c-.02,d-.02),M=i(Be+.9,l-c-1,n.bedH(Be+.9,l-c-1)+.35),R=M.clone().sub(w),k=R.length(),I=new pt;I.position.copy(w).lerp(M,.5),I.quaternion.setFromUnitVectors(new P(1,0,0),R.clone().normalize()),I.add(xt(k,.015,.1,G.rubber)),I.add(xt(k,.03,.008,G.steel,0,.012,.055)),I.add(xt(k,.03,.008,G.steel,0,.012,-.055)),this.conv.add(I);for(let at=0;at<3;at++){let ft=w.clone().lerp(M,at/2);this.conv.add(qt(ft,ft.clone().setY(ft.y-.4),.012,G.darkSteel))}this.beltA=w,this.beltB=M;let D=i(Be+1.25,l-c-1.35,0);D.y=n.bedH(Be+1.25,l-c-1.35);let U=new pt;U.position.copy(D),U.rotation.y=f;let N=.5,W=.4,F=.28;U.add(xt(N,.02,W,G.wood,0,.01,0));for(let[at,ft,It,Y]of[[0,W/2,N,.02],[0,-W/2,N,.02],[N/2,0,.02,W],[-N/2,0,.02,W]])for(let et=0;et<3;et++)U.add(xt(It,.07,Y,G.wood,at,.05+et*.09,ft));this.conv.add(U),U.updateMatrixWorld(!0);let J=7,it=5;for(let at=0;at<70;at++){let ft=Math.floor(at/(J*it)),It=at%(J*it),Y=new P(-N/2+.04+It%J*.0335*2.02+ft%2*.02,.02+.0335+ft*.0335*1.7,-W/2+.04+Math.floor(It/J)*.0335*2.02+ft%2*.02);this.crateSlots.push(Y.applyMatrix4(U.matrixWorld))}}this.finExtras||(this.finExtras=new pt,this.group.add(this.finExtras)),this.finExtras.clear(),this.stackSlots=[];let E=Be;if(t.has("splitTray")){let w=new pt;w.position.copy(i(E+o+.35,l,h+.05)),w.rotation.y=f,w.add(xt(.36,.02,c*1.6,G.mesh,0,0,0));for(let M of[-c*.8,c*.8])w.add(xt(.36,.12,.012,G.steel,0,.06,M));this.finExtras.add(w)}if(t.has("overflowCrate")){let w=i(E+.4,l+c+1.2,0);w.y=n.bedH(E+.4,l+c+1.2);let M=new pt;M.position.copy(w),M.rotation.y=f;for(let k=0;k<4;k++)M.add(xt(.6,.08,.45,G.darkWood,0,.05+k*.1,0));let R=hi(xn("OVERFLOW",{w:384,h:96,font:"bold 48px sans-serif",bg:"#3b2a12"}),.36,.09);R.position.set(0,.55,0),M.add(R),this.finExtras.add(M),this.overflowPos=w}else this.overflowPos=null;if(t.has("laneMarkers"))for(let w of[-1,1]){let M=i(Zt-.8,n.c(Zt-.8)+w*.18,n.y0(Zt)+.004),R=i(Zt,n.c(Zt)+w*.18,n.y0(Zt)+.004);this.finExtras.add(qt(M,R,.006,w<0?G.orange:G.blue,6))}if(t.has("poweredBelt")||t.has("twinPacking")){let w=i(E+o*.5,l-c-.02,d+.03),M=i(E+.9,l-c-1,n.bedH(E+.9,l-c-1)+.38),R=6;for(let k=0;k<=R;k++){let I=w.clone().lerp(M,k/R),D=Ye(.012,.012,.12,t.has("twinPacking")?G.red:G.yellow,8);D.position.copy(I),D.rotation.x=Math.PI/2,D.rotation.y=f,this.finExtras.add(D)}if(t.has("twinPacking")){let k=w.clone().add(new P(0,0,.14)),I=M.clone().add(new P(0,0,.14));this.finExtras.add(qt(k,I,.05,G.rubber))}}if(t.has("industrialCatch")){let w=i(E+.2,l,n.y0(E)+.5),M=new pt;M.position.copy(w),M.rotation.y=f;for(let R of[-c-.15,c+.15])M.add(xt(.05,1,.05,G.yellow,0,0,R));M.add(xt(.05,.05,c*2+.35,G.yellow,0,.5,0)),this.finExtras.add(M)}if(t.has("stacker"))for(let w=0;w<6;w++){let M=i(E+1.6+w%3*.42,l+c+.9+Math.floor(w/3)*.42,0);M.y=n.bedH(E+1.6+w%3*.42,l+c+.9+Math.floor(w/3)*.42);let R=new pt;R.position.copy(M),R.rotation.y=f,R.add(xt(.36,.02,.3,G.wood,0,.01,0));for(let[I,D,U,N]of[[0,.15,.36,.015],[0,-.15,.36,.015],[.18,0,.015,.3],[-.18,0,.015,.3]])R.add(xt(U,.14,N,G.wood,I,.07,D));this.finExtras.add(R),R.updateMatrixWorld(!0);let k=[];for(let I=0;I<24;I++)k.push(new P(-.14+I%5*.068,.04+Math.floor(I/20)*.06,-.1+Math.floor(I/5)%4*.068).applyMatrix4(R.matrixWorld));this.stackSlots.push(k)}if(t.has("timingGate")&&!this.board){let w=i(Zt-.35,n.c(Zt)-n.wL(Zt)-.45,0);w.y=n.bedH(Zt-.35,n.c(Zt)-n.wL(Zt)-.45);let M=new pt;M.position.copy(w),M.rotation.y=this.yaw-Math.PI/2+.5,M.add(qt([0,0,0],[0,.9,0],.03,G.darkWood));let R=new Nt(new Se(.56,.35),new wn({map:this.boardTex}));R.position.set(0,1,.03),M.add(xt(.6,.39,.04,G.darkWood,0,1,0)),M.add(R);let k=R.clone();k.rotation.y=Math.PI,k.position.z=-.03,M.add(k),this.group.add(M),this.board=M}}drawBoard(t){let e=this.boardCanvas.getContext("2d");e.fillStyle="#0b120c",e.fillRect(0,0,512,320),e.fillStyle="#ffcf4a",e.font="bold 36px monospace",e.fillText("TIMING GATE",24,52),e.fillStyle="#9dff8a",e.font="bold 34px monospace";let n=t.lastFinish;e.fillText(`LAST    ${n?n.time.toFixed(1)+" s":"--"}`,24,118),e.fillText(`BALLS/MIN ${t.ballsPerMin(60).toFixed(1)}`,24,178);let i=t.routeStats[t.sel];e.fillText(`AVG     ${i.n?i.avg.toFixed(1)+" s":"--"}`,24,238),e.fillStyle="#7aa",e.font="24px monospace",e.fillText(`from ${rt[t.sel].name}`,24,292),this.boardTex.needsUpdate=!0}update(t,e){this.flash=Math.max(0,this.flash-t*2);for(let n of this.lamps)n.material.emissive.setRGB(.1+this.flash*.3,.2+this.flash*1.6,.1+this.flash*.4);this.flag.rotation.z=-this.flash*1.2,this.board&&(this.boardT-=t,this.boardT<=0&&(this.boardT=.5,this.drawBoard(e)))}onEvent(t){t.type==="finish"&&(this.flash=1)}},to=class{constructor(t,e){Os(),this.creek=e,this.scene=t,this.items={};let n=e.colliders,i=(a,o)=>{let l=new pt;for(let c of n)c.group===a&&(c.type===1?l.add($c(c,o)):c.type===2&&l.add(qc(c,o)));return l},s=(a,o)=>{o.visible=!1,t.add(o),this.items[a]=o};{let a=i("rootRail",G.steel),[o,l]=e.rootRailPts;for(let c of[o,l])a.add(qt([c[0],c[1]-.12,c[2]],[c[0],c[1]+.01,c[2]],.008,G.darkSteel));s("rootRail",a)}{let a=e.roughPatch,o=14,l=10,c=[],h=[];for(let y=0;y<o;y++){let g=a.s0-.05+(a.s1-a.s0+.1)*y/(o-1),m=e.c(g),p=e.wL(g)*.9,_=e.wR(g)*.9;for(let x=0;x<l;x++){let v=m-p+(p+_)*x/(l-1),b=e.worldXZ(g,v);c.push(b.x,e.matH(g,v)+.001,b.z)}}for(let y=0;y<o-1;y++)for(let g=0;g<l-1;g++){let m=y*l+g;h.push(m,m+l,m+1,m+1,m+l,m+l+1)}let d=new fe;d.setAttribute("position",new ie(c,3)),d.setIndex(h),d.computeVertexNormals();let u=new Nt(d,new Ft({color:2828840,roughness:.85,side:ye}));u.receiveShadow=!0;let f=new pt;f.add(u),s("gravelMat",f)}s("splashGuard",i("splashGuard",G.wood));{let a=new pt,o=e.poolGuidePts.map(Bn);for(let l=0;l<o.length-1;l++){let c=o[l],h=o[l+1],d=Math.ceil(c.distanceTo(h)/.16);for(let u=0;u<d;u++){let f=c.clone().lerp(h,(u+.5)/d),y=h.clone().sub(c).normalize(),g=Ye(.03,.03,.13,u%2?G.yellow:G.orange,10);g.quaternion.setFromUnitVectors(new P(0,1,0),y),g.position.copy(f),a.add(g)}}a.add(qt(o[0],o[0].clone().setY(o[0].y-.5),.006,G.darkSteel)),a.add(qt(o[o.length-1],o[o.length-1].clone().setY(o[0].y+.6),.006,G.darkSteel)),s("poolGuide",a)}{let a=i("catchRamp",G.wood),{a:o,b:l}=e.catchRamp;for(let c of[o,l])a.add(qt([c[0],c[1]-.4,c[2]],[c[0],c[1],c[2]],.02,G.darkWood));s("catchRamp",a)}{let a=i("debrisScreen",G.darkSteel),o=e.screenPts.map(Bn);for(let l=0;l<o.length;l++)a.add(qt(o[l].clone().setY(o[l].y-.5),o[l].clone().setY(o[l].y+.18),.012,G.darkSteel));for(let l=0;l<o.length-1;l++){let c=o[l],h=o[l+1],d=c.distanceTo(h),u=new Nt(new Se(d,.3),G.mesh);u.position.copy(c).lerp(h,.5).setY((c.y+h.y)/2+0),u.rotation.y=Math.atan2(-(h.z-c.z),h.x-c.x),a.add(u)}s("debrisScreen",a)}{let a=i("spillRail",G.steel);s("spillRail",a)}s("alderBypass",i("alderBypass",G.bark));{let a=i("landingBoards",G.wood);s("landingBoards",a)}{let a=new pt,o=xo.pivotS,c=e.c(o)+e.wR(o)+.25,h=e.worldXZ(o,c),d=e.bedH(o,c);a.position.set(h.x,d,h.z),a.add(xt(.14,.4,.14,G.yellow,0,.2,0)),a.add(xt(.2,.06,.2,G.darkSteel,0,.03,0));let u=new pt;u.position.y=.42;let f=e.wR(o)+e.wL(o)+.3,y=xt(f,.035,.035,G.yellow,-f/2,0,0);u.add(y);let g=xt(.03,.3,.5,G.rubber,-f+.05,-.28,0);u.add(g),u.add(qt([-.02,0,0],[-f+.05,-.13,0],.008,G.darkSteel)),a.add(u);let m=e.frame(o),p=new P(-m.nx,0,-m.nz);a.rotation.y=Math.atan2(p.z,-p.x),this.armPivot=u,s("clearingArm",a)}{let a=e.rootPts.map(Bn),o=new Ls(a),l=new Nt(new fr(o,24,.024,8,!1),G.root);l.castShadow=!0,l.receiveShadow=!0,t.add(l);let c=a[0];for(let f=0;f<4;f++){let y=[c.clone(),c.clone().add(new P((f-1.5)*.12,.05,.1*f)),c.clone().add(new P((f-1.5)*.25,-.1,.35))],g=new Nt(new fr(new Ls(y),10,.015,6,!1),G.root);t.add(g)}let h=c.clone().add(new P(0,-.05,0)),d=Ye(.13,.19,.42,G.bark,10);d.position.copy(h).setY(h.y+.12),d.castShadow=!0,t.add(d);let u=Ye(.125,.125,.01,new Ft({color:11569754,roughness:.9}),14);u.position.copy(h).setY(h.y+.335),t.add(u)}this.logMeshes=[0,1,2].map(()=>{let a=Ye(.032,.03,.54,G.bark,8);return a.castShadow=!0,t.add(a),a}),this.stakes={};for(let a of Li){if(a.tab!=="creek")continue;let o=this.spotPos(a.id);if(!o)continue;let l=new pt;l.position.copy(o),l.add(qt([0,0,0],[0,.45,0],.01,G.darkWood));let c=new Nt(new Se(.14,.09),new Ft({color:16747050,side:ye,emissive:4200448}));c.position.set(.07,.4,0),l.add(c);let h=hi(xn([a.name,`$${a.price.toLocaleString()}`],{w:512,h:160,font:"bold 50px sans-serif",bg:"#3b2a12"}),.75,.234);h.position.set(0,.7,0),l.add(h),l.userData.upgrade=a.id,l.visible=!1,t.add(l),this.stakes[a.id]=l}}spotPos(t){let e=this.creek,i={rootRail:[93.2,1],gravelMat:[95.4,-1],splashGuard:[85.6,-1],poolGuide:[88.2,1],catchRamp:[79,-1],debrisScreen:[57.5,-1],spillRail:[64.5,1],alderBypass:[46.5,-1],landingBoards:[9.6,1],clearingArm:[xo.pivotS+.4,1]}[t];if(!i)return null;let[s,a]=i,l=e.c(s)+a*((a<0?e.wL(s):e.wR(s))+.35),c=e.worldXZ(s,l);return new P(c.x,Math.max(e.bedH(s,l),e.y0(s)),c.z)}configure(t){for(let[e,n]of Object.entries(this.items))n.visible=t.owned.has(e);for(let[e,n]of Object.entries(this.stakes))n.visible=!t.owned.has(e)&&!t.blocked(e)}update(t,e,n){if(e.logs.forEach((s,a)=>{let o=this.logMeshes[a];o.position.set(s.x,s.y+.004+Math.sin(n*1.3+a)*.004,s.z);let l=new P(s.bx-s.ax,0,s.bz-s.az).normalize();o.quaternion.setFromUnitVectors(new P(0,1,0),l)}),this.armPivot){let s=e.arm.phase;this.armPivot.rotation.y=s>0?Math.sin(s*Math.PI)*1.1-.55:-.55,this.armPivot.rotation.x=0}let i=this.items.poolGuide;i.visible&&(i.position.y=Math.sin(n*1.7)*.004)}},eo=class{constructor(t,e){Os(),this.creek=e,this.markers=rt.map((n,i)=>{let s=n.s,a=e.c(s),o=a-e.wL(s)-.35,l=e.worldXZ(s,o),c=e.bedH(s,o),h=new pt;h.position.set(l.x,c,l.z),h.add(qt([0,-.1,0],[0,1.1,0],.025,G.darkWood));let d=new Nt(new Se(.3,.18),new Ft({color:3837770,side:ye}));d.position.set(.15,1,0),h.add(d),t.add(h);let u=e.worldXZ(s,a-e.wL(s)-.05),f=e.worldXZ(s,a+e.wR(s)+.05),y=qt([u.x,e.y0(s)+.11,u.z],[f.x,e.y0(s)+.11,f.z],.004,G.white);return t.add(y),{g:h,flag:d,label:null,k:i,state:""}})}update(t){this.markers.forEach(e=>{let n=e.k,s=t.sites[n].open?n===t.sel?"sel":"open":t.unlockable(n)?"next":"locked";if(s===e.state)return;e.state=s,e.flag.material.color.set(s==="sel"?15909424:s==="open"?3837770:s==="next"?16747050:7829367),e.label&&e.g.remove(e.label);let a=rt[n],o=s==="locked"||s==="next"?[a.name,`Unlock $${a.cost.toLocaleString()}`]:[a.name,`$${a.base}/ball \xB7 ~${Math.round(a.eta)}s`];e.label=hi(xn(o,{w:640,h:170,font:"bold 50px Georgia, serif",bg:s==="sel"?"#5a4410":"#2d3a1f"}),1.1,.29),e.label.position.set(0,1.4,0),e.g.add(e.label)})}};var Xc=r=>new P(r[0],r[1],r[2]),G1={slateBumpers:[-12.2,1],slateOutlet:[-7.9,1],leafGrate:[-14.75,-1],willowShield:[-26.1,1],willowFlare:[-22.9,-1],splitGate:[-51.6,1],splitMergeRail:[-40.8,1],basinBoom:[-69,1],basinVane:[-65.6,1],spillApron:[-90.2,1],spillSkimmer:[-87.8,1],sluiceAlternator:[-121.4,1],sluiceMerge:[-108.4,1],headGuide:[-146.5,-1],headRails:[-134.2,1],draftRibbon:[77.4,-1],windScreen:[76.2,-1],springsSampler:[58.2,-1],habitatBypass:[57.3,1],branchSweeper:[47.4,-1]};function V1(r){let t=(e,n,i=0)=>{let s=r.c(e)+n,a=r.worldXZ(e,s);return{s:e,d:s,x:a.x,y:Math.max(r.bedH(e,s),r.y0(e)),z:a.z}};return[{id:"waterfallZone",name:"Waterfall Zone",layer:"field",...t(86,1.2),note:"Historical area label at the falls. Waterfall Run is the game launch above it."},{id:"split",name:"Route split",layer:"field",...t(83.4,.6),note:"The creek-right branch is the primary waterfall route; the alternate route steps down on the creek-left. Approximate."},{id:"tapedSign",name:"Taped sign (about 20 ft upstream of the split)",layer:"field",...t(81.6,-.7),note:"Field sign on a fallen trunk. In game scale it stands about 1.8 m upstream of the split. Camera pin C (photo viewpoint) is a separate concept."},{id:"falls",name:"Falls (primary route)",layer:"field",...t(86,-.4),note:"The falls sit farther down the primary route, at the creator\u2019s red marks. Approximate."},{id:"shelf",name:"Continental Shelf",layer:"field",...t(72,.6),note:"Ledge along the creek\u2019s right side near the waterfall. Hidden portions are approximate."},{id:"shelfClimb",name:"Brushy opening and Shelf climb",layer:"field",...t(66.8,1.4),note:"Approach the brushy opening, then climb the Shelf to the Springs (photo IMG_8183). Placement compressed to game scale."},{id:"springsPonds",name:"Crawfish Springs double ponds",layer:"field",...t(57.7,1.8),note:"Secondary runoff chute off the main creek with a large double-pond spring and crawfish. Pond edges in game are illustrative, not surveyed."},{id:"flatRocks",name:"Flat Rocks (usual historical start)",layer:"field",...t(73.6,.7),note:"Broad slabs with an undercut. Game placement approximate."},{id:"clearing",name:"The Clearing and deep pools",layer:"field",...t(52.3,-.5),note:"Open reach where Nigatron, a large water bug, was found while carrying race balls upstream."},{id:"farlands",name:"Farlands entrance",layer:"field",...t(50.2,0),note:"Entry marker, not a boundary. The Farlands continue upstream; only one or two expeditions have gone in."},{id:"finish",name:"Regular finish (trail entrance)",layer:"field",...t(98.5,.6),note:"Provisional game placement. Historical coordinates stay unset until the creator shares an anchor."},{id:"norwayCavern",name:"Norway Cavern",layer:"field",unmapped:!0,note:"Site of the cut-branch extraction during the Great 300-Ball Race. Location not established."},{id:"crayfishPond",name:"Crayfish Pond",layer:"field",unmapped:!0,note:"A hawk was seen here during the 300-ball race. Separate from Crawfish Springs. Location not established."},{id:"peytonsPool",name:"Peyton\u2019s Pool",layer:"field",unmapped:!0,note:"#10 hemmy was recovered at or near here. Location not established."},{id:"nigusHowling",name:"Nigus Howling Point",layer:"field",unmapped:!0,note:"Named in expedition notes. Location not established."},{id:"leafCavern",name:"Leaf-hidden cavern (unnamed)",layer:"field",unmapped:!0,note:"From the 300-ball race records. Unnamed and separate from Norway Cavern. Location not established."}]}var no=class{constructor(t,e,n){Os(),this.scene=t,this.creek=e,this.items={},this.stakes={};let i=e,s=e.colliders,a=(d,u)=>{let f=new pt;for(let y of s)y.group===d&&(y.type===1?f.add($c(y,u)):y.type===2&&f.add(qc(y,u)));return f},o=(d,u)=>{u.visible=!1,t.add(u),this.items[d]=u},l=(d,u,f)=>{let y=new pt,g=d.map(Xc);for(let m=0;m<g.length-1;m++){let p=g[m],_=g[m+1],x=Math.ceil(p.distanceTo(_)/.16),v=_.clone().sub(p).normalize();for(let b=0;b<x;b++){let S=Ye(.028,.028,.13,b%2?u:f,10);S.quaternion.setFromUnitVectors(new P(0,1,0),v),S.position.copy(p.clone().lerp(_,(b+.5)/x)),y.add(S)}}return y};o("willowShield",a("willowShield",G.steel)),o("willowFlare",a("willowFlare",G.wood)),o("slateBumpers",a("slateBumpers",G.rubber)),o("leafGrate",a("leafGrate",G.darkSteel)),o("splitMergeRail",a("splitMergeRail",G.wood)),o("basinBoom",l(i.basinBoomPts,G.yellow,G.orange)),o("spillApron",a("spillApron",G.wood)),o("headGuide",l(i.headGuidePts,G.white,G.blue)),o("headRails",a("headRails",G.steel)),o("habitatBypass",a("habitatBypass",G.bark));{let d=new pt,u=Xc(i.splitGatePivot);d.position.copy(u),d.add(Ye(.05,.06,.5,G.darkSteel,10).translateY(.1));let f=new pt,y=.95,g=xt(y,.04,.05,G.wood,y/2,0,0);f.add(g),d.add(f);let m=i.frame(-51.15);d.rotation.y=Math.atan2(m.tz,-m.tx),this.gateArm=f,o("splitGate",d)}{let d=new pt;d.position.copy(Xc(i.sluicePivot)),d.add(Ye(.04,.05,.4,G.darkSteel,10).translateY(.1));let u=new pt;u.add(xt(.7,.05,.03,G.steel,.35,0,0)),d.add(u);let f=i.frame(-121);d.rotation.y=Math.atan2(f.tz,-f.tx),this.sluiceFlap=u,o("sluiceAlternator",d)}{let d=new pt;for(let u of[-1,1]){let f=[...Object.values(i.worldXZ(-110.6,i.c(-110.6)+u*.62))],y=i.worldXZ(-110.6,i.c(-110.6)+u*.62),g=i.worldXZ(-106.4,i.c(-106.4)+u*.8);d.add(qt([y.x,i.y0(-110.6)+.05,y.z],[g.x,i.y0(-106.4)+.05,g.z],.025,G.darkWood))}o("sluiceMerge",d)}{let d=new pt,u=i.worldXZ(-7.75,i.c(-7.75)-.3),f=i.worldXZ(-7.75,i.c(-7.75)+.3);d.add(qt([u.x,i.y0(-7.75)-.03,u.z],[f.x,i.y0(-7.75)-.03,f.z],.02,G.wood)),o("slateOutlet",d)}{let d=new pt;for(let u of[-70.5,-68,-65.5]){let f=i.worldXZ(u,i.c(u)-.05),y=xt(.4,.12,.02,G.darkSteel,0,0,0);y.position.set(f.x,i.y0(u)-.03,f.z);let g=i.frame(u);y.rotation.y=Math.atan2(-g.tz,g.tx)-.5,d.add(y)}o("basinVane",d)}this.sweeperPivots={};for(let d of ns){if(d.id==="arm")continue;let u=new pt,f=d.pivotS,g=i.c(f)+d.side*((d.side<0?i.wL(f):i.wR(f))+.25),m=i.worldXZ(f,g);u.position.set(m.x,i.bedH(f,g),m.z),u.add(Ye(.06,.08,.45,d.id==="branch"?G.bark:G.yellow,10).translateY(.22));let p=new pt;p.position.y=.42;let _=(i.wR(f)+i.wL(f))*.9;if(d.id==="branch"){p.add(qt([0,0,0],[-_,-.25,0],.03,G.bark,7));for(let b=1;b<4;b++)p.add(qt([-_*b/4,-.08*b,0],[-_*b/4-.15,-.08*b-.15,.12*(b%2?1:-1)],.012,G.bark,5))}else p.add(xt(_,.035,.035,G.yellow,-_/2,0,0)),p.add(xt(.03,.3,.45,G.rubber,-_+.05,-.28,0));u.add(p);let x=i.frame(f),v=new P(-x.nx*d.side,0,-x.nz*d.side);u.rotation.y=Math.atan2(v.z,-v.x),this.sweeperPivots[d.id]=p,o(d.up,u)}{let d=new pt,u=77.4,f=1.15,y=i.worldXZ(u,f),g=i.bedH(u,f);d.position.set(y.x,g,y.z),d.add(qt([0,0,0],[0,1.6,0],.02,G.darkWood));let m=new Nt(new Se(.06,.6),new Ft({color:14169130,side:ye}));m.position.set(.04,1.28,0),d.add(m),this.ribbon=m;let p=new Nt(new Ds(.08,.22,10),new Ft({color:5943551,emissive:1454154}));p.rotation.x=Math.PI,p.position.set(0,2,0),d.add(p),o("draftRibbon",d)}{let d=new pt,u=[[75.6,1.25],[76.6,1.15],[77.6,1.2]].map(([f,y])=>{let g=i.worldXZ(f,y);return new P(g.x,i.y0(f)+.05,g.z)});for(let f=0;f<u.length-1;f++){let y=u[f],g=u[f+1],m=new Nt(new Se(y.distanceTo(g),.7),G.mesh);m.position.copy(y).lerp(g,.5).setY((y.y+g.y)/2+.35),m.rotation.y=Math.atan2(-(g.z-y.z),g.x-y.x),d.add(m),d.add(qt(y,y.clone().setY(y.y+.75),.015,G.darkWood))}o("windScreen",d)}{let d=new pt,u=58.2,f=i.c(58.2)-i.wL(58.2)-.35,y=i.worldXZ(u,f);d.position.set(y.x,i.bedH(u,f),y.z),d.add(qt([0,0,0],[0,1,0],.025,G.steel)),d.add(xt(.18,.22,.12,G.green,0,.9,0));let g=qt([.06,.8,0],[.4,-.05,0],.008,G.white);d.add(g),o("springsSampler",d)}for(let[d,[u,f]]of Object.entries(G1)){let g=i.c(u)+f*((f<0?i.wL(u):i.wR(u))+.4),m=i.worldXZ(u,g),p=new pt;p.position.set(m.x,Math.max(i.bedH(u,g),i.y0(u)),m.z),p.add(qt([0,0,0],[0,.45,0],.01,G.darkWood));let _=new Nt(new Se(.14,.09),new Ft({color:16747050,side:ye,emissive:4200448}));_.position.set(.07,.4,0),p.add(_),p.userData.upgrade=d,p.userData.lazyLabel=!0,p.visible=!1,t.add(p),this.stakes[d]=p}{let d=In.s,u=i.c(d)-i.wL(d)-1.7,f=i.worldXZ(d,u),y=i.bedH(d,u),g=new pt;g.position.set(f.x,y,f.z);let m=i.frame(d);g.rotation.y=Math.atan2(-m.tz,m.tx),g.add(xt(1.6,.05,1.1,G.darkWood,0,.02,0));for(let[x,v]of[[-.75,-.5],[.75,-.5],[-.75,.5],[.75,.5]])g.add(xt(.07,1.4,.07,G.darkWood,x,.7,v));let p=xt(1.8,.05,1.3,G.green,0,1.42,0);p.rotation.x=.12,g.add(p);for(let x=0;x<3;x++)g.add(xt(.35,.3,.35,G.wood,-.45+x*.45,.2,.25));let _=hi(xn(["Bank Workshop","supply yard"],{w:512,h:150,font:"bold 46px Georgia, serif",bg:"#24361f"}),.75,.22);_.position.set(0,1.75,0),g.add(_),o("bankWorkshop",g),this.yard=g}this.carts=[];{let d=De(31),u=new Da(1,9);u.rotateX(-Math.PI/2);let f=new Ft({color:2038308,roughness:.95,transparent:!0,opacity:.62,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}),y=[];for(let v of i.codeRot){let b=Math.round(14*v.k);for(let S=0;S<b;S++){let A=d()*6.28,E=Math.sqrt(d())*v.r,w=v.s+Math.cos(A)*E,M=i.c(v.s)+v.dOff+Math.sin(A)*E*.8;y.push({s:w,d:M,size:.08+d()*.22*v.k,rot:d()*6.28})}}let g=new dn(u,f,y.length),m=new te,p=new Ge,_=new P,x=new P;y.forEach((v,b)=>{let S=i.worldXZ(v.s,v.d),A=Math.max(i.bedH(v.s,v.d),i.waterLevel(v.s,v.d)>-1e8?i.bedH(v.s,v.d):-1e9)+.006;p.setFromAxisAngle(new P(0,1,0),v.rot),m.compose(x.set(S.x,A,S.z),p,_.set(v.size,1,v.size*.7)),g.setMatrixAt(b,m)}),g.renderOrder=1,t.add(g),this.codeRotMesh=g}{this.crayfish=[];let d=new Ft({color:9058850,roughness:.6});for(let[u,f]of i.ponds.entries())for(let y=0;y<(u===0?2:1);y++){let g=new pt,m=new Nt(new La(.012,.05,4,8),d);m.rotation.z=Math.PI/2,g.add(m);for(let p of[-1,1]){let _=new Nt(new un(.01,6,5),d);_.position.set(.04,0,p*.018),_.scale.set(1.6,.6,1),g.add(_)}g.userData={pd:f,ph:y*2.1+u,r:.35+.15*y},t.add(g),this.crayfish.push(g)}}{let d=new pt,u=new Ft({color:2760728,roughness:.4,metalness:.2}),f=new Nt(new un(.03,10,8),u);f.scale.set(1.8,.5,1),d.add(f);for(let y=0;y<3;y++)for(let g of[-1,1])d.add(qt([-.02+y*.02,0,g*.012],[-.06+y*.05,-.01,g*(.07+(y===1?.03:0))],.0025,u,4));t.add(d),this.nigatron=d}{let u=i.c(81.6)-.75,f=i.worldXZ(81.6,u),y=i.bedH(81.6,u),g=new pt;g.position.set(f.x,y,f.z);let m=i.frame(81.6);g.rotation.y=Math.atan2(-m.tz,m.tx)+.6;let p=Ye(.12,.16,2.4,new Ft({color:10262156,roughness:.85}),10);p.rotation.z=Math.PI/2-.12,p.position.set(0,.35,0),g.add(p),g.add(qt([.5,.4,0],[.9,.95,.15],.05,G.bark,7));let _=new Nt(new Se(.22,.28),new Ft({map:xn(["you\u2019ve made it","to the falls","\u2014keep going\u2014"],{w:256,h:320,font:"bold 30px sans-serif",bg:"#1c3b5a",border:"#5aa0ff"}),roughness:.6}));_.position.set(.1,.52,.17),g.add(_);for(let x of[-.08,.28])g.add(xt(.05,.015,.004,new Ft({color:3832831}),x,.67,.172));t.add(g),this.tapedSign=g}{let u=i.worldXZ(50.2,i.c(50.2)-1.6),f=i.worldXZ(50.2,i.c(50.2)+1.6),y=i.y0(50.2)+.02,g=qt([u.x,y,u.z],[f.x,y,f.z],.012,new wn({color:15913520}),6);t.add(g);let m=i.worldXZ(50.2,i.c(50.2)+1.2),p=new pt;p.position.set(m.x,i.bedH(50.2,i.c(50.2)+1.2),m.z),p.add(qt([0,0,0],[0,1.3,0],.025,G.darkWood));let _=hi(xn(["FARLANDS \u2191","continue upstream"],{w:512,h:150,font:"bold 50px Georgia, serif",bg:"#4a3a08",border:"#f2d230"}),.8,.24);_.position.set(0,1.5,0),p.add(_),t.add(p)}this.boards=[];let c=xn(["MAP","press M"],{w:256,h:160,font:"bold 46px Georgia, serif",bg:"#1f3326",border:"#e8d27a"}),h=(d,u,f)=>{let y=i.c(d)+u,g=i.worldXZ(d,y),m=new pt;m.position.set(g.x,i.bedH(d,y),g.z),m.add(qt([0,0,0],[0,1.1,0],.025,G.darkWood));let p=new Nt(new Se(.42,.28),new Ft({map:c,side:ye}));p.position.set(0,1.15,0),m.add(p);let _=i.frame(d);m.rotation.y=Math.atan2(-_.tz,_.tx)+Math.PI/2,t.add(m),this.boards.push({id:f,g:m,pos:m.position.clone()})};rt.forEach((d,u)=>h(d.s-1.9,i.wR(d.s)+1.1,"site"+u)),h(97.6,-.95,"finish"),this.landmarks=V1(i)}configure(t){for(let[e,n]of Object.entries(this.items))n.visible=t.owned.has(e);for(let[e,n]of Object.entries(this.stakes)){let i=!t.owned.has(e)&&!t.blocked(e);if(n.visible=i,i&&n.userData.lazyLabel){n.userData.lazyLabel=!1;let s=ze[e];if(s){let a=hi(xn([s.name,`$${s.price.toLocaleString()}`],{w:512,h:160,font:"bold 50px sans-serif",bg:"#3b2a12"}),.75,.234);a.position.set(0,.7,0),n.add(a)}}}}update(t,e,n){let i=this.creek;if(this.gateArm){let a=!e.phys.disabled.has("gateDirect"),o=!e.phys.disabled.has("gateCalm"),l=a?.75:o?-.75:0;this.gateArm.rotation.y+=(l-this.gateArm.rotation.y)*Math.min(1,t*6)}if(this.sluiceFlap){let a=e.phys.disabled.has("sluiceToRight")?e.phys.disabled.has("sluiceToLeft")?0:-.7:.7;this.sluiceFlap.rotation.y+=(a-this.sluiceFlap.rotation.y)*Math.min(1,t*8)}ns.forEach((a,o)=>{let l=this.sweeperPivots[a.id];if(!l)return;let c=e.sweep[o].phase;l.rotation.y=c>0?Math.sin(c*Math.PI)*1.1-.55:-.55}),this.ribbon&&(this.ribbon.rotation.y=Math.sin(n*7)*.4);let s=e.workshop;for(;this.carts.length<s.carts.length;){let a=new pt;a.add(xt(.5,.04,.3,G.wood,0,.12,0));for(let[l,c]of[[-.18,-.16],[.18,-.16],[-.18,.16],[.18,.16]]){let h=Ye(.05,.05,.03,G.rubber,10);h.rotation.x=Math.PI/2,h.position.set(l,.05,c),a.add(h)}let o=xt(.5,.03,.3,G.wood,0,.26,0);o.name="deck2",a.add(o);for(let[l,c]of[[-.24,-.14],[.24,.14]])a.add(xt(.02,.16,.02,G.darkWood,l,.2,c));this.scene.add(a),this.carts.push({g:a,deck2:o})}this.carts.forEach((a,o)=>{let l=s.carts[o];if(!l||!e.owned.has("bankWorkshop")){a.g.visible=!1;return}a.g.visible=!0;let c=Math.max(-151,Math.min(106,l.s)),h=i.c(c)-i.wL(c)-1.15-o%2*.35,d=i.worldXZ(c,h);a.g.position.set(d.x,i.bedH(c,h),d.z);let u=i.frame(c);a.g.rotation.y=Math.atan2(-u.tz,u.tx),a.deck2.visible=e.owned.has("doubleDeck"),a.load=l.load?l.load.length:0});for(let a of this.crayfish){let{pd:o,ph:l,r:c}=a.userData,h=n*.12+l,d=o.s+Math.cos(h)*o.rs*c,u=i.c(o.s)+o.dOff+Math.sin(h)*o.rd*c,f=i.worldXZ(d,u);a.position.set(f.x,i.bedH(d,u)+.012,f.z),a.rotation.y=-h}if(this.nigatron){let a=Math.floor(n/3),o=n%3/3,l=p=>{let _=Math.sin(p*12.9898)*43758.5453;return _-Math.floor(_)},c=52.3+(l(a)-.5)*1.4,h=-.5+(l(a+7)-.5)*.6,d=52.3+(l(a+1)-.5)*1.4,u=-.5+(l(a+8)-.5)*.6,f=o<.3?o/.3*(o/.3)*(3-2*o/.3):1,y=c+(d-c)*f,g=i.c(y)+h+(u-h)*f,m=i.worldXZ(y,g);this.nigatron.position.set(m.x,i.y0(y)+.004,m.z),this.nigatron.rotation.y=Math.atan2(-(u-h),d-c)+(i.frame(y).tx>0?0:Math.PI)}}cartSlots(t,e){let n=this.carts[t];if(!n||!n.g.visible)return[];let i=[];n.g.updateMatrixWorld(!0);for(let s=0;s<e;s++){let a=s<6?0:1,o=s%6;i.push(new P(-.17+o%3*.17,(a?.31:.17)+.034,-.07+Math.floor(o/3)*.14).applyMatrix4(n.g.matrixWorld))}return i}};var io=class{constructor(t,e,n){this.cam=t,this.dom=e,this.creek=n,this.target=new P,this.dist=6,this.yaw=0,this.pitch=.75,this.goal=null,this.follow=null,this.followClose=!1,this.cine=null,this.pointers=new Map,this.onPick=null,this.moved=0,this.enabled=!1,this.bind()}bind(){let t=this.dom;t.addEventListener("contextmenu",n=>n.preventDefault()),t.addEventListener("pointerdown",n=>{this.enabled&&(t.setPointerCapture(n.pointerId),this.pointers.set(n.pointerId,{x:n.clientX,y:n.clientY,button:n.button,sx:n.clientX,sy:n.clientY}),this.moved=0,this.pointers.size===2&&(this.pinch=this.pinchInfo()))}),t.addEventListener("pointermove",n=>{if(!this.enabled)return;let i=this.pointers.get(n.pointerId);if(!i)return;let s=n.clientX-i.x,a=n.clientY-i.y;if(i.x=n.clientX,i.y=n.clientY,this.moved+=Math.abs(s)+Math.abs(a),this.pointers.size===2){let o=this.pinchInfo();this.pinch&&(this.zoom(this.pinch.d/o.d),this.yaw-=o.a-this.pinch.a,this.pitch=le(this.pitch+(o.cy-this.pinch.cy)*.004,.12,1.5),this.pan(o.cx-this.pinch.cx,o.cy-this.pinch.cy,.5)),this.pinch=o,this.userMoved();return}i.button===2||n.shiftKey||n.ctrlKey?(this.yaw-=s*.006,this.pitch=le(this.pitch+a*.005,.12,1.5)):this.pan(s,a,1),this.userMoved()});let e=n=>{let i=this.pointers.get(n.pointerId);this.pointers.delete(n.pointerId),this.pointers.size<2&&(this.pinch=null),i&&this.moved<6&&this.onPick&&this.onPick(n.clientX,n.clientY)};t.addEventListener("pointerup",e),t.addEventListener("pointercancel",e),t.addEventListener("wheel",n=>{this.enabled&&(n.preventDefault(),this.zoom(Math.exp(n.deltaY*.0012)),this.userMoved(!0))},{passive:!1})}pinchInfo(){let[t,e]=[...this.pointers.values()];return{d:Math.hypot(t.x-e.x,t.y-e.y)+1,a:Math.atan2(e.y-t.y,e.x-t.x),cx:(t.x+e.x)/2,cy:(t.y+e.y)/2}}userMoved(t=!1){this.goal=null,this.cine=null,t||(this.follow=this.follow&&this.followClose?this.follow:null),!t&&this.follow&&(this.follow=null)}zoom(t){this.dist=le(this.dist*t,.25,160)}pan(t,e,n){let i=this.dom.clientHeight||800,s=2*this.dist*Math.tan(this.cam.fov*Math.PI/360)/i*n,a=-Math.sin(this.yaw),o=-Math.cos(this.yaw),l=Math.cos(this.yaw),c=-Math.sin(this.yaw),h=1/Math.max(.35,Math.sin(this.pitch));this.target.x+=(-t*l+e*a*h)*s,this.target.z+=(-t*c+e*o*h)*s,this.follow=null}flyTo(t,e,n=this.yaw,i=this.pitch){this.follow=null,this.cine=null,this.goal={target:t.clone(),dist:e,yaw:n,pitch:i}}setFollow(t,e=!1){this.follow=t,this.followClose=e,this.goal=null,this.cine=null}playPath(t,e){this.follow=null,this.goal=null,this.cine={points:t,t:0,duration:e}}yawAlong(t){let e=this.creek.frame(t);return Math.atan2(-e.tx,-e.tz)}update(t,e){let n=this.creek;if(this.cine){let h=this.cine;h.t+=t;let d=le(h.t/h.duration,0,1),u=h.points.length-1,f=d*u,y=Math.min(u-1,Math.floor(f)),g=f-y,m=g*g*(3-2*g),p=h.points[y],_=h.points[y+1];this.target.lerpVectors(p.target,_.target,m),this.dist=p.dist+(_.dist-p.dist)*m,this.pitch=p.pitch+(_.pitch-p.pitch)*m;let x=_.yaw-p.yaw;for(;x>Math.PI;)x-=Math.PI*2;for(;x<-Math.PI;)x+=Math.PI*2;this.yaw=p.yaw+x*m,d>=1&&(this.cine=null)}else if(this.follow!=null&&e){let h=1-Math.exp(-t*5);this.target.lerp(e,h);let d=this.followClose?.42:2.2;this.dist+=(d-this.dist)*(1-Math.exp(-t*2)),this.followClose&&(this.pitch+=(.5-this.pitch)*(1-Math.exp(-t*2)));let u=n.locate(e.x,e.z,-1,{}),y=this.yawAlong(u.s)-this.yaw;for(;y>Math.PI;)y-=Math.PI*2;for(;y<-Math.PI;)y+=Math.PI*2;this.yaw+=y*(1-Math.exp(-t*1.2))}else if(this.goal){let h=this.goal,d=1-Math.exp(-t*3.5);this.target.lerp(h.target,d),this.dist+=(h.dist-this.dist)*d,this.pitch+=(h.pitch-this.pitch)*d;let u=h.yaw-this.yaw;for(;u>Math.PI;)u-=Math.PI*2;for(;u<-Math.PI;)u+=Math.PI*2;this.yaw+=u*d,this.target.distanceTo(h.target)<.01&&Math.abs(h.dist-this.dist)<.01&&(this.goal=null)}if(this.follow==null){let h=n.locate(this.target.x,this.target.z,-1,{}),d=Math.max(n.bedH(le(h.s,-151,108),le(h.d,-10,10)),n.y0(le(h.s,-151,108)));this.target.y+=(d-this.target.y)*(1-Math.exp(-t*6))}let i=Math.cos(this.pitch),s=Math.sin(this.pitch),a=this.cam;a.position.set(this.target.x+Math.sin(this.yaw)*i*this.dist,this.target.y+s*this.dist,this.target.z+Math.cos(this.yaw)*i*this.dist);let o=0,l=this._loc||(this._loc={});for(let h=2;h<=8;h++){let d=h/8,u=this.target.x+(a.position.x-this.target.x)*d,f=this.target.z+(a.position.z-this.target.z)*d,y=this.target.y+(a.position.y-this.target.y)*d,g=n.locate(u,f,-1,l);if(g.s<-151||g.s>107||Math.abs(g.d)>9.9)continue;let m=Math.max(n.bedH(g.s,g.d),n.waterLevel(g.s,g.d))+(h===8?.06:.03);y<m&&(o=Math.max(o,(m-y)/d))}a.position.y+=o,a.lookAt(this.target);let c=le(this.dist*.02,.01,.3);Math.abs(a.near-c)>c*.2&&(a.near=c,a.far=600,a.updateProjectionMatrix())}};var W1=1.6,q1=1.45,iu=3,so=class{constructor(t,e,n){this.creek=t,this.cam=e,this.dom=n,this.pos=new P,this.yaw=0,this.pitch=-.12,this.vel=new P,this.keys=new Set,this.move={x:0,y:0},this.hint=-1,this.safe=null,this.safeT=0,this.bob=0,this.stepAcc=0,this.fade=0,this.sens=1,this.headBob=!0,this.trunks=[],this.structures=[],this.loc={},this.onStep=null,this.onFall=null,this.enabled=!0,this.locked=!1,this.bind()}setTrunks(t){this.trunkGrid=new Map;for(let e of t){let n=Math.floor(e.x)*9973+Math.floor(e.z),i=this.trunkGrid.get(n);i||(i=[],this.trunkGrid.set(n,i)),i.push(e)}}bind(){let t=this.dom;window.addEventListener("keydown",n=>{n.target&&(n.target.tagName==="INPUT"||n.target.tagName==="SELECT"||n.target.tagName==="TEXTAREA")||this.keys.add(n.code)}),window.addEventListener("keyup",n=>this.keys.delete(n.code)),window.addEventListener("blur",()=>this.keys.clear()),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===t}),document.addEventListener("mousemove",n=>{!this.enabled||!this.locked||this.look(n.movementX,n.movementY,.0022)}),this.drag=null,t.addEventListener("pointerdown",n=>{if(this.enabled){if(n.pointerType==="mouse"&&n.button===0&&!this.locked&&this.wantLock)try{let i=t.requestPointerLock();i&&i.catch&&i.catch(()=>{})}catch{}n.pointerType!=="mouse"&&n.clientX<window.innerWidth*.42||(this.drag={id:n.pointerId,x:n.clientX,y:n.clientY,moved:0})}}),t.addEventListener("pointermove",n=>{if(!this.enabled||!this.drag||this.drag.id!==n.pointerId||this.locked)return;let i=n.clientX-this.drag.x,s=n.clientY-this.drag.y;this.drag.x=n.clientX,this.drag.y=n.clientY,this.drag.moved+=Math.abs(i)+Math.abs(s),this.look(i,s,n.pointerType==="mouse"?.004:.006)});let e=n=>{this.drag&&this.drag.id===n.pointerId&&(this.drag=null)};t.addEventListener("pointerup",e),t.addEventListener("pointercancel",e)}look(t,e,n){this.yaw-=t*n*this.sens,this.pitch=le(this.pitch-e*n*this.sens,-1.45,1.35)}placeAt(t,e,n=this.yaw){this.pos.set(t,this.groundAt(t,e),e),this.yaw=n,this.hint=-1,this.safe=this.pos.clone()}groundAt(t,e){let n=this.creek,i=n.locate(t,e,this.hint,this.loc),s=le(i.s,Wt,Ie),a=le(i.d,-10,10),o=n.bedH(s,a),l=n.cellList(t,e);if(l)for(let c of l){let h=n.colliders[c];if(h.type!==0||h.r<.06)continue;let d=t-h.x,u=e-h.z,f=d*d+u*u;f<h.r*h.r&&(o=Math.max(o,h.y+Math.sqrt(h.r*h.r-f)))}return o}waterAt(t,e){let n=this.creek,i=n.locate(t,e,this.hint,this.loc);if(i.s<Wt||i.s>Ie||Math.abs(i.d)>10)return{depth:0,level:-1/0};let s=n.waterLevel(i.s,i.d);return s>-1e8?{depth:Math.max(0,s-n.bedH(i.s,i.d)),level:s}:{depth:0,level:-1/0}}blocked(t,e,n,i){let s=this.groundAt(t,e),a=this.groundAt(n,i),o=Math.hypot(n-t,i-e)||1e-6,l=a-s;if(l>.42&&l/o>1.1||l<-1.1)return!0;if(this.trunkGrid)for(let h=-1;h<=1;h++)for(let d=-1;d<=1;d++){let u=this.trunkGrid.get((Math.floor(n)+h)*9973+Math.floor(i)+d);if(u){for(let f of u)if(Math.hypot(n-f.x,i-f.z)<f.r+.25)return!0}}for(let h of this.structures)if(Math.hypot(n-h.x,i-h.z)<h.r)return!0;let c=this.creek.locate(n,i,this.hint,this.loc);return Math.abs(c.d)>9.2||c.s<Wt+1||c.s>Ie-1.5}update(t){if(!this.enabled)return;let e=this.keys,n=0,i=0;(e.has("KeyW")||e.has("ArrowUp"))&&(i+=1),(e.has("KeyS")||e.has("ArrowDown"))&&(i-=1),(e.has("KeyA")||e.has("ArrowLeft"))&&(n-=1),(e.has("KeyD")||e.has("ArrowRight"))&&(n+=1),n+=this.move.x,i+=this.move.y;let s=Math.hypot(n,i);s>1&&(n/=s,i/=s);let a=this.waterAt(this.pos.x,this.pos.z),o=e.has("ShiftLeft")||e.has("ShiftRight")||Math.hypot(this.move.x,this.move.y)>.95?iu:q1;a.depth>.12&&(o*=.55);let l=-Math.sin(this.yaw),c=-Math.cos(this.yaw),h=Math.cos(this.yaw),d=-Math.sin(this.yaw),u=(l*i+h*n)*o,f=(c*i+d*n)*o,y=1-Math.exp(-t*10);this.vel.x+=(u-this.vel.x)*y,this.vel.z+=(f-this.vel.z)*y;let g=this.pos.x,m=this.pos.z,p=g+this.vel.x*t,_=m+this.vel.z*t;this.blocked(g,m,p,_)&&(this.blocked(g,m,p,m)?this.blocked(g,m,g,_)?(p=g,_=m,this.vel.set(0,0,0)):p=g:_=m),this.pos.x=p,this.pos.z=_;let x=this.creek.locate(p,_,this.hint,this.loc);this.hint=x.idx;let v=this.groundAt(p,_);this.pos.y+=(v-this.pos.y)*(1-Math.exp(-t*14));let b=this.waterAt(p,_);b.depth>.55?(this.onFall&&this.onFall(this.pos.clone()),this.fade=1,this.safe&&(this.pos.copy(this.safe),this.vel.set(0,0,0))):b.depth<.06&&(this.safeT+=t,this.safeT>.6&&(this.safe=this.pos.clone(),this.safeT=0)),this.fade=Math.max(0,this.fade-t*1.5);let S=Math.hypot(this.vel.x,this.vel.z);if(S>.2&&(this.bob+=t*S*5.2,this.stepAcc+=S*t,this.stepAcc>.72&&(this.stepAcc=0,this.onStep))){let A=this.creek.bedAt(x.s,x.d,{});this.onStep(b.depth>.02?"water":A.mat,Math.min(1,S/iu))}this.applyCamera()}applyCamera(){let t=this.headBob?Math.sin(this.bob)*.025:0,e=this.headBob?Math.cos(this.bob*.5)*.015:0;this.cam.position.set(this.pos.x+Math.cos(this.yaw)*e,this.pos.y+W1+t,this.pos.z-Math.sin(this.yaw)*e),this.cam.rotation.set(this.pitch,this.yaw,0,"YXZ")}forward(t=1){return new P(this.pos.x-Math.sin(this.yaw)*t,this.pos.y+1,this.pos.z-Math.cos(this.yaw)*t)}state(){return{x:this.pos.x,y:this.pos.y,z:this.pos.z,yaw:this.yaw,pitch:this.pitch,safe:this.safe?{x:this.safe.x,y:this.safe.y,z:this.safe.z}:null}}restore(t){return t?(this.pos.set(t.x,t.y,t.z),this.yaw=t.yaw||0,this.pitch=t.pitch||0,this.hint=-1,this.safe=t.safe?new P(t.safe.x,t.safe.y,t.safe.z):this.pos.clone(),!0):!1}};var $1="varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",X1=`varying vec3 vDir; uniform vec3 uSun; uniform vec3 uTop; uniform vec3 uHor;
void main(){ float h = clamp(vDir.y, -0.2, 1.0); vec3 c = mix(uHor, uTop, pow(max(h,0.0), 0.55));
float sd = max(dot(normalize(vDir), uSun), 0.0); c += vec3(1.0,0.9,0.7) * (pow(sd, 900.0) * 3.0 + pow(sd, 12.0) * 0.18);
gl_FragColor = vec4(c, 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,ro=class{constructor(t,e,n){this.creek=e,this.game=n,this.quality=n.settings.quality||"high";let i=new ba({antialias:this.quality!=="low",powerPreference:"high-performance"});i.setPixelRatio(Math.min(window.devicePixelRatio,this.quality==="high"?2:this.quality==="medium"?1.5:1)),i.setSize(t.clientWidth,t.clientHeight),i.toneMapping=Cc,i.toneMappingExposure=1.05,i.outputColorSpace=He,i.shadowMap.enabled=this.quality!=="low",i.shadowMap.type=Rc,t.appendChild(i.domElement),this.renderer=i;let s=new Ma;this.scene=s,s.fog=new wa(12176584,30,170),s.background=new ut(12176584);let a=new on(n.settings.fov||70,t.clientWidth/t.clientHeight,.03,700);this.camera=a,this.sunDir=new P(.45,.78,.35).normalize();let o=new Nt(new un(450,32,16),new je({vertexShader:$1,fragmentShader:X1,side:nn,depthWrite:!1,fog:!1,uniforms:{uSun:{value:this.sunDir},uTop:{value:new ut(.3,.52,.86)},uHor:{value:new ut(.78,.86,.88)}}}));o.renderOrder=-1,this.sky=o,s.add(o);let l=new Ba(14084863,5135920,1.05);s.add(l);let c=new Oa(16773336,2.6);c.castShadow=this.quality!=="low",c.shadow.mapSize.set(this.quality==="high"?2048:1024,this.quality==="high"?2048:1024),c.shadow.bias=-4e-4,c.shadow.normalBias=.03,s.add(c),s.add(c.target),this.sun=c,this.player=new so(e,a,i.domElement),this.player.sens=n.settings.sens||1,this.player.headBob=n.settings.headBob!==!1,this.buildWorld(),this.balls=new Ka(s,this.quality),this.workshops=new Map,this.finish=new Qa(s,e),this.creekEq=new to(s,e),this.exp=new no(s,e,n),this.markers=new eo(s,e),this.rig=new io(a,i.domElement,e),this.syncWorkshops(),this.time=0,this.wakeT=new Map,this.drains=[],this.tmpV=new P,this.fl={},this.raycaster=new Ha,this.mode="fp",this.prevFp=null,window.addEventListener("resize",()=>this.resize(t)),this.player.restore(n.player)||this.spawnAt(n.sel),this.player.applyCamera()}buildWorld(){let t=this.quality,e=this.creek,n=this.scene;this.world&&(n.remove(this.world),this.world.traverse(s=>{s.geometry&&s.geometry.dispose()}));let i=new pt;i.add(Xd(e,t)),i.add(Zd(e,t));for(let s of Kd(e))i.add(s);if(i.add(Jd(e,t)),this.riparian=Qd(e,t),i.add(this.riparian),this.water=eu(e,t,this.sunDir),i.add(this.water),this.falls=nu(e),i.add(this.falls),n.add(i),this.world=i,this.player.setTrunks(this.riparian.userData.trunks),this.effects)for(let s of["foam","ripples","drops","mist","leaves","sparks"])n.remove(this.effects[s].mesh);this.effects=new Ja(n,e,t),this.effects.setFalls(this.falls.userData.sheets)}setQuality(t){t!==this.quality&&(this.quality=t,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t==="high"?2:t==="medium"?1.5:1)),this.renderer.shadowMap.enabled=t!=="low",this.sun.castShadow=t!=="low",this.sun.shadow.map?.dispose(),this.sun.shadow.map=null,this.sun.shadow.mapSize.set(t==="high"?2048:1024,t==="high"?2048:1024),this.scene.traverse(e=>{e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(i=>i.needsUpdate=!0)}),this.buildWorld())}setFov(t){this.camera.fov=t,this.camera.updateProjectionMatrix()}resize(t){let e=t.clientWidth,n=t.clientHeight;this.renderer.setSize(e,n),this.camera.aspect=e/n,this.camera.updateProjectionMatrix()}syncWorkshops(){let t=this.game;t.sites.forEach((e,n)=>{if(!e.open||this.workshops.has(n))return;let i=new ja(this.scene,this.creek,n);this.workshops.set(n,i)}),this.player.structures=[...this.workshops.values()].map(e=>({x:e.group.position.x,z:e.group.position.z,r:.75})),this.exp&&this.exp.yard&&t.owned.has("bankWorkshop")&&this.player.structures.push({x:this.exp.yard.position.x,z:this.exp.yard.position.z,r:.85})}worldAt(t,e,n=0){let i=this.creek.worldXZ(t,e);return new P(i.x,Math.max(this.creek.bedH(t,e),this.creek.y0(t))+n,i.z)}spawnAt(t){let e=this.creek,i=rt[t].s+1.5,s=e.c(i)+e.wR(i)+1.5,a=e.worldXZ(i,s),o=e.frame(i),l=-o.nx*.55-o.tx,c=-o.nz*.55-o.tz;this.player.placeAt(a.x,a.z,Math.atan2(-l,-c)),this.player.pitch=-.22}homeView(){this.mode!=="fp"&&this.returnToPlayer(),this.spawnAt(this.game.sel)}enterMap(t=null){this.mode==="fp"&&(this.prevFp=this.player.state()),this.mode="map",this.player.enabled=!1,document.pointerLockElement&&document.exitPointerLock(),this.rig.enabled=!0,this.rig.follow=null;let e=this.player.pos,n=t===null?new P(e.x,e.y,e.z):this.worldAt(t,this.creek.c(t));(this.rig.dist<5||!this.mapInit)&&(this.rig.target.copy(n),this.rig.dist=38,this.mapInit=!0),this.rig.flyTo(n,Math.max(this.rig.dist,26),0,1.38),this.riparian.visible=!1}panMapTo(t){this.mode!=="map"?this.enterMap(t):this.rig.flyTo(this.worldAt(t,this.creek.c(t)),this.rig.dist,0,1.38)}followBall(t,e=!1){this.mode==="fp"&&(this.prevFp=this.player.state()),this.mode="follow",this.player.enabled=!1,document.pointerLockElement&&document.exitPointerLock(),this.rig.enabled=!0;let n=this.game.phys.balls.find(i=>i.id===t);n&&(this.rig.target.set(n.x,n.y,n.z),this.rig.dist=e?.6:2.4,this.rig.pitch=.45),this.rig.setFollow(t,e),this.riparian.visible=!0}returnToPlayer(){this.mode="fp",this.rig.enabled=!1,this.rig.follow=null,this.player.enabled=!0,this.prevFp&&this.player.restore(this.prevFp),this.riparian.visible=!0,this.camera.near=.03,this.camera.updateProjectionMatrix(),this.player.applyCamera()}unlockPan(t){let e=this.creek;this.mode==="fp"&&(this.prevFp=this.player.state()),this.mode="map",this.player.enabled=!1,this.rig.enabled=!0,this.riparian.visible=!1;let n=rt[t].s,i=[],s=6;for(let a=0;a<=s;a++){let o=n+(Zt-n)*a/s;i.push({target:this.worldAt(o,e.c(o)),dist:a===0?10:a===s?12:30,pitch:1.2,yaw:0})}this.rig.playPath(i,5+(Zt-n)*.03),this.afterPan=()=>{this.rig.flyTo(this.worldAt(n,e.c(n)),14,0,1.25)}}interactables(){let t=this.game,e=this.creek,n=[];for(let[i,s]of this.workshops)n.push({type:"factory",k:i,pos:s.group.position,label:`Factory: ${rt[i].name}`});for(let i of this.exp.boards)n.push({type:"map",id:i.id,pos:i.pos,label:"Map board"});n.push({type:"finish",pos:this.worldAt(Zt-.4,e.c(Zt)-e.wL(Zt)-.5),label:"Finish station: archive, records and orders"}),n.push({type:"finish",pos:this.worldAt(Zt-.4,e.c(Zt)+e.wR(Zt)+.5),label:"Finish station: archive, records and orders"}),t.owned.has("bankWorkshop")&&n.push({type:"workshop",pos:this.exp.yard.position,label:"Bank Workshop: supply routes"});for(let[i,s]of[...Object.entries(this.creekEq.stakes),...Object.entries(this.exp.stakes)])s.visible&&n.push({type:"stake",id:i,pos:s.position,label:"For sale: open in shop"});for(let i of this.exp.landmarks)i.unmapped||n.push({type:"landmark",id:i.id,pos:new P(i.x,i.y,i.z),label:`Field note: ${i.name}`});for(let i of rt.map((s,a)=>a)){if(t.sites[i].open||!t.unlockable(i))continue;let s=this.markers.markers[i];n.push({type:"unlock",k:i,pos:s.g.position,label:`Launch site for sale: ${rt[i].name}`})}return n}nearestInteractable(){if(this.mode!=="fp")return null;let t=this.player.pos,e=this.player.forward(1),n=null,i=2.6;for(let s of this.interactables()){let a=Math.hypot(s.pos.x-t.x,s.pos.z-t.z);if(a>i||Math.abs(s.pos.y-t.y)>2.5)continue;let o=Math.hypot(s.pos.x-e.x,s.pos.z-e.z)<a+.2,l=a-(o?.4:0);l<i&&(i=l,n=s)}return n}besideFactory(){let t=this.player.pos;for(let[e,n]of this.workshops)if(Math.hypot(n.group.position.x-t.x,n.group.position.z-t.z)<4)return e;return null}pick(t,e){let n=this.renderer.domElement.getBoundingClientRect(),i=new dt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);this.raycaster.setFromCamera(i,this.camera);let s=[...Object.values(this.creekEq.stakes),...Object.values(this.exp.stakes)].filter(d=>d.visible),a=this.raycaster.intersectObjects(s,!0)[0];if(a){let d=a.object;for(;d&&!d.userData.upgrade;)d=d.parent;if(d)return{type:"stake",id:d.userData.upgrade}}let o=this.raycaster.ray,l=null,c=1/0,h=this.tmpV;for(let d of this.game.phys.balls){if(d.state!=="roll")continue;h.set(d.x,d.y,d.z);let u=h.clone().sub(o.origin).dot(o.direction);if(u<0)continue;let f=o.distanceSqToPoint(h),y=Math.max(.0335*2,u*.03);f<y*y&&u<c&&(c=u,l=d)}return l?{type:"ball",id:l.id}:null}ballInView(){let t=new $i(this.camera.position.clone(),new P(0,0,-1).applyQuaternion(this.camera.quaternion)),e=null,n=1/0;for(let i of this.game.phys.balls){if(i.state!=="roll"||i.paid)continue;let s=new P(i.x,i.y,i.z),a=s.clone().sub(t.origin).dot(t.direction);if(a<.2||a>25)continue;let o=Math.sqrt(t.distanceSqToPoint(s))/a;o<.25&&o+a*.004<n&&(n=o+a*.004,e=i)}return e}project(t,e){let n=this.tmpV.set(t.x,t.y,t.z).project(this.camera),i=this.renderer.domElement;return e.x=(n.x*.5+.5)*i.clientWidth,e.y=(-n.y*.5+.5)*i.clientHeight,e.visible=n.z<1&&n.z>-1,e}onEvent(t,e){let n=this.camera.position,i=(s,a,o)=>Math.min(1,2.5/(Math.hypot(s-n.x,a-n.y,o-n.z)+.5));switch(t.type){case"hit":{let s=t.mat===gt.WOOD?"wood":t.mat===gt.RUBBER||t.mat===gt.MAT||t.mat===gt.DIRT||t.mat===gt.SAND?"bump":"rock";e?.play(s,t.v/2.5,i(t.x,t.y,t.z));break}case"bump":e?.play("bump",t.v/1.5,i(t.x,t.y,t.z));break;case"splash":Math.hypot(t.x-n.x,t.z-n.z)<60&&this.effects.splash(t.x,t.y,t.z,t.v),e?.play("splash",t.v/3,i(t.x,t.y,t.z));break;case"finish":this.finish.onEvent(t),this.effects.sparkle(t.x,t.y+.08,t.z),e?.play("finish",1,Math.max(.25,i(t.x,t.y,t.z)));break;case"pressed":{let s=this.workshops.get(t.site);if(s){s.onEvent(t);let a=s.group.position;e?.play("press",.8,i(a.x,a.y,a.z))}break}case"launch":{let s=this.workshops.get(t.k);if(s){s.onEvent(t);let a=s.group.position;e?.play("launch",1,i(a.x,a.y,a.z))}this.followNext&&(this.followBall(t.id,this.followNext==="close"),this.followNext=null);break}case"handMade":{let s=this.workshops.get(t.site);s&&s.onEvent(t);break}case"surge":{let s=this.creek.locate(t.x,t.z,-1,{});this.effects.ripple(t.x,this.creek.y0(s.s),t.z,.04,.5,.8,.8);break}case"armSweep":e?.play("arm",1,1);break;case"armClear":this.effects.ripple(t.x,t.y,t.z,.05,.6,1,.8);break;case"lost":e?.play("lost",1,i(t.x,t.y,t.z));break;case"purchase":e?.play("buy"),this.syncWorkshops();break;case"unlock":this.syncWorkshops(),this.unlockPan(t.k);break;case"drain":this.drains.push({t:0,recipe:t.recipe||0,conv:this.game.owned.has("conveyor")});break;default:}}update(t,e){let n=this.game,i=this.creek;this.time+=t;let s=this.time;for(let[g,m]of this.workshops)m.configure(n.sites[g].owned);this.finish.configure(n.owned),this.creekEq.configure(n),this.exp.configure(n),this.markers.update(n);for(let g of this.workshops.values())g.update(t,n);this.finish.update(t,n),this.creekEq.update(t,n,s),this.exp.update(t,n,s);let a=this.balls;a.begin();let o=this.camera.position,l=this.mode==="map"&&this.rig.dist>14,c=null;for(let g of n.phys.balls){if(g.state!=="roll"&&g.state!=="queue")continue;let m=(g.x-o.x)**2+(g.z-o.z)**2;if(!(!l&&m>160*160)&&(a.add(g.spec,g.x,g.y,g.z,g.qx,g.qy,g.qz,g.qw,g.wet,g.state==="roll",g.recipe),g.id===this.rig.follow&&(c=this.tmpV.set(g.x,g.y,g.z).clone()),g.state==="roll"&&g.sub>.004&&g.sub<2*.0335&&m<18*18)){let p=this.wakeT.get(g.id)||0;if(s>p){let _=i.frame(g.s);i.flowAt(g.s,g.d,g.y,n.t,_.tx,_.tz,this.fl);let x=Math.hypot(g.vx-this.fl.vx,g.vz-this.fl.vz),v=g.recipe===1?1.6:1;if(x>.06*v||Math.random()<.05){let b=i.waterLevel(g.s,g.d);this.effects.ripple(g.x,b>-1e8?b:i.y0(g.s),g.z,.0335*1.3,.12+x*.2,.9/v,Math.min(.55,.2+x))}this.wakeT.set(g.id,s+(x>.3?.09:.2))}}}this.wakeT.size>800&&this.wakeT.clear(),this.mode==="follow"&&!c?(this.followGone=(this.followGone||0)+t,this.followGone>2.5&&(this.followGone=0,this.onFollowEnded&&this.onFollowEnded())):this.followGone=0;for(let[g,m]of this.workshops){let p=n.sites[g];if(Math.hypot(m.group.position.x-o.x,m.group.position.z-o.z)>70&&!l)continue;let _=m.hopperSlotsWorld();for(let x=0;x<p.hopper.length&&x<_.length;x++){let v=_[x],b=p.hopper[x];a.add(b.spec,v.x,v.y,v.z,0,Math.sin(x*1.7),0,Math.cos(x*1.7),0,!1,b.recipe)}for(let x=0;x<p.post.length;x++){let v=p.post[x],b=new P(.3+x%6*.07,.05+Math.floor(x/6)*.06,.55).applyMatrix4(m.group.matrixWorld);a.add(v.spec,b.x,b.y,b.z,0,0,0,1,0,!1,v.recipe)}if(p.owned.has("press")&&p.hopper.length<n.siteNumbers(g).hopper&&n.settings.auto&&p.enabled.press&&p.pressProg>.5&&p.changeT<=0){let x=m.heads.length===2?p.pressCount%2:0,v=m.moldWorld(x);v&&(a.sc.setScalar(.3+(p.pressProg-.5)*1.4),a.add(n.specFor(g),v.x,v.y,v.z,0,0,0,1,0,!1,p.recipe),a.sc.setScalar(1))}}n.workshop.carts.forEach((g,m)=>{let p=g.load?g.load.length:0;this.exp.cartSlots(m,p).forEach((x,v)=>a.add(g.load[v].spec,x.x,x.y,x.z,0,0,0,1,0,!1,g.load[v].recipe))});let h=this.finish.slots;for(let g=0;g<n.basket.length&&g<h.length;g++){let m=h[g],p=n.basket[g];a.add(p.spec||0,m.x,m.y,m.z,Math.sin(g),0,0,Math.cos(g),.8,!1,p.recipe||0)}let d=this.finish.crateSlots;if(d.length)for(let g=0;g<Math.min(n.crate,d.length);g++)a.add(1,d[g].x,d[g].y,d[g].z,Math.sin(g*2),0,0,Math.cos(g*2),.3);if(this.finish.stackSlots&&this.finish.stackSlots.length&&n.crates.forEach((g,m)=>{let p=this.finish.stackSlots[m];for(let _=0;_<Math.min(g,p.length);_++)a.add(1,p[_].x,p[_].y,p[_].z,0,0,0,1,.3,!1,m)}),this.finish.overflowPos&&n.overflow){let g=this.finish.overflowPos;for(let m=0;m<Math.min(n.overflow,30);m++)a.add(1,g.x+(m%6-2.5)*.07,g.y+.4+Math.floor(m/6)*.05,g.z+(Math.floor(m/6)%2-.5)*.07,0,0,0,1,.4)}for(let g=this.drains.length-1;g>=0;g--){let m=this.drains[g];m.t+=t;let p=m.conv?1.4:.7;if(m.t>p||!this.finish.slots.length){this.drains.splice(g,1);continue}let _=m.t/p,x;m.conv&&this.finish.beltA?x=this.finish.beltA.clone().lerp(this.finish.beltB,_).setY(this.finish.beltA.y+(this.finish.beltB.y-this.finish.beltA.y)*_+.0335+.01):x=this.finish.slots[0].clone().lerp(this.finish.drainEnd,_),a.add(1,x.x,x.y,x.z,0,Math.sin(_*9),0,Math.cos(_*9),.6,!1,m.recipe)}if(a.end(l),c){a.ring.visible=!0;let g=i.locate(c.x,c.z,-1,{}),m=i.waterLevel(g.s,g.d);a.ring.position.set(c.x,Math.max(c.y-.0335+.003,(m>-1e8?m:i.y0(g.s))+.004),c.z)}else a.ring.visible=!1;if(this.mode==="fp")this.player.update(t),this.scene.fog.near=30,this.scene.fog.far=170;else{let g=!!this.rig.cine;if(this.rig.update(t,c),g&&!this.rig.cine&&this.afterPan){let m=this.afterPan;this.afterPan=null,m()}this.scene.fog.near=this.mode==="map"?200:40,this.scene.fog.far=this.mode==="map"?600:200}let u=this.mode==="fp"?this.player.pos:this.rig.target,f=this.mode==="fp"?22:Math.min(70,Math.max(4,this.rig.dist*1.4)),y=this.sun.shadow.camera;if(y.left=-f,y.right=f,y.top=f,y.bottom=-f,y.near=.5,y.far=f*4+60,y.updateProjectionMatrix(),this.sun.position.copy(u).addScaledVector(this.sunDir,f*2+25),this.sun.target.position.copy(u),this.sky.position.copy(this.camera.position),this.water.material.uniforms.uTime.value=s,this.falls.userData.uniforms.uTime.value=s,this.effects.update(t,n.t,this.camera.position),e){let g=i.locate(o.x,o.z,-1,{}),m=Math.max(Wt,Math.min(Ie,g.s)),p=o.y-i.y0(m),_=Math.max(0,1-(Math.abs(g.d-i.c(m))+Math.max(0,p-1.5))/18),x=0;for(let b of this.falls.userData.sheets)x=Math.max(x,b.h*.4*Math.max(0,1-o.distanceTo(b.base)/16));let v=0;for(let[b,S]of this.workshops){let A=n.sites[b];!A.owned.has("press")||A.pressStatus||(v=Math.max(v,Math.max(0,1-o.distanceTo(S.group.position)/12)))}e.ambience(Math.min(1,_*1.4),Math.min(1,x),s,v)}this.renderer.render(this.scene,this.camera)}};var ao=class{constructor(){this.ctx=null,this.enabled=!0,this.voices={},this.last={},this.limits={step:[2,.12],wood:[4,.04],rock:[5,.03],splash:[4,.05],finish:[3,.06],bump:[3,.05],press:[2,.1],ui:[2,.05],cash:[2,.08],arm:[1,.3],lost:[1,.4]}}unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let t=window.AudioContext||window.webkitAudioContext;if(!t)return;let e=new t;this.ctx=e,this.master=e.createGain(),this.master.gain.value=this.enabled?.8:0,this.master.connect(e.destination),this.comp=e.createDynamicsCompressor(),this.comp.threshold.value=-16,this.comp.connect(this.master);let n=e.sampleRate*2,i=e.createBuffer(1,n,e.sampleRate),s=i.getChannelData(0),a=0,o=0,l=0;for(let g=0;g<n;g++){let m=Math.random()*2-1;a=.99765*a+m*.099,o=.963*o+m*.2965,l=.57*l+m*1.0526,s[g]=(a+o+l+m*.1848)*.2}this.noise=i;let c=e.createBuffer(1,e.sampleRate,e.sampleRate),h=c.getChannelData(0);for(let g=0;g<h.length;g++)h[g]=Math.random()*2-1;this.white=c,this.amb=this.loopNoise(700,.6,0),this.ambHi=this.loopNoise(2600,.8,0),this.fall=this.loopNoise(400,.4,0);let d=e.createOscillator();d.type="sawtooth",d.frequency.value=58;let u=e.createOscillator();u.type="square",u.frequency.value=117;let f=e.createBiquadFilter();f.type="lowpass",f.frequency.value=260;let y=e.createGain();y.gain.value=0,d.connect(f),u.connect(f),f.connect(y),y.connect(this.master),d.start(),u.start(),this.hum=y}loopNoise(t,e,n){let i=this.ctx,s=i.createBufferSource();s.buffer=this.noise,s.loop=!0;let a=i.createBiquadFilter();a.type="bandpass",a.frequency.value=t,a.Q.value=e;let o=i.createGain();return o.gain.value=n,s.connect(a),a.connect(o),o.connect(this.master),s.start(),{src:s,f:a,g:o}}setEnabled(t){this.enabled=t,this.master&&this.master.gain.setTargetAtTime(t?.8:0,this.ctx.currentTime,.05)}ambience(t,e,n,i=0){if(!this.ctx)return;let s=this.ctx.currentTime;this.hum&&this.hum.gain.setTargetAtTime(.035*i*i,s,.2);let a=.85+.15*Math.sin(n*.7)*Math.sin(n*.23+1);this.amb.g.gain.setTargetAtTime(.16*t*a,s,.3),this.ambHi.g.gain.setTargetAtTime(.05*t,s,.3),this.fall.g.gain.setTargetAtTime(.3*e,s,.3)}allow(t){if(!this.ctx||!this.enabled)return!1;let e=this.ctx.currentTime,[n,i]=this.limits[t]||[3,.05],s=(this.voices[t]||[]).filter(a=>a>e);return this.voices[t]=s,s.length>=n||e-(this.last[t]||0)<i?!1:(this.last[t]=e,!0)}claim(t,e){(this.voices[t]=this.voices[t]||[]).push(this.ctx.currentTime+e)}burst(t,{freq:e=1e3,q:n=1,type:i="bandpass",dur:s=.1,vol:a=.3,sweepTo:o=null,delay:l=0,white:c=!1}){let h=this.ctx,d=h.currentTime+l,u=h.createBufferSource();u.buffer=c?this.white:this.noise;let f=h.createBiquadFilter();f.type=i,f.frequency.setValueAtTime(e,d),f.Q.value=n,o&&f.frequency.exponentialRampToValueAtTime(o,d+s);let y=h.createGain();y.gain.setValueAtTime(1e-4,d),y.gain.exponentialRampToValueAtTime(a,d+.004),y.gain.exponentialRampToValueAtTime(1e-4,d+s),u.connect(f),f.connect(y),y.connect(this.comp),u.start(d,Math.random()),u.stop(d+s+.05)}tone(t,{freq:e=440,type:n="sine",dur:i=.15,vol:s=.2,delay:a=0,to:o=null}){let l=this.ctx,c=l.currentTime+a,h=l.createOscillator();h.type=n,h.frequency.setValueAtTime(e,c),o&&h.frequency.exponentialRampToValueAtTime(o,c+i);let d=l.createGain();d.gain.setValueAtTime(1e-4,c),d.gain.exponentialRampToValueAtTime(s,c+.005),d.gain.exponentialRampToValueAtTime(1e-4,c+i),h.connect(d),d.connect(this.comp),h.start(c),h.stop(c+i+.05)}play(t,e=1,n=1){let i=t==="step"?1:Math.min(1,e)*n;if(!(i<.03))switch(t){case"step":if(!this.allow("step"))return;if(this.claim("step",.12),e==="water"){this.burst("step",{freq:1600,q:.7,type:"lowpass",dur:.18,vol:.12,sweepTo:500});break}if(e===1){this.burst("step",{freq:2600,q:3,dur:.04,vol:.12,white:!0});break}if(e===0){this.burst("step",{freq:1900,q:1.2,dur:.09,vol:.12,white:!0}),this.burst("step",{freq:900,q:1,dur:.06,vol:.06,delay:.03});break}this.burst("step",{freq:380,q:.8,type:"lowpass",dur:.09,vol:.14});break;case"wood":if(!this.allow("wood"))return;this.claim("wood",.12),this.tone("wood",{freq:210+Math.random()*40,dur:.09,vol:.32*i,to:160}),this.tone("wood",{freq:520+Math.random()*60,dur:.05,vol:.12*i}),this.burst("wood",{freq:1400,q:2,dur:.03,vol:.12*i});break;case"rock":if(!this.allow("rock"))return;this.claim("rock",.06),this.burst("rock",{freq:3200+Math.random()*800,q:4,dur:.035,vol:.35*i,white:!0}),this.tone("rock",{freq:1500+Math.random()*300,dur:.04,vol:.06*i});break;case"bump":if(!this.allow("bump"))return;this.claim("bump",.06),this.tone("bump",{freq:340,dur:.06,vol:.12*i,to:250}),this.burst("bump",{freq:900,q:1,dur:.04,vol:.08*i});break;case"splash":if(!this.allow("splash"))return;this.claim("splash",.3),this.burst("splash",{freq:2500,q:.8,type:"lowpass",dur:.28*(.6+i*.6),vol:.35*i,sweepTo:350}),this.burst("splash",{freq:700,q:3,dur:.12,vol:.12*i,delay:.03});break;case"finish":if(!this.allow("finish"))return;this.claim("finish",.25),this.tone("finish",{freq:1800,type:"square",dur:.015,vol:.06*i}),this.tone("finish",{freq:1200,type:"square",dur:.015,vol:.05*i,delay:.035}),this.tone("finish",{freq:1320,dur:.22,vol:.09*i,delay:.05});break;case"press":if(!this.allow("press"))return;this.claim("press",.15),this.tone("press",{freq:95,dur:.12,vol:.18*i,to:60}),this.burst("press",{freq:300,q:1,type:"lowpass",dur:.08,vol:.12*i});break;case"launch":if(!this.allow("ui"))return;this.claim("ui",.1),this.tone("ui",{freq:300,type:"triangle",dur:.06,vol:.12*i,to:180});break;case"buy":if(!this.allow("cash"))return;this.claim("cash",.4),[660,880,1320].forEach((s,a)=>this.tone("cash",{freq:s,type:"triangle",dur:.18,vol:.12,delay:a*.07}));break;case"arm":if(!this.allow("arm"))return;this.claim("arm",.6),this.tone("arm",{freq:140,type:"sawtooth",dur:.5,vol:.05*i,to:220});break;case"lost":if(!this.allow("lost"))return;this.claim("lost",.4),this.tone("lost",{freq:420,type:"triangle",dur:.25,vol:.06*i,to:260});break;case"click":if(!this.allow("ui"))return;this.claim("ui",.05),this.tone("ui",{freq:900,type:"square",dur:.02,vol:.04});break;default:}}};var su=Object.freeze([{event:"Early historic race",results:["1st #15 dru","2nd #7 the big E","3rd #19 top 100"]},{event:"Major all-ball race",results:["1st #64 Max Inventory","2nd #76 \u4E2D\u56FD\u5171\u4EA7\u515A","3rd #-390 Enriquez"]},{event:"Mr. C\u2019s major race",results:["1st #62 Mr. C","2nd #124 Chungus funk","3rd #91 mango","4th #33 T St.","5th #107 triple Chungus"]},{event:"12-ball race",results:["1st #81 ACELERADa","2nd #92 de Quavious pork","3rd #78 Bowser fart"]},{event:"pray for the left\u2019s major race",results:["1st #89 pray for the left","2nd #25 Danethekiller","3rd #110 NIGUS Chungus","4th #3 phonk","5th #94 John Pork","6th #65 Event Horizon"]},{event:"Great 300-Ball Race",results:["1st #94 John Pork","2nd #229 screw","3rd #174 back Chungus rooms","4th #4 Island Casino","5th #150 Lowe\u2019s Chungus"]}]),ru=Object.freeze([{key:"h_m390",id:"-390",name:"Enriquez",status:"Archived",note:"3rd in the major all-ball race."},{key:"h_m151",id:"-151",name:"Marbella",status:"Archived"},{key:"h_m15",id:"-15",name:"271k",status:"Archived"},{key:"h_0",id:"0",name:"Creek roller",status:"Archived",note:"The zero of the Negative and Zero Division."},{key:"h_43",id:"43",name:"\u2014 vacant \u2014",status:"Vacant",note:"Left vacant: that competitor never existed."},{key:"h_90",id:"90",name:"MONTAGEM",status:"Recovered",note:"Distinct from #90.1."},{key:"h_90_1",id:"90.1",name:"MONTAGEM variant",status:"Variant",note:"Separate from the recovered original #90."},{key:"h_99",id:"99",name:"99 gr\xFCne Luftballons",status:"Recovered",note:"Distinct from #99.1."},{key:"h_99_1",id:"99.1",name:"99 gr\xFCne Luftballons variant",status:"Variant",note:"Separate from the recovered original #99."},{key:"h_101",id:"101",name:"buzz Chungus",status:"Chungus Nation",note:"Chungus Nation started at #101, after #100."},{key:"h_110",id:"110",name:"NIGUS Chungus",status:"Chungus Nation",note:"Distinct from #135 Vegas Chungus."},{key:"h_119",id:"119",name:"Norway Chungus",status:"Recovered",note:"Recovered from Norway Cavern during the Great 300-Ball Race."},{key:"h_119_1",id:"119.1",name:"RIP Norway Chungus",status:"RIP variant",note:"A separate historical entry. Kept alongside the recovered original #119."},{key:"h_135",id:"135",name:"Vegas Chungus",status:"Chungus Nation",note:"Distinct from #110 NIGUS Chungus."},{key:"h_155",id:"155",name:"Rizz Chungus",status:"Archived"},{key:"h_189",id:"189",name:"RC Chungus",status:"Chungus Nation"},{key:"h_192",id:"192",name:"\u2014 unassigned \u2014",status:"Vacant",note:"No exact name survives in the roster record."},{key:"h_200",id:"200",name:"Chungus nation",status:"Chungus Nation",note:"Chungus Nation reached #200."},{key:"h_226",id:"226",name:"\u2014 vacant / skipped \u2014",status:"Vacant",note:"Numbering jumps from #225 to #227."},{key:"h_255",id:"255",name:"flip Thursday",status:"Watchlist / Unconfirmed",note:"Likely match for the old-league ball found on the expedition follow-up (remembered as \u201CSpin Thursday\u201D), pending direct confirmation."},{key:"h_269",id:"269",name:"LOS method",status:"Archived",note:"Listed under its own name."}]),au=Object.freeze([{key:"u_faded",name:"Faded recoveries",note:"Several heavily faded balls recovered during the Great 300-Ball Race. Unidentified; no IDs assigned."},{key:"u_blue",name:"Blue Particle Ball",note:"Recovered the day after the 300-ball race. Unnumbered."},{key:"u_red",name:"Red Particle Ball",note:"Found in a bush after the blue ball went in. Unnumbered."}]),ou=Object.freeze([{title:"Chungus Nation",body:"Started at #101, right after #100, and reached #200. Featured: #101 buzz Chungus, #119 Norway Chungus, #189 RC Chungus and #200 Chungus nation. #110 NIGUS Chungus and #135 Vegas Chungus are different competitors. #269 LOS method stays under its own name. #43, #192 and #226 stay vacant."},{title:"Norway Cavern extraction",body:"During the Great 300-Ball Race a cut tree branch dislodged trapped balls and recovered #119 Norway Chungus. The original and the separate historical #119.1 RIP Norway Chungus are both kept. The game\u2019s Norway-Style Branch Sweeper is only inspired by this; it moves the player\u2019s production balls, never historical ones."},{title:"Creek Roller and the signed IDs",body:"#0 Creek roller, #-390 Enriquez, #-151 Marbella and #-15 271k keep their zero and minus signs everywhere, including replica art. Replica stencils are cosmetic: a replica keeps its own factory ID and production recipe and can never become a recovered original."},{title:"Faded recoveries and the Particle balls",body:"Unnamed faded recoveries stay unidentified with no invented IDs. The later Blue Particle Ball and Red Particle Ball are unnumbered entries."},{title:"New Creek Nation (possible future)",body:"A rebuild called New Creek Nation is a possibility, with a winter or spring idea noted. In the game you can build New Creek Nation workshops; their production numbers (NCN) are a separate namespace from the old roster."}]),oo=Object.freeze({expedition:["The latest outing was an expedition and inventory count, not a race. The last actual race was roughly a month earlier at the time of the report. There are no standings and no winner.","The creek was first described as empty of tennis balls. A follow-up reported one old-league ball found.","Evidence card (no photo): the find is likely #255 flip Thursday \u2014 the ball remembered as \u201CSpin Thursday\u201D. Status stays provisional until the find is confirmed directly.","Absent balls are Watchlist / Unconfirmed. An inaccurate count does not create a new RIP entry. Only a ball still absent after the next real race and a better verified count can become eligible for a new RIP variant.","Heavy Code Rot was reported in the territory above the Continental Shelf. Crawfish Springs was especially affected, including its crayfish.","The Folk Draft begins blowing through the upper zone. It is a downdraft: it pushes exposed airborne things down. It does not lift, does not flow upstream, and is not Code Rot."],places:[{name:"Continental Shelf",text:"Runs along the right side of the creek near the waterfall. The Shelf starts near the Springs and runs along the creek\u2019s right side. The final stretch before normal creek is from the creator\u2019s close-up marking; the rest is an approximate bank trace."},{name:"Crawfish Springs",text:"Sits in a secondary runoff chute off the main creek, with a large double-pond spring and crawfish. Reached from the brushy opening just before the Springs, then a climb up the Shelf."},{name:"The Clearing and deep pools",text:"Where the creator found Nigatron, a large water bug, while carrying race balls upstream. Open sky, grasses on the left and the wooded Shelf on the right in the photo\u2019s viewing direction."},{name:"Farlands",text:"The yellow line marks the entrance. The Farlands continue upstream for the rest of the creek. Only one or two expeditions have gone in."},{name:"Waterfall split",text:"At the fork the creek-right branch is the primary waterfall route; the alternate route goes the other way through a separate channel. The taped sign is roughly 20 feet upstream of the split."},{name:"Flat Rocks",text:"The usual historical start, by the big flat rocks."},{name:"Regular finish",text:"By the trail entrance. Its exact coordinates are unverified."}],otherNames:["Norway Cavern","Crayfish Pond (a hawk was seen here; separate from Crawfish Springs)","Peyton\u2019s Pool","Waterfall Zone","Nigus Howling Point","An unnamed leaf-hidden cavern (separate from Norway Cavern)"]}),lu=Object.freeze(["#0 Creek roller","#-390 Enriquez","#-151 Marbella","#-15 271k","#15 dru","#62 Mr. C","#64 Max Inventory","#89 pray for the left","#94 John Pork","#119 Norway Chungus","#200 Chungus nation"]);function cu(r){return r.slice().sort((t,e)=>parseFloat(t.id)-parseFloat(e.id)||t.id.length-e.id.length)}var Yc=[[[-117.46287,33.68153],[-117.46337,33.68168]],[[-117.46604,33.68169],[-117.46733,33.68155],[-117.46798,33.68108],[-117.46869,33.68019]],[[-117.54946,33.67267],[-117.54998,33.67251]],[[-117.62527,33.61389],[-117.62491,33.61251],[-117.62497,33.61219],[-117.62538,33.61193],[-117.6262,33.61172],[-117.62677,33.61065]],[[-117.51472,33.67811],[-117.51548,33.67813],[-117.51593,33.67789],[-117.51696,33.67643]],[[-117.54318,33.6741],[-117.54382,33.67428]],[[-117.5051,33.6821],[-117.50614,33.68227]],[[-117.64736,33.56908],[-117.64784,33.56886],[-117.64833,33.56829],[-117.64866,33.56695],[-117.64913,33.56653],[-117.64929,33.56611]],[[-117.62314,33.6289],[-117.62329,33.62872]],[[-117.59016,33.65724],[-117.59161,33.65609],[-117.59215,33.65593]],[[-117.49676,33.6838],[-117.49727,33.68384],[-117.49815,33.68357]],[[-117.56277,33.66871],[-117.56352,33.66837]],[[-117.61922,33.63432],[-117.61982,33.63397],[-117.62008,33.63356],[-117.6203,33.63274],[-117.62027,33.63204]],[[-117.63332,33.59401],[-117.63313,33.59349],[-117.63337,33.5928],[-117.63332,33.5924]],[[-117.49511,33.68352],[-117.4957,33.68357]],[[-117.6238,33.62323],[-117.6238,33.62284],[-117.62427,33.62155]],[[-117.50614,33.68227],[-117.50628,33.68219]],[[-117.47676,33.68309],[-117.47727,33.68338]],[[-117.61687,33.63607],[-117.61759,33.63493]],[[-117.52924,33.67392],[-117.5299,33.67404],[-117.53096,33.67383]],[[-117.65978,33.5419],[-117.6606,33.54099]],[[-117.49403,33.68397],[-117.49511,33.68352]],[[-117.46183,33.68143],[-117.46239,33.68138],[-117.46287,33.68153]],[[-117.47514,33.68165],[-117.47545,33.68189]],[[-117.65553,33.55448],[-117.65603,33.55403],[-117.65704,33.5535],[-117.6577,33.5529],[-117.65912,33.55009],[-117.65933,33.54917],[-117.65946,33.54764],[-117.65898,33.54472],[-117.65934,33.54398],[-117.6592,33.54341],[-117.65925,33.54306],[-117.65978,33.5419]],[[-117.60604,33.64638],[-117.60689,33.64599],[-117.6074,33.64558],[-117.60793,33.64495],[-117.60799,33.64455],[-117.60818,33.64432]],[[-117.55494,33.67138],[-117.5553,33.67135],[-117.55597,33.67165]],[[-117.50291,33.68254],[-117.50392,33.6823]],[[-117.60323,33.64848],[-117.6042,33.64796],[-117.60471,33.64742],[-117.6049,33.6469],[-117.60536,33.64663]],[[-117.67317,33.51962],[-117.67212,33.51898],[-117.67158,33.5184],[-117.67147,33.51807],[-117.67158,33.51682],[-117.67296,33.51559],[-117.67325,33.51512],[-117.67332,33.51465],[-117.67317,33.51422],[-117.67196,33.51351],[-117.67172,33.51322],[-117.6715,33.51166],[-117.67098,33.51095],[-117.67081,33.50905],[-117.67099,33.5075],[-117.67092,33.50654],[-117.67047,33.50555],[-117.67005,33.5052],[-117.66924,33.50489],[-117.6686,33.50407],[-117.66801,33.50301]],[[-117.58521,33.65979],[-117.58612,33.6594],[-117.58709,33.65877]],[[-117.5265,33.67405],[-117.52753,33.67398]],[[-117.62427,33.62155],[-117.62397,33.62076],[-117.62408,33.62015],[-117.62382,33.6195]],[[-117.50871,33.68118],[-117.50933,33.68111]],[[-117.50953,33.68101],[-117.51086,33.68034]],[[-117.6419,33.57522],[-117.64246,33.57484]],[[-117.51086,33.68034],[-117.5111,33.6803]],[[-117.63683,33.58379],[-117.63838,33.58245],[-117.63865,33.58201],[-117.63859,33.58167],[-117.63773,33.58068],[-117.63773,33.58039],[-117.63804,33.57996],[-117.63786,33.57914],[-117.63957,33.57789]],[[-117.55643,33.67166],[-117.55757,33.6717],[-117.5579,33.6716]],[[-117.52211,33.67496],[-117.52339,33.67491]],[[-117.56751,33.6669],[-117.56804,33.66714]],[[-117.62118,33.6313],[-117.62149,33.63068],[-117.62266,33.62968],[-117.62314,33.6289]],[[-117.65205,33.55931],[-117.65256,33.55805]],[[-117.492,33.68296],[-117.49265,33.68323],[-117.49323,33.68398],[-117.49403,33.68397]],[[-117.55306,33.67184],[-117.55384,33.67183],[-117.55431,33.67168]],[[-117.63223,33.60005],[-117.63253,33.59955],[-117.6324,33.59855],[-117.63189,33.59826],[-117.63165,33.59765],[-117.63251,33.59623],[-117.63303,33.59575],[-117.6334,33.59518],[-117.63332,33.59401]],[[-117.53096,33.67383],[-117.53165,33.6739]],[[-117.51327,33.67917],[-117.51423,33.67828],[-117.51472,33.67811]],[[-117.55974,33.66978],[-117.56027,33.66948],[-117.56077,33.66893],[-117.5616,33.66881]],[[-117.62677,33.61065],[-117.62673,33.60851],[-117.62746,33.60745]],[[-117.54876,33.67306],[-117.54946,33.67267]],[[-117.65435,33.55578],[-117.65472,33.55523],[-117.65553,33.55448]],[[-117.63013,33.60105],[-117.63096,33.60048],[-117.63185,33.60028],[-117.63223,33.60005]],[[-117.6454,33.57171],[-117.64574,33.57101],[-117.64642,33.57043],[-117.64709,33.56925],[-117.64736,33.56908]],[[-117.54295,33.674],[-117.54318,33.6741]],[[-117.6238,33.61925],[-117.62392,33.61891],[-117.62456,33.61833],[-117.62471,33.61739]],[[-117.52424,33.67464],[-117.5254,33.67439],[-117.52595,33.6744],[-117.5265,33.67405]],[[-117.54215,33.67369],[-117.54234,33.67371]],[[-117.53507,33.67422],[-117.53617,33.67448],[-117.53657,33.67427]],[[-117.47047,33.67957],[-117.47128,33.67994]],[[-117.5276,33.67399],[-117.52786,33.67401]],[[-117.54593,33.67468],[-117.54637,33.67471]],[[-117.47317,33.68086],[-117.47425,33.68095]],[[-117.46924,33.67969],[-117.46974,33.67948],[-117.47047,33.67957]],[[-117.48575,33.68286],[-117.48593,33.68362],[-117.48668,33.68445]],[[-117.55431,33.67168],[-117.55494,33.67138]],[[-117.5111,33.6803],[-117.51153,33.68041],[-117.5122,33.67974]],[[-117.47425,33.68095],[-117.47462,33.68108],[-117.47514,33.68165]],[[-117.54998,33.67251],[-117.5516,33.67186]],[[-117.64378,33.57359],[-117.64493,33.57243],[-117.6454,33.57171]],[[-117.64246,33.57484],[-117.64378,33.57359]],[[-117.51696,33.67643],[-117.51705,33.67634]],[[-117.64129,33.57705],[-117.64137,33.57686],[-117.64117,33.57596],[-117.6419,33.57522]],[[-117.58046,33.66191],[-117.58227,33.66181]],[[-117.58709,33.65877],[-117.58788,33.65858],[-117.58885,33.65793],[-117.58979,33.65755],[-117.59016,33.65724]],[[-117.59463,33.65407],[-117.59619,33.65309],[-117.59643,33.65251],[-117.5969,33.65214],[-117.59952,33.65085],[-117.59998,33.65037]],[[-117.56352,33.66837],[-117.56421,33.66786],[-117.56493,33.66765]],[[-117.47614,33.68243],[-117.47641,33.68288]],[[-117.61654,33.63634],[-117.61687,33.63607]],[[-117.46337,33.68168],[-117.46347,33.6817]],[[-117.62746,33.60745],[-117.6277,33.60685],[-117.62763,33.60642],[-117.62734,33.60587],[-117.62737,33.60545],[-117.62824,33.60499],[-117.62881,33.6039],[-117.62888,33.60343],[-117.62972,33.60221],[-117.62977,33.60164],[-117.63013,33.60105]],[[-117.48755,33.68497],[-117.4879,33.68514]],[[-117.50392,33.6823],[-117.5051,33.6821]],[[-117.50221,33.68279],[-117.50291,33.68254]],[[-117.46456,33.68175],[-117.46522,33.68161],[-117.46604,33.68169]],[[-117.5616,33.66881],[-117.56277,33.66871]],[[-117.52103,33.67511],[-117.52211,33.67496]],[[-117.61759,33.63493],[-117.61802,33.63467],[-117.61891,33.63441]],[[-117.6332,33.59214],[-117.63265,33.59105],[-117.6327,33.59072],[-117.633,33.59031],[-117.63413,33.58967],[-117.63614,33.58897]],[[-117.49105,33.68338],[-117.49142,33.6831],[-117.492,33.68296]],[[-117.57172,33.66649],[-117.57251,33.66606],[-117.57307,33.66545]],[[-117.48668,33.68445],[-117.48755,33.68497]],[[-117.51229,33.67964],[-117.5129,33.67939]],[[-117.66801,33.50301],[-117.66788,33.50258],[-117.66685,33.50094],[-117.66616,33.4995],[-117.66566,33.49653],[-117.66612,33.48949]],[[-117.56972,33.66661],[-117.57072,33.66626],[-117.57172,33.66649]],[[-117.60818,33.64432],[-117.60994,33.64351]],[[-117.62382,33.6195],[-117.6238,33.61925]],[[-117.52786,33.67401],[-117.5283,33.67398]],[[-117.63521,33.58607],[-117.63489,33.58581],[-117.63482,33.58559],[-117.63525,33.58458],[-117.63683,33.58379]],[[-117.46347,33.6817],[-117.46391,33.68182],[-117.46456,33.68175]],[[-117.59313,33.65511],[-117.59463,33.65407]],[[-117.54382,33.67428],[-117.54458,33.67433],[-117.54505,33.67456],[-117.54593,33.67468]],[[-117.48996,33.68414],[-117.49022,33.68384],[-117.49105,33.68338]],[[-117.45736,33.68278],[-117.45803,33.68257],[-117.459,33.68253],[-117.45991,33.68223]],[[-117.5283,33.67398],[-117.52888,33.67392]],[[-117.61891,33.63441],[-117.61922,33.63432]],[[-117.61474,33.63789],[-117.61565,33.63739],[-117.61614,33.63668],[-117.61654,33.63634]],[[-117.63332,33.5924],[-117.6332,33.59214]],[[-117.4957,33.68357],[-117.49676,33.6838]],[[-117.52888,33.67392],[-117.52924,33.67392]],[[-117.47641,33.68288],[-117.47676,33.68309]],[[-117.4879,33.68514],[-117.4884,33.68521],[-117.48897,33.68506],[-117.48996,33.68414]],[[-117.56532,33.66716],[-117.5667,33.66684],[-117.56751,33.6669]],[[-117.63614,33.58897],[-117.63651,33.58872],[-117.63657,33.58849],[-117.63618,33.58758],[-117.63521,33.58607]],[[-117.60994,33.64351],[-117.61201,33.64195],[-117.61275,33.64028]],[[-117.66962,33.52841],[-117.66993,33.52603]],[[-117.50074,33.68319],[-117.5014,33.68282],[-117.50221,33.68279]],[[-117.50628,33.68219],[-117.50639,33.6821]],[[-117.62448,33.62651],[-117.62401,33.62579],[-117.62384,33.62503],[-117.6238,33.62323]],[[-117.4815,33.68222],[-117.48216,33.68185],[-117.48254,33.6818],[-117.4856,33.68266]],[[-117.47727,33.68338],[-117.47816,33.68363],[-117.47859,33.68361]],[[-117.49961,33.68314],[-117.50074,33.68319]],[[-117.63957,33.57789],[-117.64017,33.57737],[-117.64129,33.57705]],[[-117.53986,33.67433],[-117.54025,33.67427],[-117.54118,33.67374],[-117.54215,33.67369]],[[-117.47128,33.67994],[-117.47213,33.68049],[-117.47317,33.68086]],[[-117.53657,33.67427],[-117.5372,33.67407],[-117.53912,33.67428]],[[-117.5129,33.67939],[-117.51327,33.67917]],[[-117.56804,33.66714],[-117.56926,33.66685],[-117.56972,33.66661]],[[-117.52339,33.67491],[-117.52424,33.67464]],[[-117.53432,33.67412],[-117.53464,33.67402],[-117.53507,33.67422]],[[-117.52753,33.67398],[-117.5276,33.67399]],[[-117.55952,33.66986],[-117.55974,33.66978]],[[-117.60536,33.64663],[-117.60604,33.64638]],[[-117.60304,33.6485],[-117.60323,33.64848]],[[-117.65256,33.55805],[-117.65297,33.55741],[-117.65374,33.5569],[-117.65435,33.55578]],[[-117.54859,33.67436],[-117.54863,33.67325],[-117.54876,33.67306]],[[-117.58321,33.66117],[-117.58354,33.66067],[-117.58521,33.65979]],[[-117.53912,33.67428],[-117.53986,33.67433]],[[-117.62471,33.61739],[-117.62468,33.61702],[-117.62424,33.6163],[-117.62418,33.61576]],[[-117.59998,33.65037],[-117.60028,33.64988],[-117.60106,33.64929],[-117.60253,33.64854],[-117.60304,33.6485]],[[-117.47859,33.68361],[-117.48006,33.68339],[-117.4815,33.68222]],[[-117.53403,33.6743],[-117.53432,33.67412]],[[-117.6606,33.54099],[-117.66106,33.54053],[-117.66123,33.53975],[-117.66163,33.53945],[-117.66251,33.53797],[-117.66453,33.53678],[-117.66535,33.53587],[-117.66607,33.53539],[-117.66662,33.53478],[-117.6669,33.53433],[-117.66697,33.53392],[-117.66684,33.5328],[-117.6669,33.53193],[-117.66835,33.53067],[-117.66943,33.53048],[-117.66963,33.53034],[-117.66967,33.53004],[-117.66914,33.52905],[-117.66931,33.52862],[-117.66962,33.52841]],[[-117.47545,33.68189],[-117.47614,33.68243]],[[-117.62402,33.62749],[-117.62455,33.62712],[-117.62448,33.62651]],[[-117.45991,33.68223],[-117.46069,33.68218],[-117.46183,33.68143]],[[-117.58227,33.66181],[-117.58287,33.66159],[-117.58321,33.66117]],[[-117.54847,33.67452],[-117.54859,33.67436]],[[-117.5516,33.67186],[-117.55306,33.67184]],[[-117.50639,33.6821],[-117.50669,33.6818],[-117.50715,33.68167],[-117.50759,33.68138],[-117.50871,33.68118]],[[-117.54637,33.67471],[-117.54718,33.67449],[-117.54789,33.67465],[-117.54847,33.67452]],[[-117.53165,33.6739],[-117.53188,33.67411],[-117.53252,33.67421]],[[-117.53252,33.67421],[-117.53403,33.6743]],[[-117.64929,33.56611],[-117.64992,33.56467],[-117.65035,33.56413],[-117.65215,33.56277],[-117.65223,33.56233],[-117.65211,33.56109],[-117.65169,33.56034],[-117.65205,33.55931]],[[-117.49815,33.68357],[-117.49961,33.68314]],[[-117.54234,33.67371],[-117.54295,33.674]],[[-117.5122,33.67974],[-117.51229,33.67964]],[[-117.66993,33.52603],[-117.66984,33.52543],[-117.66878,33.52355],[-117.66889,33.52288],[-117.67057,33.52074],[-117.67154,33.52025],[-117.67283,33.52024],[-117.67313,33.52003],[-117.67317,33.51962]],[[-117.57307,33.66545],[-117.57359,33.66504],[-117.57533,33.66425],[-117.57569,33.66379],[-117.57597,33.66291],[-117.57615,33.6627],[-117.57723,33.66275],[-117.58046,33.66191]],[[-117.4856,33.68266],[-117.48575,33.68286]],[[-117.51705,33.67634],[-117.51788,33.67566],[-117.51915,33.6751],[-117.52103,33.67511]],[[-117.62329,33.62872],[-117.62402,33.62749]],[[-117.5579,33.6716],[-117.55817,33.6712],[-117.55843,33.67016],[-117.55952,33.66986]],[[-117.59215,33.65593],[-117.59313,33.65511]],[[-117.62418,33.61576],[-117.62519,33.61446],[-117.62527,33.61389]],[[-117.46869,33.68019],[-117.46924,33.67969]],[[-117.50933,33.68111],[-117.50953,33.68101]],[[-117.56493,33.66765],[-117.56532,33.66716]],[[-117.55597,33.67165],[-117.55643,33.67166]],[[-117.61275,33.64028],[-117.61317,33.63884],[-117.61342,33.63844],[-117.61383,33.63818],[-117.61474,33.63789]],[[-117.62027,33.63204],[-117.62118,33.6313]]],zs=[{type:"Polygon",key:"springs",name:"Crawfish Springs",note:"Secondary runoff chute with a large double-pond spring and crawfish. The red outline marks the Springs and the area you described as the main concentration of Code Rot. Reach the Springs by climbing the Continental Shelf from the brushy approach in the red-circled ground photo. The mapped outline shows the area. The exact climb line, chute entrance, and individual pond edges still need field marks.",stroke:"#d12e39",accuracy:"Approximate screenshot trace",source:"Close annotated aerial view",group:null,code:null,coords:[[-117.62586,33.61243],[-117.62569,33.61252],[-117.62551,33.6126],[-117.62532,33.61267],[-117.62512,33.61271],[-117.62493,33.6127],[-117.62469,33.61267],[-117.62448,33.61261],[-117.62433,33.61253],[-117.62425,33.61246],[-117.62419,33.61236],[-117.62419,33.61224],[-117.62424,33.61211],[-117.62431,33.61197],[-117.62441,33.61183],[-117.62454,33.61168],[-117.62469,33.61154],[-117.62481,33.61148],[-117.62494,33.61147],[-117.62514,33.61147],[-117.62535,33.6115],[-117.62551,33.61156],[-117.62567,33.61164],[-117.6258,33.61166],[-117.62595,33.61177],[-117.62609,33.61191],[-117.62615,33.61201],[-117.62613,33.61213],[-117.62606,33.61225],[-117.62598,33.61234],[-117.62586,33.61243]]},{type:"LineString",key:"farlands",name:"Farlands entrance",note:"This line marks the approximate entrance beyond the Clearing and the end of the Shelf. The Farlands continue upstream past the mapped inset, with no outer boundary shown. Only one or two expeditions have gone in.",stroke:"#b98100",accuracy:"Approximate screenshot trace",source:"Approximate entry line traced from the yellow mark",group:null,code:null,coords:[[-117.62596,33.61894],[-117.62557,33.61895],[-117.62516,33.61891],[-117.62482,33.61888],[-117.6244,33.61881],[-117.624,33.61878],[-117.62349,33.6188]]},{type:"Polygon",key:"shelf-end",name:"Continental Shelf \xB7 final stretch",note:"The final stretch of the Continental Shelf before the creek returns to its normal character.",stroke:"#802c43",accuracy:"Approximate screenshot trace",source:"Farlands annotated aerial view",group:null,code:null,coords:[[-117.62493,33.61688],[-117.62478,33.61714],[-117.62459,33.61755],[-117.62444,33.61783],[-117.62429,33.61818],[-117.62406,33.61846],[-117.62385,33.61874],[-117.62376,33.61867],[-117.62389,33.61834],[-117.62402,33.61796],[-117.62425,33.6176],[-117.62453,33.6173],[-117.62474,33.61705],[-117.62493,33.61688]]},{type:"Polygon",key:"clearing",name:"The Clearing \xB7 Nigatron\u2019s deep pools",note:"The Clearing and its deep pools. Nigatron, a large water bug, was found here while creek-race balls were being carried upstream. In the open-sky ground photo, the Shelf is on the wooded right side and the opposite edge is grassy, in the direction the camera is looking.",stroke:"#ce3342",accuracy:"Approximate screenshot trace",source:"Farlands annotated aerial view",group:null,code:null,coords:[[-117.62512,33.61822],[-117.625,33.61833],[-117.62478,33.61841],[-117.62458,33.61838],[-117.62447,33.61829],[-117.62442,33.6181],[-117.62447,33.61791],[-117.62464,33.61776],[-117.62483,33.61765],[-117.62499,33.61764],[-117.62508,33.61774],[-117.62512,33.61791],[-117.62512,33.61822]]},{type:"Point",key:"shelf",name:"Continental Shelf",note:"The Continental Shelf is on the Crawfish Springs side of the creek. Purple shows the marked final stretch and the estimated connection along the wooded bank. The dashed connection is approximate. The red-circled ground photo shows the brushy climb toward the Springs.",stroke:"#7440a4",accuracy:"Approximate area label.",source:"Label near the creator\u2019s mapped final Shelf area on IMG_8217",group:null,code:null,coords:[-117.62411,33.61797]},{type:"LineString",key:"shelf-line",name:"Continental Shelf \xB7 estimated bank trace",note:"Approximate line on the wooded, Crawfish Springs side of the creek. The dashed stretch connects to the user-marked final section.",stroke:"#7440a4",accuracy:"Estimated bank trace.",source:"Bank-side estimate from the aerial imagery and field description.",group:null,code:null,coords:[[-117.62476,33.61258],[-117.62477,33.61265],[-117.62478,33.61272],[-117.62479,33.61279],[-117.6248,33.61286],[-117.62481,33.61293],[-117.62483,33.613],[-117.62484,33.61307],[-117.62486,33.61314],[-117.62487,33.61321],[-117.62489,33.61327],[-117.62491,33.61334],[-117.62492,33.61341],[-117.62494,33.61348],[-117.62496,33.61355],[-117.62497,33.61362],[-117.62499,33.61369],[-117.625,33.61376],[-117.62502,33.61383],[-117.62503,33.6139],[-117.62504,33.61397],[-117.62504,33.61404],[-117.62503,33.61411],[-117.62502,33.61418],[-117.62501,33.61425],[-117.62499,33.61432],[-117.62497,33.61439],[-117.62495,33.61446],[-117.62492,33.61452],[-117.62488,33.61459],[-117.62483,33.61466],[-117.62478,33.61473],[-117.62473,33.6148],[-117.62468,33.61487],[-117.62463,33.61494],[-117.62458,33.61501],[-117.62453,33.61508],[-117.62448,33.61515],[-117.62443,33.61522],[-117.62438,33.61529],[-117.62433,33.61536],[-117.62428,33.61543],[-117.62423,33.6155],[-117.62417,33.61557],[-117.6241,33.61564],[-117.62404,33.61571],[-117.62398,33.61577],[-117.62395,33.61584],[-117.62394,33.61591],[-117.62394,33.61598],[-117.62395,33.61605],[-117.62396,33.61612],[-117.62397,33.61619],[-117.62398,33.61626],[-117.62399,33.61633],[-117.624,33.6164],[-117.62403,33.61647],[-117.62406,33.61654],[-117.6241,33.61661],[-117.62415,33.61668],[-117.62419,33.61675],[-117.62423,33.61682],[-117.62427,33.61689],[-117.62432,33.61696],[-117.62436,33.61702],[-117.6244,33.61709],[-117.62442,33.61716],[-117.62443,33.61723],[-117.62443,33.6173],[-117.62443,33.61737],[-117.62442,33.61744],[-117.62441,33.61751],[-117.6244,33.61758],[-117.62437,33.61765]]},{type:"LineString",key:"shelf-end-line",name:"Continental Shelf \xB7 marked final stretch",note:"The solid segment follows the middle of the final Shelf stretch marked in the close-up. Its exact edges remain approximate.",stroke:"#7440a4",accuracy:"Traced from the marked aerial view.",source:"Center of the marked terminal area in IMG_8217.",group:null,code:null,coords:[[-117.62437,33.61765],[-117.62435,33.61769],[-117.62432,33.61774],[-117.6243,33.61778],[-117.62427,33.61782],[-117.62425,33.61787],[-117.62423,33.61791],[-117.6242,33.61795],[-117.62419,33.618],[-117.62417,33.61804],[-117.62415,33.61808],[-117.62414,33.61813],[-117.62412,33.61817],[-117.6241,33.61821],[-117.62407,33.61826],[-117.62405,33.6183],[-117.62402,33.61834],[-117.624,33.61839],[-117.62397,33.61843],[-117.62395,33.61847],[-117.62392,33.61852],[-117.6239,33.61856],[-117.62387,33.6186],[-117.62385,33.61865],[-117.62384,33.61869]]},{type:"Point",key:"waterfall-split",name:"Route split \xB7 approximate",note:"The route split is about 20 feet downstream from the taped sign near pin C. The waterfall is farther down the primary branch.",stroke:"#67472d",accuracy:"Approximate split. Pin C is the nearby photo viewpoint.",source:"Field estimate of about 20 ft downstream of taped sign",group:null,code:null,coords:[-117.62579,33.61258]},{type:"Point",key:"waterfall",name:"Waterfall \xB7 estimated location",note:"The falls are at the red squiggles in IMG_8218. The wider-map pin is an estimate from the red mark, using the taped-sign viewpoint and the roughly 20-foot sign-to-split distance as anchors.",stroke:"#b02d3e",accuracy:"Estimated from the screenshot and sign-to-split spacing.",source:"Red mark in IMG_8218 scaled using the sign-to-split estimate",group:null,code:null,coords:[-117.62616,33.61206]},{type:"Polygon",key:"flat-rocks",name:"Flat Rocks \xB7 usual start",note:"The usual Creek Rolling launch by the big flat rocks. In the tycoon it is one permanent factory site among several.",stroke:"#1d6a9c",accuracy:"Approximate screenshot trace",source:"Flat Rocks annotated aerial view",group:null,code:null,coords:[[-117.62579,33.61709],[-117.62572,33.61723],[-117.62557,33.61735],[-117.62541,33.61741],[-117.62525,33.61744],[-117.6251,33.6174],[-117.62497,33.6173],[-117.62491,33.61716],[-117.62494,33.61699],[-117.62505,33.61685],[-117.62519,33.61678],[-117.62538,33.61672],[-117.62553,33.61676],[-117.62566,33.61684],[-117.62575,33.61694],[-117.62579,33.61709]]},{type:"Point",key:"springs-approach-view",name:"Shelf climb view",note:"IMG_8183(1).jpeg matches the photo pin shown in both aerial views. This is the camera location across from the red-circled opening. The climb itself remains unpinned.",stroke:"#075c60",accuracy:"Approximate camera pin matched to an aerial screenshot.",source:"Exact thumbnail match in IMG_8215 and IMG_8216",group:"photo",code:"A",coords:[-117.62666,33.61096]},{type:"Point",key:"clearing-photo",name:"Deep pools scene",note:"IMG_8217 contains a different photo of the deep-pool scene shown in IMG_5686(1).jpeg. This pin locates the aerial thumbnail\u2019s camera. The supplied photo\u2019s exact camera position is unknown.",stroke:"#075c60",accuracy:"Aerial thumbnail camera pin. Scene reference only for IMG_5686(1).jpeg.",source:"Same scene. Different photo.",group:"photo",code:"B",coords:[-117.62477,33.61802]},{type:"Point",key:"waterfall-sign-photo",name:"Taped sign view",note:"IMG_5946.jpeg matches the thumbnail in IMG_8218. The taped sign is about 20 feet upstream of the route split. This pin shows the nearby photo viewpoint.",stroke:"#075c60",accuracy:"Approximate camera pin matched to an aerial screenshot.",source:"Exact thumbnail match in IMG_8218",group:"photo",code:"C",coords:[-117.62575,33.61261]},{type:"Point",key:"flat-rocks-photo",name:"Flat rock slab view",note:"IMG_5942.jpeg matches the thumbnail in IMG_8220. This is the camera location near the usual start. The blue start outline marks the launch area separately.",stroke:"#075c60",accuracy:"Approximate camera pin matched to an aerial screenshot.",source:"Exact thumbnail match in IMG_8220",group:"photo",code:"D",coords:[-117.62505,33.61647]}];var St=(r,t=document)=>t.querySelector(r),Fe=r=>"$"+Math.floor(r).toLocaleString("en-US"),vn=r=>r>=1e6?"$"+(r/1e6).toFixed(2)+"M":r>=1e4?"$"+(r/1e3).toFixed(r>=1e5?0:1)+"k":Fe(r),ct=r=>String(r).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),lo={shelf:{title:"Continental Shelf: flow and recipes",items:["The Flow Monitor (Controls tab) shows balls in flight and delay for every reach, and which reach holds back the line.","Dry-Weave is your first optional recipe: pick it per factory in the Sites panel.","Field notes for the right-side Shelf and the expedition are in the Archive.","Compare the Shelf launch with the Folk Draft in the upper zone: the downdraft pushes airborne balls down."]},springs:{title:"Crawfish Springs: controls and orders",items:["Each factory now has creek-side controls: pause its press or feeder, drain its queue, or stop new releases without touching other sites.","Your first optional shipment order is open at the finish station (Orders tab).","The crayfish habitat and the strongest Code Rot observations are marked here. The map legend keeps Current, Folk Draft and Code Rot separate.","Soft-Core recipe, the Springs Bank Sampler and the Crayfish Habitat Bypass are available."]},alder:{title:"Alder Bend: the Bank Workshop",items:["The optional Bank Workshop (Factory tab) stages surplus balls and carts them to a factory that needs them. It is a separate purchase from new launch sites.","Every launch site is already its own permanent factory and needs no workshop.","Clean-Seam recipe and the Norway-Style Branch Sweeper are available."]},gorge:{title:"Upper Gorge: the headwaters open",items:["Slate Steps, the first new headwater reach above the Gorge, can be bought from the Sites panel.","Industrial upgrades are listed in the Factory, Logistics and Finish tabs.","Your balance, machines and rolling balls are all kept."]},slate:{title:"Slate Steps",items:["Rapids Felt recipe, the Slate equipment, the Third Supply Route and the NCN Batch Stamp are available.","Keep shorter starts for quick cash, recipe tuning and testing releases."]}},co=class{constructor(t,e,n,i){this.game=t,this.view=e,this.audio=n,this.hooks=i,this.tab="factory",this.panel="shop",this.shopKey="",this.sitesKey="",this.netKey="",this.ordersKey="",this.labels=[],this.lostT=0,this.focusId=null,this.layers={tycoon:!0,field:!0},this.mapLabels=new Map,this.twoPostPick=[],this.build()}build(){let t=St("#ui");t.innerHTML=`
      <div id="hud">
        <div class="cash" id="cash">$0</div>
        <div class="chips">
          <span class="chip" title="Cash earned per minute over the last 60 s"><b id="cpm">$0</b>/min</span>
          <span class="chip" title="Balls waiting in every hopper and launch post"><b id="queued">0</b> queued</span>
          <span class="chip" title="Balls rolling down the creek"><b id="rolling">0</b> rolling</span>
        </div>
        <div class="sub" id="sub"></div>
      </div>
      <div id="topright">
        <div class="btnrow">
          <button data-act="map" title="Overhead map (M)">Map</button>
          <button data-act="follow" title="Follow the ball in view (F)">Follow</button>
          <button data-act="close" title="Close follow camera (C)">Close-up</button>
          <button data-act="home" title="Walk back to the selected factory (H)">Factory</button>
          <button data-act="archive" title="Creek League archive, field notes and factory records">Archive</button>
          <button data-act="quiet" title="Quiet watch view: hide the shop and stats (Q)">Watch</button>
          <button id="gear" title="Settings">\u2699</button>
        </div>
        <div id="settings" class="hidden">
          <label><input type="checkbox" id="optSound"> Sound</label>
          <label><input type="checkbox" id="optAuto"> Automation running</label>
          <label><input type="checkbox" id="optBob"> Head bob</label>
          <div class="qrow">Look sensitivity <input type="range" id="optSens" min="0.3" max="2.5" step="0.1"></div>
          <div class="qrow">Field of view <input type="range" id="optFov" min="50" max="95" step="1"> <span id="fovVal"></span></div>
          <div class="qrow">Graphics
            <select id="optQuality"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
          </div>
          <div class="hint">WASD / arrows to walk, Shift to run, mouse to look (click the view to capture the mouse), E to interact, Space to roll by hand at a factory, M map, F follow, Esc to come back. Phones: left stick walks, drag on the right to look.</div>
          <button id="help">Feature help\u2026</button>
          <button id="reset" class="danger">Reset save\u2026</button>
        </div>
      </div>
      <div id="panel">
        <div class="ptabs">
          <button class="ptab on" data-panel="shop">Shop</button>
          <button class="ptab" data-panel="sites">Sites</button>
          <button class="ptab" data-panel="network">Network</button>
          <button class="ptab" data-panel="orders">Orders</button>
          <button class="ptab collapse" id="collapse" title="Hide panel">\u25B8</button>
        </div>
        <div id="shop" class="pbody">
          <div class="tabs">${ah.map(s=>`<button data-tab="${s.id}" class="${s.id==="factory"?"on":""}">${s.name}</button>`).join("")}</div>
          <div id="target"></div>
          <div id="items"></div>
        </div>
        <div id="sites" class="pbody hidden"></div>
        <div id="network" class="pbody hidden"></div>
        <div id="orders" class="pbody hidden"></div>
      </div>
      <button id="openPanel" class="hidden">Shop</button>
      <div id="crosshair"></div>
      <div id="prompt" class="hidden"></div>
      <div id="rollWrap">
        <button id="roll"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" class="track"/><circle cx="50" cy="50" r="46" class="prog" id="rollProg"/></svg>
          <span class="t1">Make &amp; Roll</span><span class="t2" id="rollSub">Space</span></button>
      </div>
      <div id="touch" class="hidden">
        <div id="stick"><div id="knob"></div></div>
        <button id="tInteract">E</button>
        <button id="tMap">Map</button>
      </div>
      <div id="mapUI" class="hidden">
        <div class="mapbar">
          <button id="mapBack">\u2190 Back to walking</button>
          <label><input type="checkbox" id="layTycoon" checked> Tycoon map</label>
          <label><input type="checkbox" id="layField" checked> Field notes</label>
          <button id="fieldMapBtn">Field map (Arroyo Trabuco)</button>
          <span class="north">N \u2191</span>
        </div>
        <div id="reachList"></div>
        <div id="legend">
          <div><i class="lg cur"></i>Current (water flow)</div>
          <div><i class="lg draft"></i>Folk Draft (downdraft, Shelf)</div>
          <div><i class="lg rot"></i>Code Rot observations (simulated)</div>
          <div><i class="lg hist"></i>Historical landmark (approx.)</div>
          <div><i class="lg game"></i>Game-only reach</div>
        </div>
        <div id="mapLabels"></div>
      </div>
      <div id="modal" class="hidden"><div class="mbox"><button class="mclose" id="mclose">\xD7</button><div id="mbody"></div></div></div>
      <div id="balldetail" class="hidden"></div>
      <div id="toasts"></div>
      <div id="labels"></div>
      <div id="status"></div>
      <div id="fade"></div>
    `,this.el={cash:St("#cash"),cpm:St("#cpm"),queued:St("#queued"),rolling:St("#rolling"),sub:St("#sub"),items:St("#items"),target:St("#target"),sites:St("#sites"),network:St("#network"),orders:St("#orders"),roll:St("#roll"),rollProg:St("#rollProg"),rollSub:St("#rollSub"),toasts:St("#toasts"),labels:St("#labels"),status:St("#status"),panel:St("#panel"),prompt:St("#prompt"),mapUI:St("#mapUI"),reachList:St("#reachList"),mapLabels:St("#mapLabels"),modal:St("#modal"),mbody:St("#mbody"),balldetail:St("#balldetail"),fade:St("#fade"),crosshair:St("#crosshair")},this.statusEls={};let e=()=>{this.audio.unlock();let s=this.rollSite();if(s===null){this.toast("Walk up to a factory to roll by hand, or open the map to pick one");return}this.game.manualRoll(s)==="ok"&&this.game.selectSite(s)};this.el.roll.addEventListener("click",e),window.addEventListener("keydown",s=>{if(s.target.tagName==="INPUT"||s.target.tagName==="SELECT"||s.target.tagName==="TEXTAREA")return;let a=this.view;s.code==="Space"?(s.preventDefault(),e()):s.code==="KeyE"?this.interact():s.code==="KeyM"?this.toggleMap():s.code==="KeyF"?this.follow(!1):s.code==="KeyC"?this.follow(!0):s.code==="KeyH"?a.homeView():s.code==="KeyQ"?this.toggleQuiet():s.code==="Tab"?(s.preventDefault(),this.setPanel(this.el.panel.classList.contains("hidden"))):(s.code==="Escape"||s.code==="Backspace")&&(this.el.modal.classList.contains("hidden")?a.mode!=="fp"&&(a.returnToPlayer(),this.syncMode()):this.closeModal())}),t.querySelectorAll("[data-act]").forEach(s=>s.addEventListener("click",()=>{this.audio.unlock();let a=s.dataset.act;a==="map"?this.toggleMap():a==="follow"?this.follow(!1):a==="close"?this.follow(!0):a==="home"?(this.view.homeView(),this.syncMode()):a==="archive"?this.openArchive("archive"):a==="quiet"&&this.toggleQuiet()})),St("#gear").addEventListener("click",()=>St("#settings").classList.toggle("hidden"));let n=this.game.settings;St("#optSound").checked=n.sound,St("#optAuto").checked=n.auto,St("#optQuality").value=n.quality,St("#optBob").checked=n.headBob!==!1,St("#optSens").value=n.sens||1,St("#optFov").value=n.fov||70,St("#fovVal").textContent=`${n.fov||70}\xB0`,St("#optSound").addEventListener("change",s=>{n.sound=s.target.checked,this.audio.unlock(),this.audio.setEnabled(n.sound),this.hooks.save()}),St("#optAuto").addEventListener("change",s=>{n.auto=s.target.checked,this.hooks.save()}),St("#optBob").addEventListener("change",s=>{n.headBob=s.target.checked,this.view.player.headBob=n.headBob,this.hooks.save()}),St("#optSens").addEventListener("input",s=>{n.sens=+s.target.value,this.view.player.sens=n.sens,this.hooks.save()}),St("#optFov").addEventListener("input",s=>{n.fov=+s.target.value,this.view.setFov(n.fov),St("#fovVal").textContent=`${n.fov}\xB0`,this.hooks.save()}),St("#optQuality").addEventListener("change",s=>{n.quality=s.target.value,this.view.setQuality(n.quality),this.hooks.save()}),St("#help").addEventListener("click",()=>this.openHelp());let i=0;if(St("#reset").addEventListener("click",s=>{let a=s.currentTarget;if(performance.now()-i<4e3){this.hooks.reset();return}i=performance.now(),a.textContent="Tap again to erase all progress",setTimeout(()=>{performance.now()-i>=3900&&(a.textContent="Reset save\u2026")},4e3)}),t.querySelectorAll(".ptab[data-panel]").forEach(s=>s.addEventListener("click",()=>this.showPanel(s.dataset.panel))),St("#collapse").addEventListener("click",()=>this.setPanel(!1)),St("#openPanel").addEventListener("click",()=>this.setPanel(!0)),t.querySelectorAll("#shop .tabs button").forEach(s=>s.addEventListener("click",()=>{this.tab=s.dataset.tab,this.shopKey="",t.querySelectorAll("#shop .tabs button").forEach(a=>a.classList.toggle("on",a===s))})),this.el.target.addEventListener("change",s=>{s.target.id==="targetSel"&&(this.game.selectSite(+s.target.value),this.shopKey="")}),this.el.items.addEventListener("click",s=>{let a=s.target.closest("button[data-buy]");if(!a)return;this.audio.unlock();let o=a.dataset.buy,l=this.game.sel;this.game.buy(o,l)&&(this.toast(`Installed: ${ze[o].name}${sn(o)?` at ${rt[l].name}`:""}`),this.hooks.save(),this.shopKey="")}),this.el.sites.addEventListener("click",s=>this.onSitesClick(s)),this.el.sites.addEventListener("change",s=>this.onSitesChange(s)),this.el.network.addEventListener("click",s=>this.onNetworkClick(s)),this.el.network.addEventListener("change",s=>this.onNetworkChange(s)),this.el.orders.addEventListener("click",s=>this.onOrdersClick(s)),St("#mapBack").addEventListener("click",()=>{this.view.returnToPlayer(),this.syncMode()}),St("#layTycoon").addEventListener("change",s=>{this.layers.tycoon=s.target.checked}),St("#layField").addEventListener("change",s=>{this.layers.field=s.target.checked}),St("#fieldMapBtn").addEventListener("click",()=>this.openFieldMap()),this.el.reachList.addEventListener("click",s=>{let a=s.target.closest("[data-reach]");if(a){let o=Re[+a.dataset.reach];this.view.panMapTo((o.s0+o.s1)/2)}}),this.el.mapLabels.addEventListener("click",s=>{let a=s.target.closest("[data-site]");if(a){let l=+a.dataset.site;this.game.sites[l].open?(this.game.selectSite(l),this.showPanel("sites"),this.setPanel(!0)):(this.showPanel("sites"),this.setPanel(!0))}s.target.closest("[data-note]")&&this.openArchive("notes")}),St("#mclose").addEventListener("click",()=>this.closeModal()),this.el.modal.addEventListener("click",s=>{s.target===this.el.modal&&this.closeModal();let a=s.target.closest("[data-mtab]");a&&this.openArchive(a.dataset.mtab);let o=s.target.closest("[data-fm]");o&&this.openFieldMap(o.dataset.fm)}),this.touch="ontouchstart"in window||navigator.maxTouchPoints>0,this.touch){St("#touch").classList.remove("hidden");let s=St("#stick"),a=St("#knob"),o=null,l=0,c=0;s.addEventListener("pointerdown",d=>{o=d.pointerId,s.setPointerCapture(o);let u=s.getBoundingClientRect();l=u.left+u.width/2,c=u.top+u.height/2,d.preventDefault()}),s.addEventListener("pointermove",d=>{if(d.pointerId!==o)return;let u=(d.clientX-l)/48,f=(d.clientY-c)/48,y=Math.hypot(u,f);y>1&&(u/=y,f/=y),a.style.transform=`translate(${u*36}px, ${f*36}px)`,this.view.player.move.x=u,this.view.player.move.y=-f});let h=d=>{d.pointerId===o&&(o=null,a.style.transform="",this.view.player.move.x=0,this.view.player.move.y=0)};s.addEventListener("pointerup",h),s.addEventListener("pointercancel",h),St("#tInteract").addEventListener("click",()=>this.interact()),St("#tMap").addEventListener("click",()=>this.toggleMap())}this.view.player.wantLock=!this.touch,window.innerWidth<760&&this.setPanel(!1)}rollSite(){let t=this.view;return t.mode==="fp"?t.besideFactory():this.game.sel}toggleMap(){this.audio.unlock();let t=this.view;t.mode==="map"?t.returnToPlayer():t.enterMap(),this.syncMode()}follow(t){let e=this.view,n=this.game,i=e.mode==="fp"?e.ballInView():null;if(!i)for(let s of n.phys.balls)s.state==="roll"&&!s.paid&&(!i||s.id>i.id)&&(i=s);i?e.followBall(i.id,t):(e.followNext=t?"close":"far",this.toast("Following the next ball released")),this.syncMode()}syncMode(){let t=this.view.mode;this.el.mapUI.classList.toggle("hidden",t!=="map"),this.el.crosshair.classList.toggle("hidden",t!=="fp"),St("#touch")?.classList.toggle("dim",t!=="fp")}toggleQuiet(){document.body.classList.toggle("quiet"),this.game.settings.quiet=document.body.classList.contains("quiet")}interact(){this.audio.unlock();let t=this.view.nearestInteractable();if(!t)return;let e=this.game;t.type==="factory"?(e.selectSite(t.k),this.showPanel("sites"),this.setPanel(!0),this.sitesKey=""):t.type==="map"?(this.view.enterMap(),this.syncMode()):t.type==="finish"?this.openArchive("archive"):t.type==="workshop"?(this.showPanel("network"),this.setPanel(!0)):t.type==="stake"?this.openItem(t.id):t.type==="landmark"?this.openArchive("notes",t.id):t.type==="unlock"&&(this.showPanel("sites"),this.setPanel(!0),this.focusSite=t.k,this.sitesKey="")}setPanel(t){this.el.panel.classList.toggle("hidden",!t),St("#openPanel").classList.toggle("hidden",t),document.body.classList.toggle("panel-open",t)}showPanel(t){this.panel=t,document.querySelectorAll(".ptab[data-panel]").forEach(e=>e.classList.toggle("on",e.dataset.panel===t));for(let e of["shop","sites","network","orders"])St("#"+e).classList.toggle("hidden",e!==t);this.shopKey=this.sitesKey=this.netKey=this.ordersKey=""}openItem(t){let e=ze[t];e&&(this.setPanel(!0),this.showPanel("shop"),this.tab=e.tab,document.querySelectorAll("#shop .tabs button").forEach(n=>n.classList.toggle("on",n.dataset.tab===e.tab)),this.focusId=t,this.shopKey="")}toast(t,e=""){let n=document.createElement("div");for(n.className="toast "+e,n.textContent=t,this.el.toasts.appendChild(n),setTimeout(()=>n.classList.add("out"),3200),setTimeout(()=>n.remove(),3800);this.el.toasts.children.length>4;)this.el.toasts.firstChild.remove()}floatLabel(t,e,n,i,s){let a=this.labels.find(o=>!o.alive);if(!a){if(this.labels.length>40)return;let o=document.createElement("div");this.el.labels.appendChild(o),a={d:o,alive:!1},this.labels.push(a)}a.alive=!0,a.t=0,a.p={x:e,y:n,z:i},a.d.textContent=t,a.d.className="flab "+s,a.life=s==="lost"?2.2:1.4}onEvent(t){let e=this.game;if(t.type==="finish"){let n=this.view.camera.position;Math.hypot(t.x-n.x,t.z-n.z)<40&&this.floatLabel(`+$${t.amount}`,t.x,t.y+.1,t.z,"cash")}else if(t.type==="lost"){let n=this.view.camera.position;e.t-this.lostT>1.5&&Math.hypot(t.x-n.x,t.z-n.z)<30&&(this.lostT=e.t,this.floatLabel(`No finish: ${t.reason}`,t.x,t.y+.1,t.z,"lost"))}else if(t.type==="milestone"&&t.what==="gorge")this.toast("Milestone: first full run from the Upper Gorge!","big");else if(t.type==="milestone"&&t.what==="headwaters")this.showMilestone();else if(t.type==="intro")this.showIntro(t.what);else if(t.type==="unlock")this.toast(`${rt[t.k].name} is open. Its own factory is running \u2014 follow its first ball with F.`,"big");else if(t.type==="orderDone")this.toast(`\u2713 ${Xn.find(n=>n.id===t.id).name} complete: ${t.paid} balls, +${Fe(t.earned)} in bonuses`,"big");else if(t.type==="trialDone"){let n=e.trial;n&&n.after&&this.toast(`Measured: ${ze[n.id].name} \u2014 cash ${vn(n.before.cpm)}/min \u2192 ${vn(n.after.cpm)}/min (Network tab for details)`)}}showIntro(t){let e=lo[t];e&&(this.openModal(`<h2>${ct(e.title)}</h2><ul class="intro">${e.items.map(n=>`<li>${ct(n)}</li>`).join("")}</ul><div class="mfoot"><button id="introOk">Got it</button> <button id="introSkip" class="ghost">Skip</button> <span class="hint">You can reopen this from \u2699 \u2192 Feature help.</span></div>`),St("#introOk").addEventListener("click",()=>this.closeModal()),St("#introSkip").addEventListener("click",()=>this.closeModal()))}openHelp(){let t=Object.keys(lo).filter(e=>this.game.milestones[e]);this.openModal(`<h2>Feature help</h2>${t.length?t.map(e=>`<h3>${ct(lo[e].title)}</h3><ul class="intro">${lo[e].items.map(n=>`<li>${ct(n)}</li>`).join("")}</ul>`).join(""):"<p>New features are introduced as you open the Shelf, the Springs, Alder Bend and the Upper Gorge.</p>"}
      <h3>Controls</h3><p>WASD / arrows walk, Shift runs, mouse looks (click the view to capture it). E interacts with factories, map boards, the finish station and for-sale stakes. Space rolls a ball by hand at the factory beside you. M opens the north-up map; F follows a ball; Esc returns you to where you were standing.</p>`)}showMilestone(){this.openModal(`<h2>Cold Spring Headwaters \u2192 the finish gate</h2><p>The first ball from the top of the creek just crossed the original gate, after every reach of the network. The stretch where you rolled one ball by hand is now the final leg of a creek full of balls from factories you built.</p><p>Keep refining the same operation: clear bottlenecks, tune recipes and gates, and beat your best sustained cash per minute (${vn(this.game.bestCpm)}/min so far).</p><div class="mfoot"><button id="msOk">Keep building</button></div>`),St("#msOk").addEventListener("click",()=>this.closeModal())}openModal(t){this.el.mbody.innerHTML=t,this.el.modal.classList.remove("hidden"),document.pointerLockElement&&document.exitPointerLock()}closeModal(){this.el.modal.classList.add("hidden")}openArchive(t="archive",e=null){let n=this.game,i=`<div class="mtabs">${[["archive","Creek League Archive"],["notes","Field Notes"],["records","Factory Records"],["orders","Orders"]].map(([a,o])=>`<button data-mtab="${a}" class="${a===t?"on":""}">${o}</button>`).join("")}</div>`,s="";if(t==="archive")s=`<p class="ro">Read-only historical record. The factory never writes here.</p>
        <h3>Race records</h3><table class="rec">${su.map(a=>`<tr><th>${ct(a.event)}</th><td>${a.results.map(ct).join("<br>")}</td></tr>`).join("")}</table>
        <h3>Featured competitors</h3><table class="rec">${cu(ru).map(a=>`<tr><th>#${ct(a.id)}</th><td>${ct(a.name)} <span class="tagl">${ct(a.status)}</span>${a.note?`<div class="note">${ct(a.note)}</div>`:""}</td></tr>`).join("")}</table>
        <h3>Unnumbered</h3><ul>${au.map(a=>`<li><b>${ct(a.name)}</b> \u2014 ${ct(a.note)}</li>`).join("")}</ul>
        ${ou.map(a=>`<div class="card"><h4>${ct(a.title)}</h4><p>${ct(a.body)}</p></div>`).join("")}`;else if(t==="notes"){let a=this.view.exp.landmarks;s=`<p class="ro">Creek League field notes. Separate from the tycoon map and from the player\u2019s simulated production.</p>
        <h3>Expedition and inventory count</h3><ul>${oo.expedition.map(o=>`<li>${ct(o)}</li>`).join("")}</ul>
        <h3>Places</h3>${oo.places.map(o=>`<div class="card"><h4>${ct(o.name)}</h4><p>${ct(o.text)}</p></div>`).join("")}
        <h3>Landmarks in the game world</h3><table class="rec">${a.map(o=>`<tr class="${e===o.id?"hl":""}"><th>${ct(o.name)}</th><td>${o.unmapped?'<span class="tagl">Unmapped</span> ':'<span class="tagl">Approximate placement</span> '}${ct(o.note)}</td></tr>`).join("")}</table>
        <h3>Other confirmed names</h3><ul>${oo.otherNames.map(o=>`<li>${ct(o)}</li>`).join("")}</ul>
        <p><button data-fm="whole">Open the north-up field map</button></p>`}else if(t==="records"){let a=rt.map((l,c)=>{let h=n.routeStats[c],d=n.sites[c];return d.open||h.n?`<tr><th>${ct(l.name)}</th><td>${h.n} finishes \xB7 avg ${h.n?h.avg.toFixed(1)+" s":"\u2014"} \xB7 best ${h.best?h.best.toFixed(1)+" s":"\u2014"} \xB7 revenue ${Fe(d.stats.revenue)}</td></tr>`:""}).join(""),o=n.sites.filter(l=>l.open&&(l.ncnMade||l.owned.has("ncnStamp"))).map(l=>`<tr><th>${ct(rt[Ke[l.id]].name)}</th><td>NCN batch ${l.ncnBatch}: ${l.ncnMade} made, ${l.ncnFinished} finished</td></tr>`).join("");s=`<p class="ro">Your simulated production. These records never change the historical archive; a lost factory ball creates no RIP entry.</p>
        <h3>Network</h3><table class="rec"><tr><th>Best sustained cash</th><td>${vn(n.bestCpm)}/min (2-minute window)</td></tr><tr><th>Totals</th><td>${n.stats.made} made \xB7 ${n.stats.launched} launched \xB7 ${n.stats.finished} finished \xB7 ${n.stats.lost} lost \xB7 ${Fe(n.stats.paid)} paid</td></tr>
        <tr><th>Milestones</th><td>First Upper Gorge finish: ${n.records.gorgeFirst?"yes":"\u2014"} \xB7 First Cold Spring Headwaters finish: ${n.records.headFirst?"yes":"\u2014"}</td></tr>
        <tr><th>Finishes by recipe</th><td>${Ze.map((l,c)=>`${l.name} ${n.records.finishesByRecipe[c]||0}`).join(" \xB7 ")}</td></tr></table>
        <h3>By launch site</h3><table class="rec">${a}</table>
        ${o?`<h3>New Creek Nation batches</h3><table class="rec">${o}</table>`:""}`}else if(t==="orders"){this.closeModal(),this.showPanel("orders"),this.setPanel(!0);return}this.openModal(`<h2>Finish station</h2>${i}<div class="mscroll">${s}</div>`)}openFieldMap(t="whole"){let i=[];for(let x of Yc)for(let v of x)i.push(v);let s=[];for(let x of zs)if(x.type==="Point")s.push(x.coords);else for(let v of x.coords)s.push(v);let a=t==="whole"?i:s,o=1/0,l=-1/0,c=1/0,h=-1/0;for(let[x,v]of a)o=Math.min(o,x),l=Math.max(l,x),c=Math.min(c,v),h=Math.max(h,v);let d=t==="whole"?.01:.0012;o-=d,l+=d,c-=d,h+=d;let u=Math.cos((c+h)/2*Math.PI/180),f=Math.min(620/((l-o)*u),500/(h-c)),y=x=>10+(x-o)*u*f,g=x=>510-(x-c)*f,m=x=>x.map(([v,b],S)=>`${S?"L":"M"}${y(v).toFixed(1)},${g(b).toFixed(1)}`).join(""),p='<svg viewBox="0 0 640 520" class="fmap" role="img" aria-label="North-up field map">';p+='<rect width="640" height="520" class="fm-bg"/>';for(let x of Yc)p+=`<path d="${m(x)}" class="fm-main"/>`;for(let x of zs){if(t==="whole")break;x.type==="Polygon"?p+=`<path d="${m(x.coords)}Z" class="fm-area" style="stroke:${x.stroke}"><title>${ct(x.name)}</title></path>`:x.type==="LineString"&&(p+=`<path d="${m(x.coords)}" class="fm-line ${x.key==="shelf-line"?"dash":""}" style="stroke:${x.stroke}"><title>${ct(x.name)}</title></path>`)}for(let x of zs){if(x.type!=="Point")continue;let[v,b]=x.coords;t!=="whole"&&(x.group==="photo"?p+=`<g class="fm-pin"><circle cx="${y(v)}" cy="${g(b)}" r="8"/><text x="${y(v)}" y="${g(b)+4}">${ct(x.code)}</text><title>${ct(x.name)} \u2014 camera viewpoint</title></g>`:p+=`<g><circle cx="${y(v)}" cy="${g(b)}" r="4" class="fm-pt" style="fill:${x.stroke}"/>${t!=="whole"?`<text x="${y(v)+7}" y="${g(b)+4}" class="fm-lab">${ct(x.name)}</text>`:""}<title>${ct(x.name)}</title></g>`)}if(t==="whole"){let x=s.reduce((b,S)=>b+S[0],0)/s.length,v=s.reduce((b,S)=>b+S[1],0)/s.length;p+=`<rect x="${y(x)-7}" y="${g(v)-9}" width="14" height="18" class="fm-box"/><text x="${y(x)+12}" y="${g(v)+4}" class="fm-lab">Creek Rolling reach</text>`}else{let x=zs.find(v=>v.key==="farlands");if(x){let[v,b]=x.coords[Math.floor(x.coords.length/2)];p+=`<text x="${y(v)}" y="${g(b)-14}" class="fm-lab gold">\u2191 Farlands continue</text>`}}p+='<text x="614" y="28" class="fm-n">N</text><path d="M619,34 l-6,14 l6,-4 l6,4z" class="fm-arrow"/></svg>';let _=zs.map(x=>`<tr><th>${x.code?ct(x.code)+" \xB7 ":""}${ct(x.name)}</th><td>${ct(x.accuracy||"")}${x.note?`<div class="note">${ct(x.note)}</div>`:""}</td></tr>`).join("");this.openModal(`<h2>Arroyo Trabuco field map (north up)</h2>
      <div class="mtabs"><button data-fm="whole" class="${t==="whole"?"on":""}">Whole creek</button><button data-fm="reach" class="${t==="reach"?"on":""}">Creek Rolling reach</button><button data-mtab="notes">Field notes</button></div>
      <div class="mscroll">${p}
      <p class="hint">Blue: USGS National Hydrography Dataset main channel (simplified). Coloured shapes: the creator\u2019s approximate traces and estimates. Lettered pins are photo camera viewpoints (A shelf climb view, B deep-pool scene, C taped sign, D flat rock slab), kept separate from the features they show. The trail-entrance finish is unpinned. Never the San Juan Creek confluence.</p>
      <table class="rec">${_}</table></div>`)}update(t){let e=this.game,n=this.el,i=this.view;n.cash.textContent=Fe(e.cash),n.cpm.textContent=vn(e.cashPerMin(60)),n.queued.textContent=e.hopperTotal(),n.rolling.textContent=e.ballsRolling();let s=[];s.push(`Paid ${vn(e.stats.paid)} \xB7 ${e.stats.finished} finished \xB7 ${e.stats.lost} lost`);let a=e.nextArrival();a!==null&&!(e.lastFinish&&e.t-e.lastFinish.t<6)&&a>1.5&&s.push(`First ball in ~${Math.ceil(a)} s`),e.bestCpm>0&&s.push(`Best sustained ${vn(e.bestCpm)}/min`);let o=e.site;if(s.push(`<span class="selsite">${ct(rt[e.sel].name)}</span>${o.reason?` \xB7 <span class="why">${ct(o.reason)}</span>`:""}`),e.owned.has("pressureAlerts")){let p=e.pressureAlert();p&&s.push(`<span class="alert" data-alert-s="${p.s}">\u26A0 ${ct(p.text)}</span>`)}n.sub.innerHTML=s.map(p=>`<div>${p}</div>`).join("");let l=n.sub.querySelector("[data-alert-s]");l&&!l._bound&&(l._bound=!0,l.addEventListener("click",()=>{i.panMapTo(+l.dataset.alertS),this.syncMode()}));let c=this.rollSite(),h=c!==null?e.sites[c]:null,d=h?h.manualCD/vr:1,u=2*Math.PI*46;n.rollProg.style.strokeDasharray=`${u}`,n.rollProg.style.strokeDashoffset=`${u*Math.min(1,d)}`,n.roll.classList.toggle("cool",d>0||c===null),n.rollSub.textContent=c===null?"Walk to a factory":h.hopper.length+h.post.length?`${rt[c].name}: release a queued ball`:`${rt[c].name}: make one \xB7 $${e.payoutFor(c)}`;let f=i.nearestInteractable();f&&i.mode==="fp"?(n.prompt.classList.remove("hidden"),n.prompt.textContent=`${this.touch?"Tap E":"E"} \u2014 ${f.label}`):n.prompt.classList.add("hidden"),n.fade.style.opacity=i.player.fade;let y=i.workshops.get(e.sel),g={press:y&&y.pressWorld(),feeder:y&&y.feederWorld(),creek:i.finish.slots[0]},m={press:o.pressStatus,feeder:o.feederStatus,creek:e.status.creek};for(let p of Object.keys(m)){let _=this.statusEls[p];_||(_=document.createElement("div"),_.className="status hidden",n.status.appendChild(_),this.statusEls[p]=_);let x=m[p];if(!(x&&x!=="Paused"&&g[p]&&i.mode!=="map")){_.classList.add("hidden");continue}let b=i.project(g[p],{});if(!b.visible){_.classList.add("hidden");continue}_.classList.remove("hidden"),_.textContent=x,_.style.transform=`translate(${b.x}px, ${b.y}px) translate(-50%, -100%)`}for(let p of this.labels){if(!p.alive)continue;if(p.t+=t,p.t>p.life){p.alive=!1,p.d.style.opacity=0;continue}let _=i.project(p.p,{});p.d.style.opacity=_.visible?String(1-(p.t/p.life)**2):0,p.d.style.transform=`translate(${_.x}px, ${_.y-p.t*40}px) translate(-50%, -100%)`}i.mode==="map"?this.updateMap():this.el.mapLabels.innerHTML="",this.updateBallDetail(),this.el.panel.classList.contains("hidden")||(this.panel==="shop"?this.renderShop():this.panel==="sites"?this.renderSites():this.panel==="network"?this.renderNetwork():this.panel==="orders"&&this.renderOrders())}updateBallDetail(){let t=this.view,e=this.game,n=t.mode==="follow"?t.rig.follow:null,i=n!=null?e.phys.balls.find(o=>o.id===n):null;if(!i){this.el.balldetail.classList.add("hidden");return}this.el.balldetail.classList.remove("hidden");let s=`${i.id}|${i.cpi}|${Math.floor(i.age)}`;if(this.bdKey===s)return;this.bdKey=s;let a=Ze[i.recipe||0];this.el.balldetail.innerHTML=`<div class="bdh">Factory ball #${i.id}${i.ncn?` \xB7 NCN-${String(i.ncn).padStart(5,"0")}`:""}</div>
      <div>Made at ${ct(rt[i.site??i.start].name)} \xB7 launched from ${ct(rt[i.start].name)}</div>
      <div>${ct(a.name)} \xB7 pays ${Fe(i.payout)}${i.orderId?" (incl. order bonus)":""}</div>
      <div>${i.cps.length?`Checkpoints ${i.cpi}/${i.cps.length} \xB7 `:""}${i.age.toFixed(0)} s rolling</div>
      ${i.replica?`<div class="rep">Replica stencil: ${ct(i.replica)} \u2014 a cosmetic marking, not a recovered original</div>`:""}
      <button id="bdBack">Back to where I was</button>`,St("#bdBack").addEventListener("click",()=>{t.returnToPlayer(),this.syncMode()})}updateMap(){let t=this.view,e=this.game,n=e.creek,i=e.reachStats.map(c=>c.count).join(",")+"|"+Math.floor(e.t/2);if(i!==this.reachKey){this.reachKey=i;let c=this.reachDelays();this.el.reachList.innerHTML='<div class="rlh">Reaches (downstream first)</div>'+Re.map((h,d)=>{let u=e.reachStats[d],f=u.count/e.reachCap(d),y=rt.some((g,m)=>e.sites[m].open&&g.s<h.s1);return`<div class="rl ${f>=.9?"hot":f>.6?"warm":""} ${y?"":"dim"}" data-reach="${d}"><span>${ct(h.name)}</span><span>${u.count}/${e.reachCap(d)}${c[d]!==null?` \xB7 ${c[d]>=0?"+":""}${c[d].toFixed(1)} s`:""}</span></div>`}).join("")}let s=[];if(this.layers.tycoon&&rt.forEach((c,h)=>{let d=e.sites[h],u=t.worldAt(c.s,n.c(c.s)+n.wR(c.s)+1,.4),f=d.open?d.reason?d.reason:`${d.stats.launched} launched \xB7 ${d.hopper.length+d.post.length} queued`:e.unlockable(h)?`for sale ${vn(c.cost)}`:"locked";s.push({key:"s"+h,p:u,html:`<div class="ml site ${d.open?"open":""} ${h===e.sel?"sel":""} ${c.layer==="game"?"game":""}" data-site="${h}"><b>${ct(c.name)}</b><small>${ct(f)}</small></div>`})}),this.layers.field){for(let d of t.exp.landmarks)d.unmapped||s.push({key:"f"+d.id,p:{x:d.x,y:d.y+.2,z:d.z},html:`<div class="ml note" data-note="${d.id}">\u25C6 ${ct(d.name)} <small>approx.</small></div>`});let c=t.worldAt(77.8,1.4,1.5);s.push({key:"draft",p:c,html:'<div class="ml draftlab">\u2B07 Folk Draft (downdraft)</div>'});let h=t.worldAt(58.6,n.c(58.6)+1.4,.3);s.push({key:"rot",p:h,html:'<div class="ml rotlab">Code Rot observations (strongest)</div>'})}let a=new Set,o=[],l=c=>c.key==="s"+e.sel?0:c.key[0]==="s"&&e.sites[+c.key.slice(1)].open?1:c.key[0]==="f"?2:3;s.sort((c,h)=>l(c)-l(h));for(let c of s){a.add(c.key);let h=this.mapLabels.get(c.key);h||(h=document.createElement("div"),h.className="mlw",this.el.mapLabels.appendChild(h),this.mapLabels.set(c.key,h)),h._html!==c.html&&(h.innerHTML=c.html,h._html=c.html,h.style.display="",h._w=h.offsetWidth,h._h=h.offsetHeight);let d=t.project(c.p,{}),u={x0:d.x-h._w/2,x1:d.x+h._w/2,y0:d.y-h._h,y1:d.y},f=o.some(g=>u.x0<g.x1&&u.x1>g.x0&&u.y0<g.y1&&u.y1>g.y0),y=d.visible&&!f;y&&o.push(u),h.style.display=y?"":"none",h.style.transform=`translate(${d.x}px, ${d.y}px) translate(-50%, -100%)`}for(let[c,h]of this.mapLabels)a.has(c)||(h.remove(),this.mapLabels.delete(c))}reachDelays(){let t=this.game,e=Re.map(()=>null);if(!t.owned.has("flowMonitor"))return e;let n=Re.map(()=>[0,0]);for(let i of t.splits)for(let s of i.parts){let a=Re.findIndex(o=>(s.s0+s.s1)/2>=o.s0&&(s.s0+s.s1)/2<o.s1);a<0||(n[a][0]+=s.t,n[a][1]++)}return n.map(([i,s],a)=>s?i/s-(Re[a].s1-Re[a].s0)/1.15:null)}renderShop(){let t=this.game,e=t.sel,n=t.suggestions(),i=Li.filter(l=>l.tab===this.tab),s=this.tab+"|"+e+"|"+i.map(l=>{let c=t.canBuy(l.id,e);return l.id+(t.has(l.id,e)?"o":c.ok?"y":c.avail?"a"+Math.floor(t.cash/l.price*20):"n"+(c.why||""))+(n[l.id]||"")}).join(",")+"|"+this.focusId+Object.keys(n).join("");if(document.querySelectorAll("#shop .tabs button").forEach(l=>{let c=Li.filter(d=>d.tab===l.dataset.tab&&t.canBuy(d.id,e).ok).length,h=Li.filter(d=>d.tab===l.dataset.tab&&n[d.id]).length;l.dataset.badge=h?"!":c?String(c):""}),s===this.shopKey)return;this.shopKey=s;let a=i.some(l=>sn(l.id)),o=t.openSites();if(this.el.target.innerHTML=a?`<div class="targ">Factory upgrades are bought for one site: <select id="targetSel">${o.map(l=>`<option value="${l}" ${l===e?"selected":""}>${ct(rt[l].name)}</option>`).join("")}</select></div>`:"",this.el.items.innerHTML=i.map(l=>{let c=t.has(l.id,e),h=t.canBuy(l.id,e),d=[...l.requires.map(g=>ze[g].name),...(l.requiresGlobal||[]).map(g=>ze[g].name),...l.area?[rt[Ke[l.area]].name]:[]],u=c?'<span class="own">Installed \u2713</span>':h.ok?`<button data-buy="${l.id}">Buy ${Fe(l.price)}</button>`:h.avail?`<button data-buy="${l.id}" disabled>${Fe(l.price)}</button><div class="bar"><i style="width:${Math.min(100,t.cash/l.price*100)}%"></i></div>`:`<span class="lock">\u{1F512} ${ct(h.why||"")}</span>`,f=["item",c?"owned":"",!c&&!h.ok&&!h.avail?"locked":"",n[l.id]&&!c?"sug":"",this.focusId===l.id?"focus":"",l.lore?"lore":""].join(" "),y="";if(sn(l.id)&&!c&&l.tab==="factory"&&ze[l.id].requires.every(g=>t.has(g,e)||sn(g)===!1)){let g=x=>{if(!x.has("press"))return null;let v=_r(x);return 60/Math.max(v.cycle,x.has("feeder")?v.feeder:0)},m=g(t.sites[e].owned),p=g(new Set([...t.sites[e].owned,l.id])),_=x=>x===null?"hand-rolled":`${x.toFixed(0)} balls/min`;y=`<div class="rq">At ${ct(rt[e].name)}: ${_(m)} \u2192 ${_(p)} (machine limit; the creek can still limit launches)</div>`}return`<div class="${f}" id="item-${l.id}">
        <div class="ih"><span class="nm">${ct(l.name)}${l.lore?' <span class="tagl">lore</span>':""}</span><span class="pr">${Fe(l.price)}</span></div>
        <div class="ef">${ct(l.effect)}</div>
        ${sn(l.id)?`<div class="rq">For: ${ct(rt[e].name)} only</div>`:""}
        ${y}
        <div class="rq">${d.length?"Requires: "+d.map(ct).join(", "):"No prerequisite"}</div>
        ${n[l.id]&&!c?`<div class="sg">Suggested \u2014 ${ct(n[l.id])}</div>`:""}
        <div class="st">${u}</div>
      </div>`}).join(""),this.focusId){let l=document.getElementById("item-"+this.focusId);l&&l.scrollIntoView({block:"nearest",behavior:"smooth"}),setTimeout(()=>{this.focusId=null,this.shopKey=""},2500)}}renderSites(){let t=this.game,e=[t.sel,Math.floor(t.t*2),t.cash>0?Math.floor(Math.log10(t.cash+1)*10):0].join("|");if(e===this.sitesKey)return;this.sitesKey=e;let n=t.owned.has("batchScheduler"),i=rt.map(()=>0);for(let l of t.phys.balls)l.state==="roll"&&!l.paid&&i[l.start]++;let s={made:0,launched:0,finished:0,lost:0,queued:0,transit:0};for(let l of t.sites)s.made+=l.stats.made,s.launched+=l.stats.launched,s.finished+=l.stats.finished,s.lost+=l.stats.lost,s.queued+=l.hopper.length+l.post.length;for(let l of t.workshop.carts)s.transit+=l.load?l.load.length:0;let a=`<div class="sh">Every open site is a permanent factory and keeps running while you walk away or look at another site. Network: ${s.made} made \xB7 ${s.queued} queued \xB7 ${s.transit} in carts \xB7 ${t.ballsRolling()} rolling \xB7 ${s.finished} finished \xB7 ${s.lost} lost.</div>`,o=rt.map((l,c)=>{let h=t.sites[c];if(!h.open){let x=t.unlockable(c);return`<div class="start locked ${this.focusSite===c?"focus":""}"><div class="ih"><span class="nm">${ct(l.name)}${l.layer==="game"?' <span class="tagl">game-only</span>':""}</span><span class="pr">${Fe(l.base)}/ball</span></div>
          <div class="ef">${ct(l.blurb)}</div><div class="rq">Typical run ${ct(l.target)} \xB7 adds its own basic factory line${t.anySite("feeder")?" (press + feeder)":""}</div>
          <div class="st">${x?`<button data-unlock="${c}" ${t.cash>=l.cost?"":"disabled"}>Open site ${Fe(l.cost)}</button>`:`<span class="lock">\u{1F512} ${Fe(l.cost)} \xB7 after ${ct(rt[Ke[l.after]].name)}</span>`}</div></div>`}let d=t.siteNumbers(c),u=c===t.sel,f=Ze[h.recipe],y=t.payoutFor(c),g=h.owned.has("press")?60/Math.max(d.cycle*(h.recipe===5?1.15:1),h.owned.has("feeder")?d.feeder:0):0,m=Ze.map((x,v)=>`<option value="${v}" ${v===h.recipe?"selected":""} ${t.recipeAvailable(v)?"":"disabled"}>${ct(x.name)}${x.pct?` (+${Math.round(x.pct*100)}%)`:""}${t.recipeAvailable(v)?"":" \u2014 "+ct(rt[Ke[x.area]].name)}</option>`).join(""),p=t.isOpen("springs")?`<div class="ctrls">
          <label><input type="checkbox" data-en="press" data-k="${c}" ${h.enabled.press?"checked":""}> Press</label>
          <label><input type="checkbox" data-en="feeder" data-k="${c}" ${h.enabled.feeder?"checked":""}> Feeder</label>
          <label><input type="checkbox" data-en="release" data-k="${c}" ${h.enabled.release?"checked":""}> New releases</label>
          <button data-drain="${c}" class="ghost">Drain queue</button>
          ${h.owned.has("shapeGauge")?`<label><input type="checkbox" data-gauge="${c}" ${h.gauge?"checked":""}> Shape gauge</label>`:""}
        </div>`:"",_=u?`<details ${this.advOpen?"open":""} data-adv="1"><summary>Advanced</summary>
          <div class="qrow">Feeder gap <select data-gap="${c}"><option value="0" ${h.gap?"":"selected"}>${t.owned.has("autoGap")?"Automatic":"Machine speed"}</option>${[1,1.5,2,3,4].map(x=>`<option value="${x}" ${h.gap===x?"selected":""}>${x} s</option>`).join("")}</select></div>
          ${n?`<div class="qrow">Batch queue: ${h.batch.map(x=>`${ct(Ze[x.recipe].name)} ${x.made}/${x.count}`).join(" \u2192 ")||"empty"} <select data-bq="${c}">${Ze.map((x,v)=>t.recipeAvailable(v)?`<option value="${v}">${ct(x.name)}</option>`:"").join("")}</select> <input type="number" min="1" max="500" value="25" data-bqn="${c}" style="width:4.5em"> <button data-bqadd="${c}" ${h.batch.length>=3?"disabled":""}>Queue</button> <button data-bqclr="${c}" class="ghost">Clear</button></div>`:""}
          ${h.owned.has("replicaJig")?`<div class="qrow">Replica stencil <select data-rep="${c}"><option value="">None</option>${lu.map(x=>`<option ${h.replica===x?"selected":""}>${ct(x)}</option>`).join("")}</select></div>`:""}
          ${h.owned.has("ncnStamp")?`<div class="qrow">NCN batch ${h.ncnBatch}: ${h.ncnMade} made, ${h.ncnFinished} finished <button data-ncnnew="${c}" class="ghost">Start new batch</button></div>`:""}
        </details>`:"";return`<div class="start ${u?"sel":""}">
        <div class="ih"><span class="nm">${ct(l.name)}</span><span class="pr">${Fe(y)}/ball</span></div>
        <div class="rq">${h.owned.has("press")?`${g.toFixed(0)} balls/min machine rate`:"hand-rolled"} \xB7 ~${Math.round(t.etaFor(c))} s to finish \xB7 ${vn(h.stats.revenue)} earned</div>
        <div class="counts"><span>${h.stats.made} made</span><span>${h.hopper.length+h.post.length} waiting</span><span>${h.stats.launched} launched</span><span>${i[c]} rolling</span><span>${h.stats.finished} finished</span><span>${h.stats.lost} lost</span></div>
        ${h.reason?`<div class="why">${ct(h.reason)}</div>`:""}
        <div class="qrow">Recipe <select data-recipe="${c}">${m}</select>${h.changeT>0?` <span class="why">changeover ${h.changeT.toFixed(1)} s</span>`:""}</div>
        <div class="rq">${ct(f.note)} Next ball pays ${Fe(y)} = ${Fe(l.base)} route${qs(t.specFor(c))?` + ${Fe(qs(t.specFor(c)))} ball upgrades`:""}${Ws(l.base,h.recipe)?` + ${Fe(Ws(l.base,h.recipe))} recipe`:""}${g?` \xB7 up to ${vn(y*g)}/min if the creek keeps up`:""}.</div>
        ${p}
        <div class="st">${u?'<span class="own">Selected</span>':`<button data-select="${c}">Select</button>`} <button data-go="${c}" class="ghost">Walk there</button> <button data-mapto="${c}" class="ghost">Map</button></div>
        ${_}
      </div>`}).join("");this.el.sites.innerHTML=a+o}onSitesClick(t){let e=this.game,n=this.view,i=t.target.closest("button");if(i){if(this.audio.unlock(),i.dataset.unlock!==void 0)e.unlock(+i.dataset.unlock)&&(this.hooks.save(),this.syncMode());else if(i.dataset.select!==void 0)e.selectSite(+i.dataset.select);else if(i.dataset.go!==void 0)e.selectSite(+i.dataset.go),n.mode!=="fp"&&n.returnToPlayer(),n.spawnAt(+i.dataset.go),this.syncMode();else if(i.dataset.mapto!==void 0)n.panMapTo(rt[+i.dataset.mapto].s),this.syncMode();else if(i.dataset.drain!==void 0){let s=e.sites[+i.dataset.drain];s.enabled.press=!1,s.enabled.feeder=!0,s.enabled.release=!0,this.toast(`Draining ${rt[+i.dataset.drain].name}: press paused, queued balls still launch`)}else if(i.dataset.bqadd!==void 0){let s=+i.dataset.bqadd,a=+this.el.sites.querySelector(`[data-bq="${s}"]`).value,o=+this.el.sites.querySelector(`[data-bqn="${s}"]`).value;e.queueBatch(s,a,o)}else if(i.dataset.bqclr!==void 0)e.sites[+i.dataset.bqclr].batch=[];else if(i.dataset.ncnnew!==void 0){let s=e.sites[+i.dataset.ncnnew];s.ncnBatch++,s.ncnMade=0,s.ncnFinished=0}this.sitesKey="",this.hooks.save()}}onSitesChange(t){let e=this.game,n=t.target;n.dataset.recipe!==void 0?e.setRecipe(+n.dataset.recipe,+n.value)&&this.toast(`Changing recipe to ${Ze[+n.value].name} at ${rt[+n.dataset.recipe].name}`):n.dataset.en?e.sites[+n.dataset.k].enabled[n.dataset.en]=n.checked:n.dataset.gauge!==void 0?e.sites[+n.dataset.gauge].gauge=n.checked:n.dataset.gap!==void 0?e.sites[+n.dataset.gap].gap=+n.value:n.dataset.rep!==void 0&&(e.sites[+n.dataset.rep].replica=n.value||null);let i=n.closest("details");i&&(this.advOpen=i.open),this.sitesKey="",this.hooks.save()}renderNetwork(){let t=this.game,e=Math.floor(t.t)+"|"+[...t.owned].length+"|"+JSON.stringify(t.workshop.routes)+t.splitGate+(t.bench.current?1:0)+t.bench.windows.length;if(e===this.netKey)return;this.netKey=e;let n=[];if(t.owned.has("flowMonitor")){let s=this.reachDelays(),a=-1,o=-1;t.reachStats.forEach((l,c)=>{let h=l.count/t.reachCap(c)+Math.max(0,s[c]||0)/20;h>o&&(o=h,a=c)}),n.push(`<h3>Flow Monitor</h3><table class="rec">${Re.map((l,c)=>{let h=t.reachStats[c];return!h.count&&s[c]===null?"":`<tr class="${c===a&&h.count?"hl":""}"><th>${ct(l.name)}</th><td>${h.count} in flight (cap ${t.reachCap(c)})${s[c]!==null?` \xB7 avg delay ${s[c].toFixed(1)} s`:""}</td></tr>`}).join("")}</table>${a>=0&&t.reachStats[a].count?`<p class="why">Holding back the line: ${ct(Re[a].name)}</p>`:""}`)}else n.push('<p class="hint">Buy the Flow Monitor (Controls) to see delay and congestion by reach.</p>');if(t.owned.has("pressureAlerts")){let s=t.pressureAlert();n.push(`<h3>Pressure Alerts</h3><p>${s?`\u26A0 ${ct(s.text)} <button data-goalert="${s.s}" class="ghost">Show on map</button>`:"No queue is slowing the line."}</p>`)}if(t.owned.has("splitTimers")){let s=t.splits.filter(a=>a.start===t.sel).slice(-1)[0]||t.splits.slice(-1)[0];n.push(`<h3>Split Timers</h3>${s?`<p>${ct(rt[s.start].name)} \u2192 finish, ball #${s.id}: ${s.total.toFixed(1)} s</p><table class="rec">${s.parts.map(a=>`<tr><th>s ${a.s0.toFixed(0)} \u2192 ${a.s1.toFixed(0)}</th><td>${a.t.toFixed(1)} s</td></tr>`).join("")}</table>`:"<p>No finishes timed yet.</p>"}`)}if(t.owned.has("bankWorkshop")){let s=t.openSites(),a=t.routeLimit();n.push(`<h3>Bank Workshop</h3><p class="hint">Carts move owned balls with their original recipe from a factory with surplus to the route\u2019s destination. Shipped so far: ${t.workshop.shipped}. Supply routes: ${a}.</p>`);for(let o=0;o<a;o++){let l=t.workshop.routes[o],c=l?t.planShipment(o):null,h=t.workshop.carts[o];n.push(`<div class="card"><div class="qrow">Route ${o+1} \u2192 <select data-route="${o}"><option value="">\u2014</option>${s.map(d=>`<option value="${d}" ${l&&l.dest===d?"selected":""}>${ct(rt[d].name)}</option>`).join("")}</select></div>
          ${c?`<div class="rq">Next shipment: ${c.src!==null?`${c.n} balls from ${ct(rt[c.src].name)} \xB7 transit ~${c.eta.toFixed(0)} s`:"no factory has surplus yet"} \xB7 bin space at destination ${c.space}</div>`:""}
          ${h?`<div class="rq">Cart: ${ct(h.state)}${h.load&&h.load.length?` with ${h.load.length} balls`:""}${h.wait>.5?` \xB7 waited ${h.wait.toFixed(0)} s on the single track`:""}</div>`:""}</div>`)}t.owned.has("prioritySwitch")&&n.push(`<div class="qrow">Priority Switch: reserve <select data-prshare>${[.25,.4,.5,.6,.75].map(o=>`<option value="${o}" ${t.workshop.priority.share===o?"selected":""}>${Math.round(o*100)}%</option>`).join("")}</select> of shipments for <select data-prsite><option value="">nobody</option>${s.map(o=>`<option value="${o}" ${t.workshop.priority.site===o?"selected":""}>${ct(rt[o].name)}</option>`).join("")}</select></div>`)}if(t.owned.has("splitGate")&&n.push(`<h3>Splitstone Gate</h3><div class="qrow">${["direct","calm","balanced"].map(s=>`<button data-gate="${s}" class="${t.splitGate===s?"":"ghost"}">${s[0].toUpperCase()+s.slice(1)}</button>`).join(" ")}</div>`),t.owned.has("routePresets")&&n.push(`<h3>Route Presets</h3>${t.presets.map((s,a)=>`<div class="qrow">Preset ${a+1}: ${s?"saved":"empty"} <button data-psave="${a}" class="ghost">Save current</button> ${s?`<button data-pprev="${a}" class="ghost">Preview</button> <button data-pload="${a}">Restore</button>`:""}</div>`).join("")}<div id="presetPrev"></div>`),t.owned.has("efficiencyBench")){let s=t.bench.windows;n.push(`<h3>Efficiency Bench</h3><p>${t.bench.current?`Measuring since ${(t.t-t.bench.current.t0).toFixed(0)} s ago <button data-bench="stop">Stop window</button>`:'<button data-bench="start">Start a measurement window</button>'}</p>
        ${s.length?`<table class="rec"><tr><th></th>${s.map((a,o)=>`<td><b>Window ${o+1}</b><br>${a.span.toFixed(0)} s \xB7 ${ct(rt[a.site].name)} selected</td>`).join("")}</tr>
          <tr><th>Finish rate</th>${s.map(a=>`<td>${a.finishRate.toFixed(1)}/min</td>`).join("")}</tr><tr><th>Escape rate</th>${s.map(a=>`<td>${(a.escapeRate*100).toFixed(1)}%</td>`).join("")}</tr>
          <tr><th>Average delay</th>${s.map(a=>`<td>${a.avgDelay.toFixed(1)} s</td>`).join("")}</tr><tr><th>Cash per minute</th>${s.map(a=>`<td>${vn(a.cpm)}</td>`).join("")}</tr></table>`:""}`)}if(t.owned.has("springsSampler")){let s=t.lossBySpot.codeRot||0,a=t.stallLog.filter(([,l])=>l>57.6&&l<60.4).length,o=t.stallLog.filter(([,l])=>l>54&&l<68).length;n.push(`<h3>Springs Bank Sampler</h3><table class="rec"><tr><th>Code Rot observations</th><td>${a} recent delays in the Code Rot pocket \xB7 ${s} balls lost there (simulated)</td></tr><tr><th>Normal current</th><td>${o-a} recent stalls elsewhere in the Springs</td></tr><tr><th>Draft exposure</th><td>${t.stats.draftCatch} balls dropped into the lower catch area below the Shelf</td></tr></table><p class="hint">Simulated readings for the game\u2019s Springs reach. They make no claim about the real creek or its crayfish.</p>`)}else t.owned.has("draftRibbon")&&n.push(`<h3>Shelf Draft Ribbon</h3><p>${t.stats.draftCatch} balls have dropped into the lower catch area below the Shelf.</p>`);let i=t.trial;if(i){let s=ze[i.id];n.push(`<h3>Before / after: ${ct(s.name)}${i.site!==null?` at ${ct(rt[i.site].name)}`:""}</h3>${i.after?`<table class="rec"><tr><th></th><td>Before (last ${i.before.span.toFixed(0)} s)</td><td>After (${i.after.span.toFixed(0)} s)</td></tr><tr><th>Cash/min</th><td>${vn(i.before.cpm)}</td><td>${vn(i.after.cpm)}</td></tr><tr><th>Finishes/min</th><td>${i.before.bpm.toFixed(1)}</td><td>${i.after.bpm.toFixed(1)}</td></tr><tr><th>Escape rate</th><td>${(i.before.escapeRate*100).toFixed(1)}%</td><td>${(i.after.escapeRate*100).toFixed(1)}%</td></tr></table><p class="hint">Measured on the whole network. Use the Efficiency Bench for controlled comparisons.</p>`:`<p>Measuring\u2026 ${(t.t-i.t0).toFixed(0)} s, ${t.stats.finished-i.startFin} finishes so far (needs 90 s and 15 finishes).</p>`}`)}this.el.network.innerHTML=n.join("")}onNetworkClick(t){let e=this.game,n=this.view,i=t.target.closest("button");if(i){if(i.dataset.gate)e.splitGate=i.dataset.gate;else if(i.dataset.psave!==void 0)e.savePreset(+i.dataset.psave);else if(i.dataset.pprev!==void 0){let s=e.presetDiff(+i.dataset.pprev);St("#presetPrev").innerHTML=s.length?`<ul>${s.map(a=>`<li>${ct(a)}</li>`).join("")}</ul>`:"<p>No changes: matches the current settings.</p>";return}else i.dataset.pload!==void 0?(e.loadPreset(+i.dataset.pload),this.toast("Preset restored")):i.dataset.bench==="start"?e.startBenchWindow():i.dataset.bench==="stop"?e.stopBenchWindow():i.dataset.goalert!==void 0&&(n.panMapTo(+i.dataset.goalert),this.syncMode());this.netKey="",this.hooks.save()}}onNetworkChange(t){let e=this.game,n=t.target;n.dataset.route!==void 0?n.value!==""&&e.setRoute(+n.dataset.route,+n.value):n.dataset.prshare!==void 0?e.workshop.priority.share=+n.value:n.dataset.prsite!==void 0&&(e.workshop.priority.site=n.value===""?null:+n.value),this.netKey="",this.hooks.save()}renderOrders(){let t=this.game,e=t.order,n=(e?`${e.uid}:${e.paid}:${e.reserved}`:"-")+"|"+t.orderLog.length+"|"+t.openSites().length+"|"+this.twoPostPick.join(",");if(n===this.ordersKey)return;if(this.ordersKey=n,!t.isOpen("springs")){this.el.orders.innerHTML='<p class="hint">Shipment orders open at Crawfish Springs. They are optional, have no fee and no penalty.</p>';return}let i='<p class="hint">One order at a time, accepted at the finish station. The bonus is reserved when a qualifying ball launches and paid only when it finishes; balls already rolling keep their payout. Lost balls free their slot.</p>';if(e){let a=Xn.find(o=>o.id===e.id);i+=`<div class="card sel"><h4>${ct(a.name)}</h4><p>${ct(a.text)} \xB7 ${Fe(a.bonus)} per finish</p>
        <div class="bar big"><i style="width:${e.paid/e.target*100}%"></i><i class="res" style="width:${e.reserved/e.target*100}%"></i></div>
        <p>${e.paid}/${e.target} paid \xB7 ${e.reserved} reserved in flight \xB7 ${Fe(e.earned)} earned${e.twoPosts?` \xB7 ${e.posts.map(o=>`${ct(rt[o].name)} ${e.perPost[o]||0}`).join(", ")}`:""}</p>
        <button data-cancel="1" class="ghost">Cancel order</button></div>`}i+=Xn.map(a=>{if(!t.orderOpen(a))return`<div class="item locked"><div class="ih"><span class="nm">${ct(a.name)}</span><span class="pr">${Fe(a.bonus)}/ball</span></div><div class="rq">Opens with ${ct(rt[Ke[a.opens]].name)}</div></div>`;let o=t.orderLog.filter(c=>c.id===a.id&&c.done).length,l=a.twoPosts&&!e?`<div class="qrow">Posts: ${t.openSites().map(c=>`<label><input type="checkbox" data-post="${c}" ${this.twoPostPick.includes(c)?"checked":""}> ${ct(rt[c].name)}</label>`).join(" ")}</div>`:"";return`<div class="item"><div class="ih"><span class="nm">${o?"\u2713 ":""}${ct(a.name)}</span><span class="pr">${Fe(a.bonus)}/ball</span></div><div class="ef">${ct(a.text)}. Target ${a.target}.</div>${l}<div class="st">${e?"":`<button data-accept="${a.id}">Accept</button>`}</div></div>`}).join("");let s=t.orderLog.slice(-6).reverse().map(a=>`<li>${a.done?"\u2713":"\u2715"} ${ct(Xn.find(o=>o.id===a.id).name)}: ${a.paid} paid, ${Fe(a.earned)}${a.reserved?` \xB7 ${a.reserved} still reserved in flight`:""}</li>`).join("");s&&(i+=`<h3>Recent orders</h3><ul>${s}</ul>`),this.el.orders.innerHTML=i,this.el.orders.querySelectorAll("[data-post]").forEach(a=>a.addEventListener("change",()=>{let o=+a.dataset.post;this.twoPostPick=a.checked?[...this.twoPostPick.filter(l=>l!==o),o].slice(-2):this.twoPostPick.filter(l=>l!==o),this.ordersKey=""}))}onOrdersClick(t){let e=this.game,n=t.target.closest("button");if(n){if(n.dataset.accept){let i=Xn.find(s=>s.id===n.dataset.accept);if(i.twoPosts&&this.twoPostPick.length!==2){this.toast("Pick two launch sites for Two-Post Service first");return}e.acceptOrder(i.id,i.twoPosts?this.twoPostPick.slice():null)&&this.toast(`Accepted: ${i.name}`)}else n.dataset.cancel&&e.cancelOrder();this.ordersKey="",this.hooks.save()}}};var Zc="creek-rolling-tycoon-save-v2",du="creek-rolling-tycoon-save-v1",hu="creek-rolling-tycoon-save-v1-backup";function Ji(r,t,e){try{if(r==="get")return localStorage.getItem(t);r==="set"&&localStorage.setItem(t,e),r==="del"&&localStorage.removeItem(t)}catch{}return null}function Y1(){let r=i=>{try{return i?JSON.parse(i):null}catch{return null}},t=r(Ji("get",Zc));if(t&&t.v===$s)return{data:t,migrated:!1};let e=Ji("get",du),n=r(e);return n?(Ji("get",hu)||Ji("set",hu,e),{data:n,migrated:n.v===1}):{data:t,migrated:!1}}function Z1(){let r=document.getElementById("loading"),t=new wr,{data:e,migrated:n}=Y1(),i=new Ar(t,e),s=new URLSearchParams(location.search).get("quality");(s==="low"||s==="medium"||s==="high")&&(i.settings.quality=s);let a=new ao;a.enabled=i.settings.sound;let o=new ro(document.getElementById("view"),t,i),l=o.player;l.sens=i.settings.sens||1,l.headBob=i.settings.headBob!==!1,i.settings.fov&&o.setFov(i.settings.fov),i.player&&l.restore(i.player)||o.spawnAt(i.sel);let c=!1,h=()=>{c||(o.mode==="fp"?i.player=l.state():o.prevFp&&(i.player=o.prevFp),Ji("set",Zc,JSON.stringify(i.serialize())),i.lastSaveT=i.t)},d=new co(i,o,a,{save:h,reset:()=>{c=!0,Ji("del",Zc),Ji("del",du),location.reload()}});d.syncMode(),n&&(h(),d.toast("Your save was upgraded for the New Creek Nation expansion. The previous save is kept as a backup.","big")),o.rig.onPick=(m,p)=>{if(a.unlock(),o.mode==="fp")return;let _=o.pick(m,p);_&&(_.type==="ball"?(o.followBall(_.id,!1),d.syncMode()):_.type==="stake"&&d.openItem(_.id))},o.onFollowEnded=()=>{o.returnToPlayer(),d.syncMode()},l.onStep=(m,p)=>{if(!i.settings.sound)return;let _=m==="water"?"water":m===gt.ROCK?1:m===gt.GRAVEL?0:2;a.play("step",_,p)},l.onFall=()=>d.toast("Too deep to wade \u2014 back to the bank"),window.addEventListener("pointerdown",()=>a.unlock(),{once:!0}),window.addEventListener("keydown",()=>a.unlock(),{once:!0}),window.addEventListener("resize",()=>o.resize(document.getElementById("view")));let u=performance.now(),f=null,y=()=>{for(let m of i.events)o.onEvent(m,i.settings.sound?a:null),d.onEvent(m),m.type==="unlock"&&d.syncMode(),(m.type==="finish"||m.type==="purchase"||m.type==="unlock"||m.type==="orderDone")&&(i._dirty=!0);i.events.length=0},g=m=>{let p=Math.min(.1,(m-u)/1e3);u=m;try{i.update(p),y(),o.update(p,i.settings.sound?a:null),d.update(p)}catch(_){g.seen||(g.seen=new Set),g.seen.has(_.message)||(g.seen.add(_.message),console.error(_))}i._dirty&&i.t-i.lastSaveT>.5?(i._dirty=!1,h()):i.t-i.lastSaveT>3&&h(),requestAnimationFrame(g)};document.addEventListener("visibilitychange",()=>{if(document.hidden){h();let m=performance.now();f=setInterval(()=>{let p=performance.now(),_=Math.min(5,(p-m)/1e3);for(m=p;_>0;){let x=Math.min(.25,_);i.update(x),_-=x}i.events.length=0,h()},1e3)}else clearInterval(f),u=performance.now()}),window.addEventListener("pagehide",h),window.addEventListener("beforeunload",h),r.classList.add("done"),setTimeout(()=>r.remove(),600),requestAnimationFrame(g),window.__crt={game:i,view:o,creek:t,save:h,ui:d}}window.addEventListener("DOMContentLoaded",()=>{setTimeout(()=>{try{Z1()}catch(r){console.error(r),document.getElementById("loading").innerHTML=`<div class="err">Could not start: ${r.message}</div>`}},30)});})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
//# sourceMappingURL=game.js.map
