// Game constants, launch sites, recipes, orders and the full upgrade catalogue.
// Every price, time and payout here is a tuning value (first balance pass).

export const BALL_R = 0.0335; // 6.7 cm diameter
export const BALL_M = 0.058; // 58 g
export const PHYS_DT = 1 / 120;
export const MANUAL_COOLDOWN = 2.5;

// Channel coordinate s = metres downstream along the valley. The finish gate is permanent.
export const S_FINISH = 98.5;
export const S_BASKET = 99.25;

// Launch sites, downstream first. `id` is the stable save identifier.
// `after`: the site that must be open before this one can be bought.
// `layer`: 'base' (base game), 'field' (a historical Creek Rolling location), 'game' (game-only headwater).
export const STARTS = [
  { id: 'grounds', name: 'Old Rolling Grounds', s: 92.0, cost: 0, base: 10, eta: 5.5, target: '5 s', after: null, layer: 'base',
    blurb: 'A short launch chute, exposed roots, and a gravel-bed bend.' },
  { id: 'waterfall', name: 'Waterfall Run', s: 80.7, cost: 350, base: 30, eta: 16, target: '14–18 s', after: 'grounds', layer: 'base',
    blurb: 'A rock chute to the route split. The primary creek-right route goes over the falls; the alternate route steps down on the left.' },
  { id: 'flatrocks', name: 'Flat Rocks', s: 73.6, cost: 900, base: 45, eta: 23, target: '20–26 s', after: 'waterfall', layer: 'field',
    blurb: 'The usual historical start: broad, low slabs with an undercut at the water. Its game placement on the Shelf route is approximate.' },
  { id: 'shelf', name: 'Continental Shelf', s: 68.0, cost: 1500, base: 65, eta: 31, target: '26–34 s', after: 'waterfall', layer: 'base',
    blurb: 'A ledge along the creek’s right side near the waterfall. A short exposed drop in the Folk Draft feeds the waterfall approach.' },
  { id: 'springs', name: 'Crawfish Springs', s: 54.0, cost: 6500, base: 120, eta: 48, target: '42–52 s', after: 'shelf', layer: 'base',
    blurb: 'A shaded spring pool above the Shelf, a double-pond runoff on the right bank, and a narrow rocky spillway.' },
  { id: 'alder', name: 'Alder Bend', s: 34.0, cost: 22000, base: 220, eta: 72, target: '60–74 s', after: 'springs', layer: 'base',
    blurb: 'An undercut bank, a split around a gravel island, then the open Clearing before the Springs.' },
  { id: 'gorge', name: 'Upper Gorge', s: 0.0, cost: 75000, base: 400, eta: 100, target: '85–105 s', after: 'alder', layer: 'base',
    blurb: 'Two steep rock steps and a short stretch of whitewater above Alder Bend.' },
  { id: 'slate', name: 'Slate Steps', s: -16, cost: 140000, base: 620, eta: 110, target: '100–120 s', after: 'gorge', layer: 'game',
    blurb: 'Three irregular slabs and shallow pocket pools. A fast roll can bounce out; a clean line glances off the slabs.' },
  { id: 'willow', name: 'Willow Narrows', s: -34, cost: 230000, base: 850, eta: 128, target: '118–138 s', after: 'slate', layer: 'game',
    blurb: 'A fast pinch between roots. Balls bunch at the exit, so feeder speed only helps once the pinch is fixed.' },
  { id: 'splitstone', name: 'Splitstone Fork', s: -56, cost: 365000, base: 1140, eta: 147, target: '135–158 s', after: 'willow', layer: 'game',
    blurb: 'A direct rocky lane and a longer calm lane around an island. Both rejoin before Willow Narrows.' },
  { id: 'longeddy', name: 'Long Eddy Basin', s: -78, cost: 560000, base: 1500, eta: 166, target: '153–179 s', after: 'splitstone', layer: 'game',
    blurb: 'A wide bend with a visible recirculation and a fast tongue of water near the outside bank.' },
  { id: 'spillway', name: 'Spillway Falls', s: -102, cost: 830000, base: 1950, eta: 189, target: '174–204 s', after: 'longeddy', layer: 'game',
    blurb: 'A 3.2 m waterfall onto a rock apron and a deep pool.' },
  { id: 'sluice', name: 'Boulder Sluice', s: -126, cost: 1220000, base: 2550, eta: 212, target: '196–228 s', after: 'spillway', layer: 'game',
    blurb: 'Staggered rocks in two lanes around a rock rib, recombining at a gravel bar.' },
  { id: 'coldspring', name: 'Cold Spring Headwaters', s: -148, cost: 1800000, base: 3300, eta: 238, target: '220–255 s', after: 'sluice', layer: 'game',
    blurb: 'The top of the creek: a calm spring pool narrowing into a steep outflow.' },
];
export const SITE_INDEX = Object.fromEntries(STARTS.map((s, i) => [s.id, i]));

// Merge checkpoints after a fork rejoins (either lane is legal).
export const MERGES = [
  { s: 90.3, name: 'Waterfall route merge' },
  { s: 50.6, name: 'Alder island rejoin' },
  { s: -40.0, name: 'Splitstone rejoin' },
  { s: -107.6, name: 'Sluice gravel bar' },
];
export const ALDER_REJOIN_S = 50.6;

export function checkpointsFor(startIndex) {
  const s0 = STARTS[startIndex].s;
  const cps = [];
  for (const st of STARTS) if (st.s > s0 + 0.01) cps.push(st.s);
  for (const m of MERGES) if (m.s > s0 + 0.01) cps.push(m.s);
  cps.sort((a, b) => a - b);
  return [...new Set(cps)];
}

// Reaches for the flow monitor, congestion and backpressure (downstream first).
export const REACHES = [
  { id: 'grounds', name: 'Old Rolling Grounds', s0: 92.0, s1: 99.3, cap: 26 },
  { id: 'waterfall', name: 'Waterfall Run', s0: 80.7, s1: 92.0, cap: 34 },
  { id: 'shelf', name: 'Continental Shelf', s0: 68.0, s1: 80.7, cap: 34 },
  { id: 'springs', name: 'Crawfish Springs', s0: 54.0, s1: 68.0, cap: 46 },
  { id: 'alder', name: 'Alder Bend & the Clearing', s0: 34.0, s1: 54.0, cap: 50 },
  { id: 'gorge', name: 'Upper Gorge', s0: 0, s1: 34.0, cap: 70 },
  { id: 'slate', name: 'Slate Steps', s0: -16, s1: 0, cap: 34 },
  { id: 'willow', name: 'Willow Narrows', s0: -34, s1: -16, cap: 34 },
  { id: 'splitstone', name: 'Splitstone Fork', s0: -56, s1: -34, cap: 50 },
  { id: 'longeddy', name: 'Long Eddy Basin', s0: -78, s1: -56, cap: 50 },
  { id: 'spillway', name: 'Spillway Falls', s0: -102, s1: -78, cap: 50 },
  { id: 'sluice', name: 'Boulder Sluice', s0: -126, s1: -102, cap: 50 },
  { id: 'coldspring', name: 'Cold Spring Headwaters', s0: -152, s1: -126, cap: 50 },
];
export function reachAt(s) {
  for (let i = 0; i < REACHES.length; i++) if (s >= REACHES[i].s0 && s < REACHES[i].s1) return i;
  return s >= 99.3 ? 0 : REACHES.length - 1;
}

// ---------------------------------------------------------------- recipes
// pct: bonus as a fraction of route base. Physical tradeoffs are applied in physics.js.
export const RECIPES = [
  { id: 'standard', name: 'Standard', area: null, pct: 0, felt: [1, 1, 1], tag: 'STD',
    note: 'The current ball with your installed upgrades.' },
  { id: 'dryweave', name: 'Dry-Weave', area: 'shelf', pct: 0.04, felt: [1.12, 1.1, 1.25], tag: 'DRY',
    note: 'Repels water and sheds its wake sooner. Slightly less grip on dry wood. +4% of route base.' },
  { id: 'softcore', name: 'Soft-Core', area: 'springs', pct: 0.06, felt: [1.15, 0.86, 0.55], tag: 'SOFT',
    note: 'Takes more energy out of hard bounces. Rolls a little slower through shallow dry stretches. +6% of route base.' },
  { id: 'cleanseam', name: 'Clean-Seam', area: 'alder', pct: 0.08, felt: [0.78, 1.08, 0.7], tag: 'SEAM',
    note: 'Much less low-speed wobble. No change to buoyancy. +8% of route base.' },
  { id: 'rapids', name: 'Rapids Felt', area: 'slate', pct: 0.1, felt: [0.72, 0.82, 0.45], tag: 'RAPID',
    note: 'Keeps traction on wet rock. Its rougher finish adds drag in long calm pools. +10% of route base.' },
  { id: 'select', name: 'Workshop Select', area: 'splitstone', pct: 0.14, felt: [1.18, 0.98, 0.5], tag: 'SEL',
    note: 'Measured quality sorting for steadier travel times. 15% longer to make. +14% of route base.' },
];
export const RECIPE_INDEX = Object.fromEntries(RECIPES.map((r, i) => [r.id, i]));
export function recipeBonus(base, recipe) {
  const r = RECIPES[recipe] || RECIPES[0];
  return Math.floor(base * r.pct + 0.5); // nearest whole dollar, halves round up
}

// ---------------------------------------------------------------- shipment orders
// minSite: index of the shortest qualifying launch ("from X or farther" = that site or further upstream).
export const ORDERS = [
  { id: 'dry', name: 'Dry Delivery', recipe: 'dryweave', minSite: 'springs', target: 20, bonus: 30, opens: 'springs',
    text: 'Dry-Weave from Crawfish Springs or farther' },
  { id: 'soft', name: 'Norway-Style Soft Landing', recipe: 'softcore', minSite: 'gorge', target: 35, bonus: 70, opens: 'gorge',
    text: 'Soft-Core from Upper Gorge or farther' },
  { id: 'slatebatch', name: 'Slate Test Batch', recipe: null, onlySite: 'slate', target: 50, bonus: 105, opens: 'slate',
    text: 'Any recipe launched from Slate Steps' },
  { id: 'cleanrun', name: 'Clean-Seam Run', recipe: 'cleanseam', minSite: 'willow', target: 65, bonus: 130, opens: 'willow',
    text: 'Clean-Seam from Willow Narrows or farther' },
  { id: 'twopost', name: 'Two-Post Service', recipe: null, twoPosts: true, target: 80, bonus: 165, perPostCap: 50, opens: 'willow',
    text: 'Deliveries from two launches you pick, at least 30 from each' },
  { id: 'basin', name: 'Basin Batch', recipe: 'select', minSite: 'longeddy', target: 100, bonus: 230, opens: 'longeddy',
    text: 'Workshop Select from Long Eddy Basin or farther' },
  { id: 'rapidship', name: 'Rapids Shipment', recipe: 'rapids', minSite: 'spillway', target: 125, bonus: 290, opens: 'spillway',
    text: 'Rapids Felt from Spillway Falls or farther' },
  { id: 'ncnhead', name: 'New Creek Nation Headwater Batch', recipe: null, onlySite: 'coldspring', target: 150, bonus: 425, opens: 'coldspring',
    text: 'Any recipe launched from Cold Spring Headwaters' },
];

export const TABS = [
  { id: 'factory', name: 'Factory' },
  { id: 'logistics', name: 'Logistics' },
  { id: 'creek', name: 'Creek' },
  { id: 'balls', name: 'Balls' },
  { id: 'finish', name: 'Finish' },
  { id: 'controls', name: 'Controls' },
];

// scope 'site': bought for one factory (the selected site). Otherwise shared by the network.
// requires: other upgrades (same scope as the item when site-scoped). area: site that must be open.
const SITE = 'site';
export const UPGRADES = [
  // ---------------- Factory and launch equipment (per site)
  { id: 'press', tab: 'factory', scope: SITE, name: 'Auto Press', price: 25, requires: [],
    effect: 'Makes one ball every 3 s and adds an eight-ball hopper.' },
  { id: 'feeder', tab: 'factory', scope: SITE, name: 'Auto Feeder', price: 45, requires: ['press'],
    effect: 'Launches one queued ball every 2.5 s when the chute is clear.' },
  { id: 'quickMold', tab: 'factory', scope: SITE, name: 'Quick Mold', price: 95, requires: ['press'],
    effect: 'Press interval 3 s → 2.2 s. The brass mold opens faster.' },
  { id: 'lowFriction', tab: 'factory', scope: SITE, name: 'Low-Friction Chute', price: 140, requires: ['feeder'],
    effect: 'Feeder interval 2.5 s → 1.8 s. Launch speed spread ±22% → ±7%.' },
  { id: 'hopperExt', tab: 'factory', scope: SITE, name: 'Hopper Extension', price: 240, requires: ['press'],
    effect: 'Hopper storage 8 → 20 balls to hold a reserve during blockages.' },
  { id: 'twinPress', tab: 'factory', scope: SITE, name: 'Twin Press', price: 650, requires: ['quickMold'],
    effect: 'Adds a second press head. Combined production 2.2 s → 1.55 s per ball.' },
  { id: 'indexed', tab: 'factory', scope: SITE, name: 'Indexed Feeder', price: 850, requires: ['lowFriction'],
    effect: 'Rotating pocket wheel. Release interval 1.8 s → 1.3 s.' },
  { id: 'servo', tab: 'factory', scope: SITE, name: 'Servo Drive', price: 3200, requires: ['twinPress'],
    effect: 'Twin Press interval 1.55 s → 1.15 s.' },
  { id: 'bulkHopper', tab: 'factory', scope: SITE, name: 'Bulk Hopper', price: 4500, requires: ['hopperExt'],
    effect: 'Hopper storage 20 → 40 balls, with a visible fill gauge.' },
  { id: 'turbo', tab: 'factory', scope: SITE, name: 'Turbo Line', price: 18000, requires: ['servo', 'indexed'],
    effect: 'Press and feeder both run at one ball every 0.85 s (felt handling permitting).' },
  { id: 'batchCounter', tab: 'factory', scope: SITE, name: 'Batch Counter', price: 1200, requires: ['press'],
    effect: 'A physical counter for balls made by recipe, showing actual press output per minute.' },
  { id: 'infeedTray', tab: 'factory', scope: SITE, name: 'Infeed Tray', price: 3800, requires: ['press'],
    effect: 'A small buffer before the press. Recipe changeover 6 s → 2 s.' },
  { id: 'fastFelt', tab: 'factory', scope: SITE, name: 'Fast Felt Table', price: 9000, requires: ['press'],
    effect: 'Felt processing 0.9 s → 0.55 s per ball. Does not speed up the press itself.' },
  { id: 'bankWorkshop', tab: 'factory', name: 'Bank Workshop', price: 18000, requires: [], area: 'alder',
    effect: 'A fixed supply yard at Alder Bend with one transfer route for surplus balls.' },
  { id: 'shapeGauge', tab: 'factory', scope: SITE, name: 'Inline Shape Gauge', price: 28000, requires: ['press'],
    effect: 'Sends unusually wobbly balls back to the press before launch: steadier runs, a little less output. Has an on/off switch.' },
  { id: 'parallelFelt', tab: 'factory', scope: SITE, name: 'Parallel Felt Station', price: 88000, requires: ['fastFelt'], requiresGlobal: ['bankWorkshop'],
    effect: 'A second felt station: felt handling 0.55 s → 0.28 s effective.' },
  { id: 'continuousPress', tab: 'factory', scope: SITE, name: 'Continuous Press', price: 210000, requires: ['turbo', 'parallelFelt'],
    effect: 'Press interval 0.85 s → 0.5 s. The feeder, post and creek can still limit launches.' },

  // ---------------- Logistics (network)
  { id: 'secondPost', tab: 'logistics', name: 'Second Supply Route', price: 24000, requires: ['bankWorkshop'],
    effect: 'The workshop can supply two factories at once.' },
  { id: 'silos', tab: 'logistics', name: 'Staging Silos', price: 36000, requires: ['bankWorkshop'],
    effect: 'Each launch post holds 12 more delivered balls, so long cart cycles leave fewer gaps.' },
  { id: 'doubleDeck', tab: 'logistics', name: 'Double-Deck Tray Cart', price: 55000, requires: ['bankWorkshop'],
    effect: 'Carts carry 12 balls a trip instead of 6. Both trays fill visibly.' },
  { id: 'passingLoop', tab: 'logistics', name: 'Passing Loop', price: 105000, requires: ['bankWorkshop'],
    effect: 'Two carts can pass on the busy bank segment instead of one waiting.' },
  { id: 'thirdPost', tab: 'logistics', name: 'Third Supply Route', price: 145000, requires: ['secondPost'], area: 'slate',
    effect: 'The workshop can supply three factories at once.' },
  { id: 'prioritySwitch', tab: 'logistics', name: 'Priority Switch', price: 195000, requires: ['bankWorkshop'],
    effect: 'A loading switch that can reserve a minimum share of transfers for one chosen factory.' },
  { id: 'fastLift', tab: 'logistics', name: 'Fast Bank Lift', price: 310000, requires: ['doubleDeck'],
    effect: 'Loading and unloading on the steepest deliveries 4 s → 1.5 s.' },

  // ---------------- Creek equipment (network, at fixed spots)
  { id: 'rootRail', tab: 'creek', name: 'Root Bend Rail', price: 75, requires: [], area: 'grounds', spot: 'root',
    effect: 'Rail across the gap under the exposed root at Old Rolling Grounds so balls cannot wedge there.' },
  { id: 'gravelMat', tab: 'creek', name: 'Gravel Run Mat', price: 120, requires: [], area: 'grounds', spot: 'gravel',
    effect: 'Rubber mat over the roughest gravel patch. Removes random slowdowns there.' },
  { id: 'splashGuard', tab: 'creek', name: 'Splash Guard', price: 280, requires: [], area: 'waterfall', spot: 'lip',
    effect: 'Side boards at the waterfall lip turn balls that glance off the lip rocks back into the centre, away from the side notches.' },
  { id: 'poolGuide', tab: 'creek', name: 'Pool Guide', price: 525, requires: [], area: 'waterfall', spot: 'pool',
    effect: 'Floating boom on the outside of the plunge pool keeps balls out of its slow eddy.' },
  { id: 'catchRamp', tab: 'creek', name: 'Shelf Catch Ramp', price: 1100, requires: [], area: 'shelf', spot: 'catch',
    effect: 'Ramp under the Shelf drop that receives falling balls and sends them into the waterfall approach.' },
  { id: 'debrisScreen', tab: 'creek', name: 'Spring Debris Screen', price: 2800, requires: [], area: 'springs', spot: 'springs',
    effect: 'Screen that holds the drifting driftwood in the Springs pool out of the ball channel.' },
  { id: 'spillRail', tab: 'creek', name: 'Spillway Rail', price: 3600, requires: [], area: 'springs', spot: 'spillway',
    effect: 'Twin rails keep balls centred through the narrow spillway, away from the snag rocks.' },
  { id: 'alderBypass', tab: 'creek', name: 'Alder Bypass', price: 8500, requires: [], area: 'alder', spot: 'island',
    effect: 'Bank-side guide at the island split so balls skip the dead pocket and rejoin below the island.' },
  { id: 'landingBoards', tab: 'creek', name: 'Gorge Landing Boards', price: 24000, requires: [], area: 'gorge', spot: 'gorgeStep',
    effect: 'Angled boards soften hard deflections at the first Gorge drop and keep balls in the main flow.' },
  { id: 'clearingArm', tab: 'creek', name: 'Automatic Clearing Arm', price: 32000, requires: [], area: 'gorge', spot: 'arm',
    effect: 'Mechanical sweep at the Springs outlet returns stalled balls to the same channel. No cash, no skipped checkpoints.' },
  { id: 'slateBumpers', tab: 'creek', name: 'Slate Edge Bumpers', price: 32000, requires: [], area: 'slate', spot: 'slateEdge',
    effect: 'Returns sideways deflections on the first slab to the main channel.' },
  { id: 'slateOutlet', tab: 'creek', name: 'Slate Pool Outlet', price: 43000, requires: [], area: 'slate', spot: 'slatePool',
    effect: 'Opens a low outlet lip that cuts the time balls spend in the second pocket pool.' },
  { id: 'willowShield', tab: 'creek', name: 'Willow Root Shield', price: 65000, requires: [], area: 'willow', spot: 'willowRoot',
    effect: 'Covers the snagging gap at the inside root without narrowing the main flow.' },
  { id: 'willowFlare', tab: 'creek', name: 'Willow Exit Flare', price: 82000, requires: ['willowShield'], area: 'willow', spot: 'willowExit',
    effect: 'Removes the pinching root ends and flares the outlet, raising safe throughput at the pinch.' },
  { id: 'splitGate', tab: 'creek', name: 'Splitstone Gate', price: 115000, requires: [], area: 'splitstone', spot: 'splitGate',
    effect: 'A real adjustable gate at the island tip: Direct, Calm or Balanced.' },
  { id: 'splitMergeRail', tab: 'creek', name: 'Splitstone Merge Rail', price: 150000, requires: [], area: 'splitstone', spot: 'splitMerge',
    effect: 'Guides the two lanes into a staggered merge and cuts head-on bumps.' },
  { id: 'basinBoom', tab: 'creek', name: 'Basin Float Boom', price: 175000, requires: [], area: 'longeddy', spot: 'basin',
    effect: 'Redirects balls out of the strongest recirculation while leaving the eddy visible.' },
  { id: 'basinVane', tab: 'creek', name: 'Basin Flow Vane', price: 205000, requires: ['basinBoom'], area: 'longeddy', spot: 'basinVane',
    effect: 'Steers surface flow towards the fast tongue in the basin.' },
  { id: 'spillApron', tab: 'creek', name: 'Spillway Splash Apron', price: 245000, requires: [], area: 'spillway', spot: 'spillApron',
    effect: 'Covers the apron rocks under Spillway Falls so landings stop scattering.' },
  { id: 'spillSkimmer', tab: 'creek', name: 'Spillway Pool Skimmer', price: 290000, requires: [], area: 'spillway', spot: 'spillPool',
    effect: 'Sweeps stray balls along the edge of the pool towards the legal outlet.' },
  { id: 'sluiceAlternator', tab: 'creek', name: 'Sluice Alternator', price: 350000, requires: [], area: 'sluice', spot: 'sluiceSplit',
    effect: 'Alternates balls into the two lanes when both are clear, and falls back to one when needed.' },
  { id: 'sluiceMerge', tab: 'creek', name: 'Sluice Merge Basin', price: 415000, requires: [], area: 'sluice', spot: 'sluiceMerge',
    effect: 'A wider, calmer rejoin at the gravel bar that reduces backups.' },
  { id: 'headGuide', tab: 'creek', name: 'Headwater Surface Guide', price: 525000, requires: [], area: 'coldspring', spot: 'headPool',
    effect: 'Pulls drifting balls out of the quiet spring margin into the outflow.' },
  { id: 'headRails', tab: 'creek', name: 'Headwater Intake Rails', price: 640000, requires: ['headGuide'], area: 'coldspring', spot: 'headOutflow',
    effect: 'Rails that keep spacing steady through the steep outflow.' },
  // lore-linked equipment
  { id: 'draftRibbon', tab: 'creek', lore: true, name: 'Shelf Draft Ribbon', price: 2400, requires: [], area: 'shelf', spot: 'draft',
    effect: 'A ribbon post and a map arrow showing the local downdraft. Logs how many balls drop into the lower catch area.' },
  { id: 'windScreen', tab: 'creek', lore: true, name: 'Shelf Wind Screen', price: 9500, requires: [], area: 'shelf', spot: 'windScreen',
    effect: 'Breaks the downdraft along the protected launch lane and cuts sideways spill from gusts. The open Shelf still shows the Draft.' },
  { id: 'springsSampler', tab: 'creek', lore: true, name: 'Springs Bank Sampler', price: 12000, requires: [], area: 'springs', spot: 'sampler',
    effect: 'A sampling post. Its panel separates Code Rot observations, normal current and Draft exposure, and names the lane slowing production.' },
  { id: 'habitatBypass', tab: 'creek', lore: true, name: 'Crayfish Habitat Bypass', price: 22000, requires: [], area: 'springs', spot: 'habitat',
    effect: 'A raised guide around the habitat edge that rejoins at the spillway. Keeps balls out of the Code Rot pocket and the crayfish area.' },
  { id: 'branchSweeper', tab: 'creek', lore: true, name: 'Norway-Style Branch Sweeper', price: 35000, requires: [], area: 'alder', spot: 'sweeper',
    effect: 'A pivoting branch, inspired by the Norway Cavern recovery, returns stalled factory balls at Alder Bend to the same lane.' },
  { id: 'leafGrate', tab: 'creek', lore: true, name: 'Leaf-Cavern Grate', price: 48000, requires: [], area: 'slate', spot: 'leafPocket',
    effect: 'A guard over a fictional leaf-covered pocket at Slate Steps that otherwise traps balls.' },

  // ---------------- Ball production (per site, only for balls made there after purchase)
  { id: 'premiumFelt', tab: 'balls', scope: SITE, name: 'Premium Felt', price: 180, requires: [],
    effect: 'New balls get a blue band and +$5 on their finish payout.' },
  { id: 'cores', tab: 'balls', scope: SITE, name: 'Consistent Cores', price: 380, requires: [],
    effect: 'Rounder cores: low-speed wobble reduced by about 70%.' },
  { id: 'seamPress', tab: 'balls', scope: SITE, name: 'Seam Press', price: 900, requires: ['cores'],
    effect: 'Even seams: launch-to-launch speed and aim variation reduced by about 75%.' },
  { id: 'waterResist', tab: 'balls', scope: SITE, name: 'Water-Resistant Felt', price: 2100, requires: ['premiumFelt'],
    effect: 'Water uptake cut by 75%. Balls stay lighter and ride higher through the plunge pool.' },
  { id: 'reinforced', tab: 'balls', scope: SITE, name: 'Reinforced Core', price: 5200, requires: ['seamPress'],
    effect: 'Bounce after hard drops becomes consistent (restitution spread ±0.13 → ±0.03).' },
  { id: 'batchStamp', tab: 'balls', scope: SITE, name: 'Finished Batch Stamp', price: 9500, requires: ['waterResist'],
    effect: 'Readable production stamp and a +$25 finish bonus on new balls.' },
  { id: 'replicaJig', tab: 'balls', scope: SITE, lore: true, name: 'Archive Replica Stencil Jig', price: 75000, requires: [], requiresGlobal: ['bankWorkshop'],
    effect: 'Opt-in cosmetic markings based on archived competitors, marked Replica. The recipe still sets handling and payout.' },
  { id: 'ncnStamp', tab: 'balls', scope: SITE, lore: true, name: 'New Creek Nation Batch Stamp', price: 125000, requires: [], requiresGlobal: ['bankWorkshop'], area: 'slate',
    effect: 'A stamping station that gives this factory’s balls an NCN production number and shows made and finished counts per batch.' },

  // ---------------- Finish station (network)
  { id: 'wideBasket', tab: 'finish', name: 'Wide Catch Basket', price: 200, requires: [],
    effect: 'Basket room 6 → 14 balls and settling time 1.6 s → 0.9 s, so the exit clears faster.' },
  { id: 'timingGate', tab: 'finish', name: 'Timing Gate', price: 800, requires: [],
    effect: 'In-world board: last finish time, balls per minute, and average travel time from the selected start.' },
  { id: 'spacingSensor', tab: 'finish', scope: SITE, name: 'Spacing Sensor', price: 4000, requires: ['feeder'],
    effect: 'Replaces this feeder’s 1.25 s / 1 m landing buffer with a sensor that releases at the earliest safe moment.' },
  { id: 'conveyor', tab: 'finish', name: 'Automatic Basket Conveyor', price: 14000, requires: ['wideBasket'],
    effect: 'Empties the basket continuously (0.3 s per ball) and stacks finished balls in a crate.' },
  { id: 'laneMarkers', tab: 'finish', name: 'Gate Lane Markers', price: 12000, requires: [],
    effect: 'Paints both catch approaches and shows the last arrival time on each side of the gate.' },
  { id: 'splitTray', tab: 'finish', name: 'Split Catch Tray', price: 45000, requires: [],
    effect: 'Two catch positions just past the same payout plane: twice the room, faster settling.' },
  { id: 'poweredBelt', tab: 'finish', name: 'Powered Return Belt', price: 78000, requires: ['conveyor'],
    effect: 'Clears caught balls 0.3 s → 0.2 s each.' },
  { id: 'overflowCrate', tab: 'finish', name: 'Overflow Crate', price: 110000, requires: [],
    effect: 'Buffers up to 40 caught balls during clustered arrivals and drains automatically.' },
  { id: 'twinPacking', tab: 'finish', name: 'Twin Packing Conveyor', price: 175000, requires: ['poweredBelt'],
    effect: 'Clearing 0.2 s → 0.12 s per ball at high throughput.' },
  { id: 'stacker', tab: 'finish', name: 'Production Stacker', price: 255000, requires: [],
    effect: 'Paid balls collect in crates by recipe and clear in batches. No extra payout.' },
  { id: 'industrialCatch', tab: 'finish', name: 'Industrial Catch Station', price: 390000, requires: ['splitTray', 'twinPacking'],
    effect: 'Automates both catch approaches: clearing 0.06 s per ball for the full industrial line.' },

  // ---------------- Controls (network)
  { id: 'flowMonitor', tab: 'controls', name: 'Flow Monitor', price: 950, requires: [], area: 'shelf',
    effect: 'Shows balls in flight and average delay for every reach, and which reach is holding back the line.' },
  { id: 'splitTimers', tab: 'controls', name: 'Split Timers', price: 4800, requires: ['timingGate'],
    effect: 'Section-by-section times for the selected start or the ball you follow.' },
  { id: 'pressureAlerts', tab: 'controls', name: 'Pressure Alerts', price: 16000, requires: [],
    effect: 'Points to the first queue slowing the line and links straight to it on the map.' },
  { id: 'autoGap', tab: 'controls', name: 'Automatic Gap Tuning', price: 70000, requires: [],
    effect: 'Adjusts feeder spacing within safe limits from real downstream congestion. Manual override per site.' },
  { id: 'batchScheduler', tab: 'controls', name: 'Batch Scheduler', price: 120000, requires: [],
    effect: 'Queues up to three recipe batches per factory and switches as each target is made.' },
  { id: 'routePresets', tab: 'controls', name: 'Route Presets', price: 185000, requires: [],
    effect: 'Saves and restores up to five sets of feeder settings, transfer priorities and gate settings, with a preview.' },
  { id: 'efficiencyBench', tab: 'controls', name: 'Efficiency Bench', price: 275000, requires: [],
    effect: 'Compares two finished measurement windows: finish rate, escape rate, average delay and cash per minute.' },
];

export const UPGRADE_BY_ID = Object.fromEntries(UPGRADES.map((u) => [u.id, u]));
export const isSiteUpgrade = (id) => UPGRADE_BY_ID[id]?.scope === 'site';

// Ball manufacturing flags
export const BF = {
  PREMIUM: 1,
  CORES: 2,
  SEAM: 4,
  WATER: 8,
  REINFORCED: 16,
  STAMP: 32,
  NCN: 64,
  REPLICA: 128,
};

export function specFromOwned(owned) {
  let f = 0;
  if (owned.has('premiumFelt')) f |= BF.PREMIUM;
  if (owned.has('cores')) f |= BF.CORES;
  if (owned.has('seamPress')) f |= BF.SEAM;
  if (owned.has('waterResist')) f |= BF.WATER;
  if (owned.has('reinforced')) f |= BF.REINFORCED;
  if (owned.has('batchStamp')) f |= BF.STAMP;
  if (owned.has('ncnStamp')) f |= BF.NCN;
  return f;
}

export function bonusForSpec(f) {
  return (f & BF.PREMIUM ? 5 : 0) + (f & BF.STAMP ? 25 : 0);
}

/** Per-site machine numbers from that site's owned set. */
export function factoryNumbers(owned) {
  let press = 3.0;
  if (owned.has('quickMold')) press = 2.2;
  if (owned.has('twinPress')) press = 1.55;
  if (owned.has('servo')) press = 1.15;
  if (owned.has('turbo')) press = 0.85;
  if (owned.has('continuousPress')) press = 0.5;
  let feeder = 2.5;
  if (owned.has('lowFriction')) feeder = 1.8;
  if (owned.has('indexed')) feeder = 1.3;
  if (owned.has('turbo')) feeder = 0.85;
  if (owned.has('continuousPress')) feeder = 0.5;
  let felt = 0.9;
  if (owned.has('fastFelt')) felt = 0.55;
  if (owned.has('parallelFelt')) felt = 0.28;
  let hopper = 8;
  if (owned.has('hopperExt')) hopper = 20;
  if (owned.has('bulkHopper')) hopper = 40;
  const changeover = owned.has('infeedTray') ? 2 : 6;
  return { press, feeder, felt, hopper, changeover, cycle: Math.max(press, felt) };
}

/** Finish-station numbers from the network's owned set. */
export function finishNumbers(owned) {
  let cap = owned.has('wideBasket') ? 14 : 6;
  let drain = 1.6;
  if (owned.has('wideBasket')) drain = 0.9;
  if (owned.has('conveyor')) drain = 0.3;
  if (owned.has('poweredBelt')) drain = 0.2;
  if (owned.has('twinPacking')) drain = 0.12;
  if (owned.has('splitTray')) { cap *= 2; drain *= 0.7; }
  if (owned.has('industrialCatch')) drain = Math.min(drain, 0.06);
  const overflow = owned.has('overflowCrate') ? 40 : 0;
  return { basketCap: cap, drain, overflow };
}
