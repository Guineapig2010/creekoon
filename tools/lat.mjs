// Lateral position distribution of balls crossing given s values.
import { Creek } from '../src/core/creek.js';
import { Game } from '../src/core/game.js';
import { SITE_INDEX } from '../src/core/config.js';
const creek = new Creek();
const kArg = process.argv[2]; const k = isNaN(+kArg) ? SITE_INDEX[kArg] : +kArg;
const sList = JSON.parse(process.argv[3]); const secs = +(process.argv[4] || 120);
const owned = (process.argv[5] || 'press,feeder,quickMold,lowFriction,twinPress,indexed,spacingSensor').split(',');
const g = new Game(creek, null, { headless: true });
g.sites[k].open = true; g.installChutes(); g.sel = k;
for (const o of owned) { if (['press','feeder','quickMold','lowFriction','twinPress','indexed','spacingSensor'].includes(o)) g.sites[k].owned.add(o); else g.owned.add(o); }
g.owned.add('wideBasket'); g.applyOwned();
const rec = sList.map(() => []);
const seen = new Set();
for (let i = 0; i < secs * 120; i++) {
  g.tick(1 / 120); g.events.length = 0;
  for (const b of g.phys.balls) {
    if (b.state !== 'roll') continue;
    sList.forEach((s, j) => { const key = b.id * 10 + j; if (b.s >= s && !seen.has(key)) { seen.add(key); rec[j].push([b.d - creek.c(s), b.y - creek.y0(s), Math.hypot(b.vx, b.vz)]); } });
  }
}
sList.forEach((s, j) => {
  const ds = rec[j].map((x) => x[0]).sort((a, b) => a - b);
  const q = (p) => ds[Math.floor(p * (ds.length - 1))]?.toFixed(3);
  console.log(`s=${s} n=${ds.length} d-c: min ${q(0)} p10 ${q(0.1)} med ${q(0.5)} p90 ${q(0.9)} max ${q(1)}`);
});
