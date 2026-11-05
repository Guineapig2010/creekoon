// Draws the game's creek (both channels, from the simulation geometry) over the creator's map
// marks (data/field_features.geojson) in the same north-up frame. Writes an SVG.
//   node tools/mapcompare.mjs out.svg
import fs from 'fs';
import { Creek } from '../src/core/creek.js';
import { STARTS } from '../src/core/config.js';
import { MAP_SCALE, lonLatToWorld } from '../src/core/layout.js';
import { landmarkPlacements } from '../src/render/expansion.js';
const out = process.argv[2] || 'map-compare.svg';
const cr = new Creek();
const sp = cr.springs;
const fc = JSON.parse(fs.readFileSync(new URL('../data/field_features.geojson', import.meta.url)));
// frame: world x (east) right, world -z (north) up
const pts = [];
for (let i = 0; i < cr.nC; i += 4) pts.push([cr.cx[i], cr.cz[i]]);
let x0 = Math.min(...pts.map((p) => p[0])) - 40, x1 = Math.max(...pts.map((p) => p[0])) + 60;
let z0 = Math.min(...pts.map((p) => p[1])) - 20, z1 = Math.max(...pts.map((p) => p[1])) + 20;
const W = 700, S = W / (x1 - x0), H = Math.round((z1 - z0) * S);
const X = (x) => ((x - x0) * S).toFixed(1), Y = (z) => ((z - z0) * S).toFixed(1);
const path = (arr, close) => 'M' + arr.map(([x, z]) => `${X(x)},${Y(z)}`).join(' L') + (close ? ' Z' : '');
const o = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="system-ui" font-size="11">`, '<rect width="100%" height="100%" fill="#1c2a1e"/>'];
// creator's marks
const col = { springs: '#c0392b', farlands: '#e1b12c', 'shelf-end': '#c0392b', clearing: '#c0392b', 'flat-rocks': '#2e64d8', 'shelf-line': '#b388ff', 'shelf-end-line': '#b388ff' };
for (const f of fc.features) {
  const g = f.geometry, k = f.properties.key;
  const ll = (c) => { const p = lonLatToWorld(c[0], c[1]); return [p.x, p.z]; };
  if (g.type === 'Polygon') o.push(`<path d="${path(g.coordinates[0].map(ll), true)}" fill="${col[k] || '#888'}22" stroke="${col[k] || '#888'}" stroke-width="1.5" stroke-dasharray="5 3"/>`);
  else if (g.type === 'LineString') o.push(`<path d="${path(g.coordinates.map(ll))}" fill="none" stroke="${col[k] || '#888'}" stroke-width="2" stroke-dasharray="5 3"/>`);
  else { const [x, z] = ll(g.coordinates); o.push(`<circle cx="${X(x)}" cy="${Y(z)}" r="3" fill="#fff" opacity="0.7"/>`); }
}
// the game: Shelf terrace on the east bank, water edges, alt branch, Springs stream
const edge = (c, side, off) => { const a = []; for (let i = 0; i < c.nC; i += 4) { const s = c.sMin + i * 0.25; const d = c.c(s) + side * ((side < 0 ? c.wL(s) : c.wR(s)) + off); const p = c.worldXZ(s, d); a.push([p.x, p.z]); } return a; };
const terr = []; for (let i = 0; i < cr.nC; i += 4) { const s = cr.sMin + i * 0.25; if (cr.row(cr.rBankL, s) > 1.2) { const p = cr.worldXZ(s, cr.c(s) - cr.wL(s) - 2.2); terr.push([p.x, p.z]); } else if (terr.length && terr[terr.length - 1] !== null) terr.push(null); }
let seg = []; for (const p of terr) { if (p) seg.push(p); else { if (seg.length > 2) o.push(`<path d="${path(seg)}" fill="none" stroke="#b388ff" stroke-width="7" opacity="0.55"/>`); seg = []; } }
if (seg.length > 2) o.push(`<path d="${path(seg)}" fill="none" stroke="#b388ff" stroke-width="7" opacity="0.55"/>`);
for (const c of [cr, sp]) {
  const L = edge(c, -1, 0.3), R = edge(c, 1, 0.3);
  o.push(`<path d="${path([...L, ...R.reverse()], true)}" fill="#5fb4e6" stroke="#5fb4e6" stroke-width="2"/>`);
}
{ const a = []; for (let s = cr.alt.s0; s <= cr.alt.s1; s += 0.5) { const p = cr.worldXZ(s, cr.altD(s)); a.push([p.x, p.z]); } o.push(`<path d="${path(a)}" fill="none" stroke="#2e9be0" stroke-width="3"/>`); }
{ const g = cr.gully; const a = cr.worldXZ(g.sA, g.dA), b = cr.worldXZ(g.sB, g.dB); o.push(`<path d="M${X(a.x)},${Y(a.z)} L${X(b.x)},${Y(b.z)}" stroke="#5fb4e6" stroke-width="3"/>`); }
// game sites and landmarks
STARTS.forEach((st) => {
  const c = st.cr ? sp : cr, s = c.siteS(st), p = c.worldXZ(s, c.c(s));
  o.push(`<rect x="${+X(p.x) - 4}" y="${+Y(p.z) - 4}" width="8" height="8" fill="#d9ec43" stroke="#000"/><text x="${+X(p.x) - 8}" y="${+Y(p.z) + 4}" text-anchor="end" fill="#fff" font-weight="700" paint-order="stroke" stroke="#000" stroke-width="3">${st.name}</text>`);
});
for (const L of landmarkPlacements(cr)) {
  if (L.unmapped || L.x === undefined) continue;
  o.push(`<path d="M${X(L.x)},${+Y(L.z) - 5} l5,5 l-5,5 l-5,-5z" fill="#f2c230" stroke="#000"/><text x="${+X(L.x) + 8}" y="${+Y(L.z) + 4}" fill="#f8e8b0" paint-order="stroke" stroke="#000" stroke-width="3">${L.name}</text>`);
}
o.push(`<text x="${W - 30}" y="24" fill="#d9ec43" font-size="18" font-weight="900">N↑</text>`);
o.push(`<line x1="16" y1="${H - 16}" x2="${16 + 50 * S}" y2="${H - 16}" stroke="#fff" stroke-width="3"/><text x="16" y="${H - 24}" fill="#fff">50 m in game (100 m real, scale ${MAP_SCALE})</text>`);
o.push(`<text x="16" y="20" fill="#fff" font-weight="700">Game creek (solid) over the creator’s marks (dashed)</text>`);
o.push('</svg>');
fs.writeFileSync(out, o.join('\n'));
console.log(out, W, H);
