// Compare each trouble spot with and without its creek upgrade.
import { runLine } from './linestats.mjs';
const FULL = (process.env.FULL || 'press,feeder,quickMold,lowFriction,hopperExt,twinPress,indexed,servo,bulkHopper,wideBasket,spacingSensor').split(',');
const CREEK = ['rootRail', 'gravelMat', 'splashGuard', 'poolGuide', 'catchRamp', 'debrisScreen', 'spillRail', 'alderBypass', 'landingBoards'];
export const SPOTS = {
  root: { k: 0, fix: 'rootRail', sec: [92.6, 94.5] },
  gravel: { k: 0, fix: 'gravelMat', sec: [94.3, 96.8] },
  lip: { k: 1, fix: 'splashGuard', sec: [84.5, 89] },
  pool: { k: 1, fix: 'poolGuide', sec: [86, 90.5] },
  catch: { k: 2, fix: 'catchRamp', sec: [77, 80.5] },
  springs: { k: 3, fix: 'debrisScreen', sec: [54.5, 62.3] },
  spillway: { k: 3, fix: 'spillRail', sec: [62.3, 67.5] },
  island: { k: 4, fix: 'alderBypass', sec: [44, 50.8] },
  gorgeStep: { k: 5, fix: 'landingBoards', sec: [8.5, 11.5] },
  arm: { k: 5, fix: 'clearingArm', sec: [59, 63] },
};
const which = process.argv[2] ? process.argv[2].split(',') : Object.keys(SPOTS);
const secs = +(process.argv[3] || 240);
for (const name of which) {
  const S = SPOTS[name];
  const out = [];
  for (const withFix of [false, true]) {
    let lostSpot = 0, lostAll = 0, launched = 0, mean = 0, max = 0, n = 0;
    for (const seed of [1, 2]) {
      const base = [...FULL, ...CREEK.filter((c) => c !== S.fix)];
      const r = runLine(S.k, secs, withFix ? [...base, S.fix] : base, seed, [S.sec]);
      launched += r.launched;
      for (const [key, v] of Object.entries(r.losses)) { lostAll += v; if (key.startsWith(name + ':') || (name === 'arm' && (key.startsWith('springs') || key.startsWith('spillway')))) lostSpot += v; }
      mean += r.secT[0].mean * r.secT[0].n; n += r.secT[0].n; max = Math.max(max, r.secT[0].max);
    }
    out.push(`${withFix ? 'WITH ' : 'stock'} launched ${launched} lostAtSpot ${lostSpot} (${(lostSpot / launched * 100).toFixed(1)}%) lostAll ${lostAll} section mean ${(mean / n).toFixed(2)}s max ${max.toFixed(1)}s`);
  }
  console.log(name.padEnd(10), '\n  ' + out.join('\n  '));
}
