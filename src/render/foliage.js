// Leafy foliage for crowns and shrubs: clusters of alpha-cut leaf cards with rounded,
// sphere-like lighting (normals point out from the cluster centre) and darker interiors.
// Replaces the faceted low-poly blobs. Shadows are cut by the same leaf texture.
import * as THREE from 'three';
import { mulberry32 } from '../core/noise.js';

let TEX = null;

/** A spray of small leaves on a transparent card (near-neutral greens; instances tint it). */
export function foliageTexture(size = 256) {
  if (TEX) return TEX;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  const rnd = mulberry32(4242);
  const R = size * 0.47;
  // a few dark twigs under the leaves
  g.strokeStyle = 'rgba(60,48,32,0.9)';
  for (let i = 0; i < 7; i++) {
    const a = rnd() * Math.PI * 2, l = R * (0.5 + rnd() * 0.45);
    g.lineWidth = 1 + rnd() * 1.6;
    g.beginPath(); g.moveTo(size / 2, size / 2); g.lineTo(size / 2 + Math.cos(a) * l, size / 2 + Math.sin(a) * l); g.stroke();
  }
  for (let i = 0; i < 420; i++) {
    // leaves crowd toward the middle and thin out at the ragged edge
    const a = rnd() * Math.PI * 2, r = R * Math.pow(rnd(), 0.65);
    const x = size / 2 + Math.cos(a) * r, y = size / 2 + Math.sin(a) * r;
    const len = size * (0.035 + rnd() * 0.045), wid = len * (0.38 + rnd() * 0.2);
    const edge = r / R;
    const light = 34 + rnd() * 36 - edge * 6;
    g.fillStyle = `hsl(${78 + rnd() * 34}, ${26 + rnd() * 26}%, ${light}%)`;
    g.save();
    g.translate(x, y); g.rotate(rnd() * Math.PI * 2);
    g.beginPath(); g.ellipse(0, 0, len, wid, 0, 0, Math.PI * 2); g.fill();
    // a pale midrib on some leaves
    if (rnd() < 0.4) { g.strokeStyle = 'rgba(230,240,200,0.35)'; g.lineWidth = 0.8; g.beginPath(); g.moveTo(-len * 0.8, 0); g.lineTo(len * 0.8, 0); g.stroke(); }
    g.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  t.generateMipmaps = true;
  TEX = t;
  return t;
}

/** n leaf cards scattered through a unit sphere, lit as a soft round mass. */
export function foliageGeometry(n = 32, seed = 1, flat = 1) {
  const rnd = mulberry32(seed);
  const pos = [], nor = [], uv = [], col = [], idx = [];
  const q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), cdir = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    // card centre: mostly near the surface of the crown
    cdir.set(rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1);
    if (cdir.lengthSq() < 1e-4) cdir.set(0, 1, 0);
    cdir.normalize();
    const r = 0.35 + 0.6 * Math.sqrt(rnd());
    const cx = cdir.x * r, cy = cdir.y * r * flat, cz = cdir.z * r;
    const s = 0.55 + rnd() * 0.4;
    e.set(rnd() * Math.PI, rnd() * Math.PI * 2, rnd() * Math.PI);
    q.setFromEuler(e);
    const base = pos.length / 3;
    const corners = [[-1, -1, 0, 0], [1, -1, 1, 0], [1, 1, 1, 1], [-1, 1, 0, 1]];
    for (const [a, b, u, w] of corners) {
      v.set(a * s * 0.5, b * s * 0.5, 0).applyQuaternion(q);
      const px = cx + v.x, py = cy + v.y, pz = cz + v.z;
      pos.push(px, py, pz);
      // outward normals give the cluster a rounded light and shade
      const nn = new THREE.Vector3(px * 0.6 + cdir.x, py * 0.6 + cdir.y, pz * 0.6 + cdir.z).normalize();
      nor.push(nn.x, nn.y, nn.z);
      uv.push(u, w);
      // inner leaves sit in the crown's own shade
      const ao = 0.5 + 0.5 * Math.min(1, Math.hypot(px, py, pz) / 1.05);
      col.push(ao, ao, ao);
    }
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  g.computeBoundingSphere();
  return g;
}

/** Material pair for foliage meshes: the leaf material and the matching shadow-casting depth material. */
export function foliageMaterials() {
  const map = foliageTexture();
  const mat = new THREE.MeshStandardMaterial({ map, vertexColors: true, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.82, metalness: 0 });
  // both faces keep the outward normal, and light coming through the leaves brightens them a little
  mat.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <normal_fragment_begin>', THREE.ShaderChunk.normal_fragment_begin.replace('normal *= faceDirection;', ''))
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\ntotalEmissiveRadiance += diffuseColor.rgb * 0.06;');
  };
  const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map, alphaTest: 0.5 });
  return { mat, depth };
}

/** Number of leaf cards per crown at a graphics quality. */
export function foliageCards(quality, kind = 'crown') {
  const base = quality === 'low' ? 16 : quality === 'medium' ? 26 : 38;
  return kind === 'shrub' ? Math.round(base * 0.7) : kind === 'far' ? Math.round(base * 0.55) : base;
}
