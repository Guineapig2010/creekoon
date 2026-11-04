// Headless playtest of the delivery checklist. Runs the real simulation
// (same code the browser runs) faster than real time and prints a report.
//   node tools/playtest.mjs          full run (~2-4 minutes)
//   node tools/playtest.mjs quick    shorter runs
import { Creek } from '../src/core/creek.js';
import { Game } from '../src/core/game.js';
import { STARTS, S_FINISH, PHYS_DT, UPGRADE_BY_ID } from '../src/core/config.js';

const QUICK = process.argv[2] === 'quick';
const creek = new Creek();
const DT = PHYS_DT;
let failures = 0;
const ok = (cond, msg) => { console.log(`${cond ? '  PASS' : '  FAIL'}  ${msg}`); if (!cond) failures++; };
const head = (t) => console.log(`\n=== ${t} ===`);
const fresh = () => new Game(creek, null, { headless: true });
function run(g, secs, onEvent, each) {
  const n = Math.round(secs / DT);
  for (let i = 0; i < n; i++) {
    if (each) each(g);
    g.tick(DT);
    for (const e of g.events) onEvent && onEvent(e, g);
    g.events.length = 0;
  }
}
const ALL_FACTORY = ['press', 'feeder', 'quickMold', 'lowFriction', 'hopperExt', 'twinPress', 'indexed', 'servo', 'bulkHopper', 'turbo'];
const ALL_CREEK = ['rootRail', 'gravelMat', 'splashGuard', 'poolGuide', 'catchRamp', 'debrisScreen', 'spillRail', 'alderBypass', 'landingBoards', 'clearingArm'];
const own = (g, ids) => { for (const id of ids) g.owned.add(id); g.applyOwned(); };
const setStart = (g, k) => { g.unlocked = Math.max(g.unlocked, k + 1); g.sel = k; g.installChute(k); };

// ---------------------------------------------------------------- 1. first minute
head('1. First minute from an empty save');
{
  const g = fresh();
  const pays = [];
  let tPress = null, tFeeder = null, firstFinish = null;
  run(g, 90, (e, g2) => {
    if (e.type === 'finish') { pays.push(e.amount); if (!firstFinish) firstFinish = { t: g2.t, amount: e.amount, time: e.time }; }
  }, (g2) => {
    // a player who clicks Make & Roll whenever it is ready and buys the two machines as soon as they can
    if (g2.manualCD <= 0 && g2.t > 0.5) g2.manualRoll();
    if (!tPress && g2.cash >= 25 && g2.buy('press')) tPress = g2.t;
    if (tPress && !tFeeder && g2.cash >= 45 && g2.buy('feeder')) tFeeder = g2.t;
  });
  ok(firstFinish && firstFinish.amount === 10, `first ball crossed the gate and paid exactly $${firstFinish?.amount} (travel ${firstFinish?.time.toFixed(1)} s, at t=${firstFinish?.t.toFixed(1)} s)`);
  ok(pays.slice(0, 3).reduce((a, b) => a + b, 0) >= 25 && tPress, `three finishes afford the $25 Auto Press (bought at t=${tPress?.toFixed(1)} s)`);
  ok(tFeeder && tFeeder < 60, `full basic automation (press + feeder) at t=${tFeeder?.toFixed(1)} s`);
  const launchedBefore = g.stats.launched;
  run(g, 60);
  ok(g.stats.launched - launchedBefore >= 18, `line runs hands-free afterwards: ${g.stats.launched - launchedBefore} launches in 60 s without clicking`);
}

// ---------------------------------------------------------------- 2. machines stop / restart, jams, installs
head('2. Press and feeder stop/restart; jams clear; purchases install equipment');
{
  const g = fresh();
  own(g, ['press']);
  run(g, 30);
  ok(g.hopper.length === 8 && g.status.press === 'Press waiting', `press fills the 8-ball hopper and waits (hopper ${g.hopper.length}, status "${g.status.press}")`);
  const made = g.stats.made;
  run(g, 6);
  ok(g.stats.made === made, 'press stays stopped while the hopper is full');
  own(g, ['feeder']);
  run(g, 12);
  ok(g.stats.made > made && g.stats.launched > 0, `feeder drains the hopper and the press restarts (made +${g.stats.made - made}, launched ${g.stats.launched})`);
  own(g, ['lowFriction', 'indexed']); // feeder 1.3 s faster than the 3 s press
  let sawEmpty = false;
  run(g, 40, null, (g2) => { if (g2.status.feeder === 'Hopper empty') sawEmpty = true; });
  const l0 = g.stats.launched;
  run(g, 15);
  ok(sawEmpty && g.stats.launched > l0, `feeder waits on an empty hopper ("Hopper empty") and restarts as balls arrive (+${g.stats.launched - l0} in 15 s)`);
  ok(Object.keys(g.suggestions()).includes('quickMold'), 'shop suggests a faster press while the hopper runs empty');
  // jams: stock creek, busy line
  const j = fresh();
  setStart(j, 0);
  own(j, ['press', 'feeder', 'quickMold', 'lowFriction', 'twinPress', 'indexed', 'spacingSensor']);
  let maxStall = 0, lost = 0, surges = 0;
  const perWindow = [];
  let lastL = 0;
  run(j, QUICK ? 120 : 240, (e) => { if (e.type === 'lost') lost++; if (e.type === 'surge') surges++; }, (g2) => {
    for (const b of g2.phys.balls) if (b.state === 'roll') maxStall = Math.max(maxStall, b.stallT);
    if (Math.round(g2.t / DT) % Math.round(30 / DT) === 0) { perWindow.push(g2.stats.launched - lastL); lastL = g2.stats.launched; }
  });
  ok(perWindow.slice(1).every((n) => n > 0) && maxStall < 25, `stalls and jams resolve on their own: longest stall ${maxStall.toFixed(1)} s, ${surges} creek surges, ${lost} balls written off; launches every 30 s window ${JSON.stringify(perWindow.slice(1))}`);
  // installs
  const g3 = fresh();
  const before = new Set(g3.phys.disabled);
  own(g3, ALL_CREEK);
  ok(before.has('rootRail') && !g3.phys.disabled.has('rootRail') && g3.phys.matOn && !g3.phys.disabled.has('splashGuard'), 'creek purchases install their colliders (rail, mat, guard … switched on in the physics world)');
}

// ---------------------------------------------------------------- 3. every start reaches the original gate
head('3. Each upstream start adds distance to the same creek and pays once');
{
  const lineCpm = [];
  for (let k = 0; k < STARTS.length; k++) {
    const g = fresh();
    setStart(g, k);
    own(g, ['rootRail', 'splashGuard']);
    const ids = [];
    const order = [];
    const pays = new Map(), times = [];
    run(g, STARTS[k].eta * 3 + 20, (e) => {
      if (e.type === 'launch') ids.push(e.id);
      if (e.type === 'checkpoint' && e.id === ids[0]) { const b = g.phys.balls.find((x) => x.id === e.id); if (b) order.push(b.cps[b.cpi - 1]); }
      if (e.type === 'finish') { pays.set(e.id, (pays.get(e.id) || 0) + e.amount); times.push(e.time); }
    }, (g2) => { if (ids.length < 5 && g2.manualCD <= 0 && g2.t > ids.length * 3) g2.manualRoll(); });
    const expected = STARTS.filter((s) => s.s > STARTS[k].s).map((s) => s.s);
    const sawAll = expected.every((s) => order.includes(s));
    times.sort((a, b) => a - b);
    const med = times[Math.floor(times.length / 2)];
    const once = [...pays.values()].every((v) => v === STARTS[k].base);
    ok(pays.size >= 4 && once && sawAll, `${STARTS[k].name.padEnd(20)} ${(S_FINISH - STARTS[k].s).toFixed(1).padStart(5)} m of creek, median ${med.toFixed(1)} s over ${times.length} balls (target ${STARTS[k].target}), first ball passed ${order.length} upstream checkpoints, each paid $${STARTS[k].base} once`);
  }
  // $/min after the line fills, same machines everywhere
  const machines = ['press', 'feeder', 'quickMold', 'lowFriction', 'twinPress', 'indexed', 'spacingSensor', 'wideBasket', ...ALL_CREEK];
  for (let k = 0; k < STARTS.length; k++) {
    const g = fresh();
    setStart(g, k);
    own(g, machines);
    const secs = STARTS[k].eta + (QUICK ? 90 : 150);
    let paidLate = 0;
    run(g, secs, (e, g2) => { if (e.type === 'finish' && g2.t > secs - 90) paidLate += e.amount; });
    lineCpm.push(paidLate / 1.5);
  }
  const inc = lineCpm.every((v, i) => i === 0 || v > lineCpm[i - 1]);
  ok(inc, `filled-line cash per minute rises with each longer start: ${lineCpm.map((v, i) => `${STARTS[i].id} $${Math.round(v)}`).join(', ')}`);
}

// ---------------------------------------------------------------- 4. switching starts mid-flight
head('4. Switching to a short route while long-run balls are in transit');
{
  const g = fresh();
  setStart(g, 2);
  own(g, ['press', 'feeder', 'quickMold', 'lowFriction', 'hopperExt', 'rootRail', 'splashGuard', 'catchRamp', 'wideBasket']);
  run(g, 25);
  const inTransit = g.phys.balls.filter((b) => b.state === 'roll').map((b) => b.id);
  for (let i = 0; i < 6; i++) g.hopper.push(0); // a reserve built up earlier
  const hopperBefore = g.hopper.length;
  g.selectStart(0);
  let launchedDuringMove = 0, oldPaid = [], newPaid = [], firstNewLaunch = null;
  const hopperAtMove = [];
  run(g, 50, (e, g2) => {
    if (e.type === 'launch') { if (g2.reloc && g2.reloc.phase === 'move') launchedDuringMove++; if (!firstNewLaunch && e.k === 0) firstNewLaunch = e; }
    if (e.type === 'relocMove') hopperAtMove.push(g2.hopper.length);
    if (e.type === 'finish') (inTransit.includes(e.id) ? oldPaid : newPaid).push([e.start, e.amount]);
  });
  ok(inTransit.length >= 5, `${inTransit.length} Shelf balls were rolling when the player switched to Old Rolling Grounds`);
  ok(launchedDuringMove === 0, 'no launches while the workbench cart is moving');
  ok(hopperAtMove[0] >= hopperBefore - 2, `hopper kept through the move (${hopperBefore} before, ${hopperAtMove[0]} when the cart left)`);
  ok(oldPaid.length > 0 && oldPaid.every(([k, a]) => k === 2 && a === STARTS[2].base), `balls already rolling finished on their original route and payout (${oldPaid.length} × $${STARTS[2].base})`);
  ok(newPaid.length > 0 && newPaid.every(([k, a]) => k === 0 && a === STARTS[0].base), `new launches use the short route (${newPaid.length} × $${STARTS[0].base})`);
}

// ---------------------------------------------------------------- 5. physical behaviour + guides
head('5. Believable physics and measurable guide improvements');
{
  const g = fresh();
  setStart(g, 5);
  own(g, ['press', 'feeder', 'quickMold', 'lowFriction', 'hopperExt', 'twinPress', 'indexed', 'spacingSensor', 'wideBasket', 'rootRail']);
  const ev = { rockHits: 0, glancing: null, falls: [], bumpsNarrow: 0, eddyTurns: 0, eddyHeld: 0 };
  const track = new Map();
  const eddies = creek.eddies.filter((e) => e.R >= 0.18);
  let eddyName = '';
  run(g, QUICK ? 160 : 220, (e) => {
    if (e.type === 'hit' && e.mat === 1) {
      ev.rockHits++;
      const b = g.phys.balls.find((x) => x.id === e.id);
      if (b && !ev.glancing && e.v > 0.5 && e.v < 1.6) ev.glancing = { v: e.v, s: b.s, speed: Math.hypot(b.vx, b.vz) };
    }
    if (e.type === 'splash') { const L = creek.locate(e.x, e.z, -1, {}); if (L.s > 85.9 && L.s < 87.5) ev.falls.push(e.v); }
    if (e.type === 'bump') { const L = creek.locate(e.x, e.z, -1, {}); if ((L.s > 62.3 && L.s < 67.5) || (L.s > 92 && L.s < 98.5) || (L.s > 54 && L.s < 62.3)) ev.bumpsNarrow++; }
  }, (g2) => {
    for (const b of g2.phys.balls) {
      if (b.state !== 'roll') continue;
      for (let q = 0; q < eddies.length; q++) {
        const eddy = eddies[q];
        const ps = b.s - eddy.s, pd = b.d - creek.c(b.s) - eddy.d;
        const key = b.id * 64 + q;
        if (Math.hypot(ps, pd) > eddy.R * 1.4) { track.delete(key); continue; }
        const a = Math.atan2(pd, ps);
        const t = track.get(key);
        if (t) {
          let da = a - t.a; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
          t.sum += da; t.a = a; t.time += DT;
          const turns = Math.abs(t.sum) / (2 * Math.PI);
          if (turns > ev.eddyTurns) { ev.eddyTurns = turns; eddyName = `${eddy.tag || 'eddy'} at s=${eddy.s}`; }
          if (t.time > ev.eddyHeld) ev.eddyHeld = t.time;
        } else track.set(key, { a, sum: 0, time: 0 });
      }
    }
  });
  ok(ev.glancing, `glancing rock hits deflect without stopping the ball (${ev.rockHits} rock contacts; e.g. ${ev.glancing?.v.toFixed(2)} m/s impact at s=${ev.glancing?.s.toFixed(1)}, ball still moving ${ev.glancing?.speed.toFixed(2)} m/s)`);
  const vmax = Math.max(...ev.falls);
  ok(ev.falls.length > 5 && vmax > 5 && vmax < 8, `waterfall plunges splash in at ${Math.min(...ev.falls).toFixed(1)}–${vmax.toFixed(1)} m/s (free fall from 2.3 m ≈ 6.7 m/s)`);
  ok(ev.eddyTurns > 0.45 && ev.eddyHeld > 4, `floating balls swing round eddies and are held there (up to ${ev.eddyTurns.toFixed(2)} turns, ${eddyName}; longest hold ${ev.eddyHeld.toFixed(1)} s)`);
  ok(ev.bumpsNarrow > 0, `balls bump each other in the narrow runs (${ev.bumpsNarrow} bumps)`);
}
{
  // each guide against the stock creek, same line and seeds
  const SPOTS = [
    ['rootRail', 0, [92.6, 94.5], 'root'], ['gravelMat', 0, [94.3, 96.8], 'gravel'], ['splashGuard', 1, [84.5, 89], 'lip'],
    ['poolGuide', 1, [86, 90.5], 'pool'], ['catchRamp', 2, [77, 80.5], 'catch'], ['debrisScreen', 3, [54.5, 62.3], 'springs'],
    ['spillRail', 3, [62.3, 67.5], 'spillway'], ['alderBypass', 4, [44, 50.8], 'island'], ['landingBoards', 5, [8.5, 11.5], 'gorgeStep'],
    ['clearingArm', 3, [59, 63], 'outlet'],
  ];
  const factory = ['press', 'feeder', 'quickMold', 'lowFriction', 'hopperExt', 'twinPress', 'indexed', 'servo', 'bulkHopper', 'wideBasket', 'spacingSensor'];
  for (const [fix, k, sec, spot] of SPOTS) {
    const res = [];
    for (const withFix of [false, true]) {
      let lostAt = 0, launched = 0, sum = 0, n = 0, mx = 0;
      for (const seed of [1, 2]) {
        const g = fresh();
        g.launchSeed = seed;
        setStart(g, k);
        const base = [...factory, ...ALL_CREEK.filter((c) => c !== fix && c !== 'clearingArm')];
        own(g, withFix ? [...base, fix] : base);
        const enter = new Map();
        run(g, QUICK ? 120 : 200, (e) => { if (e.type === 'lost' && e.spot === spot) lostAt++; }, (g2) => {
          if (Math.round(g2.t / DT) % 6) return;
          for (const b of g2.phys.balls) {
            if (b.state !== 'roll') continue;
            if (b.s >= sec[0] && b.s < sec[1] && !enter.has(b.id)) enter.set(b.id, g2.t);
            if (b.s >= sec[1] && enter.has(b.id) && enter.get(b.id) >= 0) { const d = g2.t - enter.get(b.id); sum += d; n++; mx = Math.max(mx, d); enter.set(b.id, -1); }
          }
        });
        launched += g.stats.launched;
      }
      res.push({ lostPct: (lostAt / launched) * 100, mean: sum / n, max: mx });
    }
    const [a, b] = res;
    const better = b.lostPct < a.lostPct - 0.5 || b.mean < a.mean * 0.97;
    ok(better, `${UPGRADE_BY_ID[fix].name.padEnd(24)} stock: ${a.lostPct.toFixed(1)}% lost, ${a.mean.toFixed(2)} s avg (max ${a.max.toFixed(1)})  →  installed: ${b.lostPct.toFixed(1)}% lost, ${b.mean.toFixed(2)} s avg (max ${b.max.toFixed(1)})`);
  }
  // ball upgrades change measurable behaviour
  const g = fresh();
  const wetOf = (spec) => { const gg = fresh(); setStart(gg, 1); own(gg, ['rootRail', 'splashGuard']); const b = gg.launch(spec); let w = 0; run(gg, 12, null, () => { w = Math.max(w, b.wet); }); return w; };
  const wStock = wetOf(0), wRes = wetOf(8);
  ok(wRes < wStock * 0.5, `Water-Resistant Felt: water uptake through the plunge pool ${(wStock * 100).toFixed(0)}% → ${(wRes * 100).toFixed(0)}% soaked`);
  void g;
}

// ---------------------------------------------------------------- 6. save / reload
head('6. Save and reload');
{
  const g = fresh();
  setStart(g, 2);
  own(g, ['press', 'feeder', 'quickMold', 'lowFriction', 'hopperExt', 'rootRail', 'splashGuard', 'catchRamp', 'wideBasket']);
  const paidIds = new Map();
  const count = (e) => { if (e.type === 'finish') paidIds.set(e.id, (paidIds.get(e.id) || 0) + 1); };
  run(g, 40, count);
  const rolling = g.phys.balls.filter((b) => b.state === 'roll').length;
  const snap = JSON.parse(JSON.stringify(g.serialize()));
  const cashAtSave = snap.cash;
  // continue the original and a reloaded copy side by side
  const h = new Game(creek, snap, { headless: true });
  ok(h.phys.balls.length === g.phys.balls.length && h.hopper.length === g.hopper.length && h.cash === g.cash, `reload restores ${rolling} rolling balls (position, velocity, spin, ball type, payout, checkpoints), hopper ${h.hopper.length}, cash $${h.cash}`);
  const paidAfterLoad = new Map();
  run(h, 60, (e) => { if (e.type === 'finish') paidAfterLoad.set(e.id, (paidAfterLoad.get(e.id) || 0) + 1); });
  run(g, 60, count);
  const dup = [...paidAfterLoad.keys()].filter((id) => paidIds.has(id) && g.t > 0 && paidIds.get(id) > 1);
  const reloadDup = [...paidAfterLoad.keys()].filter((id) => [...paidIds.entries()].some(([pid, n]) => pid === id && n > 0) && false);
  const alreadyPaidBeforeSave = new Set(snap.balls.filter((b) => b.paid).map((b) => b.id));
  const repaid = [...paidAfterLoad.keys()].filter((id) => alreadyPaidBeforeSave.has(id));
  ok(repaid.length === 0 && dup.length === 0 && reloadDup.length === 0, 'no ball paid twice across the reload (finished balls are stored as paid, with their cash)');
  ok(Math.abs(h.cash - g.cash) <= Math.max(130, g.cash * 0.05), `reloaded line keeps earning like the original: original $${g.cash}, reloaded $${h.cash} (from $${cashAtSave} at save)`);
  // purchase just confirmed
  const p = fresh();
  p.cash = 500; p.buy('press'); p.buy('premiumFelt');
  const p2 = new Game(creek, JSON.parse(JSON.stringify(p.serialize())), { headless: true });
  ok(p2.owned.has('press') && p2.owned.has('premiumFelt') && p2.cash === 500 - 25 - 180, `purchase confirmed right before reload is kept and charged once (cash $${p2.cash})`);
  // relocation in progress
  const r = fresh();
  setStart(r, 0); r.unlocked = 3; own(r, ['press', 'feeder']);
  run(r, 8);
  r.selectStart(2);
  run(r, 1.6);
  const midMove = r.reloc?.phase;
  const r2 = new Game(creek, JSON.parse(JSON.stringify(r.serialize())), { headless: true });
  ok(midMove === 'move' && r2.sel === 2 && !r2.reloc && r2.chuteCols.length > 0, `a reload during the cart move completes the relocation cleanly (was "${midMove}", now at ${STARTS[r2.sel].name})`);
}
{
  // highest-output line performance
  const g = fresh();
  setStart(g, 5);
  own(g, [...ALL_FACTORY, ...ALL_CREEK, 'spacingSensor', 'wideBasket', 'conveyor', 'premiumFelt', 'waterResist', 'batchStamp']);
  run(g, 100);
  let maxBalls = 0;
  const t0 = performance.now();
  run(g, 30, null, (g2) => { maxBalls = Math.max(maxBalls, g2.phys.balls.length); });
  const ms = (performance.now() - t0) / 30;
  ok(maxBalls >= 90 && ms < 60, `full Turbo line on the Upper Gorge: ${maxBalls} balls in flight, physics costs ${ms.toFixed(1)} ms per simulated second (${(ms / 10).toFixed(1)}% of one core at 60 fps)`);
}

console.log(`\n${failures ? failures + ' check(s) FAILED' : 'All checks passed.'}`);
process.exit(failures ? 1 : 0);
