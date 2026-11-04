// Overhead camera with pan / zoom / orbit, a ball-follow mode and short cinematic pans.
import * as THREE from 'three';
import { clamp } from '../core/noise.js';

export class CameraRig {
  constructor(camera, dom, creek) {
    this.cam = camera;
    this.dom = dom;
    this.creek = creek;
    this.target = new THREE.Vector3();
    this.dist = 6;
    this.yaw = 0;
    this.pitch = 0.75;
    this.goal = null; // {target, dist, yaw, pitch}
    this.follow = null; // ball id
    this.followClose = false;
    this.cine = null;
    this.pointers = new Map();
    this.onPick = null;
    this.moved = 0;
    this.bind();
  }

  bind() {
    const el = this.dom;
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    el.addEventListener('pointerdown', (e) => {
      el.setPointerCapture(e.pointerId);
      this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY, button: e.button, sx: e.clientX, sy: e.clientY });
      this.moved = 0;
      if (this.pointers.size === 2) this.pinch = this.pinchInfo();
    });
    el.addEventListener('pointermove', (e) => {
      const p = this.pointers.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      p.x = e.clientX; p.y = e.clientY;
      this.moved += Math.abs(dx) + Math.abs(dy);
      if (this.pointers.size === 2) {
        const now = this.pinchInfo();
        if (this.pinch) {
          this.zoom(this.pinch.d / now.d);
          this.yaw -= (now.a - this.pinch.a);
          this.pitch = clamp(this.pitch + (now.cy - this.pinch.cy) * 0.004, 0.12, 1.5);
          this.pan(now.cx - this.pinch.cx, now.cy - this.pinch.cy, 0.5);
        }
        this.pinch = now;
        this.userMoved();
        return;
      }
      if (p.button === 2 || e.shiftKey || e.ctrlKey) {
        this.yaw -= dx * 0.006;
        this.pitch = clamp(this.pitch + dy * 0.005, 0.12, 1.5);
      } else this.pan(dx, dy, 1);
      this.userMoved();
    });
    const up = (e) => {
      const p = this.pointers.get(e.pointerId);
      this.pointers.delete(e.pointerId);
      if (this.pointers.size < 2) this.pinch = null;
      if (p && this.moved < 6 && this.onPick) this.onPick(e.clientX, e.clientY);
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom(Math.exp(e.deltaY * 0.0012));
      this.userMoved(true);
    }, { passive: false });
  }

  pinchInfo() {
    const [a, b] = [...this.pointers.values()];
    return { d: Math.hypot(a.x - b.x, a.y - b.y) + 1, a: Math.atan2(b.y - a.y, b.x - a.x), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
  }

  userMoved(zoomOnly = false) {
    this.goal = null;
    this.cine = null;
    if (!zoomOnly) this.follow = this.follow && this.followClose ? this.follow : null;
    if (!zoomOnly && this.follow) this.follow = null;
  }

  zoom(f) {
    this.dist = clamp(this.dist * f, 0.25, 160);
  }

  pan(dx, dy, k) {
    const h = this.dom.clientHeight || 800;
    const scale = (2 * this.dist * Math.tan((this.cam.fov * Math.PI) / 360)) / h * k;
    const fx = -Math.sin(this.yaw), fz = -Math.cos(this.yaw);
    const rx = Math.cos(this.yaw), rz = -Math.sin(this.yaw);
    const pk = 1 / Math.max(0.35, Math.sin(this.pitch));
    this.target.x += (-dx * rx + dy * fx * pk) * scale;
    this.target.z += (-dx * rz + dy * fz * pk) * scale;
    this.follow = null;
  }

  /** Smoothly move to a view. */
  flyTo(target, dist, yaw = this.yaw, pitch = this.pitch) {
    this.follow = null;
    this.cine = null;
    this.goal = { target: target.clone(), dist, yaw, pitch };
  }

  setFollow(id, close = false) {
    this.follow = id;
    this.followClose = close;
    this.goal = null;
    this.cine = null;
  }

  /** Cinematic pan through a list of points (each {target, dist, pitch}). */
  playPath(points, duration) {
    this.follow = null;
    this.goal = null;
    this.cine = { points, t: 0, duration };
  }

  yawAlong(s) {
    const fr = this.creek.frame(s);
    // look downstream: camera placed upstream of target
    return Math.atan2(-fr.tx, -fr.tz);
  }

  update(dt, ballPos) {
    const cr = this.creek;
    if (this.cine) {
      const C = this.cine;
      C.t += dt;
      const u = clamp(C.t / C.duration, 0, 1);
      const n = C.points.length - 1;
      const f = u * n, i = Math.min(n - 1, Math.floor(f)), t = f - i;
      const e = t * t * (3 - 2 * t);
      const A = C.points[i], B = C.points[i + 1];
      this.target.lerpVectors(A.target, B.target, e);
      this.dist = A.dist + (B.dist - A.dist) * e;
      this.pitch = A.pitch + (B.pitch - A.pitch) * e;
      let dy = B.yaw - A.yaw;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      this.yaw = A.yaw + dy * e;
      if (u >= 1) this.cine = null;
    } else if (this.follow != null && ballPos) {
      const k = 1 - Math.exp(-dt * 5);
      this.target.lerp(ballPos, k);
      const want = this.followClose ? 0.42 : 2.2;
      this.dist += (want - this.dist) * (1 - Math.exp(-dt * 2));
      if (this.followClose) this.pitch += (0.5 - this.pitch) * (1 - Math.exp(-dt * 2));
      const L = cr.locate(ballPos.x, ballPos.z, -1, {});
      let wy = this.yawAlong(L.s);
      let dy = wy - this.yaw;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      this.yaw += dy * (1 - Math.exp(-dt * 1.2));
    } else if (this.goal) {
      const G = this.goal;
      const k = 1 - Math.exp(-dt * 3.5);
      this.target.lerp(G.target, k);
      this.dist += (G.dist - this.dist) * k;
      this.pitch += (G.pitch - this.pitch) * k;
      let dy = G.yaw - this.yaw;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      this.yaw += dy * k;
      if (this.target.distanceTo(G.target) < 0.01 && Math.abs(G.dist - this.dist) < 0.01) this.goal = null;
    }
    // keep target on the ground
    if (this.follow == null) {
      const L = cr.locate(this.target.x, this.target.z, -1, {});
      const ground = Math.max(cr.bedH(clamp(L.s, -5, 108), clamp(L.d, -10, 10)), cr.y0(clamp(L.s, -5, 108)));
      this.target.y += (ground - this.target.y) * (1 - Math.exp(-dt * 6));
    }
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch);
    const cam = this.cam;
    cam.position.set(
      this.target.x + Math.sin(this.yaw) * cp * this.dist,
      this.target.y + sp * this.dist,
      this.target.z + Math.cos(this.yaw) * cp * this.dist,
    );
    // keep the line of sight above the banks and the camera above the ground
    let lift = 0;
    const tmp = this._loc || (this._loc = {});
    for (let i = 2; i <= 8; i++) {
      const f = i / 8;
      const px = this.target.x + (cam.position.x - this.target.x) * f;
      const pz = this.target.z + (cam.position.z - this.target.z) * f;
      const py = this.target.y + (cam.position.y - this.target.y) * f;
      const L = cr.locate(px, pz, -1, tmp);
      if (L.s < -5 || L.s > 108 || Math.abs(L.d) > 9.9) continue;
      const gy = Math.max(cr.bedH(L.s, L.d), cr.waterLevel(L.s, L.d)) + (i === 8 ? 0.06 : 0.03);
      if (py < gy) lift = Math.max(lift, (gy - py) / f);
    }
    cam.position.y += lift;
    cam.lookAt(this.target);
    const near = clamp(this.dist * 0.02, 0.01, 0.5);
    if (Math.abs(cam.near - near) > near * 0.2) { cam.near = near; cam.far = 600; cam.updateProjectionMatrix(); }
  }
}
