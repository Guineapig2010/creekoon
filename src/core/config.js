// Game constants, launch points, and the full upgrade catalogue.

export const BALL_R = 0.0335; // 6.7 cm diameter
export const BALL_M = 0.058; // 58 g
export const PHYS_DT = 1 / 120;
export const MANUAL_COOLDOWN = 2.5;

// Section boundaries along the creek (metres of channel, measured downstream
// from the head of the Upper Gorge). The finish gate is permanent at S_FINISH.
export const S_FINISH = 98.5;
export const S_BASKET = 99.25;

export const STARTS = [
  { id: 'grounds', name: 'Old Rolling Grounds', s: 92.0, cost: 0, base: 10, eta: 5, target: '5 s',
    blurb: 'A short launch chute, exposed roots, and a gravel-bed bend.' },
  { id: 'waterfall', name: 'Waterfall Run', s: 80.7, cost: 350, base: 30, eta: 16, target: '14–18 s',
    blurb: 'A rock chute over a waterfall into a plunge pool before the original stretch.' },
  { id: 'shelf', name: 'Continental Shelf', s: 68.0, cost: 1500, base: 65, eta: 30, target: '26–34 s',
    blurb: 'A shelf along the right side near the waterfall. A short exposed drop feeds the waterfall approach.' },
  { id: 'springs', name: 'Crawfish Springs', s: 54.0, cost: 6500, base: 120, eta: 47, target: '42–52 s',
    blurb: 'A spring-fed pool above the Shelf, followed by a narrow rocky spillway.' },
  { id: 'alder', name: 'Alder Bend', s: 34.0, cost: 22000, base: 220, eta: 67, target: '60–74 s',
    blurb: 'An undercut bank, a split around a gravel island, and a rejoin before the Springs.' },
  { id: 'gorge', name: 'Upper Gorge', s: 0.0, cost: 75000, base: 400, eta: 95, target: '85–105 s',
    blurb: 'Two steep rock steps and a short stretch of whitewater above Alder Bend.' },
];

// Extra checkpoint after the Alder Bend island rejoins (either branch is legal).
export const ALDER_REJOIN_S = 50.6;

export function checkpointsFor(startIndex) {
  const s0 = STARTS[startIndex].s;
  const cps = [];
  for (const st of STARTS) if (st.s > s0 + 0.01) cps.push(st.s);
  if (s0 < ALDER_REJOIN_S) cps.push(ALDER_REJOIN_S);
  cps.sort((a, b) => a - b);
  return cps;
}

export const TABS = [
  { id: 'factory', name: 'Factory' },
  { id: 'creek', name: 'Creek' },
  { id: 'balls', name: 'Balls' },
  { id: 'finish', name: 'Finish' },
];

// requires: list of upgrade ids; area: minimum unlocked start index.
export const UPGRADES = [
  // ---------------- Factory and launch equipment ----------------
  { id: 'press', tab: 'factory', name: 'Auto Press', price: 25, requires: [],
    effect: 'Makes one ball every 3 s and adds an eight-ball hopper.' },
  { id: 'feeder', tab: 'factory', name: 'Auto Feeder', price: 45, requires: ['press'],
    effect: 'Launches one queued ball every 2.5 s when the chute is clear.' },
  { id: 'quickMold', tab: 'factory', name: 'Quick Mold', price: 95, requires: ['press'],
    effect: 'Press interval 3 s → 2.2 s. The brass mold opens faster.' },
  { id: 'lowFriction', tab: 'factory', name: 'Low-Friction Chute', price: 140, requires: ['feeder'],
    effect: 'Feeder interval 2.5 s → 1.8 s. Launch speed spread ±22% → ±7%.' },
  { id: 'hopperExt', tab: 'factory', name: 'Hopper Extension', price: 240, requires: ['press'],
    effect: 'Hopper storage 8 → 20 balls to hold a reserve during blockages or moves.' },
  { id: 'twinPress', tab: 'factory', name: 'Twin Press', price: 650, requires: ['quickMold'],
    effect: 'Adds a second press head. Combined production 2.2 s → 1.55 s per ball.' },
  { id: 'indexed', tab: 'factory', name: 'Indexed Feeder', price: 850, requires: ['lowFriction'],
    effect: 'Rotating pocket wheel. Release interval 1.8 s → 1.3 s.' },
  { id: 'servo', tab: 'factory', name: 'Servo Drive', price: 3200, requires: ['twinPress'],
    effect: 'Twin Press interval 1.55 s → 1.15 s.' },
  { id: 'bulkHopper', tab: 'factory', name: 'Bulk Hopper', price: 4500, requires: ['hopperExt'],
    effect: 'Hopper storage 20 → 40 balls, with a visible fill gauge.' },
  { id: 'turbo', tab: 'factory', name: 'Turbo Line', price: 18000, requires: ['servo', 'indexed'],
    effect: 'Press and feeder both run at one ball every 0.85 s.' },

  // ---------------- Creek equipment ----------------
  { id: 'rootRail', tab: 'creek', name: 'Root Bend Rail', price: 75, requires: [], area: 0, spot: 'root',
    effect: 'Rail across the gap under the exposed root at Old Rolling Grounds so balls cannot wedge there.' },
  { id: 'gravelMat', tab: 'creek', name: 'Gravel Run Mat', price: 120, requires: [], area: 0, spot: 'gravel',
    effect: 'Rubber mat over the roughest gravel patch. Removes random slowdowns there.' },
  { id: 'splashGuard', tab: 'creek', name: 'Splash Guard', price: 280, requires: [], area: 1, spot: 'lip',
    effect: 'Side walls at the waterfall lip catch balls that bounce sideways off the lip rocks.' },
  { id: 'poolGuide', tab: 'creek', name: 'Pool Guide', price: 525, requires: [], area: 1, spot: 'pool',
    effect: 'Floating boom on the outside of the plunge pool keeps balls out of its slow eddy.' },
  { id: 'catchRamp', tab: 'creek', name: 'Shelf Catch Ramp', price: 1100, requires: [], area: 2, spot: 'catch',
    effect: 'Ramp under the Shelf drop that receives falling balls and sends them into the waterfall approach.' },
  { id: 'debrisScreen', tab: 'creek', name: 'Spring Debris Screen', price: 2800, requires: [], area: 3, spot: 'springs',
    effect: 'Screen that holds the drifting driftwood in the Springs pool out of the ball channel.' },
  { id: 'spillRail', tab: 'creek', name: 'Spillway Rail', price: 3600, requires: [], area: 3, spot: 'spillway',
    effect: 'Twin rails keep balls centred through the narrow spillway, away from the snag rocks.' },
  { id: 'alderBypass', tab: 'creek', name: 'Alder Bypass', price: 8500, requires: [], area: 4, spot: 'island',
    effect: 'Bank-side guide at the island split so balls skip the dead pocket and rejoin below the island.' },
  { id: 'landingBoards', tab: 'creek', name: 'Gorge Landing Boards', price: 24000, requires: [], area: 5, spot: 'gorgeStep',
    effect: 'Angled boards soften hard deflections at the first Gorge drop and keep balls in the main flow.' },
  { id: 'clearingArm', tab: 'creek', name: 'Automatic Clearing Arm', price: 32000, requires: [], area: 5, spot: 'arm',
    effect: 'Mechanical sweep at the busiest bottleneck (the spillway mouth) returns stalled balls to the same channel. No cash, no skipped checkpoints.' },

  // ---------------- Ball production ----------------
  { id: 'premiumFelt', tab: 'balls', name: 'Premium Felt', price: 180, requires: [],
    effect: 'New balls get a blue band and +$5 on their finish payout.' },
  { id: 'cores', tab: 'balls', name: 'Consistent Cores', price: 380, requires: [],
    effect: 'Rounder cores: low-speed wobble reduced by about 70%.' },
  { id: 'seamPress', tab: 'balls', name: 'Seam Press', price: 900, requires: ['cores'],
    effect: 'Even seams: launch-to-launch speed and aim variation reduced by about 75%.' },
  { id: 'waterResist', tab: 'balls', name: 'Water-Resistant Felt', price: 2100, requires: ['premiumFelt'],
    effect: 'Water uptake cut by 75%. Balls stay lighter and ride higher through the plunge pool.' },
  { id: 'reinforced', tab: 'balls', name: 'Reinforced Core', price: 5200, requires: ['seamPress'],
    effect: 'Bounce after hard drops becomes consistent (restitution spread ±0.13 → ±0.03).' },
  { id: 'batchStamp', tab: 'balls', name: 'Finished Batch Stamp', price: 9500, requires: ['waterResist'],
    effect: 'Readable production stamp and a +$25 finish bonus on new balls.' },

  // ---------------- Finish station and controls ----------------
  { id: 'wideBasket', tab: 'finish', name: 'Wide Catch Basket', price: 200, requires: [],
    effect: 'Basket room 6 → 14 balls and settling time 1.6 s → 0.9 s, so the exit clears faster.' },
  { id: 'timingGate', tab: 'finish', name: 'Timing Gate', price: 800, requires: [],
    effect: 'In-world board: last finish time, balls per minute, and average travel time from the selected start.' },
  { id: 'spacingSensor', tab: 'finish', name: 'Spacing Sensor', price: 4000, requires: ['feeder'],
    effect: 'Replaces the feeder’s 1.25 s / 1 m landing buffer with a sensor that releases at the earliest safe moment.' },
  { id: 'conveyor', tab: 'finish', name: 'Automatic Basket Conveyor', price: 14000, requires: ['wideBasket'],
    effect: 'Empties the basket continuously (0.3 s per ball) and stacks finished balls in a crate.' },
];

export const UPGRADE_BY_ID = Object.fromEntries(UPGRADES.map((u) => [u.id, u]));

// Ball manufacturing flags
export const BF = {
  PREMIUM: 1,
  CORES: 2,
  SEAM: 4,
  WATER: 8,
  REINFORCED: 16,
  STAMP: 32,
};

export function specFromOwned(owned) {
  let f = 0;
  if (owned.has('premiumFelt')) f |= BF.PREMIUM;
  if (owned.has('cores')) f |= BF.CORES;
  if (owned.has('seamPress')) f |= BF.SEAM;
  if (owned.has('waterResist')) f |= BF.WATER;
  if (owned.has('reinforced')) f |= BF.REINFORCED;
  if (owned.has('batchStamp')) f |= BF.STAMP;
  return f;
}

export function bonusForSpec(f) {
  return (f & BF.PREMIUM ? 5 : 0) + (f & BF.STAMP ? 25 : 0);
}

export function factoryNumbers(owned) {
  let press = 3.0;
  if (owned.has('quickMold')) press = 2.2;
  if (owned.has('twinPress')) press = 1.55;
  if (owned.has('servo')) press = 1.15;
  if (owned.has('turbo')) press = 0.85;
  let feeder = 2.5;
  if (owned.has('lowFriction')) feeder = 1.8;
  if (owned.has('indexed')) feeder = 1.3;
  if (owned.has('turbo')) feeder = 0.85;
  let hopper = 8;
  if (owned.has('hopperExt')) hopper = 20;
  if (owned.has('bulkHopper')) hopper = 40;
  const basketCap = owned.has('wideBasket') ? 14 : 6;
  let drain = 1.6;
  if (owned.has('wideBasket')) drain = 0.9;
  if (owned.has('conveyor')) drain = 0.3;
  return { press, feeder, hopper, basketCap, drain };
}
