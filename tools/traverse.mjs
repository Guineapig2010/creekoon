// First-person traversal check with the real walker (terrain, boulders, trunks, structures,
// deep-water return), headless. Two walks on the map-true creek:
//   1. the main creek, from the Trail Entrance factory up the west bank, round the
//      falls and the Shelf drop, past Flat Rocks and the Clearing, into the Farlands to the creek head;
//   2. the Shelf climb: from the creek's east bank by photo pin A up into the Crawfish
//      Springs stream corridor and on to the double ponds.
// Factories keep running throughout.
import './headless-dom.mjs';
import * as THREE from 'three';
import { Creek } from '../src/core/creek.js';
import { Game } from '../src/core/game.js';
import { STARTS, PHYS_DT } from '../src/core/config.js';
import { Player } from '../src/render/player.js';
import { buildRiparian } from '../src/render/riparian.js';
import { makeElement } from './headless-dom.mjs';

function setup(creek, quality) {
  const cam = new THREE.PerspectiveCamera(70, 1.6, 0.03, 500);
  const p = new Player(creek, cam, makeElement());
  const rips = [buildRiparian(creek, quality), buildRiparian(creek.springs, quality, creek)];
  p.setTrunks(rips.flatMap((r) => r.userData.trunks));
  const g = new Game(creek, null, { headless: true });
  g.cash = 1e7;
  for (let k = 1; k <= 6; k++) g.unlock(k);
  for (const k of g.openSites()) { g.sites[k].owned.add('press'); g.sites[k].owned.add('feeder'); }
  g.applyOwned(); g.installChutes();
  // factory footprints at the open sites (as the renderer places them)
  p.structures = g.openSites().map((k) => {
    const cr = g.creekFor(k), pad = cr.padByK[k];
    const q = cr.worldXZ(pad.sC, pad.dC);
    return { x: q.x, z: q.z, r: 0.75 };
  });
  return { p, g, trunks: p.trunkGrid ? rips.reduce((a, r) => a + r.userData.trunks.length, 0) : 0 };
}

/** Walk a list of world-space waypoints with simple local avoidance. */
function walk(p, g, wps, creek, maxT) {
  const dt = 1 / 30;
  let t = 0, wi = 1, stuckT = 0, falls = 0, waded = 0, lastD = Infinity, detours = 0;
  let escape = 0, escYaw = 0, bestDist = Infinity, lastProgress = 0;
  let seed = 99; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const reached = [];
  const made0 = g.stats.made;
  p.onFall = () => { falls++; };
  // start on clear ground (a riparian trunk may stand on the nominal start point)
  let sx = wps[0].x, sz = wps[0].z;
  for (let r = 0; r < 2 && p.blocked(wps[0].x, wps[0].z, sx, sz); r += 0.1) {
    for (let k = 0; k < 12; k++) { const a = k * Math.PI / 6, x = wps[0].x + Math.cos(a) * r, z = wps[0].z + Math.sin(a) * r; if (!p.blocked(x, z, x, z)) { sx = x; sz = z; break; } }
    if (!p.blocked(wps[0].x, wps[0].z, sx, sz)) break;
  }
  p.placeAt(sx, sz, 0);
  const ys = [];
  while (wi < wps.length && t < maxT) {
    const tgt = wps[wi];
    const dx = tgt.x - p.pos.x, dz = tgt.z - p.pos.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 1.0 || (dist < 2.0 && stuckT > 2)) { reached.push(tgt.label); wi++; stuckT = 0; lastD = Infinity; bestDist = Infinity; lastProgress = t; continue; }
    let yaw = Math.atan2(-dx, -dz);
    const free = (a) => {
      for (const r of [0.35, 0.7, 1.0]) {
        const x = p.pos.x - Math.sin(a) * r, z = p.pos.z - Math.cos(a) * r;
        if (p.blocked(p.pos.x, p.pos.z, x, z) || p.waterAt(x, z).depth > 0.5) return false;
      }
      return true;
    };
    if (escape > 0) { escape -= dt; yaw = escYaw; }
    else if (stuckT > 4) {
      // boxed in by trunks and rocks: take a random clear heading for a moment
      for (let k = 0; k < 16; k++) { const a = yaw + (rnd() - 0.5) * 5; if (free(a)) { escYaw = a; escape = 1.2; detours++; break; } }
      stuckT = 1.5;
    } else if (!free(yaw) || stuckT > 1.2) {
      const side = Math.floor(t / 4) % 2 ? 1 : -1;
      for (const da of [0.4, -0.4, 0.8, -0.8, 1.2, -1.2, 1.6, -1.6, 2.2, -2.2]) if (free(yaw + da * side)) { yaw += da * side; break; }
    }
    p.yaw = yaw;
    p.keys.clear(); p.keys.add('KeyW'); if (dist > 3) p.keys.add('ShiftLeft');
    p.update(dt);
    if (p.waterAt(p.pos.x, p.pos.z).depth > 0.12) waded += dt;
    ys.push(p.pos.y);
    if (dist > lastD - 0.02 * dt * 30) stuckT += dt; else stuckT = Math.max(0, stuckT - dt);
    lastD = Math.min(lastD, dist);
    if (t - lastProgress > 40) break;
    if (dist < bestDist - 0.3) { bestDist = dist; lastProgress = t; }
    for (let i = 0; i < Math.round(dt / PHYS_DT); i++) g.tick(PHYS_DT);
    g.events.length = 0;
    t += dt;
  }
  const C = p.channelAt(p.pos.x, p.pos.z);
  return {
    ok: wi >= wps.length, t, reached: reached.length, of: wps.length - 1, stuckAt: wi < wps.length ? wps[wi].label : null,
    at: { ch: C.cr.kind, s: +C.L.s.toFixed(1), d: +(C.L.d - C.cr.c(C.L.s)).toFixed(2) },
    falls, waded, detours, made: g.stats.made - made0, climb: ys.length ? Math.max(...ys) - ys[0] : 0,
  };
}

export function traverse(creek, log = console.log, quality = 1) {
  const { p, g } = setup(creek, quality);
  const sp = creek.springs;
  const W = (cr, s, dRel, label = '') => { const q = cr.worldXZ(s, cr.c(s) + dRel); return { x: q.x, z: q.z, label: label || `${cr.kind}@${s.toFixed(0)}` }; };
  // 1. main creek, upstream along the west bank (d > 0); wide of the drops and of each factory pad
  const steps = creek.STEPS.map((x) => x.s);
  const sites = STARTS.map((st) => creek.siteS(st)).filter((x) => x !== null);
  const main = [];
  for (let s = 548.0; s >= 34; s -= 7) {
    let off = creek.wR(s) + 1.5;
    if (steps.some((x) => Math.abs(s - x) < 7)) off = creek.wR(s) + 5;
    else if (sites.some((x) => s > x - 3 && s < x + 3) || Math.abs(s - 555) < 4) off = creek.wR(s) + 3.4;
    main.push(W(creek, s, off));
  }
  main.push(W(creek, 33.5, creek.wR(33.5) + 1.5, 'Farlands entrance'));
  for (let s = 27; s >= 5; s -= 7) main.push(W(creek, s, creek.wR(s) + 1.5));
  main.push(W(creek, 2.5, creek.wR(2.5) + 1.5, 'head of the creek in the Farlands'));
  const r1 = walk(p, g, main, creek, 900);
  // 2. the Shelf climb into Crawfish Springs: up the east bank by pin A, then along the stream
  const climb = [W(creek, 514, -(creek.wL(514) + 1.2), 'east bank at pin A'), W(creek, 505, -(creek.wL(505) + 2.5), 'brushy opening')];
  for (let s = sp.sMax - 4; s >= 62; s -= 6) climb.push(W(sp, s, -(sp.wL(s) + 1.4)));
  climb.push(W(sp, 58.5, -(sp.wL(58.5) + 1.2), 'spring pool'), W(sp, 57.5, sp.c(57.5) + 2.9 - sp.c(57.5), 'double ponds'));
  const yBefore = p.pos.y;
  const r2 = walk(p, g, climb, creek, 600);
  void log;
  return { main: r1, springs: r2, rise: p.pos.y - yBefore, made: g.stats.made, launched: g.stats.launched, finished: g.stats.finished };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = traverse(new Creek());
  console.log(JSON.stringify(r, null, 1));
}
