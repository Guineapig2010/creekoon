// Factory, finish station, creek equipment and other built objects.
import * as THREE from 'three';
import { STARTS, S_FINISH, S_BASKET, BALL_R, UPGRADES } from '../core/config.js';
import { ARM } from '../core/game.js';
import { woodTexture, barkTexture, labelTexture } from './textures.js';

const V = (a) => new THREE.Vector3(a[0], a[1], a[2]);

export const MATS = {};
export function mats() {
  if (MATS.wood) return MATS;
  MATS.wood = new THREE.MeshStandardMaterial({ map: woodTexture(256, '#a0703f'), roughness: 0.8 });
  MATS.darkWood = new THREE.MeshStandardMaterial({ map: woodTexture(256, '#6b4a2a'), roughness: 0.85 });
  MATS.steel = new THREE.MeshStandardMaterial({ color: 0x9aa3ab, metalness: 0.75, roughness: 0.35 });
  MATS.darkSteel = new THREE.MeshStandardMaterial({ color: 0x3d434a, metalness: 0.6, roughness: 0.45 });
  MATS.green = new THREE.MeshStandardMaterial({ color: 0x2f6b45, metalness: 0.3, roughness: 0.5 });
  MATS.brass = new THREE.MeshStandardMaterial({ color: 0xc9a14a, metalness: 0.85, roughness: 0.3 });
  MATS.blue = new THREE.MeshStandardMaterial({ color: 0x2462b8, metalness: 0.4, roughness: 0.4 });
  MATS.red = new THREE.MeshStandardMaterial({ color: 0xc23a2b, metalness: 0.4, roughness: 0.35 });
  MATS.rubber = new THREE.MeshStandardMaterial({ color: 0x222224, roughness: 0.9 });
  MATS.yellow = new THREE.MeshStandardMaterial({ color: 0xf2b632, roughness: 0.55 });
  MATS.orange = new THREE.MeshStandardMaterial({ color: 0xe9752b, roughness: 0.6 });
  MATS.white = new THREE.MeshStandardMaterial({ color: 0xf0f0ea, roughness: 0.35 });
  MATS.bark = new THREE.MeshStandardMaterial({ map: barkTexture(), roughness: 1 });
  MATS.root = new THREE.MeshStandardMaterial({ color: 0x5b4330, map: barkTexture(), roughness: 0.95 });
  MATS.glass = new THREE.MeshStandardMaterial({ color: 0xbfd8e0, transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0.1 });
  MATS.mesh = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    g.strokeStyle = '#cfd5d8'; g.lineWidth = 3;
    for (let i = 0; i <= 64; i += 16) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 64); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(64, i); g.stroke(); }
    const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(6, 3);
    return new THREE.MeshStandardMaterial({ map: t, transparent: true, alphaTest: 0.3, side: THREE.DoubleSide, metalness: 0.6, roughness: 0.4 });
  })();
  MATS.lamp = new THREE.MeshStandardMaterial({ color: 0x334433, emissive: 0x000000, roughness: 0.3 });
  MATS.laser = new THREE.MeshBasicMaterial({ color: 0xff2020, transparent: true, opacity: 0.8 });
  return MATS;
}

export function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true;
  return m;
}
export function cyl(r0, r1, h, mat, seg = 12) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), mat);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
/** Cylinder between two world points. */
export function rod(a, b, r, mat, seg = 10) {
  const A = a.isVector3 ? a : V(a), B = b.isVector3 ? b : V(b);
  const len = A.distanceTo(B);
  const m = cyl(r, r, len, mat, seg);
  m.position.copy(A).add(B).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  return m;
}
/** Mesh matching an OBB collider. */
export function obbMesh(c, mat) {
  const m = box(c.h[0] * 2, c.h[1] * 2, c.h[2] * 2, mat);
  const basis = new THREE.Matrix4().makeBasis(V(c.ax), V(c.ay), V(c.az));
  m.quaternion.setFromRotationMatrix(basis);
  m.position.set(c.cx, c.cy, c.cz);
  return m;
}
export function capsuleMesh(c, mat) {
  const g = new THREE.Group();
  const a = new THREE.Vector3(c.ax, c.ay, c.az), b = new THREE.Vector3(c.bx, c.by, c.bz);
  g.add(rod(a, b, c.r, mat));
  for (const p of [a, b]) { const s = new THREE.Mesh(new THREE.SphereGeometry(c.r, 10, 8), mat); s.position.copy(p); s.castShadow = true; g.add(s); }
  return g;
}

export function sprite(tex, w, h) {
  const m = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthWrite: false }));
  m.scale.set(w, h, 1);
  return m;
}

// ======================================================================= Workshop
export class Workshop {
  constructor(scene, creek, k = 0) {
    this.creek = creek;
    this.site = k;
    mats();
    const g = new THREE.Group();
    this.group = g;
    scene.add(g);
    // ---- cart + bench
    const top = box(1.35, 0.045, 0.62, MATS.wood, -0.15, 0.53, 0.0);
    g.add(top);
    for (const [x, z] of [[-0.78, -0.26], [-0.78, 0.26], [0.47, -0.26], [0.47, 0.26]]) {
      g.add(box(0.05, 0.5, 0.05, MATS.darkWood, x, 0.26, z));
      const wheel = cyl(0.06, 0.06, 0.03, MATS.rubber, 14);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, 0.06, z + (z > 0 ? 0.04 : -0.04));
      g.add(wheel);
    }
    g.add(box(1.3, 0.03, 0.5, MATS.darkWood, -0.15, 0.16, 0));
    const handle = rod([0.55, 0.4, -0.22], [0.75, 0.62, -0.22], 0.012, MATS.darkWood); g.add(handle);
    const handle2 = rod([0.55, 0.4, 0.22], [0.75, 0.62, 0.22], 0.012, MATS.darkWood); g.add(handle2);
    g.add(rod([0.75, 0.62, -0.22], [0.75, 0.62, 0.22], 0.014, MATS.darkWood));
    // hand station: a small two-part mould and a felt roll
    this.hand = new THREE.Group();
    this.hand.add(box(0.18, 0.03, 0.14, MATS.darkSteel, 0, 0.565, 0));
    const felt = cyl(0.04, 0.04, 0.16, new THREE.MeshStandardMaterial({ color: 0xcfe03c, roughness: 1 }), 16);
    felt.rotation.z = Math.PI / 2; felt.position.set(0.0, 0.6, 0.12);
    this.hand.add(felt);
    this.hand.position.set(0.27, 0, 0.06);
    g.add(this.hand);
    // ---- press (built lazily)
    this.press = new THREE.Group(); g.add(this.press);
    this.heads = [];
    // ---- hopper
    this.hopper = new THREE.Group(); g.add(this.hopper);
    // ---- feeder
    this.feeder = new THREE.Group(); g.add(this.feeder);
    // ---- chute
    this.chute = new THREE.Group(); g.add(this.chute);
    this.config = null;
    this.slots = [];
    this.k = -1;
    this.anim = { press: 0, flap: 0, wheel: 0, hand: 0, headKick: [0, 0] };
    this.home = new THREE.Matrix4();
    // site sign and expansion stations
    this.extras = new THREE.Group(); g.add(this.extras);
    this.signLabel = sprite(labelTexture([STARTS[k].name, 'New Creek Nation factory'], { w: 640, h: 160, font: 'bold 46px Georgia, serif', bg: '#24361f' }), 0.72, 0.18);
    this.signLabel.position.set(0.45, 2.25, 0.3);
    g.add(rod([0.45, 0, 0.3], [0.45, 2.14, 0.3], 0.018, MATS.darkWood));
    g.add(this.signLabel);
    this.counterCanvas = document.createElement('canvas'); this.counterCanvas.width = 256; this.counterCanvas.height = 128;
    this.counterTex = new THREE.CanvasTexture(this.counterCanvas); this.counterTex.colorSpace = THREE.SRGBColorSpace;
    this.counterT = 0;
    this.placeAt(k);
  }

  /** The channel this factory stands on (Crawfish Springs is on its runoff stream). */
  channel(k) { return STARTS[k].cr && this.creek.springs ? this.creek.springs : this.creek; }

  frameFor(k, out = {}) {
    const cr = this.channel(k);
    const pad = cr.padByK[k];
    const s = pad.sC;
    const ls = cr.siteS(STARTS[k]);
    const c = cr.c(ls), wR = cr.wR(ls);
    const p = cr.worldXZ(s, c + wR + 1.05);
    const fr = cr.frame(s);
    out.pos = new THREE.Vector3(p.x, pad.y, p.z);
    out.yaw = Math.atan2(-fr.tz, fr.tx);
    return out;
  }

  placeAt(k) {
    const f = this.frameFor(k);
    this.group.position.copy(f.pos);
    this.group.rotation.set(0, f.yaw, 0);
    this.group.updateMatrixWorld(true);
    if (this.k !== k) { this.k = k; this.buildChute(k); }
  }

  buildChute(k) {
    this.chute.clear();
    const ch = this.channel(k).chuteFor(k);
    const inv = new THREE.Matrix4().copy(this.group.matrixWorld).invert();
    const pts = [V(ch.R0), V(ch.M), V(ch.E)].map((p) => p.applyMatrix4(inv));
    this.chutePts = pts;
    for (let i = 0; i < 2; i++) {
      const a = pts[i], b = pts[i + 1];
      const dir = b.clone().sub(a);
      const len = dir.length(); dir.normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir);
      const seg = new THREE.Group();
      seg.quaternion.copy(q);
      seg.position.copy(a).add(b).multiplyScalar(0.5);
      seg.add(box(len + 0.02, 0.012, 0.11, MATS.wood, 0, -0.006, 0));
      seg.add(box(len + 0.02, 0.07, 0.01, MATS.wood, 0, 0.03, 0.057));
      seg.add(box(len + 0.02, 0.07, 0.01, MATS.wood, 0, 0.03, -0.057));
      const lining = box(len, 0.003, 0.07, MATS.white, 0, 0.001, 0);
      lining.name = 'lining';
      seg.add(lining);
      this.chute.add(seg);
      // trestle legs
      if (i === 0) {
        const mid = a.clone().lerp(b, 0.55);
        this.chute.add(rod([mid.x, mid.y - 0.01, mid.z - 0.05], [mid.x, mid.y - 0.45, mid.z - 0.05], 0.01, MATS.darkWood));
        this.chute.add(rod([mid.x, mid.y - 0.01, mid.z + 0.05], [mid.x, mid.y - 0.45, mid.z + 0.05], 0.01, MATS.darkWood));
      }
    }
    // spacing sensor at the chute exit
    const e = pts[2], m = pts[1];
    this.sensor = new THREE.Group();
    const sb = box(0.04, 0.05, 0.03, MATS.darkSteel, 0, 0.06, -0.08);
    const sb2 = box(0.04, 0.05, 0.03, MATS.darkSteel, 0, 0.06, 0.08);
    const beam = box(0.004, 0.004, 0.16, MATS.laser, 0, 0.045, 0);
    this.sensor.add(sb, sb2, beam);
    this.sensor.position.copy(m.clone().lerp(e, 0.4));
    const dir = e.clone().sub(m).normalize();
    this.sensor.rotation.y = Math.atan2(-dir.z, dir.x);
    this.chute.add(this.sensor);
    this.config = null; // force refresh of lining/sensor visibility
  }

  /** Rebuild the machine models when purchases change. */
  configure(owned) {
    const key = [...owned].sort().join(',');
    if (key === this.config) return;
    this.config = key;
    const has = (id) => owned.has(id);
    // expansion stations: batch counter, infeed tray, felt tables, shape gauge, NCN stamp, replica jig
    this.extras.clear();
    this.counter = null;
    if (has('batchCounter')) {
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.11), new THREE.MeshBasicMaterial({ map: this.counterTex }));
      scr.position.set(-0.3, 1.0, -0.17);
      this.extras.add(box(0.24, 0.13, 0.03, MATS.darkSteel, -0.3, 1.0, -0.19));
      this.extras.add(scr);
      this.extras.add(rod([-0.3, 0.6, -0.19], [-0.3, 0.94, -0.19], 0.008, MATS.darkSteel));
      this.counter = scr;
    }
    if (has('infeedTray')) this.extras.add(box(0.16, 0.02, 0.12, MATS.steel, -0.82, 0.62, 0.12));
    if (has('fastFelt')) this.extras.add(box(0.22, 0.03, 0.18, new THREE.MeshStandardMaterial({ color: 0xcfe03c, roughness: 1 }), -0.15, 0.565, 0.18));
    if (has('parallelFelt')) this.extras.add(box(0.22, 0.03, 0.18, new THREE.MeshStandardMaterial({ color: 0xb8cc30, roughness: 1 }), 0.1, 0.565, 0.2));
    if (has('shapeGauge')) { this.extras.add(box(0.08, 0.12, 0.08, MATS.blue, -0.08, 0.66, -0.06)); this.extras.add(rod([-0.08, 0.72, -0.06], [-0.2, 0.72, -0.06], 0.006, MATS.steel)); }
    if (has('ncnStamp')) {
      this.extras.add(box(0.12, 0.2, 0.1, MATS.red, 0.3, 0.66, -0.15));
      const lab = sprite(labelTexture('NCN', { w: 256, h: 96, font: 'bold 64px sans-serif', bg: '#7a1d14', border: '#f6f1d8' }), 0.14, 0.05);
      lab.position.set(0.3, 0.84, -0.15); this.extras.add(lab);
    }
    if (has('replicaJig')) this.extras.add(box(0.1, 0.1, 0.1, MATS.brass, 0.42, 0.61, 0.15));
    // press
    this.press.clear();
    this.heads = [];
    if (has('press')) {
      const nHeads = has('twinPress') ? 2 : 1;
      const frameMat = has('turbo') ? MATS.red : MATS.green;
      const base = box(0.3, 0.03, nHeads === 2 ? 0.46 : 0.24, MATS.darkSteel, -0.6, 0.565, nHeads === 2 ? 0.0 : 0.12);
      this.press.add(base);
      const zs = nHeads === 2 ? [0.12, -0.12] : [0.12];
      const zMin = Math.min(...zs) - 0.11, zMax = Math.max(...zs) + 0.11;
      for (const z of [zMin, zMax]) this.press.add(box(0.05, 0.5, 0.05, frameMat, -0.6, 0.83, z));
      this.press.add(box(0.12, 0.08, zMax - zMin + 0.05, frameMat, -0.6, 1.09, (zMin + zMax) / 2));
      for (const z of zs) {
        const head = new THREE.Group();
        head.add(rod([0, 0.0, 0], [0, 0.22, 0], 0.018, MATS.steel));
        head.add(box(0.12, 0.05, 0.12, frameMat, 0, -0.01, 0));
        const moldMat = has('quickMold') ? MATS.brass : MATS.steel;
        const top = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), moldMat);
        top.rotation.x = Math.PI; top.position.y = -0.035;
        head.add(top);
        head.position.set(-0.6, 0.86, z);
        this.press.add(head);
        const lower = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), moldMat);
        lower.rotation.x = Math.PI; lower.position.set(-0.6, 0.625, z);
        this.press.add(lower);
        this.heads.push({ head, z, lower });
        // slide from mould to hopper
        this.press.add(rod([-0.52, 0.62, z], [-0.38, 0.68, -0.06], 0.008, MATS.steel));
      }
      if (has('servo') || has('turbo')) {
        const servo = cyl(0.05, 0.05, 0.14, MATS.blue, 16);
        servo.rotation.z = Math.PI / 2;
        servo.position.set(-0.6, 1.17, (zMin + zMax) / 2);
        this.press.add(servo);
        this.press.add(rod([-0.6, 1.17, zMax], [-0.6, 0.6, zMax + 0.06], 0.006, MATS.rubber));
      }
      if (has('turbo')) {
        const fly = cyl(0.09, 0.09, 0.02, MATS.darkSteel, 20);
        fly.rotation.x = Math.PI / 2;
        fly.position.set(-0.6, 0.95, zMax + 0.05);
        this.flywheel = fly;
        this.press.add(fly);
        const strip = box(0.02, 0.4, 0.01, new THREE.MeshStandardMaterial({ color: 0xff5533, emissive: 0xff3311, emissiveIntensity: 1.2 }), -0.53, 0.83, zMax);
        this.press.add(strip);
      } else this.flywheel = null;
    }
    // hopper
    this.hopper.clear();
    if (has('press')) {
      const cap = has('bulkHopper') ? 40 : has('hopperExt') ? 20 : 8;
      const W = cap === 40 ? 0.3 : cap === 20 ? 0.24 : 0.2;
      const D = cap === 40 ? 0.3 : 0.2;
      const H = cap === 40 ? 0.3 : cap === 20 ? 0.32 : 0.16;
      const x = -0.3, z = -0.06, y0 = 0.6;
      const wallMat = MATS.glass;
      this.hopper.add(box(W, 0.01, D, MATS.darkSteel, x, y0 - 0.005, z));
      this.hopper.add(box(W, H, 0.006, wallMat, x, y0 + H / 2, z - D / 2));
      this.hopper.add(box(W, H, 0.006, wallMat, x, y0 + H / 2, z + D / 2));
      this.hopper.add(box(0.006, H, D, wallMat, x - W / 2, y0 + H / 2, z));
      this.hopper.add(box(0.006, H, D, wallMat, x + W / 2, y0 + H / 2, z));
      for (const [dx, dz] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) this.hopper.add(box(0.012, H + 0.02, 0.012, MATS.darkSteel, x + (dx * W) / 2, y0 + H / 2, z + (dz * D) / 2));
      this.hopper.add(box(0.012, 0.012, D, MATS.darkSteel, x - W / 2, y0 + H, z));
      this.hopper.add(box(0.012, 0.012, D, MATS.darkSteel, x + W / 2, y0 + H, z));
      // slots for balls
      const per = Math.max(1, Math.floor((W - 0.01) / (BALL_R * 2.05))) * Math.max(1, Math.floor((D - 0.01) / (BALL_R * 2.05)));
      const nx = Math.max(1, Math.floor((W - 0.01) / (BALL_R * 2.05))), nz = Math.max(1, Math.floor((D - 0.01) / (BALL_R * 2.05)));
      this.slots = [];
      for (let i = 0; i < cap; i++) {
        const layer = Math.floor(i / per), r = i % per;
        const ix = r % nx, iz = Math.floor(r / nx);
        this.slots.push(new THREE.Vector3(x - ((nx - 1) * BALL_R * 2.05) / 2 + ix * BALL_R * 2.05 + (layer % 2) * 0.008, y0 + BALL_R + 0.003 + layer * BALL_R * 1.75, z - ((nz - 1) * BALL_R * 2.05) / 2 + iz * BALL_R * 2.05));
      }
      if (cap === 40) {
        // fill gauge
        this.gaugeBg = box(0.03, H, 0.01, MATS.rubber, x + W / 2 + 0.03, y0 + H / 2, z - D / 2 + 0.02);
        this.gauge = box(0.022, H, 0.012, new THREE.MeshStandardMaterial({ color: 0x55dd55, emissive: 0x22aa22, emissiveIntensity: 0.8 }), x + W / 2 + 0.03, y0 + H / 2, z - D / 2 + 0.02);
        this.gaugeH = H; this.gaugeY = y0;
        this.hopper.add(this.gaugeBg, this.gauge);
      } else this.gauge = null;
    } else this.slots = [];
    // feeder
    this.feeder.clear();
    this.wheel = null; this.flap = null;
    if (has('feeder')) {
      this.feeder.add(box(0.12, 0.08, 0.1, MATS.green, -0.13, 0.6, -0.2));
      if (has('indexed') || has('turbo')) {
        const wheel = new THREE.Group();
        const disc = cyl(0.07, 0.07, 0.03, MATS.yellow, 8);
        disc.rotation.x = Math.PI / 2;
        wheel.add(disc);
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          const pocket = box(0.02, 0.025, 0.034, MATS.darkSteel, Math.cos(a) * 0.06, Math.sin(a) * 0.06, 0);
          pocket.rotation.z = a;
          wheel.add(pocket);
        }
        wheel.position.set(-0.04, 0.63, -0.26);
        this.wheel = wheel;
        this.feeder.add(wheel);
      } else {
        const flap = box(0.01, 0.07, 0.09, MATS.steel, 0, 0.035, 0);
        const pivot = new THREE.Group();
        pivot.add(flap);
        pivot.position.set(-0.04, 0.58, -0.28);
        this.flap = pivot;
        this.feeder.add(pivot);
      }
    }
    // chute options
    this.chute.traverse((o) => { if (o.name === 'lining') o.visible = has('lowFriction'); });
    if (this.sensor) this.sensor.visible = has('spacingSensor');
  }

  hopperSlotsWorld() {
    return this.slots.map((s) => s.clone().applyMatrix4(this.group.matrixWorld));
  }

  /** World position of a press mould (for the forming ball). */
  moldWorld(i) {
    const h = this.heads[i];
    if (!h) return null;
    return new THREE.Vector3(-0.6, 0.625 + BALL_R * 0.2, h.z).applyMatrix4(this.group.matrixWorld);
  }

  handWorld() { return new THREE.Vector3(0.27, 0.58 + BALL_R, 0.06).applyMatrix4(this.group.matrixWorld); }
  feederWorld() { return new THREE.Vector3(-0.1, 0.8, -0.2).applyMatrix4(this.group.matrixWorld); }
  pressWorld() { return new THREE.Vector3(-0.6, 1.25, 0).applyMatrix4(this.group.matrixWorld); }

  update(dt, game) {
    const A = this.anim;
    const site = game.sites[this.site];
    A.flap = Math.max(0, A.flap - dt * 3);
    A.hand = Math.max(0, A.hand - dt * 2);
    const N = game.siteNumbers(this.site);
    // press heads: stroke down as the press cycle completes
    const prog = site.pressProg;
    this.heads.forEach((h, i) => {
      let st;
      if (this.heads.length === 2) st = (prog + (i === (site.pressCount % 2) ? 0 : 0.5)) % 1;
      else st = prog;
      const down = st > 0.75 && !site.pressStatus ? Math.sin(((st - 0.75) / 0.25) * Math.PI) : 0;
      const kick = A.headKick[i];
      h.head.position.y = 0.86 - down * 0.14 + kick * 0.04;
      A.headKick[i] = Math.max(0, kick - dt * (site.owned.has('quickMold') ? 6 : 3));
    });
    if (this.flywheel) this.flywheel.rotation.y += dt * 20;
    if (this.wheel) this.wheel.rotation.z -= dt * (site.feederStatus ? 0.3 : 6 / Math.max(0.5, N.feeder)) * (game.settings.auto && site.enabled.feeder ? 1 : 0);
    if (this.flap) this.flap.rotation.z = -A.flap * 1.1;
    if (this.counter) {
      this.counterT -= dt;
      if (this.counterT <= 0) {
        this.counterT = 0.5;
        const g2 = this.counterCanvas.getContext('2d');
        g2.fillStyle = '#081008'; g2.fillRect(0, 0, 256, 128);
        g2.fillStyle = '#9dff8a'; g2.font = 'bold 20px monospace';
        const names = ['STD', 'DRY', 'SOFT', 'SEAM', 'RAPID', 'SEL'];
        site.madeBy.forEach((n, r) => { if (n || r === site.recipe) g2.fillText(`${names[r]} ${n}`, 8 + (r % 2) * 124, 24 + Math.floor(r / 2) * 26); });
        const rate = 60 / (N.cycle * (site.recipe === 5 ? 1.15 : 1));
        g2.fillStyle = '#ffcf4a'; g2.fillText(`${site.pressStatus ? '0' : rate.toFixed(0)}/min`, 8, 116);
        this.counterTex.needsUpdate = true;
      }
    }
    if (this.gauge) {
      const f = Math.max(0.02, site.hopper.length / 40);
      this.gauge.scale.y = f;
      this.gauge.position.y = this.gaugeY + (this.gaugeH * f) / 2;
    }
    this.hand.position.y = Math.sin(A.hand * Math.PI) * 0.02;
  }

  onEvent(e) {
    if (e.type === 'pressed' && e.site === this.site) this.anim.headKick[e.head % Math.max(1, this.heads.length)] = 1;
    if (e.type === 'launch' && e.k === this.site) this.anim.flap = 1;
    if (e.type === 'handMade' && e.site === this.site) this.anim.hand = 1;
  }
}

// ======================================================================= Finish station
export class FinishStation {
  constructor(scene, creek) {
    mats();
    this.creek = creek;
    const g = new THREE.Group();
    scene.add(g);
    this.group = g;
    const s = S_FINISH, c = creek.c(s);
    const w = creek.wR(s) + 0.07;
    const P = (ss, dd, y) => { const p = creek.worldXZ(ss, dd); return new THREE.Vector3(p.x, y, p.z); };
    const fr = creek.frame(s);
    const yaw = Math.atan2(-fr.tz, fr.tx);
    const L = P(s, c - w, creek.bedH(s, c - w) - 0.05), R = P(s, c + w, creek.bedH(s, c + w) - 0.05);
    const H = 0.9;
    g.add(rod(L, L.clone().setY(L.y + H), 0.04, MATS.wood));
    g.add(rod(R, R.clone().setY(R.y + H), 0.04, MATS.wood));
    const yTop = Math.max(L.y, R.y) + H - 0.05;
    g.add(rod(L.clone().setY(yTop), R.clone().setY(yTop), 0.03, MATS.wood));
    const bannerMat = new THREE.MeshStandardMaterial({ map: labelTexture('FINISH', { w: 512, h: 112, bg: '#1e3b23', border: '#e8d27a', font: 'bold 70px Georgia, serif' }), roughness: 0.7 });
    for (const flip of [0, Math.PI]) {
      const banner = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.6, 0.16), bannerMat);
      banner.position.copy(L).lerp(R, 0.5).setY(yTop - 0.12);
      banner.rotation.y = yaw - Math.PI / 2 + flip;
      g.add(banner);
    }
    // sensor lamps on post tops
    this.lamps = [];
    for (const p of [L, R]) {
      const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 10), MATS.lamp.clone());
      lamp.position.copy(p).setY(p.y + H + 0.04);
      g.add(lamp);
      this.lamps.push(lamp);
    }
    // timing wire just above the water
    const yW = creek.y0(s) + 0.09;
    g.add(rod(L.clone().setY(yW), R.clone().setY(yW), 0.002, MATS.darkSteel));
    this.flag = new THREE.Group();
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.08), new THREE.MeshStandardMaterial({ color: 0x2bbf5b, side: THREE.DoubleSide }));
    fl.position.x = 0.06;
    this.flag.add(fl);
    this.flag.position.copy(R).setY(R.y + H - 0.12);
    this.flag.rotation.y = yaw;
    g.add(this.flag);
    this.flash = 0;
    this.yaw = yaw;

    // basket
    this.basketGroup = new THREE.Group();
    g.add(this.basketGroup);
    this.P = P;
    // timing board
    this.board = null;
    this.boardCanvas = document.createElement('canvas');
    this.boardCanvas.width = 512; this.boardCanvas.height = 320;
    this.boardTex = new THREE.CanvasTexture(this.boardCanvas);
    this.boardTex.colorSpace = THREE.SRGBColorSpace;
    this.boardT = 0;
    // conveyor + crate
    this.conv = new THREE.Group(); g.add(this.conv);
    this.config = '';
    this.slots = [];
    this.crateSlots = [];
    this.convBalls = [];
  }

  configure(owned) {
    const key = ['wideBasket', 'conveyor', 'timingGate', 'splitTray', 'overflowCrate', 'laneMarkers', 'poweredBelt', 'twinPacking', 'stacker', 'industrialCatch'].map((k) => (owned.has(k) ? 1 : 0)).join('');
    if (key === this.config) return;
    this.config = key;
    const cr = this.creek, P = this.P;
    const wide = owned.has('wideBasket');
    // ---- basket
    this.basketGroup.clear();
    const s0 = S_BASKET - 0.05, len = wide ? 0.55 : 0.32;
    const c = cr.c(S_BASKET);
    const hw = wide ? 0.32 : 0.22;
    const yB = cr.bedH(S_BASKET, c);
    const yTop = cr.y0(S_BASKET) + (wide ? 0.16 : 0.12);
    const fr = cr.frame(S_BASKET);
    const yaw = Math.atan2(-fr.tz, fr.tx);
    const mid = P(s0 + len / 2, c, (yB + yTop) / 2);
    const bx = new THREE.Group();
    bx.position.copy(mid); bx.rotation.y = yaw;
    const h = yTop - yB;
    const panel = (w2, h2, x, y, z, ry) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w2, h2), MATS.mesh); m.position.set(x, y, z); m.rotation.y = ry; bx.add(m); };
    panel(len, h, 0, 0, hw, 0); panel(len, h, 0, 0, -hw, 0); panel(hw * 2, h, len / 2, 0, 0, Math.PI / 2);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(len, hw * 2), MATS.mesh); floor.rotation.x = -Math.PI / 2; floor.position.y = -h / 2 + 0.01; bx.add(floor);
    for (const [x, z] of [[-len / 2, -hw], [-len / 2, hw], [len / 2, -hw], [len / 2, hw]]) bx.add(box(0.012, h + 0.02, 0.012, MATS.steel, x, 0, z));
    bx.add(box(len, 0.012, 0.012, MATS.steel, 0, h / 2, hw)); bx.add(box(len, 0.012, 0.012, MATS.steel, 0, h / 2, -hw));
    this.basketGroup.add(bx);
    // ball slots inside basket (settling)
    this.slots = [];
    const nx = Math.floor(len / (BALL_R * 2.1)), nz = Math.floor((hw * 2) / (BALL_R * 2.1));
    const cap = wide ? 14 : 6;
    for (let i = 0; i < cap; i++) {
      const layer = Math.floor(i / (nx * nz)), r = i % (nx * nz);
      const lx = -len / 2 + BALL_R * 1.1 + (r % nx) * BALL_R * 2.1, lz = -hw + BALL_R * 1.1 + Math.floor(r / nx) * BALL_R * 2.1;
      const v = new THREE.Vector3(lx, -h / 2 + BALL_R + 0.012 + layer * BALL_R * 1.8, lz);
      bx.updateMatrixWorld(true);
      this.slots.push(v.applyMatrix4(bx.matrixWorld));
    }
    // drain tube to the right bank
    const tubeA = P(S_BASKET + len, c + 0.1, yB + 0.02), tubeB = P(S_BASKET + len + 0.6, c + 0.9, yB - 0.05);
    this.basketGroup.add(rod(tubeA, tubeB, 0.045, MATS.darkSteel));
    this.drainEnd = tubeB;
    // ---- conveyor and crate
    this.conv.clear();
    this.crateSlots = [];
    if (owned.has('conveyor')) {
      const a = P(S_BASKET + len * 0.5, c - hw - 0.02, yTop - 0.02);
      const b = P(S_BASKET + 0.9, c - hw - 1.0, cr.bedH(S_BASKET + 0.9, c - hw - 1.0) + 0.35);
      const dir = b.clone().sub(a);
      const L2 = dir.length();
      const belt = new THREE.Group();
      belt.position.copy(a).lerp(b, 0.5);
      belt.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir.clone().normalize());
      belt.add(box(L2, 0.015, 0.1, MATS.rubber));
      belt.add(box(L2, 0.03, 0.008, MATS.steel, 0, 0.012, 0.055));
      belt.add(box(L2, 0.03, 0.008, MATS.steel, 0, 0.012, -0.055));
      this.conv.add(belt);
      for (let i = 0; i < 3; i++) { const q = a.clone().lerp(b, i / 2); this.conv.add(rod(q, q.clone().setY(q.y - 0.4), 0.012, MATS.darkSteel)); }
      this.beltA = a; this.beltB = b;
      // crate
      const cp = P(S_BASKET + 1.25, c - hw - 1.35, 0);
      cp.y = cr.bedH(S_BASKET + 1.25, c - hw - 1.35);
      const crate = new THREE.Group();
      crate.position.copy(cp); crate.rotation.y = yaw;
      const cw = 0.5, cd = 0.4, ch = 0.28;
      crate.add(box(cw, 0.02, cd, MATS.wood, 0, 0.01, 0));
      for (const [x, z, w2, d2] of [[0, cd / 2, cw, 0.02], [0, -cd / 2, cw, 0.02], [cw / 2, 0, 0.02, cd], [-cw / 2, 0, 0.02, cd]]) {
        for (let k = 0; k < 3; k++) crate.add(box(w2, 0.07, d2, MATS.wood, x, 0.05 + k * 0.09, z));
      }
      this.conv.add(crate);
      crate.updateMatrixWorld(true);
      const nx2 = 7, nz2 = 5;
      for (let i = 0; i < 70; i++) {
        const layer = Math.floor(i / (nx2 * nz2)), r = i % (nx2 * nz2);
        const v = new THREE.Vector3(-cw / 2 + 0.04 + (r % nx2) * BALL_R * 2.02 + (layer % 2) * 0.02, 0.02 + BALL_R + layer * BALL_R * 1.7, -cd / 2 + 0.04 + Math.floor(r / nx2) * BALL_R * 2.02 + (layer % 2) * 0.02);
        this.crateSlots.push(v.applyMatrix4(crate.matrixWorld));
      }
    }
    // ---- expansion finish equipment
    if (!this.finExtras) { this.finExtras = new THREE.Group(); this.group.add(this.finExtras); }
    this.finExtras.clear();
    this.stackSlots = [];
    const sB = S_BASKET;
    if (owned.has('splitTray')) {
      // a second catch tray just past the same payout plane, on the other half of the channel
      const t2 = new THREE.Group();
      t2.position.copy(P(sB + len + 0.35, c, yB + 0.05)); t2.rotation.y = yaw;
      t2.add(box(0.36, 0.02, hw * 1.6, MATS.mesh, 0, 0, 0));
      for (const z of [-hw * 0.8, hw * 0.8]) t2.add(box(0.36, 0.12, 0.012, MATS.steel, 0, 0.06, z));
      this.finExtras.add(t2);
    }
    if (owned.has('overflowCrate')) {
      const op = P(sB + 0.4, c + hw + 1.2, 0); op.y = cr.bedH(sB + 0.4, c + hw + 1.2);
      const oc = new THREE.Group(); oc.position.copy(op); oc.rotation.y = yaw;
      for (let k2 = 0; k2 < 4; k2++) oc.add(box(0.6, 0.08, 0.45, MATS.darkWood, 0, 0.05 + k2 * 0.1, 0));
      const lab = sprite(labelTexture('OVERFLOW', { w: 384, h: 96, font: 'bold 48px sans-serif', bg: '#3b2a12' }), 0.36, 0.09);
      lab.position.set(0, 0.55, 0); oc.add(lab);
      this.finExtras.add(oc);
      this.overflowPos = op;
    } else this.overflowPos = null;
    if (owned.has('laneMarkers')) {
      for (const side of [-1, 1]) {
        const a = P(S_FINISH - 0.8, cr.c(S_FINISH - 0.8) + side * 0.18, cr.y0(S_FINISH) + 0.004);
        const b = P(S_FINISH, cr.c(S_FINISH) + side * 0.18, cr.y0(S_FINISH) + 0.004);
        this.finExtras.add(rod(a, b, 0.006, side < 0 ? MATS.orange : MATS.blue, 6));
      }
    }
    if (owned.has('poweredBelt') || owned.has('twinPacking')) {
      const a = P(sB + len * 0.5, c - hw - 0.02, yTop + 0.03), b = P(sB + 0.9, c - hw - 1.0, cr.bedH(sB + 0.9, c - hw - 1.0) + 0.38);
      const n = 6;
      for (let i = 0; i <= n; i++) { const q = a.clone().lerp(b, i / n); const r = cyl(0.012, 0.012, 0.12, owned.has('twinPacking') ? MATS.red : MATS.yellow, 8); r.position.copy(q); r.rotation.x = Math.PI / 2; r.rotation.y = yaw; this.finExtras.add(r); }
      if (owned.has('twinPacking')) { const a2 = a.clone().add(new THREE.Vector3(0, 0, 0.14)), b2 = b.clone().add(new THREE.Vector3(0, 0, 0.14)); this.finExtras.add(rod(a2, b2, 0.05, MATS.rubber)); }
    }
    if (owned.has('industrialCatch')) {
      const fp = P(sB + 0.2, c, cr.y0(sB) + 0.5);
      const fr2 = new THREE.Group(); fr2.position.copy(fp); fr2.rotation.y = yaw;
      for (const z of [-hw - 0.15, hw + 0.15]) fr2.add(box(0.05, 1.0, 0.05, MATS.yellow, 0, 0, z));
      fr2.add(box(0.05, 0.05, hw * 2 + 0.35, MATS.yellow, 0, 0.5, 0));
      this.finExtras.add(fr2);
    }
    if (owned.has('stacker')) {
      for (let r = 0; r < 6; r++) {
        const cp2 = P(sB + 1.6 + (r % 3) * 0.42, c + hw + 0.9 + Math.floor(r / 3) * 0.42, 0);
        cp2.y = cr.bedH(sB + 1.6 + (r % 3) * 0.42, c + hw + 0.9 + Math.floor(r / 3) * 0.42);
        const cg = new THREE.Group(); cg.position.copy(cp2); cg.rotation.y = yaw;
        cg.add(box(0.36, 0.02, 0.3, MATS.wood, 0, 0.01, 0));
        for (const [x, z, w2, d2] of [[0, 0.15, 0.36, 0.015], [0, -0.15, 0.36, 0.015], [0.18, 0, 0.015, 0.3], [-0.18, 0, 0.015, 0.3]]) cg.add(box(w2, 0.14, d2, MATS.wood, x, 0.07, z));
        this.finExtras.add(cg);
        cg.updateMatrixWorld(true);
        const slots = [];
        for (let i = 0; i < 24; i++) slots.push(new THREE.Vector3(-0.14 + (i % 5) * 0.068, 0.04 + Math.floor(i / 20) * 0.06, -0.1 + (Math.floor(i / 5) % 4) * 0.068).applyMatrix4(cg.matrixWorld));
        this.stackSlots.push(slots);
      }
    }
    // ---- timing board
    if (owned.has('timingGate') && !this.board) {
      const bp = P(S_FINISH - 0.35, cr.c(S_FINISH) - cr.wL(S_FINISH) - 0.45, 0);
      bp.y = cr.bedH(S_FINISH - 0.35, cr.c(S_FINISH) - cr.wL(S_FINISH) - 0.45);
      const bg = new THREE.Group();
      bg.position.copy(bp);
      bg.rotation.y = this.yaw - Math.PI / 2 + 0.5;
      bg.add(rod([0, 0, 0], [0, 0.9, 0], 0.03, MATS.darkWood));
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.35), new THREE.MeshBasicMaterial({ map: this.boardTex }));
      scr.position.set(0, 1.0, 0.03);
      bg.add(box(0.6, 0.39, 0.04, MATS.darkWood, 0, 1.0, 0));
      bg.add(scr);
      const back = scr.clone(); back.rotation.y = Math.PI; back.position.z = -0.03; bg.add(back);
      this.group.add(bg);
      this.board = bg;
    }
  }

  drawBoard(game) {
    const g = this.boardCanvas.getContext('2d');
    g.fillStyle = '#0b120c'; g.fillRect(0, 0, 512, 320);
    g.fillStyle = '#ffcf4a'; g.font = 'bold 36px monospace';
    g.fillText('TIMING GATE', 24, 52);
    g.fillStyle = '#9dff8a'; g.font = 'bold 34px monospace';
    const lf = game.lastFinish;
    g.fillText(`LAST    ${lf ? lf.time.toFixed(1) + ' s' : '--'}`, 24, 118);
    g.fillText(`BALLS/MIN ${game.ballsPerMin(60).toFixed(1)}`, 24, 178);
    const rs = game.routeStats[game.sel];
    g.fillText(`AVG     ${rs.n ? rs.avg.toFixed(1) + ' s' : '--'}`, 24, 238);
    g.fillStyle = '#7aa'; g.font = '24px monospace';
    g.fillText(`from ${STARTS[game.sel].name}`, 24, 292);
    this.boardTex.needsUpdate = true;
  }

  update(dt, game) {
    this.flash = Math.max(0, this.flash - dt * 2);
    for (const l of this.lamps) {
      l.material.emissive.setRGB(0.1 + this.flash * 0.3, 0.2 + this.flash * 1.6, 0.1 + this.flash * 0.4);
    }
    this.flag.rotation.z = -this.flash * 1.2;
    if (this.board) {
      this.boardT -= dt;
      if (this.boardT <= 0) { this.boardT = 0.5; this.drawBoard(game); }
    }
  }

  onEvent(e) {
    if (e.type === 'finish') this.flash = 1;
  }
}

// ======================================================================= Creek equipment
export class CreekEquipment {
  constructor(scene, creek) {
    mats();
    this.creek = creek;
    this.scene = scene;
    this.items = {};
    const cols = [...creek.colliders, ...(creek.springs ? creek.springs.colliders : [])];
    const spr = creek.springs || creek;
    const groupMeshes = (group, mat) => {
      const g = new THREE.Group();
      for (const c of cols) {
        if (c.group !== group) continue;
        if (c.type === 1) g.add(capsuleMesh(c, mat));
        else if (c.type === 2) g.add(obbMesh(c, mat));
      }
      return g;
    };
    const add = (id, g) => { g.visible = false; scene.add(g); this.items[id] = g; };
    // root rail with posts
    {
      const g = groupMeshes('rootRail', MATS.steel);
      const [a, b] = creek.rootRailPts;
      for (const p of [a, b]) g.add(rod([p[0], p[1] - 0.12, p[2]], [p[0], p[1] + 0.01, p[2]], 0.008, MATS.darkSteel));
      add('rootRail', g);
    }
    // gravel mat conforming to the smoothed surface
    {
      const rp = creek.roughPatch;
      const rows = 14, colsN = 10;
      const pos = [], idx = [];
      for (let i = 0; i < rows; i++) {
        const s = rp.s0 - 0.05 + ((rp.s1 - rp.s0 + 0.1) * i) / (rows - 1);
        const c = creek.c(s), wl = creek.wL(s) * 0.9, wr = creek.wR(s) * 0.9;
        for (let j = 0; j < colsN; j++) {
          const d = c - wl + ((wl + wr) * j) / (colsN - 1);
          const p = creek.worldXZ(s, d);
          pos.push(p.x, creek.matH(s, d) + 0.001, p.z);
        }
      }
      for (let i = 0; i < rows - 1; i++) for (let j = 0; j < colsN - 1; j++) { const a = i * colsN + j; idx.push(a, a + colsN, a + 1, a + 1, a + colsN, a + colsN + 1); }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals();
      const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x2b2a28, roughness: 0.85, side: THREE.DoubleSide }));
      m.receiveShadow = true;
      const g = new THREE.Group(); g.add(m);
      add('gravelMat', g);
    }
    add('splashGuard', groupMeshes('splashGuard', MATS.wood));
    {
      const g = new THREE.Group();
      const pts = creek.poolGuidePts.map(V);
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        const n = Math.ceil(a.distanceTo(b) / 0.16);
        for (let k = 0; k < n; k++) {
          const q = a.clone().lerp(b, (k + 0.5) / n);
          const dir = b.clone().sub(a).normalize();
          const fl = cyl(0.03, 0.03, 0.13, k % 2 ? MATS.yellow : MATS.orange, 10);
          fl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          fl.position.copy(q);
          g.add(fl);
        }
      }
      g.add(rod(pts[0], pts[0].clone().setY(pts[0].y - 0.5), 0.006, MATS.darkSteel));
      g.add(rod(pts[pts.length - 1], pts[pts.length - 1].clone().setY(pts[0].y + 0.6), 0.006, MATS.darkSteel));
      add('poolGuide', g);
    }
    {
      const g = groupMeshes('catchRamp', MATS.wood);
      const { a, b } = creek.catchRamp;
      for (const p of [a, b]) g.add(rod([p[0], p[1] - 0.4, p[2]], [p[0], p[1], p[2]], 0.02, MATS.darkWood));
      add('catchRamp', g);
    }
    {
      const g = groupMeshes('debrisScreen', MATS.darkSteel);
      const pts = spr.screenPts.map(V);
      for (let i = 0; i < pts.length; i++) g.add(rod(pts[i].clone().setY(pts[i].y - 0.5), pts[i].clone().setY(pts[i].y + 0.18), 0.012, MATS.darkSteel));
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        const len = a.distanceTo(b);
        const pnl = new THREE.Mesh(new THREE.PlaneGeometry(len, 0.3), MATS.mesh);
        pnl.position.copy(a).lerp(b, 0.5).setY((a.y + b.y) / 2 + 0.0);
        pnl.rotation.y = Math.atan2(-(b.z - a.z), b.x - a.x);
        g.add(pnl);
      }
      add('debrisScreen', g);
    }
    {
      const g = groupMeshes('spillRail', MATS.steel);
      add('spillRail', g);
    }
    {
      const g = groupMeshes('landingBoards', MATS.wood);
      add('landingBoards', g);
    }
    // clearing arm
    {
      const g = new THREE.Group();
      const creek = spr;
      const s = ARM.pivotS, c = creek.c(s);
      const d = c + creek.wR(s) + 0.25;
      const p = creek.worldXZ(s, d);
      const y = creek.bedH(s, d);
      g.position.set(p.x, y, p.z);
      g.add(box(0.14, 0.4, 0.14, MATS.yellow, 0, 0.2, 0));
      g.add(box(0.2, 0.06, 0.2, MATS.darkSteel, 0, 0.03, 0));
      const pivot = new THREE.Group();
      pivot.position.y = 0.42;
      const reach = creek.wR(s) + creek.wL(s) + 0.3;
      const arm = box(reach, 0.035, 0.035, MATS.yellow, -reach / 2, 0, 0);
      pivot.add(arm);
      const sweep = box(0.03, 0.3, 0.5, MATS.rubber, -reach + 0.05, -0.28, 0);
      pivot.add(sweep);
      pivot.add(rod([-0.02, 0, 0], [-reach + 0.05, -0.13, 0], 0.008, MATS.darkSteel));
      g.add(pivot);
      const fr = creek.frame(s);
      const toCentre = new THREE.Vector3(-fr.nx, 0, -fr.nz);
      g.rotation.y = Math.atan2(toCentre.z, -toCentre.x);
      this.armPivot = pivot;
      add('clearingArm', g);
    }
    // ---- roots (always present)
    {
      const pts = creek.rootPts.map(V);
      const curve = new THREE.CatmullRomCurve3(pts);
      const root = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.024, 8, false), MATS.root);
      root.castShadow = true; root.receiveShadow = true;
      scene.add(root);
      // more decorative roots going into the bank
      const a = pts[0];
      for (let k = 0; k < 4; k++) {
        const q = [a.clone(), a.clone().add(new THREE.Vector3((k - 1.5) * 0.12, 0.05, 0.1 * k)), a.clone().add(new THREE.Vector3((k - 1.5) * 0.25, -0.1, 0.35))];
        const r = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(q), 10, 0.015, 6, false), MATS.root);
        scene.add(r);
      }
      // the stump it belongs to, set back into the bank
      const tb = a.clone().add(new THREE.Vector3(0, -0.05, 0));
      const stump = cyl(0.13, 0.19, 0.42, MATS.bark, 10);
      stump.position.copy(tb).setY(tb.y + 0.12);
      stump.castShadow = true;
      scene.add(stump);
      const top = cyl(0.125, 0.125, 0.01, new THREE.MeshStandardMaterial({ color: 0xb08a5a, roughness: 0.9 }), 14);
      top.position.copy(tb).setY(tb.y + 0.335);
      scene.add(top);
    }
    // ---- driftwood logs
    this.logMeshes = [0, 1, 2].map(() => {
      const m = cyl(0.032, 0.03, 0.54, MATS.bark, 8);
      m.castShadow = true;
      scene.add(m);
      return m;
    });
    // ---- for-sale stakes
    this.stakes = {};
    for (const u of UPGRADES) {
      if (u.tab !== 'creek') continue;
      const spot = this.spotPos(u.id);
      if (!spot) continue;
      const g = new THREE.Group();
      g.position.copy(spot);
      g.add(rod([0, 0, 0], [0, 0.45, 0], 0.01, MATS.darkWood));
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.09), new THREE.MeshStandardMaterial({ color: 0xff8a2a, side: THREE.DoubleSide, emissive: 0x401800 }));
      flag.position.set(0.07, 0.4, 0);
      g.add(flag);
      const label = sprite(labelTexture([u.name, `$${u.price.toLocaleString()}`], { w: 512, h: 160, font: 'bold 50px sans-serif', bg: '#3b2a12' }), 0.75, 0.234);
      label.position.set(0, 0.7, 0);
      g.add(label);
      g.userData.upgrade = u.id;
      g.visible = false;
      scene.add(g);
      this.stakes[u.id] = g;
    }
  }

  spotPos(id) {
    const spots = {
      rootRail: [549.7, 1], gravelMat: [551.9, -1], splashGuard: [450.4, -1], poolGuide: [453.0, 1], catchRamp: [329.0, -1],
      debrisScreen: [57.5, -1, 1], spillRail: [64.5, 1, 1], landingBoards: [95.4, 1, 1], clearingArm: [ARM.pivotS + 0.4, 1, 1],
    };
    const sp = spots[id];
    if (!sp) return null;
    const [s, side, onSpr] = sp;
    const cr = onSpr && this.creek.springs ? this.creek.springs : this.creek;
    const c = cr.c(s);
    const d = c + side * ((side < 0 ? cr.wL(s) : cr.wR(s)) + 0.35);
    const p = cr.worldXZ(s, d);
    return new THREE.Vector3(p.x, Math.max(cr.bedH(s, d), cr.y0(s)), p.z);
  }

  configure(game) {
    for (const [id, g] of Object.entries(this.items)) g.visible = game.owned.has(id);
    for (const [id, st] of Object.entries(this.stakes)) st.visible = !game.owned.has(id) && !game.blocked(id);
  }

  update(dt, game, t) {
    // logs
    game.logs.forEach((L, i) => {
      const m = this.logMeshes[i];
      m.position.set(L.x, L.y + 0.004 + Math.sin(t * 1.3 + i) * 0.004, L.z);
      const dir = new THREE.Vector3(L.bx - L.ax, 0, L.bz - L.az).normalize();
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    });
    // clearing arm
    if (this.armPivot) {
      const ph = game.arm.phase;
      this.armPivot.rotation.y = ph > 0 ? Math.sin(ph * Math.PI) * 1.1 - 0.55 : -0.55;
      this.armPivot.rotation.x = 0;
    }
    const pg = this.items.poolGuide;
    if (pg.visible) pg.position.y = Math.sin(t * 1.7) * 0.004;
  }
}

// ======================================================================= Launch markers
export class LaunchMarkers {
  constructor(scene, creek) {
    mats();
    this.creek = creek;
    this.markers = STARTS.map((st, k) => {
      const creek = st.cr && this.creek.springs ? this.creek.springs : this.creek;
      const s = creek.siteS(st), c = creek.c(s);
      const d = c - creek.wL(s) - 0.35;
      const p = creek.worldXZ(s, d);
      const y = creek.bedH(s, d);
      const g = new THREE.Group();
      g.position.set(p.x, y, p.z);
      g.add(rod([0, -0.1, 0], [0, 1.1, 0], 0.025, MATS.darkWood));
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.18), new THREE.MeshStandardMaterial({ color: 0x3a8f4a, side: THREE.DoubleSide }));
      flag.position.set(0.15, 1.0, 0);
      g.add(flag);
      scene.add(g);
      // stripe across the creek marks the checkpoint
      const a = creek.worldXZ(s, c - creek.wL(s) - 0.05), b = creek.worldXZ(s, c + creek.wR(s) + 0.05);
      const line = rod([a.x, creek.y0(s) + 0.11, a.z], [b.x, creek.y0(s) + 0.11, b.z], 0.004, MATS.white);
      scene.add(line);
      return { g, flag, label: null, k, state: '' };
    });
  }

  update(game) {
    this.markers.forEach((m) => {
      const k = m.k;
      const site = game.sites[k];
      const state = site.open ? (k === game.sel ? 'sel' : 'open') : game.unlockable(k) ? 'next' : 'locked';
      if (state === m.state) return;
      m.state = state;
      m.flag.material.color.set(state === 'sel' ? 0xf2c230 : state === 'open' ? 0x3a8f4a : state === 'next' ? 0xff8a2a : 0x777777);
      if (m.label) m.g.remove(m.label);
      const st = STARTS[k];
      const lines = state === 'locked' || state === 'next' ? [st.name, `Unlock $${st.cost.toLocaleString()}`] : [st.name, `$${st.base}/ball · ~${st.eta >= 90 ? (st.eta / 60).toFixed(1) + ' min' : Math.round(st.eta) + ' s'}`];
      m.label = sprite(labelTexture(lines, { w: 640, h: 170, font: 'bold 50px Georgia, serif', bg: state === 'sel' ? '#5a4410' : '#2d3a1f' }), 1.1, 0.29);
      m.label.position.set(0, 1.4, 0);
      m.g.add(m.label);
    });
  }
}
