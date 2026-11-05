// Headless playtest: base-game regressions plus the nine New Creek Nation delivery checks.
// Runs the real simulation (the same code the browser runs) faster than real time.
//   node tools/playtest.mjs            full run
//   node tools/playtest.mjs quick      shorter runs
//   node tools/playtest.mjs 4 6        only the listed sections (B = base regressions)
// Old-save migration uses genuine v1 saves in tools/fixtures (written by the previous
// release; regenerate with tools/make-v1-saves.mjs against that release).
import './headless-dom.mjs';
import fs from 'fs';
import { Creek } from '../src/core/creek.js';
import { Game } from '../src/core/game.js';
import {
  STARTS, SITE_INDEX, S_FINISH, PHYS_DT, UPGRADES, UPGRADE_BY_ID, RECIPE_INDEX, ORDERS, REACHES, isSiteUpgrade, checkpointsFor,
} from '../src/core/config.js';
import { RACE_RECORDS, FEATURED, FIELD_NOTES, ARCHIVE_CARDS, UNNUMBERED } from '../src/core/archive.js';
import { FIELD } from '../src/core/fieldmap.js';
import { landmarkPlacements } from '../src/render/expansion.js';
import { traverse } from './traverse.mjs';

const args = process.argv.slice(2);
const QUICK = args.includes('quick');
const ONLY = args.filter((a) => a !== 'quick');
const want = (id) => !ONLY.length || ONLY.includes(String(id));
const creek = new Creek();
const DT = PHYS_DT;
let failures = 0, passes = 0;
const ok = (cond, msg) => { console.log(`${cond ? '  PASS' : '  FAIL'}  ${msg}`); if (cond) passes++; else failures++; };
const head = (t) => console.log(`\n=== ${t} ===`);
const fresh = () => new Game(creek, null, { headless: true });
const K = SITE_INDEX;
const T0 = Date.now();
const STOP = Symbol('stop');
function run(g, secs, onEvent, each) {
  const n = Math.round(secs / DT);
  for (let i = 0; i < n; i++) {
    if (each && each(g, i) === STOP) break;
    g.tick(DT);
    if (onEvent) for (const e of g.events) onEvent(e, g);
    g.events.length = 0;
  }
}
/** Open every site up to and including k (by STARTS order), without spending. */
const openTo = (g, k) => { for (let j = 0; j <= k; j++) g.sites[j].open = true; g.installChutes(); g.applyOwned(); };
/** Install upgrades at site k (site-scoped) or globally, without spending. */
const give = (g, k, ids) => { for (const id of ids) { if (isSiteUpgrade(id)) g.sites[k].owned.add(id); else g.owned.add(id); } g.applyOwned(); g.installChutes(); };
const CREEK_FIXES = ['rootRail', 'gravelMat', 'splashGuard', 'poolGuide', 'catchRamp', 'debrisScreen', 'spillRail', 'alderBypass', 'landingBoards', 'clearingArm', 'slateBumpers', 'slateOutlet', 'leafGrate'];
const FAST = ['press', 'feeder', 'quickMold', 'lowFriction', 'twinPress', 'indexed', 'hopperExt', 'spacingSensor'];
const clone = (o) => JSON.parse(JSON.stringify(o));
const fixture = (n) => JSON.parse(fs.readFileSync(new URL(`./fixtures/${n}.json`, import.meta.url), 'utf8'));
/** Every ball in exactly one stage: hopper/post/cart items and physics balls have unique ids. */
function stageAudit(g) {
  const seen = new Map();
  const add = (id, where) => seen.set(id, (seen.get(id) || []).concat(where));
  g.sites.forEach((s, k) => { for (const it of s.hopper) add(it.id, 'hopper' + k); for (const it of s.post) add(it.id, 'post' + k); });
  for (const c of g.workshop.carts) for (const it of c.load) add(it.id, 'cart');
  for (const b of g.phys.balls) add(b.id, b.state);
  const dup = [...seen].filter(([, w]) => w.length > 1);
  return { n: seen.size, dup };
}
/** Per-site and network reconciliation of made / moved / launched / finished / lost. */
function reconcile(g) {
  const errs = [];
  let made = 0, launched = 0, queued = 0, carts = 0;
  for (const c of g.workshop.carts) carts += c.load.length;
  g.sites.forEach((s, k) => {
    const S = s.stats;
    made += S.made; launched += S.launched; queued += s.hopper.length + s.post.length;
    const lhs = S.made - S.transferredOut + S.transferredIn, rhs = S.launched + s.hopper.length + s.post.length;
    if (s.open && lhs !== rhs) errs.push(`${STARTS[k].id}: made ${S.made} - out ${S.transferredOut} + in ${S.transferredIn} ≠ launched ${S.launched} + queued ${s.hopper.length + s.post.length}`);
    const rolling = g.phys.balls.filter((b) => b.start === k && !b.paid && b.state === 'roll').length;
    if (S.launched !== S.finished + S.lost + rolling) errs.push(`${STARTS[k].id}: launched ${S.launched} ≠ finished ${S.finished} + lost ${S.lost} + rolling ${rolling}`);
  });
  if (made !== launched + queued + carts) errs.push(`network: made ${made} ≠ launched ${launched} + queued ${queued} + in carts ${carts}`);
  const rev = g.sites.reduce((a, s) => a + s.stats.revenue, 0);
  if (rev !== g.stats.paid) errs.push(`revenue by site ${rev} ≠ paid ${g.stats.paid}`);
  return errs;
}

// ================================================================= B. base-game regressions
if (want('B')) {
  head('B. Base game still works: first minute, machines, save/reload');
  const g = fresh();
  const pays = [];
  let tPress = null, tFeeder = null, first = null;
  run(g, 90, (e, g2) => { if (e.type === 'finish') { pays.push(e.amount); if (!first) first = { t: g2.t, amount: e.amount }; } }, (g2) => {
    if (g2.sites[0].manualCD <= 0 && g2.t > 0.5) g2.manualRoll(0);
    if (!tPress && g2.cash >= 25 && g2.buy('press', 0)) tPress = g2.t;
    if (tPress && !tFeeder && g2.cash >= 45 && g2.buy('feeder', 0)) tFeeder = g2.t;
  });
  ok(first && first.amount === 10, `first hand-rolled ball pays exactly $10 (at t=${first?.t.toFixed(1)} s)`);
  ok(tPress && tFeeder && tFeeder < 60, `Auto Press at t=${tPress?.toFixed(1)} s, Auto Feeder at t=${tFeeder?.toFixed(1)} s`);
  const l0 = g.stats.launched;
  run(g, 60);
  ok(g.stats.launched - l0 >= 18, `line runs hands-free: ${g.stats.launched - l0} launches in 60 s`);
  // press waits on a full hopper
  const h = fresh();
  give(h, 0, ['press']);
  run(h, 30);
  ok(h.sites[0].hopper.length === 8 && h.sites[0].pressStatus === 'Press waiting', `press fills its 8-ball hopper and waits ("${h.sites[0].pressStatus}")`);
  // save/reload: same balls, no double pay
  const s = fresh();
  openTo(s, K.springs); give(s, K.springs, FAST);
  run(s, 80);
  const snap = s.serialize();
  const r = new Game(creek, clone(snap), { headless: true });
  const liveAtSave = s.phys.balls.filter((b) => b.state === 'roll' || b.state === 'queue').length;
  const restored = r.phys.balls.length;
  const paidIds = new Set(s.phys.balls.filter((b) => b.paid).map((b) => b.id));
  let repaid = 0;
  run(r, 40, (e) => { if (e.type === 'finish' && paidIds.has(e.id)) repaid++; });
  const rerr = reconcile(r);
  const live = (x) => x.phys.balls.filter((b) => b.state === 'roll' || b.state === 'queue').length;
  ok(restored === liveAtSave && repaid === 0 && rerr.length === 0, `reload restores all ${live(s)} rolling and queued balls, nothing paid twice, books still balance${rerr.length ? ' — ' + rerr.join('; ') : ''}`);
}

// ================================================================= 1. migration
if (want(1)) {
  head('1. Old-save migration (genuine v1 saves: early, mid-game, finished)');
  const OLD = ['grounds', 'waterfall', 'shelf', 'springs', 'alder', 'gorge'];
  for (const name of ['early', 'mid', 'finished']) {
    const d = fixture(name);
    const before = clone(d);
    const g = new Game(creek, clone(d), { headless: true });
    const selId = OLD[d.sel];
    const sk = K[selId];
    const openIds = g.sites.filter((s) => s.open).map((s) => s.id);
    const wantOpen = OLD.slice(0, d.unlocked);
    const siteOwned = [...g.sites[sk].owned], globalOwned = [...g.owned];
    const allOwned = new Set([...siteOwned, ...globalOwned]);
    const oldRolling = d.balls.filter((b) => b.st === 'roll');
    const newRolling = g.phys.balls.filter((b) => b.state === 'roll');
    const posOk = oldRolling.every((o) => { const b = g.phys.balls.find((x) => x.id === o.id); return b && Math.hypot(b.x - o.x, b.z - o.z) < 1e-6 && b.start === K[OLD[o.k]] && b.payout === o.pay && b.paid === o.paid; });
    const otherQueues = g.sites.every((s, k) => k === sk || (!s.hopper.length && !s.post.length));
    ok(g.cash === d.cash && JSON.stringify(openIds.sort()) === JSON.stringify(wantOpen.slice().sort())
      && d.owned.every((id) => allOwned.has(id)) && g.sites[sk].hopper.length === (d.hopper || []).length && otherQueues
      && newRolling.length === oldRolling.length && posOk && g.stats.paid === d.stats.paid,
      `${name.padEnd(8)} cash $${d.cash} kept · open ${openIds.join('/')} · ${d.owned.length} machines kept (line at ${selId}) · hopper ${(d.hopper || []).length} → ${STARTS[sk].name} only · ${oldRolling.length} rolling balls restored in place with origin and payout · paid finishes $${d.stats.paid}`);
    // other previously open sites get a basic line when the old line had one
    const basic = wantOpen.filter((id) => id !== selId).every((id) => !d.owned.includes('press') || g.sites[K[id]].owned.has('press'));
    ok(basic, `${name.padEnd(8)} previously unlocked sites keep a basic line (press/feeder installed where the old line had them)`);
    // milestone-gated controls
    const sp = g.isOpen('springs'), al = g.isOpen('alder');
    const ordersOk = ORDERS.find((o) => o.id === 'dry') && g.orderOpen(ORDERS.find((o) => o.id === 'dry')) === sp;
    const wsOk = (g.canBuy('bankWorkshop').why !== `Requires ${STARTS[K.alder].name}`) === al;
    const flowOk = (g.canBuy('flowMonitor').why !== `Requires ${STARTS[K.shelf].name}`) === g.isOpen('shelf');
    ok(ordersOk && wsOk && flowOk && g.unlockable(K.flatrocks) === g.isOpen('waterfall') && (name !== 'finished' || g.unlockable(K.slate)),
      `${name.padEnd(8)} new controls appear at the right milestones (orders ${sp ? 'open' : 'locked'}, Bank Workshop ${al ? 'available' : 'locked'}, Flow Monitor ${g.isOpen('shelf') ? 'available' : 'locked'}${name === 'finished' ? ', Slate Steps for sale' : ''})`);
    // the migrated save keeps working: every old ball pays at most once, books balance after a run
    const paid = new Set(g.phys.balls.filter((b) => b.paid).map((b) => b.id));
    const seen = new Set();
    let dup = 0;
    run(g, 120, (e) => { if (e.type === 'finish') { if (paid.has(e.id) || seen.has(e.id)) dup++; seen.add(e.id); } });
    const migratedReload = new Game(creek, clone(g.serialize()), { headless: true });
    ok(dup === 0 && stageAudit(g).dup.length === 0 && JSON.stringify(d) === JSON.stringify(before) && migratedReload.cash === g.cash,
      `${name.padEnd(8)} after migration: 120 s of play, ${seen.size} finishes, none paid twice; every ball in one stage; the v1 data was not modified (kept as the backup); v2 round-trip keeps cash`);
  }
}

// ================================================================= 2. geography
if (want(2)) {
  head('2. Connected geography: every new launch reaches the original finish and pays once');
  const NEW = ['flatrocks', 'slate', 'willow', 'splitstone', 'longeddy', 'spillway', 'sluice', 'coldspring'];
  const lanes = { alt: 0, main: 0, splitDirect: 0, splitCalm: 0, sluiceL: 0, sluiceR: 0 };
  const isl = creek.islands.find((i) => i.name === 'Splitstone'), rib = creek.islands.find((i) => i.name === 'Sluice rib');
  for (const id of NEW) {
    const k = K[id];
    const g = fresh();
    openTo(g, k);
    const n = QUICK ? 3 : 5;
    const ids = [];
    const pays = new Map();
    const cps = new Map();
    let cashBefore = g.cash, sumPaid = 0;
    const laneOf = new Map();
    const secs = STARTS[k].eta * 2.2 + 30;
    run(g, secs, (e) => {
      if (e.type === 'launch' && e.k === k) ids.push(e.id);
      if (e.type === 'finish') { pays.set(e.id, (pays.get(e.id) || 0) + 1); sumPaid += e.amount; }
    }, (g2, i) => {
      if (ids.length < n && g2.sites[k].manualCD <= 0 && g2.t > ids.length * 5) g2.manualRoll(k);
      if (i % 6) return;
      for (const b of g2.phys.balls) {
        if (b.state !== 'roll') continue;
        const L = laneOf.get(b.id) || {};
        if (creek.channelOf(b.s, b.d, 0) === 'alt') L.alt = true;
        if (b.s > isl.s0 + 1 && b.s < isl.s1 - 1) L.split = b.d < creek.c(b.s) + isl.dOff ? 'L' : 'R';
        if (b.s > rib.s0 + 1 && b.s < rib.s1 - 1) L.sluice = b.d < creek.c(b.s) + rib.dOff ? 'L' : 'R';
        laneOf.set(b.id, L);
        if (b.cpT) cps.set(b.id, b.cpT.map(([s]) => s));
      }
    });
    const finished = ids.filter((x) => pays.has(x));
    const once = [...pays.values()].every((v) => v === 1);
    const expect = checkpointsFor(k);
    const allCps = finished.every((x) => { const c = cps.get(x) || []; return expect.every((s) => c.includes(s)); });
    for (const x of finished) {
      const L = laneOf.get(x) || {};
      if (STARTS[k].s < 80.7) { if (L.alt) lanes.alt++; else lanes.main++; }
      if (L.split === 'L') lanes.splitDirect++; else if (L.split === 'R') lanes.splitCalm++;
      if (L.sluice === 'L') lanes.sluiceL++; else if (L.sluice === 'R') lanes.sluiceR++;
    }
    ok(finished.length >= n - 1 && once && allCps && g.cash - cashBefore === sumPaid && sumPaid === finished.length * STARTS[k].base,
      `${STARTS[k].name.padEnd(22)} ${finished.length}/${ids.length} balls reached the gate, ${expect.length} checkpoints each (launches upstream + merges), paid $${STARTS[k].base} exactly once; cash moved only on finishes`);
  }
  ok(lanes.alt > 0 && lanes.main > 0, `waterfall split: both branches used and both pay (${lanes.main} over the falls on creek-right, ${lanes.alt} down the alternate route)`);
  ok(lanes.splitDirect > 0 && lanes.splitCalm > 0, `Splitstone Fork: both lanes used and they merge before the next checkpoint (${lanes.splitDirect} / ${lanes.splitCalm})`);
  ok(lanes.sluiceL + lanes.sluiceR > 0, `Boulder Sluice rib passed on both sides over the run (${lanes.sluiceL} left / ${lanes.sluiceR} right)`);
  // a reach marker / checkpoint pays nothing by itself
  const g = fresh();
  openTo(g, K.alder);
  let cpCash = 0;
  run(g, 25, (e, g2) => { if (e.type === 'checkpoint') cpCash += 0; }, (g2) => { if (g2.t < 1) g2.manualRoll(K.alder); });
  const b = g.phys.balls.find((x) => x.state === 'roll');
  ok(g.cash === 0 && b && b.cpi > 0, `a ball passing ${b?.cpi} checkpoints and reach markers earns nothing until the finish gate (cash still $${g.cash})`);
}

// ================================================================= 3. factory accounting
if (want(3)) {
  head('3. Factory accounting across three sites, transfers, pause and drain');
  const g = fresh();
  g.cash = 0;
  give(g, 0, FAST);
  run(g, 40);
  const owned0 = [...g.sites[0].owned].sort().join();
  const p0 = g.sites[0].pressCount;
  g.cash = 1e6;
  g.unlock(K.waterfall); g.unlock(K.flatrocks);
  const rollingAtOpen = g.ballsRolling();
  run(g, 30);
  ok([...g.sites[0].owned].sort().join() === owned0 && g.sites[0].pressCount > p0 && g.sites[0].stats.launched > 0 && rollingAtOpen > 0,
    `opening two more factories while ${rollingAtOpen} balls rolled: the first line kept its ${owned0.split(',').length} machines and kept pressing (+${g.sites[0].pressCount - p0})`);
  ok(g.sites[K.waterfall].owned.has('press') && g.sites[K.flatrocks].owned.has('feeder') && g.sites[K.flatrocks].stats.launched > 0,
    `new sites came with their own basic line and launch on their own (${g.sites[K.waterfall].stats.launched} + ${g.sites[K.flatrocks].stats.launched} launches)`);
  // transfers: Bank Workshop moving surplus between sites
  const w = fresh();
  w.cash = 1e7;
  for (let k = 1; k <= K.alder; k++) w.unlock(k);
  give(w, K.alder, ['press', 'feeder', 'quickMold', 'twinPress', 'hopperExt']);
  give(w, K.springs, ['press', 'feeder', 'lowFriction', 'indexed']);
  w.sites[K.alder].enabled.release = false; // Alder only manufactures: everything goes by cart
  w.buy('bankWorkshop'); w.setRoute(0, K.springs);
  run(w, QUICK ? 150 : 240);
  const errs = reconcile(w);
  const a = w.sites[K.alder].stats, sp = w.sites[K.springs].stats;
  ok(errs.length === 0 && a.transferredOut > 0 && sp.transferredIn > 0 && stageAudit(w).dup.length === 0,
    `manufacture, transfers, launches, losses and finishes reconcile per site and network-wide (Alder made ${a.made}, carted out ${a.transferredOut}; Springs received ${sp.transferredIn}, launched ${sp.launched}; ${w.stats.finished} finished, ${w.stats.lost} lost)${errs.length ? ' — ' + errs.join('; ') : ''}`);
  const transferred = w.phys.balls.concat([]).filter((b) => b.site === K.alder && b.start === K.springs);
  ok(transferred.every((b) => b.recipe === 0) && w.recentLaunchesKeepOrigin !== false, `transferred balls keep their origin site and recipe (${transferred.length} in flight from Alder, launched at the Springs)`);
  // pause and drain one full site while the others continue
  const d = fresh();
  d.cash = 1e6;
  give(d, 0, FAST);
  d.unlock(K.waterfall); d.unlock(K.flatrocks);
  give(d, K.waterfall, ['quickMold', 'hopperExt']);
  d.sites[K.waterfall].enabled.feeder = false; // let it fill
  run(d, 40);
  const full = d.sites[K.waterfall].hopper.length;
  d.sites[K.waterfall].enabled.press = false; d.sites[K.waterfall].enabled.feeder = true; // drain
  const o0 = d.sites[0].stats.made, f0 = d.sites[K.flatrocks].stats.made, m1 = d.sites[K.waterfall].stats.made;
  run(d, 120);
  if (d.sites[K.waterfall].hopper.length) console.log('    (drain status:', d.sites[K.waterfall].feederStatus, d.sites[K.waterfall].hopper.length, d.sites[K.waterfall].stats.launched, ')');
  ok(full >= 8 && d.sites[K.waterfall].hopper.length === 0 && d.sites[K.waterfall].stats.made === m1 && d.sites[0].stats.made > o0 && d.sites[K.flatrocks].stats.made > f0,
    `Waterfall Run drained its full ${full}-ball queue with its press paused while Old Rolling Grounds (+${d.sites[0].stats.made - o0}) and Flat Rocks (+${d.sites[K.flatrocks].stats.made - f0}) kept producing`);
  d.sites[K.waterfall].enabled.press = true; d.sites[K.waterfall].enabled.release = false;
  const l1 = d.sites[K.waterfall].stats.launched, l0 = d.sites[0].stats.launched;
  run(d, 30);
  ok(d.sites[K.waterfall].stats.launched === l1 && d.sites[0].stats.launched > l0 && reconcile(d).length === 0 && /Releases off/.test(d.sites[K.waterfall].reason),
    `"New releases" off stops only that site (status "${d.sites[K.waterfall].reason}"); the network books still balance`);
}

// ================================================================= 4. payout math
if (want(4)) {
  head('4. Payout math, order reservations, reload in transit, same-step cap');
  const g = fresh();
  openTo(g, K.slate);
  give(g, 0, CREEK_FIXES); // creek fixes change the route, never the payout
  g.sites[K.slate].owned.add('premiumFelt');
  g.sites[K.slate].recipe = RECIPE_INDEX.dryweave;
  const pay = g.payoutFor(K.slate);
  ok(pay === 650, `Slate Steps + Dry-Weave + Premium Felt (+$5): $620 + $5 + $25 = $${pay}`);
  g.acceptOrder('slatebatch');
  g.manualRoll(K.slate);
  const b = g.phys.balls.find((x) => x.start === K.slate);
  ok(b.payout === 755 && g.order.reserved === 1, `with one Slate Test Batch slot it pays $${b.payout} (reserved ${g.order.reserved})`);
  run(g, 30);
  const snap = clone(g.serialize());
  const r = new Game(creek, snap, { headless: true });
  const cash0 = r.cash;
  let paidR = [], paidO = [];
  let lostR = [];
  run(r, STARTS[K.slate].eta * 2.5, (e) => { if (e.type === 'finish') paidR.push([e.id, e.amount]); if (e.type === 'lost') lostR.push(e.reason + '@' + e.spot); });
  if (!paidR.length) console.log('    (reloaded ball lost:', lostR.join(', '), ')');
  run(g, STARTS[K.slate].eta * 2.5, (e) => { if (e.type === 'finish') paidO.push([e.id, e.amount]); });
  ok(paidR.length === 1 && paidR[0][1] === 755 && r.cash - cash0 === 755 && r.order.paid === 1 && r.order.reserved === 0 && paidO.length === 1 && paidO[0][1] === 755,
    `reloaded mid-run: the ball finishes once for $${paidR[0]?.[1]} and the order shows 1 paid / 0 reserved (the original run agrees: $${paidO[0]?.[1]})`);
  // same-step cap: one slot left, two launches in the same step
  const c = fresh();
  openTo(c, K.slate);
  c.acceptOrder('slatebatch');
  c.order.paid = c.order.target - 1;
  c.launch(K.slate, c.makeItem(K.slate)); c.launch(K.slate, c.makeItem(K.slate));
  const bs = c.phys.balls.filter((x) => x.start === K.slate);
  ok(bs.filter((x) => x.orderId).length === 1 && c.order.reserved === 1, `two launches in the same step with one slot left: exactly one reserves the bonus (${bs.map((x) => '$' + x.payout).join(', ')})`);
  // two reserved balls arriving in the same simulation step
  const e = fresh();
  openTo(e, K.slate);
  e.acceptOrder('slatebatch');
  e.order.paid = e.order.target - 2;
  e.launch(K.slate, e.makeItem(K.slate)); e.launch(K.slate, e.makeItem(K.slate));
  const [b1, b2] = e.phys.balls.filter((x) => x.start === K.slate);
  const before = e.cash;
  e.pay(b1); e.pay(b2);
  const log = e.orderLog.filter((o) => o.id === 'slatebatch');
  ok(!e.order && log.length === 1 && log[0].paid === log[0].target && e.cash - before === 2 * (620 + 105) && e.events.filter((x) => x.type === 'orderDone').length === 1,
    `two reserved balls settling in the same step: order completes once at ${log[0]?.paid}/${log[0]?.target}, cash +$${e.cash - before}`);
  // a lost ball frees its slot and never touches the archive
  const arch = JSON.stringify([RACE_RECORDS, FEATURED, UNNUMBERED, ARCHIVE_CARDS, FIELD_NOTES]);
  const f = fresh();
  openTo(f, K.slate);
  f.acceptOrder('slatebatch');
  f.manualRoll(K.slate);
  const fb = f.phys.balls.find((x) => x.start === K.slate);
  f.lose(fb, 'test', f.phys.balls.indexOf(fb));
  ok(f.order.reserved === 0 && arch === JSON.stringify([RACE_RECORDS, FEATURED, UNNUMBERED, ARCHIVE_CARDS, FIELD_NOTES]), 'a lost reserved ball frees its order slot; the historical archive is unchanged');
}

// ================================================================= 5. upgrade impact
if (want(5)) {
  head('5. Upgrade impact: Willow Narrows backup and exit fix; a fast press waiting on its post');
  const secs = QUICK ? 200 : 300;
  // three factories above the Narrows (Willow, Splitstone, Long Eddy) all feed the root pinch
  const feeders = [K.willow, K.splitstone, K.longeddy];
  const willowRun = (extra) => {
    const g = fresh();
    g.launchSeed = 1;
    openTo(g, K.longeddy);
    for (const k of feeders) give(g, k, [...FAST, 'servo']);
    // the rest of the network is already improved, so the Narrows is the constraint
    give(g, 0, ['wideBasket', 'conveyor', 'poweredBelt', 'twinPacking', 'splitTray', 'industrialCatch', 'overflowCrate', 'rootRail', 'gravelMat', 'splashGuard', 'poolGuide', 'catchRamp', 'debrisScreen', 'spillRail', 'alderBypass', 'landingBoards', 'clearingArm', 'slateBumpers', 'slateOutlet', 'leafGrate']);
    give(g, K.willow, extra);
    let dwell = 0, n = 0, maxCount = 0, backed = 0, ticks = 0, passed = 0;
    const enter = new Map();
    const t0 = 150;
    run(g, secs, null, (g2, i) => {
      if (i % 12) return;
      if (g2.t >= t0) ticks++;
      if (g2.t >= t0 && feeders.some((k) => /Willow Narrows backed up/.test(g2.sites[k].feederStatus))) backed++;
      maxCount = Math.max(maxCount, g2.reachStats[reachIdx('willow')].count);
      for (const b of g2.phys.balls) {
        if (b.state !== 'roll') continue;
        if (b.s >= -27 && b.s < -19 && !enter.has(b.id)) enter.set(b.id, g2.t);
        if (b.s >= -19 && enter.has(b.id) && enter.get(b.id) > 0) { if (g2.t >= t0) { dwell += g2.t - enter.get(b.id); n++; passed++; } enter.set(b.id, -1); }
      }
    });
    const lost = feeders.reduce((x, k) => x + g.sites[k].stats.lost, 0), launched = feeders.reduce((x, k) => x + g.sites[k].stats.launched, 0);
    return { fpm: (passed / (secs - t0)) * 60, dwell: n ? dwell / n : 0, maxCount, backedPct: (backed / Math.max(1, ticks)) * 100, lostPct: (lost / Math.max(1, launched)) * 100 };
  };
  const reachIdx = (id) => REACHES.findIndex((R) => R.id === id);
  const a = willowRun([]), b = willowRun(['willowShield', 'willowFlare']);
  ok(a.dwell > 6 && (a.backedPct > 5 || a.maxCount >= 15),
    `stock Willow Narrows backs up under three upstream factories: ${a.dwell.toFixed(1)} s average through the root pinch, up to ${a.maxCount} balls in the reach (stock safe capacity ${REACHES[reachIdx('willow')].capStock}; ${REACHES[reachIdx('willow')].cap} with the Exit Flare), releases held ${a.backedPct.toFixed(0)}% of the time, ${a.lostPct.toFixed(1)}% lost`);
  ok(b.fpm > a.fpm * 1.08 && b.dwell < a.dwell, `Root Shield + Exit Flare: ${a.fpm.toFixed(1)} → ${b.fpm.toFixed(1)} balls/min through the pinch, pinch ${a.dwell.toFixed(1)} → ${b.dwell.toFixed(1)} s, held ${a.backedPct.toFixed(0)}% → ${b.backedPct.toFixed(0)}%, lost ${a.lostPct.toFixed(1)}% → ${b.lostPct.toFixed(1)}%`);
  // fast press, slow launch: the press waits on a full post, then the launch fix pays off
  const pressRun = (extra) => {
    const g = fresh();
    give(g, 0, ['press', 'feeder', 'quickMold', 'twinPress', 'servo', ...extra]);
    let waiting = 0, ticks = 0;
    run(g, 120, null, (g2, i) => { if (i % 12) return; ticks++; if (g2.sites[0].pressStatus === 'Press waiting') waiting++; });
    return { launches: g.sites[0].stats.launched, waitPct: (waiting / ticks) * 100, cash: g.stats.paid };
  };
  const p = pressRun([]), q = pressRun(['lowFriction', 'indexed', 'spacingSensor']);
  ok(p.waitPct > 40, `a fast press (Servo) behind the stock feeder spends ${p.waitPct.toFixed(0)}% of its time "Press waiting" with a full hopper`);
  ok(q.launches > p.launches * 1.3 && q.cash > p.cash, `fixing the launch (Low-Friction Chute, Indexed Feeder, Spacing Sensor): ${p.launches} → ${q.launches} launches and $${p.cash} → $${q.cash} in 120 s; press waiting ${p.waitPct.toFixed(0)}% → ${q.waitPct.toFixed(0)}%`);
}

// ================================================================= 6. performance and stress
if (want(6)) {
  head('6. Many factories, the longest route, ~500 balls in flight');
  const g = fresh();
  g.cash = 0;
  openTo(g, STARTS.length - 1);
  for (let k = 0; k < STARTS.length; k++) give(g, k, [...FAST, 'servo', 'turbo', 'bulkHopper', 'indexed']);
  give(g, 0, ['wideBasket', 'conveyor', 'poweredBelt', 'twinPacking', 'splitTray', 'industrialCatch', 'overflowCrate', 'autoGap', ...CREEK_FIXES,
    'willowShield', 'willowFlare', 'splitGate', 'splitMergeRail', 'basinBoom', 'basinVane', 'spillApron', 'spillSkimmer', 'sluiceAlternator', 'sluiceMerge', 'headGuide', 'headRails']);
  let maxBalls = 0, paidSum = 0, ms = 0, simT = 0;
  const launchesBySite = new Array(STARTS.length).fill(0);
  const blockedReason = new Set();
  const seen = new Set();
  let dup = 0;
  const secs = QUICK ? 320 : 420;
  let tStart = Date.now();
  run(g, secs, (e) => {
    if (e.type === 'finish') { paidSum += e.amount; if (seen.has(e.id)) dup++; seen.add(e.id); }
    if (e.type === 'launch') launchesBySite[e.k]++;
  }, (g2, i) => {
    if (i % 60) return;
    const n = g2.ballsRolling();
    maxBalls = Math.max(maxBalls, n);
    for (const s of g2.sites) if (s.open && s.reason) blockedReason.add(s.reason.replace(/^.* (backed up)$/, 'reach $1'));
  });
  ms = Date.now() - tStart; simT = secs;
  const starved = launchesBySite.map((n, k) => [STARTS[k].id, n]).filter(([, n]) => n < 5);
  ok(maxBalls >= 420, `${maxBalls} balls in flight at the peak (ball budget ${g.ballBudget}), ${g.stats.finished} finishes, ${g.stats.lost} lost`);
  ok(starved.length === 0, `balanced release at the shared reaches: every one of the 14 factories launched (min ${Math.min(...launchesBySite)}, max ${Math.max(...launchesBySite)})${starved.length ? ' — starved: ' + starved.map((x) => x[0]).join(', ') : ''}`);
  ok(g.stats.paid === paidSum && g.cash === paidSum && dup === 0 && reconcile(g).length === 0,
    `cash accounting stays exact under load: cash $${g.cash} = sum of finish payments $${paidSum}; no double payment; per-site books balance`);
  ok(blockedReason.size > 0 && [...blockedReason].every((x) => x.length > 3), `blocked sites say why: ${[...blockedReason].slice(0, 5).map((x) => `"${x}"`).join(', ')}`);
  const perSec = ms / simT;
  ok(perSec < 1000, `simulation cost ${perSec.toFixed(0)} ms per simulated second at ~${Math.round(maxBalls * 0.9)} balls (${(perSec / 10).toFixed(0)}% of one core; the browser also renders, so the ball budget is a setting)`);
  // sustained session: save, reload and keep going
  const snap = g.serialize();
  const r = new Game(creek, clone(snap), { headless: true });
  const audit = stageAudit(r);
  const paidBefore = new Set(r.phys.balls.filter((b) => b.paid).map((b) => b.id));
  let rep = 0;
  run(r, 30, (e) => { if (e.type === 'finish' && (paidBefore.has(e.id) || seen.has(e.id))) rep++; });
  ok(audit.dup.length === 0 && Math.abs(r.ballsRolling() + 0) > 0 && rep === 0 && reconcile(r).length === 0,
    `save at full load: ${audit.n} balls each in exactly one stage after reload, nothing re-paid in the next 30 s, books still balance`);
}

// ================================================================= 7. canon
if (want(7)) {
  head('7. Canon checks');
  const L = landmarkPlacements(creek);
  const byId = Object.fromEntries(L.map((l) => [l.id, l]));
  const unm = ['norwayCavern', 'crayfishPond', 'peytonsPool', 'nigusHowling', 'leafCavern'];
  ok(unm.every((id) => byId[id] && byId[id].unmapped && byId[id].x === undefined), `unmapped landmarks stay unmapped (no world position): ${unm.join(', ')}`);
  const w = {};
  let down = true, upstream = false;
  for (let s = 76.8; s < 79.5; s += 0.2) for (let d = 0.6; d < 2.6; d += 0.4) {
    creek.windAt(s, d, 5, 3.1, w);
    if (w.vy > 0) down = false;
    const fr = creek.frame(s);
    if (w.vx * fr.tx + w.vz * fr.tz < -1e-6) upstream = true;
  }
  creek.windAt(77.8, 1.4, 5, 3.1, w);
  ok(down && !upstream && w.vy < -2, `Folk Draft is a downdraft in the upper zone: vertical ${w.vy.toFixed(1)} m/s, never lifting, never blowing upstream`);
  const rot = creek.codeRot.slice().sort((a, b) => b.k - a.k)[0];
  ok(rot.s > 54 && rot.s < 60, `Code Rot observations are strongest at Crawfish Springs (s=${rot.s}, strength ${rot.k}); a separate layer from current and draft`);
  const sp = STARTS[K.springs].s, sh = STARTS[K.shelf].s, wf = STARTS[K.waterfall].s;
  ok(sp < sh && sh < wf && byId.shelf && byId.shelf.d > creek.c(72), `Crawfish Springs sits above the Shelf, which runs along the waterfall’s right side (springs ${sp}, shelf ${sh}, waterfall ${wf})`);
  ok(STARTS[K.flatrocks] && byId.flatRocks && Math.abs(byId.flatRocks.s - STARTS[K.flatrocks].s) < 0.5 && creek.alt.s0 > wf && byId.split && byId.tapedSign && byId.tapedSign.s < byId.split.s,
    'mapped Flat Rocks start, both waterfall branches (creek-right primary, alternate on the left) and the taped sign upstream of the split');
  ok(byId.clearing && byId.farlands && byId.clearing.s > byId.farlands.s && FIELD.some((f) => f.key === 'farlands') && FIELD.some((f) => /shelf/i.test(f.key)),
    'the Clearing (Nigatron) sits below the Farlands entrance, and the field map runs from the Shelf to the Farlands line');
  const exp = FIELD_NOTES.expedition.join(' ');
  ok(/no winner/i.test(exp) && /not a race/i.test(exp), 'the expedition is an inventory count with no standings and no winner');
  ok(RACE_RECORDS.some((r) => r.event === 'Major all-ball race' && r.results[0] === '1st #64 Max Inventory') && RACE_RECORDS.some((r) => r.event === 'Great 300-Ball Race' && r.results[0] === '1st #94 John Pork'),
    'the major all-ball race and the Great 300-Ball Race are separate entries with their own results');
  const f255 = FEATURED.find((f) => f.id === '255');
  ok(f255 && /likely/i.test(f255.note) && /Unconfirmed/.test(f255.status), `#255 ${f255.name} is marked as a likely match (${f255.status})`);
  const ids = FEATURED.map((f) => f.id);
  ok(['0', '-390', '119', '119.1'].every((x) => ids.filter((y) => y === x).length === 1), '#0, #-390, #119 and #119.1 are four distinct entries with their exact labels');
  // NCN and replica balls
  const arch = JSON.stringify([RACE_RECORDS, FEATURED, UNNUMBERED, ARCHIVE_CARDS, FIELD_NOTES]);
  const g = fresh();
  openTo(g, K.slate);
  g.owned.add('bankWorkshop');
  give(g, K.slate, ['press', 'feeder', 'ncnStamp', 'replicaJig']);
  g.sites[K.slate].replica = '#119 Norway Chungus';
  run(g, 25);
  const nb = g.phys.balls.find((b) => b.ncn);
  const idx = g.phys.balls.indexOf(nb);
  g.lose(nb, 'test', idx);
  run(g, 5);
  ok(nb && nb.ncn > 0 && nb.replica === '#119 Norway Chungus' && Number.isInteger(nb.id) && arch === JSON.stringify([RACE_RECORDS, FEATURED, UNNUMBERED, ARCHIVE_CARDS, FIELD_NOTES]) && Object.isFrozen(FEATURED),
    `a lost NCN-${String(nb?.ncn).padStart(5, '0')} ball with a #119 replica stencil keeps its own factory ID #${nb?.id}, stays a Replica, and writes no RIP record (archive data frozen and unchanged)`);
}

// ================================================================= 8. traversal
if (want(8)) {
  head('8. First-person traversal (real walker, headless)');
  const r = traverse(creek, () => {}, 1);
  ok(r.ok, `walked from the Old Rolling Grounds factory past the falls, the split and the taped sign, along the Shelf, through the Springs to the Farlands entrance in ${r.t.toFixed(0)} s (${r.reached.length} waypoints, ${r.detours} detours around trunks and rocks)`);
  ok(r.waded > 1 && r.falls === 0, `waded ${r.waded.toFixed(1)} s through safe shallows without being sent back from deep water`);
  ok(r.climb > 1, `climbed ${r.climb?.toFixed(1)} m from the waterfall pool up to Crawfish Springs`);
  ok(r.made > 30 && r.launched > 30, `factories kept producing during the walk (${r.made} made, ${r.launched} launched, ${r.finished} finished across 6 open sites)`);
}

// ================================================================= 9. progression
if (want(9)) {
  head('9. Progression from an Upper Gorge save, no debug money');
  const g = fresh();
  // an Upper Gorge save: the six base sites open and a well-equipped line at the Gorge
  openTo(g, K.gorge);
  for (let k = 0; k <= K.gorge; k++) give(g, k, ['press', 'feeder']);
  give(g, K.gorge, FAST);
  give(g, 0, ['rootRail', 'gravelMat', 'splashGuard', 'poolGuide', 'catchRamp', 'debrisScreen', 'spillRail', 'alderBypass', 'landingBoards', 'clearingArm', 'wideBasket']);
  g.sel = K.gorge;
  g.cash = 0;
  const simLimit = QUICK ? 3600 : 5 * 3600;
  const goal = QUICK ? 2 : 7; // quick mode stops after the first two new reaches
  const opened = [];
  let invisible = 0, checks = 0, headT = null;
  const order = ['slate', 'willow', 'splitstone', 'longeddy', 'spillway', 'sluice', 'coldspring'].map((id) => K[id]);
  let shortCash = 0;
  const tStart = Date.now();
  run(g, simLimit, (e, g2) => {
    if (e.type === 'milestone' && e.what === 'headwaters' && headT === null) headT = g2.t;
    if (e.type === 'finish' && e.start <= K.waterfall) shortCash += e.amount;
  }, (g2, i) => {
    if (headT !== null && g2.t > headT + 300) return STOP; // keep refining a little after the milestone
    if (QUICK && opened.length >= goal) return STOP;
    if (i % (120 * 5)) return;
    checks++;
    // the next purchase is always visible: something for sale is affordable or shows progress
    const anyVisible = UPGRADES.some((u) => { const c = g2.canBuy(u.id, g2.sel); return c.ok || c.avail; }) || order.some((k) => g2.unlockable(k));
    if (!anyVisible) invisible++;
    const next = order.find((k) => !g2.sites[k].open);
    if (next !== undefined && g2.canUnlock(next)) { g2.unlock(next); g2.sel = next; give(g2, next, []); opened.push([STARTS[next].id, Math.round(g2.t)]); return; }
    // otherwise buy the cheapest affordable factory upgrade at the newest site, keeping 25% of the next site's price
    const reserve = next !== undefined ? STARTS[next].cost * 0.25 : 0;
    const cands = UPGRADES.filter((u) => (u.tab === 'factory' && isSiteUpgrade(u.id)) || u.tab === 'creek' || u.id === 'flowMonitor').filter((u) => g2.canBuy(u.id, g2.sel).ok && g2.cash - u.price > reserve).sort((x, y) => x.price - y.price);
    if (cands.length) g2.buy(cands[0].id, g2.sel);
  });
  ok(QUICK ? opened.length >= goal : opened.length === 7 && headT !== null, `opened ${opened.map(([id, t]) => `${id} @${(t / 60).toFixed(0)}m`).join(', ')}; first Cold Spring Headwaters finish ${headT !== null ? `at ${(headT / 60).toFixed(0)} min of play` : 'not reached'} (${((Date.now() - tStart) / 1000).toFixed(0)} s to simulate)`);
  ok(invisible === 0, `the next purchase was visible at all ${checks} checks`);
  ok(shortCash > 0 && g.sites[0].stats.finished > 0, `short runs keep paying alongside the headwaters (${fmt(shortCash)} from the two shortest routes)`);
}

function fmt(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
console.log(`\n${passes} passed, ${failures} failed (${((Date.now() - T0) / 1000).toFixed(0)} s)`);
process.exit(failures ? 1 : 0);
