// Launch a few balls from one site on the stock creek (or with fixes) and report run times
// and where any balls were lost.   node tools/runsite.mjs <site> [n] [fixes,comma,list]
import { Creek } from '../src/core/creek.js';
import { Game } from '../src/core/game.js';
import { STARTS, SITE_INDEX, isSiteUpgrade } from '../src/core/config.js';
export function runSite(creek, k, n = 6, fixes = [], seed = 1, gap = 5) {
  const g = new Game(creek, null, { headless: true });
  g.launchSeed = seed;
  for (let j = 0; j <= k; j++) g.sites[j].open = true;
  for (const id of fixes) { if (isSiteUpgrade(id)) g.sites[k].owned.add(id); else g.owned.add(id); }
  g.applyOwned(); g.installChutes();
  const times = [], lost = [];
  let launched = 0;
  const limit = STARTS[k].eta * 3 + n * gap + 60;
  for (let i = 0; i < limit * 120; i++) {
    if (launched < n && g.t > launched * gap && g.sites[k].manualCD <= 0) { g.manualRoll(k); launched++; }
    g.tick(1 / 120);
    for (const e of g.events) {
      if (e.type === 'finish') times.push(e.time);
      if (e.type === 'lost') { const L = creek.locate(e.x, e.z, -1, {}); lost.push(`${e.reason}@${e.spot} s=${L.s.toFixed(1)} d=${(L.d - creek.c(L.s)).toFixed(2)}`); }
    }
    g.events.length = 0;
    if (launched >= n && times.length + lost.length >= n) break;
  }
  const lostDetail = [];
  times.sort((a, b) => a - b);
  return { site: STARTS[k].id, n, finished: times.length, median: times[Math.floor(times.length / 2)], min: times[0], max: times[times.length - 1], lost };
}
if (process.argv[1].endsWith('runsite.mjs')) {
  const creek = new Creek();
  const ks = process.argv[2] === 'all' ? STARTS.map((_, i) => i) : process.argv[2].split(',').map((x) => SITE_INDEX[x] ?? +x);
  for (const k of ks) {
    const r = runSite(creek, k, +(process.argv[3] || 6), (process.argv[4] || '').split(',').filter(Boolean));
    console.log(JSON.stringify(r));
  }
}
