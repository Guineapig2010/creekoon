// First-person walker: mouse look + WASD on desktop, dual touch sticks on phones.
// Walks on the creek's terrain, steps over small rocks, wades through safe shallows,
// is blocked by cliffs, boulders and tree trunks, and returns to the last safe bank
// position after falling into deep water.
import * as THREE from 'three';
import { clamp } from '../core/noise.js';
import { S_MIN, S_MAX } from '../core/creek.js';

const EYE = 1.6;
const WALK = 1.45, RUN = 3.0;

export class Player {
  constructor(creek, camera, dom) {
    this.creek = creek;
    this.cam = camera;
    this.dom = dom;
    this.pos = new THREE.Vector3();
    this.yaw = 0; this.pitch = -0.12;
    this.vel = new THREE.Vector3();
    this.keys = new Set();
    this.move = { x: 0, y: 0 }; // touch stick
    this.hint = -1;
    this.safe = null; this.safeT = 0;
    this.bob = 0; this.stepAcc = 0;
    this.fade = 0;
    this.sens = 1; this.headBob = true;
    this.trunks = [];
    this.structures = [];
    this.loc = {};
    this.onStep = null; this.onFall = null;
    this.enabled = true;
    this.locked = false;
    this.bind();
  }

  setTrunks(list) {
    // spatial hash of trunk circles
    this.trunkGrid = new Map();
    for (const t of list) {
      const key = Math.floor(t.x) * 9973 + Math.floor(t.z);
      let a = this.trunkGrid.get(key); if (!a) { a = []; this.trunkGrid.set(key, a); }
      a.push(t);
    }
  }

  bind() {
    const el = this.dom;
    window.addEventListener('keydown', (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA')) return;
      this.keys.add(e.code);
    });
    window.addEventListener('keyup', (e) => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());
    document.addEventListener('pointerlockchange', () => { this.locked = document.pointerLockElement === el; });
    document.addEventListener('mousemove', (e) => {
      if (!this.enabled || !this.locked) return;
      this.look(e.movementX, e.movementY, 0.0022);
    });
    // drag to look when the pointer is not locked (and on touch, on the right half)
    this.drag = null;
    el.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      if (e.pointerType === 'mouse' && e.button === 0 && !this.locked && this.wantLock) {
        try { const r = el.requestPointerLock(); if (r && r.catch) r.catch(() => {}); } catch { /* not allowed here */ }
      }
      if (e.pointerType !== 'mouse' && e.clientX < window.innerWidth * 0.42) return; // left side: the move stick
      this.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0 };
    });
    el.addEventListener('pointermove', (e) => {
      if (!this.enabled || !this.drag || this.drag.id !== e.pointerId || this.locked) return;
      const dx = e.clientX - this.drag.x, dy = e.clientY - this.drag.y;
      this.drag.x = e.clientX; this.drag.y = e.clientY;
      this.drag.moved += Math.abs(dx) + Math.abs(dy);
      this.look(dx, dy, e.pointerType === 'mouse' ? 0.004 : 0.006);
    });
    const end = (e) => { if (this.drag && this.drag.id === e.pointerId) this.drag = null; };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  look(dx, dy, k) {
    this.yaw -= dx * k * this.sens;
    this.pitch = clamp(this.pitch - dy * k * this.sens, -1.45, 1.35);
  }

  placeAt(x, z, yaw = this.yaw) {
    this.pos.set(x, this.groundAt(x, z), z);
    this.yaw = yaw;
    this.hint = -1;
    this.safe = this.pos.clone();
  }

  /** Ground height including boulders the player can stand on. */
  groundAt(x, z) {
    const cr = this.creek;
    const L = cr.locate(x, z, this.hint, this.loc);
    const s = clamp(L.s, S_MIN, S_MAX), d = clamp(L.d, -10, 10);
    let h = cr.bedH(s, d);
    const cell = cr.cellList(x, z);
    if (cell) {
      for (const i of cell) {
        const c = cr.colliders[i];
        if (c.type !== 0 || c.r < 0.06) continue;
        const dx = x - c.x, dz = z - c.z, r2 = dx * dx + dz * dz;
        if (r2 < c.r * c.r) h = Math.max(h, c.y + Math.sqrt(c.r * c.r - r2));
      }
    }
    return h;
  }

  waterAt(x, z) {
    const cr = this.creek;
    const L = cr.locate(x, z, this.hint, this.loc);
    if (L.s < S_MIN || L.s > S_MAX || Math.abs(L.d) > 10) return { depth: 0, level: -Infinity };
    const wl = cr.waterLevel(L.s, L.d);
    if (!(wl > -1e8)) return { depth: 0, level: -Infinity };
    return { depth: Math.max(0, wl - cr.bedH(L.s, L.d)), level: wl };
  }

  blocked(x0, z0, x1, z1) {
    const g0 = this.groundAt(x0, z0), g1 = this.groundAt(x1, z1);
    const len = Math.hypot(x1 - x0, z1 - z0) || 1e-6;
    const rise = g1 - g0;
    if (rise > 0.42 && rise / len > 1.1) return true; // cliff or a boulder too tall to step onto
    // drop-offs higher than a short scramble are not walked off accidentally (the falls)
    if (rise < -1.1) return true;
    // trunks
    if (this.trunkGrid) {
      for (let ox = -1; ox <= 1; ox++) for (let oz = -1; oz <= 1; oz++) {
        const a = this.trunkGrid.get((Math.floor(x1) + ox) * 9973 + Math.floor(z1) + oz);
        if (!a) continue;
        for (const t of a) if (Math.hypot(x1 - t.x, z1 - t.z) < t.r + 0.25) return true;
      }
    }
    for (const st of this.structures) if (Math.hypot(x1 - st.x, z1 - st.z) < st.r) return true;
    // corridor edges: dense brush and valley sides close the walkable reach
    const L = this.creek.locate(x1, z1, this.hint, this.loc);
    if (Math.abs(L.d) > 9.2 || L.s < S_MIN + 1 || L.s > S_MAX - 1.5) return true;
    return false;
  }

  update(dt) {
    if (!this.enabled) return;
    const k = this.keys;
    let mx = 0, my = 0;
    if (k.has('KeyW') || k.has('ArrowUp')) my += 1;
    if (k.has('KeyS') || k.has('ArrowDown')) my -= 1;
    if (k.has('KeyA') || k.has('ArrowLeft')) mx -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) mx += 1;
    mx += this.move.x; my += this.move.y;
    const ml = Math.hypot(mx, my);
    if (ml > 1) { mx /= ml; my /= ml; }
    const water = this.waterAt(this.pos.x, this.pos.z);
    let speed = (k.has('ShiftLeft') || k.has('ShiftRight') || Math.hypot(this.move.x, this.move.y) > 0.95 ? RUN : WALK);
    if (water.depth > 0.12) speed *= 0.55; // wading
    const fx = -Math.sin(this.yaw), fz = -Math.cos(this.yaw);
    const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw);
    const tvx = (fx * my + rx * mx) * speed, tvz = (fz * my + rz * mx) * speed;
    const a = 1 - Math.exp(-dt * 10);
    this.vel.x += (tvx - this.vel.x) * a; this.vel.z += (tvz - this.vel.z) * a;
    const x0 = this.pos.x, z0 = this.pos.z;
    let nx = x0 + this.vel.x * dt, nz = z0 + this.vel.z * dt;
    if (this.blocked(x0, z0, nx, nz)) {
      // slide along the obstacle
      if (!this.blocked(x0, z0, nx, z0)) nz = z0;
      else if (!this.blocked(x0, z0, x0, nz)) nx = x0;
      else { nx = x0; nz = z0; this.vel.set(0, 0, 0); }
    }
    this.pos.x = nx; this.pos.z = nz;
    const L = this.creek.locate(nx, nz, this.hint, this.loc);
    this.hint = L.idx;
    const g = this.groundAt(nx, nz);
    this.pos.y += (g - this.pos.y) * (1 - Math.exp(-dt * 14));
    // deep water: back to the last safe bank position
    const w2 = this.waterAt(nx, nz);
    if (w2.depth > 0.55) {
      if (this.onFall) this.onFall(this.pos.clone());
      this.fade = 1;
      if (this.safe) { this.pos.copy(this.safe); this.vel.set(0, 0, 0); }
    } else if (w2.depth < 0.06) {
      this.safeT += dt;
      if (this.safeT > 0.6) { this.safe = this.pos.clone(); this.safeT = 0; }
    }
    this.fade = Math.max(0, this.fade - dt * 1.5);
    // footsteps and head bob
    const hs = Math.hypot(this.vel.x, this.vel.z);
    if (hs > 0.2) {
      this.bob += dt * hs * 5.2;
      this.stepAcc += hs * dt;
      if (this.stepAcc > 0.72) {
        this.stepAcc = 0;
        if (this.onStep) {
          const B = this.creek.bedAt(L.s, L.d, {});
          this.onStep(w2.depth > 0.02 ? 'water' : B.mat, Math.min(1, hs / RUN));
        }
      }
    }
    this.applyCamera();
  }

  applyCamera() {
    const bobY = this.headBob ? Math.sin(this.bob) * 0.025 : 0;
    const bobX = this.headBob ? Math.cos(this.bob * 0.5) * 0.015 : 0;
    this.cam.position.set(this.pos.x + Math.cos(this.yaw) * bobX, this.pos.y + EYE + bobY, this.pos.z - Math.sin(this.yaw) * bobX);
    this.cam.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
  }

  /** Point in front of the player (for interaction checks). */
  forward(dist = 1) {
    return new THREE.Vector3(this.pos.x - Math.sin(this.yaw) * dist, this.pos.y + 1, this.pos.z - Math.cos(this.yaw) * dist);
  }

  state() { return { x: this.pos.x, y: this.pos.y, z: this.pos.z, yaw: this.yaw, pitch: this.pitch, safe: this.safe ? { x: this.safe.x, y: this.safe.y, z: this.safe.z } : null }; }
  restore(p) {
    if (!p) return false;
    this.pos.set(p.x, p.y, p.z); this.yaw = p.yaw || 0; this.pitch = p.pitch || 0; this.hint = -1;
    this.safe = p.safe ? new THREE.Vector3(p.safe.x, p.safe.y, p.safe.z) : this.pos.clone();
    return true;
  }
}
