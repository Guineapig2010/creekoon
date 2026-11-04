import { Creek } from '../src/core/creek.js';
import { Game } from '../src/core/game.js';
const creek = new Creek();
const k = +(process.argv[2] || 0), n = +(process.argv[3] || 10);
const owned = (process.argv[4] || '').split(',').filter(Boolean);
const times = [], losses = {};
for (let i = 0; i < n; i++) {
  if (process.env.ONLY && +process.env.ONLY !== i) continue;
  const g = new Game(creek, null, { headless: true });
  g.launchSeed = 1000 + i;
  g.unlocked = 6; g.sel = k; g.installChute(k);
  for (const o of owned) g.owned.add(o); g.applyOwned();
  g.manualRoll();
  let done = false;
  const trace = [];
  for (let st = 0; st < 120 * 300 && !done; st++) {
    g.tick(1 / 120);
    if ((i === 0 || process.env.ONLY) && st % 60 === 0 && g.phys.balls[0]) { const b = g.phys.balls[0]; trace.push(`${(st/120).toFixed(1)} s=${b.s.toFixed(2)} d=${b.d.toFixed(2)} y=${b.y.toFixed(2)} sub=${b.sub.toFixed(3)} v=${Math.hypot(b.vx,b.vz).toFixed(2)}`); }
    for (const e of g.events) {
      if (e.type === 'finish') { times.push(e.time); done = true; }
      if (e.type === 'lost') { losses[e.reason + '@' + e.spot] = (losses[e.reason + '@' + e.spot] || 0) + 1; done = true; if (process.env.V) { const L = creek.locate(e.x, e.z, -1, {}); console.log('lost seed', i, e.reason, 's', L.s.toFixed(2), 'd', L.d.toFixed(2), 'y', e.y.toFixed(2), 'y0', creek.y0(L.s).toFixed(2)); } }
    }
    g.events.length = 0;
  }
  if ((i === 0 || process.env.ONLY) && process.env.T) console.log(trace.join('\n'));
}
times.sort((a, b) => a - b);
console.log('start', k, 'finished', times.length, '/', n, 'min', times[0]?.toFixed(1), 'med', times[times.length >> 1]?.toFixed(1), 'max', times.at(-1)?.toFixed(1), losses);
