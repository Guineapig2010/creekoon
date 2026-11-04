// Scene assembly and per-frame visual sync with the game state.
import * as THREE from 'three';
import { STARTS, S_FINISH, BALL_R } from '../core/config.js';
import { MAT, STEPS } from '../core/creek.js';
import { buildTerrain, buildFarTerrain, buildRocks, buildVegetation } from './terrain.js';
import { buildWater, buildFalls } from './water.js';
import { BallRenderer } from './balls.js';
import { Effects } from './effects.js';
import { Workshop, FinishStation, CreekEquipment, LaunchMarkers } from './equipment.js';
import { CameraRig } from './camera.js';

const skyVert = `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const skyFrag = `varying vec3 vDir; uniform vec3 uSun; uniform vec3 uTop; uniform vec3 uHor;
void main(){ float h = clamp(vDir.y, -0.2, 1.0); vec3 c = mix(uHor, uTop, pow(max(h,0.0), 0.55));
float sd = max(dot(normalize(vDir), uSun), 0.0); c += vec3(1.0,0.9,0.7) * (pow(sd, 900.0) * 3.0 + pow(sd, 12.0) * 0.18);
gl_FragColor = vec4(c, 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;

export class SceneView {
  constructor(container, creek, game) {
    this.creek = creek;
    this.game = game;
    this.quality = game.settings.quality || 'high';
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.quality === 'high' ? 2 : this.quality === 'medium' ? 1.5 : 1));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = this.quality !== 'low';
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    this.renderer = renderer;
    const scene = new THREE.Scene();
    this.scene = scene;
    scene.fog = new THREE.Fog(0xbfd2d6, 70, 300);
    scene.background = new THREE.Color(0xbfd2d6);
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.02, 600);
    this.camera = camera;
    this.sunDir = new THREE.Vector3(0.45, 0.78, 0.35).normalize();
    // sky
    const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 16), new THREE.ShaderMaterial({
      vertexShader: skyVert, fragmentShader: skyFrag, side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { uSun: { value: this.sunDir }, uTop: { value: new THREE.Color(0.32, 0.52, 0.82) }, uHor: { value: new THREE.Color(0.78, 0.86, 0.88) } },
    }));
    sky.renderOrder = -1;
    this.sky = sky;
    scene.add(sky);
    // lights
    const hemi = new THREE.HemisphereLight(0xd6eaff, 0x5a6a3a, 1.15);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff0d8, 2.4);
    sun.castShadow = this.quality !== 'low';
    sun.shadow.mapSize.set(this.quality === 'high' ? 2048 : 1024, this.quality === 'high' ? 2048 : 1024);
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    scene.add(sun); scene.add(sun.target);
    this.sun = sun;
    this.buildWorld();
    this.balls = new BallRenderer(scene, this.quality);
    this.workshop = new Workshop(scene, creek);
    this.finish = new FinishStation(scene, creek);
    this.creekEq = new CreekEquipment(scene, creek);
    this.markers = new LaunchMarkers(scene, creek);
    this.rig = new CameraRig(camera, renderer.domElement, creek);
    this.workshop.placeAt(game.reloc ? game.reloc.to : game.sel);
    this.time = 0;
    this.wakeT = new Map();
    this.drains = [];
    this.tmpV = new THREE.Vector3();
    this.fl = {};
    this.cart = null;
    this.raycaster = new THREE.Raycaster();
    window.addEventListener('resize', () => this.resize(container));
    this.homeView(true);
  }

  buildWorld() {
    const q = this.quality, cr = this.creek, scene = this.scene;
    if (this.world) { scene.remove(this.world); this.world.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); }
    const w = new THREE.Group();
    w.add(buildTerrain(cr, q));
    w.add(buildFarTerrain(cr, q));
    for (const m of buildRocks(cr)) w.add(m);
    w.add(buildVegetation(cr, q));
    this.water = buildWater(cr, q, this.sunDir);
    w.add(this.water);
    this.falls = buildFalls(cr);
    w.add(this.falls);
    scene.add(w);
    this.world = w;
    if (this.effects) { for (const L of ['foam', 'ripples', 'drops', 'mist', 'leaves', 'sparks']) scene.remove(this.effects[L].mesh); }
    this.effects = new Effects(scene, cr, q);
    this.effects.setFalls(this.falls.userData.sheets);
  }

  setQuality(q) {
    if (q === this.quality) return;
    this.quality = q;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, q === 'high' ? 2 : q === 'medium' ? 1.5 : 1));
    this.renderer.shadowMap.enabled = q !== 'low';
    this.sun.castShadow = q !== 'low';
    this.sun.shadow.map?.dispose();
    this.sun.shadow.map = null;
    this.sun.shadow.mapSize.set(q === 'high' ? 2048 : 1024, q === 'high' ? 2048 : 1024);
    this.scene.traverse((o) => { if (o.material) { const m = Array.isArray(o.material) ? o.material : [o.material]; m.forEach((x) => (x.needsUpdate = true)); } });
    this.buildWorld();
  }

  resize(container) {
    const w = container.clientWidth, h = container.clientHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  // ------------------------------------------------------------- camera presets
  worldAt(s, d, dy = 0) {
    const p = this.creek.worldXZ(s, d);
    return new THREE.Vector3(p.x, Math.max(this.creek.bedH(s, d), this.creek.y0(s)) + dy, p.z);
  }

  homeView(instant = false) {
    const g = this.game, cr = this.creek;
    const k = g.reloc ? g.reloc.to : g.sel;
    const s0 = STARTS[k].s;
    const span = S_FINISH - s0;
    let target, dist, pitch;
    if (k === 0) {
      target = this.worldAt(95.2, cr.c(95.2) + 0.5);
      dist = 7.2; pitch = 0.82;
    } else {
      target = this.worldAt(s0 - 0.6, cr.c(s0) + 0.6);
      dist = 4.2; pitch = 0.75;
    }
    void span;
    // portrait screens need to stand further back to keep bench, chute and gate in view
    const aspect = this.camera.aspect;
    if (aspect < 1) { dist *= Math.min(1.9, 1 / Math.pow(aspect, 0.75)); pitch += 0.12; }
    const yaw = this.rig.yawAlong(k === 0 ? 95 : s0) + (aspect < 1 ? 0.15 : 0.55);
    if (instant) { this.rig.target.copy(target); this.rig.dist = dist; this.rig.pitch = pitch; this.rig.yaw = yaw; }
    else this.rig.flyTo(target, dist, yaw, pitch);
  }

  benchView() {
    const p = this.workshop.group.position.clone();
    this.rig.flyTo(p.setY(p.y + 0.6), 2.2, this.rig.yawAlong(STARTS[this.game.sel].s) + 1.2, 0.5);
  }

  finishView() {
    const cr = this.creek;
    this.rig.flyTo(this.worldAt(S_FINISH + 0.2, cr.c(S_FINISH)), 2.6, this.rig.yawAlong(S_FINISH) + 0.9, 0.55);
  }

  overview() {
    const k = this.game.sel;
    const s0 = STARTS[Math.max(k, Math.min(this.game.unlocked - 1, 5))].s;
    const mid = (s0 + S_FINISH) / 2;
    const span = S_FINISH - Math.min(STARTS[this.game.unlocked - 1].s, s0);
    this.rig.flyTo(this.worldAt(mid, this.creek.c(mid)), Math.max(14, span * 0.95), this.rig.yawAlong(mid) + 0.3, 1.05);
  }

  unlockPan(k) {
    const cr = this.creek;
    const s0 = STARTS[k].s, s1 = STARTS[Math.max(0, k - 1)].s;
    const pts = [];
    const sList = [s0 - 0.5, (s0 + s1) / 2, s1, (s1 + S_FINISH) / 2, S_FINISH];
    sList.forEach((s, i) => {
      const last = i === sList.length - 1;
      pts.push({ target: this.worldAt(s, cr.c(s)), dist: i === 0 ? 4 : last ? 4.5 : Math.min(30, 6 + (S_FINISH - s) * 0.25), pitch: i === 0 ? 0.6 : 0.85, yaw: this.rig.yawAlong(s) + 0.4 });
    });
    this.rig.playPath(pts, 4 + (S_FINISH - s0) * 0.06);
  }

  // ------------------------------------------------------------- picking
  pick(cx, cy) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((cx - rect.left) / rect.width) * 2 - 1, -((cy - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const stakes = Object.values(this.creekEq.stakes).filter((s) => s.visible);
    const hit = this.raycaster.intersectObjects(stakes, true)[0];
    if (hit) {
      let o = hit.object;
      while (o && !o.userData.upgrade) o = o.parent;
      if (o) return { type: 'stake', id: o.userData.upgrade };
    }
    const ray = this.raycaster.ray;
    let best = null, bestD = Infinity;
    const v = this.tmpV;
    for (const b of this.game.phys.balls) {
      if (b.state !== 'roll') continue;
      v.set(b.x, b.y, b.z);
      const along = v.clone().sub(ray.origin).dot(ray.direction);
      if (along < 0) continue;
      const d = ray.distanceSqToPoint(v);
      const tol = Math.max(BALL_R * 1.5, along * 0.025);
      if (d < tol * tol && along < bestD) { bestD = along; best = b; }
    }
    if (best) return { type: 'ball', id: best.id };
    return null;
  }

  project(v, out) {
    const p = this.tmpV.copy(v).project(this.camera);
    const el = this.renderer.domElement;
    out.x = (p.x * 0.5 + 0.5) * el.clientWidth;
    out.y = (-p.y * 0.5 + 0.5) * el.clientHeight;
    out.visible = p.z < 1 && p.z > -1;
    return out;
  }

  // ------------------------------------------------------------- events
  onEvent(e, audio) {
    const cam = this.camera.position;
    const atten = (x, y, z) => {
      const d = Math.hypot(x - cam.x, y - cam.y, z - cam.z);
      return Math.min(1, 2.5 / (d + 0.5));
    };
    switch (e.type) {
      case 'hit': {
        const a = atten(e.x, e.y, e.z);
        const kind = e.mat === MAT.WOOD ? 'wood' : e.mat === MAT.RUBBER || e.mat === MAT.MAT || e.mat === MAT.DIRT || e.mat === MAT.SAND ? 'bump' : 'rock';
        audio?.play(kind, e.v / 2.5, a);
        break;
      }
      case 'bump': audio?.play('bump', e.v / 1.5, atten(e.x, e.y, e.z)); break;
      case 'splash':
        this.effects.splash(e.x, e.y, e.z, e.v);
        audio?.play('splash', e.v / 3, atten(e.x, e.y, e.z));
        break;
      case 'finish':
        this.finish.onEvent(e);
        this.effects.sparkle(e.x, e.y + 0.08, e.z);
        audio?.play('finish', 1, Math.max(0.35, atten(e.x, e.y, e.z)));
        break;
      case 'pressed': {
        this.workshop.onEvent(e);
        const p = this.workshop.group.position;
        audio?.play('press', 0.8, atten(p.x, p.y, p.z));
        break;
      }
      case 'launch': {
        this.workshop.onEvent(e);
        const p = this.workshop.group.position;
        audio?.play('launch', 1, atten(p.x, p.y, p.z));
        if (this.followNext) { this.rig.setFollow(e.id, this.followNext === 'close'); this.followNext = null; }
        break;
      }
      case 'handMade': this.workshop.onEvent(e); break;
      case 'surge': this.effects.ripple(e.x, this.creek.y0(this.creek.locate(e.x, e.z, -1, {}).s), e.z, 0.04, 0.5, 0.8, 0.8); break;
      case 'armSweep': audio?.play('arm', 1, 1); break;
      case 'armClear': this.effects.ripple(e.x, e.y, e.z, 0.05, 0.6, 1, 0.8); break;
      case 'lost': audio?.play('lost', 1, atten(e.x, e.y, e.z)); break;
      case 'purchase': audio?.play('buy'); break;
      case 'unlock': this.unlockPan(e.k); break;
      case 'relocMove': this.cart = { from: e.from, to: e.to, dur: e.dur, t: 0 }; break;
      case 'relocated': this.cart = null; this.workshop.placeAt(e.k); break;
      case 'drain': this.drains.push({ t: 0, spec: 0, conv: this.game.owned.has('conveyor') }); break;
      default:
    }
  }

  // ------------------------------------------------------------- frame
  update(dt, audio) {
    const g = this.game, cr = this.creek;
    this.time += dt;
    const t = this.time;
    // equipment config
    this.workshop.configure(g.owned);
    this.finish.configure(g.owned);
    this.creekEq.configure(g);
    this.markers.update(g);
    // relocation cart animation
    if (this.cart && g.reloc && g.reloc.phase === 'move') {
      const C = this.cart;
      const u = Math.min(1, g.reloc.t / C.dur);
      const e = u * u * (3 - 2 * u);
      const A = this.workshop.frameFor(C.from), B = this.workshop.frameFor(C.to);
      const sA = cr.pads[C.from].sC, sB = cr.pads[C.to].sC;
      const s = sA + (sB - sA) * e;
      const d = cr.c(s) + cr.wR(s) + 1.05;
      const p = cr.worldXZ(s, d);
      const ground = cr.bedH(s, Math.min(9.5, d));
      const y = Math.max(ground, A.pos.y + (B.pos.y - A.pos.y) * e) + Math.sin(u * Math.PI) * 0.25;
      this.workshop.group.position.set(p.x, y, p.z);
      const fr = cr.frame(s);
      this.workshop.group.rotation.y = Math.atan2(-fr.tz, fr.tx) + Math.sin(t * 9) * 0.02 * Math.sin(u * Math.PI);
      this.workshop.group.updateMatrixWorld(true);
    } else if (!g.reloc && this.workshop.k !== g.sel) this.workshop.placeAt(g.sel);
    this.workshop.update(dt, g);
    this.finish.update(dt, g);
    this.creekEq.update(dt, g, t);

    // ---- balls
    const BR = this.balls;
    BR.begin();
    const camPos = this.camera.position;
    const far = this.rig.dist > 14;
    let followPos = null;
    for (const b of g.phys.balls) {
      if (b.state !== 'roll' && b.state !== 'queue') continue;
      BR.add(b.spec, b.x, b.y, b.z, b.qx, b.qy, b.qz, b.qw, b.wet, b.state === 'roll');
      if (b.id === this.rig.follow) followPos = this.tmpV.set(b.x, b.y, b.z).clone();
      // wakes behind floating balls
      if (b.state === 'roll' && b.sub > 0.004 && b.sub < 2 * BALL_R) {
        const due = this.wakeT.get(b.id) || 0;
        if (t > due) {
          cr.flowAt(b.s, b.d, b.y, g.t, ...this.tangent(b.s), this.fl);
          const rv = Math.hypot(b.vx - this.fl.vx, b.vz - this.fl.vz);
          const near = Math.hypot(b.x - camPos.x, b.z - camPos.z) < 18;
          if (near && (rv > 0.06 || Math.random() < 0.05)) {
            this.effects.ripple(b.x, cr.y0(b.s), b.z, BALL_R * 1.3, 0.12 + rv * 0.2, 0.9, Math.min(0.55, 0.2 + rv));
          }
          this.wakeT.set(b.id, t + (rv > 0.3 ? 0.09 : 0.2));
        }
      }
    }
    if (this.wakeT.size > 400) this.wakeT.clear();
    if (this.rig.follow != null && !followPos) {
      // the followed ball finished or was lost: settle at the finish
      this.rig.follow = null;
      if (this.followEnded) this.followEnded();
    }
    // hopper contents
    const slots = this.workshop.hopperSlotsWorld();
    for (let i = 0; i < g.hopper.length && i < slots.length; i++) {
      const p = slots[i];
      BR.add(g.hopper[i], p.x, p.y, p.z, 0, Math.sin(i * 1.7), 0, Math.cos(i * 1.7));
    }
    // forming ball in the press
    if (g.owned.has('press') && g.hopper.length < g.numbers.hopper && g.settings.auto) {
      const head = this.workshop.heads.length === 2 ? g.pressCount % 2 : 0;
      const mp = this.workshop.moldWorld(head);
      if (mp && g.pressProg > 0.5) {
        const sc = (g.pressProg - 0.5) * 2;
        BR.sc.setScalar(0.3 + sc * 0.7);
        BR.add(specNow(g), mp.x, mp.y, mp.z, 0, 0, 0, 1);
        BR.sc.setScalar(1);
      }
    }
    // basket
    const bs = this.finish.slots;
    for (let i = 0; i < g.basket.length && i < bs.length; i++) {
      const p = bs[i];
      BR.add(g.basket[i], p.x, p.y, p.z, Math.sin(i), 0, 0, Math.cos(i), 0.8);
    }
    // crate
    const cs = this.finish.crateSlots;
    if (cs.length) for (let i = 0; i < Math.min(g.crate, cs.length); i++) BR.add(i % 3 === 0 ? 0 : 1, cs[i].x, cs[i].y, cs[i].z, Math.sin(i * 2), 0, 0, Math.cos(i * 2), 0.3);
    // draining balls
    for (let i = this.drains.length - 1; i >= 0; i--) {
      const D = this.drains[i];
      D.t += dt;
      const dur = D.conv ? 1.4 : 0.7;
      if (D.t > dur || !this.finish.slots.length) { this.drains.splice(i, 1); continue; }
      const u = D.t / dur;
      let p;
      if (D.conv && this.finish.beltA) p = this.finish.beltA.clone().lerp(this.finish.beltB, u).setY(this.finish.beltA.y + (this.finish.beltB.y - this.finish.beltA.y) * u + BALL_R + 0.01);
      else p = this.finish.slots[0].clone().lerp(this.finish.drainEnd, u);
      BR.add(1, p.x, p.y, p.z, 0, Math.sin(u * 9), 0, Math.cos(u * 9), 0.6);
    }
    BR.end(far);
    // follow ring
    if (followPos) {
      BR.ring.visible = true;
      BR.ring.position.set(followPos.x, Math.max(followPos.y - BALL_R + 0.003, cr.y0(cr.locate(followPos.x, followPos.z, -1, {}).s) + 0.004), followPos.z);
    } else BR.ring.visible = false;

    // ---- camera
    this.rig.update(dt, followPos);
    // ---- sun shadow follows the view
    const tg = this.rig.target;
    const span = Math.min(70, Math.max(4, this.rig.dist * 1.4));
    const sh = this.sun.shadow.camera;
    sh.left = -span; sh.right = span; sh.top = span; sh.bottom = -span; sh.near = 0.5; sh.far = span * 4 + 40;
    sh.updateProjectionMatrix();
    this.sun.position.copy(tg).addScaledVector(this.sunDir, span * 2 + 15);
    this.sun.target.position.copy(tg);
    this.sky.position.copy(this.camera.position);
    // ---- water and effects
    this.water.material.uniforms.uTime.value = t;
    this.falls.userData.uniforms.uTime.value = t;
    this.effects.update(dt, g.t, this.camera.position);
    // ---- ambience
    if (audio) {
      const L = cr.locate(camPos.x, camPos.z, -1, {});
      const above = camPos.y - cr.y0(Math.max(-5, Math.min(108, L.s)));
      const nearWater = Math.max(0, 1 - (Math.abs(L.d - cr.c(Math.max(-5, Math.min(108, L.s)))) + above) / 25);
      let nf = 0;
      for (const st of STEPS) {
        const p = this.falls.userData.sheets.find((x) => x.step === st)?.base;
        if (p) nf = Math.max(nf, st.h * 0.45 * Math.max(0, 1 - camPos.distanceTo(p) / 14));
      }
      audio.ambience(Math.min(1, nearWater * 1.4), Math.min(1, nf), t);
    }
    this.renderer.render(this.scene, this.camera);
  }

  tangent(s) { const f = this.creek.frame(s); return [f.tx, f.tz]; }
}

function specNow(g) {
  let f = 0;
  if (g.owned.has('premiumFelt')) f |= 1;
  if (g.owned.has('batchStamp')) f |= 32;
  return f;
}
