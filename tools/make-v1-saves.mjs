// Writes genuine v1 saves (early, mid-game, finished) for the migration test. Run it against
// the previous release (base game, save format v1), e.g. from a checkout of that commit:
//   node tools/make-v1-saves.mjs tools/fixtures
import { Creek } from '../src/core/creek.js';
import { Game } from '../src/core/game.js';
import { PHYS_DT } from '../src/core/config.js';
import fs from 'fs';
const creek = new Creek();
const run = (g, secs, each) => { const n = Math.round(secs / PHYS_DT); for (let i = 0; i < n; i++) { each && each(g); g.tick(PHYS_DT); g.events.length = 0; } };
const out = process.argv[2];
// early: hand rolling then a press
{ const g = new Game(creek, null, { headless: true });
  run(g, 40, (g2) => { if (g2.manualCD <= 0) g2.manualRoll(); if (g2.cash >= 25) g2.buy('press'); });
  fs.writeFileSync(out + '/early.json', JSON.stringify(g.serialize())); console.log('early', g.cash, [...g.owned], g.phys.balls.length); }
// mid: Shelf open (3 sites), several machines, balls rolling
{ const g = new Game(creek, null, { headless: true });
  g.cash = 5000; for (const id of ['press', 'feeder', 'quickMold', 'lowFriction', 'rootRail', 'premiumFelt']) g.buy(id);
  g.cash = 20000; g.unlock(1); g.unlock(2); if (g.selectStart) g.selectStart(2);
  run(g, 60);
  fs.writeFileSync(out + '/mid.json', JSON.stringify(g.serialize())); console.log('mid', g.cash, g.unlocked, g.sel, [...g.owned].length, g.phys.balls.filter(b=>b.state==='roll').length); }
// finished: all 6 sites, everything bought, gorge selected
{ const g = new Game(creek, null, { headless: true });
  g.cash = 1e8; for (let k = 1; k < 6; k++) g.unlock(k);
  const { UPGRADES } = await import('../src/core/config.js');
  for (let i = 0; i < 4; i++) for (const u of UPGRADES) g.buy(u.id);
  if (g.selectStart) g.selectStart(5); run(g, 40); g.cash = 123456;
  run(g, 100);
  fs.writeFileSync(out + '/finished.json', JSON.stringify(g.serialize())); console.log('finished', g.cash, g.unlocked, g.sel, [...g.owned].length, g.phys.balls.filter(b=>b.state==='roll').length, g.gorgeFinished); }
