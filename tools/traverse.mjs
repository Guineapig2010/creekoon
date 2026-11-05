// First-person traversal check: an autopilot walks the bank from the Old Rolling Grounds
// factory upstream past the waterfall split, through the shallows, up the Shelf climb
// into Crawfish Springs and on to the Farlands entrance, using the real walker
// (terrain, boulders, trunks, structures, deep-water return). Factories keep running.
import './headless-dom.mjs';
import * as THREE from 'three';
import { Creek } from '../src/core/creek.js';
import { Game } from '../src/core/game.js';
import { STARTS, PHYS_DT } from '../src/core/config.js';
import { Player } from '../src/render/player.js';
import { buildRiparian } from '../src/render/riparian.js';
import { makeElement } from './headless-dom.mjs';

export function traverse(creek, log = console.log, quality = 1) {
  const cam = new THREE.PerspectiveCamera(70, 1.6, 0.03, 500);
  const p = new Player(creek, cam, makeElement());
  const rip = buildRiparian(creek, quality);
  p.setTrunks(rip.userData.trunks);
  // stand-in factory footprints at the open sites
  const g = new Game(creek, null, { headless: true });
  g.cash = 1e6;
  for (let k = 1; k <= 5; k++) g.unlock(k);
  for (const k of g.openSites()) { g.sites[k].owned.add('press'); g.sites[k].owned.add('feeder'); }
  g.applyOwned(); g.installChutes();
  p.structures = g.openSites().map((k) => { const st = STARTS[k]; const q = creek.worldXZ(st.s + 0.35, creek.c(st.s) + creek.wR(st.s) + 0.75); return { x: q.x, z: q.z, r: 0.75 }; });
  // route: waypoints in channel coordinates (s, d), upstream along the right bank
  const W = [
    [93.6, 'R+1.5'], [90, 'R+1.2'], [88, 'R+3.5'], [86.5, 'R+4.5'], [85, 'R+4'], [84, 'R+1.4'], [82.5, 'c+0.3'], [81.6, 'L-0.3'], [80.2, 'R+1.3'],
    [79.4, 'a-0.6'], [77.5, 'a-0.8'], [75, 'a-0.4'], [73.2, 'R+0.9'], [71, 'R+1.3'], [68, 'R+1.5'], [66.8, 'R+1.4'], [64, 'R+1.4'], [61, 'R+1.2'], [58, 'c+0.2'], [55, 'R+1.2'], [52.4, 'L-1.4'], [50.4, 'c+0'],
  ];
  const at = ([s, spec]) => {
    const c = creek.c(s);
    const base = spec[0] === 'R' ? c + creek.wR(s) : spec[0] === 'L' ? c - creek.wL(s) : spec[0] === 'a' ? 0 : c;
    return creek.worldXZ(s, base + parseFloat(spec.slice(1)));
  };
  const start = at(W[0]);
  p.placeAt(start.x, start.z, 0);
  const dt = 1 / 30;
  let t = 0, wi = 1, stuckT = 0, falls = 0, waded = 0, lastD = Infinity, climbY0 = null, climbY1 = null;
  const reached = [];
  let made0 = g.stats.made;
  let detours = 0;
  p.onFall = () => { falls++; };
  while (wi < W.length && t < 900) {
    const tgt = at(W[wi]);
    const dx = tgt.x - p.pos.x, dz = tgt.z - p.pos.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 0.6 || (dist < 1.4 && stuckT > 2)) { reached.push([W[wi][0], +t.toFixed(1)]); wi++; stuckT = 0; lastD = Infinity; continue; }
    // steer; when progress stalls, sidestep around the obstacle
    let yaw = Math.atan2(-dx, -dz);
    // local avoidance: take the heading closest to the target whose next metre is walkable
    const free = (a) => { for (const r of [0.35, 0.7, 1.0]) { const x = p.pos.x - Math.sin(a) * r, z = p.pos.z - Math.cos(a) * r; if (p.blocked(p.pos.x, p.pos.z, x, z) || p.waterAt(x, z).depth > 0.5) return false; } return true; };
    if (!free(yaw) || stuckT > 1.2) {
      const side = Math.floor(t / 4) % 2 ? 1 : -1;
      for (const da of [0.4, -0.4, 0.8, -0.8, 1.2, -1.2, 1.6, -1.6, 2.2, -2.2]) if (free(yaw + da * side)) { yaw += da * side; break; }
    }
    p.yaw = yaw;
    p.keys.clear(); p.keys.add('KeyW'); if (dist > 3) p.keys.add('ShiftLeft');
    p.update(dt);
    if (p.waterAt(p.pos.x, p.pos.z).depth > 0.12) waded += dt;
    const L = creek.locate(p.pos.x, p.pos.z, -1, {});
    if (L.s < 81 && climbY0 === null) climbY0 = p.pos.y; // waterfall pool bank
    if (L.s < 58 && climbY1 === null) climbY1 = p.pos.y; // in the Springs
    if (dist > lastD - 0.02 * dt * 30) stuckT += dt; else { stuckT = Math.max(0, stuckT - dt); }
    if (stuckT > 1.2 && Math.abs(stuckT - 1.2) < dt) detours++;
    lastD = Math.min(lastD, dist);
    if (stuckT > 25) break;
    // factories keep producing while the player explores
    for (let i = 0; i < Math.round(dt / PHYS_DT); i++) g.tick(PHYS_DT);
    g.events.length = 0;
    t += dt;
  }
  const ok = wi >= W.length;
  const Lf = creek.locate(p.pos.x, p.pos.z, -1, {});
  const at_ = { s: +Lf.s.toFixed(2), d: +(Lf.d - creek.c(Lf.s)).toFixed(2), y: +p.pos.y.toFixed(2), water: +p.waterAt(p.pos.x, p.pos.z).depth.toFixed(2) };
  return { ok, at: at_, t, reached, stuckAt: ok ? null : W[wi], falls, waded, detours, climb: climbY0 !== null && climbY1 !== null ? climbY1 - climbY0 : null, made: g.stats.made - made0, launched: g.stats.launched, finished: g.stats.finished, trunks: rip.userData.trunks.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = traverse(new Creek());
  console.log(JSON.stringify(r, null, 1));
}
