// Game constants, launch sites, recipes, orders and the full upgrade catalogue.
// Every price, time and payout here is a tuning value (first balance pass).

export const BALL_R = 0.0335; // 6.7 cm diameter
export const BALL_M = 0.058; // 58 g
export const PHYS_DT = 1 / 120;
export const MANUAL_COOLDOWN = 2.5;

// Channel coordinate s = metres downstream along the creek (laid out along the creator's map at
// half scale, see layout.js). The finish gate is permanent.
export const S_FINISH = 555.0;
export const S_BASKET = 555.75;

// Launch sites, downstream first. `id` is the stable save identifier.
// `after`: the site that must be open before this one can be bought.
// `layer`: 'base' (base game), 'field' (a historical Creek Rolling location), 'game' (game-only headwater).
// TUNING: launch positions (s, metres from the top of the model), costs, base payouts and
// target run times. New-reach positions are game geography (layer 'game'); Flat Rocks is a
// PROVISIONAL placement of the mapped historical start on the Shelf route.
// Sites are listed downstream first (by run length). `cr: 'springs'` marks a site on the Crawfish
// Springs runoff stream: `ls` is its launch position on that stream and `s` the confluence with the
// creek, where its balls join the main run.
export const STARTS = [
  { id: 'trail', name: 'Trail Entrance', s: 548.5, cost: 0, base: 10, eta: 6, target: '5–8 s', after: null, layer: 'field',
    blurb: 'Just above the regular finish by the trail entrance: a short launch chute over an exposed root and a gravel bend.' },
  { id: 'waterfall', name: 'Waterfall', s: 405.0, cost: 350, base: 30, eta: 117, target: '1.8–2.1 min', after: 'trail', layer: 'field',
    blurb: 'Above the route split and the taped sign. The primary creek-right route goes over the falls 33 m below the split; the alternate branch steps down on the creek-left.' },
  { id: 'springs', name: 'Crawfish Springs', s: 497.1, ls: 54.0, cr: 'springs', cost: 1500, base: 65, eta: 117, target: '1.8–2.1 min', after: 'waterfall', layer: 'field',
    blurb: 'A secondary stream: the spring pool and deep-forest double ponds up on the Shelf, then a runoff chute down through the woods into the creek below the falls.' },
  { id: 'shelf', name: 'Continental Shelf', s: 318.0, cost: 6500, base: 120, eta: 184, target: '2.9–3.3 min', after: 'springs', layer: 'field',
    blurb: 'The long reach under the Continental Shelf, the wooded terrace on the creek’s east bank. A short drop in the Folk Draft below the launch.' },
  { id: 'flatrocks', name: 'Flat Rocks', s: 148.9, cost: 22000, base: 170, eta: 300, target: '4.8–5.3 min', after: 'shelf', layer: 'field',
    blurb: 'The usual historical start, by the big flat rocks: a thick sandstone ledge with a dark undercut on the west bank, a cobble bar and shallow water, the Shelf across the creek.' },
  { id: 'clearing', name: 'The Clearing', s: 92.0, cost: 75000, base: 240, eta: 360, target: '5.6–6.4 min', after: 'flatrocks', layer: 'field',
    blurb: 'Open sky above the deep pools where Nigatron was found: grass on the west side, the wooded Shelf on the east. Balls run through the deep pools first.' },
  { id: 'farlands', name: 'Farlands Entrance', s: 26.0, cost: 140000, base: 400, eta: 420, target: '6.6–7.6 min', after: 'clearing', layer: 'field',
    blurb: 'Just inside the Farlands, past the yellow entrance line where the Shelf ends: a wide braided gravel bed. Only one or two expeditions have gone farther in.' },
];
export const SITE_INDEX = Object.fromEntries(STARTS.map((s, i) => [s.id, i]));

// Merge checkpoints after a fork rejoins (either lane is legal).
// TUNING: merge checkpoints where forks rejoin (each lane must pass them to be paid).
export const MERGES = [
  { s: 468.8, name: 'Waterfall route merge' },
];

export function checkpointsFor(startIndex) {
  // a Springs-stream site joins the creek at its `s` (the confluence); checkpoints start below it
  const s0 = STARTS[startIndex].s;
  const cps = [];
  for (const st of STARTS) if (st.s > s0 + 0.01) cps.push(st.s);
  for (const m of MERGES) if (m.s > s0 + 0.01) cps.push(m.s);
  cps.sort((a, b) => a - b);
  return [...new Set(cps)];
}

// Reaches for the flow monitor, congestion and backpressure (downstream first).
// TUNING: safe balls in flight per reach (backpressure caps for fair release). Long open reaches
// hold about 1.5 balls per metre; narrow spots (Willow Narrows) are limited by their pinch.
export const REACHES = [
  { id: 'trail', name: 'Trail entrance run', s0: 547.0, s1: 565, cap: 26 },
  { id: 'confluence', name: 'Springs confluence', s0: 469.0, s1: 547.0, cap: 120 },
  { id: 'waterfall', name: 'Waterfall split & falls', s0: 405.0, s1: 469.0, cap: 90 },
  { id: 'shelf', name: 'Continental Shelf', s0: 147.0, s1: 405.0, cap: 390 },
  { id: 'flatrocks', name: 'Flat Rocks', s0: 101.0, s1: 147.0, cap: 70 },
  { id: 'clearing', name: 'The Clearing & deep pools', s0: 34.0, s1: 101.0, cap: 100 },
  { id: 'farlands', name: 'Farlands entrance', s0: 0, s1: 34.0, cap: 60 },
  // the Springs runoff stream (its own channel; s in stream coordinates)
  { id: 'springs', name: 'Crawfish Springs runoff', s0: 52.6, s1: 148, cap: 120, cr: 'springs' },
];
export const SPRINGS_REACH = REACHES.length - 1;
/** Main-creek reach index at s. */
export function reachAt(s) {
  for (let i = 0; i < REACHES.length; i++) if (!REACHES[i].cr && s >= REACHES[i].s0 && s < REACHES[i].s1) return i;
  return s >= 565 ? 0 : SPRINGS_REACH - 1;
}
/** Reach indices a ball launched at site k passes through, launch reach first. */
export function reachChain(k) {
  const st = STARTS[k];
  const out = st.cr ? [SPRINGS_REACH] : [];
  for (let r = reachAt(st.s); r >= 0; r--) out.push(r);
  return out;
}

// ---------------------------------------------------------------- recipes
// pct: bonus as a fraction of route base. Physical tradeoffs are applied in physics.js.
// TUNING: recipe bonus percentages and handling effects (effects live in physics.js).
export const RECIPES = [
  { id: 'standard', name: 'Standard', area: null, pct: 0, felt: [1, 1, 1], tag: 'STD',
    note: 'The current ball with your installed upgrades.' },
  { id: 'dryweave', name: 'Dry-Weave', area: 'shelf', pct: 0.04, felt: [1.12, 1.1, 1.25], tag: 'DRY',
    note: 'Repels water and sheds its wake sooner. Slightly less grip on dry wood. +4% of route base.' },
  { id: 'softcore', name: 'Soft-Core', area: 'springs', pct: 0.06, felt: [1.15, 0.86, 0.55], tag: 'SOFT',
    note: 'Takes more energy out of hard bounces. Rolls a little slower through shallow dry stretches. +6% of route base.' },
  { id: 'cleanseam', name: 'Clean-Seam', area: 'flatrocks', pct: 0.08, felt: [0.78, 1.08, 0.7], tag: 'SEAM',
    note: 'Much less low-speed wobble. No change to buoyancy. +8% of route base.' },
  { id: 'rapids', name: 'Rapids Felt', area: 'clearing', pct: 0.1, felt: [0.72, 0.82, 0.45], tag: 'RAPID',
    note: 'Keeps traction on wet rock. Its rougher finish adds drag in long calm pools. +10% of route base.' },
  { id: 'select', name: 'Workshop Select', area: 'farlands', pct: 0.14, felt: [1.18, 0.98, 0.5], tag: 'SEL',
    note: 'Measured quality sorting for steadier travel times. 15% longer to make. +14% of route base.' },
];
export const RECIPE_INDEX = Object.fromEntries(RECIPES.map((r, i) => [r.id, i]));
export function recipeBonus(base, recipe) {
  const r = RECIPES[recipe] || RECIPES[0];
  return Math.floor(base * r.pct + 0.5); // nearest whole dollar, halves round up
}

// ---------------------------------------------------------------- shipment orders
// minSite: index of the shortest qualifying launch ("from X or farther" = that site or further upstream).
// TUNING: order targets, bonuses, caps and unlock sites.
export const ORDERS = [
  { id: 'dry', name: 'Dry Delivery', recipe: 'dryweave', minSite: 'springs', target: 20, bonus: 30, opens: 'springs',
    text: 'Dry-Weave from Crawfish Springs or farther' },
  { id: 'soft', name: 'Norway-Style Soft Landing', recipe: 'softcore', minSite: 'shelf', target: 35, bonus: 45, opens: 'shelf',
    text: 'Soft-Core from the Continental Shelf or farther' },
  { id: 'flatbatch', name: 'Flat Rocks Batch', recipe: null, onlySite: 'flatrocks', target: 50, bonus: 60, opens: 'flatrocks',
    text: 'Any recipe launched from Flat Rocks, the usual start' },
  { id: 'cleanrun', name: 'Clean-Seam Run', recipe: 'cleanseam', minSite: 'flatrocks', target: 65, bonus: 75, opens: 'flatrocks',
    text: 'Clean-Seam from Flat Rocks or farther' },
  { id: 'twopost', name: 'Two-Post Service', recipe: null, twoPosts: true, target: 80, bonus: 90, perPostCap: 50, opens: 'clearing',
    text: 'Deliveries from two launches you pick, at least 30 from each' },
  { id: 'pools', name: 'Deep Pools Batch', recipe: 'rapids', minSite: 'clearing', target: 100, bonus: 110, opens: 'clearing',
    text: 'Rapids Felt from the Clearing or farther' },
  { id: 'select', name: 'Select Shipment', recipe: 'select', minSite: 'farlands', target: 125, bonus: 150, opens: 'farlands',
    text: 'Workshop Select from the Farlands Entrance' },
  { id: 'ncnfar', name: 'New Creek Nation Farlands Batch', recipe: null, onlySite: 'farlands', target: 150, bonus: 200, opens: 'farlands',
    text: 'Any recipe launched from the Farlands Entrance' },
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
  { id: 'bankWorkshop', tab: 'factory', name: 'Bank Workshop', price: 18000, requires: [], area: 'shelf',
    effect: 'A fixed supply yard on the Shelf reach with one transfer route for surplus balls.' },
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
  { id: 'thirdPost', tab: 'logistics', name: 'Third Supply Route', price: 145000, requires: ['secondPost'], area: 'flatrocks',
    effect: 'The workshop can supply three factories at once.' },
  { id: 'prioritySwitch', tab: 'logistics', name: 'Priority Switch', price: 195000, requires: ['bankWorkshop'],
    effect: 'A loading switch that can reserve a minimum share of transfers for one chosen factory.' },
  { id: 'fastLift', tab: 'logistics', name: 'Fast Bank Lift', price: 310000, requires: ['doubleDeck'],
    effect: 'Loading and unloading on the steepest deliveries 4 s → 1.5 s.' },

  // ---------------- Creek equipment (network, at fixed spots)
  // Creek equipment: every item sits at a real place on the creator's map.
  { id: 'rootRail', tab: 'creek', name: 'Trail Entrance Root Rail', price: 75, requires: [], area: 'trail', spot: 'root',
    effect: 'A steel rail closes the notch beside the exposed root just above the trail-entrance finish, so balls slide past instead of wedging.' },
  { id: 'gravelMat', tab: 'creek', name: 'Trail Entrance Gravel Mat', price: 120, requires: [], area: 'trail', spot: 'gravel',
    effect: 'A rubber mat over the rough cobbles in the last bend before the finish gate. Removes the random slowdowns there.' },
  { id: 'splashGuard', tab: 'creek', name: 'Falls Splash Guard', price: 280, requires: [], area: 'waterfall', spot: 'lip',
    effect: 'Angled boards at the lip of the falls turn balls that glance off the horn rocks back into the centre slot, away from the side notches.' },
  { id: 'poolGuide', tab: 'creek', name: 'Plunge Pool Guide', price: 525, requires: [], area: 'waterfall', spot: 'pool',
    effect: 'A floating boom keeps balls out of the back eddy of the plunge pool below the falls.' },
  { id: 'splitGate', tab: 'creek', name: 'Route Split Gate', price: 2400, requires: [], area: 'waterfall', spot: 'split',
    effect: 'A real adjustable gate at the route split, 20 ft below the taped sign. Direct sends every ball over the falls on the primary route, Calm down the alternate branch, Balanced alternates.' },
  { id: 'splitMergeRail', tab: 'creek', name: 'Waterfall Merge Rail', price: 4800, requires: [], area: 'waterfall', spot: 'merge',
    effect: 'Guides the alternate branch into a staggered merge with the primary route below the plunge pool and cuts head-on bumps.' },
  { id: 'spillSkimmer', tab: 'creek', name: 'Plunge Pool Skimmer', price: 9000, requires: [], area: 'waterfall', spot: 'pool',
    effect: 'A pivoting skimmer sweeps balls held in the plunge pool back into the outflow.' },
  { id: 'catchRamp', tab: 'creek', name: 'Shelf Catch Ramp', price: 1100, requires: [], area: 'shelf', spot: 'catch',
    effect: 'A wooden ramp catches balls off the Shelf drop and sets them back in the channel instead of the rock jumble.' },
  { id: 'debrisScreen', tab: 'creek', name: 'Spring Debris Screen', price: 2800, requires: [], area: 'springs', spot: 'springs',
    effect: 'Fixed posts hold the driftwood against the bank of the spring pool so it stops pinning balls.' },
  { id: 'spillRail', tab: 'creek', name: 'Springs Spillway Rail', price: 3600, requires: [], area: 'springs', spot: 'spillway',
    effect: 'Low rails along the narrow rocky spillway below the spring pool keep balls out of the lee of the snag rocks.' },
  { id: 'clearingArm', tab: 'creek', name: 'Springs Outlet Sweeper', price: 12000, requires: [], area: 'springs', spot: 'outlet',
    effect: 'An automatic arm sweeps balls stuck in the corners of the spring pool outlet back into the spillway.' },
  { id: 'landingBoards', tab: 'creek', name: 'Runoff Chute Landing Boards', price: 16000, requires: [], area: 'springs', spot: 'runoffDrop',
    effect: 'Angled boards cover the rock jumble under the two drops in the runoff chute down the Shelf.' },
  { id: 'basinBoom', tab: 'creek', name: 'Deep Pools Float Boom', price: 28000, requires: [], area: 'clearing', spot: 'deepPool',
    effect: 'Redirects balls out of the slow recirculation in the Clearing’s deep pools while leaving a visible eddy.' },
  { id: 'basinVane', tab: 'creek', name: 'Deep Pools Flow Vane', price: 42000, requires: ['basinBoom'], area: 'clearing', spot: 'deepPool',
    effect: 'Steers the surface current toward the faster tongue through the deep pools.' },
  { id: 'headGuide', tab: 'creek', name: 'Farlands Braid Guide', price: 60000, requires: [], area: 'farlands', spot: 'farlands',
    effect: 'Floating guides pull balls out of the shallow side braids of the wide Farlands gravel bed into the main braid.' },
  { id: 'headRails', tab: 'creek', name: 'Farlands Braid Rails', price: 90000, requires: ['headGuide'], area: 'farlands', spot: 'farlands',
    effect: 'Low rails along the main braid below the Farlands entrance line keep balls off the dry gravel bars.' },
  // lore-linked
  { id: 'draftRibbon', tab: 'creek', lore: true, name: 'Shelf Draft Ribbon', price: 2400, requires: [], area: 'shelf', spot: 'draft',
    effect: 'A physical ribbon and a map arrow show the Folk Draft (a downdraft) at the Shelf drop, and log how many balls drop into the lower catch area.' },
  { id: 'windScreen', tab: 'creek', lore: true, name: 'Shelf Wind Screen', price: 9500, requires: [], area: 'shelf', spot: 'windScreen',
    effect: 'Breaks the Folk Draft along the protected launch approach and reduces sideways spill from uneven gusts. The open Shelf still shows the Draft.' },
  { id: 'springsSampler', tab: 'creek', lore: true, name: 'Springs Bank Sampler', price: 12000, requires: [], area: 'springs', spot: 'sampler',
    effect: 'A stationary sampling post. The Network panel separates Code Rot observations, normal current and Draft exposure, and shows which lane is slowing production.' },
  { id: 'habitatBypass', tab: 'creek', lore: true, name: 'Crayfish Habitat Bypass', price: 22000, requires: [], area: 'springs', spot: 'habitat',
    effect: 'A raised guide around the habitat edge that rejoins at the spillway. The crayfish area stays separate from the ball channel.' },
  { id: 'branchSweeper', tab: 'creek', lore: true, name: 'Norway-Style Branch Sweeper', price: 35000, requires: [], area: 'clearing', spot: 'deepPool',
    effect: 'A visible pivoting branch, inspired by the Norway Cavern recovery, returns stalled factory balls in the deep pools to the same lane.' },

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
  { id: 'ncnStamp', tab: 'balls', scope: SITE, lore: true, name: 'New Creek Nation Batch Stamp', price: 125000, requires: [], requiresGlobal: ['bankWorkshop'], area: 'flatrocks',
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
// TUNING: machine timings (press cycle, feeder interval, felt line, hopper size, changeover).
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
