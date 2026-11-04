// The creek: one continuous downhill channel from the Upper Gorge to the
// permanent finish gate. Geometry lives in channel coordinates (s, d):
//   s = metres downstream along the valley centreline, d = metres to the right.
// Everything (bed height, water level, flow field, colliders, render meshes)
// is derived from this one description so physics matches what is drawn.

import { fbm, vnoise, clamp, lerp, smoothstep, mulberry32 } from './noise.js';
import { STARTS, S_FINISH, S_BASKET, BALL_R } from './config.js';

export const S_MIN = -5;
export const S_MAX = 108;
export const D_MIN = -10;
export const D_MAX = 10;
export const DS = 0.05; // bed grid spacing along s
export const DD = 0.04; // bed grid spacing across
export const DS_C = 0.25; // centreline sample spacing

export const MAT = { GRAVEL: 0, ROCK: 1, SAND: 2, DIRT: 3, MAT: 4, WOOD: 5, METAL: 6, RUBBER: 7 };
// restitution, friction, rolling resistance coefficient, bump amplitude (normal jitter)
export const SURF = [
  { e: 0.42, mu: 0.6, crr: 0.05, bump: 0.05, name: 'gravel' },
  { e: 0.72, mu: 0.5, crr: 0.015, bump: 0.015, name: 'rock' },
  { e: 0.28, mu: 0.7, crr: 0.08, bump: 0.008, name: 'sand' },
  { e: 0.32, mu: 0.8, crr: 0.1, bump: 0.03, name: 'dirt' },
  { e: 0.4, mu: 0.55, crr: 0.006, bump: 0, name: 'mat' },
  { e: 0.55, mu: 0.4, crr: 0.012, bump: 0.004, name: 'wood' },
  { e: 0.6, mu: 0.3, crr: 0.008, bump: 0, name: 'metal' },
  { e: 0.35, mu: 0.6, crr: 0.02, bump: 0, name: 'rubber' },
];

const G = MAT.GRAVEL, R = MAT.ROCK, S = MAT.SAND, D = MAT.DIRT;

// Channel key frames:
// s, wL, wR, depth, centre offset c, surface speed U, bankL, bankR, bankW, roughness, turbulence, bedMat, bankMat
const K = [
  [-5, 0.36, 0.36, 0.11, 0, 1.2, 1.3, 1.3, 0.45, 0.03, 0.08, R, R],
  [0, 0.34, 0.34, 0.11, 0, 1.35, 1.25, 1.25, 0.45, 0.03, 0.1, R, R],
  [8.9, 0.28, 0.28, 0.09, 0, 1.7, 1.2, 1.2, 0.45, 0.025, 0.12, R, R],
  [9.1, 0.5, 0.5, 0.36, 0, 0.9, 1.0, 0.22, 0.12, 0.02, 0.25, R, R],
  [10.6, 0.5, 0.45, 0.3, 0.05, 1.0, 1.0, 0.4, 0.3, 0.02, 0.18, R, R],
  [11.6, 0.33, 0.33, 0.12, 0.1, 1.5, 1.1, 1.1, 0.45, 0.03, 0.12, R, R],
  [19.9, 0.28, 0.28, 0.09, 0, 1.75, 1.2, 1.2, 0.45, 0.025, 0.12, R, R],
  [20.1, 0.48, 0.48, 0.34, 0, 0.9, 1.0, 1.0, 0.5, 0.02, 0.25, R, R],
  [21.4, 0.42, 0.42, 0.25, 0, 1.1, 1.0, 1.0, 0.5, 0.02, 0.2, R, R],
  [22.4, 0.27, 0.27, 0.11, 0, 1.95, 1.1, 1.1, 0.45, 0.04, 0.38, R, R],
  [29.5, 0.29, 0.29, 0.12, 0, 1.8, 1.0, 1.0, 0.45, 0.035, 0.32, R, R],
  [33.0, 0.38, 0.38, 0.15, 0, 1.15, 0.6, 0.6, 0.8, 0.02, 0.12, R, D],
  // Alder Bend
  [34.5, 0.42, 0.42, 0.17, 0, 2.16, 0.45, 0.45, 0.9, 0.012, 0.08, G, D],
  [38.0, 0.48, 0.55, 0.24, 0.9, 1.93, 0.42, 0.6, 0.9, 0.012, 0.08, G, D],
  [41.5, 0.45, 0.5, 0.2, 0.6, 2.05, 0.42, 0.5, 0.9, 0.012, 0.08, G, D],
  [44.2, 0.62, 0.68, 0.18, 0.05, 1.87, 0.4, 0.42, 0.9, 0.012, 0.08, G, D],
  [45.6, 0.78, 1.05, 0.18, -0.1, 1.73, 0.4, 0.42, 0.9, 0.012, 0.08, G, D],
  [46.7, 0.8, 1.3, 0.18, -0.1, 1.64, 0.42, 0.42, 0.9, 0.012, 0.08, G, D],
  [48.0, 0.75, 1.0, 0.18, -0.2, 1.77, 0.42, 0.42, 0.9, 0.012, 0.08, G, D],
  [50.2, 0.48, 0.48, 0.2, -0.3, 2.00, 0.42, 0.42, 0.9, 0.012, 0.08, G, D],
  [53.0, 0.45, 0.45, 0.2, 0, 2.00, 0.4, 0.4, 0.9, 0.012, 0.08, G, D],
  // Crawfish Springs
  [54.6, 0.62, 0.62, 0.3, 0, 1.08, 0.35, 0.35, 1.2, 0.01, 0.08, S, D],
  [55.8, 0.98, 0.98, 0.55, 0.2, 0.8, 0.35, 0.35, 1.2, 0.01, 0.1, S, D],
  [61.0, 0.92, 0.92, 0.5, 0.1, 0.85, 0.38, 0.38, 1.2, 0.01, 0.1, S, D],
  [62.3, 0.4, 0.4, 0.2, 0, 0.85, 0.5, 0.5, 0.5, 0.02, 0.12, R, R],
  [62.9, 0.12, 0.12, 0.1, 0.1, 1.55, 0.6, 0.6, 0.35, 0.02, 0.18, R, R],
  [66.4, 0.12, 0.12, 0.1, 1.2, 1.6, 0.6, 0.6, 0.35, 0.02, 0.18, R, R],
  [67.3, 0.27, 0.27, 0.09, 2.0, 1.2, 0.5, 0.9, 0.4, 0.02, 0.12, R, R],
  // Continental Shelf
  [68.0, 0.27, 0.27, 0.075, 2.0, 1.0, -1.25, 1.5, 0.16, 0.012, 0.08, R, R],
  [76.0, 0.26, 0.26, 0.07, 2.2, 1.0, -1.25, 1.5, 0.16, 0.012, 0.08, R, R],
  [77.9, 0.26, 0.26, 0.07, 1.6, 1.15, -1.25, 1.4, 0.16, 0.012, 0.1, R, R],
  [78.3, 0.28, 0.28, 0.07, 1.4, 1.2, -1.25, 1.4, 0.16, 0.012, 0.1, R, R],
  [78.7, 0.36, 0.36, 0.17, 1.25, 1.0, 0.35, 0.45, 0.4, 0.02, 0.2, R, R],
  [79.6, 0.3, 0.3, 0.14, 0.75, 1.6, 0.45, 0.5, 0.4, 0.025, 0.15, R, R],
  // Waterfall Run
  [80.7, 0.28, 0.28, 0.14, 0.2, 1.8, 0.45, 0.5, 0.4, 0.025, 0.15, R, R],
  [85.25, 0.25, 0.25, 0.12, 0, 2.05, 0.5, 0.5, 0.4, 0.02, 0.12, R, R],
  [85.55, 0.25, 0.25, 0.12, 0, 2.1, 0.5, 0.5, 0.4, 0.02, 0.12, R, R],
  [85.9, 0.25, 0.25, 0.12, 0, 2.1, 0.5, 0.5, 0.4, 0.02, 0.12, R, R],
  [86.1, 0.42, 0.42, 0.9, 0, 0.6, 0.14, 0.14, 0.06, 0.015, 0.3, S, S],
  [86.9, 0.5, 0.5, 0.8, 0, 0.6, 0.18, 0.18, 0.08, 0.015, 0.25, S, S],
  [87.6, 0.65, 0.65, 0.7, 0, 0.62, 1.0, 1.0, 0.4, 0.015, 0.22, S, R],
  [88.6, 0.8, 0.98, 0.45, 0, 0.8, 1.0, 0.8, 0.5, 0.015, 0.14, S, R],
  [90.5, 0.42, 0.42, 0.18, 0, 1.35, 0.4, 0.4, 0.8, 0.012, 0.08, G, D],
  // Old Rolling Grounds
  [92.0, 0.4, 0.42, 0.06, 0, 1.74, 0.26, 0.3, 0.8, 0.01, 0.08, G, D],
  [93.6, 0.42, 0.45, 0.055, 0.15, 1.74, 0.26, 0.28, 0.8, 0.01, 0.08, G, D],
  [95.3, 0.48, 0.42, 0.05, 0.55, 1.79, 0.26, 0.3, 0.8, 0.012, 0.08, G, D],
  [97.0, 0.42, 0.42, 0.06, 0.2, 1.85, 0.26, 0.28, 0.8, 0.01, 0.08, G, D],
  [98.5, 0.36, 0.36, 0.08, 0, 1.5, 0.25, 0.25, 0.8, 0.008, 0.06, G, D],
  [99.6, 0.42, 0.42, 0.14, 0, 0.55, 0.25, 0.25, 0.8, 0.008, 0.04, G, D],
  [108, 0.45, 0.45, 0.18, 0, 0.5, 0.25, 0.25, 0.8, 0.008, 0.04, G, D],
];

const SLOPES = [
  [-5, 0.045], [34, 0.012], [54, 0.003], [62.3, 0.11], [67.6, 0.02], [79.0, 0.06],
  [86, 0.0], [90, 0.035], [92, 0.035], [108, 0.02],
];
// Steps: centre s, drop height, transition length
export const STEPS = [
  { s: 9.0, h: 1.1, len: 0.1, name: 'gorge1' },
  { s: 20.0, h: 0.9, len: 0.1, name: 'gorge2' },
  { s: 78.45, h: 1.3, len: 0.16, name: 'shelf' },
  { s: 86.0, h: 2.3, len: 0.1, name: 'waterfall' },
];

// Plunge pools below drops: start s, length, half width of the jet/roller zone
const POOLS = [
  { s: 86.0, len: 1.45, w: 0.62, jet: 0.9, jetDepth: 0.32, under: 0.55, boil: 0.35 },
  { s: 9.0, len: 0.6, w: 0.35, jet: 0.6, jetDepth: 0.22, under: 0.5, boil: 0.25 },
  { s: 20.0, len: 0.6, w: 0.35, jet: 0.6, jetDepth: 0.22, under: 0.5, boil: 0.25 },
];

function interpKeys(s, out) {
  let i = 0;
  while (i < K.length - 2 && K[i + 1][0] <= s) i++;
  const a = K[i], b = K[i + 1];
  const t = smoothstep(a[0], b[0], s);
  out.wL = lerp(a[1], b[1], t);
  out.wR = lerp(a[2], b[2], t);
  out.D = lerp(a[3], b[3], t);
  out.c = lerp(a[4], b[4], t);
  out.U = lerp(a[5], b[5], t);
  out.bankL = lerp(a[6], b[6], t);
  out.bankR = lerp(a[7], b[7], t);
  out.bankW = lerp(a[8], b[8], t);
  out.rough = lerp(a[9], b[9], t);
  out.turb = lerp(a[10], b[10], t);
  out.bedMat = t < 0.5 ? a[11] : b[11];
  out.bankMat = t < 0.5 ? a[12] : b[12];
  return out;
}

function valleyX(z) {
  return 3.6 * Math.sin((2 * Math.PI * (z + 18)) / 66) + 1.2 * Math.sin((2 * Math.PI * (z - 5)) / 41);
}

export class Creek {
  constructor() {
    this.buildCentreline();
    this.buildRows();
    this.buildFeatures();
    this.bakeBed();
    this.buildRocks();
    this.bakeFlow();
    this.buildColliders();
  }

  // ---------------------------------------------------------------- centreline
  buildCentreline() {
    // Integrate arc length of x = valleyX(z) with z increasing downstream, s = S_FINISH at z = 0.
    const dz = 0.005;
    const zs = [], ss = [];
    let s = 0, z = -140, px = valleyX(z);
    const arr = [];
    for (; z <= 30; z += dz) {
      const x = valleyX(z);
      if (arr.length) s += Math.hypot(x - px, dz);
      arr.push([z, s]);
      px = x;
    }
    // find s at z=0
    let s0 = 0;
    for (const [zz, ss2] of arr) if (zz >= 0) { s0 = ss2; break; }
    for (const [zz, ss2] of arr) { zs.push(zz); ss.push(ss2 - s0 + S_FINISH); }
    const n = Math.round((S_MAX - S_MIN) / DS_C) + 1;
    this.nC = n;
    this.cx = new Float64Array(n); this.cz = new Float64Array(n);
    this.tx = new Float64Array(n); this.tz = new Float64Array(n);
    this.kap = new Float64Array(n);
    let j = 0;
    for (let i = 0; i < n; i++) {
      const st = S_MIN + i * DS_C;
      while (j < ss.length - 2 && ss[j + 1] < st) j++;
      const t = (st - ss[j]) / (ss[j + 1] - ss[j]);
      const zz = lerp(zs[j], zs[j + 1], t);
      this.cz[i] = zz; this.cx[i] = valleyX(zz);
    }
    for (let i = 0; i < n; i++) {
      const a = Math.max(0, i - 1), b = Math.min(n - 1, i + 1);
      let dx = this.cx[b] - this.cx[a], dzz = this.cz[b] - this.cz[a];
      const l = Math.hypot(dx, dzz);
      this.tx[i] = dx / l; this.tz[i] = dzz / l;
    }
    for (let i = 0; i < n; i++) {
      const a = Math.max(0, i - 1), b = Math.min(n - 1, i + 1);
      // signed curvature: positive when turning right (towards +d)
      const crossv = this.tx[a] * this.tz[b] - this.tz[a] * this.tx[b];
      this.kap[i] = crossv / ((b - a) * DS_C);
    }
  }

  /** World position of channel coordinate (s, d). Writes {x, z}. */
  worldXZ(s, d, out = {}) {
    let f = (s - S_MIN) / DS_C;
    f = clamp(f, 0, this.nC - 1.0001);
    const i = Math.floor(f), t = f - i;
    const x = lerp(this.cx[i], this.cx[i + 1], t), z = lerp(this.cz[i], this.cz[i + 1], t);
    let tx = lerp(this.tx[i], this.tx[i + 1], t), tz = lerp(this.tz[i], this.tz[i + 1], t);
    const l = Math.hypot(tx, tz); tx /= l; tz /= l;
    // right normal = (-tz, tx)
    out.x = x - tz * d; out.z = z + tx * d;
    return out;
  }

  /** Tangent / right normal at s. */
  frame(s, out = {}) {
    let f = clamp((s - S_MIN) / DS_C, 0, this.nC - 1.0001);
    const i = Math.floor(f), t = f - i;
    let tx = lerp(this.tx[i], this.tx[i + 1], t), tz = lerp(this.tz[i], this.tz[i + 1], t);
    const l = Math.hypot(tx, tz); tx /= l; tz /= l;
    out.tx = tx; out.tz = tz; out.nx = -tz; out.nz = tx;
    out.kap = lerp(this.kap[i], this.kap[i + 1], t);
    return out;
  }

  /**
   * Channel coordinates for a world point. `hint` is a centreline index from
   * a previous call (balls keep it), -1 for a global search.
   * Writes s, d, idx into out.
   */
  locate(x, z, hint, out) {
    let lo, hi;
    if (hint < 0) { lo = 0; hi = this.nC - 2; } else { lo = Math.max(0, hint - 3); hi = Math.min(this.nC - 2, hint + 3); }
    let best = Infinity, bi = 0, bt = 0;
    for (let i = lo; i <= hi; i++) {
      const ax = this.cx[i], az = this.cz[i];
      const ex = this.cx[i + 1] - ax, ez = this.cz[i + 1] - az;
      let t = ((x - ax) * ex + (z - az) * ez) / (ex * ex + ez * ez);
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const px = ax + ex * t - x, pz = az + ez * t - z;
      const d2 = px * px + pz * pz;
      if (d2 < best) { best = d2; bi = i; bt = t; }
    }
    if (hint >= 0 && (bi === lo || bi === hi) && lo > 0 && hi < this.nC - 2) {
      // walked off the window: recentre once
      return this.locate(x, z, bi, out);
    }
    const ax = this.cx[bi], az = this.cz[bi];
    const px = ax + (this.cx[bi + 1] - ax) * bt, pz = az + (this.cz[bi + 1] - az) * bt;
    let tx = lerp(this.tx[bi], this.tx[bi + 1], bt), tz = lerp(this.tz[bi], this.tz[bi + 1], bt);
    const l = Math.hypot(tx, tz); tx /= l; tz /= l;
    out.s = S_MIN + (bi + bt) * DS_C + ((x - px) * tx + (z - pz) * tz);
    out.d = (x - px) * -tz + (z - pz) * tx;
    out.idx = bi;
    out.tx = tx; out.tz = tz;
    out.kap = lerp(this.kap[bi], this.kap[bi + 1], bt);
    return out;
  }

  // ---------------------------------------------------------------- rows
  buildRows() {
    const n = Math.round((S_MAX - S_MIN) / DS) + 1;
    this.nS = n;
    const f = () => new Float32Array(n);
    this.rY0 = f(); this.rC = f(); this.rWL = f(); this.rWR = f(); this.rD = f(); this.rU = f();
    this.rBankL = f(); this.rBankR = f(); this.rBankW = f(); this.rRough = f(); this.rTurb = f();
    this.rBedMat = new Uint8Array(n); this.rBankMat = new Uint8Array(n);
    this.rFoam = f(); this.rY0s = f(); this.rDcds = f();
    const tmp = {};
    // elevation profile: integrate slopes + steps downstream
    let y = 0;
    const yArr = new Float64Array(n);
    for (let i = 0; i < n; i++) {
      const s = S_MIN + i * DS;
      if (i > 0) {
        let sl = 0;
        for (const [ss, v] of SLOPES) if (s >= ss) sl = v;
        y -= sl * DS;
      }
      yArr[i] = y;
    }
    const stepAt = (s) => {
      let drop = 0;
      for (const st of STEPS) drop += st.h * smoothstep(st.s - st.len / 2, st.s + st.len / 2, s);
      return drop;
    };
    for (let i = 0; i < n; i++) yArr[i] -= stepAt(S_MIN + i * DS);
    const iF = Math.round((S_FINISH - S_MIN) / DS);
    const off = -yArr[iF];
    for (let i = 0; i < n; i++) {
      const s = S_MIN + i * DS;
      interpKeys(s, tmp);
      this.rY0[i] = yArr[i] + off;
      this.rC[i] = tmp.c; this.rWL[i] = tmp.wL; this.rWR[i] = tmp.wR; this.rD[i] = tmp.D; this.rU[i] = tmp.U;
      this.rBankL[i] = tmp.bankL; this.rBankR[i] = tmp.bankR; this.rBankW[i] = tmp.bankW;
      this.rRough[i] = tmp.rough; this.rTurb[i] = tmp.turb;
      this.rBedMat[i] = tmp.bedMat; this.rBankMat[i] = tmp.bankMat;
    }
    // smoothed elevation for the far valley sides
    const W = Math.round(5 / DS);
    for (let i = 0; i < n; i++) {
      let sum = 0, cnt = 0;
      for (let k = -W; k <= W; k += 4) { const j = clamp(i + k, 0, n - 1); sum += this.rY0[j]; cnt++; }
      this.rY0s[i] = sum / cnt;
    }
    for (let i = 0; i < n; i++) {
      const a = Math.max(0, i - 2), b = Math.min(n - 1, i + 2);
      this.rDcds[i] = (this.rC[b] - this.rC[a]) / ((b - a) * DS);
    }
    // whitewater / foam intensity along s
    for (let i = 0; i < n; i++) {
      const s = S_MIN + i * DS;
      let fo = clamp((this.rTurb[i] - 0.1) * 2.5, 0, 1);
      for (const st of STEPS) {
        const ds = s - st.s;
        if (ds > -0.15 && ds < 2.2) fo = Math.max(fo, (ds < 0 ? 0.5 : 1) * Math.exp(-Math.max(0, ds) / (0.5 + st.h * 0.4)));
      }
      this.rFoam[i] = fo;
    }
  }

  rowIndex(s) { return clamp((s - S_MIN) / DS, 0, this.nS - 1.0001); }
  row(arr, s) { const f = this.rowIndex(s); const i = f | 0; const t = f - i; return arr[i] + (arr[i + 1] - arr[i]) * t; }
  y0(s) { return this.row(this.rY0, s); }
  c(s) { return this.row(this.rC, s); }
  wL(s) { return this.row(this.rWL, s); }
  wR(s) { return this.row(this.rWR, s); }

  // ---------------------------------------------------------------- features
  buildFeatures() {
    this.pads = STARTS.map((st, k) => {
      const s = st.s;
      const c = this.c(s), wR = this.wR(s), y0 = this.y0(s);
      const pad = { k, s0: s - 1.55, s1: s + 0.35, d0: c + wR + 0.3, d1: c + wR + 1.8, y: y0 + 0.27, sC: s - 0.6, dC: c + wR + 1.05 };
      // chute polyline in channel coords: release on the bench, kink over the water's edge, exit in the shallows
      pad.chute = [
        { s: s - 0.62, d: c + wR + 0.75, y: pad.y + 0.56 },
        { s: s - 0.16, d: c + wR - 0.02, y: y0 + 0.1 },
        { s: s + 0.14, d: c + wR - 0.28, y: y0 + 0.045 },
      ];
      return pad;
    });
    this.island = { s0: 44.9, s1: 49.4, dOff: 0.36, halfW: 0.25, h: 0.09 };
    // Exposed gravel bar on the inside of the Grounds bend
    this.gravelBar = { s0: 94.4, s1: 96.6, side: 1 };
    this.roughPatch = { s0: 95.05, s1: 95.95 };
    this.matOn = false;
    this.potholes = [];
  }

  /** Raw bed function (used only for baking). */
  bedRaw(s, d, out) {
    const i = Math.round(this.rowIndex(s));
    const y0 = this.rY0[i], c = this.rC[i], D = this.rD[i];
    const dc = d - c;
    const left = dc < 0;
    const w = left ? this.rWL[i] : this.rWR[i];
    const bankH = left ? this.rBankL[i] : this.rBankR[i];
    const bankW = this.rBankW[i];
    const u = Math.abs(dc) / w;
    let bed, mat;
    // far-field blend towards the smoothed valley elevation
    const far = smoothstep(2.0, 6.5, Math.abs(dc));
    const base = lerp(y0, this.rY0s[i], far);
    if (u <= 1) {
      const p = 1 - u * u;
      bed = y0 + 0.012 - (D + 0.012) * Math.pow(p, 0.55);
      mat = this.rBedMat[i];
    } else {
      const t = (u - 1) * w;
      let bank = bankH * smoothstep(0, bankW, t);
      if (bankH < 0) {
        // shelf rim then a cliff down to the lower catch area
        bank += 0.045 * Math.exp(-((t - 0.04) * (t - 0.04)) / 0.0012);
        bank = bankH * smoothstep(0.07, 0.07 + bankW, t) + 0.045 * smoothstep(0.0, 0.04, t) * (1 - smoothstep(0.06, 0.1, t));
      }
      const rise = 0.11 * Math.max(0, t - bankW) + 0.04 * Math.max(0, t - bankW - 3);
      bed = base + 0.012 + bank + rise;
      mat = t < 0.06 ? this.rBedMat[i] : this.rBankMat[i];
      if (bankH > 0.8 && t < bankW + 0.2) mat = MAT.ROCK;
    }
    // ---- noise
    const rough = this.rRough[i];
    const n1 = fbm(s * 1.3, d * 1.3, 3, 11);
    const n2 = fbm(s * 7, d * 7, 2, 23);
    if (u <= 1) {
      bed += rough * 0.8 * n1 + rough * 0.5 * n2;
    } else {
      const rocky = mat === MAT.ROCK ? 1 : 0.5;
      bed += (0.08 * n1 + 0.02 * n2 * rocky) * smoothstep(0, 0.6, (u - 1) * w);
    }
    // ---- island (Alder Bend)
    const isl = this.island;
    if (s > isl.s0 && s < isl.s1) {
      const ts = (s - isl.s0) / (isl.s1 - isl.s0);
      const hw = isl.halfW * Math.sin(Math.PI * ts) ** 0.6;
      const di = Math.abs(d - (c + isl.dOff));
      if (di < hw + 0.12) {
        const m = 1 - smoothstep(hw - 0.05, hw + 0.12, di);
        const top = y0 + isl.h * Math.sin(Math.PI * ts) ** 0.4 + 0.015 * n2;
        if (top > bed) { bed = lerp(bed, top, m); if (m > 0.4) mat = MAT.GRAVEL; }
      }
    }
    // ---- gravel bar on inside of the Grounds bend (right side)
    const gb = this.gravelBar;
    if (s > gb.s0 && s < gb.s1 && dc > 0) {
      const ts = (s - gb.s0) / (gb.s1 - gb.s0);
      const m = Math.sin(Math.PI * ts) * smoothstep(0.1, 0.38, dc);
      bed = lerp(bed, Math.max(bed, y0 + 0.006 + 0.01 * n2), m);
    }
    // ---- rough gravel patch: big bumps (covered by the Gravel Run Mat)
    const rp = this.roughPatch;
    if (s > rp.s0 && s < rp.s1 && u < 1 && !this._noPatch) {
      const m = Math.sin(Math.PI * (s - rp.s0) / (rp.s1 - rp.s0));
      bed += 0.022 * m * (vnoise(s * 14, d * 14, 77) + 0.6);
    }
    // ---- bench pads
    for (const p of this.pads) {
      if (s > p.s0 - 0.6 && s < p.s1 + 0.6) {
        const edge = c + this.rWR[i];
        const d0 = edge + 0.3, d1 = edge + 1.8;
        if (d < d0 - 0.3 || d > d1 + 0.7) continue;
        const ms = smoothstep(p.s0 - 0.5, p.s0, s) * (1 - smoothstep(p.s1, p.s1 + 0.5, s));
        const md = smoothstep(d0 - 0.25, d0 + 0.05, d) * (1 - smoothstep(d1, d1 + 0.6, d));
        const m = ms * md;
        if (m > 0) { bed = lerp(bed, p.y + 0.004 * n2, m); if (m > 0.5) mat = MAT.DIRT; }
      }
    }
    // ---- notch under each launch chute so the trough never sits in the ground
    for (const p of this.pads) {
      const C = p.chute;
      if (s < C[0].s - 0.3 || s > C[2].s + 0.3) continue;
      for (let q = 0; q < 2; q++) {
        const A = C[q], B = C[q + 1];
        const es = B.s - A.s, ed = B.d - A.d;
        let t = ((s - A.s) * es + (d - A.d) * ed) / (es * es + ed * ed);
        t = clamp(t, 0, 1);
        const dist = Math.hypot(s - (A.s + es * t), d - (A.d + ed * t));
        if (dist < 0.16) {
          const floor = A.y + (B.y - A.y) * t - 0.035;
          const m = 1 - smoothstep(0.07, 0.16, dist);
          if (bed > floor) bed = lerp(bed, floor, m);
        }
      }
    }
    // ---- dry hollows behind the low rims of the plunge pool: balls kicked out of the
    // pool settle there and cannot roll back
    if (s > 86.25 && s < 88.4 && u > 1) {
      const t = (u - 1) * w;
      const ms = Math.sin(Math.PI * (s - 86.25) / 2.15);
      bed -= 0.16 * ms * Math.exp(-((t - 0.32) ** 2) / 0.012);
    }
    // ---- potholes worn into the dry rock shelf beside the waterfall lip
    for (const ph of this.potholes) {
      const ds = s - ph.s, dd = d - (c + ph.d);
      const r2 = ds * ds + dd * dd;
      if (r2 < ph.r * ph.r * 2.2) bed -= ph.depth * Math.exp(-r2 / (ph.r * ph.r * 0.5));
    }
    // ---- basket area: shallow catch pan after the gate
    if (out) out.mat = mat;
    return bed;
  }

  bakeBed() {
    const nd = Math.round((D_MAX - D_MIN) / DD) + 1;
    this.nD = nd;
    this.bed = new Float32Array(this.nS * nd);
    this.mat = new Uint8Array(this.nS * nd);
    const o = {};
    for (let i = 0; i < this.nS; i++) {
      const s = S_MIN + i * DS;
      for (let j = 0; j < nd; j++) {
        const d = D_MIN + j * DD;
        const k = i * nd + j;
        this.bed[k] = this.bedRaw(s, d, o);
        this.mat[k] = o.mat;
      }
    }
    // Smooth surface of the Gravel Run Mat (bridges the rough patch)
    const rp = this.roughPatch;
    this.matI0 = Math.floor((rp.s0 - 0.3 - S_MIN) / DS);
    this.matI1 = Math.ceil((rp.s1 + 0.3 - S_MIN) / DS);
    this.matBed = new Float32Array((this.matI1 - this.matI0 + 1) * nd);
    this._noPatch = true;
    for (let i = this.matI0; i <= this.matI1; i++) {
      const s = S_MIN + i * DS;
      for (let j = 0; j < nd; j++) {
        const d = D_MIN + j * DD;
        const raw = this.bedRaw(s, d, o);
        const inside = s > rp.s0 - 0.05 && s < rp.s1 + 0.05 && this.inChannel(s, d, -0.04);
        this.matBed[(i - this.matI0) * nd + j] = inside ? Math.max(raw + 0.012, this.bed[i * nd + j] - 0.004) : this.bed[i * nd + j];
      }
    }
    this._noPatch = false;
  }

  /** Height of the mat surface where installed (falls back to bed). */
  matH(s, d) {
    const fs = (s - S_MIN) / DS, fd = clamp((d - D_MIN) / DD, 0, this.nD - 1.001);
    const i = Math.floor(fs);
    if (i < this.matI0 || i >= this.matI1) return this.bedH(s, d);
    const j = fd | 0, ts = fs - i, td = fd - j, nd = this.nD;
    const b = this.matBed, k = (i - this.matI0) * nd + j;
    const a = b[k] + (b[k + 1] - b[k]) * td, c = b[k + nd] + (b[k + nd + 1] - b[k + nd]) * td;
    return a + (c - a) * ts;
  }

  /** Bilinear bed height and gradient in channel coords. Writes h, hs, hd. */
  bedAt(s, d, out) {
    let fs = (s - S_MIN) / DS, fd = (d - D_MIN) / DD;
    if (fs < 0) fs = 0; else if (fs > this.nS - 1.001) fs = this.nS - 1.001;
    if (fd < 0) fd = 0; else if (fd > this.nD - 1.001) fd = this.nD - 1.001;
    const i = fs | 0, j = fd | 0, ts = fs - i, td = fd - j;
    const nd = this.nD, b = this.bed;
    const k = i * nd + j;
    const h00 = b[k], h01 = b[k + 1], h10 = b[k + nd], h11 = b[k + nd + 1];
    const a = h00 + (h01 - h00) * td, c = h10 + (h11 - h10) * td;
    out.h = a + (c - a) * ts;
    out.hs = (c - a) / DS;
    out.hd = ((h01 - h00) + ((h11 - h10) - (h01 - h00)) * ts) / DD;
    out.mat = this.mat[(ts < 0.5 ? k : k + nd) + (td < 0.5 ? 0 : 1)];
    return out;
  }

  bedH(s, d) {
    let fs = clamp((s - S_MIN) / DS, 0, this.nS - 1.001), fd = clamp((d - D_MIN) / DD, 0, this.nD - 1.001);
    const i = fs | 0, j = fd | 0, ts = fs - i, td = fd - j;
    const nd = this.nD, b = this.bed, k = i * nd + j;
    const a = b[k] + (b[k + 1] - b[k]) * td, c = b[k + nd] + (b[k + nd + 1] - b[k + nd]) * td;
    return a + (c - a) * ts;
  }

  /** Water surface at (s, d), or -Infinity when dry. */
  waterLevel(s, d) {
    const f = this.rowIndex(s); const i = f | 0; const t = f - i;
    const c = this.rC[i] + (this.rC[i + 1] - this.rC[i]) * t;
    const dc = d - c;
    const w = dc < 0 ? this.rWL[i] + (this.rWL[i + 1] - this.rWL[i]) * t : this.rWR[i] + (this.rWR[i + 1] - this.rWR[i]) * t;
    if (Math.abs(dc) > w + 0.03) return -Infinity;
    return this.rY0[i] + (this.rY0[i + 1] - this.rY0[i]) * t;
  }

  inChannel(s, d, margin = 0) {
    const c = this.c(s), dc = d - c;
    const w = dc < 0 ? this.wL(s) : this.wR(s);
    return Math.abs(dc) <= w + margin;
  }

  // ---------------------------------------------------------------- rocks
  buildRocks() {
    const rnd = mulberry32(1234);
    const rocks = [];
    const add = (s, d, r, opts = {}) => {
      const p = this.worldXZ(s, d);
      const bed = this.bedH(s, d);
      const bury = opts.bury ?? 0.35;
      const y = (opts.y ?? bed) + r * (1 - 2 * bury);
      rocks.push({ s, d, x: p.x, y, z: p.z, r, tag: opts.tag || 'rock', group: opts.group || null, decor: !!opts.decor, solid: opts.solid !== false });
    };
    // bank boulders along both sides
    for (let s = S_MIN + 1; s < S_MAX - 2; s += 0.35 + rnd() * 0.6) {
      for (const side of [-1, 1]) {
        if (rnd() < 0.3) continue;
        const c = this.c(s), w = side < 0 ? this.wL(s) : this.wR(s);
        const bankH = this.row(side < 0 ? this.rBankL : this.rBankR, s);
        // keep bench pads and gate clear
        let skip = false;
        for (const p of this.pads) if (side > 0 && s > p.s0 - 0.4 && s < p.s1 + 0.4) skip = true;
        if (s > S_FINISH - 0.8 && s < S_BASKET + 1.2) skip = true;
        if (skip) continue;
        const rockyBank = bankH > 0.8 || this.row(this.rRough, s) > 0.018;
        let r = rockyBank ? 0.08 + rnd() * 0.22 : 0.04 + rnd() * 0.12;
        if (bankH < 0 && side < 0) r = 0.05 + rnd() * 0.08; // shelf lip
        const dd = c + side * (w + 0.02 + r * (0.2 + rnd() * 0.9));
        add(s, dd, r, { bury: 0.3 + rnd() * 0.15, tag: 'bank' });
      }
    }
    // scattered boulders further up the banks
    for (let k = 0; k < 260; k++) {
      const s = S_MIN + 1 + rnd() * (S_MAX - S_MIN - 3);
      const side = rnd() < 0.5 ? -1 : 1;
      const c = this.c(s), w = side < 0 ? this.wL(s) : this.wR(s);
      const dd = c + side * (w + 0.6 + rnd() * 6);
      let skip = false;
      for (const p of this.pads) if (s > p.s0 - 0.5 && s < p.s1 + 0.5 && dd > p.d0 - 0.4 && dd < p.d1 + 0.6) skip = true;
      if (s > S_FINISH - 1.5 && s < S_BASKET + 2 && Math.abs(dd - c) < 2.5) skip = true;
      if (skip) continue;
      add(s, dd, 0.1 + rnd() * rnd() * 0.6, { bury: 0.35, tag: 'boulder', decor: Math.abs(dd - c) > 2.5 });
    }
    // In-channel features
    // Gorge: lip rocks at both steps + landing rocks at the first step (angled deflectors)
    for (const st of [STEPS[0], STEPS[1]]) {
      const c = this.c(st.s - 0.15);
      add(st.s - 0.12, c - 0.3, 0.09, { bury: 0.4, tag: 'lip' });
      add(st.s - 0.12, c + 0.3, 0.09, { bury: 0.4, tag: 'lip' });
    }
    {
      // landing jumble below gorge step 1: hard angled deflections
      const s = 9.55;
      const c = this.c(s);
      add(s + 0.05, c - 0.2, 0.085, { bury: 0.25, tag: 'landing', group: 'gorgeLanding' });
      add(s - 0.08, c + 0.09, 0.08, { bury: 0.05, tag: 'landing', group: 'gorgeLanding' });
      add(s + 0.35, c + 0.02, 0.07, { bury: 0.3, tag: 'landing', group: 'gorgeLanding' });
      add(10.0, this.c(10.0) + 0.18, 0.045, { y: this.y0(10.0) - 0.03, bury: 0.5, tag: 'landing', group: 'gorgeLanding' });
      add(10.08, this.c(10.08) + 0.28, 0.05, { y: this.y0(10.08) - 0.03, bury: 0.5, tag: 'landing', group: 'gorgeLanding' });
    }
    // whitewater boulders
    for (let s = 22.8; s < 29.2; s += 0.9 + rnd() * 0.5) {
      const c = this.c(s);
      const side = rnd() < 0.5 ? -1 : 1;
      add(s, c + side * (0.1 + rnd() * 0.08), 0.05 + rnd() * 0.03, { bury: 0.45, tag: 'whitewater' });
    }
    // Alder: stepping stones
    for (const [s, dd, r] of [[36, -0.15, 0.06], [39.2, 0.2, 0.07], [42.5, -0.1, 0.06], [52, 0.15, 0.06]]) add(s, this.c(s) + dd, r, { bury: 0.45, tag: 'stone' });
    // Springs pool: a few big submerged stones
    for (const [s, dd, r] of [[57, -0.6, 0.12], [59, 0.55, 0.11], [60.3, -0.3, 0.08]]) add(s, this.c(s) + dd, r, { bury: 0.5, tag: 'stone' });
    // Spillway snag rocks protruding from the sides (balls stall in their lee)
    for (const [s, side] of [[63.4, 1], [64.3, -1], [65.1, 1], [65.9, -1]]) {
      const c = this.c(s), w = 0.12;
      add(s, c + side * (w + 0.03), 0.085, { bury: 0.12, tag: 'snag' });
    }
    // Shelf catch area jumble (below the drop)
    for (const [s, dd, r, bury] of [[78.9, 1.0, 0.075, 0.05], [79.05, 1.5, 0.075, 0.3], [78.62, 1.55, 0.065, 0.3], [79.3, 1.1, 0.06, 0.3], [78.95, 0.68, 0.07, 0.2]]) {
      add(s, dd, r, { bury, tag: 'catch', group: 'catchJumble' });
    }
    // the busiest bottleneck: at the Springs pool outlet two rocks leave a ball-sized notch
    add(61.92, this.c(61.92) - 0.27, 0.045, { y: this.y0(61.92) - 0.02, bury: 0.5, tag: 'snag', group: 'outletNotch' });
    add(62.0, this.c(62.0) - 0.375, 0.05, { y: this.y0(62.0) - 0.02, bury: 0.5, tag: 'snag', group: 'outletNotch' });
    // a ball-sized notch between two rocks beside the landing
    add(79.22, this.c(79.22) + 0.1, 0.045, { y: this.y0(79.22) - 0.02, bury: 0.5, tag: 'catch', group: 'catchJumble' });
    add(79.3, this.c(79.3) + 0.2, 0.05, { y: this.y0(79.3) - 0.02, bury: 0.5, tag: 'catch', group: 'catchJumble' });
    // Waterfall lip rocks (sideways bounces) and approach boulders
    // horn rocks sitting right on the waterfall lip
    // horn rocks on the waterfall lip; beside each a smaller rock leaves a ball-sized notch
    for (const side of [-1, 1]) {
      add(85.95, this.c(85.95) + side * 0.13, 0.05, { y: this.y0(85.95) - 0.02, bury: 0.5, tag: 'lip' });
      add(85.99, this.c(85.99) + side * 0.235, 0.045, { y: this.y0(85.99) - 0.015, bury: 0.5, tag: 'lip' });
    }
    add(85.9, this.c(85.9) + 0.23, 0.07, { bury: 0.3, tag: 'lip' });
    for (const [s, dd, r] of [[81.5, 0.18, 0.05], [83.2, -0.16, 0.05], [84.6, 0.15, 0.045]]) add(s, this.c(s) + dd, r, { bury: 0.45, tag: 'stone' });
    // Grounds: rocks in the gravel bend
    for (const [s, dd, r] of [[96.2, -0.28, 0.06], [97.5, 0.3, 0.05]]) add(s, this.c(s) + dd, r, { bury: 0.45, tag: 'stone' });
    // rough patch pebbles (covered by the mat)
    for (let k = 0; k < 7; k++) {
      const s = this.roughPatch.s0 + 0.08 + rnd() * 0.75;
      const dd = this.c(s) + (rnd() - 0.5) * 0.55;
      add(s, dd, 0.016 + rnd() * 0.01, { bury: 0.3, tag: 'pebble', group: 'roughPebbles' });
    }
    this.rocks = rocks;
  }

  // ---------------------------------------------------------------- flow field
  bakeFlow() {
    this.fD0 = -3.2; this.fDD = 0.05; this.fDS = 0.1;
    const nd = Math.round((3.8 - this.fD0) / this.fDD) + 1;
    const ns = Math.round((S_MAX - S_MIN) / this.fDS) + 1;
    this.fnD = nd; this.fnS = ns;
    this.flowS = new Float32Array(ns * nd);
    this.flowD = new Float32Array(ns * nd);
    // eddies: s, d(relative to c), radius, tangential speed (+ = clockwise seen from above)
    const eddies = [
      { s: 9.35, d: 0.32, R: 0.2, v: 0.25 }, { s: 9.35, d: -0.32, R: 0.2, v: -0.25 },
      { s: 20.4, d: 0.3, R: 0.2, v: 0.22 }, { s: 20.4, d: -0.3, R: 0.2, v: -0.22 },
      { s: 38.8, d: 0.5, R: 0.25, v: 0.12, tag: 'undercut' },
      { s: 93.12, d: -0.3, R: 0.12, v: 0.05, trap: 0.05, tag: 'rootPocket' },
      { s: 46.7, d: 0.98, R: 0.34, v: -0.22, trap: 0.11, tag: 'deadPocket' },
      { s: 56.6, d: -0.55, R: 0.36, v: 0.15, trap: 0.05, ring: true, tag: 'springsL' }, { s: 59.8, d: 0.55, R: 0.32, v: -0.14, trap: 0.04, ring: true, tag: 'springsR' },
      // stagnant lower corners of the Springs pool beside the spillway mouth (the busiest bottleneck)
      { s: 61.75, d: -0.52, R: 0.17, v: 0.05, trap: 0.14, tag: 'cornerL' }, { s: 61.75, d: 0.5, R: 0.17, v: -0.05, trap: 0.14, tag: 'cornerR' },
      { s: 88.2, d: 0.6, R: 0.34, v: -0.32, trap: 0.45, tag: 'poolEddy' },
    ];
    this.eddies = eddies;
    const wetRocks = this.rocks.filter((r) => {
      const wl = this.waterLevel(r.s, r.d);
      return wl > -1e9 && r.y - r.r < wl && r.y + r.r > wl - 0.05;
    });
    const tmp = {};
    for (let i = 0; i < ns; i++) {
      const s = S_MIN + i * this.fDS;
      const ri = Math.round(this.rowIndex(s));
      const c = this.rC[ri], U = this.rU[ri], dcds = this.rDcds[ri];
      const wl = this.rWL[ri], wr = this.rWR[ri], y0 = this.rY0[ri];
      const nearRocks = wetRocks.filter((r) => Math.abs(r.s - s) < r.r * 5 + 0.2);
      const nearEddies = eddies.filter((e) => Math.abs(e.s - s) < e.R * 3);
      let dirS = 1, dirD = dcds;
      const l = Math.hypot(dirS, dirD); dirS /= l; dirD /= l;
      for (let j = 0; j < nd; j++) {
        const d = this.fD0 + j * this.fDD;
        const dc = d - c;
        const w = dc < 0 ? wl : wr;
        const u = Math.abs(dc) / w;
        let vs = 0, vd = 0;
        if (u < 1.15) {
          // slower near banks and in shallow edges
          const prof = Math.sqrt(clamp(1 - Math.pow(Math.min(u, 1), 4), 0.0, 1)) * 0.88 + 0.12;
          let sp = U * prof;
          // island: water splits around it
          const isl = this.island;
          if (s > isl.s0 - 0.4 && s < isl.s1 + 0.4) {
            const di = d - (c + isl.dOff);
            const ts = clamp((s - isl.s0) / (isl.s1 - isl.s0), 0, 1);
            const push = Math.exp(-di * di / 0.08) * Math.sin(Math.PI * ts);
            vd += Math.sign(di || 1) * push * 0.25 * (s < (isl.s0 + isl.s1) / 2 ? 1 : -1);
            if (dc > 0.8 && s > 45.8 && s < 47.8) sp *= 0.15; // dead pocket: almost still
          }
          // plunge pool roller below the waterfall
          if (s > 86.02 && s < 87.25) {
            const rs = (s - 86.02) / 1.23;
            const lat = 1 - smoothstep(0.1, 0.24, Math.abs(dc));
            sp = lerp(Math.max(sp, 0.45), -0.28 * Math.sin(Math.PI * clamp(rs * 1.05, 0, 1)), lat);
            // the roller spills outwards along the falls face, then leaves along the sides
            vd += Math.sign(dc || 0.01) * 0.06 * Math.sin(Math.PI * rs) * (1 - smoothstep(0.2, 0.32, Math.abs(dc)));
          }
          // the plunge pool's outflow skews towards its outside (left) edge
          // gorge step pools have smaller rollers
          for (const st of [STEPS[0], STEPS[1]]) {
            if (s > st.s + 0.02 && s < st.s + 0.55) {
              const rs = (s - st.s - 0.02) / 0.53;
              const lat = 1 - smoothstep(0.15, 0.4, Math.abs(dc));
              sp = lerp(sp, -0.25 * Math.sin(Math.PI * rs), lat);
            }
          }
          vs = dirS * sp; vd += dirD * sp;
          // rocks: potential flow deflection plus a sheltered wake
          for (const r of nearRocks) {
            const wlv = y0;
            const hh = wlv - r.y;
            if (Math.abs(hh) >= r.r) continue;
            const Rw = Math.sqrt(r.r * r.r - hh * hh);
            const ps = s - r.s, pd = d - r.d;
            const rho2 = ps * ps + pd * pd;
            if (rho2 > (Rw * 5) ** 2) continue;
            // flow frame: x along (dirS, dirD)
            const x = ps * dirS + pd * dirD, y = -ps * dirD + pd * dirS;
            const r2 = Math.max(rho2, Rw * Rw);
            const R2 = Rw * Rw;
            let ux = 1 - (R2 * (x * x - y * y)) / (r2 * r2);
            let uy = (-R2 * 2 * x * y) / (r2 * r2);
            if (rho2 < R2) { ux = 0; uy = 0; }
            if (x > 0 && Math.abs(y) < Rw * 1.3 && x < Rw * 4.5) {
              const wk = 1 - (1 - x / (Rw * 4.5)) * (1 - Math.abs(y) / (Rw * 1.3));
              ux *= 0.15 + 0.85 * wk;
              // weak recirculation pulling floating things into the lee
              uy += -Math.sign(y) * 0.25 * (1 - wk);
            }
            const vx = sp * ux, vy = sp * uy;
            const ns2 = vx * dirS - vy * dirD, nd2 = vx * dirD + vy * dirS;
            vs += ns2 - dirS * sp; vd += nd2 - dirD * sp;
          }
          // eddies are sheltered: the main current is mostly absent inside them
          for (const e of nearEddies) {
            if (!e.trap) continue;
            const r = Math.hypot(s - e.s, dc - e.d);
            const f = 0.08 + 0.92 * smoothstep(e.R * 0.55, e.R * 1.25, r);
            vs *= f; vd *= f;
          }
          for (const e of nearEddies) {
            const ps = s - e.s, pd = dc - e.d;
            const r = Math.hypot(ps, pd);
            if (r < 1e-4) continue;
            const prof2 = r < e.R ? r / e.R : Math.exp(-(r - e.R) / (e.R * 0.6));
            // clockwise (seen from above, s down, d right): tangential = (pd, -ps)/r
            const k = e.v * prof2 / r;
            vs += k * pd * 1; vd += k * -ps;
            // surface convergence holds floating things on a ring inside the eddy
            if (e.trap) {
              // ring eddies hold things circling; still pockets gather them at the centre
              const kt = e.ring ? e.trap * (r - e.R * 0.6) / e.R * (1 - smoothstep(e.R, e.R * 1.5, r)) / r : e.trap * prof2 / r;
              vs -= kt * ps; vd -= kt * pd;
            }
            if (r < e.R * 1.2) { vs *= 0.7; vd *= 0.7; }
          }
          if (u > 1) { const f = 1 - smoothstep(1, 1.15, u); vs *= f; vd *= f; }
        }
        this.flowS[i * nd + j] = vs;
        this.flowD[i * nd + j] = vd;
      }
    }
    // spring boils (upwelling) for visuals and a small outward push
    this.boils = [{ s: 56.4, d: 0.1, r: 0.18 }, { s: 58.3, d: -0.25, r: 0.15 }, { s: 59.6, d: 0.3, r: 0.16 }];
  }

  /**
   * Water velocity at a point. Writes world-space vx, vy, vz.
   * s/d are the point's channel coords; tx/tz the local tangent.
   */
  flowAt(s, d, y, t, tx, tz, out) {
    let fs = (s - S_MIN) / this.fDS, fd = (d - this.fD0) / this.fDD;
    out.vx = 0; out.vy = 0; out.vz = 0;
    if (fs < 0 || fs > this.fnS - 1.001 || fd < 0 || fd > this.fnD - 1.001) return out;
    const i = fs | 0, j = fd | 0, ts = fs - i, td = fd - j;
    const nd = this.fnD, k = i * nd + j;
    const A = this.flowS, B = this.flowD;
    let vs = (A[k] * (1 - td) + A[k + 1] * td) * (1 - ts) + (A[k + nd] * (1 - td) + A[k + nd + 1] * td) * ts;
    let vd = (B[k] * (1 - td) + B[k + 1] * td) * (1 - ts) + (B[k + nd] * (1 - td) + B[k + nd + 1] * td) * ts;
    // unsteady turbulence
    const ri = Math.round(this.rowIndex(s));
    const turb = this.rTurb[ri];
    if (vs !== 0 || vd !== 0) {
      const ts1 = Math.sin(1.9 * s + 2.3 * d + 1.7 * t) * 0.6 + Math.sin(3.7 * s - 1.1 * d - 2.9 * t + 1.3) * 0.4;
      const td1 = Math.sin(2.6 * s - 1.7 * d + 2.1 * t + 0.7) * 0.6 + Math.sin(4.3 * s + 2.9 * d + 3.3 * t) * 0.4;
      const mag = turb * (0.4 + 0.6 * Math.min(1, Math.hypot(vs, vd)));
      vs += ts1 * mag; vd += td1 * mag;
      // springs boils push outward
      if (s > 55.5 && s < 60.5) {
        for (const b of this.boils) {
          const ps = s - b.s, pd = d - this.c(b.s) - b.d;
          const r2 = ps * ps + pd * pd;
          if (r2 < b.r * b.r * 4) { const f = 0.12 * Math.exp(-r2 / (b.r * b.r)) / Math.sqrt(r2 + 1e-4); vs += ps * f; vd += pd * f; }
        }
      }
      // plunge pools: the jet drives down, water runs downstream along the
      // bottom and boils up again, while the surface roller runs back to the falls
      for (let q = 0; q < POOLS.length; q++) {
        const P = POOLS[q];
        if (s < P.s - 0.02 || s > P.s + P.len) continue;
        const dep = this.rY0[ri] - y;
        const lat = 1 - smoothstep(P.w * 0.5, P.w, Math.abs(d - this.rC[ri]));
        const x = (s - P.s) / P.len;
        if (x < 0.3 && dep > -0.05 && dep < P.jetDepth) out.vy = -P.jet * (1 - x / 0.3) * lat;
        if (dep > 0.06) {
          const fr = Math.min(1, (dep - 0.06) / 0.06) * lat;
          vs = vs * (1 - fr) + P.under * fr;
          vd *= 1 - fr * 0.5;
        }
        if (x > 0.62 && x < 0.95 && dep > -0.05) out.vy = Math.max(out.vy, P.boil * Math.sin(Math.PI * (x - 0.62) / 0.33) * lat);
      }
    }
    const nx = -tz, nz = tx;
    out.vx = tx * vs + nx * vd;
    out.vz = tz * vs + nz * vd;
    return out;
  }

  // Air movement: the Folk Draft (descending air at the Continental Shelf drop)
  windAt(s, d, y, t, out) {
    out.vx = 0; out.vy = 0; out.vz = 0;
    if (s > 76.6 && s < 79.6) {
      const ri = Math.round(this.rowIndex(s));
      const m = Math.sin(Math.PI * (s - 76.6) / 3.0) * (1 - smoothstep(1.2, 3.2, Math.abs(d - 1.4)));
      const gust = 0.75 + 0.25 * Math.sin(t * 1.3) * Math.sin(t * 0.37 + 1);
      out.vy = -5.0 * m * gust;
      // push towards the lower catch area (towards the approach channel at d≈0.5)
      const lat = clamp((1.2 - d) * 1.5, -2.2, 2.2) * m * gust;
      const fr = this.frame(s);
      out.vx = fr.nx * lat + fr.tx * 0.6 * m;
      out.vz = fr.nz * lat + fr.tz * 0.6 * m;
      void ri;
    }
    return out;
  }

  // ---------------------------------------------------------------- colliders
  buildColliders() {
    const cols = [];
    this.colliders = cols;
    const P = (s, d, y) => { const p = this.worldXZ(s, d); return [p.x, y, p.z]; };
    for (const r of this.rocks) {
      if (r.decor || !r.solid) continue;
      cols.push({ type: 0, x: r.x, y: r.y, z: r.z, r: r.r * 0.94, mat: MAT.ROCK, group: r.group, tag: r.tag });
    }
    const capsule = (a, b, r, mat, group, tag) => cols.push({ type: 1, ax: a[0], ay: a[1], az: a[2], bx: b[0], by: b[1], bz: b[2], r, mat, group, tag });
    this.capsule = capsule;
    // ---- exposed root at Old Rolling Grounds: comes out of the left bank, lies along the
    // surface and dives into the bed. Near the bank it lifts just enough to trap a ball.
    {
      const sA = 92.98, sB = 93.36, sC = 93.62;
      const cA = this.c(sA), cB = this.c(sB), cC = this.c(sC);
      const A0 = P(sA - 0.12, cA - this.wL(sA) - 0.32, this.bedH(sA - 0.12, cA - this.wL(sA) - 0.32) + 0.015);
      const A = P(sA, cA - this.wL(sA) + 0.04, this.y0(sA) + 0.03);
      const B = P(sB, cB - 0.13, this.y0(sB) + 0.014);
      const C = P(sC, cC + 0.03, this.bedH(sC, cC + 0.03) - 0.005);
      // a short spur reaching back upstream from the root's elbow forms a notch against the bank
      const D = P(sA - 0.13, this.c(sA - 0.13) - 0.3, this.y0(sA - 0.13) + 0.012);
      capsule(A0, A, 0.028, MAT.WOOD, 'root', 'root');
      capsule(A, B, 0.026, MAT.WOOD, 'root', 'root');
      capsule(B, C, 0.022, MAT.WOOD, 'root', 'root');
      capsule(A, D, 0.02, MAT.WOOD, 'root', 'root');
      this.rootPts = [A0, A, B, C];
      this.rootSpur = [A, D];
      // Root Bend Rail: closes the mouth of the notch so balls slide past the root's tip
      const sr = sA - 0.36, dr = this.c(sr) - this.wL(sr) - 0.12;
      const ra = P(sr, dr, Math.max(this.bedH(sr, dr), this.y0(sr)) + 0.016);
      const rb = P(sA - 0.06, this.c(sA - 0.06) - 0.19, this.y0(sA - 0.06) + 0.016);
      capsule(ra, rb, 0.012, MAT.METAL, 'rootRail', 'rail');
      this.rootRailPts = [ra, rb];
    }
    // ---- Splash guard: angled boards at the lip turn balls that glance off the horn rocks
    // back into the centre slot instead of into the notches beside them
    {
      for (const side of [-1, 1]) {
        const a = P(85.4, this.c(85.4) + side * 0.25, this.y0(85.4) + 0.03), b = P(85.92, this.c(85.92) + side * 0.112, this.y0(85.92) + 0.03);
        cols.push(this.obbFromSegment(a, b, 0.01, 0.06, MAT.WOOD, 'splashGuard'));
      }
    }
    // ---- Pool guide boom (floating, at the surface)
    {
      const y = this.y0(88);
      const pts = [[86.9, 0.5], [87.6, 0.4], [88.6, 0.36], [89.5, 0.3]].map(([s, dd]) => P(s, this.c(s) + dd, y + 0.01));
      for (let i = 0; i < pts.length - 1; i++) capsule(pts[i], pts[i + 1], 0.03, MAT.RUBBER, 'poolGuide', 'boom');
      this.poolGuidePts = pts;
    }
    // ---- Shelf catch ramp: receives balls off the shelf drop and sends them to the approach
    {
      const hiS = 78.5, loS = 79.55;
      const a = P(hiS, 1.32, this.y0(78.8) + 0.16);
      const b = P(loS, 0.8, this.y0(79.55) + 0.004);
      const ramp = this.obbFromSegment(a, b, 0.42, 0.01, MAT.WOOD, 'catchRamp', true);
      cols.push(ramp);
      this.catchRamp = { a, b, halfW: 0.42 };
      // side boards keep balls on the ramp
      for (const side of [-1, 1]) {
        const la = P(hiS, 1.32 + side * 0.42, this.y0(78.8) + 0.2);
        const lb = P(loS, 0.8 + side * 0.42, this.y0(79.55) + 0.05);
        capsule(la, lb, 0.015, MAT.WOOD, 'catchRamp', 'lip');
      }
    }
    // ---- Spillway rails
    {
      for (const side of [-1, 1]) {
        const pts = [];
        const w0 = side < 0 ? this.wL(62.15) : this.wR(62.15);
        pts.push(P(62.15, this.c(62.15) + side * (w0 + 0.03), this.y0(62.15) + 0.02));
        pts.push(P(62.6, this.c(62.6) + side * 0.17, this.y0(62.6) + 0.022));
        for (let s = 62.95; s <= 66.9; s += 0.35) pts.push(P(s, this.c(s) + side * 0.075, this.y0(s) + 0.025));
        for (let i = 0; i < pts.length - 1; i++) capsule(pts[i], pts[i + 1], 0.01, MAT.METAL, 'spillRail', 'rail');
      }
    }
    // ---- Alder bypass guide: closes off the dead pocket mouth
    {
      const pts = [[44.9, 0.56], [45.8, 0.66], [46.7, 0.73], [47.5, 0.76], [48.4, 0.74]].map(([s, dd]) => P(s, this.c(s) + dd, this.y0(s) + 0.02));
      for (let i = 0; i < pts.length - 1; i++) capsule(pts[i], pts[i + 1], 0.02, MAT.WOOD, 'alderBypass', 'boom');
      this.bypassPts = pts;
    }
    // ---- Gorge landing boards: angled boards covering the landing jumble
    {
      const y = this.y0(9.5);
      const a = P(9.12, this.c(9.12), y + 0.02), b = P(9.95, this.c(9.95), y - 0.02);
      cols.push(this.obbFromSegment(a, b, 0.5, 0.012, MAT.WOOD, 'landingBoards', true));
      // a side board on the boards' downstream end turns balls away from the notch
      const ga = P(9.6, this.c(9.6) + 0.32, this.y0(9.6) + 0.03), gb = P(10.12, this.c(10.12) + 0.05, this.y0(10.12) + 0.03);
      cols.push(this.obbFromSegment(ga, gb, 0.01, 0.05, MAT.WOOD, 'landingBoards'));
      this.landingBoards = { a, b };
    }
    // ---- Spring debris screen (fixed posts)
    {
      const pts = [[55.6, -0.25], [57.2, -0.45], [59.2, -0.45], [60.8, -0.3]].map(([s, dd]) => P(s, this.c(s) + dd, this.y0(s) + 0.03));
      for (let i = 0; i < pts.length - 1; i++) capsule(pts[i], pts[i + 1], 0.012, MAT.METAL, 'debrisScreen', 'screen');
      this.screenPts = pts;
    }
    // ---- finish gate posts
    {
      const s = S_FINISH, c = this.c(s);
      for (const side of [-1, 1]) {
        const d = c + side * (this.wR(s) + 0.07);
        const base = P(s, d, this.bedH(s, d) - 0.05);
        const top = [base[0], base[1] + 0.9, base[2]];
        capsule(base, top, 0.04, MAT.WOOD, null, 'gate');
      }
    }
    this.buildColliderGrid();
  }

  /** Oriented box from a centre segment; `floor` puts the top face on the segment. */
  obbFromSegment(a, b, halfW, halfH, mat, group, floor = false) {
    let ex = b[0] - a[0], ey = b[1] - a[1], ez = b[2] - a[2];
    const len = Math.hypot(ex, ey, ez); ex /= len; ey /= len; ez /= len;
    // side axis: horizontal perpendicular
    let sx = -ez, sz = ex; const sl = Math.hypot(sx, sz); sx /= sl; sz /= sl;
    // up = side x forward... compute u = e x s
    let ux = ey * sz - ez * 0, uy = ez * sx - ex * sz, uz = ex * 0 - ey * sx;
    if (uy < 0) { ux = -ux; uy = -uy; uz = -uz; sx = -sx; sz = -sz; }
    const ul = Math.hypot(ux, uy, uz); ux /= ul; uy /= ul; uz /= ul;
    let cx = (a[0] + b[0]) / 2, cy = (a[1] + b[1]) / 2, cz = (a[2] + b[2]) / 2;
    let hx = len / 2, hy = halfH, hz = halfW;
    if (floor) { cx -= ux * halfH; cy -= uy * halfH; cz -= uz * halfH; }
    else {
      // wall: vertical plate, height axis = world-ish up, thickness = side
      hy = halfH; hz = halfW;
      return { type: 2, cx, cy, cz, ax: [ex, ey, ez], ay: [ux, uy, uz], az: [sx, 0, sz], h: [hx, halfH, halfW], mat, group, wall: true };
    }
    return { type: 2, cx, cy, cz, ax: [ex, ey, ez], ay: [ux, uy, uz], az: [sx, 0, sz], h: [hx, hy, hz], mat, group };
  }

  buildColliderGrid() {
    this.gcell = 0.5;
    this.grid = new Map();
    this.colliders.forEach((c, idx) => this.insertCollider(c, idx));
  }

  colliderBounds(c) {
    if (c.type === 0) return [c.x - c.r, c.z - c.r, c.x + c.r, c.z + c.r];
    if (c.type === 1) return [Math.min(c.ax, c.bx) - c.r, Math.min(c.az, c.bz) - c.r, Math.max(c.ax, c.bx) + c.r, Math.max(c.az, c.bz) + c.r];
    const ext = Math.abs(c.ax[0]) * c.h[0] + Math.abs(c.ay[0]) * c.h[1] + Math.abs(c.az[0]) * c.h[2];
    const ezt = Math.abs(c.ax[2]) * c.h[0] + Math.abs(c.ay[2]) * c.h[1] + Math.abs(c.az[2]) * c.h[2];
    return [c.cx - ext, c.cz - ezt, c.cx + ext, c.cz + ezt];
  }

  insertCollider(c, idx) {
    const [x0, z0, x1, z1] = this.colliderBounds(c);
    const g = this.gcell, m = BALL_R + 0.02;
    for (let i = Math.floor((x0 - m) / g); i <= Math.floor((x1 + m) / g); i++) {
      for (let j = Math.floor((z0 - m) / g); j <= Math.floor((z1 + m) / g); j++) {
        const key = i * 100003 + j;
        let a = this.grid.get(key);
        if (!a) { a = []; this.grid.set(key, a); }
        a.push(idx);
      }
    }
  }

  cellList(x, z) {
    return this.grid.get(Math.floor(x / this.gcell) * 100003 + Math.floor(z / this.gcell));
  }

  // ---------------------------------------------------------------- launch geometry
  /** Chute polyline (release, kink, exit) in world coords for start k. */
  chuteFor(k) {
    const st = STARTS[k];
    const s = st.s;
    const pad = this.pads[k];
    const c = this.c(s), wR = this.wR(s), y0 = this.y0(s);
    const P = (ss, dd, y) => { const p = this.worldXZ(ss, dd); return [p.x, y, p.z]; };
    const benchTop = pad.y + 0.55;
    const [a, b, e] = pad.chute;
    const R0 = P(a.s, a.d, a.y), M = P(b.s, b.d, b.y), E = P(e.s, e.d, e.y);
    void c; void wR; void y0;
    return { R0, M, E, benchTop, pad };
  }

  chuteColliders(k) {
    const { R0, M, E } = this.chuteFor(k);
    const out = [];
    const seg = (a, b) => {
      out.push(this.obbFromSegment(a, b, 0.048, 0.006, MAT.WOOD, 'chute', true));
      // side walls
      let ex = b[0] - a[0], ez = b[2] - a[2]; const l = Math.hypot(ex, ez); ex /= l; ez /= l;
      const nx = -ez, nz = ex;
      for (const side of [-1, 1]) {
        const o = 0.052 * side;
        const aa = [a[0] + nx * o, a[1] + 0.03, a[2] + nz * o], bb = [b[0] + nx * o, b[1] + 0.03, b[2] + nz * o];
        out.push(this.obbFromSegment(aa, bb, 0.005, 0.032, MAT.WOOD, 'chute'));
      }
    };
    seg(R0, M); seg(M, E);
    return out;
  }
}
