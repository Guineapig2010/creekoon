// Entry point: builds the creek, restores the save, runs the loop.
import { Creek } from './core/creek.js';
import { Game } from './core/game.js';
import { SceneView } from './render/scene.js';
import { Audio } from './audio.js';
import { UI } from './ui.js';

const SAVE_KEY = 'creek-rolling-tycoon-save-v1';

function loadSave() {
  try { const raw = localStorage.getItem(SAVE_KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

function boot() {
  const loading = document.getElementById('loading');
  const creek = new Creek();
  const game = new Game(creek, loadSave());
  const audio = new Audio();
  audio.enabled = game.settings.sound;
  const view = new SceneView(document.getElementById('view'), creek, game);
  let resetting = false;
  const save = () => {
    if (resetting) return;
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(game.serialize())); } catch { /* storage full or blocked */ }
    game.lastSaveT = game.t;
  };
  const ui = new UI(game, view, audio, {
    save,
    reset: () => { resetting = true; try { localStorage.removeItem(SAVE_KEY); } catch { /* ignore */ } location.reload(); },
  });
  view.rig.onPick = (x, y) => {
    audio.unlock();
    const hit = view.pick(x, y);
    if (!hit) return;
    if (hit.type === 'ball') view.rig.setFollow(hit.id, view.rig.dist < 1.2);
    else if (hit.type === 'stake') ui.openItem(hit.id);
  };
  view.followEnded = () => { /* keep the camera where the ball finished */ };
  window.addEventListener('pointerdown', () => audio.unlock(), { once: true });
  window.addEventListener('keydown', () => audio.unlock(), { once: true });

  let last = performance.now();
  let hiddenTimer = null;
  const drain = () => {
    for (const e of game.events) {
      view.onEvent(e, game.settings.sound ? audio : null);
      ui.onEvent(e);
      if (e.type === 'finish' || e.type === 'purchase' || e.type === 'unlock' || e.type === 'relocated') game._dirty = true;
    }
    game.events.length = 0;
  };
  const frame = (now) => {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    game.update(dt);
    drain();
    view.update(dt, game.settings.sound ? audio : null);
    ui.update(dt);
    if (game._dirty && game.t - game.lastSaveT > 0.5) { game._dirty = false; save(); }
    else if (game.t - game.lastSaveT > 3) save();
    requestAnimationFrame(frame);
  };
  // keep the line running (at reduced rate) while the tab is in the background
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
  window.__crt = { game, view, creek, save };
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
