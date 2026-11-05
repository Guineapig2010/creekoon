// Minimal stand-ins so render modules (riparian trunks, the walker) can run in Node for
// headless tests. Canvas drawing calls do nothing; no WebGL is needed.
const noop = () => {};
const ctx = new Proxy({}, {
  get: (t, k) => {
    if (k in t) return t[k];
    if (k === 'createImageData' || k === 'getImageData') return (w = 1, h = 1) => ({ data: new Uint8ClampedArray((w.width || w) * (h || 1) * 4), width: w, height: h });
    if (k === 'createLinearGradient' || k === 'createRadialGradient' || k === 'createPattern') return () => ({ addColorStop: noop });
    if (k === 'measureText') return () => ({ width: 10 });
    return noop;
  },
  set: (t, k, v) => { t[k] = v; return true; },
});
class El extends EventTarget { constructor() { super(); this.style = {}; this.width = 1; this.height = 1; this.clientWidth = 1280; this.clientHeight = 800; } getContext() { return ctx; } requestPointerLock() {} getBoundingClientRect() { return { left: 0, top: 0, width: 1280, height: 800 }; } }
if (!globalThis.document) {
  const doc = new EventTarget();
  doc.createElement = () => new El();
  doc.pointerLockElement = null;
  doc.exitPointerLock = noop;
  globalThis.document = doc;
  globalThis.window = globalThis;
  globalThis.innerWidth = 1280; globalThis.innerHeight = 800;
  if (!globalThis.addEventListener) { const et = new EventTarget(); globalThis.addEventListener = et.addEventListener.bind(et); globalThis.removeEventListener = et.removeEventListener.bind(et); }
}
export const makeElement = () => new El();
