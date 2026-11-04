// Creek water surface, waterfall sheets.
import * as THREE from 'three';
import { S_MIN, S_MAX, STEPS } from '../core/creek.js';
import { waterNormalTexture, streakTexture, foamTexture } from './textures.js';

const waterVert = /* glsl */`
  attribute float aDepth;
  attribute vec2 aFlow;
  attribute float aFoam;
  varying vec3 vWorld;
  varying float vDepth;
  varying vec2 vFlow;
  varying float vFoam;
  #include <fog_pars_vertex>
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    vDepth = aDepth;
    vFlow = aFlow;
    vFoam = aFoam;
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;

const waterFrag = /* glsl */`
  uniform float uTime;
  uniform sampler2D uNormal;
  uniform sampler2D uFoamTex;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uSkyTop;
  uniform vec3 uSkyHorizon;
  uniform vec3 uShallow;
  uniform vec3 uDeep;
  uniform float uDetail;
  varying vec3 vWorld;
  varying float vDepth;
  varying vec2 vFlow;
  varying float vFoam;
  #include <fog_pars_fragment>

  vec3 sampleN(vec2 uv) { return texture2D(uNormal, uv).xyz * 2.0 - 1.0; }

  void main() {
    float speed = length(vFlow);
    float t = uTime * 0.6;
    float ph0 = fract(t), ph1 = fract(t + 0.5);
    float wgt = abs(ph0 * 2.0 - 1.0);
    vec2 uv = vWorld.xz * 2.2;
    vec2 off = vFlow * 0.45;
    vec3 n0 = sampleN(uv - off * ph0) ;
    vec3 n1 = sampleN(uv - off * ph1 + 0.37);
    vec3 nA = mix(n0, n1, wgt);
    vec3 n2 = sampleN(vWorld.xz * 6.5 - off * 1.7 * ph0 + 0.11);
    vec3 n3 = sampleN(vWorld.xz * 6.5 - off * 1.7 * ph1 + 0.71);
    vec3 nB = mix(n2, n3, wgt);
    float rough = 0.14 + speed * 0.14 + vFoam * 0.45;
    vec3 n = normalize(vec3((nA.x + nB.x * 0.6 * uDetail) * rough, 1.0, (nA.y + nB.y * 0.6 * uDetail) * rough));
    vec3 V = normalize(cameraPosition - vWorld);
    float ndv = max(dot(n, V), 0.0);
    float fres = 0.05 + 0.95 * pow(1.0 - ndv, 5.0);
    vec3 R = reflect(-V, n);
    float up = clamp(R.y, 0.0, 1.0);
    vec3 sky = mix(uSkyHorizon, uSkyTop, pow(up, 0.6));
    // banks and trees darken low reflections
    sky = mix(sky * vec3(0.45, 0.55, 0.4), sky, smoothstep(0.05, 0.45, up));
    float depthF = smoothstep(0.0, 0.55, vDepth);
    vec3 body = mix(uShallow, uDeep, depthF);
    vec3 col = mix(body, sky, fres);
    float spec = pow(max(dot(R, uSunDir), 0.0), 140.0) * 3.0 + pow(max(dot(R, uSunDir), 0.0), 16.0) * 0.12;
    col += uSunColor * spec;
    // foam / whitewater
    vec2 fuv = vWorld.xz * 1.6;
    float f0 = texture2D(uFoamTex, fuv - vFlow * ph0 * 0.6).r;
    float f1 = texture2D(uFoamTex, fuv * 1.7 - vFlow * ph1 * 0.6 + 0.3).r;
    float fn = mix(f0, f1, wgt);
    float foam = smoothstep(0.75 - vFoam * 0.7, 1.0 - vFoam * 0.45, fn + vFoam * 0.35) * clamp(vFoam * 1.4, 0.0, 1.0);
    // thin wet line where water meets the bank
    float edge = 1.0 - smoothstep(0.0, 0.012, vDepth);
    foam = max(foam, edge * 0.25 * fn);
    col = mix(col, vec3(0.93, 0.96, 0.97), foam);
    float alpha = mix(0.4, 0.9, smoothstep(0.0, 0.35, vDepth));
    alpha = max(alpha, fres * 0.9);
    alpha = max(alpha, foam);
    alpha *= smoothstep(-0.004, 0.006, vDepth);
    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;

export function buildWater(creek, quality, sunDir) {
  const ds = quality === 'low' ? 0.12 : 0.06;
  const nU = quality === 'low' ? 12 : 22;
  const nS = Math.floor((S_MAX - S_MIN) / ds) + 1;
  const pos = new Float32Array(nS * nU * 3);
  const depth = new Float32Array(nS * nU), foam = new Float32Array(nS * nU), flow = new Float32Array(nS * nU * 2);
  const p = {}, fl = {}, fr = {};
  const wetRocks = creek.rocks.filter((r) => {
    const wl = creek.waterLevel(r.s, r.d);
    return wl > -1e8 && r.y + r.r > wl && r.y - r.r < wl;
  });
  for (let i = 0; i < nS; i++) {
    const s = Math.min(S_MAX, S_MIN + i * ds);
    const c = creek.c(s), wl = creek.wL(s), wr = creek.wR(s), y0 = creek.y0(s);
    const fo = creek.row(creek.rFoam, s);
    creek.frame(s, fr);
    const near = wetRocks.filter((r) => Math.abs(r.s - s) < 0.5);
    for (let j = 0; j < nU; j++) {
      const u = -1.04 + (2.08 * j) / (nU - 1);
      const d = c + (u < 0 ? u * wl : u * wr);
      creek.worldXZ(s, d, p);
      const k = i * nU + j;
      pos[k * 3] = p.x; pos[k * 3 + 1] = y0 + 0.003; pos[k * 3 + 2] = p.z;
      depth[k] = y0 - creek.bedH(s, d);
      creek.flowAt(s, d, y0, 0, fr.tx, fr.tz, fl);
      flow[k * 2] = fl.vx; flow[k * 2 + 1] = fl.vz;
      let f = fo;
      for (const r of near) {
        const dist = Math.hypot(s - r.s, d - r.d);
        const R = Math.sqrt(Math.max(0, r.r * r.r - (y0 - r.y) ** 2));
        if (dist < R * 3.2) f = Math.max(f, 0.75 * Math.exp(-Math.max(0, dist - R) / (R * 0.7)) * Math.min(1, Math.hypot(fl.vx, fl.vz) * 1.2));
      }
      foam[k] = f;
    }
  }
  const idx = [];
  for (let i = 0; i < nS - 1; i++) for (let j = 0; j < nU - 1; j++) {
    const a = i * nU + j, b = a + 1, c2 = a + nU, d2 = c2 + 1;
    idx.push(a, b, c2, b, d2, c2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aDepth', new THREE.BufferAttribute(depth, 1));
  geo.setAttribute('aFlow', new THREE.BufferAttribute(flow, 2));
  geo.setAttribute('aFoam', new THREE.BufferAttribute(foam, 1));
  geo.setIndex(idx);
  geo.computeBoundingSphere();
  const uniforms = THREE.UniformsUtils.merge([
    THREE.UniformsLib.fog,
    {
      uTime: { value: 0 },
      uNormal: { value: null },
      uFoamTex: { value: null },
      uSunDir: { value: sunDir.clone() },
      uSunColor: { value: new THREE.Color(1.0, 0.94, 0.82) },
      uSkyTop: { value: new THREE.Color(0.36, 0.55, 0.82) },
      uSkyHorizon: { value: new THREE.Color(0.78, 0.86, 0.9) },
      uShallow: { value: new THREE.Color(0.1, 0.19, 0.17) },
      uDeep: { value: new THREE.Color(0.025, 0.08, 0.08) },
      uDetail: { value: quality === 'low' ? 0 : 1 },
    },
  ]);
  uniforms.uNormal.value = waterNormalTexture();
  uniforms.uFoamTex.value = foamTexture(128);
  uniforms.uFoamTex.value.wrapS = uniforms.uFoamTex.value.wrapT = THREE.RepeatWrapping;
  const mat = new THREE.ShaderMaterial({
    vertexShader: waterVert, fragmentShader: waterFrag, uniforms, transparent: true, depthWrite: false, fog: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 2;
  mesh.name = 'water';
  return mesh;
}

const fallVert = /* glsl */`
  attribute float aAlpha;
  varying vec2 vUv;
  varying float vAlpha;
  varying vec3 vWorld;
  #include <fog_pars_vertex>
  void main() {
    vUv = uv; vAlpha = aAlpha;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;
const fallFrag = /* glsl */`
  uniform sampler2D uTex;
  uniform float uTime;
  varying vec2 vUv;
  varying float vAlpha;
  varying vec3 vWorld;
  #include <fog_pars_fragment>
  void main() {
    float a = texture2D(uTex, vec2(vUv.x * 2.0, vUv.y * 1.2 + uTime * 1.6)).r;
    float b = texture2D(uTex, vec2(vUv.x * 3.1 + 0.3, vUv.y * 0.8 + uTime * 2.3)).r;
    float m = a * 0.6 + b * 0.5;
    float edge = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
    vec3 col = mix(vec3(0.55, 0.68, 0.7), vec3(0.96, 0.98, 1.0), clamp(m + vUv.y * 0.4, 0.0, 1.0));
    gl_FragColor = vec4(col, clamp((0.35 + m * 0.6) * edge * vAlpha, 0.0, 1.0));
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    #include <fog_fragment>
  }
`;

export function buildFalls(creek) {
  const group = new THREE.Group();
  const tex = streakTexture();
  const uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, { uTex: { value: null }, uTime: { value: 0 } }]);
  uniforms.uTex.value = tex;
  const mat = new THREE.ShaderMaterial({ vertexShader: fallVert, fragmentShader: fallFrag, uniforms, transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: true });
  const p = {};
  const sheets = [];
  for (const st of STEPS) {
    const sTop = st.s - st.len / 2 - 0.01;
    const yTop = creek.y0(sTop - 0.02);
    const yBot = creek.y0(st.s + 0.6);
    const U = creek.row(creek.rU, sTop - 0.1);
    const T = Math.sqrt((2 * (yTop - yBot)) / 9.81);
    const cols = 12, rows = 14;
    const pos = [], uv = [], alpha = [], idx = [];
    for (let r = 0; r < rows; r++) {
      const t = r / (rows - 1);
      const tt = T * t;
      const sOff = U * tt * 0.9;
      const y = yTop + 0.012 - 0.5 * 9.81 * tt * tt;
      for (let c = 0; c < cols; c++) {
        const u = -0.92 + (1.84 * c) / (cols - 1);
        const ss = sTop + sOff;
        const cc = creek.c(sTop) + (creek.c(ss) - creek.c(sTop)) * 0.6;
        const w = u < 0 ? creek.wL(sTop) : creek.wR(sTop);
        const spread = 1 + t * 0.25;
        creek.worldXZ(ss, cc + u * w * spread, p);
        pos.push(p.x, y, p.z);
        uv.push(c / (cols - 1), t * (yTop - yBot) * 1.5);
        alpha.push(Math.min(1, 0.35 + st.h * 0.4) * (1 - 0.3 * t));
      }
    }
    for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
      const a = r * cols + c, b = a + 1, c2 = a + cols, d2 = c2 + 1;
      idx.push(a, c2, b, b, c2, d2);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setAttribute('aAlpha', new THREE.Float32BufferAttribute(alpha, 1));
    g.setIndex(idx);
    g.computeBoundingSphere();
    const m = new THREE.Mesh(g, mat);
    m.renderOrder = 3;
    group.add(m);
    creek.worldXZ(st.s + U * T * 0.9, creek.c(st.s + 0.3), p);
    sheets.push({ step: st, base: new THREE.Vector3(p.x, yBot, p.z), h: st.h, width: (creek.wL(sTop) + creek.wR(sTop)) });
  }
  group.userData.uniforms = uniforms;
  group.userData.sheets = sheets;
  return group;
}
