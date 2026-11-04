// HTML overlay: HUD, Make & Roll button, shop, launch points, camera & settings.
import { STARTS, UPGRADES, UPGRADE_BY_ID, TABS, MANUAL_COOLDOWN, specFromOwned, bonusForSpec } from './core/config.js';

const $ = (sel, root = document) => root.querySelector(sel);
const fmt = (n) => '$' + Math.floor(n).toLocaleString('en-US');
const fmtK = (n) => (n >= 10000 ? '$' + (n / 1000).toFixed(n >= 100000 ? 0 : 1) + 'k' : fmt(n));

export class UI {
  constructor(game, view, audio, hooks) {
    this.game = game; this.view = view; this.audio = audio; this.hooks = hooks;
    this.tab = 'factory';
    this.shopKey = ''; this.startKey = '';
    this.labels = [];
    this.lostT = 0;
    this.focusId = null;
    this.build();
  }

  build() {
    const root = $('#ui');
    root.innerHTML = `
      <div id="hud">
        <div class="cash" id="cash">$0</div>
        <div class="chips">
          <span class="chip" title="Cash earned per minute over the last 60 s"><b id="cpm">$0</b>/min</span>
          <span class="chip" title="Balls waiting in the hopper"><b id="queued">0</b> queued</span>
          <span class="chip" title="Balls rolling down the creek"><b id="rolling">0</b> rolling</span>
        </div>
        <div class="sub" id="sub"></div>
      </div>
      <div id="topright">
        <div class="btnrow">
          <button data-cam="home" title="Back to the operation (H)">Home</button>
          <button data-cam="overview" title="Overhead view of the whole creek (O)">Overview</button>
          <button data-cam="bench" title="Workbench close-up (B)">Bench</button>
          <button data-cam="finish" title="Jump to the finish gate (G)">Finish</button>
          <button data-cam="follow" title="Follow a ball from release to the basket (F)">Follow</button>
          <button data-cam="close" title="Close follow camera to watch the seam turn (C)">Close-up</button>
          <button id="gear" title="Settings">⚙</button>
        </div>
        <div id="settings" class="hidden">
          <label><input type="checkbox" id="optSound"> Sound</label>
          <label><input type="checkbox" id="optAuto"> Automation running</label>
          <div class="qrow">Graphics
            <select id="optQuality"><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select>
          </div>
          <div class="hint">Drag to pan · right-drag / two fingers to orbit · wheel / pinch to zoom · click a ball to follow it · Space to roll</div>
          <button id="reset" class="danger">Reset save…</button>
        </div>
      </div>
      <div id="panel">
        <div class="ptabs">
          <button class="ptab on" data-panel="shop">Shop</button>
          <button class="ptab" data-panel="starts">Launch points</button>
          <button class="ptab collapse" id="collapse" title="Hide panel">▸</button>
        </div>
        <div id="shop">
          <div class="tabs">${TABS.map((t) => `<button data-tab="${t.id}" class="${t.id === 'factory' ? 'on' : ''}">${t.name}</button>`).join('')}</div>
          <div id="items"></div>
        </div>
        <div id="starts" class="hidden"></div>
      </div>
      <button id="openPanel" class="hidden">Shop</button>
      <div id="rollWrap">
        <button id="roll"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" class="track"/><circle cx="50" cy="50" r="46" class="prog" id="rollProg"/></svg>
          <span class="t1">Make &amp; Roll</span><span class="t2" id="rollSub">Space</span></button>
      </div>
      <div id="toasts"></div>
      <div id="labels"></div>
      <div id="status"></div>
    `;
    this.el = {
      cash: $('#cash'), cpm: $('#cpm'), queued: $('#queued'), rolling: $('#rolling'), sub: $('#sub'),
      items: $('#items'), starts: $('#starts'), roll: $('#roll'), rollProg: $('#rollProg'), rollSub: $('#rollSub'),
      toasts: $('#toasts'), labels: $('#labels'), status: $('#status'), panel: $('#panel'),
    };
    // status chips anchored to equipment
    this.statusEls = {};
    for (const k of ['press', 'feeder', 'creek']) {
      const d = document.createElement('div');
      d.className = 'status hidden';
      this.el.status.appendChild(d);
      this.statusEls[k] = d;
    }
    // roll
    const roll = () => { this.audio.unlock(); const r = this.game.manualRoll(); if (r === 'moving') this.toast('Workbench is moving — launches resume on arrival'); };
    this.el.roll.addEventListener('click', roll);
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (e.code === 'Space') { e.preventDefault(); roll(); }
      else if (e.key === 'h') this.view.homeView();
      else if (e.key === 'o') this.view.overview();
      else if (e.key === 'b') this.view.benchView();
      else if (e.key === 'g') this.view.finishView();
      else if (e.key === 'f') this.follow(false);
      else if (e.key === 'c') this.follow(true);
    });
    // camera buttons
    root.querySelectorAll('[data-cam]').forEach((b) => b.addEventListener('click', () => {
      this.audio.unlock();
      const k = b.dataset.cam;
      if (k === 'home') this.view.homeView();
      else if (k === 'overview') this.view.overview();
      else if (k === 'bench') this.view.benchView();
      else if (k === 'finish') this.view.finishView();
      else if (k === 'follow') this.follow(false);
      else if (k === 'close') this.follow(true);
    }));
    // settings
    $('#gear').addEventListener('click', () => $('#settings').classList.toggle('hidden'));
    const s = this.game.settings;
    $('#optSound').checked = s.sound; $('#optAuto').checked = s.auto; $('#optQuality').value = s.quality;
    $('#optSound').addEventListener('change', (e) => { s.sound = e.target.checked; this.audio.unlock(); this.audio.setEnabled(s.sound); this.hooks.save(); });
    $('#optAuto').addEventListener('change', (e) => { s.auto = e.target.checked; this.hooks.save(); });
    $('#optQuality').addEventListener('change', (e) => { s.quality = e.target.value; this.view.setQuality(s.quality); this.hooks.save(); });
    $('#reset').addEventListener('click', () => { if (confirm('Erase all progress and start over?')) this.hooks.reset(); });
    // panel tabs
    root.querySelectorAll('.ptab[data-panel]').forEach((b) => b.addEventListener('click', () => this.showPanel(b.dataset.panel)));
    $('#collapse').addEventListener('click', () => this.setPanel(false));
    $('#openPanel').addEventListener('click', () => this.setPanel(true));
    root.querySelectorAll('#shop .tabs button').forEach((b) => b.addEventListener('click', () => { this.tab = b.dataset.tab; this.shopKey = ''; root.querySelectorAll('#shop .tabs button').forEach((x) => x.classList.toggle('on', x === b)); }));
    this.el.items.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-buy]');
      if (!btn) return;
      this.audio.unlock();
      const id = btn.dataset.buy;
      if (this.game.buy(id)) { this.toast(`Installed: ${UPGRADE_BY_ID[id].name}`); this.hooks.save(); this.shopKey = ''; }
    });
    this.el.starts.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-start]');
      if (!b) return;
      this.audio.unlock();
      const k = +b.dataset.start;
      if (b.dataset.act === 'unlock') {
        if (this.game.unlock(k)) { this.toast(`${STARTS[k].name} unlocked — the workbench is on its way upstream`); this.hooks.save(); }
      } else if (this.game.selectStart(k)) { this.toast(`Moving the workbench to ${STARTS[k].name}`); this.hooks.save(); }
      this.startKey = '';
    });
    if (window.innerWidth < 760) this.setPanel(false);
  }

  setPanel(open) {
    this.el.panel.classList.toggle('hidden', !open);
    $('#openPanel').classList.toggle('hidden', open);
    document.body.classList.toggle('panel-open', open);
  }

  showPanel(which) {
    document.querySelectorAll('.ptab[data-panel]').forEach((b) => b.classList.toggle('on', b.dataset.panel === which));
    $('#shop').classList.toggle('hidden', which !== 'shop');
    this.el.starts.classList.toggle('hidden', which !== 'starts');
    this.shopKey = ''; this.startKey = '';
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

  follow(close) {
    const g = this.game;
    let latest = null;
    for (const b of g.phys.balls) if (b.state === 'roll' && !b.paid && (!latest || b.id > latest.id)) latest = b;
    if (latest) this.view.rig.setFollow(latest.id, close);
    else { this.view.followNext = close ? 'close' : 'far'; this.toast('Following the next ball released'); }
  }

  toast(msg, cls = '') {
    const d = document.createElement('div');
    d.className = 'toast ' + cls;
    d.textContent = msg;
    this.el.toasts.appendChild(d);
    setTimeout(() => d.classList.add('out'), 2600);
    setTimeout(() => d.remove(), 3200);
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
    if (e.type === 'finish') this.floatLabel(`+$${e.amount}`, e.x, e.y + 0.1, e.z, 'cash');
    else if (e.type === 'lost') {
      if (g.t - this.lostT > 1.5) { this.lostT = g.t; this.floatLabel(`No finish: ${e.reason}`, e.x, e.y + 0.1, e.z, 'lost'); }
    } else if (e.type === 'milestone' && e.what === 'gorge') this.toast('Milestone: first full run from the Upper Gorge! Now chase your best sustained $/min.', 'big');
    else if (e.type === 'relocated') this.toast(`Workbench set up at ${STARTS[e.k].name}`);
  }

  update(dt) {
    const g = this.game, el = this.el;
    // HUD
    el.cash.textContent = fmt(g.cash);
    el.cpm.textContent = fmtK(g.cashPerMin(60));
    el.queued.textContent = g.hopper.length;
    el.rolling.textContent = g.ballsRolling();
    const subs = [];
    subs.push(`Paid ${fmtK(g.stats.paid)} · ${g.stats.finished} finished · ${g.stats.lost} lost`);
    const na = g.nextArrival();
    const recentFinish = g.lastFinish && g.t - g.lastFinish.t < 6;
    if (na !== null && !recentFinish && na > 1.5) subs.push(`First ball in ~${Math.ceil(na)} s`);
    if (g.bestCpm > 0) subs.push(`Best sustained ${fmtK(g.bestCpm)}/min`);
    if (g.reloc) subs.push(`Moving to ${STARTS[g.reloc.to].name}…`);
    el.sub.innerHTML = subs.map((x) => `<div>${x}</div>`).join('');
    // roll button
    const cd = g.manualCD / MANUAL_COOLDOWN;
    const C = 2 * Math.PI * 46;
    el.rollProg.style.strokeDasharray = `${C}`;
    el.rollProg.style.strokeDashoffset = `${C * cd}`;
    el.roll.classList.toggle('cool', cd > 0 || !!g.reloc);
    el.rollSub.textContent = g.reloc ? 'Moving…' : g.hopper.length ? `Release queued ball (${g.hopper.length})` : `Make one by hand · $${g.payoutFor(g.sel)}`;
    // status chips
    const anchors = { press: this.view.workshop.pressWorld(), feeder: this.view.workshop.feederWorld(), creek: this.view.finish.slots[0] };
    const msgs = { press: g.status.press, feeder: g.status.feeder, creek: g.status.creek };
    for (const k of Object.keys(this.statusEls)) {
      const d = this.statusEls[k];
      const m = msgs[k];
      const show = m && m !== 'Paused' && m !== 'Moving' && anchors[k];
      if (!show) { d.classList.add('hidden'); continue; }
      const p = this.view.project(anchors[k], {});
      if (!p.visible) { d.classList.add('hidden'); continue; }
      d.classList.remove('hidden');
      d.textContent = m;
      d.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -100%)`;
    }
    // floating labels
    for (const l of this.labels) {
      if (!l.alive) continue;
      l.t += dt;
      if (l.t > l.life) { l.alive = false; l.d.style.opacity = 0; continue; }
      const p = this.view.project({ x: l.p.x, y: l.p.y, z: l.p.z, isVector3: true }, {});
      l.d.style.opacity = p.visible ? String(1 - (l.t / l.life) ** 2) : 0;
      l.d.style.transform = `translate(${p.x}px, ${p.y - l.t * 40}px) translate(-50%, -100%)`;
    }
    // shop + starts (re-render when anything relevant changes)
    this.renderShop();
    this.renderStarts();
  }

  renderShop() {
    const g = this.game;
    const sug = g.suggestions();
    const list = UPGRADES.filter((u) => u.tab === this.tab);
    const key = this.tab + '|' + list.map((u) => {
      const c = g.canBuy(u.id);
      return u.id + (g.owned.has(u.id) ? 'o' : c.ok ? 'y' : c.avail ? 'a' + Math.floor((g.cash / u.price) * 20) : 'n' + (c.why || '')) + (sug[u.id] || '');
    }).join(',') + '|' + this.focusId + Object.keys(sug).join('');
    // tab badges
    document.querySelectorAll('#shop .tabs button').forEach((b) => {
      const n = UPGRADES.filter((u) => u.tab === b.dataset.tab && g.canBuy(u.id).ok).length;
      const s = UPGRADES.filter((u) => u.tab === b.dataset.tab && sug[u.id]).length;
      b.dataset.badge = s ? '!' : n ? String(n) : '';
    });
    if (key === this.shopKey) return;
    this.shopKey = key;
    this.el.items.innerHTML = list.map((u) => {
      const owned = g.owned.has(u.id);
      const c = g.canBuy(u.id);
      const reqs = [...u.requires.map((r) => UPGRADE_BY_ID[r].name), ...(u.area !== undefined && u.area > 0 ? [STARTS[u.area].name] : [])];
      const status = owned ? '<span class="own">Installed ✓</span>'
        : c.ok ? `<button data-buy="${u.id}">Buy ${fmt(u.price)}</button>`
        : c.avail ? `<button data-buy="${u.id}" disabled>${fmt(u.price)}</button><div class="bar"><i style="width:${Math.min(100, (g.cash / u.price) * 100)}%"></i></div>`
        : `<span class="lock">🔒 ${fmt(u.price)}</span>`;
      const cls = ['item', owned ? 'owned' : '', !owned && !c.ok && !c.avail ? 'locked' : '', sug[u.id] && !owned ? 'sug' : '', this.focusId === u.id ? 'focus' : ''].join(' ');
      return `<div class="${cls}" id="item-${u.id}">
        <div class="ih"><span class="nm">${u.name}</span><span class="pr">${fmt(u.price)}</span></div>
        <div class="ef">${u.effect}</div>
        <div class="rq">${reqs.length ? 'Requires: ' + reqs.join(', ') : 'No prerequisite'}</div>
        ${sug[u.id] && !owned ? `<div class="sg">Suggested — ${sug[u.id]}</div>` : ''}
        <div class="st">${status}</div>
      </div>`;
    }).join('');
    if (this.focusId) {
      const it = document.getElementById('item-' + this.focusId);
      if (it) it.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      setTimeout(() => { this.focusId = null; this.shopKey = ''; }, 2500);
    }
  }

  lineInterval() {
    const g = this.game, N = g.numbers;
    if (!g.owned.has('feeder')) return g.owned.has('press') ? Math.max(N.press, 2.5) : 2.5;
    return Math.max(N.press, N.feeder, g.owned.has('spacingSensor') ? 0 : 1.25);
  }

  renderStarts() {
    const g = this.game;
    const spec = specFromOwned(g.owned);
    const key = [g.unlocked, g.sel, g.reloc ? g.reloc.to : -1, ...STARTS.map((st, k) => (g.cash >= st.cost ? 1 : 0) + ':' + Math.round(g.etaFor(k))), spec].join(',');
    if (key === this.startKey) return;
    this.startKey = key;
    const bonus = bonusForSpec(spec);
    this.el.starts.innerHTML = `<div class="sh">Every launch point rolls through all the creek below it to the same finish gate.</div>` + STARTS.map((st, k) => {
      const open = k < g.unlocked;
      const isSel = k === g.sel && !g.reloc;
      const moving = g.reloc && g.reloc.to === k;
      const eta = g.etaFor(k);
      let act;
      if (open) act = isSel ? '<span class="own">Workbench here</span>' : moving ? '<span class="own">Moving…</span>' : `<button data-start="${k}" ${g.reloc ? 'disabled' : ''}>Move here</button>`;
      else if (k === g.unlocked) act = `<button data-start="${k}" data-act="unlock" ${g.cash >= st.cost ? '' : 'disabled'}>Unlock ${fmt(st.cost)}</button>`;
      else act = `<span class="lock">🔒 ${fmt(st.cost)}</span>`;
      return `<div class="start ${isSel ? 'sel' : ''} ${open ? '' : 'locked'}">
        <div class="ih"><span class="nm">${st.name}</span><span class="pr">${fmt(st.base + bonus)}/ball</span></div>
        <div class="ef">${st.blurb}</div>
        <div class="rq">Time to finish ~${Math.round(eta)} s (target ${st.target}) · ${fmt(((st.base + bonus) * 60) / this.lineInterval())}/min with your current line</div>
        <div class="st">${act}</div>
      </div>`;
    }).join('');
  }
}
