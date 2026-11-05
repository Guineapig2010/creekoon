// Game state for the New Creek Nation network: a permanent factory at every open
// launch site, one shared cash balance, one finish gate, recipes, orders, the Bank
// Workshop supply carts, and saving. Pure logic (no DOM / three.js), runs headless.

import {
  STARTS, SITE_INDEX, UPGRADES, UPGRADE_BY_ID, S_FINISH, S_BASKET, MANUAL_COOLDOWN, PHYS_DT, BALL_R, BF,
  REACHES, reachAt, RECIPES, RECIPE_INDEX, ORDERS, isSiteUpgrade,
  checkpointsFor, specFromOwned, bonusForSpec, recipeBonus, factoryNumbers, finishNumbers,
} from './config.js';
import { PhysicsWorld, makeBall, ballRand } from './physics.js';
import { MAT } from './creek.js';

export const SAVE_VERSION = 2;
const OLD_IDS = ['grounds', 'waterfall', 'shelf', 'springs', 'alder', 'gorge'];

// Where losses/stalls happen and which creek equipment addresses them
export const TROUBLE_SPOTS = [
  { id: 'root', s0: 92.6, s1: 94.2, fix: 'rootRail', label: 'the exposed root' },
  { id: 'gravel', s0: 94.2, s1: 96.4, fix: 'gravelMat', label: 'the rough gravel' },
  { id: 'lip', s0: 85.0, s1: 87.6, fix: 'splashGuard', label: 'the waterfall lip' },
  { id: 'pool', s0: 87.6, s1: 90.5, fix: 'poolGuide', label: 'the plunge pool eddy' },
  { id: 'catch', s0: 76.0, s1: 80.5, fix: 'catchRamp', label: 'the Shelf drop' },
  { id: 'codeRot', s0: 57.6, s1: 60.4, fix: 'habitatBypass', label: 'the Code Rot pocket at the Springs', side: 1 },
  { id: 'springs', s0: 54.0, s1: 61.6, fix: 'debrisScreen', label: 'the Springs driftwood' },
  { id: 'outlet', s0: 61.6, s1: 62.15, fix: 'clearingArm', label: 'the Springs outlet notch' },
  { id: 'spillway', s0: 62.15, s1: 68.0, fix: 'spillRail', label: 'the narrow spillway' },
  { id: 'island', s0: 44.0, s1: 50.5, fix: 'alderBypass', label: 'the dead pocket at the island' },
  { id: 'gorgeStep', s0: 8.6, s1: 11.0, fix: 'landingBoards', label: 'the first Gorge drop' },
  { id: 'slateEdge', s0: -12.9, s1: -11.0, fix: 'slateBumpers', label: 'the first slab at Slate Steps' },
  { id: 'leafPocket', s0: -15.2, s1: -14.0, fix: 'leafGrate', label: 'the leaf-covered pocket' },
  { id: 'slatePool', s0: -9.0, s1: -7.3, fix: 'slateOutlet', label: 'the second Slate pocket pool' },
  { id: 'willowRoot', s0: -26.5, s1: -25.4, fix: 'willowShield', label: 'the inside root at Willow Narrows' },
  { id: 'willowExit', s0: -25.4, s1: -19.6, fix: 'willowFlare', label: 'the Willow Narrows pinch' },
  { id: 'basin', s0: -73.5, s1: -62.5, fix: 'basinBoom', label: 'the Long Eddy recirculation' },
  { id: 'spillApron', s0: -91.2, s1: -89.2, fix: 'spillApron', label: 'the Spillway apron rocks' },
  { id: 'spillPool', s0: -89.2, s1: -85.5, fix: 'spillSkimmer', label: 'the Spillway pool edges' },
  { id: 'sluiceMerge', s0: -111, s1: -105.5, fix: 'sluiceMerge', label: 'the Sluice merge' },
  { id: 'headPool', s0: -152, s1: -138.3, fix: 'headGuide', label: 'the quiet spring margin' },
];
// Sweepers: zone, stall time that triggers them, the upgrade that installs them
export const SWEEPERS = [
  { id: 'arm', up: 'clearingArm', s0: 59.4, s1: 62.9, pivotS: 61.4, side: 1, name: 'Clearing Arm' },
  { id: 'branch', up: 'branchSweeper', s0: 44.0, s1: 50.8, pivotS: 47.4, side: -1, name: 'Branch Sweeper' },
  { id: 'skimmer', up: 'spillSkimmer', s0: -90.9, s1: -85.6, pivotS: -88.2, side: 1, name: 'Pool Skimmer' },
];
export const ARM = SWEEPERS[0];
// The Bank Workshop yard (left bank at Alder Bend)
export const WORKSHOP = { s: 38.5, side: -1 };

const SITE_GROUPS = ['rootRail', 'splashGuard', 'poolGuide', 'catchRamp', 'spillRail', 'alderBypass', 'landingBoards', 'debrisScreen',
  'willowShield', 'willowFlare', 'slateBumpers', 'leafGrate', 'splitMergeRail', 'basinBoom', 'spillApron', 'headGuide', 'headRails', 'habitatBypass'];

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
    this.phys = new PhysicsWorld(creek);
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
    this.sluiceLane = 0;
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
    const ms = { shelf: 'shelf', springs: 'springs', alder: 'alder', gorge: 'gorge', slate: 'slate' }[STARTS[k].id];
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
    P.setGroup('willowPinch', !o.has('willowFlare'));
    P.setGroup('slateLip', !o.has('slateOutlet'));
    P.setGroup('sluiceMergeRocks', !o.has('sluiceMerge'));
    const M = this.creek.mods;
    M.basinVane = o.has('basinVane');
    M.slateOutlet = o.has('slateOutlet');
    M.headGuide = o.has('headGuide');
    M.sluiceMerge = o.has('sluiceMerge');
    M.habitatGuide = o.has('habitatBypass');
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
        const cols = this.creek.chuteColliders(k);
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
  launch(k, item, manual = false) {
    const ch = this.creek.chuteFor(k);
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
    const L = this.creek.locate(b.x, b.z, -1, {});
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

  /** Why site k may not release right now ('' when it may). Shared reaches get fair turns. */
  admission(k) {
    const site = this.sites[k];
    const st = STARTS[k];
    if (this.ballsRolling() >= this.ballBudget) return 'Network ball budget full';
    const q = this.queueCount();
    if (q >= 7 + this.finish.overflow / 8) return 'Finish backed up';
    // reaches between this launch and the finish
    const r0 = reachAt(st.s);
    for (let r = r0; r >= 0; r--) {
      const R = this.reachStats[r];
      if (R.count >= REACHES[r].cap) {
        // fair turns: only the longest-waiting site blocked on this reach may take a freed slot
        if (R.count >= REACHES[r].cap + 1 || (R.turn !== undefined && R.turn !== k)) return `${REACHES[r].name} backed up`;
      }
    }
    // yield to balls passing the launch from upstream sites
    for (const b of this.phys.balls) {
      if (b.state !== 'roll' || b.start === k) continue;
      if (b.s > st.s - 0.9 && b.s < st.s + 0.35) {
        if (site.waitT < 3 || Math.abs(b.s - (st.s + 0.1)) < 0.35) return 'Yielding to passing balls';
      }
    }
    return '';
  }

  get ballBudget() { return this.settings.ballBudget || 650; }

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
    // pick the longest-waiting site for each congested reach (fair arbitration)
    for (const R of this.reachStats) R.turn = undefined;
    const waitingSites = this.sites.map((s, k) => ({ s, k })).filter((x) => x.s.open && x.s.waitT > 0).sort((a, b) => b.s.waitT - a.s.waitT);
    for (const { k } of waitingSites) {
      for (let r = reachAt(STARTS[k].s); r >= 0; r--) if (this.reachStats[r].count >= REACHES[r].cap && this.reachStats[r].turn === undefined) this.reachStats[r].turn = k;
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
    if (site.pressStatus === 'Press waiting') return site.owned.has('feeder') ? 'Press waiting: the feeder or the creek limits launches' : 'Press waiting: hopper full, no feeder';
    if (site.pressStatus) return site.pressStatus;
    return '';
  }

  updateReaches() {
    const n = REACHES.length;
    const counts = new Array(n).fill(0);
    for (const b of this.phys.balls) if (b.state === 'roll' && !b.paid) counts[reachAt(b.s)]++;
    for (let r = 0; r < n; r++) {
      const R = this.reachStats[r];
      R.count = counts[r];
      R.congested = counts[r] >= REACHES[r].cap * 0.85;
    }
  }

  tuneGaps() {
    for (let k = 0; k < this.sites.length; k++) {
      const site = this.sites[k];
      if (!site.open || site.gap > 0) continue;
      let worst = 0;
      for (let r = reachAt(STARTS[k].s); r >= 0; r--) worst = Math.max(worst, this.reachStats[r].count / REACHES[r].cap);
      const want = worst > 0.85 ? 1.6 : worst > 0.6 ? 1.2 : 1;
      site.autoGapK += (want - site.autoGapK) * 0.5;
    }
  }

  trackBalls(h) {
    const cr = this.creek;
    const balls = this.phys.balls;
    const fin = this.finish;
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      if (b.state === 'queue') continue;
      if (b.state !== 'roll') { balls.splice(i, 1); continue; }
      const s = b.s, d = b.d;
      // checkpoints (either lane of a fork is legal)
      while (b.cpi < b.cps.length && s >= b.cps[b.cpi]) {
        if (cr.inChannel(b.cps[b.cpi], d, 0.4)) { if (b.cpT) b.cpT.push([b.cps[b.cpi], this.t]); b.cpi++; this.events.push({ type: 'checkpoint', id: b.id }); }
        else { b.missed = true; b.cpi++; }
      }
      if (s > b.maxS) b.maxS = s;
      // Folk Draft catch log: an airborne ball dropping off the Shelf
      if (b.prevS < 78.45 && s >= 78.45 && b.y > cr.y0(79) + 0.4) this.stats.draftCatch++;
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
        b.state = 'queue'; b.qT = this.t;
        this.placeQueue();
        continue;
      }
      if (b.paid) continue;
      // stall handling: a ball is stalled when it stops making downstream progress
      const inWater = b.sub > 0;
      if (b.progS === undefined) b.progS = s;
      if (s > b.progS + 0.08) { b.progS = s; if (b.stallT > 4) this.stallLog.push([this.t, s, b.stallT]); b.stallT = 0; } else b.stallT += h;
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
      if (s < -151.5 || s > 107 || Math.abs(d) > 9.5) reason = 'left the creek';
      else if (b.y < cr.bedH(s, d) - 0.25) reason = 'left the creek';
      else if (off > 0.5 && b.stallT > 3) reason = 'escaped onto the bank';
      else if (b.stallT > (inWater ? 22 : 8)) reason = b.speedAvg > 0.05 ? 'stuck in an eddy' : 'wedged';
      else if (b.age > Math.max(40, this.etaFor(b.start) * 3.2)) reason = 'took too long';
      if (reason) this.lose(b, reason, i);
    }
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
        if (o.twoPosts) o.perPost[b.start] = (o.perPost[b.start] || 0) + 1;
        if (o === this.order && o.paid >= o.target) this.completeOrder();
      }
    }
    const lane = this.creek.c(S_FINISH) > b.d ? 0 : 1;
    this.laneLast[lane] = { t: this.t, time };
    this.lastFinish = { time, start: b.start, t: this.t, amount: b.payout };
    if (b.start === SITE_INDEX.gorge && !this.gorgeFinished) { this.gorgeFinished = true; this.records.gorgeFirst = this.t; this.events.push({ type: 'milestone', what: 'gorge' }); }
    if (b.start === SITE_INDEX.coldspring && !this.records.headFirst) { this.records.headFirst = this.t; this.events.push({ type: 'milestone', what: 'headwaters' }); }
    this.events.push({ type: 'finish', id: b.id, amount: b.payout, time, start: b.start, recipe: b.recipe, x: b.x, y: b.y, z: b.z, lane });
  }

  lose(b, reason, i) {
    b.state = 'lost';
    this.stats.lost++;
    this.sites[b.start].stats.lost++;
    let spot = 'other';
    for (const sp of TROUBLE_SPOTS) if (b.s >= sp.s0 && b.s < sp.s1) { spot = sp.id; break; }
    this.lossBySpot[spot] = (this.lossBySpot[spot] || 0) + 1;
    this.lossLog.push([this.t, spot]);
    if (b.orderId) { const o = this.findOrder(b.orderId); if (o) o.reserved = Math.max(0, o.reserved - 1); }
    // a production loss is a simulated factory outcome only; it never touches the archive
    this.events.push({ type: 'lost', id: b.id, reason, x: b.x, y: b.y, z: b.z, spot, start: b.start });
    this.phys.balls.splice(i, 1);
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
    const cr = this.creek;
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
    // Sluice alternator: send each ball to the clearer lane
    if (this.owned.has('sluiceAlternator')) {
      if (h > 0 && ((this.t / h) | 0) % 12 === 0) {
        let left = 0, right = 0;
        for (const b of this.phys.balls) {
          if (b.state !== 'roll' || b.s < -121 || b.s > -110.5) continue;
          if (b.d < this.creek.c(b.s)) left++; else right++;
        }
        const near = this.phys.balls.some((b) => b.state === 'roll' && b.s > -122.6 && b.s < -121.3);
        if (!near) {
          if (left > right + 2) this.sluiceLane = 1;
          else if (right > left + 2) this.sluiceLane = 0;
          else if (this._sluiceLast !== this.stats.launched) { this.sluiceLane ^= 1; this._sluiceLast = this.stats.launched; }
        }
      }
      P.setGroup('sluiceToRight', this.sluiceLane === 1);
      P.setGroup('sluiceToLeft', this.sluiceLane === 0);
    } else { P.setGroup('sluiceToRight', false); P.setGroup('sluiceToLeft', false); }
  }

  updateSweepers(h) {
    const cr = this.creek;
    SWEEPERS.forEach((S, i) => {
      const A = this.sweep[i];
      A.cd = Math.max(0, A.cd - h);
      if (A.phase > 0) {
        const prev = A.phase;
        A.phase += h / 1.1;
        if (prev < 0.5 && A.phase >= 0.5) {
          for (const b of this.phys.balls) {
            if (b.state !== 'roll' || b.paid || b.s < S.s0 || b.s > S.s1 || b.stallT < 1.5) continue;
            const s = b.s;
            // back into the same lane, at the same place: no skipped checkpoints
            const ch = cr.channelOf(s, b.d, 0.3);
            let d = cr.c(s);
            if (ch === 'alt') d = cr.altD(s);
            else if (S.id === 'branch') { const isl = cr.island; if (s > isl.s0 && s < isl.s1) d = cr.c(s) + isl.dOff + (b.d > cr.c(s) + isl.dOff ? 0.45 : -0.45); }
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
        if (b.state === 'roll' && !b.paid && b.s >= S.s0 && b.s <= S.s1 && b.stallT > 2.2) {
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
    const dy = Math.abs(this.creek.y0(Math.max(-151, Math.min(107, s0))) - this.creek.y0(Math.max(-151, Math.min(107, s1))));
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
    if (this.owned.has('splitGate') && p.gate !== this.splitGate) out.push(`Splitstone Gate: ${this.splitGate} → ${p.gate}`);
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
    for (const [, s] of this.stallLog) for (const sp of TROUBLE_SPOTS) if (s >= sp.s0 && s < sp.s1) stalls[sp.id] = (stalls[sp.id] || 0) + 1;
    for (const sp of TROUBLE_SPOTS) {
      if (this.has(sp.fix) || this.blocked(sp.fix)) continue;
      if ((counts[sp.id] || 0) >= 2) out[sp.fix] = `${counts[sp.id]} balls lost recently at ${sp.label}`;
      else if ((stalls[sp.id] || 0) >= 4) out[sp.fix] = `Balls keep stalling at ${sp.label}`;
    }
    for (let r = 0; r < REACHES.length; r++) {
      const R = this.reachStats[r];
      if (R.count >= REACHES[r].cap && REACHES[r].id === 'willow' && !this.owned.has('willowFlare') && !this.blocked('willowFlare')) out.willowFlare = 'Willow Narrows is full: the pinch limits every factory above it';
    }
    const N = this.siteNumbers(this.sel);
    if (site.owned.has('feeder') && !site.owned.has('spacingSensor') && N.feeder < 1.25 && !this.blocked('spacingSensor')) out.spacingSensor = 'This feeder is faster than its landing buffer';
    if (N.press < N.felt && !site.owned.has('parallelFelt') && !this.blocked('fastFelt')) out[site.owned.has('fastFelt') ? 'parallelFelt' : 'fastFelt'] = 'Felt handling is slower than the press';
    return out;
  }

  /** The first active queue slowing the line, for Pressure Alerts. */
  pressureAlert() {
    let worst = null;
    for (let r = REACHES.length - 1; r >= 0; r--) {
      const R = this.reachStats[r];
      const ratio = R.count / REACHES[r].cap;
      if (ratio >= 0.9 && (!worst || ratio > worst.ratio)) worst = { kind: 'reach', r, ratio, text: `${REACHES[r].name} is full (${R.count}/${REACHES[r].cap} balls): factories above it are waiting`, s: (REACHES[r].s0 + REACHES[r].s1) / 2 };
    }
    if (this.queueCount() >= 2) return { kind: 'finish', text: `${this.queueCount()} paid balls queued at the finish basket`, s: S_FINISH };
    if (worst) return worst;
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
      ord: b.orderId || 0, ob: b.orderBonus || 0, ncn: b.ncn || 0, bat: b.batch || 0, rep: b.replica || null, gau: !!b.gauged,
    }));
    return {
      v: SAVE_VERSION, savedAt: Date.now(), t: this.t, cash: this.cash, owned: [...this.owned], sel: STARTS[this.sel].id,
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
      splitGate: this.splitGate, gatePhase: this.gatePhase, sluiceLane: this.sluiceLane, presets: this.presets, bench: this.bench, milestones: this.milestones,
      player: this.player, trial: this.trial,
      balls,
    };
  }

  load(d) {
    if (!d) return;
    if (d.v === 1) d = migrateV1(d);
    if (!d || d.v !== SAVE_VERSION) return;
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
    this.splitGate = d.splitGate || 'balanced'; this.gatePhase = d.gatePhase || 0; this.sluiceLane = d.sluiceLane || 0;
    this.presets = d.presets || [null, null, null, null, null];
    if (d.bench) this.bench = d.bench;
    this.milestones = d.milestones || {};
    this.player = d.player || null;
    this.trial = d.trial || null;
    this.sessionStart = this.t - 60;
    this.phys.t = d.physT ?? this.t;
    this.acc = d.acc || 0;
    this.phys.balls = (d.balls || []).map((o) => {
      const b = makeBall(o.id, o.spec, o.rs);
      Object.assign(b, {
        x: o.x, y: o.y, z: o.z, vx: o.vx, vy: o.vy, vz: o.vz, wx: o.wx, wy: o.wy, wz: o.wz,
        qx: o.q[0], qy: o.q[1], qz: o.q[2], qw: o.q[3], start: idx(o.k), site: idx(o.site ?? o.k), recipe: o.rec || 0,
        payout: o.pay, cps: o.cps, cpi: o.cpi, cpT: o.cpT || [], paid: o.paid, missed: o.missed, wet: o.wet, age: o.age, launchT: o.lt,
        stallT: o.stall, state: o.st, prevS: o.ps, maxS: o.ms, qT: o.qT, wob: o.wob || 0, progS: o.pg, speedAvg: o.sa ?? 0.5,
        sub: o.sub ?? 0, qi: o.qi, orderId: o.ord || 0, orderBonus: o.ob || 0, ncn: o.ncn || 0, batch: o.bat || 0, replica: o.rep || null, gauged: !!o.gau,
      });
      const L = this.creek.locate(b.x, b.z, -1, {});
      b.hint = L.idx; b.s = L.s; b.d = L.d;
      // terrain may have been reshaped by an update: never leave a ball inside the ground
      const ground = this.creek.bedH(b.s, b.d) + BALL_R * 0.9;
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
export function migrateV1(d) {
  const idOf = (k) => OLD_IDS[k] || 'grounds';
  const selId = idOf(d.sel || 0);
  const ownedAll = (d.owned || []).filter((id) => UPGRADE_BY_ID[id]);
  const siteOwned = ownedAll.filter((id) => isSiteUpgrade(id));
  const globalOwned = ownedAll.filter((id) => !isSiteUpgrade(id));
  const openCount = Math.max(1, Math.min(6, d.unlocked || 1));
  let nextId = d.nextId || 1;
  const sites = STARTS.map((st) => {
    const oldK = OLD_IDS.indexOf(st.id);
    const open = oldK >= 0 && oldK < openCount;
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
    v: SAVE_VERSION, migratedFrom: 1, t: d.t || 0, cash: d.cash || 0, owned: globalOwned, sel: selId, sites, nextId,
    stats: { ...(d.stats || {}) }, recent: d.recent || [], basket: (d.basket || []).map((spec) => ({ spec, recipe: 0 })), drainT: d.drainT || 0,
    crate: d.crate || 0, settings: d.settings || {}, routeStats, bestCpm: d.bestCpm || 0, gorgeFinished: !!d.gorgeFinished,
    records: { bestCpm: d.bestCpm || 0 }, lossBySpot: d.lossBySpot || {}, finishTimes: d.finishTimes || [],
    lastFinish: d.lastFinish ? { ...d.lastFinish, start: idOf(d.lastFinish.start) } : null, logs: d.logs, physT: d.physT, acc: d.acc,
    sweep: d.arm ? [d.arm] : undefined,
    milestones: Object.fromEntries(['shelf', 'springs', 'alder', 'gorge'].filter((m) => OLD_IDS.indexOf(m) < openCount && OLD_IDS.indexOf(m) >= 0).map((m) => [m, d.t || 0])),
    balls: (d.balls || []).map((o) => ({ ...o, k: idOf(o.k), site: idOf(o.k), rec: 0 })),
  };
}
