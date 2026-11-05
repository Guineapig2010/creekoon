// Procedurally painted textures (no external image assets needed).
import * as THREE from 'three';
import { mulberry32, vnoise } from '../core/noise.js';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function tex(c, { repeat = false, srgb = true, aniso = 4 } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.needsUpdate = true;
  return t;
}

/** Tennis ball felt with the curved seam, optional blue band and batch stamp. */
export function ballTexture({ band = false, stamp = false, ncn = false, replica = false, size = 1024 } = {}) {
  const W = size, H = size / 2;
  const c = canvas(W, H), g = c.getContext('2d');
  const rnd = mulberry32(band ? 7 : 3);
  g.fillStyle = '#cfe03c';
  g.fillRect(0, 0, W, H);
  // felt fuzz
  const img = g.getImageData(0, 0, W, H);
  const d = img.data;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const n = vnoise(x * 0.09, y * 0.09, 5) * 10 + vnoise(x * 0.5, y * 0.5, 9) * 9 + (rnd() - 0.5) * 22;
      const i = (y * W + x) * 4;
      d[i] = Math.max(0, Math.min(255, d[i] + n));
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n * 0.5));
    }
  }
  g.putImageData(img, 0, 0);
  // little fibres
  for (let k = 0; k < 6000; k++) {
    const x = rnd() * W, y = rnd() * H, a = rnd() * Math.PI, l = 2 + rnd() * 5;
    g.strokeStyle = rnd() < 0.5 ? 'rgba(240,255,140,0.35)' : 'rgba(120,140,20,0.25)';
    g.lineWidth = 0.8;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  if (band) {
    // premium band: a tilted great circle in navy blue
    g.fillStyle = '#1f4aa8';
    for (let x = 0; x < W; x++) {
      const yc = H / 2 + Math.sin((x / W) * Math.PI * 2) * H * 0.14;
      g.fillRect(x, yc - H * 0.035, 1, H * 0.07);
    }
    g.fillStyle = 'rgba(255,255,255,0.75)';
    for (let x = 0; x < W; x++) {
      const yc = H / 2 + Math.sin((x / W) * Math.PI * 2) * H * 0.14;
      g.fillRect(x, yc - H * 0.037, 1, 1.5); g.fillRect(x, yc + H * 0.035, 1, 1.5);
    }
  }
  // seam: classic tennis ball curve, drawn as overlapping ellipses in equirect space
  const a = 0.7, b = 0.3, cz = 2 * Math.sqrt(a * b);
  const seam = (r, col) => {
    g.fillStyle = col;
    for (let i = 0; i < 2400; i++) {
      const t = (i / 2400) * Math.PI * 2;
      let px = a * Math.cos(t) + b * Math.cos(3 * t);
      let pz = a * Math.sin(t) - b * Math.sin(3 * t);
      let py = cz * Math.sin(2 * t);
      const l = Math.hypot(px, py, pz); px /= l; py /= l; pz /= l;
      const th = Math.acos(py);
      const ph = Math.atan2(pz, -px);
      const u = ((ph / (Math.PI * 2)) + 1) % 1;
      const X = u * W, Y = (th / Math.PI) * H;
      const rx = (r / (Math.PI * 2)) * W / Math.max(0.12, Math.sin(th)), ry = (r / Math.PI) * H;
      for (const off of [-W, 0, W]) {
        g.beginPath(); g.ellipse(X + off, Y, rx, ry, 0, 0, Math.PI * 2); g.fill();
      }
    }
  };
  seam(0.13, '#b6bf8e');
  seam(0.1, '#f4f2e6');
  if (ncn || replica) {
    g.save();
    g.translate(W * 0.25, H * 0.5);
    g.scale(1.6, 1);
    g.fillStyle = replica ? '#5a2a8a' : '#7a1d14';
    g.font = `bold ${Math.round(H * 0.09)}px Arial, sans-serif`;
    g.textAlign = 'center';
    g.fillText(replica ? 'REPLICA' : 'NCN', 0, -H * 0.01);
    g.font = `${Math.round(H * 0.045)}px Arial, sans-serif`;
    g.fillText(replica ? 'New Creek Nation' : 'New Creek Nation batch', 0, H * 0.06);
    g.restore();
  } else if (stamp) {
    g.save();
    g.translate(W * 0.25, H * 0.5);
    g.scale(1.6, 1);
    g.fillStyle = '#16161a';
    g.font = `bold ${Math.round(H * 0.07)}px Arial, sans-serif`;
    g.textAlign = 'center';
    g.fillText('CREEK ROLLING', 0, -H * 0.02);
    g.font = `${Math.round(H * 0.05)}px Arial, sans-serif`;
    g.fillText('BATCH No. 42', 0, H * 0.05);
    g.restore();
  } else {
    g.save();
    g.translate(W * 0.25, H * 0.5);
    g.scale(1.6, 1);
    g.fillStyle = 'rgba(30,30,30,0.55)';
    g.font = `bold ${Math.round(H * 0.055)}px Arial, sans-serif`;
    g.textAlign = 'center';
    g.fillText('CRT', 0, H * 0.02);
    g.restore();
  }
  return tex(c, { aniso: 8 });
}

/** Tiling greyscale detail noise used as a multiply map on terrain and rocks. */
export function detailTexture(size = 256, seed = 1, contrast = 0.35) {
  const c = canvas(size, size), g = c.getContext('2d');
  const img = g.createImageData(size, size);
  const per = (x, y, f, s) => {
    // tileable noise by wrapping lattice coordinates
    const P = Math.round(size * f);
    const fx = (x * f), fy = (y * f);
    const ix = Math.floor(fx), iy = Math.floor(fy);
    const tx = fx - ix, ty = fy - iy;
    const h = (a, b) => (vnoise(((a % P) + P) % P + 0.5, ((b % P) + P) % P + 0.5, s) + 1) / 2;
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const v0 = h(ix, iy) + (h(ix + 1, iy) - h(ix, iy)) * sx;
    const v1 = h(ix, iy + 1) + (h(ix + 1, iy + 1) - h(ix, iy + 1)) * sx;
    return v0 + (v1 - v0) * sy;
  };
  const rnd = mulberry32(seed);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let v = per(x, y, 1 / 32, seed) * 0.5 + per(x, y, 1 / 8, seed + 3) * 0.3 + per(x, y, 1 / 2, seed + 7) * 0.2;
    v = 1 - contrast + v * contrast * 2 + (rnd() - 0.5) * 0.06;
    const k = (y * size + x) * 4;
    const c8 = Math.max(0, Math.min(255, v * 200));
    img.data[k] = img.data[k + 1] = img.data[k + 2] = c8; img.data[k + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return tex(c, { repeat: true, srgb: false });
}

/** Tileable normal map for water ripples. */
export function waterNormalTexture(size = 256) {
  const c = canvas(size, size), g = c.getContext('2d');
  const img = g.createImageData(size, size);
  const hgt = new Float32Array(size * size);
  const waves = [];
  const rnd = mulberry32(42);
  for (let i = 0; i < 26; i++) {
    const kx = Math.round((rnd() - 0.5) * 16), ky = Math.round((rnd() - 0.5) * 16);
    waves.push({ kx, ky, a: 1 / (1 + Math.hypot(kx, ky)), p: rnd() * 6.283 });
  }
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let h = 0;
    for (const w of waves) h += w.a * Math.sin(((w.kx * x + w.ky * y) / size) * Math.PI * 2 + w.p);
    hgt[y * size + x] = h;
  }
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const hx = hgt[y * size + ((x + 1) % size)] - hgt[y * size + ((x - 1 + size) % size)];
    const hy = hgt[((y + 1) % size) * size + x] - hgt[((y - 1 + size) % size) * size + x];
    let nx = -hx * 1.2, ny = -hy * 1.2, nz = 1;
    const l = Math.hypot(nx, ny, nz); nx /= l; ny /= l; nz /= l;
    const k = (y * size + x) * 4;
    img.data[k] = (nx * 0.5 + 0.5) * 255; img.data[k + 1] = (ny * 0.5 + 0.5) * 255; img.data[k + 2] = (nz * 0.5 + 0.5) * 255; img.data[k + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return tex(c, { repeat: true, srgb: false });
}

/** Soft round sprite. */
export function softDot(size = 64, inner = 0.0) {
  const c = canvas(size, size), g = c.getContext('2d');
  const gr = g.createRadialGradient(size / 2, size / 2, size * inner * 0.5, size / 2, size / 2, size / 2);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.5, 'rgba(255,255,255,0.5)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  return tex(c, { srgb: false });
}

export function ringTexture(size = 128) {
  const c = canvas(size, size), g = c.getContext('2d');
  const gr = g.createRadialGradient(size / 2, size / 2, size * 0.3, size / 2, size / 2, size / 2);
  gr.addColorStop(0, 'rgba(255,255,255,0)');
  gr.addColorStop(0.72, 'rgba(255,255,255,0.0)');
  gr.addColorStop(0.86, 'rgba(255,255,255,0.9)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, size, size);
  return tex(c, { srgb: false });
}

export function foamTexture(size = 64) {
  const c = canvas(size, size), g = c.getContext('2d');
  const rnd = mulberry32(5);
  for (let i = 0; i < 18; i++) {
    const x = size / 2 + (rnd() - 0.5) * size * 0.5, y = size / 2 + (rnd() - 0.5) * size * 0.5, r = size * (0.06 + rnd() * 0.12);
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, 'rgba(255,255,255,0.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  }
  return tex(c, { srgb: false });
}

export function leafTexture(size = 64) {
  const c = canvas(size, size), g = c.getContext('2d');
  g.translate(size / 2, size / 2);
  g.rotate(0.6);
  const grd = g.createLinearGradient(-size * 0.4, 0, size * 0.4, 0);
  grd.addColorStop(0, '#b5651d'); grd.addColorStop(0.5, '#d9a23a'); grd.addColorStop(1, '#8a5a1c');
  g.fillStyle = grd;
  g.beginPath();
  g.moveTo(-size * 0.42, 0);
  g.quadraticCurveTo(0, -size * 0.28, size * 0.42, 0);
  g.quadraticCurveTo(0, size * 0.28, -size * 0.42, 0);
  g.fill();
  g.strokeStyle = 'rgba(90,50,10,0.8)'; g.lineWidth = 1.5;
  g.beginPath(); g.moveTo(-size * 0.45, 0); g.lineTo(size * 0.4, 0); g.stroke();
  return tex(c);
}

export function grassTexture(w = 64, h = 128) {
  const c = canvas(w, h), g = c.getContext('2d');
  const rnd = mulberry32(11);
  for (let i = 0; i < 26; i++) {
    const x = w * (0.15 + rnd() * 0.7), lean = (rnd() - 0.5) * w * 0.5, hh = h * (0.45 + rnd() * 0.55);
    const col = `hsl(${85 + rnd() * 30}, ${35 + rnd() * 25}%, ${22 + rnd() * 22}%)`;
    g.strokeStyle = col; g.lineWidth = 1.5 + rnd() * 2;
    g.beginPath(); g.moveTo(x, h); g.quadraticCurveTo(x + lean * 0.3, h - hh * 0.6, x + lean, h - hh); g.stroke();
  }
  return tex(c);
}

export function streakTexture(w = 64, h = 256) {
  const c = canvas(w, h), g = c.getContext('2d');
  const rnd = mulberry32(8);
  g.fillStyle = 'rgba(255,255,255,0.25)'; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 90; i++) {
    const x = rnd() * w, y = rnd() * h, l = 20 + rnd() * 90;
    g.strokeStyle = `rgba(255,255,255,${0.3 + rnd() * 0.6})`;
    g.lineWidth = 1 + rnd() * 3;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + (rnd() - 0.5) * 3, y + l); g.stroke();
    g.beginPath(); g.moveTo(x, y - h); g.lineTo(x, y - h + l); g.stroke();
  }
  return tex(c, { repeat: true, srgb: false });
}

export function woodTexture(size = 256, base = '#9a6a3c') {
  const c = canvas(size, size), g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, size, size);
  const rnd = mulberry32(21);
  for (let i = 0; i < 70; i++) {
    const y = rnd() * size;
    g.strokeStyle = `rgba(${rnd() < 0.5 ? '60,35,15' : '200,160,110'},${0.1 + rnd() * 0.25})`;
    g.lineWidth = 1 + rnd() * 2.5;
    g.beginPath(); g.moveTo(0, y);
    for (let x = 0; x <= size; x += 16) g.lineTo(x, y + Math.sin(x * 0.03 + i) * 3);
    g.stroke();
  }
  return tex(c, { repeat: true });
}

export function barkTexture(size = 128) {
  const c = canvas(size, size), g = c.getContext('2d');
  g.fillStyle = '#4a3a2a'; g.fillRect(0, 0, size, size);
  const rnd = mulberry32(31);
  for (let i = 0; i < 60; i++) {
    const x = rnd() * size;
    g.strokeStyle = `rgba(${rnd() < 0.5 ? '25,18,10' : '110,90,70'},0.5)`;
    g.lineWidth = 1 + rnd() * 3;
    g.beginPath(); g.moveTo(x, 0); g.lineTo(x + (rnd() - 0.5) * 8, size); g.stroke();
  }
  return tex(c, { repeat: true });
}

/** Text label texture for in-world signs. */
export function labelTexture(lines, { w = 512, h = 128, bg = '#2d3a1f', fg = '#f6f1d8', font = 'bold 54px Georgia, serif', border = '#c9a45a' } = {}) {
  const c = canvas(w, h), g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, w, h);
  g.strokeStyle = border; g.lineWidth = 8; g.strokeRect(4, 4, w - 8, h - 8);
  g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = font;
  const arr = Array.isArray(lines) ? lines : [lines];
  arr.forEach((ln, i) => g.fillText(ln, w / 2, (h / (arr.length + 1)) * (i + 1)));
  return tex(c);
}
