// Pooled particle layers: foam, ripples/wakes, splashes, mist, leaves, spray.
import * as THREE from 'three';
import { softDot, ringTexture, foamTexture, leafTexture } from './textures.js';
import { mulberry32 } from '../core/noise.js';

const vert = /* glsl */`
  attribute vec3 iPos;
  attribute float iSize;
  attribute float iAlpha;
  attribute float iRot;
  uniform float uFlat;
  varying vec2 vUv;
  varying float vAlpha;
  #include <fog_pars_vertex>
  void main() {
    vUv = uv;
    vAlpha = iAlpha;
    float c = cos(iRot), s = sin(iRot);
    vec2 p = vec2(position.x * c - position.y * s, position.x * s + position.y * c) * iSize;
    vec4 mvPosition;
    if (uFlat > 0.5) {
      vec4 wp = modelMatrix * vec4(iPos + vec3(p.x, 0.0, p.y), 1.0);
      mvPosition = viewMatrix * wp;
    } else {
      mvPosition = viewMatrix * modelMatrix * vec4(iPos, 1.0);
      mvPosition.xy += p;
    }
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;
const frag = /* glsl */`
  uniform sampler2D uMap;
  uniform vec3 uColor;
  varying vec2 vUv;
  varying float vAlpha;
  #include <fog_pars_fragment>
  void main() {
    vec4 t = texture2D(uMap, vUv);
    gl_FragColor = vec4(uColor * t.rgb, t.a * vAlpha);
    if (gl_FragColor.a < 0.01) discard;
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;

class Layer {
  constructor(scene, { cap, map, flat, color = 0xffffff, blending = THREE.NormalBlending, order = 3, lit = false }) {
    this.cap = cap;
    const geo = new THREE.InstancedBufferGeometry();
    const base = new THREE.PlaneGeometry(1, 1);
    geo.index = base.index;
    geo.attributes.position = base.attributes.position;
    geo.attributes.uv = base.attributes.uv;
    this.pos = new Float32Array(cap * 3); this.size = new Float32Array(cap); this.alpha = new Float32Array(cap); this.rot = new Float32Array(cap);
    geo.setAttribute('iPos', new THREE.InstancedBufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('iSize', new THREE.InstancedBufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('iAlpha', new THREE.InstancedBufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('iRot', new THREE.InstancedBufferAttribute(this.rot, 1).setUsage(THREE.DynamicDrawUsage));
    geo.instanceCount = 0;
    const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uMap: { value: null }, uFlat: { value: flat ? 1 : 0 }, uColor: { value: new THREE.Color(color) } }]);
    uniforms.uMap.value = map;
    const mat = new THREE.ShaderMaterial({ vertexShader: vert, fragmentShader: frag, uniforms, transparent: true, depthWrite: false, blending, fog: true, side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = order;
    scene.add(this.mesh);
    this.items = [];
    void lit;
  }
  spawn(o) {
    if (this.items.length >= this.cap) this.items.shift();
    o.age = 0;
    this.items.push(o);
    return o;
  }
  upload() {
    const n = this.items.length;
    for (let i = 0; i < n; i++) {
      const o = this.items[i];
      this.pos[i * 3] = o.x; this.pos[i * 3 + 1] = o.y; this.pos[i * 3 + 2] = o.z;
      this.size[i] = o.size; this.alpha[i] = o.alpha; this.rot[i] = o.rot || 0;
    }
    const g = this.mesh.geometry;
    g.instanceCount = n;
    for (const k of ['iPos', 'iSize', 'iAlpha', 'iRot']) g.attributes[k].needsUpdate = true;
  }
}

export class Effects {
  constructor(scene, creek, quality) {
    this.creek = creek;
    this.q = quality;
    const mult = quality === 'low' ? 0.4 : quality === 'medium' ? 0.7 : 1;
    this.mult = mult;
    this.rnd = mulberry32(4);
    this.foam = new Layer(scene, { cap: Math.round(1600 * mult), map: foamTexture(64), flat: true, order: 3 });
    this.ripples = new Layer(scene, { cap: Math.round(500 * mult) + 100, map: ringTexture(), flat: true, order: 3 });
    this.drops = new Layer(scene, { cap: 500, map: softDot(32), flat: false, color: 0xe8f4ff, order: 4 });
    this.mist = new Layer(scene, { cap: Math.round(160 * mult) + 20, map: softDot(64), flat: false, color: 0xf2f6f8, order: 4 });
    this.leaves = new Layer(scene, { cap: 220, map: leafTexture(), flat: true, order: 3 });
    this.sparks = new Layer(scene, { cap: 80, map: softDot(32), flat: false, color: 0xfff1a0, order: 6, blending: THREE.AdditiveBlending });
    this.fl = {}; this.loc = {}; this.fr = {};
    this.spawnAcc = 0;
    this.falls = [];
    // seed some leaves on the water
    for (let i = 0; i < 70 * mult; i++) this.spawnLeafOnWater(-5 + this.rnd() * 110);
  }

  setFalls(sheets) { this.falls = sheets; }

  spawnLeafOnWater(s) {
    const cr = this.creek;
    const c = cr.c(s);
    const d = c + (this.rnd() - 0.5) * (cr.wL(s) + cr.wR(s)) * 0.8;
    const p = cr.worldXZ(s, d, {});
    this.leaves.spawn({ x: p.x, y: cr.y0(s) + 0.004, z: p.z, size: 0.045 + this.rnd() * 0.03, alpha: 1, rot: this.rnd() * 6.28, life: 60 + this.rnd() * 60, hint: -1, vy: 0, air: false, spin: (this.rnd() - 0.5) * 0.5 });
  }

  splash(x, y, z, v) {
    const n = Math.min(26, 6 + v * 4) * this.mult;
    for (let i = 0; i < n; i++) {
      const a = this.rnd() * 6.28, sp = (0.3 + this.rnd() * 0.6) * Math.min(3, v) * 0.6;
      this.drops.spawn({ x, y: y + 0.01, z, vx: Math.cos(a) * sp, vy: 0.6 + this.rnd() * v * 0.5, vz: Math.sin(a) * sp, size: 0.008 + this.rnd() * 0.01, alpha: 0.9, life: 0.7 });
    }
    this.ripple(x, y, z, 0.05, 0.6, 1.4);
    this.ripple(x, y, z, 0.03, 0.45, 1.0);
  }

  ripple(x, y, z, size, grow, life, alpha = 0.55) {
    this.ripples.spawn({ x, y: y + 0.002, z, size, grow, alpha, a0: alpha, life, rot: 0 });
  }

  sparkle(x, y, z) {
    for (let i = 0; i < 14; i++) {
      const a = this.rnd() * 6.28;
      this.sparks.spawn({ x, y, z, vx: Math.cos(a) * 0.4, vy: 0.4 + this.rnd() * 0.6, vz: Math.sin(a) * 0.4, size: 0.02, alpha: 1, life: 0.6 });
    }
  }

  update(dt, t, camPos) {
    const cr = this.creek, rnd = this.rnd, mult = this.mult;
    // ---- continuous foam spawning near the camera
    this.spawnAcc += dt;
    const camL = cr.locate(camPos.x, camPos.z, -1, this.loc);
    const camS = camL.s;
    const range = Math.max(8, Math.min(60, camPos.y * 1.2 + 6));
    const rate = 160 * mult;
    let nSpawn = Math.floor(this.spawnAcc * rate);
    this.spawnAcc -= nSpawn / rate;
    for (let i = 0; i < nSpawn; i++) {
      const s = camS + (rnd() - 0.5) * 2 * range;
      if (s < -5 || s > 107) continue;
      const fo = cr.row(cr.rFoam, s);
      if (rnd() > fo * 0.9 + 0.04) continue;
      const c = cr.c(s);
      const d = c + (rnd() - 0.5) * (cr.wL(s) + cr.wR(s)) * 0.85;
      const p = cr.worldXZ(s, d, {});
      this.foam.spawn({ x: p.x, y: cr.y0(s) + 0.004, z: p.z, size: 0.03 + rnd() * 0.05 * (0.5 + fo), alpha: 0, a0: 0.5 + fo * 0.4, life: 2 + rnd() * 3, rot: rnd() * 6.28, hint: -1 });
    }
    // ---- waterfall spray and mist
    for (const f of this.falls) {
      const n = (f.h * 8 * dt * mult);
      for (let i = 0; i < n || (i === 0 && rnd() < n); i++) {
        this.mist.spawn({ x: f.base.x + (rnd() - 0.5) * f.width, y: f.base.y + 0.05, z: f.base.z + (rnd() - 0.5) * f.width, vx: (rnd() - 0.5) * 0.3, vy: 0.2 + rnd() * 0.4, vz: (rnd() - 0.5) * 0.3, size: 0.1 + rnd() * 0.2 * f.h, alpha: 0, a0: 0.18, life: 1.6 + rnd(), grow: 0.3 });
      }
    }
    // ---- Folk Draft: descending mist and falling leaves at the Continental Shelf
    if (rnd() < dt * 6 * mult) {
      const s = 326.8 + rnd() * 2.6, d = 0.5 + rnd() * 2.2;
      const p = cr.worldXZ(s, d, {});
      const y = cr.y0(328.3) + 1.2 + rnd() * 1.5;
      this.mist.spawn({ x: p.x, y, z: p.z, vx: 0, vy: -0.6, vz: 0, size: 0.25 + rnd() * 0.3, alpha: 0, a0: 0.16, life: 2.5, grow: 0.2, wind: true });
    }
    if (rnd() < dt * 0.9) {
      const s = 326.5 + rnd() * 3, d = 0.3 + rnd() * 2.5;
      const p = cr.worldXZ(s, d, {});
      this.leaves.spawn({ x: p.x, y: cr.y0(328.3) + 2.5 + rnd() * 2, z: p.z, size: 0.05, alpha: 1, rot: rnd() * 6.28, life: 50, hint: -1, vy: -0.4, air: true, spin: 2 });
    }
    if (rnd() < dt * 0.25 && this.leaves.items.length < 160) this.spawnLeafOnWater(-4 + rnd() * 108);

    // ---- update layers
    const advect = (o, k) => {
      const L = cr.locate(o.x, o.z, o.hint ?? -1, this.loc);
      o.hint = L.idx;
      cr.flowAt(L.s, L.d, cr.y0(L.s), t, L.tx, L.tz, this.fl);
      o.x += this.fl.vx * dt * k; o.z += this.fl.vz * dt * k;
      o.y = cr.y0(L.s) + 0.004;
      return L;
    };
    const F = this.foam.items;
    for (let i = F.length - 1; i >= 0; i--) {
      const o = F[i]; o.age += dt;
      if (o.age > o.life) { F.splice(i, 1); continue; }
      const L = advect(o, 1);
      if (!cr.inChannel(L.s, L.d, 0)) { F.splice(i, 1); continue; }
      o.alpha = o.a0 * Math.min(1, o.age * 3) * (1 - o.age / o.life);
    }
    this.foam.upload();
    const R = this.ripples.items;
    for (let i = R.length - 1; i >= 0; i--) {
      const o = R[i]; o.age += dt;
      if (o.age > o.life) { R.splice(i, 1); continue; }
      o.size += o.grow * dt;
      o.alpha = o.a0 * (1 - o.age / o.life);
    }
    this.ripples.upload();
    const D = this.drops.items;
    for (let i = D.length - 1; i >= 0; i--) {
      const o = D[i]; o.age += dt;
      if (o.age > o.life) { D.splice(i, 1); continue; }
      o.vy -= 9.81 * dt; o.x += o.vx * dt; o.y += o.vy * dt; o.z += o.vz * dt;
      o.alpha = 0.9 * (1 - o.age / o.life);
    }
    this.drops.upload();
    const S = this.sparks.items;
    for (let i = S.length - 1; i >= 0; i--) {
      const o = S[i]; o.age += dt;
      if (o.age > o.life) { S.splice(i, 1); continue; }
      o.vy -= 2 * dt; o.x += o.vx * dt; o.y += o.vy * dt; o.z += o.vz * dt;
      o.alpha = 1 - o.age / o.life;
    }
    this.sparks.upload();
    const M = this.mist.items;
    const w = {};
    for (let i = M.length - 1; i >= 0; i--) {
      const o = M[i]; o.age += dt;
      if (o.age > o.life) { M.splice(i, 1); continue; }
      if (o.wind) {
        const L = cr.locate(o.x, o.z, -1, this.loc);
        cr.windAt(L.s, L.d, o.y, t, w);
        o.vx += (w.vx * 0.4 - o.vx) * dt * 2; o.vy += (w.vy * 0.35 - o.vy) * dt * 2; o.vz += (w.vz * 0.4 - o.vz) * dt * 2;
      }
      o.x += o.vx * dt; o.y += o.vy * dt; o.z += o.vz * dt;
      o.size += (o.grow || 0) * dt;
      const x = o.age / o.life;
      o.alpha = o.a0 * Math.sin(Math.PI * x);
    }
    this.mist.upload();
    const Lv = this.leaves.items;
    for (let i = Lv.length - 1; i >= 0; i--) {
      const o = Lv[i]; o.age += dt;
      if (o.age > o.life) { Lv.splice(i, 1); continue; }
      if (o.air) {
        const L = cr.locate(o.x, o.z, -1, this.loc);
        cr.windAt(L.s, L.d, o.y, t, w);
        o.x += (w.vx * 0.5 + Math.sin(t * 3 + i) * 0.2) * dt; o.z += (w.vz * 0.5 + Math.cos(t * 2.6 + i) * 0.2) * dt;
        o.y += (o.vy + w.vy * 0.25) * dt;
        o.rot += o.spin * dt;
        const ground = Math.max(cr.bedH(L.s, L.d), cr.waterLevel(L.s, L.d));
        if (o.y <= ground + 0.004) { o.air = false; o.y = ground + 0.004; o.hint = -1; if (cr.waterLevel(L.s, L.d) < -1e8) o.life = o.age + 8; }
      } else {
        const L = cr.locate(o.x, o.z, o.hint ?? -1, this.loc);
        o.hint = L.idx;
        if (cr.inChannel(L.s, L.d, 0)) {
          cr.flowAt(L.s, L.d, cr.y0(L.s), t, L.tx, L.tz, this.fl);
          o.x += this.fl.vx * dt * 0.9; o.z += this.fl.vz * dt * 0.9;
          o.y = cr.y0(L.s) + 0.004;
          o.rot += o.spin * dt * 0.3;
          if (L.s > 106) o.life = 0;
        }
      }
      o.alpha = Math.min(1, (o.life - o.age) * 0.5);
    }
    this.leaves.upload();
  }
}
