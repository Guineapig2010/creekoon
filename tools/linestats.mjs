// Run a full production line headless and report per-spot losses and section times.
// usage: node tools/linestats.mjs <start> <seconds> <owned,comma,list> [seed]
import { Creek } from '../src/core/creek.js';
import { Game } from '../src/core/game.js';
const creek = new Creek();
export function runLine(k, secs, owned, seed = 1, sections = [], opts = {}) {
  const g = new Game(creek, null, { headless: true });
  g.launchSeed = seed;
  g.unlocked = 6; g.sel = k; g.installChute(k);
  for (const o of owned) g.owned.add(o);
  g.applyOwned();
  g.cash = 0;
  const secT = sections.map(() => ({ sum: 0, n: 0, max: 0 }));
  const enter = new Map();
  const losses = {};
  let hits = 0, splashes = 0, bumps = 0, finished = 0, paid = 0;
  const steps = Math.round(secs * 120);
  let maxRolling = 0;
  const t0 = Date.now();
  for (let i = 0; i < steps; i++) {
    if (!g.owned.has('feeder') && g.manualCD <= 0) g.manualRoll();
    g.tick(1 / 120);
    for (const e of g.events) {
      if (e.type === 'lost') losses[e.spot + ':' + e.reason] = (losses[e.spot + ':' + e.reason] || 0) + 1;
      if (e.type === 'finish') { finished++; paid += e.amount; }
      if (e.type === 'hit') hits++;
      if (e.type === 'splash') splashes++;
      if (e.type === 'bump') bumps++;
    }
    g.events.length = 0;
    if (i % 12 === 0) {
      let r = 0;
      for (const b of g.phys.balls) {
        if (b.state !== 'roll') continue;
        r++;
        sections.forEach(([a, z], j) => {
          const key = b.id * 16 + j;
          if (b.s >= a && b.s < z && !enter.has(key)) enter.set(key, g.t);
          if (b.s >= z && enter.has(key) && enter.get(key) >= 0) { const dt = g.t - enter.get(key); secT[j].sum += dt; secT[j].n++; secT[j].max = Math.max(secT[j].max, dt); enter.set(key, -1); }
        });
      }
      maxRolling = Math.max(maxRolling, r);
    }
  }
  return { g, losses, finished, paid, hits, splashes, bumps, maxRolling, launched: g.stats.launched, secT: secT.map((x) => ({ mean: x.n ? x.sum / x.n : 0, max: x.max, n: x.n })), ms: Date.now() - t0 };
}
if (process.argv[1].endsWith('linestats.mjs')) {
  const k = +process.argv[2], secs = +process.argv[3];
  const owned = (process.argv[4] || '').split(',').filter(Boolean);
  const r = runLine(k, secs, owned, +(process.argv[5] || 1), JSON.parse(process.argv[6] || '[]'));
  const lost = Object.values(r.losses).reduce((a, b) => a + b, 0);
  console.log(JSON.stringify({ launched: r.launched, finished: r.finished, lost, losses: r.losses, paid: r.paid, cpm: (r.paid / secs * 60) | 0, maxRolling: r.maxRolling, sec: r.secT.map((x) => `${x.mean.toFixed(2)}/${x.max.toFixed(1)}(${x.n})`), ms: r.ms }));
}
