// Compare each trouble spot with and without its creek upgrade, on a busy line launched from
// the nearest site upstream of the spot.
//   node tools/spots.mjs [spot,spot] [seconds]
import { runLine } from './linestats.mjs';
import { TROUBLE_SPOTS } from '../src/core/game.js';
import { STARTS } from '../src/core/config.js';
const FULL = (process.env.FULL || 'press,feeder,quickMold,lowFriction,hopperExt,twinPress,indexed,servo,bulkHopper,wideBasket,spacingSensor').split(',');
const ALL_FIXES = [...new Set(TROUBLE_SPOTS.map((s) => s.fix).filter(Boolean))];
export const SPOTS = Object.fromEntries(TROUBLE_SPOTS.filter((s) => s.fix).map((s) => {
  const site = STARTS.filter((st) => st.s < s.s0 - 0.5).sort((a, b) => b.s - a.s)[0] || STARTS.slice().sort((a, b) => a.s - b.s)[0];
  return [s.id, { k: site.id, fix: s.fix, sec: [s.s0 - 0.5, s.s1 + 0.5] }];
}));
const which = process.argv[2] ? process.argv[2].split(',') : Object.keys(SPOTS);
const secs = +(process.argv[3] || 240);
for (const name of which) {
  const S = SPOTS[name];
  const out = [];
  for (const withFix of [false, true]) {
    let lostSpot = 0, lostAll = 0, launched = 0, mean = 0, max = 0, n = 0;
    for (const seed of [1, 2]) {
      const base = [...FULL, ...ALL_FIXES.filter((c) => c !== S.fix && !(S.fix === 'willowShield' && c === 'willowFlare'))];
      const r = runLine(S.k, secs, withFix ? [...base, S.fix] : base, seed, [S.sec]);
      launched += r.launched;
      for (const [key, v] of Object.entries(r.losses)) { lostAll += v; if (key.startsWith(name + ':')) lostSpot += v; }
      mean += r.secT[0].mean * r.secT[0].n; n += r.secT[0].n; max = Math.max(max, r.secT[0].max);
    }
    out.push(`${withFix ? 'WITH ' : 'stock'} launched ${launched} lostAtSpot ${lostSpot} (${(lostSpot / launched * 100).toFixed(1)}%) lostAll ${lostAll} section mean ${(mean / n).toFixed(2)}s max ${max.toFixed(1)}s`);
  }
  console.log(`${name.padEnd(12)} (${S.fix} from ${S.k})\n  ` + out.join('\n  '));
}
