// Entry point: builds the creek, restores (and if needed migrates) the save, runs the loop.
import { Creek } from './core/creek.js';
import { Game, SAVE_VERSION } from './core/game.js';
import { MAT } from './core/creek.js';
import { SceneView } from './render/scene.js';
import { Audio } from './audio.js';
import { UI } from './ui.js';

const SAVE_KEY = 'creek-rolling-tycoon-save-v2';
const OLD_KEY = 'creek-rolling-tycoon-save-v1';
const BACKUP_KEY = 'creek-rolling-tycoon-save-v1-backup';

function store(op, key, val) {
  try {
    if (op === 'get') return localStorage.getItem(key);
    if (op === 'set') localStorage.setItem(key, val);
    if (op === 'del') localStorage.removeItem(key);
  } catch { /* storage blocked or full */ }
  return null;
}

/** Loads the v2 save, or the v1 save after keeping an untouched backup copy of it. */
function loadSave() {
  const parse = (raw) => { try { return raw ? JSON.parse(raw) : null; } catch { return null; } };
  const cur = parse(store('get', SAVE_KEY));
  if (cur && cur.v === SAVE_VERSION) return { data: cur, migrated: false };
  const rawOld = store('get', OLD_KEY);
  const old = parse(rawOld);
  if (old) {
    if (!store('get', BACKUP_KEY)) store('set', BACKUP_KEY, rawOld);
    return { data: old, migrated: old.v === 1 };
  }
  return { data: cur, migrated: false };
}

function boot() {
  const loading = document.getElementById('loading');
  const creek = new Creek();
  const { data, migrated } = loadSave();
  const game = new Game(creek, data);
  const qp = new URLSearchParams(location.search).get('quality');
  if (qp === 'low' || qp === 'medium' || qp === 'high') game.settings.quality = qp;
  const audio = new Audio();
  audio.enabled = game.settings.sound;
  const view = new SceneView(document.getElementById('view'), creek, game);
  const p = view.player;
  p.sens = game.settings.sens || 1;
  p.headBob = game.settings.headBob !== false;
  if (game.settings.fov) view.setFov(game.settings.fov);
  // where the player stood last time, else beside the selected factory
  if (!(game.player && p.restore(game.player))) view.spawnAt(game.sel);
  let resetting = false;
  const save = () => {
    if (resetting) return;
    if (view.mode === 'fp') game.player = p.state();
    else if (view.prevFp) game.player = view.prevFp;
    store('set', SAVE_KEY, JSON.stringify(game.serialize()));
    game.lastSaveT = game.t;
  };
  const ui = new UI(game, view, audio, {
    save,
    reset: () => { resetting = true; store('del', SAVE_KEY); store('del', OLD_KEY); location.reload(); },
  });
  ui.syncMode();
  if (migrated) {
    save();
    ui.toast('Your save was upgraded for the New Creek Nation expansion. The previous save is kept as a backup.', 'big');
  }
  // map clicks: follow a ball, open a for-sale item
  view.rig.onPick = (x, y) => {
    audio.unlock();
    if (view.mode === 'fp') return;
    const hit = view.pick(x, y);
    if (!hit) return;
    if (hit.type === 'ball') { view.followBall(hit.id, false); ui.syncMode(); }
    else if (hit.type === 'stake') ui.openItem(hit.id);
  };
  view.onFollowEnded = () => { view.returnToPlayer(); ui.syncMode(); };
  p.onStep = (surf, level) => {
    if (!game.settings.sound) return;
    const v = surf === 'water' ? 'water' : surf === MAT.ROCK ? 1 : surf === MAT.GRAVEL ? 0 : 2;
    audio.play('step', v, level);
  };
  p.onFall = () => ui.toast('Too deep to wade — back to the bank');
  window.addEventListener('pointerdown', () => audio.unlock(), { once: true });
  window.addEventListener('keydown', () => audio.unlock(), { once: true });
  window.addEventListener('resize', () => view.resize(document.getElementById('view')));

  let last = performance.now();
  let hiddenTimer = null;
  const drain = () => {
    for (const e of game.events) {
      view.onEvent(e, game.settings.sound ? audio : null);
      ui.onEvent(e);
      if (e.type === 'unlock') ui.syncMode();
      if (e.type === 'finish' || e.type === 'purchase' || e.type === 'unlock' || e.type === 'orderDone') game._dirty = true;
    }
    game.events.length = 0;
  };
  const frame = (now) => {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    try {
      game.update(dt);
      drain();
      view.update(dt, game.settings.sound ? audio : null);
      ui.update(dt);
    } catch (err) {
      // keep the factories and the view running; report each distinct error once
      if (!frame.seen) frame.seen = new Set();
      if (!frame.seen.has(err.message)) { frame.seen.add(err.message); console.error(err); }
    }
    if (game._dirty && game.t - game.lastSaveT > 0.5) { game._dirty = false; save(); }
    else if (game.t - game.lastSaveT > 3) save();
    requestAnimationFrame(frame);
  };
  // every factory keeps running (at reduced rate) while the tab is in the background
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      save();
      let prev = performance.now();
      hiddenTimer = setInterval(() => {
        const now = performance.now();
        let left = Math.min(5, (now - prev) / 1000);
        prev = now;
        while (left > 0) { const step = Math.min(0.25, left); game.update(step); left -= step; }
        game.events.length = 0;
        save();
      }, 1000);
    } else {
      clearInterval(hiddenTimer);
      last = performance.now();
    }
  });
  window.addEventListener('pagehide', save);
  window.addEventListener('beforeunload', save);
  loading.classList.add('done');
  setTimeout(() => loading.remove(), 600);
  requestAnimationFrame(frame);
  window.__crt = { game, view, creek, save, ui };
}

window.addEventListener('DOMContentLoaded', () => {
  // let the loading screen paint before the heavy build
  setTimeout(() => {
    try { boot(); } catch (err) {
      console.error(err);
      document.getElementById('loading').innerHTML = `<div class="err">Could not start: ${err.message}</div>`;
    }
  }, 30);
});
