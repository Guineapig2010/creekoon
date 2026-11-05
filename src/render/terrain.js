// Terrain, rocks and vegetation meshes built from the creek description.
import * as THREE from 'three';
import { S_MIN, S_MAX, MAT } from '../core/creek.js';
import { fbm, vnoise, mulberry32, clamp, smoothstep } from '../core/noise.js';
import { STARTS, S_FINISH } from '../core/config.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { detailTexture, grassTexture, barkTexture } from './textures.js';

const COL = {
  gravel: new THREE.Color(0.5, 0.42, 0.31),
  rock: new THREE.Color(0.5, 0.49, 0.46),
  sand: new THREE.Color(0.64, 0.57, 0.43),
  dirt: new THREE.Color(0.4, 0.31, 0.21),
  grass: new THREE.Color(0.2, 0.31, 0.11),
  grass2: new THREE.Color(0.32, 0.38, 0.14),
  litter: new THREE.Color(0.36, 0.3, 0.18),
  moss: new THREE.Color(0.25, 0.33, 0.14),
};

function dSamples(quality) {
  const fine = quality === 'low' ? 0.09 : quality === 'medium' ? 0.06 : 0.045;
  const arr = [];
  for (let d = -10; d < -3.2; d += 0.4) arr.push(d);
  for (let d = -3.2; d < 4.4; d += fine) arr.push(d);
  for (let d = 4.4; d <= 10.001; d += 0.4) arr.push(d);
  if (arr[arr.length - 1] < 10) arr.push(10);
  return arr;
}

const ROCKC = [new THREE.Color(0.46, 0.45, 0.42), new THREE.Color(0.55, 0.52, 0.46), new THREE.Color(0.36, 0.36, 0.35)];
export function grassColor(x, z, out) {
  const n = fbm(x * 0.15, z * 0.15, 2, 5);
  out.copy(COL.grass).lerp(COL.grass2, 0.5 + n * 0.5);
  // patches of leaf litter and bare ground under the trees
  const p = fbm(x * 0.06 + 7, z * 0.06, 2, 9);
  if (p > 0.15) out.lerp(COL.litter, Math.min(0.55, (p - 0.15) * 2));
  return out;
}

export function terrainColor(creek, s, d, h, mat, out, slope = 0, x = 0, z = 0) {
  const y0 = creek.y0(s);
  const c = creek.c(s);
  const n = vnoise(s * 3.1, d * 3.1, 3) * 0.5 + vnoise(s * 13, d * 13, 4) * 0.5;
  const dc = Math.abs(d - c);
  const edge = dc - (d < c ? creek.wL(s) : creek.wR(s)); // metres beyond the water's edge
  const above = h - y0;
  const steep = smoothstep(0.7, 1.8, slope);
  const inBed = edge < 0.04;
  const rockyBank = mat === MAT.ROCK;
  if (inBed) {
    out.copy(mat === MAT.GRAVEL ? COL.gravel : mat === MAT.SAND ? COL.sand : mat === MAT.ROCK ? ROCKC[0] : COL.dirt);
  } else {
    // banks: grass on gentle ground, dirt on the first strip, rock on steep or rocky ground
    grassColor(x, z, out);
    const dirtStrip = 1 - smoothstep(0.05, 0.35 + Math.max(0, n) * 0.3, edge);
    out.lerp(mat === MAT.GRAVEL ? COL.gravel : COL.dirt, Math.max(dirtStrip, smoothstep(-0.02, 0.06, -above + 0.06) * 0.6));
    const rockAmt = Math.max(steep, rockyBank ? 1 - smoothstep(0.25, 1.4 + n * 0.6, edge) : 0);
    if (rockAmt > 0) {
      const rn = vnoise(s * 1.7 + h * 2.1, d * 1.7, 12) * 0.5 + 0.5;
      const rc = ROCKC[0].clone().lerp(rn > 0.5 ? ROCKC[1] : ROCKC[2], Math.abs(rn - 0.5) * 2);
      if (steep > 0.3) rc.multiplyScalar(0.82 - 0.1 * steep);
      out.lerp(rc, rockAmt);
      if (!steep && above > 0.3) out.lerp(COL.moss, clamp(0.25 + n * 0.4, 0, 0.5) * (1 - steep));
    }
  }
  // speckle
  const sp = 1 + n * 0.16 + (mat === MAT.GRAVEL && inBed ? vnoise(s * 40, d * 40, 8) * 0.2 : 0);
  out.multiplyScalar(sp);
  // wet line and underwater darkening
  if (above < 0.035 && creek.inChannel(s, d, 0.2)) {
    const wet = 1 - smoothstep(-0.01, 0.035, above);
    out.multiplyScalar(1 - 0.42 * wet);
    if (above < 0) { const k = Math.min(1, -above / 0.1); out.r *= 0.78 - 0.2 * k; out.g *= 0.8 - 0.15 * k; out.b *= 0.62 - 0.12 * k; }
  }
  // blend into the surrounding landscape at the corridor edges
  const fade = smoothstep(7.5, 9.8, Math.abs(d));
  if (fade > 0) out.lerp(grassColor(x, z, new THREE.Color()), fade);
  return out;
}

export function buildTerrain(creek, quality) {
  const ds = quality === 'low' ? 0.2 : quality === 'medium' ? 0.13 : 0.1;
  const dArr = dSamples(quality);
  const nS = Math.floor((S_MAX - S_MIN) / ds) + 1;
  const nD = dArr.length;
  const pos = new Float32Array(nS * nD * 3);
  const col = new Float32Array(nS * nD * 3);
  const uv = new Float32Array(nS * nD * 2);
  const p = {}, c = new THREE.Color(), B = {};
  for (let i = 0; i < nS; i++) {
    const s = Math.min(S_MAX, S_MIN + i * ds);
    for (let j = 0; j < nD; j++) {
      const d = dArr[j];
      creek.worldXZ(s, d, p);
      creek.bedAt(s, d, B);
      const k = i * nD + j;
      let h = B.h;
      if (j === 0 || j === nD - 1) h -= 0.25; // skirt under the far terrain seam
      pos[k * 3] = p.x; pos[k * 3 + 1] = h; pos[k * 3 + 2] = p.z;
      terrainColor(creek, s, d, B.h, B.mat, c, Math.hypot(B.hs, B.hd), p.x, p.z);
      col[k * 3] = c.r; col[k * 3 + 1] = c.g; col[k * 3 + 2] = c.b;
      uv[k * 2] = p.x * 1.5; uv[k * 2 + 1] = p.z * 1.5;
    }
  }
  const idx = [];
  for (let i = 0; i < nS - 1; i++) for (let j = 0; j < nD - 1; j++) {
    const a = i * nD + j, b = a + 1, c2 = a + nD, d2 = c2 + 1;
    idx.push(a, b, c2, b, d2, c2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const detail = detailTexture(256, 3, 0.42);
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: detail, roughness: 0.92, metalness: 0 });
  // split into ~10 m chunks so off-screen parts of the long creek are culled
  const group = new THREE.Group();
  group.name = 'terrain';
  for (const g of splitRows(geo, nS, nD, Math.max(8, Math.round(10 / ds)))) {
    const m = new THREE.Mesh(g, mat);
    m.receiveShadow = true;
    group.add(m);
  }
  geo.dispose();
  return group;
}

/** Split a row-major grid geometry into chunks of rows (attributes copied, normals kept). */
export function splitRows(geo, nRows, nCols, rowsPer) {
  const out = [];
  const names = Object.keys(geo.attributes);
  for (let r0 = 0; r0 < nRows - 1; r0 += rowsPer) {
    const r1 = Math.min(nRows - 1, r0 + rowsPer);
    const rows = r1 - r0 + 1;
    const g = new THREE.BufferGeometry();
    for (const nm of names) {
      const A = geo.attributes[nm];
      const sz = A.itemSize;
      g.setAttribute(nm, new THREE.BufferAttribute(A.array.slice(r0 * nCols * sz, (r1 + 1) * nCols * sz), sz));
    }
    const idx = [];
    for (let i = 0; i < rows - 1; i++) for (let j = 0; j < nCols - 1; j++) {
      const a = i * nCols + j, b = a + 1, c = a + nCols, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    g.setIndex(idx);
    g.computeBoundingSphere();
    out.push(g);
  }
  return out;
}

/** Height of the landscape at any world point (also outside the creek corridor). */
export function landHeight(creek, x, z, hint = {}) {
  const L = creek.locate(x, z, -1, hint);
  const s = clamp(L.s, S_MIN, S_MAX);
  let h = creek.bedRaw(s, L.d, {});
  const ad = Math.abs(L.d - creek.c(s));
  h += (fbm(x * 0.025, z * 0.025, 3, 91) * 5 + 1.2) * smoothstep(9, 35, ad);
  // beyond the ends of the creek corridor rise gently
  if (L.s < S_MIN) h += (S_MIN - L.s) * 0.12;
  return { h, s: L.s, d: L.d, ad };
}

export function buildFarTerrain(creek, quality) {
  const step = quality === 'low' ? 2 : 1.25;
  const x0 = -90, x1 = 90, z0 = -290, z1 = 50;
  const nx = Math.round((x1 - x0) / step) + 1, nz = Math.round((z1 - z0) / step) + 1;
  const pos = new Float32Array(nx * nz * 3), col = new Float32Array(nx * nz * 3), uv = new Float32Array(nx * nz * 2);
  const inside = new Uint8Array(nx * nz);
  const c = new THREE.Color();
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const x = x0 + i * step, z = z0 + j * step;
    const L = landHeight(creek, x, z);
    const k = j * nx + i;
    inside[k] = L.s > S_MIN + 0.3 && L.s < S_MAX - 0.3 && Math.abs(L.d) < 9.7 ? 1 : 0;
    pos[k * 3] = x; pos[k * 3 + 1] = L.h - 0.04; pos[k * 3 + 2] = z;
    grassColor(x, z, c);
    if (L.ad > 30) c.lerp(new THREE.Color(0.24, 0.32, 0.15), smoothstep(30, 70, L.ad));
    col[k * 3] = c.r; col[k * 3 + 1] = c.g; col[k * 3 + 2] = c.b;
    uv[k * 2] = x * 1.5; uv[k * 2 + 1] = z * 1.5;
  }
  const idx = [];
  for (let j = 0; j < nz - 1; j++) for (let i = 0; i < nx - 1; i++) {
    const a = j * nx + i, b = a + 1, c2 = a + nx, d2 = c2 + 1;
    if (inside[a] && inside[b] && inside[c2] && inside[d2]) continue;
    idx.push(a, c2, b, b, c2, d2);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: detailTexture(256, 9, 0.3), roughness: 0.95 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  return mesh;
}

// ---------------------------------------------------------------- rocks
function rockGeometry(seed) {
  let g = new THREE.IcosahedronGeometry(1, 3);
  g.deleteAttribute('normal'); g.deleteAttribute('uv');
  g = mergeVertices(g);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = fbm(v.x * 1.6 + seed, v.y * 1.6 + v.z * 0.7, 3, seed) * 0.16 + vnoise(v.x * 5 + seed, v.z * 5 + v.y * 3, seed + 1) * 0.04;
    v.multiplyScalar(1 + n);
    // flatten the bottom a bit
    if (v.y < -0.4) v.y = -0.4 + (v.y + 0.4) * 0.6;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

export function buildRocks(creek) {
  const variants = [rockGeometry(1), rockGeometry(7), rockGeometry(13)];
  const detail = detailTexture(128, 17, 0.45);
  const rocks = creek.rocks;
  const groups = variants.map(() => []);
  const rnd = mulberry32(77);
  rocks.forEach((r, i) => groups[i % 3].push(r));
  const meshes = [];
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), sc = new THREE.Vector3(), ps = new THREE.Vector3();
  groups.forEach((list, vi) => {
    const mat = new THREE.MeshStandardMaterial({ color: 0x8a8780, map: detail, roughness: 0.88 });
    mat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nattribute float aWaterY;\nattribute float aMoss;\nvarying float vWaterY;\nvarying float vMoss;\nvarying vec3 vWPos;\nvarying vec3 vWNorm;')
        .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWaterY = aWaterY;\nvMoss = aMoss;\nvec4 wp4 = modelMatrix * instanceMatrix * vec4(transformed, 1.0);\nvWPos = wp4.xyz;\nvWNorm = normalize(mat3(modelMatrix * instanceMatrix) * objectNormal);');
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', '#include <common>\nvarying float vWaterY;\nvarying float vMoss;\nvarying vec3 vWPos;\nvarying vec3 vWNorm;')
        .replace('#include <map_fragment>', `#include <map_fragment>
          float wetBand = 1.0 - smoothstep(vWaterY + 0.015, vWaterY + 0.05, vWPos.y);
          float under = 1.0 - step(vWaterY, vWPos.y);
          diffuseColor.rgb *= mix(1.0, 0.52, wetBand);
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.78, 0.86, 0.72), under);
          float mossAmt = vMoss * smoothstep(0.55, 0.9, vWNorm.y) * (1.0 - wetBand);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.2, 0.3, 0.1), mossAmt * 0.7);`)
        .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
          roughnessFactor = mix(roughnessFactor, 0.28, wetBand * (1.0 - under));`);
    };
    const mesh = new THREE.InstancedMesh(variants[vi], mat, list.length);
    const wy = new Float32Array(list.length), moss = new Float32Array(list.length);
    list.forEach((r, i) => {
      e.set(rnd() * 6.28, rnd() * 6.28, rnd() * 0.4);
      q.setFromEuler(e);
      const f = 0.95 + rnd() * 0.1;
      sc.set(r.r * f * 1.03, r.r * (0.9 + rnd() * 0.08), r.r * (1.0 + rnd() * 0.06));
      ps.set(r.x, r.y, r.z);
      m4.compose(ps, q, sc);
      mesh.setMatrixAt(i, m4);
      const wl = creek.waterLevel(r.s, r.d);
      wy[i] = wl > -1e8 ? wl : creek.y0(r.s) + (creek.inChannel(r.s, r.d, 0.4) ? 0 : -50);
      moss[i] = r.tag === 'boulder' || r.tag === 'bank' ? 0.4 + rnd() * 0.6 : 0.15;
    });
    mesh.geometry = mesh.geometry.clone();
    mesh.geometry.setAttribute('aWaterY', new THREE.InstancedBufferAttribute(wy, 1));
    mesh.geometry.setAttribute('aMoss', new THREE.InstancedBufferAttribute(moss, 1));
    mesh.castShadow = true; mesh.receiveShadow = true;
    mesh.instanceMatrix.needsUpdate = true;
    meshes.push(mesh);
  });
  return meshes;
}

// ---------------------------------------------------------------- vegetation
export function buildVegetation(creek, quality) {
  const group = new THREE.Group();
  const rnd = mulberry32(5150);
  const nTrees = quality === 'low' ? 220 : 480;
  const trunks = [], cones = [], crowns = [];
  const keepClear = (L) => {
    for (const st of STARTS) if (Math.abs(L.s - st.s) < 2.5 && L.d > creek.c(st.s)) return true;
    if (Math.abs(L.s - S_FINISH) < 3) return true;
    return false;
  };
  let guard = 0;
  while (trunks.length < nTrees && guard++ < 20000) {
    const x = -80 + rnd() * 160, z = -285 + rnd() * 330;
    const L = landHeight(creek, x, z);
    if (L.ad < 9.5 || keepClear(L)) continue;
    if (L.ad < 9 && rnd() < 0.5) continue;
    const conifer = rnd() < 0.55;
    const hgt = (conifer ? 7 : 5) + rnd() * 6;
    const t = { x, y: L.h, z, h: hgt, conifer, r: 0.12 + rnd() * 0.12 };
    trunks.push(t);
    if (conifer) cones.push(t); else crowns.push(t);
  }
  const bark = barkTexture();
  const trunkGeo = new THREE.CylinderGeometry(0.6, 1, 1, 7, 1);
  trunkGeo.translate(0, 0.5, 0);
  const trunkMesh = new THREE.InstancedMesh(trunkGeo, new THREE.MeshStandardMaterial({ map: bark, roughness: 1 }), trunks.length);
  const coneGeo = new THREE.ConeGeometry(1, 1, 9, 3);
  coneGeo.translate(0, 0.5, 0);
  const jitter = (g, amt, seed) => {
    const p = g.attributes.position; const r2 = mulberry32(seed);
    for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) * (1 + (r2() - 0.5) * amt), p.getY(i), p.getZ(i) * (1 + (r2() - 0.5) * amt));
    g.computeVertexNormals();
    return g;
  };
  jitter(coneGeo, 0.25, 3);
  const coneMesh = new THREE.InstancedMesh(coneGeo, new THREE.MeshStandardMaterial({ color: 0x2f4a26, roughness: 0.95, flatShading: true }), cones.length * 3);
  const crownGeo = jitter(new THREE.IcosahedronGeometry(1, 1), 0.35, 9);
  const crownMesh = new THREE.InstancedMesh(crownGeo, new THREE.MeshStandardMaterial({ color: 0x4f6b2a, roughness: 0.95, flatShading: true }), crowns.length * 3);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
  const col = new THREE.Color();
  trunks.forEach((t, i) => {
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * 6.28);
    m4.compose(p.set(t.x, t.y - 0.2, t.z), q, s.set(t.r, t.h * (t.conifer ? 0.9 : 0.65), t.r));
    trunkMesh.setMatrixAt(i, m4);
  });
  let ci = 0;
  cones.forEach((t) => {
    for (let k = 0; k < 3; k++) {
      const base = t.y + t.h * (0.22 + k * 0.22), rad = t.h * (0.27 - k * 0.07), hh = t.h * (0.42 - k * 0.07);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * 6.28);
      m4.compose(p.set(t.x, base, t.z), q, s.set(rad, hh, rad));
      coneMesh.setMatrixAt(ci, m4);
      coneMesh.setColorAt(ci, col.setHSL(0.3 + rnd() * 0.06, 0.35, 0.18 + rnd() * 0.08));
      ci++;
    }
  });
  let ri = 0;
  crowns.forEach((t) => {
    for (let k = 0; k < 3; k++) {
      const rad = t.h * (0.2 + rnd() * 0.1);
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * 6.28);
      m4.compose(p.set(t.x + (rnd() - 0.5) * rad, t.y + t.h * (0.6 + rnd() * 0.25), t.z + (rnd() - 0.5) * rad), q, s.set(rad, rad * 0.8, rad));
      crownMesh.setMatrixAt(ri, m4);
      crownMesh.setColorAt(ri, col.setHSL(0.2 + rnd() * 0.08, 0.4, 0.26 + rnd() * 0.1));
      ri++;
    }
  });
  for (const m of [trunkMesh, coneMesh, crownMesh]) { m.castShadow = true; m.receiveShadow = true; group.add(m); }

  // grass tufts on the banks
  const nGrass = quality === 'low' ? 1200 : quality === 'medium' ? 2600 : 4200;
  const gtex = grassTexture();
  const gGeo = new THREE.PlaneGeometry(1, 1);
  gGeo.translate(0, 0.5, 0);
  const g2 = gGeo.clone().rotateY(Math.PI / 2);
  const merged = mergeGeos([gGeo, g2]);
  { const nn = merged.attributes.normal; for (let i = 0; i < nn.count; i++) nn.setXYZ(i, 0, 1, 0); }
  const gMat = new THREE.MeshStandardMaterial({ map: gtex, alphaTest: 0.45, side: THREE.DoubleSide, roughness: 1 });
  // grass is lit like the ground under it from both sides
  gMat.onBeforeCompile = (sh) => { sh.fragmentShader = sh.fragmentShader.replace('#include <normal_fragment_begin>', THREE.ShaderChunk.normal_fragment_begin.replace('normal *= faceDirection;', '')); };
  const grass = new THREE.InstancedMesh(merged, gMat, nGrass);
  let gi = 0; guard = 0;
  const pp = {};
  while (gi < nGrass && guard++ < nGrass * 8) {
    const sv = S_MIN + 1 + rnd() * (S_MAX - S_MIN - 2);
    const side = rnd() < 0.5 ? -1 : 1;
    const c = creek.c(sv), w = side < 0 ? creek.wL(sv) : creek.wR(sv);
    const dd = c + side * (w + 0.25 + rnd() * rnd() * 7.5);
    if (Math.abs(dd) > 9.8) continue;
    const B = creek.bedAt(sv, dd, {});
    if (B.mat === MAT.ROCK || B.mat === MAT.GRAVEL && rnd() < 0.8) continue;
    if (B.h < creek.y0(sv) + 0.04) continue;
    let skip = false;
    for (let k = 0; k < STARTS.length; k++) { const pad = creek.pads[k]; if (sv > pad.s0 - 0.2 && sv < pad.s1 + 0.2 && side > 0 && Math.abs(dd - c) < 2.4) skip = true; }
    if (Math.abs(sv - S_FINISH) < 1.4 && Math.abs(dd - c) < 1.6) skip = true;
    if (skip) continue;
    creek.worldXZ(sv, dd, pp);
    const hgt = 0.08 + rnd() * rnd() * 0.3;
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rnd() * 6.28);
    m4.compose(p.set(pp.x, B.h - 0.01, pp.z), q, s.set(hgt * (0.8 + rnd() * 0.6), hgt, hgt));
    grass.setMatrixAt(gi, m4);
    grass.setColorAt(gi, col.setHSL(0.2 + rnd() * 0.07, 0.45, 0.75 + rnd() * 0.25));
    gi++;
  }
  grass.count = gi;
  grass.receiveShadow = true;
  group.add(grass);
  return group;
}

function mergeGeos(geos) {
  let n = 0, ni = 0;
  for (const g of geos) { n += g.attributes.position.count; ni += g.index.count; }
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), uv = new Float32Array(n * 2), idx = [];
  let o = 0;
  for (const g of geos) {
    pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3); uv.set(g.attributes.uv.array, o * 2);
    for (let i = 0; i < g.index.count; i++) idx.push(g.index.array[i] + o);
    o += g.attributes.position.count;
  }
  void ni;
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  out.setIndex(idx);
  return out;
}
