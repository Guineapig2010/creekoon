// Ball physics: fixed-step rigid spheres rolling, bouncing and floating in the
// creek. Pure JS (no rendering) so it can be run headless for tuning.

import { BALL_R, BALL_M, BF } from './config.js';
import { SURF, MAT } from './creek.js';

const GRAV = 9.81;
const RHO_W = 1000;
const RHO_A = 1.2;
const VOL = (4 / 3) * Math.PI * BALL_R ** 3;
const AREA = Math.PI * BALL_R * BALL_R;
const KI = 0.55; // I = KI m r^2 (pressurised rubber core + felt)
const CD_W = 0.55;
const CD_A = 0.55;

export function ballRand(b) {
  let a = (b.rs = (b.rs + 0x6d2b79f5) >>> 0);
  let t = a;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function makeBall(id, spec, seed) {
  return {
    id, spec,
    x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, wx: 0, wy: 0, wz: 0,
    qx: 0, qy: 0, qz: 0, qw: 1,
    hint: -1, s: 0, d: 0, cr: 0, // cr: 0 = main creek, 1 = Crawfish Springs stream
    rs: seed >>> 0,
    wet: 0, sub: 0, ground: false, groundMat: -1,
    speedAvg: 1, stallT: 0, age: 0,
    wob: 0, airT: 0, lastSplash: -1,
    // game fields filled by Game
    start: 0, site: 0, recipe: 0, payout: 0, cps: [], cpi: 0, state: 'roll', paid: false, maxS: 0,
  };
}

export class PhysicsWorld {
  constructor(creek, springs = null) {
    this.creek = creek;
    this.springs = springs;
    this.loc2 = {};
    this.balls = [];
    this.t = 0;
    this.disabled = new Set(['rootRail', 'splashGuard', 'poolGuide', 'catchRamp', 'spillRail', 'alderBypass', 'landingBoards', 'debrisScreen',
      'willowShield', 'willowFlare', 'slateBumpers', 'leafGrate', 'gateDirect', 'gateCalm', 'splitMergeRail', 'basinBoom', 'spillApron',
      'sluiceToRight', 'sluiceToLeft', 'headGuide', 'headRails', 'habitatBypass']);
    this.extra = []; // chute colliders + dynamic (logs, arm)
    this.matOn = false;
    this.events = [];
    this.loc = {};
    this.bedTmp = {};
    this.flowTmp = {};
    this.windTmp = {};
    this.hash = new Map();
    this.wobbleAmp = (b) => (b.spec & BF.CORES ? 0.08 : 0.32) * (b.recipe === 3 ? 0.35 : b.recipe === 5 ? 0.7 : 1) * (b.gauged ? 0.6 : 1);
  }

  setGroup(group, enabled) {
    if (enabled) this.disabled.delete(group); else this.disabled.add(group);
  }

  step(dt) {
    this.t += dt;
    const balls = this.balls;
    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];
      if (b.state !== 'roll') continue;
      const sp = Math.hypot(b.vx, b.vy, b.vz);
      let n = Math.ceil((sp * dt) / (0.4 * BALL_R));
      if (n < 1) n = 1; else if (n > 14) n = 14;
      const h = dt / n;
      for (let k = 0; k < n; k++) this.stepBall(b, h);
      b.age += dt;
      b.speedAvg += (Math.hypot(b.vx, b.vy, b.vz) - b.speedAvg) * Math.min(1, dt * 2);
    }
    this.ballBall();
  }

  /** Channel a ball is in (the Springs stream hands its balls to the creek at the confluence). */
  creekOf(b) { return b.cr && this.springs ? this.springs : this.creek; }

  stepBall(b, dt) {
    let cr = this.creekOf(b);
    let L = cr.locate(b.x, b.z, b.hint, this.loc);
    if (b.cr && L.s > cr.sMax - 0.6) {
      const L2 = this.creek.locate(b.x, b.z, -1, this.loc2);
      if (Math.abs(L2.d) < 9.6) {
        b.cr = 0; cr = this.creek;
        L = cr.locate(b.x, b.z, L2.idx, this.loc);
        b.prevS = L.s; b.maxS = L.s; b.progS = L.s;
        this.events.push({ type: 'joined', id: b.id });
      }
    }
    b.hint = L.idx; b.s = L.s; b.d = L.d;
    const mass = BALL_M + (b.spec & BF.WATER ? 0.003 : 0.012) * b.wet;

    // ---- water
    const wl = cr.waterLevel(L.s, L.d);
    let sub = 0, V = 0;
    const bottom = b.y - BALL_R;
    if (wl > bottom) {
      sub = Math.min(2 * BALL_R, wl - bottom);
      V = (Math.PI * sub * sub * (3 * BALL_R - sub)) / 3;
    }
    const enteringWater = b.sub <= 0 && sub > 0;
    b.sub = sub;
    const mEff = mass + 0.5 * RHO_W * V;
    let ay = (-mass * GRAV + RHO_W * GRAV * V) / mEff;
    b.vy += ay * dt;

    if (sub > 0) {
      const fl = cr.flowAt(L.s, L.d, b.y, this.t, L.tx, L.tz, this.flowTmp);
      if (enteringWater && b.vy < -0.6) {
        this.events.push({ type: 'splash', x: b.x, y: wl, z: b.z, v: -b.vy, id: b.id });
        b.lastSplash = this.t;
      }
      // projected submerged area (circular segment)
      const rr = BALL_R, hh = Math.min(sub, 2 * rr - 1e-6);
      const A = rr * rr * Math.acos((rr - hh) / rr) - (rr - hh) * Math.sqrt(Math.max(0, 2 * rr * hh - hh * hh));
      // Rapids Felt: its rough finish drags more in slow, calm pools
      const cdx = b.recipe === 4 && Math.hypot(fl.vx, fl.vz) < 0.45 ? 1.25 : 1;
      const k = (0.5 * RHO_W * CD_W * cdx * A) / mEff;
      let rx = b.vx - fl.vx, ry = b.vy - fl.vy, rz = b.vz - fl.vz;
      const rm = Math.hypot(rx, ry, rz);
      const f = 1 / (1 + k * rm * dt);
      // heave damping (wave radiation) keeps bobbing believable
      const heave = 1 / (1 + 6 * (sub / (2 * rr)) * dt);
      rx *= f; ry *= f * heave; rz *= f;
      b.vx = rx + fl.vx; b.vy = ry + fl.vy; b.vz = rz + fl.vz;
      // water slows spin and gently rolls floating balls along with the surface
      const frac = V / VOL;
      const spinD = Math.exp(-3.5 * frac * dt);
      b.wx *= spinD; b.wy *= spinD; b.wz *= spinD;
      if (!b.ground) {
        const tgx = b.vz / rr * 0.35, tgz = -b.vx / rr * 0.35;
        const a = 1 - Math.exp(-2 * frac * dt);
        b.wx += (tgx - b.wx) * a; b.wz += (tgz - b.wz) * a;
      }
      b.wet = Math.min(1, b.wet + dt * frac * (b.spec & BF.WATER ? 0.08 : 0.32) * (b.recipe === 1 ? 0.45 : 1));
      b.airT = 0;
    } else {
      // air drag relative to the wind (Folk Draft at the Shelf)
      const w = cr.windAt(L.s, L.d, b.y, this.t, this.windTmp);
      const rx = b.vx - w.vx, ry = b.vy - w.vy, rz = b.vz - w.vz;
      const rm = Math.hypot(rx, ry, rz);
      const k = (0.5 * RHO_A * CD_A * AREA) / mass;
      b.vx -= k * rm * rx * dt; b.vy -= k * rm * ry * dt; b.vz -= k * rm * rz * dt;
      b.wet = Math.max(0, b.wet - dt * 0.004);
      if (!b.ground) b.airT += dt;
    }

    // ---- low-speed wobble from imperfect roundness
    if (b.ground) {
      const hs = Math.hypot(b.vx, b.vz);
      if (hs < 0.5 && hs > 0.005) {
        b.wob += (hs * dt) / BALL_R;
        const amp = this.wobbleAmp(b) * (1 - hs / 0.5);
        const a = amp * Math.sin(b.wob * 1.0 + (b.id % 7));
        b.vx += (-b.vz / hs) * a * dt; b.vz += (b.vx / hs) * a * dt;
      }
    }

    // ---- integrate position
    b.x += b.vx * dt; b.y += b.vy * dt; b.z += b.vz * dt;

    // ---- collisions
    b.ground = false;
    this.collideBed(b, dt, mass, L);
    const cell = cr.cellList(b.x, b.z);
    if (cell) {
      const cols = cr.colliders;
      for (let i = 0; i < cell.length; i++) {
        const c = cols[cell[i]];
        if (c.group && this.disabled.has(c.group)) continue;
        this.collide(b, c, dt, mass);
      }
    }
    const ex = this.extra;
    for (let i = 0; i < ex.length; i++) {
      const c = ex[i];
      if (c.off) continue;
      const dx = b.x - c.bcx, dz = b.z - c.bcz;
      if (dx * dx + dz * dz > c.br * c.br) continue;
      this.collide(b, c, dt, mass);
    }

    // ---- orientation
    const wm = Math.hypot(b.wx, b.wy, b.wz);
    if (wm > 1e-6) {
      const ang = wm * dt * 0.5;
      const sn = Math.sin(ang) / wm, cs = Math.cos(ang);
      const ax = b.wx * sn, ay2 = b.wy * sn, az = b.wz * sn;
      const { qx, qy, qz, qw } = b;
      b.qx = cs * qx + ax * qw + ay2 * qz - az * qy;
      b.qy = cs * qy - ax * qz + ay2 * qw + az * qx;
      b.qz = cs * qz + ax * qy - ay2 * qx + az * qw;
      b.qw = cs * qw - ax * qx - ay2 * qy - az * qz;
      const ql = Math.hypot(b.qx, b.qy, b.qz, b.qw);
      b.qx /= ql; b.qy /= ql; b.qz /= ql; b.qw /= ql;
    }
  }

  collideBed(b, dt, mass, L) {
    const cr = this.creekOf(b);
    const loc = cr.locate(b.x, b.z, b.hint, this.loc);
    const B = cr.bedAt(loc.s, loc.d, this.bedTmp);
    const tx = loc.tx, tz = loc.tz, nx0 = -tz, nz0 = tx;
    const sc = 1 / Math.max(0.3, 1 - loc.kap * loc.d);
    const gx = B.hs * sc * tx + B.hd * nx0, gz = B.hs * sc * tz + B.hd * nz0;
    const inv = 1 / Math.sqrt(gx * gx + gz * gz + 1);
    const nx = -gx * inv, ny = inv, nz = -gz * inv;
    let h = B.h, mat = B.mat;
    if (this.matOn && loc.s > cr.roughPatch.s0 - 0.05 && loc.s < cr.roughPatch.s1 + 0.05 && cr.inChannel(loc.s, loc.d, -0.04)) {
      h = cr.matH(loc.s, loc.d); mat = MAT.MAT;
    }
    const dist = (b.y - h) * ny;
    const pen = BALL_R - dist;
    if (pen > 0) this.contact(b, nx, ny, nz, pen, mat, dt, mass, true);
    void L;
  }

  collide(b, c, dt, mass) {
    let nx, ny, nz, dist, rad;
    if (c.type === 0) {
      nx = b.x - c.x; ny = b.y - c.y; nz = b.z - c.z;
      dist = Math.hypot(nx, ny, nz);
      rad = c.r + BALL_R;
      if (dist >= rad || dist < 1e-9) return;
      nx /= dist; ny /= dist; nz /= dist;
      this.contact(b, nx, ny, nz, rad - dist, c.mat, dt, mass, false);
    } else if (c.type === 1) {
      const ex = c.bx - c.ax, ey = c.by - c.ay, ez = c.bz - c.az;
      let t = ((b.x - c.ax) * ex + (b.y - c.ay) * ey + (b.z - c.az) * ez) / (ex * ex + ey * ey + ez * ez);
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      nx = b.x - (c.ax + ex * t); ny = b.y - (c.ay + ey * t); nz = b.z - (c.az + ez * t);
      dist = Math.hypot(nx, ny, nz);
      rad = c.r + BALL_R;
      if (dist >= rad || dist < 1e-9) return;
      nx /= dist; ny /= dist; nz /= dist;
      this.contact(b, nx, ny, nz, rad - dist, c.mat, dt, mass, false);
    } else {
      const px = b.x - c.cx, py = b.y - c.cy, pz = b.z - c.cz;
      const A = c.ax, Bv = c.ay, C = c.az, h = c.h;
      const lx = px * A[0] + py * A[1] + pz * A[2];
      const ly = px * Bv[0] + py * Bv[1] + pz * Bv[2];
      const lz = px * C[0] + py * C[1] + pz * C[2];
      const qx = lx < -h[0] ? -h[0] : lx > h[0] ? h[0] : lx;
      const qy = ly < -h[1] ? -h[1] : ly > h[1] ? h[1] : ly;
      const qz = lz < -h[2] ? -h[2] : lz > h[2] ? h[2] : lz;
      let dx = lx - qx, dy = ly - qy, dz = lz - qz;
      let d2 = dx * dx + dy * dy + dz * dz;
      let pen;
      if (d2 > 1e-12) {
        dist = Math.sqrt(d2);
        if (dist >= BALL_R) return;
        dx /= dist; dy /= dist; dz /= dist;
        pen = BALL_R - dist;
      } else {
        // centre inside: push out through nearest face (floors push up)
        const fx = h[0] - Math.abs(lx), fy = h[1] - Math.abs(ly), fz = h[2] - Math.abs(lz);
        dx = 0; dy = 0; dz = 0;
        if (fy <= fx && fy <= fz) { dy = ly >= 0 ? 1 : -1; pen = fy + BALL_R; }
        else if (fz <= fx) { dz = lz >= 0 ? 1 : -1; pen = fz + BALL_R; }
        else { dx = lx >= 0 ? 1 : -1; pen = fx + BALL_R; }
      }
      nx = dx * A[0] + dy * Bv[0] + dz * C[0];
      ny = dx * A[1] + dy * Bv[1] + dz * C[1];
      nz = dx * A[2] + dy * Bv[2] + dz * C[2];
      this.contact(b, nx, ny, nz, pen, c.mat, dt, mass, false, c);
    }
  }

  contact(b, nx, ny, nz, pen, mat, dt, mass, isBed, col) {
    const S = SURF[mat] || SURF[1];
    b.x += nx * pen; b.y += ny * pen; b.z += nz * pen;
    if (ny > 0.35) { b.ground = true; b.groundMat = mat; }
    let vn = b.vx * nx + b.vy * ny + b.vz * nz;
    let jn = 0;
    if (col && col.vx !== undefined) {
      // moving collider (logs / clearing arm)
      const cvn = col.vx * nx + col.vy * ny + col.vz * nz;
      vn -= cvn;
    }
    if (vn < 0) {
      let e = 0;
      const imp = -vn;
      if (imp > 0.22) {
        const hard = imp > 2.0;
        const spread = b.spec & BF.REINFORCED ? 0.03 : 0.13;
        let eb = 0.76;
        if (hard) eb += spread * (ballRand(b) * 2 - 1);
        if (hard && b.recipe === 2) eb *= 0.82; // Soft-Core soaks up hard bounces
        e = Math.min(0.92, Math.sqrt(eb * S.e / 0.72) * 0.86) * (1 - 0.35 * b.wet);
        if (b.sub > BALL_R) e *= 0.35;
        if (imp > 0.5) this.events.push({ type: 'hit', mat, v: imp, x: b.x, y: b.y, z: b.z, id: b.id });
        // seam / felt irregularities scatter hard bounces a little
        if (hard) {
          const sc = (b.spec & BF.SEAM ? 0.04 : 0.1) * Math.min(1, imp / 5);
          const r1 = (ballRand(b) - 0.5) * sc * imp, r2 = (ballRand(b) - 0.5) * sc * imp;
          // tangent basis
          let tx = -nz, tz = nx; const tl = Math.hypot(tx, tz) || 1; tx /= tl; tz /= tl;
          b.vx += tx * r1; b.vz += tz * r1; b.vy += r2 * 0.3;
        }
      }
      jn = -(1 + e) * vn * mass;
      b.vx += (nx * jn) / mass; b.vy += (ny * jn) / mass; b.vz += (nz * jn) / mass;
      if (isBed && S.bump > 0 && imp > 0.3) {
        // uneven bed: small random kick
        const kb = S.bump * imp;
        b.vx += (ballRand(b) - 0.5) * kb; b.vz += (ballRand(b) - 0.5) * kb;
      }
    }
    // support impulse estimate for friction (buoyancy lightens the load)
    const buoyFrac = Math.min(1, ((Math.PI * b.sub * b.sub * (3 * BALL_R - b.sub)) / 3) * RHO_W / mass);
    const load = Math.max(0, 1 - buoyFrac) * mass * GRAV * Math.max(0, ny) * dt;
    const jf = Math.max(jn, load);
    // contact point velocity: v + w x (-r n)
    const r = BALL_R;
    const cx = b.vx + (b.wy * -nz * r - b.wz * -ny * r);
    const cy = b.vy + (b.wz * -nx * r - b.wx * -nz * r);
    const cz = b.vz + (b.wx * -ny * r - b.wy * -nx * r);
    const cn = cx * nx + cy * ny + cz * nz;
    let tx = cx - cn * nx, ty = cy - cn * ny, tz = cz - cn * nz;
    const tm = Math.hypot(tx, ty, tz);
    if (tm > 1e-6) {
      tx /= tm; ty /= tm; tz /= tm;
      const need = (tm * mass) / (1 + 1 / KI);
      let mu = S.mu;
      if (b.recipe === 1 && mat === MAT.WOOD && b.sub <= 0) mu *= 0.85; // Dry-Weave: less grip on dry wood
      if (b.recipe === 4 && mat === MAT.ROCK && b.wet > 0.25) mu *= 1.25; // Rapids Felt: traction on wet rock
      const jt = Math.min(need, mu * jf);
      b.vx -= (tx * jt) / mass; b.vy -= (ty * jt) / mass; b.vz -= (tz * jt) / mass;
      const I = KI * mass * r * r;
      const k = (r * jt) / I;
      // w += k (n x t)
      b.wx += k * (ny * tz - nz * ty);
      b.wy += k * (nz * tx - nx * tz);
      b.wz += k * (nx * ty - ny * tx);
    }
    // rolling resistance
    if (load > 0) {
      let crr = S.crr;
      if (mat === MAT.GRAVEL) {
        // patchy gravel: random slowdowns
        const n = Math.sin(b.x * 37.1 + b.z * 11.3) * Math.sin(b.z * 29.7 - b.x * 7.9);
        crr *= 1 + 2.2 * Math.max(0, n);
        if (b.s > this.creekOf(b).roughPatch.s0 && b.s < this.creekOf(b).roughPatch.s1) crr *= 2.5;
      }
      crr *= 1 + 0.6 * b.wet;
      if (b.recipe === 2 && b.sub < BALL_R * 0.5) crr *= 1.2; // Soft-Core rolls slower through shallow dry stretches
      const vtx = b.vx - (b.vx * nx + b.vy * ny + b.vz * nz) * nx;
      const vty = b.vy - (b.vx * nx + b.vy * ny + b.vz * nz) * ny;
      const vtz = b.vz - (b.vx * nx + b.vy * ny + b.vz * nz) * nz;
      const vt = Math.hypot(vtx, vty, vtz);
      if (vt > 1e-5) {
        const dv = Math.min(vt, (crr * load) / mass);
        const f = dv / vt;
        b.vx -= vtx * f; b.vy -= vty * f; b.vz -= vtz * f;
        const wf = 1 - Math.min(1, dv / Math.max(vt, 1e-4));
        b.wx *= wf; b.wy *= wf; b.wz *= wf;
      }
    }
  }

  ballBall() {
    const balls = this.balls;
    const H = this.hash;
    H.clear();
    const cs = 0.09;
    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];
      if (b.state !== 'roll') continue;
      const key = Math.floor(b.x / cs) * 73856093 ^ Math.floor(b.z / cs) * 19349663;
      let a = H.get(key);
      if (!a) { a = []; H.set(key, a); }
      a.push(b);
    }
    const r2 = 4 * BALL_R * BALL_R;
    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];
      if (b.state !== 'roll') continue;
      const ix = Math.floor(b.x / cs), iz = Math.floor(b.z / cs);
      for (let ox = -1; ox <= 1; ox++) for (let oz = -1; oz <= 1; oz++) {
        const a = H.get(((ix + ox) * 73856093) ^ ((iz + oz) * 19349663));
        if (!a) continue;
        for (let k = 0; k < a.length; k++) {
          const o = a[k];
          if (o.id <= b.id) continue;
          let dx = o.x - b.x, dy = o.y - b.y, dz = o.z - b.z;
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 >= r2 || d2 < 1e-12) continue;
          const d = Math.sqrt(d2);
          dx /= d; dy /= d; dz /= d;
          const pen = 2 * BALL_R - d;
          b.x -= dx * pen * 0.5; b.y -= dy * pen * 0.5; b.z -= dz * pen * 0.5;
          o.x += dx * pen * 0.5; o.y += dy * pen * 0.5; o.z += dz * pen * 0.5;
          const vn = (o.vx - b.vx) * dx + (o.vy - b.vy) * dy + (o.vz - b.vz) * dz;
          if (vn < 0) {
            const j = (-(1 + 0.55) * vn) / 2;
            b.vx -= dx * j; b.vy -= dy * j; b.vz -= dz * j;
            o.vx += dx * j; o.vy += dy * j; o.vz += dz * j;
            if (-vn > 0.25) this.events.push({ type: 'bump', v: -vn, x: (b.x + o.x) / 2, y: (b.y + o.y) / 2, z: (b.z + o.z) / 2 });
          }
        }
      }
    }
  }
}
