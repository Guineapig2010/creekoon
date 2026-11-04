// Game state: economy, factory machines, ball tracking, saving.
// Pure logic (no DOM / three.js) so it can be played headless.

import {
  STARTS, UPGRADES, UPGRADE_BY_ID, S_FINISH, S_BASKET, MANUAL_COOLDOWN, PHYS_DT, BALL_R,
  checkpointsFor, specFromOwned, bonusForSpec, factoryNumbers,
} from './config.js';
import { PhysicsWorld, makeBall, ballRand } from './physics.js';
import { MAT } from './creek.js';

export const SAVE_VERSION = 1;

// Where losses/stalls happen and which creek upgrade addresses them
const TROUBLE_SPOTS = [
  { id: 'root', s0: 92.6, s1: 94.2, fix: 'rootRail', label: 'the exposed root' },
  { id: 'gravel', s0: 94.2, s1: 96.4, fix: 'gravelMat', label: 'the rough gravel' },
  { id: 'lip', s0: 85.0, s1: 87.6, fix: 'splashGuard', label: 'the waterfall lip' },
  { id: 'pool', s0: 87.6, s1: 90.5, fix: 'poolGuide', label: 'the plunge pool eddy' },
  { id: 'catch', s0: 76.0, s1: 80.5, fix: 'catchRamp', label: 'the Shelf drop' },
  { id: 'springs', s0: 54.0, s1: 61.8, fix: 'debrisScreen', label: 'the Springs driftwood' },
  { id: 'spillway', s0: 61.8, s1: 68.0, fix: 'spillRail', label: 'the narrow spillway' },
  { id: 'island', s0: 44.0, s1: 50.5, fix: 'alderBypass', label: 'the dead pocket at the island' },
  { id: 'gorgeStep', s0: 8.6, s1: 11.0, fix: 'landingBoards', label: 'the first Gorge drop' },
];
// Clearing arm zone: Springs pool outlet / spillway mouth
export const ARM = { s0: 59.4, s1: 62.9, pivotS: 61.4 };

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
    this.installChute(this.sel);
    this.lastSaveT = this.t;
  }

  reset() {
    this.t = 0;
    this.cash = 0;
    this.owned = new Set();
    this.unlocked = 1;
    this.sel = 0;
    this.hopper = [];
    this.pressProg = 0;
    this.pressCount = 0;
    this.feederT = 0;
    this.manualCD = 0;
    this.nextId = 1;
    this.lastLaunch = null; // {id, t, x, y, z}
    this.stats = { made: 0, launched: 0, finished: 0, lost: 0, paid: 0, completed: 0 };
    this.recent = []; // [t, amount]
    this.basket = []; // specs settling in the basket
    this.drainT = 0;
    this.crate = 0;
    this.reloc = null;
    this.settings = { sound: true, auto: true, quality: 'high' };
    this.routeStats = STARTS.map(() => ({ n: 0, avg: 0, last: 0 }));
    this.lastFinish = null;
    this.bestCpm = 0;
    this.gorgeFinished = false;
    this.lossBySpot = {};
    this.lossLog = []; // [t, spotId]
    this.status = { press: '', feeder: '', creek: '' };
    this.arm = { phase: 0, cd: 0, target: null };
    this.logs = [0, 2.1, 4.2].map((ph) => ({ ph, x: 0, y: 0, z: 0, ax: 0, az: 0, bx: 0, bz: 0, ang: 0 }));
    this.finishTimes = []; // recent finish timestamps for balls/min
    this.launchSeed = 99;
    this.phys.balls = [];
  }

  // ------------------------------------------------------------------ derived
  get numbers() { return factoryNumbers(this.owned); }
  get relocating() { return !!this.reloc; }
  ballsRolling() { let n = 0; for (const b of this.phys.balls) if (b.state === 'roll' && !b.paid) n++; return n; }
  queueCount() { let n = 0; for (const b of this.phys.balls) if (b.state === 'queue') n++; return n; }

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

  etaFor(k) {
    const rs = this.routeStats[k];
    return rs.n >= 3 ? rs.avg : STARTS[k].eta;
  }

  payoutFor(k, spec = specFromOwned(this.owned)) { return STARTS[k].base + bonusForSpec(spec); }

  nextArrival() {
    let best = Infinity;
    for (const b of this.phys.balls) {
      if (b.state !== 'roll' || b.paid) continue;
      const left = this.etaFor(b.start) - b.age;
      if (left < best) best = left;
    }
    return best === Infinity ? null : Math.max(0, best);
  }

  canBuy(id) {
    const u = UPGRADE_BY_ID[id];
    if (!u || this.owned.has(id)) return { ok: false, why: 'Owned' };
    for (const r of u.requires) if (!this.owned.has(r)) return { ok: false, why: `Requires ${UPGRADE_BY_ID[r].name}` };
    if (u.area !== undefined && this.unlocked <= u.area) return { ok: false, why: `Requires ${STARTS[u.area].name}` };
    if (this.cash < u.price) return { ok: false, why: 'Not enough cash', afford: false, avail: true };
    return { ok: true };
  }

  buy(id) {
    const c = this.canBuy(id);
    if (!c.ok) return false;
    const u = UPGRADE_BY_ID[id];
    this.cash -= u.price;
    this.owned.add(id);
    this.applyOwned();
    this.events.push({ type: 'purchase', id });
    return true;
  }

  canUnlock(k) { return k === this.unlocked && k < STARTS.length && this.cash >= STARTS[k].cost; }

  unlock(k) {
    if (!this.canUnlock(k)) return false;
    this.cash -= STARTS[k].cost;
    this.unlocked = k + 1;
    this.events.push({ type: 'unlock', k });
    this.selectStart(k);
    return true;
  }

  selectStart(k) {
    if (k >= this.unlocked || k === this.sel || this.reloc) return false;
    this.reloc = { from: this.sel, to: k, phase: 'wait', t: 0, dur: 2.2 + Math.abs(STARTS[k].s - STARTS[this.sel].s) / 38 };
    this.events.push({ type: 'relocStart', from: this.sel, to: k });
    return true;
  }

  applyOwned() {
    const o = this.owned, P = this.phys;
    for (const g of ['rootRail', 'splashGuard', 'poolGuide', 'catchRamp', 'spillRail', 'alderBypass', 'landingBoards', 'debrisScreen']) P.setGroup(g, o.has(g));
    P.matOn = o.has('gravelMat');
    P.setGroup('roughPebbles', !o.has('gravelMat'));
  }

  installChute(k) {
    const cols = this.creek.chuteColliders(k);
    for (const c of cols) {
      c.bcx = c.cx; c.bcz = c.cz; c.br = Math.hypot(c.h[0], c.h[2]) + BALL_R + 0.05;
    }
    this.chuteCols = cols;
    this.rebuildExtra();
  }

  rebuildExtra() {
    this.phys.extra = [...(this.chuteCols || []), ...this.logCols()];
  }

  // ------------------------------------------------------------------ actions
  manualRoll() {
    if (this.reloc) return 'moving';
    if (this.manualCD > 0) return 'cooldown';
    let spec;
    if (this.hopper.length) spec = this.hopper.shift();
    else { spec = specFromOwned(this.owned); this.stats.made++; this.events.push({ type: 'handMade' }); }
    this.launch(spec, true);
    this.manualCD = MANUAL_COOLDOWN;
    return 'ok';
  }

  launch(spec, manual = false) {
    const k = this.sel;
    const ch = this.creek.chuteFor(k);
    const id = this.nextId++;
    const b = makeBall(id, spec, (id * 2654435761) ^ this.launchSeed);
    const [x0, y0, z0] = ch.R0, [x1, y1, z1] = ch.M;
    let dx = x1 - x0, dy = y1 - y0, dz = z1 - z0;
    const l = Math.hypot(dx, dy, dz); dx /= l; dy /= l; dz /= l;
    // up perpendicular to chute
    const hx = Math.hypot(dx, dz);
    const ux = (-dx * dy) / hx, uy = hx, uz = (-dz * dy) / hx;
    b.x = x0 + dx * 0.05 + ux * (BALL_R + 0.002);
    b.y = y0 + dy * 0.05 + uy * (BALL_R + 0.002);
    b.z = z0 + dz * 0.05 + uz * (BALL_R + 0.002);
    let spread = this.owned.has('lowFriction') ? 0.07 : 0.22;
    if (spec & 4) spread *= 0.25; // seam press
    const v = 0.55 * (1 + spread * (ballRand(b) * 2 - 1));
    const aim = (spec & 4 ? 0.01 : 0.04) * (ballRand(b) * 2 - 1);
    const sx = -dz / hx, sz = dx / hx;
    b.vx = dx * v + sx * aim; b.vy = dy * v; b.vz = dz * v + sz * aim;
    b.start = k;
    b.payout = STARTS[k].base + bonusForSpec(spec);
    b.cps = checkpointsFor(k);
    b.cpi = 0;
    b.launchT = this.t;
    const L = this.creek.locate(b.x, b.z, -1, {});
    b.hint = L.idx; b.s = L.s; b.d = L.d; b.prevS = L.s; b.maxS = L.s;
    this.phys.balls.push(b);
    this.lastLaunch = { id, t: this.t, x: b.x, y: b.y, z: b.z };
    this.stats.launched++;
    this.events.push({ type: 'launch', id, manual, spec, k });
    return b;
  }

  chuteClear() {
    const ll = this.lastLaunch;
    if (!ll) return true;
    const b = this.phys.balls.find((q) => q.id === ll.id);
    const dt = this.t - ll.t;
    if (!b || b.state !== 'roll') return dt > 0.2;
    const dist = Math.hypot(b.x - ll.x, b.y - ll.y, b.z - ll.z);
    if (this.owned.has('spacingSensor')) return dist >= 0.3 && dt >= 0.2;
    return (dt >= 1.25 && dist >= 1.0) || dt > 4;
  }

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
    this.manualCD = Math.max(0, this.manualCD - h);
    const N = this.numbers;
    const auto = this.settings.auto;

    // ---- relocation
    if (this.reloc) {
      const r = this.reloc;
      r.t += h;
      if (r.phase === 'wait') {
        if (this.chuteClear() || r.t > 3) {
          r.phase = 'move'; r.t = 0;
          this.chuteCols = [];
          this.rebuildExtra();
          this.events.push({ type: 'relocMove', from: r.from, to: r.to, dur: r.dur });
        }
      } else if (r.t >= r.dur) {
        this.sel = r.to;
        this.reloc = null;
        this.lastLaunch = null;
        this.installChute(this.sel);
        this.events.push({ type: 'relocated', k: this.sel });
      }
    }

    // ---- press
    this.status.press = '';
    if (this.owned.has('press')) {
      if (!auto) this.status.press = 'Paused';
      else if (this.hopper.length >= N.hopper) { this.status.press = 'Press waiting'; this.pressProg = Math.min(this.pressProg, 1); }
      else {
        this.pressProg += h / N.press;
        if (this.pressProg >= 1) {
          this.pressProg -= 1;
          this.hopper.push(specFromOwned(this.owned));
          this.stats.made++;
          this.pressCount++;
          this.events.push({ type: 'pressed', head: this.pressCount % 2 });
        }
      }
    }

    // ---- feeder
    const queue = this.queueCount();
    this.status.feeder = '';
    this.status.creek = queue >= 2 ? 'Creek backed up' : '';
    if (this.owned.has('feeder')) {
      let interval = N.feeder;
      if (queue >= 2) interval *= 1 + queue * 0.5; // ease off during backups
      this.feederT += h;
      if (!auto) this.status.feeder = 'Paused';
      else if (this.reloc) this.status.feeder = 'Moving';
      else if (queue >= 7) this.status.feeder = 'Holding';
      else if (this.feederT >= interval) {
        if (!this.hopper.length) this.status.feeder = 'Hopper empty';
        else if (this.chuteClear()) {
          this.launch(this.hopper.shift());
          this.feederT = 0;
        }
      }
      if (this.feederT > interval * 3) this.feederT = interval * 3;
    }

    // ---- dynamic obstacles
    this.updateLogs(h);
    this.updateArm(h);

    // ---- physics
    this.phys.step(h);
    for (const e of this.phys.events) this.events.push(e);
    this.phys.events.length = 0;

    // ---- ball bookkeeping
    this.trackBalls(h);

    // ---- basket
    const cap = N.basketCap;
    if (this.basket.length) {
      this.drainT += h;
      if (this.drainT >= N.drain) {
        this.drainT = 0;
        this.basket.shift();
        this.stats.completed++;
        if (this.owned.has('conveyor')) this.crate++;
        this.events.push({ type: 'drain' });
      }
    } else this.drainT = 0;
    if (this.basket.length < cap) {
      // admit the first queued ball
      let first = null;
      for (const b of this.phys.balls) if (b.state === 'queue' && (!first || b.qT < first.qT)) first = b;
      if (first) this.toBasket(first);
    }

    // ---- stats housekeeping
    while (this.recent.length && this.t - this.recent[0][0] > 300) this.recent.shift();
    while (this.finishTimes.length && this.t - this.finishTimes[0] > 120) this.finishTimes.shift();
    while (this.lossLog.length && this.t - this.lossLog[0][0] > 240) this.lossLog.shift();
    if (this.t - (this.sessionStart ?? 0) > 120) {
      const c2 = this.cashPerMin(120);
      if (c2 > this.bestCpm) this.bestCpm = c2;
    }
  }

  trackBalls(h) {
    const cr = this.creek;
    const balls = this.phys.balls;
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      if (b.state === 'queue') continue;
      if (b.state !== 'roll') { balls.splice(i, 1); continue; }
      const s = b.s, d = b.d;
      // checkpoints
      while (b.cpi < b.cps.length && s >= b.cps[b.cpi]) {
        if (cr.inChannel(b.cps[b.cpi], d, 0.4)) { b.cpi++; this.events.push({ type: 'checkpoint', id: b.id }); }
        else { b.missed = true; b.cpi++; }
      }
      if (s > b.maxS) b.maxS = s;
      // finish gate
      if (!b.paid && b.prevS < S_FINISH && s >= S_FINISH) {
        const legal = cr.inChannel(S_FINISH, d, 0.06) && b.cpi >= b.cps.length && !b.missed;
        if (legal) this.pay(b);
      }
      b.prevS = s;
      // into the basket
      if (s >= S_BASKET - 0.2) {
        if (!b.paid) { this.lose(b, 'missed the gate', i); continue; }
        if (this.basket.length < this.numbers.basketCap && !this.queueCount()) { this.toBasket(b); continue; }
        b.state = 'queue'; b.qT = this.t;
        this.placeQueue();
        continue;
      }
      if (b.paid) continue;
      // stall handling: a ball is stalled when it stops making downstream progress
      // (wedged, pinned, or circling in an eddy)
      const inWater = b.sub > 0;
      if (b.progS === undefined) b.progS = s;
      if (s > b.progS + 0.08) { b.progS = s; b.stallT = 0; } else b.stallT += h;
      if (b.stallT > 3 && inWater && ((b.stallT * 2) | 0) !== (((b.stallT - h) * 2) | 0) && ((b.stallT * 2) | 0) % 4 === 0) {
        // the creek's own surges eventually work most stalled balls loose
        const fr = cr.frame(s);
        const push = 0.25 + ballRand(b) * 0.25;
        const side = (ballRand(b) - 0.5) * 0.5;
        b.vx += fr.tx * push + fr.nx * side; b.vz += fr.tz * push + fr.nz * side; b.vy += 0.15;
        this.events.push({ type: 'surge', x: b.x, y: b.y, z: b.z });
      }
      // escape / give-up rules
      const c = cr.c(s);
      const w = d < c ? cr.wL(s) : cr.wR(s);
      const off = Math.abs(d - c) - w;
      let reason = null;
      if (s < -4.5 || s > 107 || Math.abs(d) > 9.5) reason = 'left the creek';
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
    this.recent.push([this.t, b.payout]);
    this.finishTimes.push(this.t);
    const time = this.t - b.launchT;
    const rs = this.routeStats[b.start];
    rs.n++; rs.last = time;
    rs.avg = rs.n === 1 ? time : rs.avg + (time - rs.avg) * (rs.n < 10 ? 1 / rs.n : 0.1);
    this.lastFinish = { time, start: b.start, t: this.t, amount: b.payout };
    if (b.start === 5 && !this.gorgeFinished) { this.gorgeFinished = true; this.events.push({ type: 'milestone', what: 'gorge' }); }
    this.events.push({ type: 'finish', id: b.id, amount: b.payout, time, start: b.start, x: b.x, y: b.y, z: b.z });
  }

  lose(b, reason, i) {
    b.state = 'lost';
    this.stats.lost++;
    let spot = 'other';
    for (const sp of TROUBLE_SPOTS) if (b.s >= sp.s0 && b.s < sp.s1) { spot = sp.id; break; }
    this.lossBySpot[spot] = (this.lossBySpot[spot] || 0) + 1;
    this.lossLog.push([this.t, spot]);
    this.events.push({ type: 'lost', id: b.id, reason, x: b.x, y: b.y, z: b.z, spot });
    this.phys.balls.splice(i, 1);
  }

  toBasket(b) {
    this.basket.push(b.spec);
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

  // ------------------------------------------------------------------ dynamic obstacles
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
    // refresh collider copies
    const ex = this.phys.extra;
    for (const c of ex) {
      if (!c.log) continue;
      const L = c.log;
      c.ax = L.ax; c.ay = L.y; c.az = L.az; c.bx = L.bx; c.by = L.y; c.bz = L.bz; c.vx = L.vx; c.vz = L.vz;
      // bounding sphere fields reuse (bx/bz are segment end) -> store separately
      c.bcx = L.x; c.bcz = L.z;
    }
  }

  updateArm(h) {
    const A = this.arm;
    A.cd = Math.max(0, A.cd - h);
    if (A.phase > 0) {
      const prev = A.phase;
      A.phase += h / 1.1;
      if (prev < 0.5 && A.phase >= 0.5) {
        // the sweep reaches the stalled balls: set them back in the main current at the same spot
        const cr = this.creek;
        for (const b of this.phys.balls) {
          if (b.state !== 'roll' || b.paid || b.s < ARM.s0 || b.s > ARM.s1 || b.stallT < 1.5) continue;
          const s = b.s;
          const d = cr.c(s) + (s > 62.2 ? 0 : 0.1);
          const p = cr.worldXZ(s, d);
          b.x = p.x; b.z = p.z; b.y = cr.y0(s) + BALL_R * 0.25;
          const fr = cr.frame(s);
          b.vx = fr.tx * 0.35; b.vz = fr.tz * 0.35; b.vy = 0;
          b.stallT = 0; b.progS = s; b.speedAvg = 0.4; b.hint = -1;
          this.events.push({ type: 'armClear', id: b.id, x: b.x, y: b.y, z: b.z });
        }
      }
      if (A.phase >= 1) { A.phase = 0; A.cd = 0.6; }
      return;
    }
    if (!this.owned.has('clearingArm') || A.cd > 0) return;
    for (const b of this.phys.balls) {
      if (b.state === 'roll' && !b.paid && b.s >= ARM.s0 && b.s <= ARM.s1 && b.stallT > 2.2) {
        A.phase = 1e-6;
        this.events.push({ type: 'armSweep' });
        break;
      }
    }
  }

  // ------------------------------------------------------------------ advice
  suggestions() {
    const out = {};
    const owned = this.owned;
    const firstMissing = (ids) => ids.find((id) => !owned.has(id) && this.canBuy(id).why !== undefined && !this.blocked(id));
    if (this.status.feeder === 'Hopper empty') {
      const id = firstMissing(['quickMold', 'twinPress', 'servo', 'turbo']);
      if (id) out[id] = 'Hopper keeps running empty';
    }
    if (this.status.press === 'Press waiting') {
      const id = !owned.has('feeder') ? 'feeder' : firstMissing(['lowFriction', 'indexed', 'spacingSensor', 'hopperExt', 'bulkHopper']);
      if (id) out[id] = 'Press is waiting on a full hopper';
    }
    if (this.status.creek) {
      const id = firstMissing(['wideBasket', 'conveyor']);
      if (id) out[id] = 'Balls are backing up at the finish';
    }
    const counts = {};
    for (const [, sp] of this.lossLog) counts[sp] = (counts[sp] || 0) + 1;
    for (const sp of TROUBLE_SPOTS) {
      if ((counts[sp.id] || 0) >= 2 && !owned.has(sp.fix) && !this.blocked(sp.fix)) out[sp.fix] = `${counts[sp.id]} balls lost recently at ${sp.label}`;
    }
    if (this.owned.has('feeder') && !owned.has('spacingSensor') && this.numbers.feeder < 1.25 && !this.blocked('spacingSensor')) out.spacingSensor = 'Feeder is faster than its landing buffer';
    return out;
  }

  blocked(id) {
    const u = UPGRADE_BY_ID[id];
    if (!u) return true;
    for (const r of u.requires) if (!this.owned.has(r)) return true;
    if (u.area !== undefined && this.unlocked <= u.area) return true;
    return false;
  }

  // ------------------------------------------------------------------ save / load
  serialize() {
    const balls = this.phys.balls.filter((b) => b.state === 'roll' || b.state === 'queue').map((b) => ({
      id: b.id, spec: b.spec, st: b.state, x: b.x, y: b.y, z: b.z, vx: b.vx, vy: b.vy, vz: b.vz,
      wx: b.wx, wy: b.wy, wz: b.wz, q: [b.qx, b.qy, b.qz, b.qw], k: b.start, pay: b.payout, cps: b.cps, cpi: b.cpi,
      paid: b.paid, missed: !!b.missed, wet: b.wet, age: b.age, lt: b.launchT, stall: b.stallT, rs: b.rs,
      ps: b.prevS, ms: b.maxS, qT: b.qT || 0, wob: b.wob, pg: b.progS,
    }));
    return {
      v: SAVE_VERSION, savedAt: Date.now(), t: this.t, cash: this.cash, owned: [...this.owned], unlocked: this.unlocked,
      // a relocation in progress is saved as completed at its destination
      sel: this.reloc ? this.reloc.to : this.sel,
      hopper: this.hopper, pressProg: this.pressProg, pressCount: this.pressCount, feederT: this.feederT, manualCD: this.manualCD,
      nextId: this.nextId, stats: this.stats, recent: this.recent.filter(([t]) => this.t - t < 300), basket: this.basket, drainT: this.drainT,
      crate: this.crate, settings: this.settings, routeStats: this.routeStats, bestCpm: this.bestCpm, gorgeFinished: this.gorgeFinished,
      lossBySpot: this.lossBySpot, finishTimes: this.finishTimes, lastFinish: this.lastFinish, logs: this.logs.map((l) => l.ph),
      balls,
    };
  }

  load(d) {
    if (!d || d.v !== SAVE_VERSION) return;
    this.t = d.t || 0;
    this.cash = d.cash || 0;
    this.owned = new Set((d.owned || []).filter((id) => UPGRADE_BY_ID[id]));
    this.unlocked = Math.max(1, Math.min(STARTS.length, d.unlocked || 1));
    this.sel = Math.min(this.unlocked - 1, d.sel || 0);
    this.hopper = (d.hopper || []).slice(0, 40);
    this.pressProg = d.pressProg || 0; this.pressCount = d.pressCount || 0;
    this.feederT = d.feederT || 0; this.manualCD = d.manualCD || 0;
    this.nextId = d.nextId || 1;
    Object.assign(this.stats, d.stats || {});
    this.recent = d.recent || [];
    this.basket = d.basket || []; this.drainT = d.drainT || 0; this.crate = d.crate || 0;
    Object.assign(this.settings, d.settings || {});
    if (Array.isArray(d.routeStats) && d.routeStats.length === STARTS.length) this.routeStats = d.routeStats;
    this.bestCpm = d.bestCpm || 0; this.gorgeFinished = !!d.gorgeFinished;
    this.lossBySpot = d.lossBySpot || {};
    this.finishTimes = d.finishTimes || [];
    this.lastFinish = d.lastFinish || null;
    if (Array.isArray(d.logs)) d.logs.forEach((ph, i) => { if (this.logs[i]) this.logs[i].ph = ph; });
    this.sessionStart = this.t - 60; // keep the rate window meaningful after reload
    this.phys.t = this.t;
    this.phys.balls = (d.balls || []).map((o) => {
      const b = makeBall(o.id, o.spec, o.rs);
      Object.assign(b, {
        x: o.x, y: o.y, z: o.z, vx: o.vx, vy: o.vy, vz: o.vz, wx: o.wx, wy: o.wy, wz: o.wz,
        qx: o.q[0], qy: o.q[1], qz: o.q[2], qw: o.q[3], start: o.k, payout: o.pay, cps: o.cps, cpi: o.cpi,
        paid: o.paid, missed: o.missed, wet: o.wet, age: o.age, launchT: o.lt, stallT: o.stall, state: o.st,
        prevS: o.ps, maxS: o.ms, qT: o.qT, wob: o.wob || 0, progS: o.pg,
      });
      const L = this.creek.locate(b.x, b.z, -1, {});
      b.hint = L.idx; b.s = L.s; b.d = L.d;
      return b;
    });
    this.lastLaunch = null;
  }
}
