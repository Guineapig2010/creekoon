// Enclosed creek-side vegetation: trees close to both banks with crowns over the water,
// tangled shrubs, bare branches, fallen wood and undergrowth. Built in chunks along the
// creek so distant parts are culled. Openings follow the field references (the Clearing).
import * as THREE from 'three';
import { STARTS, S_FINISH } from '../core/config.js';
import { WORKSHOP } from '../core/game.js';
import { mulberry32, fbm } from '../core/noise.js';
import { barkTexture, grassTexture } from './textures.js';
import { foliageGeometry, foliageMaterials, foliageCards } from './foliage.js';

/** Density of creek-side vegetation by place (1 = normal woodland). side < 0 is the east bank. */
function density(creek, s, side) {
  if (!creek.isMain) return 1.7; // Crawfish Springs: deep forest, tight, layered, shaded
  let k = 1;
  if (side < 0 && s > 34 && s < 518) k = 1.15; // the wooded Continental Shelf along the east bank
  if (s > 469) k = 0.55; // lower creek below the falls: comparatively sunny, water in a carved bed
  if (s > 96.2 && s < 100) k = side > 0 ? 0 : 0.85; // the Clearing: grasses on the west, the wooded Shelf east
  if (s > 138 && s < 148 && side > 0) k = 1.4; // Flat Rocks: dense willows close behind the ledge (the ground photo)
  if (s < 34) k = 1.25; // the Farlands
  return k;
}

export function buildRiparian(creek, quality, main = null) {
  const S_MIN = creek.sMin, S_MAX = creek.sMax;
  const q = quality === 'low' ? 0.4 : quality === 'medium' ? 0.7 : 1;
  const rnd = mulberry32(8080);
  const root = new THREE.Group();
  const canopy = new THREE.Group(); // hidden in the overhead map
  canopy.name = 'canopy';
  root.add(canopy);
  const trunkCols = [];
  const bark = barkTexture();
  const barkPale = new THREE.MeshStandardMaterial({ map: bark, color: 0xe6e0d4, roughness: 0.95 }); // sycamore
  const barkDark = new THREE.MeshStandardMaterial({ map: bark, color: 0x9a8a76, roughness: 1 }); // oak
  // leafy crowns and shrubs (alpha-cut leaf cards, rounded light, leaf-shaped shadows)
  const fol = foliageMaterials();
  const crownMat = fol.mat, shrubMat = fol.mat;
  const cardTex = grassTexture(64, 128);
  const cardMat = new THREE.MeshStandardMaterial({ map: cardTex, alphaTest: 0.45, side: THREE.DoubleSide, roughness: 1 });
  cardMat.onBeforeCompile = (sh) => { sh.fragmentShader = sh.fragmentShader.replace('#include <normal_fragment_begin>', THREE.ShaderChunk.normal_fragment_begin.replace('normal *= faceDirection;', '')); };
  const trunkGeo = jitterTrunk(new THREE.CylinderGeometry(0.5, 1, 1, 11, 6)); trunkGeo.translate(0, 0.5, 0);
  const crownGeo = foliageGeometry(foliageCards(quality), 3, 0.8);
  const shrubGeo = foliageGeometry(foliageCards(quality, 'shrub'), 5, 0.75);
  const twigGeo = new THREE.CylinderGeometry(0.5, 1, 1, 5, 1); twigGeo.translate(0, 0.5, 0);
  const cardGeo = crossed();
  const L2 = {};
  const keep = (s, d) => {
    const c = creek.c(s);
    if (main) { const p = creek.worldXZ(s, d); main.locate(p.x, p.z, -1, L2); if (Math.abs(L2.d) < 9.8 && L2.s > main.sMin && L2.s < main.sMax) return false; }
    if (creek.gully) { const gd = creek.gullyDist(s, d); if (gd && gd.dist < 1.4) return false; }
    if (creek.ledge && creek.ledgeZone(s, d) >= 0) return false; // Flat Rocks: the bar, the recess and the ledge top stay open
    if (s > creek.alt.s0 && s < creek.alt.s1 && Math.abs(d - creek.altD(s)) < 0.7) return false; // the alternate route
    for (const st of STARTS) {
      const ss = creek.siteS(st);
      if (ss === null) continue;
      if (s > ss - 2.4 && s < ss + 2.6 && d > c && d < c + creek.wR(ss) + 3.4) return false; // factory pads and the spawn spot
      if (Math.abs(s - ss) < 0.8 && d < c && d > c - creek.wL(ss) - 1.0) return false; // launch markers
      if (Math.abs(s - (ss - 1.9)) < 0.7 && d > c && Math.abs(d - (c + creek.wR(ss) + 1.1)) < 0.8) return false; // map boards
    }
    if (creek.isMain && s > S_FINISH - 2.6 && s < S_FINISH + 4 && Math.abs(d - c) < 3.2) return false; // finish station
    if (creek.isMain && Math.abs(s - WORKSHOP.s) < 2.2 && d > c && d < c + creek.wR(s) + 3.2) return false; // Bank Workshop yard
    if (!creek.isMain && s > 55.4 && s < 60 && d > c + 0.9 && d < c + 3.0) return false; // double ponds
    return true;
  };
  const chunk = 20;
  const m4 = new THREE.Matrix4(), qt = new THREE.Quaternion(), sc = new THREE.Vector3(), pv = new THREE.Vector3(), col = new THREE.Color();
  const up = new THREE.Vector3(0, 1, 0);
  for (let s0 = S_MIN + 0.5; s0 < S_MAX - 1; s0 += chunk) {
    const trunks = [], crowns = [], shrubs = [], twigs = [], logs = [], cards = [];
    for (const side of [-1, 1]) {
      for (let s = s0; s < Math.min(S_MAX - 1, s0 + chunk); s += 0.25) {
        const k = density(creek, s, side) * q;
        const c = creek.c(s), w = side < 0 ? creek.wL(s) : creek.wR(s);
        // trees (about one per metre per bank in normal woodland)
        if (rnd() < 0.24 * k) {
          const off = w + 0.9 + Math.pow(rnd(), 1.4) * 6.5;
          const d = c + side * off;
          if (Math.abs(d) > 9.4 || !keep(s, d)) continue;
          const p = creek.worldXZ(s, d);
          const y = creek.bedH(s, d) - 0.05;
          const h = 4 + rnd() * 7, r = 0.09 + rnd() * 0.16;
          const lean = (rnd() - 0.5) * 0.25 - side * 0.12; // lean a little over the creek
          const pale = rnd() < 0.55;
          trunks.push({ x: p.x, y, z: p.z, h, r, lean, pale, s, d });
          trunkCols.push({ x: p.x, z: p.z, r: r + 0.05 });
          const bare = rnd() < 0.14;
          const fr = creek.frame(s);
          const nCrown = bare ? 0 : 3 + Math.floor(rnd() * 3);
          for (let i = 0; i < nCrown; i++) {
            const over = (rnd() * 1.6 + 0.2) * (off < 3 ? 1 : 0.5);
            const cs = s + (rnd() - 0.5) * 2.2, cd = d - side * over;
            const cp = creek.worldXZ(cs, cd);
            const cr = 1.0 + rnd() * 1.6;
            crowns.push({ x: cp.x, y: y + h * (0.62 + rnd() * 0.32), z: cp.z, r: cr, sy: 0.65 + rnd() * 0.3, hue: rnd(), lit: rnd() });
          }
          void fr;
          // bare branches mixed into the growth
          const nTw = bare ? 6 : 2;
          for (let i = 0; i < nTw; i++) twigs.push({ x: p.x, y: y + h * (0.35 + rnd() * 0.5), z: p.z, len: 0.8 + rnd() * 2.2, rx: (rnd() - 0.5) * 2.4, ry: rnd() * 6.28, r: 0.025 + rnd() * 0.03 });
        }
        // tangled shrubs close to the water
        if (rnd() < 0.55 * k) {
          const off = w + 0.3 + Math.pow(rnd(), 1.6) * 4;
          const d = c + side * off;
          if (Math.abs(d) > 9.6 || !keep(s, d)) continue;
          const p = creek.worldXZ(s, d);
          const y = creek.bedH(s, d);
          const r = 0.3 + rnd() * 0.7;
          for (let i = 0; i < 2; i++) shrubs.push({ x: p.x + (rnd() - 0.5) * r, y: y + r * 0.35, z: p.z + (rnd() - 0.5) * r, r: r * (0.7 + rnd() * 0.5), hue: rnd() });
        }
        // undergrowth cards and leafy litter plants
        if (rnd() < 0.9 * k) {
          const off = w + 0.2 + Math.pow(rnd(), 1.3) * 6;
          const d = c + side * off;
          if (Math.abs(d) > 9.7 || !keep(s, d)) continue;
          const p = creek.worldXZ(s, d);
          cards.push({ x: p.x, y: creek.bedH(s, d) - 0.01, z: p.z, h: 0.25 + rnd() * 0.6, rot: rnd() * 6.28, hue: rnd() });
        }
        // fallen wood
        if (rnd() < 0.025 * k) {
          const off = w + 0.25 + rnd() * 3;
          const d = c + side * off;
          if (!keep(s, d)) continue;
          const p = creek.worldXZ(s, d);
          logs.push({ x: p.x, y: creek.bedH(s, d) + 0.07, z: p.z, len: 1 + rnd() * 2.5, r: 0.06 + rnd() * 0.08, rot: rnd() * 6.28 });
        }
      }
    }
    // the Clearing: tall grasses and reeds on the west edge
    if (creek.isMain && s0 <= 99.8 && s0 + chunk >= 96.4) {
      for (let i = 0; i < 260 * q; i++) {
        const s = 96.4 + rnd() * 3.4, c = creek.c(s);
        const d = c + creek.wR(s) + 0.1 + rnd() * 4;
        const p = creek.worldXZ(s, d);
        cards.push({ x: p.x, y: creek.bedH(s, d) - 0.01, z: p.z, h: 0.6 + rnd() * 0.9, rot: rnd() * 6.28, hue: 0.3 + rnd() * 0.4 });
      }
    }
    // ---- instanced meshes for this chunk
    const mk = (geo, mat, n, fill, cast = true, parent = root) => {
      if (!n) return;
      const m = new THREE.InstancedMesh(geo, mat, n);
      for (let i = 0; i < n; i++) fill(i);
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
      m.castShadow = cast; m.receiveShadow = true;
      if (mat === fol.mat) m.customDepthMaterial = fol.depth;
      m.computeBoundingSphere();
      parent.add(m);
      return m;
    };
    const pale = trunks.filter((t) => t.pale), dark = trunks.filter((t) => !t.pale);
    for (const [list, mat] of [[pale, barkPale], [dark, barkDark]]) {
      const tm = mk(trunkGeo, mat, list.length, () => {});
      if (!tm) continue;
      list.forEach((t, i) => {
        qt.setFromAxisAngle(new THREE.Vector3(Math.cos(t.s), 0, Math.sin(t.s)), t.lean);
        m4.compose(pv.set(t.x, t.y, t.z), qt, sc.set(t.r, t.h * 0.82, t.r));
        tm.setMatrixAt(i, m4);
      });
      tm.instanceMatrix.needsUpdate = true;
      tm.computeBoundingSphere();
    }
    const crownMesh = mk(crownGeo, crownMat, crowns.length, () => {}, true, canopy);
    if (crownMesh) {
      crowns.forEach((c, i) => {
        qt.setFromAxisAngle(up, c.hue * 6.28);
        m4.compose(pv.set(c.x, c.y, c.z), qt, sc.set(c.r * 0.9, c.r * c.sy, c.r * 0.9));
        crownMesh.setMatrixAt(i, m4);
        // sycamore and oak greens: yellow-green to deep green, some paler in the sun
        col.setHSL(0.2 + c.hue * 0.09, 0.22 + c.hue * 0.2, 0.62 + c.lit * 0.24);
        crownMesh.setColorAt(i, col);
      });
      crownMesh.instanceMatrix.needsUpdate = true; crownMesh.instanceColor.needsUpdate = true; crownMesh.computeBoundingSphere();
    }
    const shrubMesh = mk(shrubGeo, shrubMat, shrubs.length, () => {});
    if (shrubMesh) {
      shrubs.forEach((c, i) => {
        qt.setFromAxisAngle(up, c.hue * 6.28);
        m4.compose(pv.set(c.x, c.y, c.z), qt, sc.set(c.r * 0.95, c.r * 0.75, c.r * 0.95));
        shrubMesh.setMatrixAt(i, m4);
        col.setHSL(0.16 + c.hue * 0.12, 0.22 + c.hue * 0.22, 0.5 + c.hue * 0.22);
        shrubMesh.setColorAt(i, col);
      });
      shrubMesh.instanceMatrix.needsUpdate = true; shrubMesh.instanceColor.needsUpdate = true; shrubMesh.computeBoundingSphere();
    }
    const twigMesh = mk(twigGeo, barkDark, twigs.length, () => {}, false);
    if (twigMesh) {
      twigs.forEach((tw, i) => {
        qt.setFromEuler(new THREE.Euler(tw.rx, tw.ry, 0));
        m4.compose(pv.set(tw.x, tw.y, tw.z), qt, sc.set(tw.r, tw.len, tw.r));
        twigMesh.setMatrixAt(i, m4);
      });
      twigMesh.instanceMatrix.needsUpdate = true; twigMesh.computeBoundingSphere();
    }
    const logMesh = mk(twigGeo, barkPale, logs.length, () => {});
    if (logMesh) {
      logs.forEach((L, i) => {
        qt.setFromEuler(new THREE.Euler(Math.PI / 2, L.rot, 0, 'YXZ'));
        m4.compose(pv.set(L.x, L.y, L.z), qt, sc.set(L.r, L.len, L.r));
        logMesh.setMatrixAt(i, m4);
      });
      logMesh.instanceMatrix.needsUpdate = true; logMesh.computeBoundingSphere();
    }
    const cardMesh = mk(cardGeo, cardMat, cards.length, () => {}, false);
    if (cardMesh) {
      cards.forEach((c, i) => {
        qt.setFromAxisAngle(up, c.rot);
        m4.compose(pv.set(c.x, c.y, c.z), qt, sc.set(c.h * 0.9, c.h, c.h));
        cardMesh.setMatrixAt(i, m4);
        col.setHSL(0.16 + c.hue * 0.12, 0.45, 0.62 + c.hue * 0.3);
        cardMesh.setColorAt(i, col);
      });
      cardMesh.instanceMatrix.needsUpdate = true; cardMesh.instanceColor.needsUpdate = true; cardMesh.computeBoundingSphere();
    }
  }
  root.userData.trunks = trunkCols;
  root.userData.canopy = canopy;
  return root;
}

/** A tapered trunk with a little bark relief and a slight wander. */
function jitterTrunk(g) {
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const a = Math.atan2(z, x), t = y + 0.5;
    const k = 1 + 0.07 * Math.sin(a * 5 + t * 3) + 0.04 * Math.sin(a * 11);
    p.setXYZ(i, x * k + Math.sin(t * 2.6) * 0.18, y, z * k + Math.cos(t * 2.1) * 0.12);
  }
  g.computeVertexNormals();
  return g;
}

function jitter(g, amt, seed) {
  const p = g.attributes.position; const r2 = mulberry32(seed);
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const n = 1 + (fbm(x * 2 + seed, z * 2 + y, 2, seed) * amt) + (r2() - 0.5) * amt * 0.3;
    p.setXYZ(i, x * n, y * n, z * n);
  }
  g.computeVertexNormals();
  return g;
}

function crossed() {
  const a = new THREE.PlaneGeometry(1, 1); a.translate(0, 0.5, 0);
  const b = a.clone(); b.rotateY(Math.PI / 2);
  const pos = new Float32Array([...a.attributes.position.array, ...b.attributes.position.array]);
  const uv = new Float32Array([...a.attributes.uv.array, ...b.attributes.uv.array]);
  const nor = new Float32Array(pos.length);
  for (let i = 0; i < nor.length; i += 3) nor[i + 1] = 1;
  const idx = [...a.index.array, ...Array.from(b.index.array).map((v) => v + 4)];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}
