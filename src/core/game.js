// Game state for the New Creek Nation network: a permanent factory at every open
// launch site, one shared cash balance, one finish gate, recipes, orders, the Bank
// Workshop supply carts, and saving. Pure logic (no DOM / three.js), runs headless.

import {
  STARTS, SITE_INDEX, UPGRADES, UPGRADE_BY_ID, S_FINISH, S_BASKET, MANUAL_COOLDOWN, PHYS_DT, BALL_R, BF,
  REACHES, reachAt, reachChain, SPRINGS_REACH, RECIPES, RECIPE_INDEX, ORDERS, isSiteUpgrade,
  checkpointsFor, specFromOwned, bonusForSpec, recipeBonus, factoryNumbers, finishNumbers,
} from './config.js';
import { PhysicsWorld, makeBall, ballRand } from './physics.js';
import { MAT, S_MIN, S_MAX } from './creek.js';

// Layout version: positions saved with an older geography cannot be placed on the new creek.
export const GEO_VERSION = 3;

export const SAVE_VERSION = 2;
const OLD_IDS = ['grounds', 'waterfall', 'shelf', 'springs', 'alder', 'gorge'];
// Site order in saves from before the creek kept only the creator's map places (cart and route indices)
const GEO2_IDS = ['grounds', 'waterfall', 'springs', 'shelf', 'flatrocks', 'alder', 'gorge', 'slate', 'willow', 'splitstone', 'longeddy', 'spillway', 'sluice', 'coldspring'];

// Where losses/stalls happen and which creek equipment addresses them
// Trouble spots at real places on the creator's map. `cr: 'springs'` spots are on the Crawfish
// Springs runoff stream (stream coordinates). Balls far from the player travel on a streamed
// path and take each spot's odds instead of simulating it: `loss` and `delay` (seconds) with and
// without the fix. TUNING: first-pass odds; balls near the player are fully simulated.
export const TROUBLE_SPOTS = [
  { id: 'root', s0: 549.1, s1: 550.7, fix: 'rootRail', label: 'the exposed root at the trail entrance', loss: [0.04, 0.004], delay: [3, 0.5] },
  { id: 'gravel', s0: 550.7, s1: 552.9, fix: 'gravelMat', label: 'the rough gravel above the finish', loss: [0.02, 0.002], delay: [2, 0.3] },
  { id: 'lip', s0: 449.8, s1: 452.4, fix: 'splashGuard', label: 'the lip of the falls', loss: [0.06, 0.01], delay: [2, 0.5] },
  { id: 'pool', s0: 452.4, s1: 456.0, fix: 'poolGuide', also: ['spillSkimmer'], label: 'the plunge pool eddy', loss: [0.05, 0.01], delay: [8, 2] },
  { id: 'split', s0: 416.6, s1: 420.0, fix: 'splitGate', label: 'the route split', loss: [0.02, 0.005], delay: [3, 1] },
  { id: 'merge', s0: 466.0, s1: 470.0, fix: 'splitMergeRail', label: 'the waterfall route merge', loss: [0.02, 0.005], delay: [3, 1] },
  { id: 'catch', s0: 326.0, s1: 330.5, fix: 'catchRamp', label: 'the Shelf drop', loss: [0.06, 0.01], delay: [4, 1] },
  { id: 'deepPool', s0: 96.0, s1: 100.6, fix: 'basinBoom', also: ['basinVane', 'branchSweeper'], label: 'the Clearing’s deep pools', loss: [0.05, 0.01], delay: [15, 4] },
  { id: 'farlands', s0: 0, s1: 31.0, fix: 'headGuide', also: ['headRails'], label: 'the Farlands gravel braids', loss: [0.04, 0.01], delay: [6, 2] },
  { id: 'codeRot', s0: 57.6, s1: 60.4, fix: 'habitatBypass', label: 'the Code Rot pocket at the Springs', side: 1, cr: 'springs', loss: [0.04, 0.01], delay: [10, 3] },
  { id: 'springs', s0: 52.6, s1: 57.6, fix: 'debrisScreen', label: 'the Springs driftwood', cr: 'springs', loss: [0.05, 0.01], delay: [8, 2] },
  { id: 'outlet', s0: 61.6, s1: 62.15, fix: 'clearingArm', label: 'the Springs outlet notch', cr: 'springs', loss: [0.06, 0.01], delay: [8, 2] },
  { id: 'spillway', s0: 62.15, s1: 68.0, fix: 'spillRail', label: 'the narrow spillway', cr: 'springs', loss: [0.04, 0.01], delay: [4, 1] },
  { id: 'runoffDrop', s0: 95.8, s1: 97.8, fix: 'landingBoards', label: 'the first drop in the runoff chute', cr: 'springs', loss: [0.04, 0.008], delay: [3, 1] },
  { id: 'runoffDrop2', s0: 120.8, s1: 122.8, fix: 'landingBoards', label: 'the second drop in the runoff chute', cr: 'springs', loss: [0.04, 0.008], delay: [3, 1] },
];
/** Trouble spot containing a ball (or a stall record) on channel cr (0 main, 1 springs). */
export function spotAt(s, cr = 0) {
  for (const sp of TROUBLE_SPOTS) if ((sp.cr ? cr === 1 : cr !== 1) && s >= sp.s0 && s < sp.s1) return sp;
  return null;
}
// Sweepers: zone, stall time that triggers them, the upgrade that installs them
export const SWEEPERS = [
  { id: 'arm', up: 'clearingArm', s0: 59.4, s1: 62.9, pivotS: 61.4, side: 1, name: 'Springs Outlet Sweeper', cr: 'springs' },
  { id: 'branch', up: 'branchSweeper', s0: 96.0, s1: 100.6, pivotS: 98.3, side: -1, name: 'Branch Sweeper' },
  { id: 'skimmer', up: 'spillSkimmer', s0: 451.6, s1: 455.6, pivotS: 453.3, side: 1, name: 'Plunge Pool Skimmer' },
];
export const ARM = SWEEPERS[0];
// The Bank Workshop yard: the grassy west bank between the Clearing and Flat Rocks, below the Shelf
export const WORKSHOP = { s: 120, side: 1 };

const SITE_GROUPS = ['rootRail', 'splashGuard', 'poolGuide', 'catchRamp', 'spillRail', 'landingBoards', 'debrisScreen',
  'splitMergeRail', 'basinBoom', 'headGuide', 'headRails', 'habitatBypass'];
// Site ids from earlier versions (base game and the first expansion) and where they now launch.
// Creek upgrades at places that are not on the creator's map, with what they cost: a save that
// owned one gets the money back when it loads.
export const REMOVED_UPGRADES = {
  alderBypass: 8500, slateBumpers: 32000, slateOutlet: 43000, leafGrate: 48000, willowShield: 65000, willowFlare: 82000,
  spillApron: 245000, sluiceAlternator: 350000, sluiceMerge: 415000,
};
// What the old headwater sites cost: when two old sites become one real place, the second is refunded.
const OLD_SITE_COST = { alder: 22000, gorge: 75000, slate: 140000, willow: 230000, splitstone: 365000, longeddy: 560000, spillway: 830000, sluice: 1220000, coldspring: 1800000 };
export const SITE_RENAMES = {
  grounds: 'trail', alder: 'clearing', gorge: 'farlands', slate: 'farlands', willow: 'farlands', splitstone: 'farlands',
  longeddy: 'farlands', spillway: 'farlands', sluice: 'farlands', coldspring: 'farlands',
};

function newSite(k) {
  return {
    id: STARTS[k].id, open: k === 0, owned: new Set(), hopper: [], post: [], pressProg: 0, pressCount: 0, feederT: 0,
    manualCD: 0, lastLaunch: null, recipe: 0, changeT: 0, batch: [], madeBy: [0, 0, 0, 0, 0, 0],
    enabled: { press: true, feeder: true, release: true }, gap: 0, autoGapK: 1, waitT: 0, status: '', reason: '',
    stats: { made: 0, launched: 0, finished: 0, lost: 0, revenue: 0, rejected: 0, transferredOut: 0, transferredIn: 0 },
    ncnBatch: 1, ncnMade: 0, ncnFinished: 0, replica: null, gauge: true, chuteCols: [],
  };
}

export class Game {
  constructor(creek, save = null, opts = {}) {
    this.creek = creek;
    this.springs = creek.springs || null;
    this.phys = new PhysicsWorld(creek, this.springs);
    this.events = [];
    this.acc = 0;
    this.headless = !!opts.headless;
    this.reset();
    if (save) this.load(save);
    this.applyOwned();
    this.installChutes();
    this.lastSaveT = this.t;
  }

  reset() {
    this.t = 0;
    this.status = { press: '', feeder: '', creek: '' };
    this.cash = 0;
    this.owned = new Set();
    this.sites = STARTS.map((_, k) => newSite(k));
    this.sel = 0;
    this.nextId = 1;
    this.ncnSerial = 0;
    this.stats = { made: 0, launched: 0, finished: 0, lost: 0, paid: 0, completed: 0, rejected: 0, draftCatch: 0 };
    this.recent = [];
    this.basket = [];
    this.overflow = 0;
    this.drainT = 0;
    this.crate = 0;
    this.crates = [0, 0, 0, 0, 0, 0];
    this.settings = { sound: true, auto: true, quality: 'high', sens: 1, fov: 70, headBob: true, quiet: false, firstPerson: true };
    this.routeStats = STARTS.map(() => ({ n: 0, avg: 0, last: 0, best: 0 }));
    this.records = { bestCpm: 0, bestRun: {}, finishesByRecipe: [0, 0, 0, 0, 0, 0], gorgeFirst: null, headFirst: null };
    this.lastFinish = null;
    this.laneLast = [null, null];
    this.bestCpm = 0;
    this.gorgeFinished = false;
    this.lossBySpot = {};
    this.lossLog = [];
    this.stallLog = [];
    this.sweep = SWEEPERS.map(() => ({ phase: 0, cd: 0 }));
    this.arm = this.sweep[0];
    this.seenStatus = {};
    this.logs = [0, 2.1, 4.2].map((ph) => ({ ph, x: 0, y: 0, z: 0, ax: 0, az: 0, bx: 0, bz: 0, ang: 0 }));
    this.finishTimes = [];
    this.launchSeed = 99;
    this.order = null; // active order
    this.orderLog = []; // finished / cancelled orders (with outstanding reservations)
    this.orderSeq = 1;
    this.workshop = { routes: [], carts: [], priority: { site: null, share: 0.5 }, shipped: 0, yard: [], tripsTo: {} };
    this.splitGate = 'balanced';
    this.gatePhase = 0;
    this.presets = [null, null, null, null, null];
    this.bench = { windows: [], current: null };
    this.trial = null; // before/after measurement for the last purchase
    this.milestones = {};
    this.player = null; // {x,y,z,yaw,pitch, safe:{x,y,z}} from the renderer
    this.reachStats = REACHES.map(() => ({ count: 0, delay: 0, delayN: 0, delayAvg: 0, congested: false }));
    this.splits = []; // recent section times
    this.sessionStart = undefined;
    this.phys.balls = [];
  }

  // ------------------------------------------------------------------ helpers
  get site() { return this.sites[this.sel]; }
  get unlocked() { let n = 0; for (const s of this.sites) if (s.open) n++; return n; }
  openSites() { const out = []; this.sites.forEach((s, k) => { if (s.open) out.push(k); }); return out; }
  isOpen(id) { const k = SITE_INDEX[id]; return k !== undefined && this.sites[k].open; }
  siteNumbers(k) { return factoryNumbers(this.sites[k].owned); }
  get numbers() { const n = this.siteNumbers(this.sel); const f = finishNumbers(this.owned); return { ...n, ...f }; }
  get finish() { return finishNumbers(this.owned); }
  /** Does the player own this upgrade? Site-scoped ids are checked at site k (default: selected). */
  has(id, k = this.sel) { return isSiteUpgrade(id) ? this.sites[k].owned.has(id) : this.owned.has(id); }
  anySite(id) { return this.sites.some((s) => s.open && s.owned.has(id)); }
  ballsRolling() { let n = 0; for (const b of this.phys.balls) if (b.state === 'roll' && !b.paid) n++; return n; }
  queueCount() { let n = 0; for (const b of this.phys.balls) if (b.state === 'queue') n++; return n; }
  hopperTotal() { let n = 0; for (const s of this.sites) n += s.hopper.length + s.post.length; return n; }
  get hopper() { return this.site.hopper; }

  cashPerMin(window = 60) {
    let sum = 0;
    for (let i = this.recent.length - 1; i >= 0; i--) { const [t, a] = this.recent[i]; if (this.t - t > window) break; sum += a; }
    const span = Math.min(window, Math.max(10, this.t - (this.sessionStart ?? 0)));
    return (sum * 60) / span;
  }

  ballsPerMin(window = 60) {
    let n = 0;
    for (let i = this.finishTimes.length - 1; i >= 0; i--) { if (this.t - this.finishTimes[i] > window) break; n++; }
    const span = Math.min(window, Math.max(10, this.t - (this.sessionStart ?? 0)));
    return (n * 60) / span;
  }

  etaFor(k) { const rs = this.routeStats[k]; return rs.n >= 3 ? rs.avg : STARTS[k].eta; }

  specFor(k) {
    const site = this.sites[k];
    let f = specFromOwned(site.owned);
    if (site.owned.has('replicaJig') && site.replica) f |= BF.REPLICA;
    return f;
  }

  /** Payout a ball launched at site k would earn (before any order bonus). */
  payoutFor(k, spec = this.specFor(k), recipe = this.sites[k].recipe) {
    return STARTS[k].base + bonusForSpec(spec) + recipeBonus(STARTS[k].base, recipe);
  }

  nextArrival() {
    let best = Infinity;
    for (const b of this.phys.balls) {
      if (b.state !== 'roll' || b.paid) continue;
      const left = this.etaFor(b.start) - b.age;
      if (left < best) best = left;
    }
    return best === Infinity ? null : Math.max(0, best);
  }

  recipeAvailable(r) { const R = RECIPES[r]; return !R.area || this.isOpen(R.area); }

  // ------------------------------------------------------------------ purchases
  canBuy(id, k = this.sel) {
    const u = UPGRADE_BY_ID[id];
    if (!u) return { ok: false, why: 'Unknown' };
    const site = isSiteUpgrade(id);
    if (site && !this.sites[k].open) return { ok: false, why: 'Site not open' };
    if (this.has(id, k)) return { ok: false, why: 'Owned' };
    for (const r of u.requires) if (!this.has(r, k)) return { ok: false, why: `Requires ${UPGRADE_BY_ID[r].name}` };
    for (const r of u.requiresGlobal || []) if (!this.owned.has(r)) return { ok: false, why: `Requires ${UPGRADE_BY_ID[r].name}` };
    if (u.area && !this.isOpen(u.area)) return { ok: false, why: `Requires ${STARTS[SITE_INDEX[u.area]].name}` };
    if (this.cash < u.price) return { ok: false, why: 'Not enough cash', afford: false, avail: true };
    return { ok: true };
  }

  blocked(id, k = this.sel) {
    const c = this.canBuy(id, k);
    return !c.ok && !c.avail && c.why !== 'Owned';
  }

  buy(id, k = this.sel) {
    const c = this.canBuy(id, k);
    if (!c.ok) return false;
    const u = UPGRADE_BY_ID[id];
    const before = this.measureNow();
    this.cash -= u.price;
    if (isSiteUpgrade(id)) this.sites[k].owned.add(id); else this.owned.add(id);
    this.applyOwned();
    if (id === 'bankWorkshop' && !this.workshop.routes.length) this.workshop.routes = [this.defaultRouteDest()];
    this.trial = { id, site: isSiteUpgrade(id) ? k : null, t0: this.t, before, after: null, startFin: this.stats.finished, startCash: this.stats.paid, startLost: this.stats.lost };
    this.events.push({ type: 'purchase', id, site: k });
    return true;
  }

  siteCost(k) { return STARTS[k].cost; }
  canUnlock(k) {
    const st = STARTS[k];
    if (!st || this.sites[k].open) return false;
    if (st.after && !this.isOpen(st.after)) return false;
    return this.cash >= st.cost;
  }
  unlockable(k) { const st = STARTS[k]; return !this.sites[k].open && (!st.after || this.isOpen(st.after)); }

  unlock(k) {
    if (!this.canUnlock(k)) return false;
    this.cash -= STARTS[k].cost;
    const site = this.sites[k];
    site.open = true;
    // a new site comes with a basic automatic line once the player has basic automation anywhere
    if (this.anySite('press')) site.owned.add('press');
    if (this.anySite('feeder')) site.owned.add('feeder');
    this.installChutes();
    this.events.push({ type: 'unlock', k });
    const ms = { springs: 'springs', shelf: 'shelf', flatrocks: 'flatrocks', clearing: 'clearing', farlands: 'farlands' }[STARTS[k].id];
    if (ms && !this.milestones[ms]) { this.milestones[ms] = this.t; this.events.push({ type: 'intro', what: ms }); }
    return true;
  }

  /** Changes which factory the player views and edits. Never moves or stops a factory. */
  selectSite(k) {
    if (!this.sites[k] || !this.sites[k].open) return false;
    this.sel = k;
    this.events.push({ type: 'selectSite', k });
    return true;
  }
  selectStart(k) { return this.selectSite(k); }

  applyOwned() {
    const o = this.owned, P = this.phys;
    for (const g of SITE_GROUPS) P.setGroup(g, o.has(g));
    P.matOn = o.has('gravelMat');
    P.setGroup('roughPebbles', !o.has('gravelMat'));
    P.setGroup('runoffLanding', true);
    const M = this.creek.mods;
    M.basinVane = o.has('basinVane');
    M.headGuide = o.has('headGuide');
    if (this.springs) this.springs.mods.habitatGuide = o.has('habitatBypass');
    M.windScreen = o.has('windScreen');
    this.updateGates(0);
    const routes = 1 + (o.has('secondPost') ? 1 : 0) + (o.has('thirdPost') ? 1 : 0);
    if (o.has('bankWorkshop')) {
      while (this.workshop.routes.length > routes) this.workshop.routes.pop();
    } else this.workshop.routes = [];
  }

  routeLimit() { return this.owned.has('bankWorkshop') ? 1 + (this.owned.has('secondPost') ? 1 : 0) + (this.owned.has('thirdPost') ? 1 : 0) : 0; }

  installChutes() {
    const all = [];
    this.sites.forEach((site, k) => {
      if (!site.open) { site.chuteCols = []; return; }
      if (!site.chuteCols.length) {
        const cols = this.creekFor(k).chuteColliders(k);
        for (const c of cols) { c.bcx = c.cx; c.bcz = c.cz; c.br = Math.hypot(c.h[0], c.h[2]) + BALL_R + 0.05; }
        site.chuteCols = cols;
      }
      all.push(...site.chuteCols);
    });
    this.chuteCols = all;
    this.rebuildExtra();
  }

  rebuildExtra() { this.phys.extra = [...(this.chuteCols || []), ...this.logCols()]; }

  // ------------------------------------------------------------------ manufacture
  makeItem(k, hand = false) {
    const site = this.sites[k];
    const item = { id: this.nextId++, spec: this.specFor(k), recipe: site.recipe, site: k, made: this.t };
    if (site.owned.has('ncnStamp')) { item.ncn = ++this.ncnSerial; item.batch = site.ncnBatch; site.ncnMade++; }
    if (site.owned.has('replicaJig') && site.replica) item.replica = site.replica;
    if (site.owned.has('shapeGauge') && site.gauge) item.gauged = true;
    site.madeBy[item.recipe]++;
    site.stats.made++;
    this.stats.made++;
    if (hand) this.events.push({ type: 'handMade', site: k });
    return item;
  }

  manualRoll(k = this.sel) {
    const site = this.sites[k];
    if (!site || !site.open) return 'closed';
    if (site.manualCD > 0) return 'cooldown';
    const item = site.hopper.length ? site.hopper.shift() : site.post.length ? site.post.shift() : this.makeItem(k, true);
    this.launch(k, item, true);
    site.manualCD = MANUAL_COOLDOWN;
    return 'ok';
  }

  setRecipe(k, r) {
    const site = this.sites[k];
    if (!this.recipeAvailable(r) || site.recipe === r) return false;
    site.recipe = r;
    site.changeT = this.siteNumbers(k).changeover;
    this.events.push({ type: 'recipe', site: k, recipe: r });
    return true;
  }

  // ------------------------------------------------------------------ launching
  /** Channel a site launches into (Crawfish Springs launches into its runoff stream). */
  creekFor(k) { return STARTS[k].cr && this.springs ? this.springs : this.creek; }

  launch(k, item, manual = false) {
    const cr = this.creekFor(k);
    const ch = cr.chuteFor(k);
    const site = this.sites[k];
    const b = makeBall(item.id, item.spec, (item.id * 2654435761) ^ this.launchSeed);
    const [x0, y0, z0] = ch.R0, [x1, y1, z1] = ch.M;
    let dx = x1 - x0, dy = y1 - y0, dz = z1 - z0;
    const l = Math.hypot(dx, dy, dz); dx /= l; dy /= l; dz /= l;
    const hx = Math.hypot(dx, dz);
    const ux = (-dx * dy) / hx, uy = hx, uz = (-dz * dy) / hx;
    b.x = x0 + dx * 0.05 + ux * (BALL_R + 0.002);
    b.y = y0 + dy * 0.05 + uy * (BALL_R + 0.002);
    b.z = z0 + dz * 0.05 + uz * (BALL_R + 0.002);
    b.recipe = item.recipe || 0;
    b.site = item.site ?? k;
    b.ncn = item.ncn || 0; b.batch = item.batch || 0; b.replica = item.replica || null; b.gauged = !!item.gauged;
    let spread = site.owned.has('lowFriction') ? 0.07 : 0.22;
    if (item.spec & BF.SEAM) spread *= 0.25;
    if (b.recipe === RECIPE_INDEX.select) spread *= 0.3;
    if (b.gauged) spread *= 0.7;
    const v = 0.55 * (1 + spread * (ballRand(b) * 2 - 1));
    const aim = (item.spec & BF.SEAM ? 0.01 : 0.04) * (ballRand(b) * 2 - 1);
    const sx = -dz / hx, sz = dx / hx;
    b.vx = dx * v + sx * aim; b.vy = dy * v; b.vz = dz * v + sz * aim;
    b.start = k;
    b.payout = this.payoutFor(k, item.spec, b.recipe);
    b.cps = checkpointsFor(k);
    b.cpi = 0;
    b.cpT = [];
    b.launchT = this.t;
    this.reserveOrder(b);
    b.cr = cr === this.creek ? 0 : 1;
    const L = cr.locate(b.x, b.z, -1, {});
    b.hint = L.idx; b.s = L.s; b.d = L.d; b.prevS = L.s; b.maxS = L.s;
    this.phys.balls.push(b);
    site.lastLaunch = { id: item.id, t: this.t, x: b.x, y: b.y, z: b.z };
    site.stats.launched++;
    this.stats.launched++;
    this.events.push({ type: 'launch', id: item.id, manual, spec: item.spec, k, recipe: b.recipe });
    return b;
  }

  chuteClear(k) {
    const site = this.sites[k];
    const ll = site.lastLaunch;
    if (!ll) return true;
    const b = this.phys.balls.find((q) => q.id === ll.id);
    const dt = this.t - ll.t;
    if (!b || b.state !== 'roll') return dt > 0.2;
    const dist = Math.hypot(b.x - ll.x, b.y - ll.y, b.z - ll.z);
    if (site.owned.has('spacingSensor')) return dist >= 0.3 && dt >= 0.2;
    return (dt >= 1.25 && dist >= 1.0) || dt > 4;
  }

  /** Why site k may not release right now ('' when it may). Machines run flat out: nothing in
   *  the creek holds them back. Only a large safety limit on balls in the creek remains. */
  admission(k) {
    void k;
    if (this.ballsRolling() >= this.ballBudget) return 'Creek safety limit reached';
    return '';
  }

  /** Safe number of balls in flight on reach r (some fixes raise it). */
  reachCap(r) { const R = REACHES[r]; return R.capStock && !this.owned.has(R.capFix) ? R.capStock : R.cap; }

  // TUNING: safety limit on balls in the creek (far balls are streamed, so this is large); the
  // Route Split Gate's balanced alternation is 1.4 s (updateGates); carts move at 1.6 m/s with a
  // 4 s lift (1.5 s with Fast Lift).
  get ballBudget() { return this.settings.ballBudget || 20000; }

  // ------------------------------------------------------------------ simulation
  update(dt) {
    this.acc += Math.min(dt, 0.25);
    let steps = 0;
    while (this.acc >= PHYS_DT && steps < 30) {
      this.tick(PHYS_DT);
      this.acc -= PHYS_DT;
      steps++;
    }
    if (steps >= 30) this.acc = 0;
    return steps;
  }

  tick(h) {
    this.t += h;
    if (this.sessionStart === undefined) this.sessionStart = this.t - h;
    const auto = this.settings.auto;
    const fin = this.finish;
    const queue = this.queueCount();
    this.status = this.status || {};
    this.status.creek = queue >= 2 ? 'Creek backed up' : '';

    // ---- reach occupancy, used for backpressure and the flow monitor
    if (((this.t / h) | 0) % 6 === 0) this.updateReaches();

    // ---- every open factory runs on its own clock
    let waiting = null;
    for (let k = 0; k < this.sites.length; k++) {
      const site = this.sites[k];
      if (!site.open) continue;
      site.manualCD = Math.max(0, site.manualCD - h);
      const N = this.siteNumbers(k);
      // press
      site.status = '';
      if (site.owned.has('press')) {
        if (!auto || !site.enabled.press) site.pressStatus = 'Paused';
        else if (site.changeT > 0) { site.changeT -= h; site.pressStatus = 'Changing recipe'; }
        else if (site.hopper.length >= N.hopper) { site.pressStatus = 'Press waiting'; site.pressProg = Math.min(site.pressProg, 1); }
        else {
          site.pressStatus = '';
          const cycle = N.cycle * (site.recipe === RECIPE_INDEX.select ? 1.15 : 1);
          site.pressProg += h / cycle;
          if (site.pressProg >= 1) {
            site.pressProg -= 1;
            site.pressCount++;
            if (site.owned.has('shapeGauge') && site.gauge && ballRand(this.gaugeRng) < (site.owned.has('cores') ? 0.03 : 0.07)) {
              site.stats.rejected++; this.stats.rejected++;
              this.events.push({ type: 'gaugeReject', site: k });
            } else {
              site.hopper.push(this.makeItem(k));
              this.events.push({ type: 'pressed', head: site.pressCount % 2, site: k });
              this.advanceBatch(k);
            }
          }
        }
      } else site.pressStatus = '';
      // feeder
      site.feederStatus = '';
      if (site.owned.has('feeder')) {
        let interval = N.feeder;
        if (site.gap > 0) interval = Math.max(N.feeder, site.gap);
        else if (this.owned.has('autoGap')) interval = N.feeder * site.autoGapK;
        if (queue >= 2) interval *= 1 + queue * 0.5;
        site.feederT += h;
        if (!auto || !site.enabled.feeder) site.feederStatus = 'Paused';
        else if (!site.enabled.release) site.feederStatus = 'Releases off';
        else if (site.feederT >= interval) {
          if (!site.hopper.length && !site.post.length) site.feederStatus = 'Hopper empty';
          else if (!this.chuteClear(k)) site.feederStatus = '';
          else {
            const why = this.admission(k);
            if (why) {
              site.feederStatus = why; site.waitT += h;
              if (!waiting || site.waitT > waiting.waitT) waiting = site;
            } else {
              const item = site.hopper.length ? site.hopper.shift() : site.post.shift();
              this.launch(k, item);
              site.feederT = 0; site.waitT = 0;
            }
          }
        }
        if (site.feederT > interval * 3) site.feederT = interval * 3;
      }
      site.reason = this.siteReason(k);
    }
    void waiting;
    // legacy status mirrors for the selected site
    this.status.press = this.site.pressStatus || '';
    this.status.feeder = this.site.feederStatus || '';
    for (const k of ['press', 'feeder', 'creek']) if (this.status[k]) this.seenStatus[this.status[k]] = this.t;

    // ---- dynamic obstacles, gates, sweepers, carts
    this.updateLogs(h);
    this.updateGates(h);
    this.updateSweepers(h);
    this.updateWorkshop(h);

    // ---- physics
    this.phys.step(h);
    this.updateStream(h);
    for (const e of this.phys.events) this.events.push(e);
    this.phys.events.length = 0;

    // ---- ball bookkeeping
    this.trackBalls(h);

    // ---- finish basket, overflow crate
    if (this.basket.length) {
      this.drainT += h;
      if (this.drainT >= fin.drain) {
        this.drainT = 0;
        const it = this.basket.shift();
        this.stats.completed++;
        if (this.owned.has('conveyor')) this.crate++;
        if (this.owned.has('stacker')) this.crates[it.recipe || 0]++;
        this.events.push({ type: 'drain', recipe: it.recipe || 0 });
      }
    } else this.drainT = 0;
    while (this.basket.length < fin.basketCap) {
      let first = null;
      for (const b of this.phys.balls) if (b.state === 'queue' && (!first || b.qT < first.qT)) first = b;
      if (first) { this.toBasket(first); continue; }
      if (this.overflow > 0) { this.overflow--; this.basket.push({ recipe: 0, spec: 0 }); continue; }
      break;
    }
    if (this.owned.has('stacker')) for (let r = 0; r < 6; r++) if (this.crates[r] >= 24) { this.crates[r] = 0; this.events.push({ type: 'crateOut', recipe: r }); }

    // ---- measurements and housekeeping
    while (this.recent.length && this.t - this.recent[0][0] > 300) this.recent.shift();
    while (this.finishTimes.length && this.t - this.finishTimes[0] > 120) this.finishTimes.shift();
    while (this.lossLog.length && this.t - this.lossLog[0][0] > 240) this.lossLog.shift();
    while (this.stallLog.length && this.t - this.stallLog[0][0] > 240) this.stallLog.shift();
    if (this.t - (this.sessionStart ?? 0) > 120) {
      const c2 = this.cashPerMin(120);
      if (c2 > this.bestCpm) { this.bestCpm = c2; this.records.bestCpm = c2; }
    }
    this.updateTrial();
    this.updateBench();
    if (this.owned.has('autoGap') && ((this.t / h) | 0) % 60 === 0) this.tuneGaps();
  }

  get gaugeRng() { if (!this._grng) this._grng = { rs: 777 }; return this._grng; }

  advanceBatch(k) {
    if (!this.owned.has('batchScheduler')) return;
    const site = this.sites[k];
    const head = site.batch[0];
    if (!head) return;
    if (head.recipe === site.recipe) head.made++;
    if (head.made >= head.count) {
      site.batch.shift();
      const next = site.batch[0];
      if (next) this.setRecipe(k, next.recipe);
    } else if (head.recipe !== site.recipe && site.changeT <= 0) this.setRecipe(k, head.recipe);
  }

  queueBatch(k, recipe, count) {
    const site = this.sites[k];
    if (!this.owned.has('batchScheduler') || site.batch.length >= 3 || !this.recipeAvailable(recipe)) return false;
    site.batch.push({ recipe, count: Math.max(1, count | 0), made: 0 });
    if (site.batch.length === 1 && site.recipe !== recipe) this.setRecipe(k, recipe);
    return true;
  }

  siteReason(k) {
    const site = this.sites[k];
    if (!site.owned.has('press') && !site.owned.has('feeder')) return 'Hand-rolled only: buy an Auto Press here';
    if (site.pressStatus === 'Paused' && site.feederStatus === 'Paused') return 'Paused';
    if (site.feederStatus && site.feederStatus !== 'Paused') {
      if (site.feederStatus === 'Hopper empty') return site.changeT > 0 ? 'Changing recipe: hopper empty meanwhile' : 'Hopper empty: the press is slower than the feeder';
      return site.feederStatus;
    }
    if (site.pressStatus === 'Press waiting') return site.owned.has('feeder') ? 'Press waiting: the feeder limits launches' : 'Press waiting: hopper full, no feeder';
    if (site.pressStatus) return site.pressStatus;
    return '';
  }

  updateReaches() {
    const n = REACHES.length;
    const counts = new Array(n).fill(0);
    for (const b of this.phys.balls) if (b.state === 'roll' && !b.paid) counts[b.cr ? SPRINGS_REACH : reachAt(b.s)]++;
    for (let r = 0; r < n; r++) {
      const R = this.reachStats[r];
      R.count = counts[r];
      R.congested = counts[r] >= this.reachCap(r) * 0.85;
    }
  }

  tuneGaps() {
    for (let k = 0; k < this.sites.length; k++) {
      const site = this.sites[k];
      if (!site.open || site.gap > 0) continue;
      let worst = 0;
      for (const r of reachChain(k)) worst = Math.max(worst, this.reachStats[r].count / this.reachCap(r));
      const want = worst > 0.85 ? 1.6 : worst > 0.6 ? 1.2 : 1;
      site.autoGapK += (want - site.autoGapK) * 0.5;
    }
  }

  trackBalls(h) {
    const main = this.creek;
    const balls = this.phys.balls;
    const fin = this.finish;
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      if (b.state === 'queue') continue;
      if (b.state !== 'roll') { balls.splice(i, 1); continue; }
      const s = b.s, d = b.d;
      const cr = main;
      if (b.cr) {
        // on the Springs runoff stream: the physics hands the ball to the creek at the confluence
        if (!b.stream) this.trackStall(b, h, this.springs, i);
        continue;
      }
      // checkpoints (either lane of a fork is legal)
      while (b.cpi < b.cps.length && s >= b.cps[b.cpi]) {
        if (cr.inChannel(b.cps[b.cpi], d, 0.4)) { if (b.cpT) b.cpT.push([b.cps[b.cpi], this.t]); b.cpi++; this.events.push({ type: 'checkpoint', id: b.id }); }
        else { b.missed = true; b.cpi++; }
      }
      if (s > b.maxS) b.maxS = s;
      // Folk Draft catch log: an airborne ball dropping off the Shelf
      if (b.prevS < 328.45 && s >= 328.45 && b.y > cr.y0(329) + 0.4) this.stats.draftCatch++;
      // finish gate
      if (!b.paid && b.prevS < S_FINISH && s >= S_FINISH) {
        const legal = cr.inChannel(S_FINISH, d, 0.06) && b.cpi >= b.cps.length && !b.missed;
        if (legal) this.pay(b);
      }
      b.prevS = s;
      // into the basket (or the overflow crate, or a queue in the channel)
      if (s >= S_BASKET - 0.2) {
        if (!b.paid) { this.lose(b, 'missed the gate', i); continue; }
        if (this.basket.length < fin.basketCap && !this.queueCount()) { this.toBasket(b); continue; }
        if (this.overflow < fin.overflow) { this.overflow++; b.state = 'done'; balls.splice(i, 1); this.events.push({ type: 'overflowIn' }); continue; }
        this.handCollect(b, i);
        continue;
      }
      if (b.paid || b.stream) continue;
      this.trackStall(b, h, cr, i);
    }
  }

  /** Stall nudges and loss rules for an unpaid ball on channel cr. */
  trackStall(b, h, cr, i) {
      const s = b.s, d = b.d;
      // stall handling: a ball is stalled when it stops making downstream progress
      const inWater = b.sub > 0;
      if (b.progS === undefined) b.progS = s;
      if (s > b.progS + 0.08) { b.progS = s; if (b.stallT > 4) this.stallLog.push([this.t, s, b.stallT, b.cr || 0]); b.stallT = 0; } else b.stallT += h;
      const circling = b.speedAvg > 0.06;
      const every = circling ? 5 : 2;
      if (b.stallT > (circling ? 6 : 3) && inWater && Math.floor(b.stallT / every) !== Math.floor((b.stallT - h) / every)) {
        const fr = cr.frame(s);
        const push = (circling ? 0.15 : 0.25) + ballRand(b) * 0.25;
        const side = (ballRand(b) - 0.5) * 0.5;
        b.vx += fr.tx * push + fr.nx * side; b.vz += fr.tz * push + fr.nz * side; b.vy += 0.15;
        this.events.push({ type: 'surge', x: b.x, y: b.y, z: b.z });
      }
      const ch = cr.channelOf(s, d, 0);
      let off = 0;
      if (!ch) {
        const c = cr.c(s);
        const w = d < c ? cr.wL(s) : cr.wR(s);
        off = Math.abs(d - c) - w;
        const a = cr.alt;
        if (s > a.s0 && s < a.s1) off = Math.min(off, Math.abs(d - cr.altD(s)) - a.w);
      }
      let reason = null;
      if (s < cr.sMin + 0.5 || (!b.cr && s > cr.sMax - 0.5) || Math.abs(d) > 9.5) reason = 'left the creek';
      else if (b.y < cr.bedH(s, d) - 0.25) reason = 'left the creek';
      else if (off > 0.5 && b.stallT > 3) reason = 'escaped onto the bank';
      else if (b.stallT > (inWater ? 22 : 8)) reason = b.speedAvg > 0.05 ? 'stuck in an eddy' : 'wedged';
      else if (b.age > Math.max(40, this.etaFor(b.start) * 3.2)) reason = 'took too long';
      if (reason) this.lose(b, reason, i);
  }

  pay(b) {
    b.paid = true;
    this.cash += b.payout;
    this.stats.paid += b.payout;
    this.stats.finished++;
    const site = this.sites[b.start];
    site.stats.finished++;
    site.stats.revenue += b.payout;
    if (b.ncn && this.sites[b.site]) this.sites[b.site].ncnFinished++;
    this.recent.push([this.t, b.payout]);
    this.finishTimes.push(this.t);
    const time = this.t - b.launchT;
    const rs = this.routeStats[b.start];
    rs.n++; rs.last = time;
    rs.avg = rs.n === 1 ? time : rs.avg + (time - rs.avg) * (rs.n < 10 ? 1 / rs.n : 0.1);
    if (!rs.best || time < rs.best) rs.best = time;
    this.records.finishesByRecipe[b.recipe || 0]++;
    // split times between checkpoints
    if (b.cpT && b.cpT.length) {
      let prevT = b.launchT, prevS = STARTS[b.start].s;
      const parts = [];
      for (const [cs, ct] of b.cpT) { parts.push({ s0: prevS, s1: cs, t: ct - prevT }); prevT = ct; prevS = cs; }
      parts.push({ s0: prevS, s1: S_FINISH, t: this.t - prevT });
      this.splits.push({ id: b.id, start: b.start, parts, total: time, t: this.t });
      if (this.splits.length > 40) this.splits.shift();
    }
    // orders: the bonus was reserved at launch and is already part of the payout
    if (b.orderId) {
      const o = this.findOrder(b.orderId);
      if (o) {
        o.reserved = Math.max(0, o.reserved - 1); o.paid++; o.earned += b.orderBonus;
        if (o.twoPosts) { o.perPost[b.start] = (o.perPost[b.start] || 0) + 1; o.perPostRes[b.start] = Math.max(0, (o.perPostRes[b.start] || 0) - 1); }
        if (o === this.order && o.paid >= o.target) this.completeOrder();
      }
    }
    const lane = this.creek.c(S_FINISH) > b.d ? 0 : 1;
    this.laneLast[lane] = { t: this.t, time };
    this.lastFinish = { time, start: b.start, t: this.t, amount: b.payout };
    if (b.start === SITE_INDEX.flatrocks && !this.gorgeFinished) { this.gorgeFinished = true; this.records.gorgeFirst = this.t; this.events.push({ type: 'milestone', what: 'flatrocks' }); }
    if (b.start === SITE_INDEX.farlands && !this.records.headFirst) { this.records.headFirst = this.t; this.events.push({ type: 'milestone', what: 'farlands' }); }
    this.events.push({ type: 'finish', id: b.id, amount: b.payout, time, start: b.start, recipe: b.recipe, x: b.x, y: b.y, z: b.z, lane });
  }

  lose(b, reason, i) {
    b.state = 'lost';
    this.stats.lost++;
    this.sites[b.start].stats.lost++;
    let spot = 'other';
    const sp0 = spotAt(b.s, b.cr || 0); if (sp0) spot = sp0.id;
    this.lossBySpot[spot] = (this.lossBySpot[spot] || 0) + 1;
    this.lossLog.push([this.t, spot]);
    if (b.orderId) { const o = this.findOrder(b.orderId); if (o) { o.reserved = Math.max(0, o.reserved - 1); if (o.twoPosts) o.perPostRes[b.start] = Math.max(0, (o.perPostRes[b.start] || 0) - 1); } }
    // a production loss is a simulated factory outcome only; it never touches the archive
    this.events.push({ type: 'lost', id: b.id, reason, x: b.x, y: b.y, z: b.z, spot, start: b.start });
    this.phys.balls.splice(i, 1);
  }

  /** Basket and overflow crate full: the crew lifts the ball out by hand and it counts as done. */
  handCollect(b, i) {
    b.state = 'done';
    this.phys.balls.splice(i, 1);
    this.stats.completed++;
    this.stats.handCollected = (this.stats.handCollected || 0) + 1;
    if (this.owned.has('conveyor')) this.crate++;
    if (this.owned.has('stacker')) this.crates[b.recipe || 0]++;
    this.events.push({ type: 'drain', recipe: b.recipe || 0 });
  }

  // ------------------------------------------------------------------ streamed balls
  // Balls far from the player (and from the camera) roll along the creek on a cheap streamed path
  // instead of the full physics, so every factory can run flat out. A streamed ball follows the
  // surface current near mid-channel and takes each trouble spot's odds (loss and hold-up, smaller
  // with the fix) instead of simulating it. Close to a focus point it becomes a real ball again.
  // TUNING: NEAR 30 m materialises, FAR 40 m streams, updates run at 20 Hz.
  static STREAM_NEAR = 30;
  static STREAM_FAR = 40;

  streamSpeedTable(cr) {
    if (cr._streamV) return cr._streamV;
    const n = Math.ceil(cr.sMax - cr.sMin) + 2, v = new Float32Array(n), fr = {}, fl = {};
    for (let i = 0; i < n; i++) {
      const s = Math.min(cr.sMax, cr.sMin + i), c = cr.c(s);
      cr.frame(s, fr);
      const wl = cr.waterLevel(s, c);
      const y = wl > -1e8 ? wl - 0.01 : cr.y0(s);
      const f = cr.flowAt(s, c, y, 0, fr.tx, fr.tz, fl);
      v[i] = Math.min(2.2, Math.max(0.3, Math.hypot(f.vx, f.vz) * 0.8));
    }
    cr._streamV = v;
    return v;
  }

  nearFocus(x, z, R) {
    const F = this.focus;
    if (!F) return true;
    for (const p of F) { const dx = x - p.x, dz = z - p.z; if (dx * dx + dz * dz < R * R) return true; }
    return false;
  }

  updateStream(h) {
    if (!this.streamOn) return;
    this.streamAcc = (this.streamAcc || 0) + h;
    if (this.streamAcc < 0.05) return;
    const dt = this.streamAcc; this.streamAcc = 0;
    const balls = this.phys.balls, main = this.creek, owned = this.owned;
    const NEAR = Game.STREAM_NEAR, FAR = Game.STREAM_FAR;
    const p = {}, fr = {};
    let n = 0;
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      if (b.state !== 'roll') continue;
      const followed = b.id === this.followId;
      if (!b.stream) {
        // a real ball far from every focus point starts streaming
        if (followed || b.airT > 0.2 || this.nearFocus(b.x, b.z, FAR)) continue;
        const cr = b.cr ? this.springs : main;
        b.stream = true; b.hold = 0;
        const c = cr.c(b.s), w = Math.min(cr.wL(b.s), cr.wR(b.s));
        b.dRel = (ballRand(b) - 0.5) * w * 0.6;
        void c;
      }
      n++;
      let cr = b.cr ? this.springs : main;
      if (b.hold > 0) b.hold -= dt;
      else {
        const V = this.streamSpeedTable(cr);
        const s0 = b.s;
        let s = s0 + V[Math.max(0, Math.min(V.length - 1, Math.round(s0 - cr.sMin)))] * dt;
        // trouble spots crossed on this tick: odds instead of simulation
        for (const sp of TROUBLE_SPOTS) {
          if ((sp.cr ? 1 : 0) !== (b.cr ? 1 : 0) || !sp.loss || !(s0 < sp.s0 + 0.01 && s >= sp.s0 + 0.01)) continue;
          const fixed = owned.has(sp.fix) || (sp.also || []).some((u) => owned.has(u));
          const k = fixed ? 1 : 0;
          if (ballRand(b) < sp.loss[k]) {
            b.s = (sp.s0 + sp.s1) / 2;
            cr.worldXZ(b.s, cr.c(b.s), p); b.x = p.x; b.z = p.z;
            this.stats.streamLost = (this.stats.streamLost || 0) + 1;
            this.lose(b, /pool|eddy|pocket/.test(sp.label) ? 'stuck in an eddy' : 'wedged', i);
            s = NaN;
            break;
          }
          b.hold = sp.delay[k] * (0.4 + 1.2 * ballRand(b));
          s = sp.s0 + 0.02;
          break;
        }
        if (s !== s) continue; // lost
        b.s = s;
        // Crawfish Springs hands its balls to the creek through the gully
        if (b.cr && s > cr.sMax - 0.6) {
          cr.worldXZ(cr.sMax - 0.6, cr.c(cr.sMax - 0.6), p);
          const L = main.locate(p.x, p.z, -1, {});
          b.cr = 0; cr = main;
          b.s = L.s; b.d = L.d; b.prevS = L.s; b.maxS = L.s; b.progS = L.s; b.hint = L.idx;
          this.events.push({ type: 'joined', id: b.id });
        }
      }
      const s = Math.min(b.s, cr.sMax - 0.05);
      const target = cr.c(s) + b.dRel;
      b.d += (target - b.d) * Math.min(1, dt * 1.2);
      cr.worldXZ(s, b.d, p);
      cr.frame(s, fr);
      const v = b.hold > 0 ? 0 : this.streamSpeedTable(cr)[Math.max(0, Math.round(s - cr.sMin))];
      b.vx = fr.tx * v; b.vz = fr.tz * v; b.vy = 0;
      b.x = p.x; b.z = p.z;
      const wl = cr.waterLevel(s, b.d), bed = cr.bedH(s, b.d) + BALL_R;
      b.y = wl > bed - BALL_R * 0.5 ? Math.max(bed, wl - BALL_R * 0.35) : bed;
      b.age += dt; b.speedAvg = v; b.stallT = 0; b.progS = b.s; b.sub = wl > b.y - BALL_R ? 0.01 : 0;
      // close to a focus point (or followed): become a real ball again
      if (b.hold <= 0 && (followed || this.nearFocus(b.x, b.z, NEAR))) {
        b.stream = false; b.hint = -1; b.airT = 0; b.ground = false;
        b.vx *= 0.8; b.vz *= 0.8;
        n--;
      }
    }
    this.streamCount = n;
  }

  toBasket(b) {
    this.basket.push({ recipe: b.recipe || 0, spec: b.spec });
    b.state = 'done';
    const i = this.phys.balls.indexOf(b);
    if (i >= 0) this.phys.balls.splice(i, 1);
    this.events.push({ type: 'basketIn', id: b.id });
    this.placeQueue();
  }

  placeQueue() {
    const q = this.phys.balls.filter((b) => b.state === 'queue').sort((a, b) => a.qT - b.qT);
    const cr = this.creek;
    q.forEach((b, i) => {
      const s = S_BASKET - 0.22 - i * 0.072;
      const p = cr.worldXZ(s, cr.c(s));
      b.x = p.x; b.z = p.z; b.y = cr.y0(s) + BALL_R * 0.3;
      b.vx = b.vy = b.vz = 0; b.wx = b.wy = b.wz = 0;
      b.s = s; b.qi = i;
    });
  }

  // ------------------------------------------------------------------ orders
  orderOpen(o) { return this.isOpen(o.opens); }
  findOrder(id) { if (this.order && this.order.uid === id) return this.order; return this.orderLog.find((o) => o.uid === id) || null; }

  acceptOrder(id, posts = null) {
    if (this.order) return false;
    const def = ORDERS.find((o) => o.id === id);
    if (!def || !this.orderOpen(def)) return false;
    if (def.twoPosts && (!posts || posts.length !== 2 || posts[0] === posts[1])) return false;
    this.order = { uid: this.orderSeq++, id, target: def.target, bonus: def.bonus, paid: 0, reserved: 0, earned: 0, accepted: this.t, posts, perPost: {}, perPostRes: {}, twoPosts: !!def.twoPosts };
    this.events.push({ type: 'orderAccepted', id });
    return true;
  }

  cancelOrder() {
    if (!this.order) return false;
    const o = this.order;
    o.cancelled = this.t;
    this.orderLog.push(o);
    this.order = null;
    this.events.push({ type: 'orderCancelled', id: o.id });
    return true;
  }

  completeOrder() {
    const o = this.order;
    o.done = this.t;
    this.orderLog.push(o);
    this.order = null;
    this.events.push({ type: 'orderDone', id: o.id, earned: o.earned, paid: o.paid });
  }

  orderQualifies(o, k, recipe) {
    const def = ORDERS.find((x) => x.id === o.id);
    if (def.recipe && RECIPES[recipe].id !== def.recipe) return false;
    if (def.onlySite && STARTS[k].id !== def.onlySite) return false;
    if (def.minSite && STARTS[k].s > STARTS[SITE_INDEX[def.minSite]].s + 0.01) return false;
    if (def.twoPosts) {
      if (!o.posts || !o.posts.includes(k)) return false;
      const used = (o.perPost[k] || 0) + (o.perPostRes[k] || 0);
      if (used >= def.perPostCap) return false;
    }
    return true;
  }

  /** Reserve a paid order slot for a qualifying ball as it launches. */
  reserveOrder(b) {
    const o = this.order;
    if (!o) return;
    if (o.paid + o.reserved >= o.target) return;
    if (!this.orderQualifies(o, b.start, b.recipe)) return;
    o.reserved++;
    if (o.twoPosts) o.perPostRes[b.start] = (o.perPostRes[b.start] || 0) + 1;
    b.orderId = o.uid;
    b.orderBonus = o.bonus;
    b.payout += o.bonus;
  }

  // ------------------------------------------------------------------ driftwood in the Springs pool
  logCols() {
    return this.logs.map((L) => ({ type: 1, ax: L.ax, ay: L.y, az: L.az, bx: L.bx, by: L.y, bz: L.bz, r: 0.032, mat: MAT.WOOD, bcx: L.x, bcz: L.z, br: 0.45, off: false, vx: L.vx || 0, vy: 0, vz: L.vz || 0, log: L }));
  }

  updateLogs(h) {
    const cr = this.springs;
    if (!cr) return;
    const screened = this.owned.has('debrisScreen');
    this.logs.forEach((L, i) => {
      L.ph += h * 0.055;
      let s, d, ang;
      if (screened) {
        s = 56.3 + i * 1.45 + Math.sin(this.t * 0.3 + i) * 0.03;
        d = cr.c(s) - 0.72 - (i % 2) * 0.08;
        ang = 0.15 * Math.sin(this.t * 0.2 + i * 2);
      } else {
        const a = L.ph;
        s = 58.2 + 2.1 * Math.cos(a);
        d = cr.c(s) + 0.05 + 0.62 * Math.sin(a);
        ang = a + Math.PI / 2 + 0.4 * Math.sin(this.t * 0.25 + i);
      }
      const p = cr.worldXZ(s, d);
      const fr = cr.frame(s);
      const y = cr.y0(s) + 0.005;
      const ca = Math.cos(ang), sa = Math.sin(ang);
      const dx = (fr.tx * ca + fr.nx * sa) * 0.27, dz = (fr.tz * ca + fr.nz * sa) * 0.27;
      L.vx = (p.x - L.x) / h; L.vz = (p.z - L.z) / h;
      if (!isFinite(L.vx) || Math.abs(L.vx) > 2) { L.vx = 0; L.vz = 0; }
      L.x = p.x; L.y = y; L.z = p.z; L.ax = p.x - dx; L.az = p.z - dz; L.bx = p.x + dx; L.bz = p.z + dz; L.ang = Math.atan2(dz, dx);
    });
    for (const c of this.phys.extra) {
      if (!c.log) continue;
      const L = c.log;
      c.ax = L.ax; c.ay = L.y; c.az = L.az; c.bx = L.bx; c.by = L.y; c.bz = L.bz; c.vx = L.vx; c.vz = L.vz;
      c.bcx = L.x; c.bcz = L.z;
    }
  }

  // ------------------------------------------------------------------ gates and sweepers
  updateGates(h) {
    const P = this.phys;
    const gate = this.owned.has('splitGate') ? this.splitGate : 'none';
    this.gatePhase += h;
    const balancedSide = Math.floor(this.gatePhase / 1.4) % 2 === 0;
    P.setGroup('gateDirect', gate === 'direct' || (gate === 'balanced' && balancedSide));
    P.setGroup('gateCalm', gate === 'calm' || (gate === 'balanced' && !balancedSide));
  }

  updateSweepers(h) {
    SWEEPERS.forEach((S, i) => {
      const cr = S.cr ? this.springs : this.creek, scr = S.cr ? 1 : 0;
      if (!cr) return;
      const A = this.sweep[i];
      A.cd = Math.max(0, A.cd - h);
      if (A.phase > 0) {
        const prev = A.phase;
        A.phase += h / 1.1;
        if (prev < 0.5 && A.phase >= 0.5) {
          for (const b of this.phys.balls) {
            if (b.state !== 'roll' || b.stream || b.paid || (b.cr || 0) !== scr || b.s < S.s0 || b.s > S.s1 || b.stallT < 1.5) continue;
            const s = b.s;
            // back into the same lane, at the same place: no skipped checkpoints
            const ch = cr.channelOf(s, b.d, 0.3);
            let d = cr.c(s);
            if (ch === 'alt') d = cr.altD(s);
            else if (S.id === 'arm') d += s > 62.2 ? 0 : 0.1;
            const p = cr.worldXZ(s, d);
            b.x = p.x; b.z = p.z; b.y = cr.waterLevel(s, d) + BALL_R * 0.25;
            if (!(b.y > -1e8)) b.y = cr.y0(s) + BALL_R * 0.25;
            const fr = cr.frame(s);
            b.vx = fr.tx * 0.35; b.vz = fr.tz * 0.35; b.vy = 0;
            b.stallT = 0; b.progS = s; b.speedAvg = 0.4; b.hint = -1;
            this.events.push({ type: 'armClear', id: b.id, x: b.x, y: b.y, z: b.z, sweeper: S.id });
          }
        }
        if (A.phase >= 1) { A.phase = 0; A.cd = 0.6; }
        return;
      }
      if (!this.owned.has(S.up) || A.cd > 0) return;
      for (const b of this.phys.balls) {
        if (b.state === 'roll' && !b.stream && !b.paid && (b.cr || 0) === scr && b.s >= S.s0 && b.s <= S.s1 && b.stallT > 2.2) {
          A.phase = 1e-6;
          this.events.push({ type: 'armSweep', sweeper: S.id });
          break;
        }
      }
    });
  }

  // ------------------------------------------------------------------ Bank Workshop logistics
  defaultRouteDest() {
    // the open site whose press is slowest relative to its feeder
    let best = null, bestGap = -Infinity;
    for (const k of this.openSites()) {
      const N = this.siteNumbers(k);
      const gap = this.sites[k].owned.has('feeder') ? N.cycle - N.feeder : -1;
      if (gap > bestGap) { bestGap = gap; best = k; }
    }
    return { dest: best ?? 0, enabled: true };
  }

  setRoute(i, dest) {
    const W = this.workshop;
    if (i >= this.routeLimit() || !this.sites[dest]?.open) return false;
    W.routes[i] = { dest, enabled: true };
    return true;
  }

  postCap(k) { return 8 + (this.owned.has('silos') ? 12 : 0); }
  cartCap() { return this.owned.has('doubleDeck') ? 12 : 6; }
  cartSpeed() { return 1.6; }
  /** Bank distance and lift dwell between two s positions. */
  legTime(s0, s1) {
    const dist = Math.abs(s1 - s0) * 1.12 + 1.5;
    const dy = Math.abs(this.creek.y0(Math.max(S_MIN + 1, Math.min(S_MAX - 1, s0))) - this.creek.y0(Math.max(S_MIN + 1, Math.min(S_MAX - 1, s1))));
    const lift = dy > 2 ? (this.owned.has('fastLift') ? 1.5 : 4) : 0;
    return dist / this.cartSpeed() + lift;
  }

  /** What the next shipment on route i would be (shown before shipping). */
  planShipment(i) {
    const W = this.workshop;
    const r = W.routes[i];
    if (!r) return null;
    const dest = this.sites[r.dest];
    let src = null, bestSurplus = 0;
    for (const k of this.openSites()) {
      if (k === r.dest) continue;
      const s = this.sites[k];
      if (!s.owned.has('press')) continue;
      const N = this.siteNumbers(k);
      // surplus: what the site has beyond a small launch reserve, larger when its press is waiting
      const reserve = s.enabled.release && s.owned.has('feeder') ? Math.ceil(N.hopper * 0.4) : 0;
      const surplus = s.hopper.length - reserve;
      if (surplus > bestSurplus) { bestSurplus = surplus; src = k; }
    }
    const reservedIn = W.carts.filter((c) => c.dest === r.dest && c.state !== 'idle').reduce((a, c) => a + c.reserved, 0);
    const space = this.postCap(r.dest) - dest.post.length - reservedIn;
    const n = Math.min(this.cartCap(), Math.max(0, bestSurplus), Math.max(0, space));
    const sYard = WORKSHOP.s;
    const eta = src === null ? null : this.legTime(sYard, STARTS[src].s) + this.legTime(STARTS[src].s, STARTS[r.dest].s) + 4;
    return { src, dest: r.dest, n, space, eta };
  }

  updateWorkshop(h) {
    const W = this.workshop;
    if (!this.owned.has('bankWorkshop')) return;
    while (W.carts.length < W.routes.length) W.carts.push({ state: 'idle', route: W.carts.length, s: WORKSHOP.s, load: [], reserved: 0, t: 0, dur: 0, from: WORKSHOP.s, to: WORKSHOP.s, wait: 0 });
    W.carts.length = Math.min(W.carts.length, W.routes.length);
    // Priority Switch: keep a minimum share of shipments for one factory
    const pr = this.owned.has('prioritySwitch') ? W.priority : null;
    W.carts.forEach((cart, i) => {
      const route = W.routes[i];
      if (!route) return;
      if (cart.state === 'idle') {
        let plan = this.planShipment(i);
        if (pr && pr.site !== null && pr.site !== route.dest && this.sites[pr.site]?.open) {
          const total = Object.values(W.tripsTo).reduce((a, b) => a + b, 0) || 1;
          if ((W.tripsTo[pr.site] || 0) / total < pr.share) {
            const alt = this.planShipment(i);
            const saved = route.dest; route.dest = pr.site; plan = this.planShipment(i); route.dest = saved;
            if (!plan || plan.n < 2) plan = alt;
          }
        }
        if (!plan || plan.src === null || plan.n < 2) return;
        cart.src = plan.src; cart.dest = plan.dest; cart.reserved = plan.n;
        this.goCart(cart, STARTS[plan.src].s, 'toSource');
        return;
      }
      // a single-track bank segment at the yard: one cart at a time unless the Passing Loop is built
      const onSeg = (c) => c.state !== 'idle' && Math.abs(c.s - WORKSHOP.s) < 6;
      if (!this.owned.has('passingLoop') && cart.state.startsWith('to') && onSeg(cart)) {
        const other = W.carts.find((c) => c !== cart && onSeg(c) && c.t > cart.t);
        if (other && other.t < other.dur) { cart.wait += h; return; }
      }
      cart.t += h;
      const u = Math.min(1, cart.t / cart.dur);
      cart.s = cart.from + (cart.to - cart.from) * (u * u * (3 - 2 * u));
      if (u < 1) return;
      if (cart.state === 'toSource') {
        const src = this.sites[cart.src];
        const n = Math.min(cart.reserved, src.hopper.length);
        cart.load = src.hopper.splice(Math.max(0, src.hopper.length - n), n);
        src.stats.transferredOut += cart.load.length;
        cart.reserved = cart.load.length;
        this.events.push({ type: 'cartLoad', route: i, n: cart.load.length, site: cart.src });
        if (!cart.load.length) { cart.state = 'idle'; return; }
        this.goCart(cart, STARTS[cart.dest].s, 'toDest');
      } else if (cart.state === 'toDest') {
        const dest = this.sites[cart.dest];
        const space = this.postCap(cart.dest) - dest.post.length;
        const n = Math.min(space, cart.load.length);
        dest.post.push(...cart.load.splice(0, n));
        dest.stats.transferredIn += n;
        W.shipped += n;
        W.tripsTo[cart.dest] = (W.tripsTo[cart.dest] || 0) + 1;
        this.events.push({ type: 'cartUnload', route: i, n, site: cart.dest });
        if (cart.load.length) this.goCart(cart, STARTS[cart.src].s, 'returning'); // no room: take the rest home
        else { cart.reserved = 0; this.goCart(cart, WORKSHOP.s, 'toYard'); }
      } else if (cart.state === 'returning') {
        const src = this.sites[cart.src];
        src.stats.transferredOut -= cart.load.length; // the undelivered balls come home
        src.hopper.push(...cart.load.splice(0));
        cart.reserved = 0;
        this.goCart(cart, WORKSHOP.s, 'toYard');
      } else if (cart.state === 'toYard') {
        cart.state = 'idle';
      }
    });
  }

  goCart(cart, to, state) {
    cart.from = cart.s; cart.to = to; cart.t = 0; cart.state = state;
    cart.dur = this.legTime(cart.from, to) + (state === 'toSource' || state === 'toDest' ? 2 : 0);
  }

  // ------------------------------------------------------------------ measurement
  measureNow(window = 90) {
    let fin = 0, cash = 0;
    for (let i = this.recent.length - 1; i >= 0; i--) { const [t, a] = this.recent[i]; if (this.t - t > window) break; fin++; cash += a; }
    let lost = 0;
    for (let i = this.lossLog.length - 1; i >= 0; i--) { if (this.t - this.lossLog[i][0] > window) break; lost++; }
    const span = Math.min(window, Math.max(1, this.t - (this.sessionStart ?? 0)));
    let delay = 0, dn = 0;
    for (const s of this.splits) if (this.t - s.t < window) { delay += s.total - this.etaFor(s.start); dn++; }
    return { span, finishes: fin, cpm: (cash * 60) / span, bpm: (fin * 60) / span, escapeRate: fin + lost ? lost / (fin + lost) : 0, avgDelay: dn ? delay / dn : 0 };
  }

  updateTrial() {
    const T = this.trial;
    if (!T || T.after) return;
    const dt = this.t - T.t0;
    const fins = this.stats.finished - T.startFin;
    if ((dt >= 90 && fins >= 15) || dt >= 240) {
      const span = dt;
      const cash = this.stats.paid - T.startCash;
      const lost = this.stats.lost - T.startLost;
      T.after = { span, finishes: fins, cpm: (cash * 60) / span, bpm: (fins * 60) / span, escapeRate: fins + lost ? lost / (fins + lost) : 0 };
      this.events.push({ type: 'trialDone', id: T.id });
    }
  }

  startBenchWindow() {
    if (!this.owned.has('efficiencyBench') || this.bench.current) return false;
    this.bench.current = { t0: this.t, fin: this.stats.finished, cash: this.stats.paid, lost: this.stats.lost, delay: 0, n: 0, startSplits: this.splits.length ? this.splits[this.splits.length - 1].id : 0 };
    return true;
  }

  stopBenchWindow() {
    const c = this.bench.current;
    if (!c) return false;
    const span = Math.max(1, this.t - c.t0);
    const fin = this.stats.finished - c.fin, lost = this.stats.lost - c.lost;
    let delay = 0, n = 0;
    for (const s of this.splits) if (s.t >= c.t0) { delay += s.total - this.etaFor(s.start); n++; }
    this.bench.windows.push({ t0: c.t0, span, finishRate: (fin * 60) / span, escapeRate: fin + lost ? lost / (fin + lost) : 0, avgDelay: n ? delay / n : 0, cpm: ((this.stats.paid - c.cash) * 60) / span, site: this.sel });
    if (this.bench.windows.length > 2) this.bench.windows.shift();
    this.bench.current = null;
    return true;
  }

  updateBench() { /* windows are opened and closed by the player */ }

  // ------------------------------------------------------------------ presets
  savePreset(i) {
    if (!this.owned.has('routePresets') || i < 0 || i > 4) return false;
    this.presets[i] = {
      sites: this.sites.map((s) => ({ gap: s.gap, release: s.enabled.release })),
      priority: { ...this.workshop.priority },
      routes: this.workshop.routes.map((r) => ({ ...r })),
      gate: this.splitGate,
      saved: this.t,
    };
    return true;
  }

  presetDiff(i) {
    const p = this.presets[i];
    if (!p) return [];
    const out = [];
    p.sites.forEach((ps, k) => {
      const s = this.sites[k];
      if (!s.open) return;
      if (ps.gap !== s.gap) out.push(`${STARTS[k].name}: feeder gap ${s.gap ? s.gap.toFixed(2) + ' s' : 'auto'} → ${ps.gap ? ps.gap.toFixed(2) + ' s' : 'auto'}`);
      if (ps.release !== s.enabled.release) out.push(`${STARTS[k].name}: releases ${s.enabled.release ? 'on' : 'off'} → ${ps.release ? 'on' : 'off'}`);
    });
    if (this.owned.has('splitGate') && p.gate !== this.splitGate) out.push(`Route Split Gate: ${this.splitGate} → ${p.gate}`);
    if (this.owned.has('prioritySwitch') && (p.priority.site !== this.workshop.priority.site || p.priority.share !== this.workshop.priority.share)) out.push('Priority Switch target/share changes');
    p.routes.forEach((r, i) => { const cur = this.workshop.routes[i]; if (cur && r && cur.dest !== r.dest) out.push(`Supply route ${i + 1}: → ${STARTS[r.dest].name}`); });
    return out;
  }

  loadPreset(i) {
    const p = this.presets[i];
    if (!p || !this.owned.has('routePresets')) return false;
    p.sites.forEach((ps, k) => { const s = this.sites[k]; if (s.open) { s.gap = ps.gap; s.enabled.release = ps.release; } });
    if (this.owned.has('splitGate')) this.splitGate = p.gate;
    if (this.owned.has('prioritySwitch')) this.workshop.priority = { ...p.priority };
    p.routes.forEach((r, i) => { if (r && i < this.routeLimit() && this.sites[r.dest]?.open) this.workshop.routes[i] = { ...r }; });
    return true;
  }

  // ------------------------------------------------------------------ advice
  suggestions() {
    const out = {};
    const site = this.site;
    const firstMissing = (ids) => ids.find((id) => !this.has(id) && !this.blocked(id));
    const seen = (v) => (site.feederStatus === v || site.pressStatus === v || this.status.creek === v) || (this.seenStatus[v] !== undefined && this.t - this.seenStatus[v] < 12);
    if (seen('Hopper empty')) {
      const id = firstMissing(['quickMold', 'twinPress', 'servo', 'turbo', 'fastFelt', 'parallelFelt', 'continuousPress']);
      if (id) out[id] = 'This factory’s hopper keeps running empty';
    }
    if (seen('Press waiting')) {
      const id = !site.owned.has('feeder') ? 'feeder' : firstMissing(['lowFriction', 'indexed', 'spacingSensor', 'hopperExt', 'bulkHopper']);
      if (id) out[id] = 'This factory’s press is waiting on a full hopper';
    }
    if (seen('Creek backed up')) {
      const id = firstMissing(['wideBasket', 'conveyor', 'splitTray', 'poweredBelt', 'overflowCrate', 'twinPacking', 'industrialCatch']);
      if (id) out[id] = 'Balls are backing up at the finish';
    }
    const counts = {};
    for (const [, sp] of this.lossLog) counts[sp] = (counts[sp] || 0) + 1;
    const stalls = {};
    for (const [, s, , c] of this.stallLog) { const sp = spotAt(s, c || 0); if (sp) stalls[sp.id] = (stalls[sp.id] || 0) + 1; }
    for (const sp of TROUBLE_SPOTS) {
      if (this.has(sp.fix) || this.blocked(sp.fix)) continue;
      if ((counts[sp.id] || 0) >= 2) out[sp.fix] = `${counts[sp.id]} balls lost recently at ${sp.label}`;
      else if ((stalls[sp.id] || 0) >= 4) out[sp.fix] = `Balls keep stalling at ${sp.label}`;
    }
    const N = this.siteNumbers(this.sel);
    if (site.owned.has('feeder') && !site.owned.has('spacingSensor') && N.feeder < 1.25 && !this.blocked('spacingSensor')) out.spacingSensor = 'This feeder is faster than its landing buffer';
    if (N.press < N.felt && !site.owned.has('parallelFelt') && !this.blocked('fastFelt')) out[site.owned.has('fastFelt') ? 'parallelFelt' : 'fastFelt'] = 'Felt handling is slower than the press';
    return out;
  }

  /** The first active queue slowing the line, for Pressure Alerts. */
  pressureAlert() {
    if (this.queueCount() >= 2) return { kind: 'finish', text: `${this.queueCount()} paid balls queued at the finish basket`, s: S_FINISH };
    for (const k of this.openSites()) {
      const s = this.sites[k];
      if (s.feederStatus && s.feederStatus !== 'Paused' && s.feederStatus !== 'Releases off' && s.feederStatus !== 'Hopper empty') return { kind: 'site', k, text: `${STARTS[k].name}: ${s.feederStatus}`, s: STARTS[k].s };
    }
    return null;
  }

  // ------------------------------------------------------------------ save / load
  serialize() {
    const ser = (it) => ({ ...it });
    const balls = this.phys.balls.filter((b) => b.state === 'roll' || b.state === 'queue').map((b) => ({
      id: b.id, spec: b.spec, st: b.state, x: b.x, y: b.y, z: b.z, vx: b.vx, vy: b.vy, vz: b.vz,
      wx: b.wx, wy: b.wy, wz: b.wz, q: [b.qx, b.qy, b.qz, b.qw], k: STARTS[b.start].id, site: STARTS[b.site ?? b.start].id, rec: b.recipe || 0,
      pay: b.payout, cps: b.cps, cpi: b.cpi, cpT: b.cpT || [], paid: b.paid, missed: !!b.missed, wet: b.wet, age: b.age, lt: b.launchT,
      stall: b.stallT, rs: b.rs, ps: b.prevS, ms: b.maxS, qT: b.qT || 0, wob: b.wob, pg: b.progS, sa: b.speedAvg, sub: b.sub, qi: b.qi,
      ord: b.orderId || 0, ob: b.orderBonus || 0, ncn: b.ncn || 0, bat: b.batch || 0, rep: b.replica || null, gau: !!b.gauged, cr: b.cr || 0,
    }));
    return {
      v: SAVE_VERSION, geo: GEO_VERSION, savedAt: Date.now(), t: this.t, cash: this.cash, owned: [...this.owned], sel: STARTS[this.sel].id,
      sites: this.sites.map((s) => ({
        id: s.id, open: s.open, owned: [...s.owned], hopper: s.hopper.map(ser), post: s.post.map(ser), pressProg: s.pressProg, pressCount: s.pressCount,
        feederT: s.feederT, manualCD: s.manualCD, lastLaunch: s.lastLaunch, recipe: s.recipe, changeT: s.changeT, batch: s.batch, madeBy: s.madeBy,
        enabled: s.enabled, gap: s.gap, autoGapK: s.autoGapK, stats: s.stats, ncnBatch: s.ncnBatch, ncnMade: s.ncnMade, ncnFinished: s.ncnFinished,
        replica: s.replica, gauge: s.gauge,
      })),
      nextId: this.nextId, ncnSerial: this.ncnSerial, stats: this.stats, recent: this.recent.filter(([t]) => this.t - t < 300),
      basket: this.basket, overflow: this.overflow, drainT: this.drainT, crate: this.crate, crates: this.crates, settings: this.settings,
      sweep: this.sweep, acc: this.acc, physT: this.phys.t, routeStats: Object.fromEntries(STARTS.map((s, k) => [s.id, this.routeStats[k]])),
      records: this.records, bestCpm: this.bestCpm, gorgeFinished: this.gorgeFinished, lossBySpot: this.lossBySpot, finishTimes: this.finishTimes,
      lastFinish: this.lastFinish && { ...this.lastFinish, start: STARTS[this.lastFinish.start].id }, logs: this.logs.map((l) => l.ph),
      order: this.order, orderLog: this.orderLog.filter((o) => o.reserved > 0 || this.t - (o.done || o.cancelled || 0) < 1800).slice(-12), orderSeq: this.orderSeq,
      workshop: { routes: this.workshop.routes, carts: this.workshop.carts.map((c) => ({ ...c, load: c.load.map(ser) })), priority: this.workshop.priority, shipped: this.workshop.shipped, tripsTo: this.workshop.tripsTo },
      splitGate: this.splitGate, gatePhase: this.gatePhase, presets: this.presets, bench: this.bench, milestones: this.milestones,
      player: this.player, trial: this.trial,
      balls,
    };
  }

  load(d) {
    if (!d) return;
    if (d.v === 1) d = migrateV1(d);
    if (!d || d.v !== SAVE_VERSION) return;
    if (d.geo !== GEO_VERSION) d = renameSites(d);
    const idx = (id) => (SITE_INDEX[id] !== undefined ? SITE_INDEX[id] : 0);
    this.t = d.t || 0;
    this.cash = d.cash || 0;
    this.owned = new Set((d.owned || []).filter((id) => UPGRADE_BY_ID[id] && !isSiteUpgrade(id)));
    for (const sd of d.sites || []) {
      const k = SITE_INDEX[sd.id];
      if (k === undefined) continue;
      const s = this.sites[k];
      s.open = !!sd.open || k === 0;
      s.owned = new Set((sd.owned || []).filter((id) => UPGRADE_BY_ID[id] && isSiteUpgrade(id)));
      s.hopper = (sd.hopper || []).slice(0, 60);
      s.post = (sd.post || []).slice(0, 40);
      for (const it of [...s.hopper, ...s.post]) if (typeof it.site === 'string') it.site = idx(it.site);
      Object.assign(s, {
        pressProg: sd.pressProg || 0, pressCount: sd.pressCount || 0, feederT: sd.feederT || 0, manualCD: sd.manualCD || 0,
        lastLaunch: sd.lastLaunch || null, recipe: sd.recipe || 0, changeT: sd.changeT || 0, batch: sd.batch || [],
        madeBy: sd.madeBy || [0, 0, 0, 0, 0, 0], gap: sd.gap || 0, autoGapK: sd.autoGapK || 1, ncnBatch: sd.ncnBatch || 1,
        ncnMade: sd.ncnMade || 0, ncnFinished: sd.ncnFinished || 0, replica: sd.replica || null, gauge: sd.gauge !== false,
      });
      Object.assign(s.enabled, sd.enabled || {});
      Object.assign(s.stats, sd.stats || {});
    }
    this.sel = idx(d.sel);
    if (!this.sites[this.sel].open) this.sel = 0;
    this.nextId = d.nextId || 1;
    this.ncnSerial = d.ncnSerial || 0;
    Object.assign(this.stats, d.stats || {});
    this.recent = d.recent || [];
    this.basket = (d.basket || []).map((x) => (typeof x === 'number' ? { spec: x, recipe: 0 } : x));
    this.overflow = d.overflow || 0;
    this.drainT = d.drainT || 0; this.crate = d.crate || 0; this.crates = d.crates || [0, 0, 0, 0, 0, 0];
    Object.assign(this.settings, d.settings || {});
    if (d.routeStats) for (const [id, rs] of Object.entries(d.routeStats)) if (SITE_INDEX[id] !== undefined) this.routeStats[SITE_INDEX[id]] = { best: 0, ...rs };
    Object.assign(this.records, d.records || {});
    this.bestCpm = d.bestCpm || 0; this.gorgeFinished = !!d.gorgeFinished;
    this.lossBySpot = d.lossBySpot || {};
    this.finishTimes = d.finishTimes || [];
    this.lastFinish = d.lastFinish ? { ...d.lastFinish, start: idx(d.lastFinish.start) } : null;
    if (Array.isArray(d.logs)) d.logs.forEach((ph, i) => { if (this.logs[i]) this.logs[i].ph = ph; });
    if (Array.isArray(d.sweep)) d.sweep.forEach((sw, i) => { if (this.sweep[i]) Object.assign(this.sweep[i], sw); });
    this.order = d.order || null;
    this.orderLog = d.orderLog || [];
    this.orderSeq = d.orderSeq || 1;
    if (d.workshop) {
      this.workshop.routes = d.workshop.routes || [];
      this.workshop.carts = (d.workshop.carts || []).map((c) => ({ ...c, load: c.load || [] }));
      Object.assign(this.workshop.priority, d.workshop.priority || {});
      this.workshop.shipped = d.workshop.shipped || 0;
      this.workshop.tripsTo = d.workshop.tripsTo || {};
    }
    this.splitGate = d.splitGate || 'balanced'; this.gatePhase = d.gatePhase || 0;
    this.presets = d.presets || [null, null, null, null, null];
    if (d.bench) this.bench = d.bench;
    this.milestones = d.milestones || {};
    this.player = d.player || null;
    this.trial = d.trial || null;
    this.sessionStart = this.t - 60;
    this.phys.t = d.physT ?? this.t;
    this.acc = d.acc || 0;
    let saved = d.balls || [];
    if (d.geo !== GEO_VERSION) {
      // Saved before the creek was laid out along the creator's map: ball positions and bank
      // positions no longer exist. Unpaid rolling balls go back to the front of their own
      // factory's queue (same ID, recipe, origin and markings; any order slot is released and
      // reserved again when they relaunch). Paid balls were already settled.
      for (const o of saved) {
        if (o.st !== 'roll' || o.paid) continue;
        const k = idx(o.k), home = this.sites[idx(o.site ?? o.k)] || this.sites[k];
        home.hopper.unshift({ id: o.id, spec: o.spec, recipe: o.rec || 0, site: idx(o.site ?? o.k), made: o.lt || 0, ncn: o.ncn || 0, batch: o.bat || 0, replica: o.rep || null, gauged: !!o.gau });
        this.sites[k].stats.launched = Math.max(0, this.sites[k].stats.launched - 1);
        this.stats.launched = Math.max(0, this.stats.launched - 1);
        if (o.ord) { const ord = this.findOrder(o.ord); if (ord) ord.reserved = Math.max(0, ord.reserved - 1); }
        if (home !== this.sites[k]) { home.stats.transferredOut = Math.max(0, home.stats.transferredOut - 1); this.sites[k].stats.transferredIn = Math.max(0, this.sites[k].stats.transferredIn - 1); }
      }
      saved = [];
      for (const c of this.workshop.carts) {
        if (c.load && c.load.length && this.sites[c.src]) { this.sites[c.src].hopper.push(...c.load); this.sites[c.src].stats.transferredOut -= c.load.length; c.load = []; }
        c.state = 'idle'; c.s = WORKSHOP.s; c.reserved = 0; c.t = 0;
      }
      this.player = null;
      this.geoMigrated = true;
    }
    this.phys.balls = saved.map((o) => {
      const b = makeBall(o.id, o.spec, o.rs);
      Object.assign(b, {
        x: o.x, y: o.y, z: o.z, vx: o.vx, vy: o.vy, vz: o.vz, wx: o.wx, wy: o.wy, wz: o.wz,
        qx: o.q[0], qy: o.q[1], qz: o.q[2], qw: o.q[3], start: idx(o.k), site: idx(o.site ?? o.k), recipe: o.rec || 0,
        payout: o.pay, cps: o.cps, cpi: o.cpi, cpT: o.cpT || [], paid: o.paid, missed: o.missed, wet: o.wet, age: o.age, launchT: o.lt,
        stallT: o.stall, state: o.st, prevS: o.ps, maxS: o.ms, qT: o.qT, wob: o.wob || 0, progS: o.pg, speedAvg: o.sa ?? 0.5,
        sub: o.sub ?? 0, qi: o.qi, orderId: o.ord || 0, orderBonus: o.ob || 0, ncn: o.ncn || 0, batch: o.bat || 0, replica: o.rep || null, gauged: !!o.gau,
      });
      b.cr = o.cr && this.springs ? 1 : 0;
      const cr = b.cr ? this.springs : this.creek;
      const L = cr.locate(b.x, b.z, -1, {});
      b.hint = L.idx; b.s = L.s; b.d = L.d;
      // terrain may have been reshaped by an update: never leave a ball inside the ground
      const ground = cr.bedH(b.s, b.d) + BALL_R * 0.9;
      if (b.y < ground) b.y = ground;
      return b;
    });
    for (const s of this.sites) s.lastLaunch = s.lastLaunch && this.phys.balls.some((b) => b.id === s.lastLaunch.id) ? s.lastLaunch : null;
  }

  // compatibility for single-site callers
  get pressProg() { return this.site.pressProg; }
  get pressCount() { return this.site.pressCount; }
  get manualCD() { return this.site.manualCD; }
  set manualCD(v) { this.site.manualCD = v; }
}

/** Upgrade a base-game save to the network format. */
/** Earlier saves name launch sites that are not on the creator's map: each one now launches from
 *  the real place nearest to it (two old sites can become one; their queues, upgrades and stats
 *  are combined). Cart and route indices follow the new site order. */
export function renameSites(d) {
  const ren = (id) => (typeof id === 'string' ? SITE_RENAMES[id] || id : id);
  const merged = new Map();
  let refund = 0;
  for (const id of d.owned || []) refund += REMOVED_UPGRADES[id] || 0;
  for (const sd of d.sites || []) {
    const id = ren(sd.id);
    const m = merged.get(id);
    if (m && m.open && sd.open) refund += OLD_SITE_COST[sd.id] || 0;
    if (!m) { merged.set(id, { ...sd, id, hopper: [...(sd.hopper || [])], post: [...(sd.post || [])], owned: [...(sd.owned || [])], stats: { ...(sd.stats || {}) } }); continue; }
    m.open = m.open || sd.open;
    m.owned = [...new Set([...m.owned, ...(sd.owned || [])])];
    m.hopper.push(...(sd.hopper || []));
    m.post.push(...(sd.post || []));
    for (const [k, v] of Object.entries(sd.stats || {})) if (typeof v === 'number') m.stats[k] = (m.stats[k] || 0) + v;
  }
  for (const m of merged.values()) for (const it of [...m.hopper, ...m.post]) it.site = ren(it.site);
  const routeStats = {};
  for (const [id, rs] of Object.entries(d.routeStats || {})) { const n = ren(id); if (!routeStats[n] || (rs.n || 0) > (routeStats[n].n || 0)) routeStats[n] = rs; }
  const byOld = (k) => { const id = ren(GEO2_IDS[k]); return SITE_INDEX[id] ?? 0; };
  const workshop = d.workshop ? {
    ...d.workshop,
    routes: (d.workshop.routes || []).map((r) => (r ? { ...r, dest: byOld(r.dest) } : r)),
    carts: (d.workshop.carts || []).map((c) => ({ ...c, src: c.src != null ? byOld(c.src) : c.src, dest: c.dest != null ? byOld(c.dest) : c.dest })),
  } : d.workshop;
  const milestones = {};
  for (const [k, v] of Object.entries(d.milestones || {})) milestones[ren(k)] = v;
  const lossBySpot = {};
  for (const [k, v] of Object.entries(d.lossBySpot || {})) if (TROUBLE_SPOTS.some((sp) => sp.id === k)) lossBySpot[k] = v;
  return {
    ...d, cash: (d.cash || 0) + refund, refunded: (d.refunded || 0) + refund, sites: [...merged.values()], sel: ren(d.sel), routeStats, workshop, milestones, lossBySpot,
    owned: (d.owned || []).filter((id) => UPGRADE_BY_ID[id]),
    order: d.order && ORDERS.some((o) => o.id === d.order.id) ? d.order : null,
    lastFinish: d.lastFinish ? { ...d.lastFinish, start: ren(d.lastFinish.start) } : null,
    balls: (d.balls || []).map((o) => ({ ...o, k: ren(o.k), site: ren(o.site) })),
  };
}

export function migrateV1(d) {
  const idOf = (k) => OLD_IDS[k] || 'grounds';
  const selId = idOf(d.sel || 0);
  const ownedAll = (d.owned || []).filter((id) => UPGRADE_BY_ID[id]);
  const refund = (d.owned || []).reduce((a, id) => a + (REMOVED_UPGRADES[id] || 0), 0);
  const siteOwned = ownedAll.filter((id) => isSiteUpgrade(id));
  const globalOwned = ownedAll.filter((id) => !isSiteUpgrade(id));
  const openCount = Math.max(1, Math.min(6, d.unlocked || 1));
  let nextId = d.nextId || 1;
  // sites under their old names; load() renames them to the creator's map places
  const sites = OLD_IDS.map((id, oldK) => {
    const st = { id };
    const open = oldK < openCount;
    let owned = [];
    if (st.id === selId) owned = siteOwned.slice();
    else if (open) owned = siteOwned.filter((id) => id === 'press' || id === 'feeder');
    const hopper = st.id === selId ? (d.hopper || []).map((spec) => ({ id: nextId++, spec, recipe: 0, site: st.id, made: d.t || 0 })) : [];
    return {
      id: st.id, open, owned, hopper, post: [],
      pressProg: st.id === selId ? d.pressProg || 0 : 0, pressCount: st.id === selId ? d.pressCount || 0 : 0,
      feederT: st.id === selId ? d.feederT || 0 : 0, manualCD: st.id === selId ? d.manualCD || 0 : 0, recipe: 0,
    };
  });
  const routeStats = {};
  (d.routeStats || []).forEach((rs, k) => { routeStats[idOf(k)] = rs; });
  return {
    v: SAVE_VERSION, migratedFrom: 1, t: d.t || 0, cash: (d.cash || 0) + refund, refunded: refund, owned: globalOwned, sel: selId, sites, nextId,
    stats: { ...(d.stats || {}) }, recent: d.recent || [], basket: (d.basket || []).map((spec) => ({ spec, recipe: 0 })), drainT: d.drainT || 0,
    crate: d.crate || 0, settings: d.settings || {}, routeStats, bestCpm: d.bestCpm || 0, gorgeFinished: !!d.gorgeFinished,
    records: { bestCpm: d.bestCpm || 0 }, lossBySpot: d.lossBySpot || {}, finishTimes: d.finishTimes || [],
    lastFinish: d.lastFinish ? { ...d.lastFinish, start: idOf(d.lastFinish.start) } : null, logs: d.logs, physT: d.physT, acc: d.acc,
    sweep: d.arm ? [d.arm] : undefined,
    milestones: Object.fromEntries(['shelf', 'springs', 'alder', 'gorge'].filter((m) => OLD_IDS.indexOf(m) < openCount).map((m) => [m, d.t || 0])),
    balls: (d.balls || []).map((o) => ({ ...o, k: idOf(o.k), site: idOf(o.k), rec: 0 })),
  };
}
