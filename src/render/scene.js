// Scene assembly, camera modes (first person, overhead map, follow ball) and
// per-frame visual sync with the factory network.
import * as THREE from 'three';
import { STARTS, S_FINISH, BALL_R, REACHES } from '../core/config.js';
import { MAT, STEPS, S_MIN, S_MAX } from '../core/creek.js';
import { SWEEPERS, WORKSHOP } from '../core/game.js';
import { buildTerrain, buildFarTerrain, buildRocks, buildVegetation } from './terrain.js';
import { buildRiparian } from './riparian.js';
import { buildWater, buildFalls } from './water.js';
import { BallRenderer } from './balls.js';
import { Effects } from './effects.js';
import { Workshop, FinishStation, CreekEquipment, LaunchMarkers } from './equipment.js';
import { Expansion } from './expansion.js';
import { CameraRig } from './camera.js';
import { Player } from './player.js';

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
    const renderer = new THREE.WebGLRenderer({ antialias: this.quality !== 'low', powerPreference: 'high-performance' });
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
    scene.fog = new THREE.Fog(0xb9ccc8, 30, 170);
    scene.background = new THREE.Color(0xb9ccc8);
    const camera = new THREE.PerspectiveCamera(game.settings.fov || 70, container.clientWidth / container.clientHeight, 0.03, 2000);
    this.camera = camera;
    this.sunDir = new THREE.Vector3(0.45, 0.78, 0.35).normalize();
    const sky = new THREE.Mesh(new THREE.SphereGeometry(450, 32, 16), new THREE.ShaderMaterial({
      vertexShader: skyVert, fragmentShader: skyFrag, side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { uSun: { value: this.sunDir }, uTop: { value: new THREE.Color(0.3, 0.52, 0.86) }, uHor: { value: new THREE.Color(0.78, 0.86, 0.88) } },
    }));
    sky.renderOrder = -1;
    this.sky = sky;
    scene.add(sky);
    const hemi = new THREE.HemisphereLight(0xd6eaff, 0x4e5e30, 1.05);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xfff0d8, 2.6);
    sun.castShadow = this.quality !== 'low';
    sun.shadow.mapSize.set(this.quality === 'high' ? 2048 : 1024, this.quality === 'high' ? 2048 : 1024);
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
    scene.add(sun); scene.add(sun.target);
    this.sun = sun;
    this.player = new Player(creek, camera, renderer.domElement);
    this.player.sens = game.settings.sens || 1;
    this.player.headBob = game.settings.headBob !== false;
    this.buildWorld();
    this.balls = new BallRenderer(scene, this.quality);
    this.workshops = new Map();
    this.finish = new FinishStation(scene, creek);
    this.creekEq = new CreekEquipment(scene, creek);
    this.exp = new Expansion(scene, creek, game);
    this.markers = new LaunchMarkers(scene, creek);
    this.rig = new CameraRig(camera, renderer.domElement, creek);
    this.syncWorkshops();
    this.time = 0;
    this.wakeT = new Map();
    this.drains = [];
    this.tmpV = new THREE.Vector3();
    this.fl = {};
    this.raycaster = new THREE.Raycaster();
    this.mode = 'fp';
    this.prevFp = null;
    window.addEventListener('resize', () => this.resize(container));
    if (!this.player.restore(game.player)) this.spawnAt(game.sel);
    this.player.applyCamera();
  }

  buildWorld() {
    const q = this.quality, cr = this.creek, scene = this.scene;
    if (this.world) { scene.remove(this.world); this.world.traverse((o) => { if (o.geometry) o.geometry.dispose(); }); }
    const w = new THREE.Group();
    const sp = cr.springs;
    w.add(buildTerrain(cr, q));
    if (sp) w.add(buildTerrain(sp, q, cr));
    w.add(buildFarTerrain(cr, q));
    for (const m of buildRocks(cr)) w.add(m);
    if (sp) for (const m of buildRocks(sp)) w.add(m);
    w.add(buildVegetation(cr, q));
    if (sp) w.add(buildVegetation(sp, q, false));
    // creek-side woodland on both channels (one group: the canopy hides in the overhead map)
    this.riparian = new THREE.Group();
    const rips = [buildRiparian(cr, q), ...(sp ? [buildRiparian(sp, q, cr)] : [])];
    for (const r of rips) this.riparian.add(r);
    this.riparian.userData.trunks = rips.flatMap((r) => r.userData.trunks);
    w.add(this.riparian);
    this.water = buildWater(cr, q, this.sunDir);
    w.add(this.water);
    if (sp) w.add(buildWater(sp, q, this.sunDir, this.water.material));
    this.falls = buildFalls(cr);
    w.add(this.falls);
    if (sp) {
      const f2 = buildFalls(sp);
      this.falls.userData.sheets.push(...f2.userData.sheets);
      f2.traverse((o) => { if (o.material && o.material.uniforms) o.material = this.falls.children[0]?.material || o.material; });
      w.add(f2);
    }
    scene.add(w);
    this.world = w;
    this.player.setTrunks(this.riparian.userData.trunks);
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

  setFov(f) { this.camera.fov = f; this.camera.updateProjectionMatrix(); }

  resize(container) {
    const w = container.clientWidth, h = container.clientHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  syncWorkshops() {
    const g = this.game;
    g.sites.forEach((site, k) => {
      if (!site.open || this.workshops.has(k)) return;
      const ws = new Workshop(this.scene, this.creek, k);
      this.workshops.set(k, ws);
    });
    this.player.structures = [...this.workshops.values()].map((ws) => ({ x: ws.group.position.x, z: ws.group.position.z, r: 0.75 }));
    if (this.exp && this.exp.yard && g.owned.has('bankWorkshop')) this.player.structures.push({ x: this.exp.yard.position.x, z: this.exp.yard.position.z, r: 0.85 });
  }

  // ------------------------------------------------------------- places and camera modes
  worldAt(s, d, dy = 0) {
    const p = this.creek.worldXZ(s, d);
    return new THREE.Vector3(p.x, Math.max(this.creek.bedH(s, d), this.creek.y0(s)) + dy, p.z);
  }

  /** Stand beside a factory, facing its chute and the water. */
  spawnAt(k) {
    const st = STARTS[k];
    const cr = st.cr && this.creek.springs ? this.creek.springs : this.creek;
    // stand a little downstream of the factory on its bank, looking back upstream at the
    // press, the chute and the water
    const s = cr.siteS(st) + 1.5, d = cr.c(s) + cr.wR(s) + 1.5;
    const p = cr.worldXZ(s, d);
    const fr = cr.frame(s);
    const lookX = -fr.nx * 0.55 - fr.tx, lookZ = -fr.nz * 0.55 - fr.tz;
    this.player.placeAt(p.x, p.z, Math.atan2(-lookX, -lookZ));
    this.player.pitch = -0.22;
  }

  homeView() {
    if (this.mode !== 'fp') this.returnToPlayer();
    this.spawnAt(this.game.sel);
  }

  enterMap(s = null) {
    if (this.mode === 'fp') this.prevFp = this.player.state();
    this.mode = 'map';
    this.player.enabled = false;
    if (document.pointerLockElement) document.exitPointerLock();
    this.rig.enabled = true;
    this.rig.follow = null;
    const P = this.player.pos;
    const target = s === null ? new THREE.Vector3(P.x, P.y, P.z) : this.worldAt(s, this.creek.c(s));
    if (this.rig.dist < 5 || !this.mapInit) { this.rig.target.copy(target); this.rig.dist = 38; this.mapInit = true; }
    this.rig.flyTo(target, Math.max(this.rig.dist, 26), 0, 1.38);
    this.riparian.visible = false;
  }

  panMapTo(s) { if (this.mode !== 'map') this.enterMap(s); else this.rig.flyTo(this.worldAt(s, this.creek.c(s)), this.rig.dist, 0, 1.38); }

  followBall(id, close = false) {
    if (this.mode === 'fp') this.prevFp = this.player.state();
    this.mode = 'follow';
    this.player.enabled = false;
    if (document.pointerLockElement) document.exitPointerLock();
    this.rig.enabled = true;
    const b = this.game.phys.balls.find((x) => x.id === id);
    if (b) { this.rig.target.set(b.x, b.y, b.z); this.rig.dist = close ? 0.6 : 2.4; this.rig.pitch = 0.45; }
    this.rig.setFollow(id, close);
    this.riparian.visible = true;
  }

  returnToPlayer() {
    this.mode = 'fp';
    this.rig.enabled = false;
    this.rig.follow = null;
    this.player.enabled = true;
    if (this.prevFp) this.player.restore(this.prevFp);
    this.riparian.visible = true;
    this.camera.near = 0.03; this.camera.updateProjectionMatrix();
    this.player.applyCamera();
  }

  /** Fly-through from a newly opened site down to the original gate (map view). */
  unlockPan(k) {
    const cr = this.creek;
    if (this.mode === 'fp') this.prevFp = this.player.state();
    this.mode = 'map';
    this.player.enabled = false;
    this.rig.enabled = true;
    this.riparian.visible = false;
    const s0 = STARTS[k].s;
    const pts = [];
    const n = 6;
    for (let i = 0; i <= n; i++) {
      const s = s0 + ((S_FINISH - s0) * i) / n;
      pts.push({ target: this.worldAt(s, cr.c(s)), dist: i === 0 ? 10 : i === n ? 12 : 30, pitch: 1.2, yaw: 0 });
    }
    this.rig.playPath(pts, 5 + (S_FINISH - s0) * 0.03);
    this.afterPan = () => { this.rig.flyTo(this.worldAt(s0, cr.c(s0)), 14, 0, 1.25); };
  }

  // ------------------------------------------------------------- interaction
  interactables() {
    const g = this.game, cr = this.creek;
    const out = [];
    for (const [k, ws] of this.workshops) out.push({ type: 'factory', k, pos: ws.group.position, label: `Factory: ${STARTS[k].name}` });
    for (const b of this.exp.boards) out.push({ type: 'map', id: b.id, pos: b.pos, label: 'Map board' });
    out.push({ type: 'finish', pos: this.worldAt(S_FINISH - 0.4, cr.c(S_FINISH) - cr.wL(S_FINISH) - 0.5), label: 'Finish station: archive, records and orders' });
    out.push({ type: 'finish', pos: this.worldAt(S_FINISH - 0.4, cr.c(S_FINISH) + cr.wR(S_FINISH) + 0.5), label: 'Finish station: archive, records and orders' });
    if (g.owned.has('bankWorkshop')) out.push({ type: 'workshop', pos: this.exp.yard.position, label: 'Bank Workshop: supply routes' });
    for (const [id, st] of [...Object.entries(this.creekEq.stakes), ...Object.entries(this.exp.stakes)]) if (st.visible) out.push({ type: 'stake', id, pos: st.position, label: 'For sale: open in shop' });
    for (const L of this.exp.landmarks) if (!L.unmapped) out.push({ type: 'landmark', id: L.id, pos: new THREE.Vector3(L.x, L.y, L.z), label: `Field note: ${L.name}` });
    for (const st of STARTS.map((s, k) => k)) {
      if (g.sites[st].open || !g.unlockable(st)) continue;
      const m = this.markers.markers[st];
      out.push({ type: 'unlock', k: st, pos: m.g.position, label: `Launch site for sale: ${STARTS[st].name}` });
    }
    return out;
  }

  nearestInteractable() {
    if (this.mode !== 'fp') return null;
    const P = this.player.pos;
    const f = this.player.forward(1);
    let best = null, bestD = 2.6;
    for (const it of this.interactables()) {
      const d = Math.hypot(it.pos.x - P.x, it.pos.z - P.z);
      if (d > bestD || Math.abs(it.pos.y - P.y) > 2.5) continue;
      // prefer what the player faces
      const facing = Math.hypot(it.pos.x - f.x, it.pos.z - f.z) < d + 0.2;
      const score = d - (facing ? 0.4 : 0);
      if (score < bestD) { bestD = score; best = it; }
    }
    return best;
  }

  /** The open factory the player stands beside, if any. */
  besideFactory() {
    const P = this.player.pos;
    for (const [k, ws] of this.workshops) if (Math.hypot(ws.group.position.x - P.x, ws.group.position.z - P.z) < 4) return k;
    return null;
  }

  pick(cx, cy) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((cx - rect.left) / rect.width) * 2 - 1, -((cy - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const stakes = [...Object.values(this.creekEq.stakes), ...Object.values(this.exp.stakes)].filter((s) => s.visible);
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
      const tol = Math.max(BALL_R * 2, along * 0.03);
      if (d < tol * tol && along < bestD) { bestD = along; best = b; }
    }
    if (best) return { type: 'ball', id: best.id };
    return null;
  }

  /** The rolling ball nearest the centre of the first-person view. */
  ballInView() {
    const ray = new THREE.Ray(this.camera.position.clone(), new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion));
    let best = null, bestScore = Infinity;
    for (const b of this.game.phys.balls) {
      if (b.state !== 'roll' || b.paid) continue;
      const v = new THREE.Vector3(b.x, b.y, b.z);
      const along = v.clone().sub(ray.origin).dot(ray.direction);
      if (along < 0.2 || along > 25) continue;
      const off = Math.sqrt(ray.distanceSqToPoint(v)) / along;
      if (off < 0.25 && off + along * 0.004 < bestScore) { bestScore = off + along * 0.004; best = b; }
    }
    return best;
  }

  project(v, out) {
    const p = this.tmpV.set(v.x, v.y, v.z).project(this.camera);
    const el = this.renderer.domElement;
    out.x = (p.x * 0.5 + 0.5) * el.clientWidth;
    out.y = (-p.y * 0.5 + 0.5) * el.clientHeight;
    out.visible = p.z < 1 && p.z > -1;
    return out;
  }

  // ------------------------------------------------------------- events
  onEvent(e, audio) {
    const cam = this.camera.position;
    const atten = (x, y, z) => Math.min(1, 2.5 / (Math.hypot(x - cam.x, y - cam.y, z - cam.z) + 0.5));
    switch (e.type) {
      case 'hit': {
        const kind = e.mat === MAT.WOOD ? 'wood' : e.mat === MAT.RUBBER || e.mat === MAT.MAT || e.mat === MAT.DIRT || e.mat === MAT.SAND ? 'bump' : 'rock';
        audio?.play(kind, e.v / 2.5, atten(e.x, e.y, e.z));
        break;
      }
      case 'bump': audio?.play('bump', e.v / 1.5, atten(e.x, e.y, e.z)); break;
      case 'splash':
        if (Math.hypot(e.x - cam.x, e.z - cam.z) < 60) this.effects.splash(e.x, e.y, e.z, e.v);
        audio?.play('splash', e.v / 3, atten(e.x, e.y, e.z));
        break;
      case 'finish':
        this.finish.onEvent(e);
        this.effects.sparkle(e.x, e.y + 0.08, e.z);
        audio?.play('finish', 1, Math.max(0.25, atten(e.x, e.y, e.z)));
        break;
      case 'pressed': {
        const ws = this.workshops.get(e.site);
        if (ws) { ws.onEvent(e); const p = ws.group.position; audio?.play('press', 0.8, atten(p.x, p.y, p.z)); }
        break;
      }
      case 'launch': {
        const ws = this.workshops.get(e.k);
        if (ws) { ws.onEvent(e); const p = ws.group.position; audio?.play('launch', 1, atten(p.x, p.y, p.z)); }
        if (this.followNext) { this.followBall(e.id, this.followNext === 'close'); this.followNext = null; }
        break;
      }
      case 'handMade': { const ws = this.workshops.get(e.site); if (ws) ws.onEvent(e); break; }
      case 'surge': { const L = this.creek.locate(e.x, e.z, -1, {}); this.effects.ripple(e.x, this.creek.y0(L.s), e.z, 0.04, 0.5, 0.8, 0.8); break; }
      case 'armSweep': audio?.play('arm', 1, 1); break;
      case 'armClear': this.effects.ripple(e.x, e.y, e.z, 0.05, 0.6, 1, 0.8); break;
      case 'lost': audio?.play('lost', 1, atten(e.x, e.y, e.z)); break;
      case 'purchase': audio?.play('buy'); this.syncWorkshops(); break;
      case 'unlock': this.syncWorkshops(); this.unlockPan(e.k); break;
      case 'drain': this.drains.push({ t: 0, recipe: e.recipe || 0, conv: this.game.owned.has('conveyor') }); break;
      default:
    }
  }

  // ------------------------------------------------------------- frame
  update(dt, audio) {
    const g = this.game, cr = this.creek;
    this.time += dt;
    const t = this.time;
    for (const [k, ws] of this.workshops) ws.configure(g.sites[k].owned);
    this.finish.configure(g.owned);
    this.creekEq.configure(g);
    this.exp.configure(g);
    this.markers.update(g);
    for (const ws of this.workshops.values()) ws.update(dt, g);
    this.finish.update(dt, g);
    this.creekEq.update(dt, g, t);
    this.exp.update(dt, g, t);

    // ---- balls
    const BR = this.balls;
    BR.begin();
    const camPos = this.camera.position;
    const far = this.mode === 'map' && this.rig.dist > 14;
    let followPos = null;
    for (const b of g.phys.balls) {
      if (b.state !== 'roll' && b.state !== 'queue') continue;
      const near2 = (b.x - camPos.x) ** 2 + (b.z - camPos.z) ** 2;
      if (!far && near2 > 160 * 160) continue;
      BR.add(b.spec, b.x, b.y, b.z, b.qx, b.qy, b.qz, b.qw, b.wet, b.state === 'roll', b.recipe);
      if (b.id === this.rig.follow) followPos = this.tmpV.set(b.x, b.y, b.z).clone();
      // wakes behind floating balls near the viewer
      if (b.state === 'roll' && b.sub > 0.004 && b.sub < 2 * BALL_R && near2 < 18 * 18) {
        const due = this.wakeT.get(b.id) || 0;
        if (t > due) {
          const cr = b.cr && this.creek.springs ? this.creek.springs : this.creek;
          const fr = cr.frame(b.s);
          cr.flowAt(b.s, b.d, b.y, g.t, fr.tx, fr.tz, this.fl);
          const rv = Math.hypot(b.vx - this.fl.vx, b.vz - this.fl.vz);
          const shed = b.recipe === 1 ? 1.6 : 1; // Dry-Weave sheds its wake sooner
          if (rv > 0.06 * shed || Math.random() < 0.05) {
            const wl = cr.waterLevel(b.s, b.d);
            this.effects.ripple(b.x, wl > -1e8 ? wl : cr.y0(b.s), b.z, BALL_R * 1.3, 0.12 + rv * 0.2, 0.9 / shed, Math.min(0.55, 0.2 + rv));
          }
          this.wakeT.set(b.id, t + (rv > 0.3 ? 0.09 : 0.2));
        }
      }
    }
    if (this.wakeT.size > 800) this.wakeT.clear();
    if (this.mode === 'follow' && !followPos) {
      // the followed ball finished or was lost: hold the view a moment, then return
      this.followGone = (this.followGone || 0) + dt;
      if (this.followGone > 2.5) { this.followGone = 0; if (this.onFollowEnded) this.onFollowEnded(); }
    } else this.followGone = 0;
    // hoppers, launch posts and forming balls at every factory
    for (const [k, ws] of this.workshops) {
      const site = g.sites[k];
      if (Math.hypot(ws.group.position.x - camPos.x, ws.group.position.z - camPos.z) > 70 && !far) continue;
      const slots = ws.hopperSlotsWorld();
      for (let i = 0; i < site.hopper.length && i < slots.length; i++) {
        const p = slots[i], it = site.hopper[i];
        BR.add(it.spec, p.x, p.y, p.z, 0, Math.sin(i * 1.7), 0, Math.cos(i * 1.7), 0, false, it.recipe);
      }
      // workshop deliveries wait on a rack beside the bench
      for (let i = 0; i < site.post.length; i++) {
        const it = site.post[i];
        const v = new THREE.Vector3(0.3 + (i % 6) * 0.07, 0.05 + Math.floor(i / 6) * 0.06, 0.55).applyMatrix4(ws.group.matrixWorld);
        BR.add(it.spec, v.x, v.y, v.z, 0, 0, 0, 1, 0, false, it.recipe);
      }
      if (site.owned.has('press') && site.hopper.length < g.siteNumbers(k).hopper && g.settings.auto && site.enabled.press && site.pressProg > 0.5 && site.changeT <= 0) {
        const head = ws.heads.length === 2 ? site.pressCount % 2 : 0;
        const mp = ws.moldWorld(head);
        if (mp) {
          BR.sc.setScalar(0.3 + (site.pressProg - 0.5) * 1.4);
          BR.add(g.specFor(k), mp.x, mp.y, mp.z, 0, 0, 0, 1, 0, false, site.recipe);
          BR.sc.setScalar(1);
        }
      }
    }
    // carts
    g.workshop.carts.forEach((cart, i) => {
      const n = cart.load ? cart.load.length : 0;
      const sl = this.exp.cartSlots(i, n);
      sl.forEach((p, j) => BR.add(cart.load[j].spec, p.x, p.y, p.z, 0, 0, 0, 1, 0, false, cart.load[j].recipe));
    });
    // basket, crates, overflow
    const bs = this.finish.slots;
    for (let i = 0; i < g.basket.length && i < bs.length; i++) { const p = bs[i], it = g.basket[i]; BR.add(it.spec || 0, p.x, p.y, p.z, Math.sin(i), 0, 0, Math.cos(i), 0.8, false, it.recipe || 0); }
    const cs = this.finish.crateSlots;
    if (cs.length) for (let i = 0; i < Math.min(g.crate, cs.length); i++) BR.add(1, cs[i].x, cs[i].y, cs[i].z, Math.sin(i * 2), 0, 0, Math.cos(i * 2), 0.3);
    if (this.finish.stackSlots && this.finish.stackSlots.length) {
      g.crates.forEach((n, r) => { const sl = this.finish.stackSlots[r]; for (let i = 0; i < Math.min(n, sl.length); i++) BR.add(1, sl[i].x, sl[i].y, sl[i].z, 0, 0, 0, 1, 0.3, false, r); });
    }
    if (this.finish.overflowPos && g.overflow) {
      const op = this.finish.overflowPos;
      for (let i = 0; i < Math.min(g.overflow, 30); i++) BR.add(1, op.x + ((i % 6) - 2.5) * 0.07, op.y + 0.4 + Math.floor(i / 6) * 0.05, op.z + ((Math.floor(i / 6) % 2) - 0.5) * 0.07, 0, 0, 0, 1, 0.4);
    }
    for (let i = this.drains.length - 1; i >= 0; i--) {
      const D = this.drains[i];
      D.t += dt;
      const dur = D.conv ? 1.4 : 0.7;
      if (D.t > dur || !this.finish.slots.length) { this.drains.splice(i, 1); continue; }
      const u = D.t / dur;
      let p;
      if (D.conv && this.finish.beltA) p = this.finish.beltA.clone().lerp(this.finish.beltB, u).setY(this.finish.beltA.y + (this.finish.beltB.y - this.finish.beltA.y) * u + BALL_R + 0.01);
      else p = this.finish.slots[0].clone().lerp(this.finish.drainEnd, u);
      BR.add(1, p.x, p.y, p.z, 0, Math.sin(u * 9), 0, Math.cos(u * 9), 0.6, false, D.recipe);
    }
    BR.end(far);
    if (followPos) {
      BR.ring.visible = true;
      let fc = cr, L = cr.locate(followPos.x, followPos.z, -1, {});
      if (Math.abs(L.d) > 9.6 && cr.springs) { fc = cr.springs; L = fc.locate(followPos.x, followPos.z, -1, {}); }
      const wl = fc.waterLevel(L.s, L.d);
      BR.ring.position.set(followPos.x, Math.max(followPos.y - BALL_R + 0.003, (wl > -1e8 ? wl : fc.y0(L.s)) + 0.004), followPos.z);
    } else BR.ring.visible = false;

    // ---- camera
    if (this.mode === 'fp') {
      this.player.update(dt);
      this.scene.fog.near = 30; this.scene.fog.far = 170;
    } else {
      const wasCine = !!this.rig.cine;
      this.rig.update(dt, followPos);
      if (wasCine && !this.rig.cine && this.afterPan) { const f = this.afterPan; this.afterPan = null; f(); }
      this.scene.fog.near = this.mode === 'map' ? 300 + this.rig.dist : 40; this.scene.fog.far = this.mode === 'map' ? 900 + this.rig.dist * 2 : 200;
    }
    // ---- sun shadow follows the view
    const tg = this.mode === 'fp' ? this.player.pos : this.rig.target;
    const span = this.mode === 'fp' ? 22 : Math.min(70, Math.max(4, this.rig.dist * 1.4));
    const sh = this.sun.shadow.camera;
    sh.left = -span; sh.right = span; sh.top = span; sh.bottom = -span; sh.near = 0.5; sh.far = span * 4 + 60;
    sh.updateProjectionMatrix();
    this.sun.position.copy(tg).addScaledVector(this.sunDir, span * 2 + 25);
    this.sun.target.position.copy(tg);
    this.sky.position.copy(this.camera.position);
    // ---- water and effects
    this.water.material.uniforms.uTime.value = t;
    this.falls.userData.uniforms.uTime.value = t;
    this.effects.update(dt, g.t, this.camera.position);
    // ---- ambience: creek, falls, nearby machines
    if (audio) {
      const L = cr.locate(camPos.x, camPos.z, -1, {});
      const sClamp = Math.max(S_MIN, Math.min(S_MAX, L.s));
      const above = camPos.y - cr.y0(sClamp);
      const nearWater = Math.max(0, 1 - (Math.abs(L.d - cr.c(sClamp)) + Math.max(0, above - 1.5)) / 18);
      let nf = 0;
      for (const sheet of this.falls.userData.sheets) nf = Math.max(nf, sheet.h * 0.4 * Math.max(0, 1 - camPos.distanceTo(sheet.base) / 16));
      let mach = 0;
      for (const [k, ws] of this.workshops) {
        const site = g.sites[k];
        if (!site.owned.has('press') || site.pressStatus) continue;
        mach = Math.max(mach, Math.max(0, 1 - camPos.distanceTo(ws.group.position) / 12));
      }
      audio.ambience(Math.min(1, nearWater * 1.4), Math.min(1, nf), t, mach);
    }
    this.renderer.render(this.scene, this.camera);
  }
}
