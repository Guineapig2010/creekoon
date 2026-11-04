// Synthesised sound effects (WebAudio) with per-category voice limits.

export class Audio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.voices = {};
    this.last = {};
    this.limits = { wood: [4, 0.04], rock: [5, 0.03], splash: [4, 0.05], finish: [3, 0.06], bump: [3, 0.05], press: [2, 0.1], ui: [2, 0.05], cash: [2, 0.08], arm: [1, 0.3], lost: [1, 0.4] };
  }

  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = this.enabled ? 0.8 : 0;
    this.master.connect(ctx.destination);
    this.comp = ctx.createDynamicsCompressor();
    this.comp.threshold.value = -16;
    this.comp.connect(this.master);
    // noise buffer
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0526;
      d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2;
    }
    this.noise = buf;
    const white = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const wd = white.getChannelData(0);
    for (let i = 0; i < wd.length; i++) wd[i] = Math.random() * 2 - 1;
    this.white = white;
    // ambient creek bed
    this.amb = this.loopNoise(700, 0.6, 0.0);
    this.ambHi = this.loopNoise(2600, 0.8, 0.0);
    this.fall = this.loopNoise(400, 0.4, 0.0);
  }

  loopNoise(freq, q, gain) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noise; src.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); g.gain.value = gain;
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start();
    return { src, f, g };
  }

  setEnabled(on) {
    this.enabled = on;
    if (this.master) this.master.gain.setTargetAtTime(on ? 0.8 : 0, this.ctx.currentTime, 0.05);
  }

  /** Ambience follows how close the camera is to the water and the falls. */
  ambience(nearWater, nearFalls, t) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const wob = 0.85 + 0.15 * Math.sin(t * 0.7) * Math.sin(t * 0.23 + 1);
    this.amb.g.gain.setTargetAtTime(0.16 * nearWater * wob, now, 0.3);
    this.ambHi.g.gain.setTargetAtTime(0.05 * nearWater, now, 0.3);
    this.fall.g.gain.setTargetAtTime(0.3 * nearFalls, now, 0.3);
  }

  allow(cat) {
    if (!this.ctx || !this.enabled) return false;
    const now = this.ctx.currentTime;
    const [max, gap] = this.limits[cat] || [3, 0.05];
    const v = (this.voices[cat] || []).filter((t) => t > now);
    this.voices[cat] = v;
    if (v.length >= max) return false;
    if (now - (this.last[cat] || 0) < gap) return false;
    this.last[cat] = now;
    return true;
  }

  claim(cat, dur) { (this.voices[cat] = this.voices[cat] || []).push(this.ctx.currentTime + dur); }

  burst(cat, { freq = 1000, q = 1, type = 'bandpass', dur = 0.1, vol = 0.3, sweepTo = null, delay = 0, white = false }) {
    const ctx = this.ctx, t0 = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = white ? this.white : this.noise;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(freq, t0); f.Q.value = q;
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f); f.connect(g); g.connect(this.comp);
    src.start(t0, Math.random()); src.stop(t0 + dur + 0.05);
  }

  tone(cat, { freq = 440, type = 'sine', dur = 0.15, vol = 0.2, delay = 0, to = null }) {
    const ctx = this.ctx, t0 = ctx.currentTime + delay;
    const o = ctx.createOscillator(); o.type = type; o.frequency.setValueAtTime(freq, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(this.comp);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  play(kind, intensity = 1, atten = 1) {
    const v = Math.min(1, intensity) * atten;
    if (v < 0.03) return;
    switch (kind) {
      case 'wood': // hollow knock
        if (!this.allow('wood')) return; this.claim('wood', 0.12);
        this.tone('wood', { freq: 210 + Math.random() * 40, dur: 0.09, vol: 0.32 * v, to: 160 });
        this.tone('wood', { freq: 520 + Math.random() * 60, dur: 0.05, vol: 0.12 * v });
        this.burst('wood', { freq: 1400, q: 2, dur: 0.03, vol: 0.12 * v });
        break;
      case 'rock': // sharp tap
        if (!this.allow('rock')) return; this.claim('rock', 0.06);
        this.burst('rock', { freq: 3200 + Math.random() * 800, q: 4, dur: 0.035, vol: 0.35 * v, white: true });
        this.tone('rock', { freq: 1500 + Math.random() * 300, dur: 0.04, vol: 0.06 * v });
        break;
      case 'bump':
        if (!this.allow('bump')) return; this.claim('bump', 0.06);
        this.tone('bump', { freq: 340, dur: 0.06, vol: 0.12 * v, to: 250 });
        this.burst('bump', { freq: 900, q: 1, dur: 0.04, vol: 0.08 * v });
        break;
      case 'splash':
        if (!this.allow('splash')) return; this.claim('splash', 0.3);
        this.burst('splash', { freq: 2500, q: 0.8, type: 'lowpass', dur: 0.28 * (0.6 + v * 0.6), vol: 0.35 * v, sweepTo: 350 });
        this.burst('splash', { freq: 700, q: 3, dur: 0.12, vol: 0.12 * v, delay: 0.03 });
        break;
      case 'finish':
        if (!this.allow('finish')) return; this.claim('finish', 0.25);
        this.tone('finish', { freq: 1800, type: 'square', dur: 0.015, vol: 0.06 * v });
        this.tone('finish', { freq: 1200, type: 'square', dur: 0.015, vol: 0.05 * v, delay: 0.035 });
        this.tone('finish', { freq: 1320, dur: 0.22, vol: 0.09 * v, delay: 0.05 });
        break;
      case 'press':
        if (!this.allow('press')) return; this.claim('press', 0.15);
        this.tone('press', { freq: 95, dur: 0.12, vol: 0.18 * v, to: 60 });
        this.burst('press', { freq: 300, q: 1, type: 'lowpass', dur: 0.08, vol: 0.12 * v });
        break;
      case 'launch':
        if (!this.allow('ui')) return; this.claim('ui', 0.1);
        this.tone('ui', { freq: 300, type: 'triangle', dur: 0.06, vol: 0.12 * v, to: 180 });
        break;
      case 'buy':
        if (!this.allow('cash')) return; this.claim('cash', 0.4);
        [660, 880, 1320].forEach((f, i) => this.tone('cash', { freq: f, type: 'triangle', dur: 0.18, vol: 0.12, delay: i * 0.07 }));
        break;
      case 'arm':
        if (!this.allow('arm')) return; this.claim('arm', 0.6);
        this.tone('arm', { freq: 140, type: 'sawtooth', dur: 0.5, vol: 0.05 * v, to: 220 });
        break;
      case 'lost':
        if (!this.allow('lost')) return; this.claim('lost', 0.4);
        this.tone('lost', { freq: 420, type: 'triangle', dur: 0.25, vol: 0.06 * v, to: 260 });
        break;
      case 'click':
        if (!this.allow('ui')) return; this.claim('ui', 0.05);
        this.tone('ui', { freq: 900, type: 'square', dur: 0.02, vol: 0.04 });
        break;
      default:
    }
  }
}
