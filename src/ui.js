// HTML overlay: HUD, first-person prompts and touch controls, the shop (with target-site
// rates), sites, network, orders, the overhead map overlay, the Creek League archive,
// field notes and the north-up field map.
import {
  STARTS, SITE_INDEX, UPGRADES, UPGRADE_BY_ID, TABS, MANUAL_COOLDOWN, RECIPES, ORDERS, REACHES, isSiteUpgrade,
  factoryNumbers, recipeBonus, bonusForSpec, S_FINISH,
} from './core/config.js';
import { RACE_RECORDS, FEATURED, UNNUMBERED, ARCHIVE_CARDS, FIELD_NOTES, REPLICA_NAMES, sortIds } from './core/archive.js';
import { REGIONAL, FIELD } from './core/fieldmap.js';
import { TROUBLE_SPOTS } from './core/game.js';

const $ = (sel, root = document) => root.querySelector(sel);
const fmt = (n) => '$' + Math.floor(n).toLocaleString('en-US');
const fmtK = (n) => (n >= 1e6 ? '$' + (n / 1e6).toFixed(2) + 'M' : n >= 10000 ? '$' + (n / 1000).toFixed(n >= 100000 ? 0 : 1) + 'k' : fmt(n));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const INTROS = {
  shelf: { title: 'Continental Shelf: flow and recipes', items: ['The Flow Monitor (Controls tab) shows balls in flight and delay for every reach, and which reach holds back the line.', 'Dry-Weave is your first optional recipe: pick it per factory in the Sites panel.', 'Field notes for the right-side Shelf and the expedition are in the Archive.', 'Compare the Shelf launch with the Folk Draft in the upper zone: the downdraft pushes airborne balls down.'] },
  springs: { title: 'Crawfish Springs: controls and orders', items: ['Each factory now has creek-side controls: pause its press or feeder, drain its queue, or stop new releases without touching other sites.', 'Your first optional shipment order is open at the finish station (Orders tab).', 'The crayfish habitat and the strongest Code Rot observations are marked here. The map legend keeps Current, Folk Draft and Code Rot separate.', 'Soft-Core recipe, the Springs Bank Sampler and the Crayfish Habitat Bypass are available.'] },
  alder: { title: 'Alder Bend: the Bank Workshop', items: ['The optional Bank Workshop (Factory tab) stages surplus balls and carts them to a factory that needs them. It is a separate purchase from new launch sites.', 'Every launch site is already its own permanent factory and needs no workshop.', 'Clean-Seam recipe and the Norway-Style Branch Sweeper are available.'] },
  gorge: { title: 'Upper Gorge: the headwaters open', items: ['Slate Steps, the first new headwater reach above the Gorge, can be bought from the Sites panel.', 'Industrial upgrades are listed in the Factory, Logistics and Finish tabs.', 'Your balance, machines and rolling balls are all kept.'] },
  slate: { title: 'Slate Steps', items: ['Rapids Felt recipe, the Slate equipment, the Third Supply Route and the NCN Batch Stamp are available.', 'Keep shorter starts for quick cash, recipe tuning and testing releases.'] },
};

export class UI {
  constructor(game, view, audio, hooks) {
    this.game = game; this.view = view; this.audio = audio; this.hooks = hooks;
    this.tab = 'factory';
    this.panel = 'shop';
    this.shopKey = ''; this.sitesKey = ''; this.netKey = ''; this.ordersKey = '';
    this.labels = [];
    this.lostT = 0;
    this.focusId = null;
    this.layers = { tycoon: true, field: true };
    this.mapLabels = new Map();
    this.twoPostPick = [];
    this.build();
  }

  build() {
    const root = $('#ui');
    root.innerHTML = `
      <div id="hud">
        <div class="cash" id="cash">$0</div>
        <div class="chips">
          <span class="chip" title="Cash earned per minute over the last 60 s"><b id="cpm">$0</b>/min</span>
          <span class="chip" title="Balls waiting in every hopper and launch post"><b id="queued">0</b> queued</span>
          <span class="chip" title="Balls rolling down the creek"><b id="rolling">0</b> rolling</span>
        </div>
        <div class="sub" id="sub"></div>
      </div>
      <div id="topright">
        <div class="btnrow">
          <button data-act="map" title="Overhead map (M)">Map</button>
          <button data-act="follow" title="Follow the ball in view (F)">Follow</button>
          <button data-act="close" title="Close follow camera (C)">Close-up</button>
          <button data-act="home" title="Walk back to the selected factory (H)">Factory</button>
          <button data-act="archive" title="Creek League archive, field notes and factory records">Archive</button>
          <button data-act="quiet" title="Quiet watch view: hide the shop and stats (Q)">Watch</button>
          <button id="gear" title="Settings">⚙</button>
        </div>
        <div id="settings" class="hidden">
          <label><input type="checkbox" id="optSound"> Sound</label>
          <label><input type="checkbox" id="optAuto"> Automation running</label>
          <label><input type="checkbox" id="optBob"> Head bob</label>
          <div class="qrow">Look sensitivity <input type="range" id="optSens" min="0.3" max="2.5" step="0.1"></div>
          <div class="qrow">Field of view <input type="range" id="optFov" min="50" max="95" step="1"> <span id="fovVal"></span></div>
          <div class="qrow">Graphics
            <select id="optQuality"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
          </div>
          <div class="hint">WASD / arrows to walk, Shift to run, mouse to look (click the view to capture the mouse), E to interact, Space to roll by hand at a factory, M map, F follow, Esc to come back. Phones: left stick walks, drag on the right to look.</div>
          <button id="help">Feature help…</button>
          <button id="reset" class="danger">Reset save…</button>
        </div>
      </div>
      <div id="panel">
        <div class="ptabs">
          <button class="ptab on" data-panel="shop">Shop</button>
          <button class="ptab" data-panel="sites">Sites</button>
          <button class="ptab" data-panel="network">Network</button>
          <button class="ptab" data-panel="orders">Orders</button>
          <button class="ptab collapse" id="collapse" title="Hide panel">▸</button>
        </div>
        <div id="shop" class="pbody">
          <div class="tabs">${TABS.map((t) => `<button data-tab="${t.id}" class="${t.id === 'factory' ? 'on' : ''}">${t.name}</button>`).join('')}</div>
          <div id="target"></div>
          <div id="items"></div>
        </div>
        <div id="sites" class="pbody hidden"></div>
        <div id="network" class="pbody hidden"></div>
        <div id="orders" class="pbody hidden"></div>
      </div>
      <button id="openPanel" class="hidden">Shop</button>
      <div id="crosshair"></div>
      <div id="prompt" class="hidden"></div>
      <div id="rollWrap">
        <button id="roll"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" class="track"/><circle cx="50" cy="50" r="46" class="prog" id="rollProg"/></svg>
          <span class="t1">Make &amp; Roll</span><span class="t2" id="rollSub">Space</span></button>
      </div>
      <div id="touch" class="hidden">
        <div id="stick"><div id="knob"></div></div>
        <button id="tInteract">E</button>
        <button id="tMap">Map</button>
      </div>
      <div id="mapUI" class="hidden">
        <div class="mapbar">
          <button id="mapBack">← Back to walking</button>
          <label><input type="checkbox" id="layTycoon" checked> Tycoon map</label>
          <label><input type="checkbox" id="layField" checked> Field notes</label>
          <button id="fieldMapBtn">Field map (Arroyo Trabuco)</button>
          <span class="north">N ↑</span>
        </div>
        <div id="reachList"></div>
        <div id="legend">
          <div><i class="lg cur"></i>Current (water flow)</div>
          <div><i class="lg draft"></i>Folk Draft (downdraft, Shelf)</div>
          <div><i class="lg rot"></i>Code Rot observations (simulated)</div>
          <div><i class="lg hist"></i>Historical landmark (approx.)</div>
          <div><i class="lg game"></i>Game-only reach</div>
        </div>
        <div id="mapLabels"></div>
      </div>
      <div id="modal" class="hidden"><div class="mbox"><button class="mclose" id="mclose">×</button><div id="mbody"></div></div></div>
      <div id="balldetail" class="hidden"></div>
      <div id="toasts"></div>
      <div id="labels"></div>
      <div id="status"></div>
      <div id="fade"></div>
    `;
    this.el = {
      cash: $('#cash'), cpm: $('#cpm'), queued: $('#queued'), rolling: $('#rolling'), sub: $('#sub'),
      items: $('#items'), target: $('#target'), sites: $('#sites'), network: $('#network'), orders: $('#orders'),
      roll: $('#roll'), rollProg: $('#rollProg'), rollSub: $('#rollSub'),
      toasts: $('#toasts'), labels: $('#labels'), status: $('#status'), panel: $('#panel'), prompt: $('#prompt'),
      mapUI: $('#mapUI'), reachList: $('#reachList'), mapLabels: $('#mapLabels'), modal: $('#modal'), mbody: $('#mbody'),
      balldetail: $('#balldetail'), fade: $('#fade'), crosshair: $('#crosshair'),
    };
    this.statusEls = {};
    // ---- roll
    const roll = () => {
      this.audio.unlock();
      const k = this.rollSite();
      if (k === null) { this.toast('Walk up to a factory to roll by hand, or open the map to pick one'); return; }
      const r = this.game.manualRoll(k);
      if (r === 'ok') this.game.selectSite(k);
    };
    this.el.roll.addEventListener('click', roll);
    // ---- keyboard
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
      const v = this.view;
      if (e.code === 'Space') { e.preventDefault(); roll(); }
      else if (e.code === 'KeyE') this.interact();
      else if (e.code === 'KeyM') this.toggleMap();
      else if (e.code === 'KeyF') this.follow(false);
      else if (e.code === 'KeyC') this.follow(true);
      else if (e.code === 'KeyH') v.homeView();
      else if (e.code === 'KeyQ') this.toggleQuiet();
      else if (e.code === 'Tab') { e.preventDefault(); this.setPanel(this.el.panel.classList.contains('hidden')); }
      else if (e.code === 'Escape' || e.code === 'Backspace') {
        if (!this.el.modal.classList.contains('hidden')) this.closeModal();
        else if (v.mode !== 'fp') { v.returnToPlayer(); this.syncMode(); }
      }
    });
    // ---- top buttons
    root.querySelectorAll('[data-act]').forEach((b) => b.addEventListener('click', () => {
      this.audio.unlock();
      const a = b.dataset.act;
      if (a === 'map') this.toggleMap();
      else if (a === 'follow') this.follow(false);
      else if (a === 'close') this.follow(true);
      else if (a === 'home') { this.view.homeView(); this.syncMode(); }
      else if (a === 'archive') this.openArchive('archive');
      else if (a === 'quiet') this.toggleQuiet();
    }));
    // ---- settings
    $('#gear').addEventListener('click', () => $('#settings').classList.toggle('hidden'));
    const s = this.game.settings;
    $('#optSound').checked = s.sound; $('#optAuto').checked = s.auto; $('#optQuality').value = s.quality;
    $('#optBob').checked = s.headBob !== false; $('#optSens').value = s.sens || 1; $('#optFov').value = s.fov || 70; $('#fovVal').textContent = `${s.fov || 70}°`;
    $('#optSound').addEventListener('change', (e) => { s.sound = e.target.checked; this.audio.unlock(); this.audio.setEnabled(s.sound); this.hooks.save(); });
    $('#optAuto').addEventListener('change', (e) => { s.auto = e.target.checked; this.hooks.save(); });
    $('#optBob').addEventListener('change', (e) => { s.headBob = e.target.checked; this.view.player.headBob = s.headBob; this.hooks.save(); });
    $('#optSens').addEventListener('input', (e) => { s.sens = +e.target.value; this.view.player.sens = s.sens; this.hooks.save(); });
    $('#optFov').addEventListener('input', (e) => { s.fov = +e.target.value; this.view.setFov(s.fov); $('#fovVal').textContent = `${s.fov}°`; this.hooks.save(); });
    $('#optQuality').addEventListener('change', (e) => { s.quality = e.target.value; this.view.setQuality(s.quality); this.hooks.save(); });
    $('#help').addEventListener('click', () => this.openHelp());
    let armed = 0;
    $('#reset').addEventListener('click', (e) => {
      const b = e.currentTarget;
      if (performance.now() - armed < 4000) { this.hooks.reset(); return; }
      armed = performance.now();
      b.textContent = 'Tap again to erase all progress';
      setTimeout(() => { if (performance.now() - armed >= 3900) b.textContent = 'Reset save…'; }, 4000);
    });
    // ---- panel
    root.querySelectorAll('.ptab[data-panel]').forEach((b) => b.addEventListener('click', () => this.showPanel(b.dataset.panel)));
    $('#collapse').addEventListener('click', () => this.setPanel(false));
    $('#openPanel').addEventListener('click', () => this.setPanel(true));
    root.querySelectorAll('#shop .tabs button').forEach((b) => b.addEventListener('click', () => { this.tab = b.dataset.tab; this.shopKey = ''; root.querySelectorAll('#shop .tabs button').forEach((x) => x.classList.toggle('on', x === b)); }));
    this.el.target.addEventListener('change', (e) => { if (e.target.id === 'targetSel') { this.game.selectSite(+e.target.value); this.shopKey = ''; } });
    this.el.items.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-buy]');
      if (!btn) return;
      this.audio.unlock();
      const id = btn.dataset.buy;
      const k = this.game.sel;
      if (this.game.buy(id, k)) { this.toast(`Installed: ${UPGRADE_BY_ID[id].name}${isSiteUpgrade(id) ? ` at ${STARTS[k].name}` : ''}`); this.hooks.save(); this.shopKey = ''; }
    });
    this.el.sites.addEventListener('click', (e) => this.onSitesClick(e));
    this.el.sites.addEventListener('change', (e) => this.onSitesChange(e));
    this.el.network.addEventListener('click', (e) => this.onNetworkClick(e));
    this.el.network.addEventListener('change', (e) => this.onNetworkChange(e));
    this.el.orders.addEventListener('click', (e) => this.onOrdersClick(e));
    // ---- map overlay
    $('#mapBack').addEventListener('click', () => { this.view.returnToPlayer(); this.syncMode(); });
    $('#layTycoon').addEventListener('change', (e) => { this.layers.tycoon = e.target.checked; });
    $('#layField').addEventListener('change', (e) => { this.layers.field = e.target.checked; });
    $('#fieldMapBtn').addEventListener('click', () => this.openFieldMap());
    this.el.reachList.addEventListener('click', (e) => { const r = e.target.closest('[data-reach]'); if (r) { const R = REACHES[+r.dataset.reach]; this.view.panMapTo((R.s0 + R.s1) / 2); } });
    this.el.mapLabels.addEventListener('click', (e) => {
      const l = e.target.closest('[data-site]');
      if (l) { const k = +l.dataset.site; if (this.game.sites[k].open) { this.game.selectSite(k); this.showPanel('sites'); this.setPanel(true); } else { this.showPanel('sites'); this.setPanel(true); } }
      const f = e.target.closest('[data-note]');
      if (f) this.openArchive('notes');
    });
    // ---- modal
    $('#mclose').addEventListener('click', () => this.closeModal());
    this.el.modal.addEventListener('click', (e) => {
      if (e.target === this.el.modal) this.closeModal();
      const t = e.target.closest('[data-mtab]');
      if (t) this.openArchive(t.dataset.mtab);
      const fm = e.target.closest('[data-fm]');
      if (fm) this.openFieldMap(fm.dataset.fm);
    });
    // ---- touch controls
    this.touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (this.touch) {
      $('#touch').classList.remove('hidden');
      const stick = $('#stick'), knob = $('#knob');
      let sid = null, cx = 0, cy = 0;
      stick.addEventListener('pointerdown', (e) => { sid = e.pointerId; stick.setPointerCapture(sid); const r = stick.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; e.preventDefault(); });
      stick.addEventListener('pointermove', (e) => {
        if (e.pointerId !== sid) return;
        let dx = (e.clientX - cx) / 48, dy = (e.clientY - cy) / 48;
        const l = Math.hypot(dx, dy); if (l > 1) { dx /= l; dy /= l; }
        knob.style.transform = `translate(${dx * 36}px, ${dy * 36}px)`;
        this.view.player.move.x = dx; this.view.player.move.y = -dy;
      });
      const end = (e) => { if (e.pointerId !== sid) return; sid = null; knob.style.transform = ''; this.view.player.move.x = 0; this.view.player.move.y = 0; };
      stick.addEventListener('pointerup', end); stick.addEventListener('pointercancel', end);
      $('#tInteract').addEventListener('click', () => this.interact());
      $('#tMap').addEventListener('click', () => this.toggleMap());
    }
    this.view.player.wantLock = !this.touch;
    if (window.innerWidth < 760) this.setPanel(false);
  }

  // ------------------------------------------------------------------ modes
  rollSite() {
    const v = this.view;
    if (v.mode === 'fp') { const k = v.besideFactory(); return k; }
    return this.game.sel;
  }

  toggleMap() {
    this.audio.unlock();
    const v = this.view;
    if (v.mode === 'map') v.returnToPlayer(); else v.enterMap();
    this.syncMode();
  }

  follow(close) {
    const v = this.view, g = this.game;
    let b = v.mode === 'fp' ? v.ballInView() : null;
    if (!b) for (const x of g.phys.balls) if (x.state === 'roll' && !x.paid && (!b || x.id > b.id)) b = x;
    if (b) v.followBall(b.id, close);
    else { v.followNext = close ? 'close' : 'far'; this.toast('Following the next ball released'); }
    this.syncMode();
  }

  syncMode() {
    const m = this.view.mode;
    this.el.mapUI.classList.toggle('hidden', m !== 'map');
    this.el.crosshair.classList.toggle('hidden', m !== 'fp');
    $('#touch')?.classList.toggle('dim', m !== 'fp');
  }

  toggleQuiet() {
    document.body.classList.toggle('quiet');
    this.game.settings.quiet = document.body.classList.contains('quiet');
  }

  interact() {
    this.audio.unlock();
    const it = this.view.nearestInteractable();
    if (!it) return;
    const g = this.game;
    if (it.type === 'factory') { g.selectSite(it.k); this.showPanel('sites'); this.setPanel(true); this.sitesKey = ''; }
    else if (it.type === 'map') { this.view.enterMap(); this.syncMode(); }
    else if (it.type === 'finish') this.openArchive('archive');
    else if (it.type === 'workshop') { this.showPanel('network'); this.setPanel(true); }
    else if (it.type === 'stake') this.openItem(it.id);
    else if (it.type === 'landmark') this.openArchive('notes', it.id);
    else if (it.type === 'unlock') { this.showPanel('sites'); this.setPanel(true); this.focusSite = it.k; this.sitesKey = ''; }
  }

  setPanel(open) {
    this.el.panel.classList.toggle('hidden', !open);
    $('#openPanel').classList.toggle('hidden', open);
    document.body.classList.toggle('panel-open', open);
  }

  showPanel(which) {
    this.panel = which;
    document.querySelectorAll('.ptab[data-panel]').forEach((b) => b.classList.toggle('on', b.dataset.panel === which));
    for (const p of ['shop', 'sites', 'network', 'orders']) $('#' + p).classList.toggle('hidden', p !== which);
    this.shopKey = this.sitesKey = this.netKey = this.ordersKey = '';
  }

  openItem(id) {
    const u = UPGRADE_BY_ID[id];
    if (!u) return;
    this.setPanel(true);
    this.showPanel('shop');
    this.tab = u.tab;
    document.querySelectorAll('#shop .tabs button').forEach((x) => x.classList.toggle('on', x.dataset.tab === u.tab));
    this.focusId = id;
    this.shopKey = '';
  }

  toast(msg, cls = '') {
    const d = document.createElement('div');
    d.className = 'toast ' + cls;
    d.textContent = msg;
    this.el.toasts.appendChild(d);
    setTimeout(() => d.classList.add('out'), 3200);
    setTimeout(() => d.remove(), 3800);
    while (this.el.toasts.children.length > 4) this.el.toasts.firstChild.remove();
  }

  floatLabel(text, x, y, z, cls) {
    let lab = this.labels.find((l) => !l.alive);
    if (!lab) {
      if (this.labels.length > 40) return;
      const d = document.createElement('div');
      this.el.labels.appendChild(d);
      lab = { d, alive: false };
      this.labels.push(lab);
    }
    lab.alive = true; lab.t = 0; lab.p = { x, y, z }; lab.d.textContent = text; lab.d.className = 'flab ' + cls; lab.life = cls === 'lost' ? 2.2 : 1.4;
  }

  onEvent(e) {
    const g = this.game;
    if (e.type === 'finish') {
      const cam = this.view.camera.position;
      if (Math.hypot(e.x - cam.x, e.z - cam.z) < 40) this.floatLabel(`+$${e.amount}`, e.x, e.y + 0.1, e.z, 'cash');
    } else if (e.type === 'lost') {
      const cam = this.view.camera.position;
      if (g.t - this.lostT > 1.5 && Math.hypot(e.x - cam.x, e.z - cam.z) < 30) { this.lostT = g.t; this.floatLabel(`No finish: ${e.reason}`, e.x, e.y + 0.1, e.z, 'lost'); }
    } else if (e.type === 'milestone' && e.what === 'gorge') this.toast('Milestone: first full run from the Upper Gorge!', 'big');
    else if (e.type === 'milestone' && e.what === 'headwaters') this.showMilestone();
    else if (e.type === 'intro') this.showIntro(e.what);
    else if (e.type === 'unlock') this.toast(`${STARTS[e.k].name} is open. Its own factory is running — follow its first ball with F.`, 'big');
    else if (e.type === 'orderDone') this.toast(`✓ ${ORDERS.find((o) => o.id === e.id).name} complete: ${e.paid} balls, +${fmt(e.earned)} in bonuses`, 'big');
    else if (e.type === 'trialDone') { const T = g.trial; if (T && T.after) this.toast(`Measured: ${UPGRADE_BY_ID[T.id].name} — cash ${fmtK(T.before.cpm)}/min → ${fmtK(T.after.cpm)}/min (Network tab for details)`); }
  }

  showIntro(what) {
    const I = INTROS[what];
    if (!I) return;
    this.openModal(`<h2>${esc(I.title)}</h2><ul class="intro">${I.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><div class="mfoot"><button id="introOk">Got it</button> <button id="introSkip" class="ghost">Skip</button> <span class="hint">You can reopen this from ⚙ → Feature help.</span></div>`);
    $('#introOk').addEventListener('click', () => this.closeModal());
    $('#introSkip').addEventListener('click', () => this.closeModal());
  }

  openHelp() {
    const seen = Object.keys(INTROS).filter((k) => this.game.milestones[k]);
    this.openModal(`<h2>Feature help</h2>${seen.length ? seen.map((k) => `<h3>${esc(INTROS[k].title)}</h3><ul class="intro">${INTROS[k].items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`).join('') : '<p>New features are introduced as you open the Shelf, the Springs, Alder Bend and the Upper Gorge.</p>'}
      <h3>Controls</h3><p>WASD / arrows walk, Shift runs, mouse looks (click the view to capture it). E interacts with factories, map boards, the finish station and for-sale stakes. Space rolls a ball by hand at the factory beside you. M opens the north-up map; F follows a ball; Esc returns you to where you were standing.</p>`);
  }

  showMilestone() {
    this.openModal(`<h2>Cold Spring Headwaters → the finish gate</h2><p>The first ball from the top of the creek just crossed the original gate, after every reach of the network. The stretch where you rolled one ball by hand is now the final leg of a creek full of balls from factories you built.</p><p>Keep refining the same operation: clear bottlenecks, tune recipes and gates, and beat your best sustained cash per minute (${fmtK(this.game.bestCpm)}/min so far).</p><div class="mfoot"><button id="msOk">Keep building</button></div>`);
    $('#msOk').addEventListener('click', () => this.closeModal());
  }

  openModal(html) { this.el.mbody.innerHTML = html; this.el.modal.classList.remove('hidden'); if (document.pointerLockElement) document.exitPointerLock(); }
  closeModal() { this.el.modal.classList.add('hidden'); }

  // ------------------------------------------------------------------ archive / field notes / records
  openArchive(tab = 'archive', focus = null) {
    const g = this.game;
    const tabs = `<div class="mtabs">${[['archive', 'Creek League Archive'], ['notes', 'Field Notes'], ['records', 'Factory Records'], ['orders', 'Orders']].map(([k, n]) => `<button data-mtab="${k}" class="${k === tab ? 'on' : ''}">${n}</button>`).join('')}</div>`;
    let body = '';
    if (tab === 'archive') {
      body = `<p class="ro">Read-only historical record. The factory never writes here.</p>
        <h3>Race records</h3><table class="rec">${RACE_RECORDS.map((r) => `<tr><th>${esc(r.event)}</th><td>${r.results.map(esc).join('<br>')}</td></tr>`).join('')}</table>
        <h3>Featured competitors</h3><table class="rec">${sortIds(FEATURED).map((f) => `<tr><th>#${esc(f.id)}</th><td>${esc(f.name)} <span class="tagl">${esc(f.status)}</span>${f.note ? `<div class="note">${esc(f.note)}</div>` : ''}</td></tr>`).join('')}</table>
        <h3>Unnumbered</h3><ul>${UNNUMBERED.map((u) => `<li><b>${esc(u.name)}</b> — ${esc(u.note)}</li>`).join('')}</ul>
        ${ARCHIVE_CARDS.map((c) => `<div class="card"><h4>${esc(c.title)}</h4><p>${esc(c.body)}</p></div>`).join('')}`;
    } else if (tab === 'notes') {
      const L = this.view.exp.landmarks;
      body = `<p class="ro">Creek League field notes. Separate from the tycoon map and from the player’s simulated production.</p>
        <h3>Expedition and inventory count</h3><ul>${FIELD_NOTES.expedition.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <h3>Places</h3>${FIELD_NOTES.places.map((p) => `<div class="card"><h4>${esc(p.name)}</h4><p>${esc(p.text)}</p></div>`).join('')}
        <h3>Landmarks in the game world</h3><table class="rec">${L.map((l) => `<tr class="${focus === l.id ? 'hl' : ''}"><th>${esc(l.name)}</th><td>${l.unmapped ? '<span class="tagl">Unmapped</span> ' : '<span class="tagl">Approximate placement</span> '}${esc(l.note)}</td></tr>`).join('')}</table>
        <h3>Other confirmed names</h3><ul>${FIELD_NOTES.otherNames.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        <p><button data-fm="whole">Open the north-up field map</button></p>`;
    } else if (tab === 'records') {
      const rows = STARTS.map((st, k) => { const rs = g.routeStats[k]; const site = g.sites[k]; return site.open || rs.n ? `<tr><th>${esc(st.name)}</th><td>${rs.n} finishes · avg ${rs.n ? rs.avg.toFixed(1) + ' s' : '—'} · best ${rs.best ? rs.best.toFixed(1) + ' s' : '—'} · revenue ${fmt(site.stats.revenue)}</td></tr>` : ''; }).join('');
      const ncn = g.sites.filter((s) => s.open && (s.ncnMade || s.owned.has('ncnStamp'))).map((s) => `<tr><th>${esc(STARTS[SITE_INDEX[s.id]].name)}</th><td>NCN batch ${s.ncnBatch}: ${s.ncnMade} made, ${s.ncnFinished} finished</td></tr>`).join('');
      body = `<p class="ro">Your simulated production. These records never change the historical archive; a lost factory ball creates no RIP entry.</p>
        <h3>Network</h3><table class="rec"><tr><th>Best sustained cash</th><td>${fmtK(g.bestCpm)}/min (2-minute window)</td></tr><tr><th>Totals</th><td>${g.stats.made} made · ${g.stats.launched} launched · ${g.stats.finished} finished · ${g.stats.lost} lost · ${fmt(g.stats.paid)} paid</td></tr>
        <tr><th>Milestones</th><td>First Upper Gorge finish: ${g.records.gorgeFirst ? 'yes' : '—'} · First Cold Spring Headwaters finish: ${g.records.headFirst ? 'yes' : '—'}</td></tr>
        <tr><th>Finishes by recipe</th><td>${RECIPES.map((r, i) => `${r.name} ${g.records.finishesByRecipe[i] || 0}`).join(' · ')}</td></tr></table>
        <h3>By launch site</h3><table class="rec">${rows}</table>
        ${ncn ? `<h3>New Creek Nation batches</h3><table class="rec">${ncn}</table>` : ''}`;
    } else if (tab === 'orders') { this.closeModal(); this.showPanel('orders'); this.setPanel(true); return; }
    this.openModal(`<h2>Finish station</h2>${tabs}<div class="mscroll">${body}</div>`);
  }

  openFieldMap(view = 'whole') {
    const W = 640, H = 520;
    const all = [];
    for (const l of REGIONAL) for (const p of l) all.push(p);
    const fieldPts = [];
    for (const f of FIELD) { if (f.type === 'Point') fieldPts.push(f.coords); else for (const p of f.coords) fieldPts.push(p); }
    const pts = view === 'whole' ? all : fieldPts;
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const [x, y] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const pad = view === 'whole' ? 0.01 : 0.0012;
    x0 -= pad; x1 += pad; y0 -= pad; y1 += pad;
    const kx = Math.cos(((y0 + y1) / 2) * Math.PI / 180);
    const sc = Math.min((W - 20) / ((x1 - x0) * kx), (H - 20) / (y1 - y0));
    const X = (x) => 10 + (x - x0) * kx * sc, Y = (y) => H - 10 - (y - y0) * sc;
    const path = (cs) => cs.map(([x, y], i) => `${i ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`).join('');
    let svg = `<svg viewBox="0 0 ${W} ${H}" class="fmap" role="img" aria-label="North-up field map">`;
    svg += `<rect width="${W}" height="${H}" class="fm-bg"/>`;
    for (const l of REGIONAL) svg += `<path d="${path(l)}" class="fm-main"/>`;
    for (const f of FIELD) {
      if (view === 'whole') break; // the whole-creek view shows only the reach box
      if (f.type === 'Polygon') svg += `<path d="${path(f.coords)}Z" class="fm-area" style="stroke:${f.stroke}"><title>${esc(f.name)}</title></path>`;
      else if (f.type === 'LineString') svg += `<path d="${path(f.coords)}" class="fm-line ${f.key === 'shelf-line' ? 'dash' : ''}" style="stroke:${f.stroke}"><title>${esc(f.name)}</title></path>`;
    }
    for (const f of FIELD) {
      if (f.type !== 'Point') continue;
      const [x, y] = f.coords;
      if (view === 'whole') continue;
      if (f.group === 'photo') svg += `<g class="fm-pin"><circle cx="${X(x)}" cy="${Y(y)}" r="8"/><text x="${X(x)}" y="${Y(y) + 4}">${esc(f.code)}</text><title>${esc(f.name)} — camera viewpoint</title></g>`;
      else svg += `<g><circle cx="${X(x)}" cy="${Y(y)}" r="4" class="fm-pt" style="fill:${f.stroke}"/>${view !== 'whole' ? `<text x="${X(x) + 7}" y="${Y(y) + 4}" class="fm-lab">${esc(f.name)}</text>` : ''}<title>${esc(f.name)}</title></g>`;
    }
    if (view === 'whole') {
      const cx = (fieldPts.reduce((a, p) => a + p[0], 0) / fieldPts.length), cy = (fieldPts.reduce((a, p) => a + p[1], 0) / fieldPts.length);
      svg += `<rect x="${X(cx) - 7}" y="${Y(cy) - 9}" width="14" height="18" class="fm-box"/><text x="${X(cx) + 12}" y="${Y(cy) + 4}" class="fm-lab">Creek Rolling reach</text>`;
    } else {
      const far = FIELD.find((f) => f.key === 'farlands');
      if (far) { const [x, y] = far.coords[Math.floor(far.coords.length / 2)]; svg += `<text x="${X(x)}" y="${Y(y) - 14}" class="fm-lab gold">↑ Farlands continue</text>`; }
    }
    svg += `<text x="${W - 26}" y="28" class="fm-n">N</text><path d="M${W - 21},34 l-6,14 l6,-4 l6,4z" class="fm-arrow"/></svg>`;
    const list = FIELD.map((f) => `<tr><th>${f.code ? esc(f.code) + ' · ' : ''}${esc(f.name)}</th><td>${esc(f.accuracy || '')}${f.note ? `<div class="note">${esc(f.note)}</div>` : ''}</td></tr>`).join('');
    this.openModal(`<h2>Arroyo Trabuco field map (north up)</h2>
      <div class="mtabs"><button data-fm="whole" class="${view === 'whole' ? 'on' : ''}">Whole creek</button><button data-fm="reach" class="${view === 'reach' ? 'on' : ''}">Creek Rolling reach</button><button data-mtab="notes">Field notes</button></div>
      <div class="mscroll">${svg}
      <p class="hint">Blue: USGS National Hydrography Dataset main channel (simplified). Coloured shapes: the creator’s approximate traces and estimates. Lettered pins are photo camera viewpoints (A shelf climb view, B deep-pool scene, C taped sign, D flat rock slab), kept separate from the features they show. The trail-entrance finish is unpinned. Never the San Juan Creek confluence.</p>
      <table class="rec">${list}</table></div>`);
  }

  // ------------------------------------------------------------------ per-frame
  update(dt) {
    const g = this.game, el = this.el, v = this.view;
    el.cash.textContent = fmt(g.cash);
    el.cpm.textContent = fmtK(g.cashPerMin(60));
    el.queued.textContent = g.hopperTotal();
    el.rolling.textContent = g.ballsRolling();
    const subs = [];
    subs.push(`Paid ${fmtK(g.stats.paid)} · ${g.stats.finished} finished · ${g.stats.lost} lost`);
    const na = g.nextArrival();
    if (na !== null && !(g.lastFinish && g.t - g.lastFinish.t < 6) && na > 1.5) subs.push(`First ball in ~${Math.ceil(na)} s`);
    if (g.bestCpm > 0) subs.push(`Best sustained ${fmtK(g.bestCpm)}/min`);
    const site = g.site;
    subs.push(`<span class="selsite">${esc(STARTS[g.sel].name)}</span>${site.reason ? ` · <span class="why">${esc(site.reason)}</span>` : ''}`);
    if (g.owned.has('pressureAlerts')) { const a = g.pressureAlert(); if (a) subs.push(`<span class="alert" data-alert-s="${a.s}">⚠ ${esc(a.text)}</span>`); }
    el.sub.innerHTML = subs.map((x) => `<div>${x}</div>`).join('');
    const alertEl = el.sub.querySelector('[data-alert-s]');
    if (alertEl && !alertEl._bound) { alertEl._bound = true; alertEl.addEventListener('click', () => { v.panMapTo(+alertEl.dataset.alertS); this.syncMode(); }); }
    // roll button
    const rk = this.rollSite();
    const rs = rk !== null ? g.sites[rk] : null;
    const cd = rs ? rs.manualCD / MANUAL_COOLDOWN : 1;
    const C = 2 * Math.PI * 46;
    el.rollProg.style.strokeDasharray = `${C}`;
    el.rollProg.style.strokeDashoffset = `${C * Math.min(1, cd)}`;
    el.roll.classList.toggle('cool', cd > 0 || rk === null);
    el.rollSub.textContent = rk === null ? 'Walk to a factory' : (rs.hopper.length + rs.post.length) ? `${STARTS[rk].name}: release a queued ball` : `${STARTS[rk].name}: make one · $${g.payoutFor(rk)}`;
    // interaction prompt
    const it = v.nearestInteractable();
    if (it && v.mode === 'fp') { el.prompt.classList.remove('hidden'); el.prompt.textContent = `${this.touch ? 'Tap E' : 'E'} — ${it.label}`; }
    else el.prompt.classList.add('hidden');
    el.fade.style.opacity = v.player.fade;
    // status chips anchored to the selected factory and the finish
    const ws = v.workshops.get(g.sel);
    const anchors = { press: ws && ws.pressWorld(), feeder: ws && ws.feederWorld(), creek: v.finish.slots[0] };
    const msgs = { press: site.pressStatus, feeder: site.feederStatus, creek: g.status.creek };
    for (const k of Object.keys(msgs)) {
      let d = this.statusEls[k];
      if (!d) { d = document.createElement('div'); d.className = 'status hidden'; el.status.appendChild(d); this.statusEls[k] = d; }
      const m = msgs[k];
      const show = m && m !== 'Paused' && anchors[k] && v.mode !== 'map';
      if (!show) { d.classList.add('hidden'); continue; }
      const p = v.project(anchors[k], {});
      if (!p.visible) { d.classList.add('hidden'); continue; }
      d.classList.remove('hidden');
      d.textContent = m;
      d.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -100%)`;
    }
    for (const l of this.labels) {
      if (!l.alive) continue;
      l.t += dt;
      if (l.t > l.life) { l.alive = false; l.d.style.opacity = 0; continue; }
      const p = v.project(l.p, {});
      l.d.style.opacity = p.visible ? String(1 - (l.t / l.life) ** 2) : 0;
      l.d.style.transform = `translate(${p.x}px, ${p.y - l.t * 40}px) translate(-50%, -100%)`;
    }
    if (v.mode === 'map') this.updateMap(); else this.el.mapLabels.innerHTML = '';
    this.updateBallDetail();
    // panels
    if (!this.el.panel.classList.contains('hidden')) {
      if (this.panel === 'shop') this.renderShop();
      else if (this.panel === 'sites') this.renderSites();
      else if (this.panel === 'network') this.renderNetwork();
      else if (this.panel === 'orders') this.renderOrders();
    }
  }

  updateBallDetail() {
    const v = this.view, g = this.game;
    const id = v.mode === 'follow' ? v.rig.follow : null;
    const b = id != null ? g.phys.balls.find((x) => x.id === id) : null;
    if (!b) { this.el.balldetail.classList.add('hidden'); return; }
    this.el.balldetail.classList.remove('hidden');
    const key = `${b.id}|${b.cpi}|${Math.floor(b.age)}`;
    if (this.bdKey === key) return;
    this.bdKey = key;
    const recipe = RECIPES[b.recipe || 0];
    this.el.balldetail.innerHTML = `<div class="bdh">Factory ball #${b.id}${b.ncn ? ` · NCN-${String(b.ncn).padStart(5, '0')}` : ''}</div>
      <div>Made at ${esc(STARTS[b.site ?? b.start].name)} · launched from ${esc(STARTS[b.start].name)}</div>
      <div>${esc(recipe.name)} · pays ${fmt(b.payout)}${b.orderId ? ' (incl. order bonus)' : ''}</div>
      <div>${b.cps.length ? `Checkpoints ${b.cpi}/${b.cps.length} · ` : ''}${b.age.toFixed(0)} s rolling</div>
      ${b.replica ? `<div class="rep">Replica stencil: ${esc(b.replica)} — a cosmetic marking, not a recovered original</div>` : ''}
      <button id="bdBack">Back to where I was</button>`;
    $('#bdBack').addEventListener('click', () => { v.returnToPlayer(); this.syncMode(); });
  }

  updateMap() {
    const v = this.view, g = this.game, cr = g.creek;
    // reach list with live delay and congestion
    const key = g.reachStats.map((r) => r.count).join(',') + '|' + Math.floor(g.t / 2);
    if (key !== this.reachKey) {
      this.reachKey = key;
      const delays = this.reachDelays();
      this.el.reachList.innerHTML = `<div class="rlh">Reaches (downstream first)</div>` + REACHES.map((R, r) => {
        const S = g.reachStats[r];
        const ratio = S.count / g.reachCap(r);
        const open = STARTS.some((st, k) => g.sites[k].open && st.s < R.s1);
        return `<div class="rl ${ratio >= 0.9 ? 'hot' : ratio > 0.6 ? 'warm' : ''} ${open ? '' : 'dim'}" data-reach="${r}"><span>${esc(R.name)}</span><span>${S.count}/${g.reachCap(r)}${delays[r] !== null ? ` · ${delays[r] >= 0 ? '+' : ''}${delays[r].toFixed(1)} s` : ''}</span></div>`;
      }).join('');
    }
    // labels over the world
    const items = [];
    if (this.layers.tycoon) {
      STARTS.forEach((st, k) => {
        const site = g.sites[k];
        const ch = st.cr && cr.springs ? cr.springs : cr, ls = ch.siteS(st);
        const q = ch.worldXZ(ls, ch.c(ls) + ch.wR(ls) + 1.0);
        const p = { x: q.x, y: Math.max(ch.bedH(ls, ch.c(ls) + ch.wR(ls) + 1.0), ch.y0(ls)) + 0.4, z: q.z };
        const status = site.open ? (site.reason ? site.reason : `${site.stats.launched} launched · ${site.hopper.length + site.post.length} queued`) : g.unlockable(k) ? `for sale ${fmtK(st.cost)}` : 'locked';
        items.push({ key: 's' + k, p, html: `<div class="ml site ${site.open ? 'open' : ''} ${k === g.sel ? 'sel' : ''} ${st.layer === 'game' ? 'game' : ''}" data-site="${k}"><b>${esc(st.name)}</b><small>${esc(status)}</small></div>` });
      });
    }
    if (this.layers.field) {
      for (const L of v.exp.landmarks) {
        if (L.unmapped) continue;
        items.push({ key: 'f' + L.id, p: { x: L.x, y: L.y + 0.2, z: L.z }, html: `<div class="ml note" data-note="${L.id}">◆ ${esc(L.name)} <small>approx.</small></div>` });
      }
      const drawP = v.worldAt(327.8, 1.4, 1.5);
      items.push({ key: 'draft', p: drawP, html: `<div class="ml draftlab">⬇ Folk Draft (downdraft)</div>` });
      const rc = cr.springs || cr, rq = rc.worldXZ(58.6, rc.c(58.6) + 1.4);
      const rotP = { x: rq.x, y: rc.y0(58.6) + 0.3, z: rq.z };
      items.push({ key: 'rot', p: rotP, html: `<div class="ml rotlab">Code Rot observations (strongest)</div>` });
    }
    const seen = new Set();
    const placed = [];
    const prio = (it) => (it.key === 's' + g.sel ? 0 : it.key[0] === 's' && g.sites[+it.key.slice(1)].open ? 1 : it.key[0] === 'f' ? 2 : 3);
    items.sort((a, b) => prio(a) - prio(b));
    for (const it of items) {
      seen.add(it.key);
      let d = this.mapLabels.get(it.key);
      if (!d) { d = document.createElement('div'); d.className = 'mlw'; this.el.mapLabels.appendChild(d); this.mapLabels.set(it.key, d); }
      if (d._html !== it.html) { d.innerHTML = it.html; d._html = it.html; d.style.display = ''; d._w = d.offsetWidth; d._h = d.offsetHeight; }
      const pr = v.project(it.p, {});
      // declutter: a label that would overlap a more important one stays hidden
      const r = { x0: pr.x - d._w / 2, x1: pr.x + d._w / 2, y0: pr.y - d._h, y1: pr.y };
      const hit = placed.some((q) => r.x0 < q.x1 && r.x1 > q.x0 && r.y0 < q.y1 && r.y1 > q.y0);
      const show = pr.visible && !hit;
      if (show) placed.push(r);
      d.style.display = show ? '' : 'none';
      d.style.transform = `translate(${pr.x}px, ${pr.y}px) translate(-50%, -100%)`;
    }
    for (const [k, d] of this.mapLabels) if (!seen.has(k)) { d.remove(); this.mapLabels.delete(k); }
  }

  reachDelays() {
    const g = this.game;
    const out = REACHES.map(() => null);
    if (!g.owned.has('flowMonitor')) return out;
    // average excess time per reach from recent split timings
    const sum = REACHES.map(() => [0, 0]);
    for (const sp of g.splits) for (const part of sp.parts) {
      const r = REACHES.findIndex((R) => (part.s0 + part.s1) / 2 >= R.s0 && (part.s0 + part.s1) / 2 < R.s1);
      if (r < 0) continue;
      sum[r][0] += part.t; sum[r][1]++;
    }
    return sum.map(([t, n], r) => (n ? t / n - (REACHES[r].s1 - REACHES[r].s0) / 1.15 : null));
  }

  // ------------------------------------------------------------------ shop
  renderShop() {
    const g = this.game;
    const k = g.sel;
    const sug = g.suggestions();
    const list = UPGRADES.filter((u) => u.tab === this.tab);
    const key = this.tab + '|' + k + '|' + list.map((u) => {
      const c = g.canBuy(u.id, k);
      return u.id + (g.has(u.id, k) ? 'o' : c.ok ? 'y' : c.avail ? 'a' + Math.floor((g.cash / u.price) * 20) : 'n' + (c.why || '')) + (sug[u.id] || '');
    }).join(',') + '|' + this.focusId + Object.keys(sug).join('');
    document.querySelectorAll('#shop .tabs button').forEach((b) => {
      const n = UPGRADES.filter((u) => u.tab === b.dataset.tab && g.canBuy(u.id, k).ok).length;
      const s = UPGRADES.filter((u) => u.tab === b.dataset.tab && sug[u.id]).length;
      b.dataset.badge = s ? '!' : n ? String(n) : '';
    });
    if (key === this.shopKey) return;
    this.shopKey = key;
    const siteTab = list.some((u) => isSiteUpgrade(u.id));
    const openSites = g.openSites();
    this.el.target.innerHTML = siteTab ? `<div class="targ">Factory upgrades are bought for one site: <select id="targetSel">${openSites.map((j) => `<option value="${j}" ${j === k ? 'selected' : ''}>${esc(STARTS[j].name)}</option>`).join('')}</select></div>` : '';
    this.el.items.innerHTML = list.map((u) => {
      const owned = g.has(u.id, k);
      const c = g.canBuy(u.id, k);
      const reqs = [...u.requires.map((r) => UPGRADE_BY_ID[r].name), ...(u.requiresGlobal || []).map((r) => UPGRADE_BY_ID[r].name), ...(u.area ? [STARTS[SITE_INDEX[u.area]].name] : [])];
      const status = owned ? '<span class="own">Installed ✓</span>'
        : c.ok ? `<button data-buy="${u.id}">Buy ${fmt(u.price)}</button>`
        : c.avail ? `<button data-buy="${u.id}" disabled>${fmt(u.price)}</button><div class="bar"><i style="width:${Math.min(100, (g.cash / u.price) * 100)}%"></i></div>`
        : `<span class="lock">🔒 ${esc(c.why || '')}</span>`;
      const cls = ['item', owned ? 'owned' : '', !owned && !c.ok && !c.avail ? 'locked' : '', sug[u.id] && !owned ? 'sug' : '', this.focusId === u.id ? 'focus' : '', u.lore ? 'lore' : ''].join(' ');
      let rate = '';
      if (isSiteUpgrade(u.id) && !owned && u.tab === 'factory' && UPGRADE_BY_ID[u.id].requires.every((r) => g.has(r, k) || isSiteUpgrade(r) === false)) {
        const rateOf = (o) => { if (!o.has('press')) return null; const N = factoryNumbers(o); return 60 / Math.max(N.cycle, o.has('feeder') ? N.feeder : 0); };
        const curR = rateOf(g.sites[k].owned), nxtR = rateOf(new Set([...g.sites[k].owned, u.id]));
        const f = (r) => (r === null ? 'hand-rolled' : `${r.toFixed(0)} balls/min`);
        rate = `<div class="rq">At ${esc(STARTS[k].name)}: ${f(curR)} → ${f(nxtR)} (machine limit; the creek can still limit launches)</div>`;
      }
      return `<div class="${cls}" id="item-${u.id}">
        <div class="ih"><span class="nm">${esc(u.name)}${u.lore ? ' <span class="tagl">lore</span>' : ''}</span><span class="pr">${fmt(u.price)}</span></div>
        <div class="ef">${esc(u.effect)}</div>
        ${isSiteUpgrade(u.id) ? `<div class="rq">For: ${esc(STARTS[k].name)} only</div>` : ''}
        ${rate}
        <div class="rq">${reqs.length ? 'Requires: ' + reqs.map(esc).join(', ') : 'No prerequisite'}</div>
        ${sug[u.id] && !owned ? `<div class="sg">Suggested — ${esc(sug[u.id])}</div>` : ''}
        <div class="st">${status}</div>
      </div>`;
    }).join('');
    if (this.focusId) {
      const itEl = document.getElementById('item-' + this.focusId);
      if (itEl) itEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      setTimeout(() => { this.focusId = null; this.shopKey = ''; }, 2500);
    }
  }

  // ------------------------------------------------------------------ sites
  renderSites() {
    const g = this.game;
    const key = [g.sel, Math.floor(g.t * 2), g.cash > 0 ? Math.floor(Math.log10(g.cash + 1) * 10) : 0].join('|');
    if (key === this.sitesKey) return;
    this.sitesKey = key;
    const sched = g.owned.has('batchScheduler');
    let inFlightBy = STARTS.map(() => 0);
    for (const b of g.phys.balls) if (b.state === 'roll' && !b.paid) inFlightBy[b.start]++;
    const tot = { made: 0, launched: 0, finished: 0, lost: 0, queued: 0, transit: 0 };
    for (const s of g.sites) { tot.made += s.stats.made; tot.launched += s.stats.launched; tot.finished += s.stats.finished; tot.lost += s.stats.lost; tot.queued += s.hopper.length + s.post.length; }
    for (const c of g.workshop.carts) tot.transit += c.load ? c.load.length : 0;
    const head = `<div class="sh">Every open site is a permanent factory and keeps running while you walk away or look at another site. Network: ${tot.made} made · ${tot.queued} queued · ${tot.transit} in carts · ${g.ballsRolling()} rolling · ${tot.finished} finished · ${tot.lost} lost.</div>`;
    const html = STARTS.map((st, k) => {
      const site = g.sites[k];
      if (!site.open) {
        const can = g.unlockable(k);
        return `<div class="start locked ${this.focusSite === k ? 'focus' : ''}"><div class="ih"><span class="nm">${esc(st.name)}${st.layer === 'game' ? ' <span class="tagl">game-only</span>' : ''}</span><span class="pr">${fmt(st.base)}/ball</span></div>
          <div class="ef">${esc(st.blurb)}</div><div class="rq">Typical run ${esc(st.target)} · adds its own basic factory line${g.anySite('feeder') ? ' (press + feeder)' : ''}</div>
          <div class="st">${can ? `<button data-unlock="${k}" ${g.cash >= st.cost ? '' : 'disabled'}>Open site ${fmt(st.cost)}</button>` : `<span class="lock">🔒 ${fmt(st.cost)} · after ${esc(STARTS[SITE_INDEX[st.after]].name)}</span>`}</div></div>`;
      }
      const N = g.siteNumbers(k);
      const sel = k === g.sel;
      const rec = RECIPES[site.recipe];
      const pay = g.payoutFor(k);
      const rate = site.owned.has('press') ? 60 / Math.max(N.cycle * (site.recipe === 5 ? 1.15 : 1), site.owned.has('feeder') ? N.feeder : 0) : 0;
      const recipes = RECIPES.map((r, i) => `<option value="${i}" ${i === site.recipe ? 'selected' : ''} ${g.recipeAvailable(i) ? '' : 'disabled'}>${esc(r.name)}${r.pct ? ` (+${Math.round(r.pct * 100)}%)` : ''}${g.recipeAvailable(i) ? '' : ' — ' + esc(STARTS[SITE_INDEX[r.area]].name)}</option>`).join('');
      const ctrl = g.isOpen('springs') ? `<div class="ctrls">
          <label><input type="checkbox" data-en="press" data-k="${k}" ${site.enabled.press ? 'checked' : ''}> Press</label>
          <label><input type="checkbox" data-en="feeder" data-k="${k}" ${site.enabled.feeder ? 'checked' : ''}> Feeder</label>
          <label><input type="checkbox" data-en="release" data-k="${k}" ${site.enabled.release ? 'checked' : ''}> New releases</label>
          <button data-drain="${k}" class="ghost">Drain queue</button>
          ${site.owned.has('shapeGauge') ? `<label><input type="checkbox" data-gauge="${k}" ${site.gauge ? 'checked' : ''}> Shape gauge</label>` : ''}
        </div>` : '';
      const adv = sel ? `<details ${this.advOpen ? 'open' : ''} data-adv="1"><summary>Advanced</summary>
          <div class="qrow">Feeder gap <select data-gap="${k}"><option value="0" ${!site.gap ? 'selected' : ''}>${g.owned.has('autoGap') ? 'Automatic' : 'Machine speed'}</option>${[1, 1.5, 2, 3, 4].map((x) => `<option value="${x}" ${site.gap === x ? 'selected' : ''}>${x} s</option>`).join('')}</select></div>
          ${sched ? `<div class="qrow">Batch queue: ${site.batch.map((b) => `${esc(RECIPES[b.recipe].name)} ${b.made}/${b.count}`).join(' → ') || 'empty'} <select data-bq="${k}">${RECIPES.map((r, i) => g.recipeAvailable(i) ? `<option value="${i}">${esc(r.name)}</option>` : '').join('')}</select> <input type="number" min="1" max="500" value="25" data-bqn="${k}" style="width:4.5em"> <button data-bqadd="${k}" ${site.batch.length >= 3 ? 'disabled' : ''}>Queue</button> <button data-bqclr="${k}" class="ghost">Clear</button></div>` : ''}
          ${site.owned.has('replicaJig') ? `<div class="qrow">Replica stencil <select data-rep="${k}"><option value="">None</option>${REPLICA_NAMES.map((n) => `<option ${site.replica === n ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></div>` : ''}
          ${site.owned.has('ncnStamp') ? `<div class="qrow">NCN batch ${site.ncnBatch}: ${site.ncnMade} made, ${site.ncnFinished} finished <button data-ncnnew="${k}" class="ghost">Start new batch</button></div>` : ''}
        </details>` : '';
      return `<div class="start ${sel ? 'sel' : ''}">
        <div class="ih"><span class="nm">${esc(st.name)}</span><span class="pr">${fmt(pay)}/ball</span></div>
        <div class="rq">${site.owned.has('press') ? `${rate.toFixed(0)} balls/min machine rate` : 'hand-rolled'} · ~${Math.round(g.etaFor(k))} s to finish · ${fmtK(site.stats.revenue)} earned</div>
        <div class="counts"><span>${site.stats.made} made</span><span>${site.hopper.length + site.post.length} waiting</span><span>${site.stats.launched} launched</span><span>${inFlightBy[k]} rolling</span><span>${site.stats.finished} finished</span><span>${site.stats.lost} lost</span></div>
        ${site.reason ? `<div class="why">${esc(site.reason)}</div>` : ''}
        <div class="qrow">Recipe <select data-recipe="${k}">${recipes}</select>${site.changeT > 0 ? ` <span class="why">changeover ${site.changeT.toFixed(1)} s</span>` : ''}</div>
        <div class="rq">${esc(rec.note)} Next ball pays ${fmt(pay)} = ${fmt(st.base)} route${bonusForSpec(g.specFor(k)) ? ` + ${fmt(bonusForSpec(g.specFor(k)))} ball upgrades` : ''}${recipeBonus(st.base, site.recipe) ? ` + ${fmt(recipeBonus(st.base, site.recipe))} recipe` : ''}${rate ? ` · up to ${fmtK(pay * rate)}/min if the creek keeps up` : ''}.</div>
        ${ctrl}
        <div class="st">${sel ? '<span class="own">Selected</span>' : `<button data-select="${k}">Select</button>`} <button data-go="${k}" class="ghost">Walk there</button> <button data-mapto="${k}" class="ghost">Map</button></div>
        ${adv}
      </div>`;
    }).join('');
    this.el.sites.innerHTML = head + html;
  }

  onSitesClick(e) {
    const g = this.game, v = this.view;
    const b = e.target.closest('button');
    if (!b) return;
    this.audio.unlock();
    if (b.dataset.unlock !== undefined) { if (g.unlock(+b.dataset.unlock)) { this.hooks.save(); this.syncMode(); } }
    else if (b.dataset.select !== undefined) g.selectSite(+b.dataset.select);
    else if (b.dataset.go !== undefined) { g.selectSite(+b.dataset.go); if (v.mode !== 'fp') v.returnToPlayer(); v.spawnAt(+b.dataset.go); this.syncMode(); }
    else if (b.dataset.mapto !== undefined) { v.panMapTo(STARTS[+b.dataset.mapto].s); this.syncMode(); }
    else if (b.dataset.drain !== undefined) { const s = g.sites[+b.dataset.drain]; s.enabled.press = false; s.enabled.feeder = true; s.enabled.release = true; this.toast(`Draining ${STARTS[+b.dataset.drain].name}: press paused, queued balls still launch`); }
    else if (b.dataset.bqadd !== undefined) { const k = +b.dataset.bqadd; const r = +this.el.sites.querySelector(`[data-bq="${k}"]`).value; const n = +this.el.sites.querySelector(`[data-bqn="${k}"]`).value; g.queueBatch(k, r, n); }
    else if (b.dataset.bqclr !== undefined) g.sites[+b.dataset.bqclr].batch = [];
    else if (b.dataset.ncnnew !== undefined) { const s = g.sites[+b.dataset.ncnnew]; s.ncnBatch++; s.ncnMade = 0; s.ncnFinished = 0; }
    this.sitesKey = '';
    this.hooks.save();
  }

  onSitesChange(e) {
    const g = this.game, t = e.target;
    if (t.dataset.recipe !== undefined) { if (g.setRecipe(+t.dataset.recipe, +t.value)) this.toast(`Changing recipe to ${RECIPES[+t.value].name} at ${STARTS[+t.dataset.recipe].name}`); }
    else if (t.dataset.en) g.sites[+t.dataset.k].enabled[t.dataset.en] = t.checked;
    else if (t.dataset.gauge !== undefined) g.sites[+t.dataset.gauge].gauge = t.checked;
    else if (t.dataset.gap !== undefined) g.sites[+t.dataset.gap].gap = +t.value;
    else if (t.dataset.rep !== undefined) g.sites[+t.dataset.rep].replica = t.value || null;
    const d = t.closest('details'); if (d) this.advOpen = d.open;
    this.sitesKey = '';
    this.hooks.save();
  }

  // ------------------------------------------------------------------ network
  renderNetwork() {
    const g = this.game;
    const key = Math.floor(g.t) + '|' + [...g.owned].length + '|' + JSON.stringify(g.workshop.routes) + g.splitGate + (g.bench.current ? 1 : 0) + g.bench.windows.length;
    if (key === this.netKey) return;
    this.netKey = key;
    const parts = [];
    // flow monitor
    if (g.owned.has('flowMonitor')) {
      const delays = this.reachDelays();
      let worst = -1, wv = -1;
      g.reachStats.forEach((S, r) => { const v = S.count / g.reachCap(r) + Math.max(0, delays[r] || 0) / 20; if (v > wv) { wv = v; worst = r; } });
      parts.push(`<h3>Flow Monitor</h3><table class="rec">${REACHES.map((R, r) => { const S = g.reachStats[r]; if (!S.count && delays[r] === null) return ''; return `<tr class="${r === worst && S.count ? 'hl' : ''}"><th>${esc(R.name)}</th><td>${S.count} in flight (cap ${g.reachCap(r)})${delays[r] !== null ? ` · avg delay ${delays[r].toFixed(1)} s` : ''}</td></tr>`; }).join('')}</table>${worst >= 0 && g.reachStats[worst].count ? `<p class="why">Holding back the line: ${esc(REACHES[worst].name)}</p>` : ''}`);
    } else parts.push(`<p class="hint">Buy the Flow Monitor (Controls) to see delay and congestion by reach.</p>`);
    if (g.owned.has('pressureAlerts')) { const a = g.pressureAlert(); parts.push(`<h3>Pressure Alerts</h3><p>${a ? `⚠ ${esc(a.text)} <button data-goalert="${a.s}" class="ghost">Show on map</button>` : 'No queue is slowing the line.'}</p>`); }
    if (g.owned.has('splitTimers')) {
      const last = g.splits.filter((s) => s.start === g.sel).slice(-1)[0] || g.splits.slice(-1)[0];
      parts.push(`<h3>Split Timers</h3>${last ? `<p>${esc(STARTS[last.start].name)} → finish, ball #${last.id}: ${last.total.toFixed(1)} s</p><table class="rec">${last.parts.map((p) => `<tr><th>s ${p.s0.toFixed(0)} → ${p.s1.toFixed(0)}</th><td>${p.t.toFixed(1)} s</td></tr>`).join('')}</table>` : '<p>No finishes timed yet.</p>'}`);
    }
    // workshop
    if (g.owned.has('bankWorkshop')) {
      const open = g.openSites();
      const lim = g.routeLimit();
      parts.push(`<h3>Bank Workshop</h3><p class="hint">Carts move owned balls with their original recipe from a factory with surplus to the route’s destination. Shipped so far: ${g.workshop.shipped}. Supply routes: ${lim}.</p>`);
      for (let i = 0; i < lim; i++) {
        const r = g.workshop.routes[i];
        const plan = r ? g.planShipment(i) : null;
        const cart = g.workshop.carts[i];
        parts.push(`<div class="card"><div class="qrow">Route ${i + 1} → <select data-route="${i}"><option value="">—</option>${open.map((k) => `<option value="${k}" ${r && r.dest === k ? 'selected' : ''}>${esc(STARTS[k].name)}</option>`).join('')}</select></div>
          ${plan ? `<div class="rq">Next shipment: ${plan.src !== null ? `${plan.n} balls from ${esc(STARTS[plan.src].name)} · transit ~${plan.eta.toFixed(0)} s` : 'no factory has surplus yet'} · bin space at destination ${plan.space}</div>` : ''}
          ${cart ? `<div class="rq">Cart: ${esc(cart.state)}${cart.load && cart.load.length ? ` with ${cart.load.length} balls` : ''}${cart.wait > 0.5 ? ` · waited ${cart.wait.toFixed(0)} s on the single track` : ''}</div>` : ''}</div>`);
      }
      if (g.owned.has('prioritySwitch')) parts.push(`<div class="qrow">Priority Switch: reserve <select data-prshare>${[0.25, 0.4, 0.5, 0.6, 0.75].map((x) => `<option value="${x}" ${g.workshop.priority.share === x ? 'selected' : ''}>${Math.round(x * 100)}%</option>`).join('')}</select> of shipments for <select data-prsite><option value="">nobody</option>${open.map((k) => `<option value="${k}" ${g.workshop.priority.site === k ? 'selected' : ''}>${esc(STARTS[k].name)}</option>`).join('')}</select></div>`);
    }
    if (g.owned.has('splitGate')) parts.push(`<h3>Splitstone Gate</h3><div class="qrow">${['direct', 'calm', 'balanced'].map((m) => `<button data-gate="${m}" class="${g.splitGate === m ? '' : 'ghost'}">${m[0].toUpperCase() + m.slice(1)}</button>`).join(' ')}</div>`);
    if (g.owned.has('routePresets')) {
      parts.push(`<h3>Route Presets</h3>${g.presets.map((p, i) => `<div class="qrow">Preset ${i + 1}: ${p ? 'saved' : 'empty'} <button data-psave="${i}" class="ghost">Save current</button> ${p ? `<button data-pprev="${i}" class="ghost">Preview</button> <button data-pload="${i}">Restore</button>` : ''}</div>`).join('')}<div id="presetPrev"></div>`);
    }
    if (g.owned.has('efficiencyBench')) {
      const W = g.bench.windows;
      parts.push(`<h3>Efficiency Bench</h3><p>${g.bench.current ? `Measuring since ${(g.t - g.bench.current.t0).toFixed(0)} s ago <button data-bench="stop">Stop window</button>` : '<button data-bench="start">Start a measurement window</button>'}</p>
        ${W.length ? `<table class="rec"><tr><th></th>${W.map((w, i) => `<td><b>Window ${i + 1}</b><br>${w.span.toFixed(0)} s · ${esc(STARTS[w.site].name)} selected</td>`).join('')}</tr>
          <tr><th>Finish rate</th>${W.map((w) => `<td>${w.finishRate.toFixed(1)}/min</td>`).join('')}</tr><tr><th>Escape rate</th>${W.map((w) => `<td>${(w.escapeRate * 100).toFixed(1)}%</td>`).join('')}</tr>
          <tr><th>Average delay</th>${W.map((w) => `<td>${w.avgDelay.toFixed(1)} s</td>`).join('')}</tr><tr><th>Cash per minute</th>${W.map((w) => `<td>${fmtK(w.cpm)}</td>`).join('')}</tr></table>` : ''}`);
    }
    if (g.owned.has('springsSampler')) {
      const rot = g.lossBySpot.codeRot || 0;
      const stallsRot = g.stallLog.filter(([, s, , c]) => c === 1 && s > 57.6 && s < 60.4).length;
      const stallsSpr = g.stallLog.filter(([, s, , c]) => c === 1).length;
      parts.push(`<h3>Springs Bank Sampler</h3><table class="rec"><tr><th>Code Rot observations</th><td>${stallsRot} recent delays in the Code Rot pocket · ${rot} balls lost there (simulated)</td></tr><tr><th>Normal current</th><td>${stallsSpr - stallsRot} recent stalls elsewhere in the Springs</td></tr><tr><th>Draft exposure</th><td>${g.stats.draftCatch} balls dropped into the lower catch area below the Shelf</td></tr></table><p class="hint">Simulated readings for the game’s Springs reach. They make no claim about the real creek or its crayfish.</p>`);
    } else if (g.owned.has('draftRibbon')) parts.push(`<h3>Shelf Draft Ribbon</h3><p>${g.stats.draftCatch} balls have dropped into the lower catch area below the Shelf.</p>`);
    const T = g.trial;
    if (T) {
      const u = UPGRADE_BY_ID[T.id];
      parts.push(`<h3>Before / after: ${esc(u.name)}${T.site !== null ? ` at ${esc(STARTS[T.site].name)}` : ''}</h3>${T.after ? `<table class="rec"><tr><th></th><td>Before (last ${T.before.span.toFixed(0)} s)</td><td>After (${T.after.span.toFixed(0)} s)</td></tr><tr><th>Cash/min</th><td>${fmtK(T.before.cpm)}</td><td>${fmtK(T.after.cpm)}</td></tr><tr><th>Finishes/min</th><td>${T.before.bpm.toFixed(1)}</td><td>${T.after.bpm.toFixed(1)}</td></tr><tr><th>Escape rate</th><td>${(T.before.escapeRate * 100).toFixed(1)}%</td><td>${(T.after.escapeRate * 100).toFixed(1)}%</td></tr></table><p class="hint">Measured on the whole network. Use the Efficiency Bench for controlled comparisons.</p>` : `<p>Measuring… ${(g.t - T.t0).toFixed(0)} s, ${g.stats.finished - T.startFin} finishes so far (needs 90 s and 15 finishes).</p>`}`);
    }
    this.el.network.innerHTML = parts.join('');
  }

  onNetworkClick(e) {
    const g = this.game, v = this.view;
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.gate) g.splitGate = b.dataset.gate;
    else if (b.dataset.psave !== undefined) g.savePreset(+b.dataset.psave);
    else if (b.dataset.pprev !== undefined) { const d = g.presetDiff(+b.dataset.pprev); $('#presetPrev').innerHTML = d.length ? `<ul>${d.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '<p>No changes: matches the current settings.</p>'; return; }
    else if (b.dataset.pload !== undefined) { g.loadPreset(+b.dataset.pload); this.toast('Preset restored'); }
    else if (b.dataset.bench === 'start') g.startBenchWindow();
    else if (b.dataset.bench === 'stop') g.stopBenchWindow();
    else if (b.dataset.goalert !== undefined) { v.panMapTo(+b.dataset.goalert); this.syncMode(); }
    this.netKey = '';
    this.hooks.save();
  }

  onNetworkChange(e) {
    const g = this.game, t = e.target;
    if (t.dataset.route !== undefined) { if (t.value !== '') g.setRoute(+t.dataset.route, +t.value); }
    else if (t.dataset.prshare !== undefined) g.workshop.priority.share = +t.value;
    else if (t.dataset.prsite !== undefined) g.workshop.priority.site = t.value === '' ? null : +t.value;
    this.netKey = '';
    this.hooks.save();
  }

  // ------------------------------------------------------------------ orders
  renderOrders() {
    const g = this.game;
    const o = g.order;
    const key = (o ? `${o.uid}:${o.paid}:${o.reserved}` : '-') + '|' + g.orderLog.length + '|' + g.openSites().length + '|' + this.twoPostPick.join(',');
    if (key === this.ordersKey) return;
    this.ordersKey = key;
    if (!g.isOpen('springs')) { this.el.orders.innerHTML = '<p class="hint">Shipment orders open at Crawfish Springs. They are optional, have no fee and no penalty.</p>'; return; }
    let html = '<p class="hint">One order at a time, accepted at the finish station. The bonus is reserved when a qualifying ball launches and paid only when it finishes; balls already rolling keep their payout. Lost balls free their slot.</p>';
    if (o) {
      const def = ORDERS.find((x) => x.id === o.id);
      html += `<div class="card sel"><h4>${esc(def.name)}</h4><p>${esc(def.text)} · ${fmt(def.bonus)} per finish</p>
        <div class="bar big"><i style="width:${(o.paid / o.target) * 100}%"></i><i class="res" style="width:${(o.reserved / o.target) * 100}%"></i></div>
        <p>${o.paid}/${o.target} paid · ${o.reserved} reserved in flight · ${fmt(o.earned)} earned${o.twoPosts ? ` · ${o.posts.map((k) => `${esc(STARTS[k].name)} ${o.perPost[k] || 0}`).join(', ')}` : ''}</p>
        <button data-cancel="1" class="ghost">Cancel order</button></div>`;
    }
    html += ORDERS.map((def) => {
      if (!g.orderOpen(def)) return `<div class="item locked"><div class="ih"><span class="nm">${esc(def.name)}</span><span class="pr">${fmt(def.bonus)}/ball</span></div><div class="rq">Opens with ${esc(STARTS[SITE_INDEX[def.opens]].name)}</div></div>`;
      const done = g.orderLog.filter((x) => x.id === def.id && x.done).length;
      const picker = def.twoPosts && !o ? `<div class="qrow">Posts: ${g.openSites().map((k) => `<label><input type="checkbox" data-post="${k}" ${this.twoPostPick.includes(k) ? 'checked' : ''}> ${esc(STARTS[k].name)}</label>`).join(' ')}</div>` : '';
      return `<div class="item"><div class="ih"><span class="nm">${done ? '✓ ' : ''}${esc(def.name)}</span><span class="pr">${fmt(def.bonus)}/ball</span></div><div class="ef">${esc(def.text)}. Target ${def.target}.</div>${picker}<div class="st">${o ? '' : `<button data-accept="${def.id}">Accept</button>`}</div></div>`;
    }).join('');
    const hist = g.orderLog.slice(-6).reverse().map((x) => `<li>${x.done ? '✓' : '✕'} ${esc(ORDERS.find((d) => d.id === x.id).name)}: ${x.paid} paid, ${fmt(x.earned)}${x.reserved ? ` · ${x.reserved} still reserved in flight` : ''}</li>`).join('');
    if (hist) html += `<h3>Recent orders</h3><ul>${hist}</ul>`;
    this.el.orders.innerHTML = html;
    this.el.orders.querySelectorAll('[data-post]').forEach((cb) => cb.addEventListener('change', () => {
      const k = +cb.dataset.post;
      this.twoPostPick = cb.checked ? [...this.twoPostPick.filter((x) => x !== k), k].slice(-2) : this.twoPostPick.filter((x) => x !== k);
      this.ordersKey = '';
    }));
  }

  onOrdersClick(e) {
    const g = this.game;
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.accept) {
      const def = ORDERS.find((x) => x.id === b.dataset.accept);
      if (def.twoPosts && this.twoPostPick.length !== 2) { this.toast('Pick two launch sites for Two-Post Service first'); return; }
      if (g.acceptOrder(def.id, def.twoPosts ? this.twoPostPick.slice() : null)) this.toast(`Accepted: ${def.name}`);
    } else if (b.dataset.cancel) g.cancelOrder();
    this.ordersKey = '';
    this.hooks.save();
  }
}

export { TROUBLE_SPOTS, S_FINISH };
