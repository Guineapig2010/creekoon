// The creek, laid out along the creator's map (see layout.js): one continuous downhill
// channel from the Farlands headwaters to the permanent finish gate, plus the Crawfish
// Springs runoff stream that joins it below the falls (a second Creek built from the same
// class). Geometry lives in channel coordinates (s, d):
//   s = metres downstream along the centreline, d = metres to the right of the flow
//   (looking downstream). The main creek flows south, so d > 0 is the west bank and
//   d < 0 the east bank, where the Continental Shelf terrace runs.
// Everything (bed height, water level, flow field, colliders, render meshes)
// is derived from this one description so physics matches what is drawn.

import { fbm, vnoise, clamp, lerp, smoothstep, mulberry32 } from './noise.js';
import { STARTS, S_FINISH, S_BASKET, BALL_R } from './config.js';
import { MAIN_PATH, MAIN_S0, TRIB_PATH, TRIB_S0 } from './layout.js';

export const S_MIN = 0;
export const S_MAX = 564.5;
export const D_MIN = -10;
export const D_MAX = 10;
export const DS = 0.05; // bed grid spacing along s
export const DD = 0.04; // bed grid spacing across
export const DS_C = 0.25; // centreline sample spacing

export const MAT = { GRAVEL: 0, ROCK: 1, SAND: 2, DIRT: 3, MAT: 4, WOOD: 5, METAL: 6, RUBBER: 7 };
// restitution, friction, rolling resistance coefficient, bump amplitude (normal jitter)
export const SURF = [
  { e: 0.42, mu: 0.6, crr: 0.05, bump: 0.05, name: 'gravel' },
  { e: 0.72, mu: 0.5, crr: 0.015, bump: 0.015, name: 'rock' },
  { e: 0.28, mu: 0.7, crr: 0.08, bump: 0.008, name: 'sand' },
  { e: 0.32, mu: 0.8, crr: 0.1, bump: 0.03, name: 'dirt' },
  { e: 0.4, mu: 0.55, crr: 0.006, bump: 0, name: 'mat' },
  { e: 0.55, mu: 0.4, crr: 0.012, bump: 0.004, name: 'wood' },
  { e: 0.6, mu: 0.3, crr: 0.008, bump: 0, name: 'metal' },
  { e: 0.35, mu: 0.6, crr: 0.02, bump: 0, name: 'rubber' },
];

const G = MAT.GRAVEL, R = MAT.ROCK, S = MAT.SAND, D = MAT.DIRT;

// Channel key frames:
// s, wL, wR, depth, centre offset c, surface speed U, bankL, bankR, bankW, roughness, turbulence, bedMat, bankMat
// Main creek, from the Farlands down to the trail-entrance finish, following the creator's map
// (X = a plain connecting reach)
const K = [
  // the Farlands: a wide braided gravel bed (IMG_8217, IMG_8220), low banks
  [0, 1.0, 1.0, 0.12, 0, 1.25, 0.35, 0.35, 1.4, 0.012, 0.07, G, G],
  [7, 1.15, 0.85, 0.12, 0.35, 1.3, 0.35, 0.3, 1.5, 0.012, 0.07, G, G],
  [14, 0.85, 1.15, 0.12, -0.35, 1.3, 0.3, 0.35, 1.5, 0.012, 0.07, G, G],
  [21, 1.1, 0.9, 0.13, 0.2, 1.3, 0.35, 0.35, 1.4, 0.012, 0.07, G, G],
  [28, 0.9, 0.9, 0.13, 0, 1.35, 0.45, 0.4, 1.3, 0.012, 0.08, G, G],
  // the Farlands entrance line (s 33.5): the Shelf begins on the east bank
  [33.5, 0.62, 0.6, 0.15, 0, 1.5, 0.8, 0.45, 1.6, 0.012, 0.08, G, D],
  [38, 0.48, 0.5, 0.17, 0.3, 1.65, 1.7, 0.5, 2.2, 0.012, 0.08, G, D], // X
  [43, 0.42, 0.42, 0.12, 0.1, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [49, 0.46, 0.46, 0.16, -0.2, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [55.8192, 0.44, 0.44, 0.16, -0.28199, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [63.0738, 0.36, 0.36, 0.1, -0.47252, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [69.7532, 0.44, 0.44, 0.16, -0.304485, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [74.0432, 0.6, 0.6, 0.28, -0.219861, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [78.2307, 0.44, 0.44, 0.16, -0.243335, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [82.58, 0.36, 0.36, 0.1, -0.400861, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [88.7026, 0.44, 0.44, 0.16, -0.0131682, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [93.3216, 0.36, 0.36, 0.1, -0.16179, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [96.6, 0.9, 1.0, 0.5, -0.2, 0.95, 1.7, 0.5, 2.2, 0.012, 0.07, G, D], // C deep pools
  [98.3, 1.3, 1.15, 0.7, -0.3, 0.85, 1.7, 0.55, 2.2, 0.012, 0.07, S, D], // C deep pools
  [100.2, 0.6, 0.55, 0.24, -0.05, 1.5, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // C
  [108.239, 0.44, 0.44, 0.16, 0.459804, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [114.222, 0.36, 0.36, 0.1, 0.947818, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [118.455, 0.44, 0.44, 0.16, 1.09298, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [123.903, 0.6, 0.6, 0.28, 0.998501, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [128.492, 0.44, 0.44, 0.16, 1.30183, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [136.572, 0.36, 0.36, 0.1, 1.62749, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [144.1, 0.55, 0.85, 0.11, 2.15, 1.15, 1.7, 0.1, 2.2, 0.012, 0.08, G, G], // FR
  [146.5, 0.55, 0.85, 0.11, 2.2, 1.15, 1.7, 0.12, 2.2, 0.012, 0.08, G, G], // FR
  [153.695, 0.44, 0.44, 0.16, 2.19161, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [160.433, 0.36, 0.36, 0.1, 2.18375, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [164.731, 0.44, 0.44, 0.16, 2.17874, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [172.133, 0.6, 0.6, 0.28, 2.17011, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [177.704, 0.44, 0.44, 0.16, 2.20639, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [183.97, 0.36, 0.36, 0.1, 2.05619, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [191.942, 0.44, 0.44, 0.16, 2.2465, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [197.162, 0.36, 0.36, 0.1, 2.17813, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [203.788, 0.44, 0.44, 0.16, 2.32076, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [211.436, 0.6, 0.6, 0.28, 2.01824, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [220.336, 0.44, 0.44, 0.16, 1.92293, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [226.427, 0.36, 0.36, 0.1, 2.23536, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [231.187, 0.44, 0.44, 0.16, 2.09572, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [235.383, 0.36, 0.36, 0.1, 2.18045, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [243.206, 0.44, 0.44, 0.16, 2.12374, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [251.583, 0.6, 0.6, 0.28, 1.98433, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [259.06, 0.44, 0.44, 0.16, 2.11592, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [265.959, 0.36, 0.36, 0.1, 2.03879, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [274.159, 0.44, 0.44, 0.16, 2.27347, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [280.53, 0.36, 0.36, 0.1, 2.12577, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [284.833, 0.44, 0.44, 0.16, 2.13942, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [292.069, 0.6, 0.6, 0.28, 2.27679, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [300.178, 0.44, 0.44, 0.16, 2.02078, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [306.107, 0.36, 0.36, 0.1, 2.01387, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [310.22, 0.44, 0.44, 0.16, 2.00907, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [318, 0.27, 0.27, 0.075, 2, 1, 1.7, 1.5, 0.45, 0.012, 0.08, R, R], // SH
  [321.6, 0.27, 0.3, 0.075, 2.1, 1, 1.7, 1.2, 0.45, 0.012, 0.08, R, R], // SH
  [326, 0.26, 0.26, 0.07, 2.2, 1, 1.7, 1.5, 0.45, 0.012, 0.08, R, R], // SH
  [327.9, 0.26, 0.26, 0.07, 1.6, 1.15, 1.7, 1.4, 0.45, 0.012, 0.1, R, R], // SH
  [328.3, 0.28, 0.28, 0.07, 1.4, 1.2, 1.7, 1.4, 0.45, 0.012, 0.1, R, R], // SH
  [328.7, 0.36, 0.36, 0.17, 1.25, 1, 1.7, 0.45, 0.45, 0.02, 0.2, R, R], // SH
  [329.6, 0.3, 0.3, 0.14, 0.75, 1.6, 1.7, 0.5, 0.45, 0.025, 0.15, R, R], // SH
  [334.185, 0.44, 0.44, 0.16, 0.720434, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [342.027, 0.36, 0.36, 0.1, 0.669875, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [347.265, 0.44, 0.44, 0.16, 0.581576, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [355.622, 0.6, 0.6, 0.28, 0.372506, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [361.868, 0.44, 0.44, 0.16, 0.566663, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [370.285, 0.36, 0.36, 0.1, 0.647312, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [378.605, 0.44, 0.44, 0.16, 0.323237, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [384.681, 0.36, 0.36, 0.1, 0.324232, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [393.102, 0.44, 0.44, 0.16, 0.569415, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [397.857, 0.6, 0.6, 0.28, 0.148001, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [403.016, 0.44, 0.44, 0.16, 0.276623, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [409.441, 0.36, 0.36, 0.1, 0.235197, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [414.9, 0.28, 0.28, 0.14, 0.2, 1.8, 0.45, 0.5, 0.4, 0.025, 0.15, R, R], // W1
  [418.92, 0.36, 0.36, 0.1, 0.177124, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [424.767, 0.44, 0.44, 0.16, 0.17703, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [433.532, 0.36, 0.36, 0.1, 0.189231, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [440.11, 0.6, 0.6, 0.28, 0.115356, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [450.05, 0.25, 0.25, 0.12, 0, 2.05, 0.5, 0.5, 0.4, 0.02, 0.12, R, R], // W2
  [450.35, 0.25, 0.25, 0.12, 0, 2.1, 0.5, 0.5, 0.4, 0.02, 0.12, R, R], // W2
  [450.7, 0.25, 0.25, 0.12, 0, 2.1, 0.5, 0.5, 0.4, 0.02, 0.12, R, R], // W2
  [450.9, 0.42, 0.42, 0.9, 0, 0.6, 0.14, 0.14, 0.06, 0.015, 0.3, S, S], // W2
  [451.7, 0.5, 0.5, 0.8, 0, 0.6, 0.18, 0.18, 0.08, 0.015, 0.25, S, S], // W2
  [452.4, 0.65, 0.65, 0.7, 0, 0.62, 1, 1, 0.4, 0.015, 0.22, S, R], // W2
  [453.4, 0.8, 0.98, 0.45, 0, 0.8, 1, 0.8, 0.5, 0.015, 0.14, S, R], // W2
  [457.67, 0.44, 0.44, 0.16, 0.199767, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [465.57, 0.36, 0.36, 0.1, 0.187257, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [469, 0.42, 0.42, 0.18, 0, 1.35, 0.4, 0.4, 0.8, 0.012, 0.08, G, D], // W3
  [474.962, 0.44, 0.44, 0.16, 0, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [479.48, 0.36, 0.36, 0.1, 0, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [483.791, 0.44, 0.44, 0.16, -0.216326, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [488.835, 0.6, 0.6, 0.28, -0.168848, 1.05, 1.7, 0.42, 2.2, 0.01, 0.06, S, D], // X
  [494.535, 0.44, 0.44, 0.16, -0.223712, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [498.536, 0.36, 0.36, 0.1, -0.174368, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [503.043, 0.44, 0.44, 0.16, -0.068195, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [507.171, 0.36, 0.36, 0.1, 0.187166, 1.85, 1.7, 0.5, 2.2, 0.02, 0.14, R, D], // X
  [514.241, 0.44, 0.44, 0.16, -0.175725, 1.6, 1.7, 0.45, 2.2, 0.012, 0.08, G, D], // X
  [519.503, 0.6, 0.6, 0.28, -0.0763052, 1.05, 0.4, 0.42, 0.9, 0.01, 0.06, S, D], // X
  [525.323, 0.44, 0.44, 0.16, -0.188579, 1.6, 0.42, 0.45, 0.85, 0.012, 0.08, G, D], // X
  [533.568, 0.36, 0.36, 0.1, 0.246551, 1.85, 0.5, 0.5, 0.7, 0.02, 0.14, R, D], // X
  [539.898, 0.44, 0.44, 0.16, 0, 1.6, 0.42, 0.45, 0.85, 0.012, 0.08, G, D], // X
  [547, 0.42, 0.42, 0.18, 0, 1.35, 0.4, 0.4, 0.8, 0.012, 0.08, G, D], // G
  [548.5, 0.4, 0.42, 0.06, 0, 1.74, 0.26, 0.3, 0.8, 0.01, 0.08, G, D], // G
  [550.1, 0.42, 0.45, 0.055, 0.15, 1.74, 0.26, 0.28, 0.8, 0.01, 0.08, G, D], // G
  [551.8, 0.48, 0.42, 0.05, 0.55, 1.79, 0.26, 0.3, 0.8, 0.012, 0.08, G, D], // G
  [553.5, 0.42, 0.42, 0.06, 0.2, 1.85, 0.26, 0.28, 0.8, 0.01, 0.08, G, D], // G
  [555, 0.36, 0.36, 0.08, 0, 1.5, 0.25, 0.25, 0.8, 0.008, 0.06, G, D], // G
  [556.1, 0.42, 0.42, 0.14, 0, 0.55, 0.25, 0.25, 0.8, 0.008, 0.04, G, D], // G
  [564.5, 0.45, 0.45, 0.18, 0, 0.5, 0.25, 0.25, 0.8, 0.008, 0.04, G, D], // G
];

const SLOPES = [
  [0, 0.014], [34, 0.014], [50.5, 0.016], [96.4, 0.004], [100.2, 0.018], [143.5, 0.012], [147.1, 0.02],
  [328.9, 0.06], [334, 0.022], [413.8, 0.06], [418.6, 0.045], [450.8, 0.0], [453.4, 0.025], [468.5, 0.035],
  [469.0, 0.02], [547, 0.035], [564.5, 0.02],
];
// Steps: centre s, drop height, transition length
export const STEPS = [
  { s: 328.45, h: 1.3, len: 0.16, name: 'shelf' },
  { s: 450.8, h: 2.3, len: 0.1, name: 'waterfall' },
];

// Plunge pools below drops: start s, length, half width of the jet/roller zone
const POOLS = [
  { s: 450.8, len: 1.45, w: 0.62, jet: 0.9, jetDepth: 0.32, under: 0.55, boil: 0.35 },
];

// Crawfish Springs runoff stream (its own channel). s runs from the spring pool at the double
// ponds (top) down to where the stream enters the main creek corridor.
const K_SPRINGS = [
  [52.6, 0.55, 0.55, 0.3, 0, 0.75, 0.6, 0.6, 1.0, 0.01, 0.05, S, D],
  [54.6, 0.62, 0.62, 0.3, 0, 1.08, 0.35, 0.35, 1.2, 0.01, 0.08, S, D],
  [55.8, 0.98, 0.98, 0.55, 0.2, 0.8, 0.35, 0.35, 1.2, 0.01, 0.1, S, D],
  [61.0, 0.92, 0.92, 0.5, 0.1, 0.85, 0.38, 0.38, 1.2, 0.01, 0.1, S, D],
  [62.3, 0.4, 0.4, 0.2, 0, 0.85, 0.5, 0.5, 0.5, 0.02, 0.12, R, R],
  [62.9, 0.18, 0.18, 0.1, 0.1, 1.55, 0.6, 0.6, 0.35, 0.02, 0.18, R, R],
  [66.4, 0.18, 0.18, 0.1, 0.25, 1.6, 0.6, 0.6, 0.35, 0.02, 0.18, R, R],
  [67.3, 0.46, 0.46, 0.12, 0.3, 1.2, 0.7, 0.7, 0.4, 0.02, 0.12, R, R],
  // the runoff chute down the Shelf: a narrow rocky gully through the forest
  [72, 0.46, 0.46, 0.13, 0.2, 1.7, 0.8, 0.8, 0.5, 0.02, 0.14, R, D],
  [80, 0.46, 0.46, 0.15, -0.2, 1.55, 0.7, 0.8, 0.6, 0.015, 0.12, G, D],
  [88, 0.46, 0.46, 0.13, 0.1, 1.8, 0.8, 0.8, 0.5, 0.02, 0.15, R, D],
  [97, 0.54, 0.54, 0.23, 0, 1.2, 0.8, 0.8, 0.6, 0.015, 0.12, S, R],
  [104, 0.46, 0.46, 0.13, 0.25, 1.75, 0.9, 0.9, 0.5, 0.02, 0.14, R, D],
  [113, 0.46, 0.46, 0.13, -0.1, 1.8, 1.0, 1.0, 0.5, 0.02, 0.15, R, D],
  [122, 0.54, 0.54, 0.23, 0, 1.2, 1.2, 1.2, 0.6, 0.015, 0.12, S, R],
  [130, 0.46, 0.46, 0.13, 0.1, 1.8, 1.4, 1.4, 0.5, 0.02, 0.14, R, R],
  [140, 0.46, 0.46, 0.13, 0, 1.85, 1.6, 1.6, 0.5, 0.02, 0.15, R, R],
  [148, 0.46, 0.46, 0.13, 0, 1.85, 1.6, 1.6, 0.5, 0.02, 0.15, R, R],
];
const SLOPES_SPRINGS = [[52.6, 0.003], [62.3, 0.11], [67.6, 0.06], [100, 0.07]];
const STEPS_SPRINGS = [
  { s: 96.2, h: 0.4, len: 0.12, name: 'springsDrop1' },
  { s: 121.2, h: 0.4, len: 0.12, name: 'springsDrop2' },
];
const POOLS_SPRINGS = [
  { s: 96.2, len: 0.7, w: 0.35, jet: 0.6, jetDepth: 0.2, under: 0.5, boil: 0.25 },
  { s: 121.2, len: 0.7, w: 0.35, jet: 0.6, jetDepth: 0.2, under: 0.5, boil: 0.25 },
];

/** The two channels. `main` is the creek; `springs` is the Crawfish Springs runoff stream. */
export const CREEK_MAIN = { kind: 'main', sMin: S_MIN, sMax: S_MAX, K, SLOPES, STEPS, POOLS, path: MAIN_PATH, pathS0: MAIN_S0, fD0: -9.7, fD1: 3.8 };
export const CREEK_SPRINGS = {
  kind: 'springs', sMin: TRIB_S0, sMax: TRIB_S0 + TRIB_PATH.length - 1.001, K: K_SPRINGS, SLOPES: SLOPES_SPRINGS, STEPS: STEPS_SPRINGS, POOLS: POOLS_SPRINGS,
  path: TRIB_PATH, pathS0: TRIB_S0, fD0: -2.2, fD1: 3.2,
};

function interpKeys(s, out, K) {
  let i = 0;
  while (i < K.length - 2 && K[i + 1][0] <= s) i++;
  const a = K[i], b = K[i + 1];
  const t = smoothstep(a[0], b[0], s);
  out.wL = lerp(a[1], b[1], t);
  out.wR = lerp(a[2], b[2], t);
  out.D = lerp(a[3], b[3], t);
  out.c = lerp(a[4], b[4], t);
  out.U = lerp(a[5], b[5], t);
  out.bankL = lerp(a[6], b[6], t);
  out.bankR = lerp(a[7], b[7], t);
  out.bankW = lerp(a[8], b[8], t);
  out.rough = lerp(a[9], b[9], t);
  out.turb = lerp(a[10], b[10], t);
  out.bedMat = t < 0.5 ? a[11] : b[11];
  out.bankMat = t < 0.5 ? a[12] : b[12];
  return out;
}


export class Creek {
  constructor(cfg = CREEK_MAIN, opts = {}) {
    this.cfg = cfg;
    this.kind = cfg.kind;
    this.isMain = cfg.kind === 'main';
    this.sMin = cfg.sMin; this.sMax = cfg.sMax;
    this.K = cfg.K; this.SLOPES = cfg.SLOPES; this.STEPS = cfg.STEPS; this.POOLS = cfg.POOLS;
    this.opts = opts;
    this.buildCentreline();
    this.buildRows();
    this.buildFeatures();
    this.bakeBed();
    this.buildRocks();
    this.bakeFlow();
    this.buildColliders();
    // the main creek owns its tributary: the Crawfish Springs runoff stream
    if (this.isMain && opts.springs !== false) this.springs = new Creek(CREEK_SPRINGS, { yEnd: this.gully.yA });
  }

  // ---------------------------------------------------------------- centreline
  buildCentreline() {
    // Catmull-Rom through the map path (1 m spacing) sampled every DS_C metres of s.
    const path = this.cfg.path, s0 = this.cfg.pathS0;
    const n = Math.round((this.sMax - this.sMin) / DS_C) + 1;
    this.nC = n;
    this.cx = new Float64Array(n); this.cz = new Float64Array(n);
    this.tx = new Float64Array(n); this.tz = new Float64Array(n);
    this.kap = new Float64Array(n);
    const last = path.length - 1;
    const pt = (i) => path[Math.max(0, Math.min(last, i))];
    for (let i = 0; i < n; i++) {
      const u = clamp(this.sMin + i * DS_C - s0, 0, last);
      const k = Math.min(last - 1, Math.floor(u)), t = u - k;
      const p0 = pt(k - 1), p1 = pt(k), p2 = pt(k + 1), p3 = pt(k + 2);
      const t2 = t * t, t3 = t2 * t;
      const cr = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      this.cx[i] = cr(p0[0], p1[0], p2[0], p3[0]);
      this.cz[i] = cr(p0[1], p1[1], p2[1], p3[1]);
    }
    for (let i = 0; i < n; i++) {
      const a = Math.max(0, i - 1), b = Math.min(n - 1, i + 1);
      let dx = this.cx[b] - this.cx[a], dzz = this.cz[b] - this.cz[a];
      const l = Math.hypot(dx, dzz);
      this.tx[i] = dx / l; this.tz[i] = dzz / l;
    }
    for (let i = 0; i < n; i++) {
      const a = Math.max(0, i - 4), b = Math.min(n - 1, i + 4);
      // signed curvature: positive when turning right (towards +d)
      const crossv = this.tx[a] * this.tz[b] - this.tz[a] * this.tx[b];
      this.kap[i] = crossv / ((b - a) * DS_C);
    }
    // spatial index of centreline segments for global lookups
    const G = 6;
    this.segGrid = new Map(); this.segCell = G;
    for (let i = 0; i < n - 1; i++) {
      const gx = Math.floor((this.cx[i] + this.cx[i + 1]) / 2 / G), gz = Math.floor((this.cz[i] + this.cz[i + 1]) / 2 / G);
      const key = gx * 100003 + gz;
      let a = this.segGrid.get(key); if (!a) { a = []; this.segGrid.set(key, a); } a.push(i);
    }
  }

  /** Coarse lookup: for each 4 m cell around the creek, the nearest centreline sample (built once). */
  buildNearGrid() {
    const C = 4, M = 150;
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (let i = 0; i < this.nC; i++) { x0 = Math.min(x0, this.cx[i]); x1 = Math.max(x1, this.cx[i]); z0 = Math.min(z0, this.cz[i]); z1 = Math.max(z1, this.cz[i]); }
    x0 -= M; z0 -= M; x1 += M; z1 += M;
    const nx = Math.ceil((x1 - x0) / C) + 1, nz = Math.ceil((z1 - z0) / C) + 1;
    const near = new Int32Array(nx * nz);
    const pts = [];
    for (let i = 0; i < this.nC - 1; i += 4) pts.push(i);
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      const x = x0 + i * C, z = z0 + j * C;
      let best = Infinity, bi = 0;
      for (const q of pts) { const dx = this.cx[q] - x, dz = this.cz[q] - z, d2 = dx * dx + dz * dz; if (d2 < best) { best = d2; bi = q; } }
      near[j * nx + i] = bi;
    }
    this.nearGrid = { x0, z0, C, nx, nz, near };
  }

  /** Nearest centreline segment to a world point. */
  nearestSeg(x, z) {
    if (!this.nearGrid) this.buildNearGrid();
    const NG = this.nearGrid;
    // far outside the grid the nearest sample of the closest grid cell is good enough
    const gi = clamp(Math.floor((x - NG.x0) / NG.C), 0, NG.nx - 1), gj = clamp(Math.floor((z - NG.z0) / NG.C), 0, NG.nz - 1);
    {
      // the coarse cell's nearest sample, refined over the neighbouring segments
      const q0 = NG.near[gj * NG.nx + gi];
      let best = Infinity, bi = q0;
      for (let q = Math.max(0, q0 - 40); q <= Math.min(this.nC - 2, q0 + 40); q++) {
        const ax = this.cx[q], az = this.cz[q], ex = this.cx[q + 1] - ax, ez = this.cz[q + 1] - az;
        let t = ((x - ax) * ex + (z - az) * ez) / (ex * ex + ez * ez); t = t < 0 ? 0 : t > 1 ? 1 : t;
        const px = ax + ex * t - x, pz = az + ez * t - z, d2 = px * px + pz * pz;
        if (d2 < best) { best = d2; bi = q; }
      }
      return bi;
    }
  }

  /** Nearest centreline segment by expanding rings of the segment index (far-away points). */
  nearestSegRings(x, z) {
    const G = this.segCell, gx = Math.floor(x / G), gz = Math.floor(z / G);
    let best = Infinity, bi = 0;
    for (let r = 0; r < 80; r++) {
      for (let i = gx - r; i <= gx + r; i++) for (let j = gz - r; j <= gz + r; j++) {
        if (Math.max(Math.abs(i - gx), Math.abs(j - gz)) !== r) continue;
        const a = this.segGrid.get(i * 100003 + j);
        if (!a) continue;
        for (const q of a) {
          const ax = this.cx[q], az = this.cz[q], ex = this.cx[q + 1] - ax, ez = this.cz[q + 1] - az;
          let t = ((x - ax) * ex + (z - az) * ez) / (ex * ex + ez * ez); t = t < 0 ? 0 : t > 1 ? 1 : t;
          const px = ax + ex * t - x, pz = az + ez * t - z, d2 = px * px + pz * pz;
          if (d2 < best) { best = d2; bi = q; }
        }
      }
      if (best < Infinity && Math.sqrt(best) < (r - 1) * G) break;
    }
    return bi;
  }

  /** World position of channel coordinate (s, d). Writes {x, z}. */
  worldXZ(s, d, out = {}) {
    let f = (s - this.sMin) / DS_C;
    f = clamp(f, 0, this.nC - 1.0001);
    const i = Math.floor(f), t = f - i;
    const x = lerp(this.cx[i], this.cx[i + 1], t), z = lerp(this.cz[i], this.cz[i + 1], t);
    let tx = lerp(this.tx[i], this.tx[i + 1], t), tz = lerp(this.tz[i], this.tz[i + 1], t);
    const l = Math.hypot(tx, tz); tx /= l; tz /= l;
    // right normal = (-tz, tx)
    out.x = x - tz * d; out.z = z + tx * d;
    return out;
  }

  /** Tangent / right normal at s. */
  frame(s, out = {}) {
    let f = clamp((s - this.sMin) / DS_C, 0, this.nC - 1.0001);
    const i = Math.floor(f), t = f - i;
    let tx = lerp(this.tx[i], this.tx[i + 1], t), tz = lerp(this.tz[i], this.tz[i + 1], t);
    const l = Math.hypot(tx, tz); tx /= l; tz /= l;
    out.tx = tx; out.tz = tz; out.nx = -tz; out.nz = tx;
    out.kap = lerp(this.kap[i], this.kap[i + 1], t);
    return out;
  }

  /**
   * Channel coordinates for a world point. `hint` is a centreline index from
   * a previous call (balls keep it), -1 for a global search.
   * Writes s, d, idx into out.
   */
  locate(x, z, hint, out) {
    let lo, hi;
    if (hint < 0) { const q = this.nearestSeg(x, z); lo = Math.max(0, q - 6); hi = Math.min(this.nC - 2, q + 6); } else { lo = Math.max(0, hint - 3); hi = Math.min(this.nC - 2, hint + 3); }
    let best = Infinity, bi = 0, bt = 0;
    for (let i = lo; i <= hi; i++) {
      const ax = this.cx[i], az = this.cz[i];
      const ex = this.cx[i + 1] - ax, ez = this.cz[i + 1] - az;
      let t = ((x - ax) * ex + (z - az) * ez) / (ex * ex + ez * ez);
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const px = ax + ex * t - x, pz = az + ez * t - z;
      const d2 = px * px + pz * pz;
      if (d2 < best) { best = d2; bi = i; bt = t; }
    }
    if (hint >= 0 && (bi === lo || bi === hi) && lo > 0 && hi < this.nC - 2) {
      // walked off the window: recentre once
      return this.locate(x, z, bi, out);
    }
    const ax = this.cx[bi], az = this.cz[bi];
    const px = ax + (this.cx[bi + 1] - ax) * bt, pz = az + (this.cz[bi + 1] - az) * bt;
    let tx = lerp(this.tx[bi], this.tx[bi + 1], bt), tz = lerp(this.tz[bi], this.tz[bi + 1], bt);
    const l = Math.hypot(tx, tz); tx /= l; tz /= l;
    out.s = this.sMin + (bi + bt) * DS_C + ((x - px) * tx + (z - pz) * tz);
    out.d = (x - px) * -tz + (z - pz) * tx;
    out.idx = bi;
    out.tx = tx; out.tz = tz;
    out.kap = lerp(this.kap[bi], this.kap[bi + 1], bt);
    return out;
  }

  // ---------------------------------------------------------------- rows
  buildRows() {
    const n = Math.round((this.sMax - this.sMin) / DS) + 1;
    this.nS = n;
    const f = () => new Float32Array(n);
    this.rY0 = f(); this.rC = f(); this.rWL = f(); this.rWR = f(); this.rD = f(); this.rU = f();
    this.rBankL = f(); this.rBankR = f(); this.rBankW = f(); this.rRough = f(); this.rTurb = f();
    this.rBedMat = new Uint8Array(n); this.rBankMat = new Uint8Array(n);
    this.rFoam = f(); this.rY0s = f(); this.rDcds = f();
    const tmp = {};
    // elevation profile: integrate slopes + steps downstream
    let y = 0;
    const yArr = new Float64Array(n);
    const slopes = this.SLOPES.slice().sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < n; i++) {
      const s = this.sMin + i * DS;
      if (i > 0) {
        let sl = 0;
        for (const [ss, v] of slopes) if (s >= ss) sl = v;
        y -= sl * DS;
      }
      yArr[i] = y;
    }
    const stepAt = (s) => {
      let drop = 0;
      for (const st of this.STEPS) drop += st.h * smoothstep(st.s - st.len / 2, st.s + st.len / 2, s);
      return drop;
    };
    for (let i = 0; i < n; i++) yArr[i] -= stepAt(this.sMin + i * DS);
    // elevation reference: the main creek's finish gate is y = 0; the springs stream ends at the
    // height of the gully it cuts into the main creek's east bank
    const ref = this.isMain ? S_FINISH : this.sMax;
    const iF = Math.round((ref - this.sMin) / DS);
    const off = (this.isMain ? 0 : this.opts.yEnd || 0) - yArr[iF];
    for (let i = 0; i < n; i++) {
      const s = this.sMin + i * DS;
      interpKeys(s, tmp, this.K);
      this.rY0[i] = yArr[i] + off;
      this.rC[i] = tmp.c; this.rWL[i] = tmp.wL; this.rWR[i] = tmp.wR; this.rD[i] = tmp.D; this.rU[i] = tmp.U;
      this.rBankL[i] = tmp.bankL; this.rBankR[i] = tmp.bankR; this.rBankW[i] = tmp.bankW;
      this.rRough[i] = tmp.rough; this.rTurb[i] = tmp.turb;
      this.rBedMat[i] = tmp.bedMat; this.rBankMat[i] = tmp.bankMat;
    }
    // smoothed elevation for the far valley sides
    const W = Math.round(5 / DS);
    for (let i = 0; i < n; i++) {
      let sum = 0, cnt = 0;
      for (let k = -W; k <= W; k += 4) { const j = clamp(i + k, 0, n - 1); sum += this.rY0[j]; cnt++; }
      this.rY0s[i] = sum / cnt;
    }
    for (let i = 0; i < n; i++) {
      const a = Math.max(0, i - 2), b = Math.min(n - 1, i + 2);
      this.rDcds[i] = (this.rC[b] - this.rC[a]) / ((b - a) * DS);
    }
    // whitewater / foam intensity along s
    for (let i = 0; i < n; i++) {
      const s = this.sMin + i * DS;
      let fo = clamp((this.rTurb[i] - 0.1) * 2.5, 0, 1);
      for (const st of this.STEPS) {
        const ds = s - st.s;
        if (ds > -0.15 && ds < 2.2) fo = Math.max(fo, (ds < 0 ? 0.5 : 1) * Math.exp(-Math.max(0, ds) / (0.5 + st.h * 0.4)));
      }
      this.rFoam[i] = fo;
    }
  }

  rowIndex(s) { return clamp((s - this.sMin) / DS, 0, this.nS - 1.0001); }
  row(arr, s) { const f = this.rowIndex(s); const i = f | 0; const t = f - i; return arr[i] + (arr[i + 1] - arr[i]) * t; }
  y0(s) { return this.row(this.rY0, s); }
  c(s) { return this.row(this.rC, s); }
  wL(s) { return this.row(this.rWL, s); }
  wR(s) { return this.row(this.rWR, s); }

  // ---------------------------------------------------------------- features
  /** Launch site s on this channel, or null when the site belongs to the other channel. */
  siteS(st) {
    if (this.isMain) return st.cr ? null : st.s;
    return st.cr === this.kind ? st.ls : null;
  }

  buildFeatures() {
    this.pads = [];
    this.padByK = {};
    STARTS.forEach((st, k) => {
      const s = this.siteS(st);
      if (s === null) return;
      const c = this.c(s), wR = this.wR(s), y0 = this.y0(s);
      const pad = { k, s0: s - 1.55, s1: s + 0.35, d0: c + wR + 0.3, d1: c + wR + 1.8, y: y0 + 0.27, sC: s - 0.6, dC: c + wR + 1.05 };
      // chute polyline in channel coords: release on the bench, kink over the water's edge, exit in the shallows
      pad.chute = [
        { s: s - 0.62, d: c + wR + 0.75, y: pad.y + 0.56 },
        { s: s - 0.16, d: c + wR - 0.02, y: y0 + 0.11 },
        { s: s + 0.12, d: c + wR - 0.2, y: y0 + 0.075 },
      ];
      this.pads.push(pad);
      this.padByK[k] = pad;
    });
    const none = { s0: -1e9, s1: -1e9 };
    this.matOn = false;
    this.mods = {};
    this.potholes = [];
    // dry hollows beside the first Slate pocket pool and beside the Spillway apron
    this.hollows = [];
    if (this.isMain) {
      this.island = { ...none, dOff: 0, halfW: 0, h: 0 };
      this.islands = [];
      // The waterfall route split (creator's map, IMG_8218): the primary route stays in the
      // main channel and goes over the falls 33 m downstream; the alternate branch leaves on
      // the creek-left (east), steps down through the Shelf rock in its own channel and
      // rejoins below the plunge pool.
      // PROVISIONAL: split, falls and rejoin positions are scaled from the creator's marks.
      this.alt = { s0: 417.5, s1: 468.4, w: 0.3, D: 0.12, U: 1.25, off: -5.2, steps: 7 };
      this.ponds = [];
      this.runoff = null;
      this.codeRot = [];
      // Flat Rocks (creator's blue outline in IMG_8220 and the ground photo of the rocks): a thick
      // tan sandstone ledge on the west bank, overhanging a dark undercut, with a bar of rounded
      // cobbles between it and the shallow water. Distances from the water's edge (m, game scale).
      // PROVISIONAL: ledge position along the reach.
      this.slabs = [];
      // Real-size heights (only map distances are halved): a ~1.75 m ledge, a 0.7 m lip, a deep undercut.
      this.ledge = { s0: 139.6, s1: 146.0, bar: 1.8, under: 1.3, back: 6.2, h: 1.75 };
      // Exposed gravel bar on the inside of the trail-entrance bend
      this.gravelBar = { s0: 550.9, s1: 553.1, side: 1 };
      this.roughPatch = { s0: 551.55, s1: 552.45 };
      // Where the Crawfish Springs runoff stream cuts through the east bank into the creek
      this.buildGully();
    } else {
      this.island = { ...none, dOff: 0, halfW: 0, h: 0 };
      this.islands = [];
      this.alt = { ...none, w: 0.2, D: 0.09, U: 1.25, off: 0, steps: 1 };
      // Crawfish Springs: the deep-forest double pond beside the spring pool, and the runoff
      // chute that feeds it. PROVISIONAL: pond outlines are illustrative, not surveyed.
      this.ponds = [
        { s: 56.9, dOff: 1.75, rs: 0.95, rd: 0.62, depth: 0.32, lift: 0.34 },
        { s: 58.5, dOff: 1.9, rs: 0.85, rd: 0.58, depth: 0.3, lift: 0.3 },
      ];
      this.runoff = { s0: 58.9, s1: 59.6, dTop: 1.35, dBot: 0.85 };
      // TUNING: Code Rot observation zones (simulated; strongest at the Springs).
      this.codeRot = [
        { s: 58.2, dOff: 0.9, r: 1.4, k: 1.0 }, { s: 56.3, dOff: -1.2, r: 1.0, k: 0.7 }, { s: 60.8, dOff: 0.8, r: 0.9, k: 0.8 },
        { s: 63.8, dOff: 0.5, r: 0.7, k: 0.45 }, { s: 66.5, dOff: 1.6, r: 0.8, k: 0.35 },
      ];
      this.slabs = [];
      this.ledge = null;
      this.gravelBar = { ...none, side: 1 };
      this.roughPatch = { ...none };
      this.gully = null;
    }
  }

  /** Flat Rocks zones: -1 none, 0 cobble bar, 1 recess under the overhang, 2 sandstone. */
  ledgeZone(s, d) {
    const lg = this.ledge;
    if (!lg || s < lg.s0 - 0.6 || s > lg.s1 + 0.6) return -1;
    const dd = d - (this.c(s) + this.wR(s));
    if (dd < -0.02) return -1;
    const wall = this.ledgeWall(s);
    if (dd < lg.bar) return 0;
    if (dd < wall) return s > lg.s0 + 0.2 && s < lg.s1 - 0.2 ? 1 : 0;
    return dd < lg.back + 0.4 ? 2 : -1;
  }
  /** Distance from the water's edge to the back wall of the undercut at s. */
  ledgeWall(s) { const lg = this.ledge; return lg.bar + lg.under + 0.18 * fbm(s * 1.7, 5.3, 2, 61); }

  /** The Springs stream's last stretch, carved into the main creek's east bank. */
  buildGully() {
    const end = TRIB_PATH[TRIB_PATH.length - 1];
    const L = this.locate(end[0], end[1], -1, {});
    const sB = 497.1;
    const g = { sA: L.s, dA: L.d, sB, dB: this.c(sB) - this.wL(sB) + 0.05, w: 0.44, D: 0.13, U: 1.6 };
    g.yB = this.y0(sB);
    g.yA = g.yB + 0.75;
    this.gully = g;
  }
  /** Gully centre (s, d, floor y) at parameter t in [0, 1] from the stream end to the creek. */
  gullyAt(t, out = {}) {
    const g = this.gully;
    out.s = g.sA + (g.sB - g.sA) * t; out.d = g.dA + (g.dB - g.dA) * t; out.y = g.yA + (g.yB - g.yA) * t;
    return out;
  }
  /** Distance from (s, d) to the gully axis, with the axis parameter. */
  gullyDist(s, d) {
    const g = this.gully;
    if (!g || s < Math.min(g.sA, g.sB) - 1.5 || s > Math.max(g.sA, g.sB) + 1.5) return null;
    const es = g.sB - g.sA, ed = g.dB - g.dA;
    let t = ((s - g.sA) * es + (d - g.dA) * ed) / (es * es + ed * ed);
    t = clamp(t, 0, 1);
    return { t, dist: Math.hypot(s - (g.sA + es * t), d - (g.dA + ed * t)) };
  }

  altD(s) {
    const a = this.alt;
    const c = this.c(s);
    const t = clamp((s - a.s0) / (a.s1 - a.s0), 0, 1);
    // leave the main channel, run along the creek-left, then come back into the pool
    const out = smoothstep(0, 0.14, t) * (1 - smoothstep(0.84, 1, t));
    return c + a.off * out;
  }
  altY(s) {
    const a = this.alt;
    // the branch first runs level with the creek beside it, then comes down in a stepped
    // cascade (little drops linked by short runs) to rejoin below the plunge pool
    const sB = a.s0 + 0.35 * (a.s1 - a.s0);
    if (s <= sB) return this.y0(Math.max(s, a.s0)) - 0.06 * smoothstep(a.s0, a.s0 + 3, s);
    const t = clamp((s - sB) / (a.s1 - sB), 0, 1);
    const y0 = this.y0(sB) - 0.06, y1 = this.y0(a.s1);
    const n = a.steps || 4;
    const k = t * n, i = Math.min(n - 1, Math.floor(k)), f = k - i;
    const step = (i + smoothstep(0.78, 0.92, f)) / n;
    const prof = 0.35 * t + 0.65 * step;
    return y0 + (y1 - y0) * prof;
  }
  /** 'main', 'alt' or null for which water channel a point lies in. */
  channelOf(s, d, margin = 0) {
    const c = this.c(s), dc = d - c;
    const w = dc < 0 ? this.wL(s) : this.wR(s);
    if (Math.abs(dc) <= w + margin) return 'main';
    const a = this.alt;
    if (s > a.s0 && s < a.s1 && Math.abs(d - this.altD(s)) <= a.w + margin) return 'alt';
    if (this.gully) { const gd = this.gullyDist(s, d); if (gd && gd.dist <= this.gully.w + margin) return 'gully'; }
    return null;
  }

  /** Raw bed function (used only for baking). */
  bedRaw(s, d, out, rf = null) {
    const F = rf || this;
    const i = Math.round(this.rowIndex(s));
    const y0 = this.rY0[i], c = this.rC[i], D = this.rD[i];
    const dc = d - c;
    const left = dc < 0;
    const w = left ? this.rWL[i] : this.rWR[i];
    const bankH = left ? this.rBankL[i] : this.rBankR[i];
    const bankW = this.rBankW[i];
    const u = Math.abs(dc) / w;
    let bed, mat;
    // far-field blend towards the smoothed valley elevation
    const far = smoothstep(1.5, 4.5, Math.abs(dc));
    const base = lerp(y0, this.rY0s[i], far);
    if (u <= 1) {
      const p = 1 - u * u;
      bed = y0 + 0.012 - (D + 0.012) * Math.pow(p, 0.55);
      mat = this.rBedMat[i];
    } else {
      const t = (u - 1) * w;
      let bank = bankH * smoothstep(0, bankW, t);
      if (bankH < 0) {
        // shelf rim then a cliff down to the lower catch area
        bank += 0.045 * Math.exp(-((t - 0.04) * (t - 0.04)) / 0.0012);
        bank = bankH * smoothstep(0.07, 0.07 + bankW, t) + 0.045 * smoothstep(0.0, 0.04, t) * (1 - smoothstep(0.06, 0.1, t));
      }
      const rise = 0.11 * Math.max(0, t - bankW) + 0.04 * Math.max(0, t - bankW - 3);
      bed = base + 0.012 + bank + rise;
      mat = t < 0.06 ? this.rBedMat[i] : this.rBankMat[i];
      if (bankH > 0.8 && bankW < 1.2 && t < bankW + 0.2) mat = MAT.ROCK; // rock walls; the Shelf's wooded slope stays earth
    }
    // ---- noise
    const rough = this.rRough[i];
    const n1 = fbm(s * 1.3, d * 1.3, 3, 11);
    const n2 = fbm(s * 7, d * 7, 2, 23);
    if (u <= 1) {
      bed += rough * 0.8 * n1 + rough * 0.5 * n2;
    } else {
      const rocky = mat === MAT.ROCK ? 1 : 0.5;
      const tb = (u - 1) * w;
      bed += (0.08 * n1 + 0.02 * n2 * rocky) * smoothstep(0, 0.6, tb);
      if (mat === MAT.ROCK && Math.abs(bankH) > 0.4) {
        // blocky, ledged rock faces
        const rn = Math.abs(fbm(s * 2.2, d * 2.2 + 3.1, 3, 41));
        bed += (0.1 * rn - 0.03) * smoothstep(0.02, 0.25, tb) * (1 - smoothstep(bankW + 0.5, bankW + 1.6, tb));
      }
    }
    // ---- islands (none on the creator's map at present)
    for (const isl of F.islands) {
      if (s <= isl.s0 || s >= isl.s1) continue;
      const ts = (s - isl.s0) / (isl.s1 - isl.s0);
      const hw = isl.halfW * Math.sin(Math.PI * ts) ** 0.6;
      const di = Math.abs(d - (c + isl.dOff));
      if (di < hw + 0.12) {
        const m = 1 - smoothstep(hw - 0.05, hw + 0.12, di);
        const top = y0 + isl.h * Math.sin(Math.PI * ts) ** 0.4 + (isl.rock ? 0.03 * n1 : 0.015 * n2);
        if (top > bed) { bed = lerp(bed, top, m); if (m > 0.4) mat = isl.rock ? MAT.ROCK : MAT.GRAVEL; }
      }
    }
    // ---- alternate route at the waterfall split: a stepped cascade in a shallow wooded valley.
    // Low banks beside the water, then a gentle slope up to the natural ground, so the water is
    // never down in a slot under walls of soil.
    const al = this.alt;
    if (F.hasAlt !== false && s > al.s0 - 0.2 && s < al.s1 + 0.2) {
      const ad = this.altD(s), da = Math.abs(d - ad);
      const corridor = al.w + 4.5;
      if (da < corridor + 0.8) {
        const ya = this.altY(s);
        let ab;
        if (da <= al.w) { const p = 1 - (da / al.w) ** 2; ab = ya + 0.01 - (al.D + 0.01) * Math.pow(p, 0.55); }
        else ab = ya + 0.01 + 0.2 * smoothstep(0, 0.18, da - al.w) + 0.3 * Math.max(0, da - al.w - 0.18) + 0.04 * n1;
        const mEdge = 1 - smoothstep(corridor, corridor + 0.8, da);
        // toward the creek the valley only ever lowers the ground; on the far side it is the valley
        const towardMain = Math.sign(d - ad) === Math.sign(c - ad);
        const target = towardMain ? Math.min(bed, ab) : ab;
        bed = lerp(bed, target, mEdge);
        if (da <= al.w + 0.02 && mEdge > 0.5) mat = MAT.ROCK;
      }
    }
    // ---- Crawfish Springs double-pond spring and runoff chute (right bank)
    for (const pd of F.ponds) {
      const es = (s - pd.s) / pd.rs, ed = (d - (this.c(pd.s) + pd.dOff)) / pd.rd;
      const r = Math.sqrt(es * es + ed * ed);
      if (r < 1.6) {
        const lvl = this.y0(pd.s) + pd.lift;
        const rim = lvl + 0.06 + 0.04 * n2;
        const pond = r < 1 ? lvl - pd.depth * (1 - r * r) ** 0.6 : rim + 0.08 * smoothstep(1, 1.6, r);
        const m = 1 - smoothstep(1.3, 1.6, r);
        bed = lerp(bed, pond, m);
        if (r < 1.05) mat = MAT.SAND;
      }
    }
    if (this.runoff) {
      const ro = this.runoff;
      if (s > ro.s0 - 0.2 && s < ro.s1 + 0.2) {
        const t = clamp((s - ro.s0) / (ro.s1 - ro.s0), 0, 1);
        const cd = this.c(s) + lerp(ro.dTop, ro.dBot, t);
        const dd = Math.abs(d - cd);
        if (dd < 0.22) {
          const top = this.y0(58.5) + 0.3, botY = this.y0(s) + 0.01;
          const floor = lerp(top, botY, t) - 0.04 * (1 - (dd / 0.22) ** 2);
          bed = Math.min(bed, lerp(bed, floor, 1 - smoothstep(0.1, 0.22, dd)));
        }
      }
    }
    // ---- Flat Rocks: broad low slabs with a shadowed undercut at the water
    for (const sb of F.slabs) {
      if (s < sb.s0 - 0.2 || s > sb.s1 + 0.2) continue;
      const dd = d - (c + this.rWR[i]);
      if (dd < sb.d0 - 0.08 || dd > sb.d1 + 0.3) continue;
      const ms = smoothstep(sb.s0 - 0.15, sb.s0 + 0.05, s) * (1 - smoothstep(sb.s1 - 0.05, sb.s1 + 0.15, s));
      const md = smoothstep(sb.d0 - 0.06, sb.d0, dd) * (1 - smoothstep(sb.d1, sb.d1 + 0.25, dd));
      const top = y0 + sb.h + 0.008 * n2;
      bed = lerp(bed, Math.max(bed, top), ms * md);
      if (ms * md > 0.5) mat = MAT.ROCK;
    }
    // ---- Flat Rocks: cobble bar, the undercut recess and the sandstone ledge (west bank)
    const lg = this.ledge;
    if (lg && s > lg.s0 - 1.0 && s < lg.s1 + 1.0) {
      const dd = d - (c + this.rWR[i]);
      if (dd > -0.02) {
        const ms = smoothstep(lg.s0 - 0.9, lg.s0 + 0.25, s) * (1 - smoothstep(lg.s1 - 0.25, lg.s1 + 0.9, s));
        const wall = this.ledgeWall(s);
        const barTop = y0 + 0.03 + 0.05 * smoothstep(0, lg.bar + lg.under, dd) + 0.012 * n2;
        let tgt, m2 = MAT.GRAVEL;
        if (dd < wall) tgt = barTop - (dd > lg.bar ? 0.025 : 0);
        else {
          const r = smoothstep(wall, wall + 0.1, dd);
          tgt = lerp(barTop, y0 + lg.h + 0.025 * n1 + 0.008 * n2, r);
          if (r > 0.3) m2 = MAT.ROCK;
        }
        if (dd > lg.back) tgt = Math.max(tgt, bed);
        bed = lerp(bed, tgt, ms * smoothstep(-0.02, 0.06, dd));
        if (ms > 0.5) mat = m2;
      }
    }
    // ---- gravel bar on inside of the trail-entrance bend (right side)
    const gb = this.gravelBar;
    if (s > gb.s0 && s < gb.s1 && dc > 0) {
      const ts = (s - gb.s0) / (gb.s1 - gb.s0);
      const m = Math.sin(Math.PI * ts) * smoothstep(0.1, 0.38, dc);
      bed = lerp(bed, Math.max(bed, y0 + 0.006 + 0.01 * n2), m);
    }
    // ---- rough gravel patch: big bumps (covered by the Gravel Run Mat)
    const rp = this.roughPatch;
    if (s > rp.s0 && s < rp.s1 && u < 1 && !this._noPatch) {
      const m = Math.sin(Math.PI * (s - rp.s0) / (rp.s1 - rp.s0));
      bed += 0.022 * m * (vnoise(s * 14, d * 14, 77) + 0.6);
    }
    // ---- bench pads
    for (const p of F.pads) {
      if (s > p.s0 - 0.6 && s < p.s1 + 0.6) {
        const edge = c + this.rWR[i];
        const d0 = edge + 0.3, d1 = edge + 1.8;
        if (d < d0 - 0.3 || d > d1 + 0.7) continue;
        const ms = smoothstep(p.s0 - 0.5, p.s0, s) * (1 - smoothstep(p.s1, p.s1 + 0.5, s));
        const md = smoothstep(d0 - 0.25, d0 + 0.05, d) * (1 - smoothstep(d1, d1 + 0.6, d));
        const m = ms * md;
        if (m > 0) { bed = lerp(bed, p.y + 0.004 * n2, m); if (m > 0.5) mat = MAT.DIRT; }
      }
    }
    // ---- notch under each launch chute so the trough never sits in the ground
    for (const p of F.pads) {
      const C = p.chute;
      if (s < C[0].s - 0.3 || s > C[2].s + 0.3) continue;
      for (let q = 0; q < 2; q++) {
        const A = C[q], B = C[q + 1];
        const es = B.s - A.s, ed = B.d - A.d;
        let t = ((s - A.s) * es + (d - A.d) * ed) / (es * es + ed * ed);
        t = clamp(t, 0, 1);
        const dist = Math.hypot(s - (A.s + es * t), d - (A.d + ed * t));
        if (dist < 0.16) {
          const floor = A.y + (B.y - A.y) * t - 0.035;
          const m = 1 - smoothstep(0.07, 0.16, dist);
          if (bed > floor) bed = lerp(bed, floor, m);
        }
      }
    }
    // ---- dry hollows behind the low rims of the plunge pool: balls kicked out of the
    // pool settle there and cannot roll back
    if (this.isMain && s > 451.05 && s < 453.2 && u > 1) {
      const t = (u - 1) * w;
      const ms = Math.sin(Math.PI * (s - 451.05) / 2.15);
      bed -= 0.16 * ms * Math.exp(-((t - 0.32) ** 2) / 0.012);
    }
    // ---- dry hollows beside the first Slate pocket pool and beside the Spillway apron
    for (const [h0, h1, depth] of this.hollows) {
      if (s > h0 && s < h1 && u > 1) {
        const t = (u - 1) * w;
        const ms = Math.sin(Math.PI * (s - h0) / (h1 - h0));
        bed -= depth * ms * Math.exp(-((t - 0.3) ** 2) / 0.012);
      }
    }
    // ---- potholes worn into the dry rock shelf beside the waterfall lip
    for (const ph of this.potholes) {
      const ds = s - ph.s, dd = d - (c + ph.d);
      const r2 = ds * ds + dd * dd;
      if (r2 < ph.r * ph.r * 2.2) bed -= ph.depth * Math.exp(-r2 / (ph.r * ph.r * 0.5));
    }
    // ---- the Springs stream's gully through the east bank, down to the creek
    if (this.gully && F.hasGully !== false) {
      const gd = this.gullyDist(s, d);
      if (gd && gd.dist < 1.6) {
        const g = this.gully, gy = this.gullyAt(gd.t).y;
        let gb;
        if (gd.dist <= g.w) { const p = 1 - (gd.dist / g.w) ** 2; gb = gy + 0.01 - (g.D + 0.01) * Math.pow(p, 0.55); }
        else gb = gy + 0.01 + 0.5 * smoothstep(0, 0.6, gd.dist - g.w) + 0.03 * n1;
        const m = 1 - smoothstep(1.0, 1.6, gd.dist);
        if (gb < bed) { bed = lerp(bed, gb, m); if (gd.dist <= g.w + 0.03 && m > 0.5) mat = MAT.ROCK; }
      }
    }
    // ---- basket area: shallow catch pan after the gate
    if (out) out.mat = mat;
    return bed;
  }

  /** Features that can touch row s (keeps the per-cell bed function cheap while baking). */
  rowFeatures(s) {
    const near = (a, b, m) => s > a - m && s < b + m;
    return {
      islands: this.islands.filter((x) => near(x.s0, x.s1, 0.2)),
      ponds: this.ponds.filter((x) => near(x.s - x.rs * 1.7, x.s + x.rs * 1.7, 0.1)),
      slabs: this.slabs.filter((x) => near(x.s0, x.s1, 0.3)),
      pads: this.pads.filter((p) => near(p.s0, p.s1, 0.8) || near(p.chute[0].s, p.chute[2].s, 0.4)),
      hasAlt: near(this.alt.s0, this.alt.s1, 0.3),
      hasGully: !!this.gully && near(Math.min(this.gully.sA, this.gully.sB), Math.max(this.gully.sA, this.gully.sB), 1.8),
    };
  }

  bakeBed() {
    const nd = Math.round((D_MAX - D_MIN) / DD) + 1;
    this.nD = nd;
    this.bed = new Float32Array(this.nS * nd);
    this.mat = new Uint8Array(this.nS * nd);
    const o = {};
    const COARSE = 4;
    for (let i = 0; i < this.nS; i++) {
      const s = this.sMin + i * DS;
      const rf = this.rowFeatures(s);
      const c = this.rC[i];
      const full = rf.hasAlt || rf.hasGully || rf.ponds.length > 0 || rf.pads.length > 0 || (this.ledge && s > this.ledge.s0 - 1 && s < this.ledge.s1 + 1);
      const base = i * nd;
      let lastJ = -1;
      for (let j = 0; j < nd; j++) {
        const d = D_MIN + j * DD;
        // far banks are smooth: sample every COARSE columns there and interpolate
        const far = !full && Math.abs(d - c) > 2.6 && j % COARSE !== 0 && j !== nd - 1;
        if (far) continue;
        this.bed[base + j] = this.bedRaw(s, d, o, rf);
        this.mat[base + j] = o.mat;
        if (lastJ >= 0 && j - lastJ > 1) {
          const h0 = this.bed[base + lastJ], h1 = this.bed[base + j];
          for (let q = lastJ + 1; q < j; q++) {
            const t = (q - lastJ) / (j - lastJ);
            this.bed[base + q] = h0 + (h1 - h0) * t;
            this.mat[base + q] = t < 0.5 ? this.mat[base + lastJ] : o.mat;
          }
        }
        lastJ = j;
      }
    }
    // Smooth surface of the Gravel Run Mat (bridges the rough patch)
    const rp = this.roughPatch;
    if (!this.isMain) { this.matI0 = this.matI1 = -1; this.matBed = new Float32Array(1); return; }
    this.matI0 = Math.floor((rp.s0 - 0.3 - this.sMin) / DS);
    this.matI1 = Math.ceil((rp.s1 + 0.3 - this.sMin) / DS);
    this.matBed = new Float32Array((this.matI1 - this.matI0 + 1) * nd);
    this._noPatch = true;
    for (let i = this.matI0; i <= this.matI1; i++) {
      const s = this.sMin + i * DS;
      for (let j = 0; j < nd; j++) {
        const d = D_MIN + j * DD;
        const raw = this.bedRaw(s, d, o);
        const inside = s > rp.s0 - 0.05 && s < rp.s1 + 0.05 && this.inChannel(s, d, -0.04);
        this.matBed[(i - this.matI0) * nd + j] = inside ? Math.max(raw + 0.012, this.bed[i * nd + j] - 0.004) : this.bed[i * nd + j];
      }
    }
    this._noPatch = false;
  }

  /** Height of the mat surface where installed (falls back to bed). */
  matH(s, d) {
    const fs = (s - this.sMin) / DS, fd = clamp((d - D_MIN) / DD, 0, this.nD - 1.001);
    const i = Math.floor(fs);
    if (i < this.matI0 || i >= this.matI1) return this.bedH(s, d);
    const j = fd | 0, ts = fs - i, td = fd - j, nd = this.nD;
    const b = this.matBed, k = (i - this.matI0) * nd + j;
    const a = b[k] + (b[k + 1] - b[k]) * td, c = b[k + nd] + (b[k + nd + 1] - b[k + nd]) * td;
    return a + (c - a) * ts;
  }

  /** Bilinear bed height and gradient in channel coords. Writes h, hs, hd. */
  bedAt(s, d, out) {
    let fs = (s - this.sMin) / DS, fd = (d - D_MIN) / DD;
    if (fs < 0) fs = 0; else if (fs > this.nS - 1.001) fs = this.nS - 1.001;
    if (fd < 0) fd = 0; else if (fd > this.nD - 1.001) fd = this.nD - 1.001;
    const i = fs | 0, j = fd | 0, ts = fs - i, td = fd - j;
    const nd = this.nD, b = this.bed;
    const k = i * nd + j;
    const h00 = b[k], h01 = b[k + 1], h10 = b[k + nd], h11 = b[k + nd + 1];
    const a = h00 + (h01 - h00) * td, c = h10 + (h11 - h10) * td;
    out.h = a + (c - a) * ts;
    out.hs = (c - a) / DS;
    out.hd = ((h01 - h00) + ((h11 - h10) - (h01 - h00)) * ts) / DD;
    out.mat = this.mat[(ts < 0.5 ? k : k + nd) + (td < 0.5 ? 0 : 1)];
    return out;
  }

  bedH(s, d) {
    let fs = clamp((s - this.sMin) / DS, 0, this.nS - 1.001), fd = clamp((d - D_MIN) / DD, 0, this.nD - 1.001);
    const i = fs | 0, j = fd | 0, ts = fs - i, td = fd - j;
    const nd = this.nD, b = this.bed, k = i * nd + j;
    const a = b[k] + (b[k + 1] - b[k]) * td, c = b[k + nd] + (b[k + nd + 1] - b[k + nd]) * td;
    return a + (c - a) * ts;
  }

  /** Water surface at (s, d), or -Infinity when dry. */
  waterLevel(s, d) {
    const f = this.rowIndex(s); const i = f | 0; const t = f - i;
    const c = this.rC[i] + (this.rC[i + 1] - this.rC[i]) * t;
    const dc = d - c;
    const w = dc < 0 ? this.rWL[i] + (this.rWL[i + 1] - this.rWL[i]) * t : this.rWR[i] + (this.rWR[i + 1] - this.rWR[i]) * t;
    if (Math.abs(dc) <= w + 0.03) return this.rY0[i] + (this.rY0[i + 1] - this.rY0[i]) * t;
    const a = this.alt;
    if (s > a.s0 && s < a.s1 && Math.abs(d - this.altD(s)) <= a.w + 0.03) return this.altY(s);
    if (this.gully) {
      const gd = this.gullyDist(s, d);
      if (gd && gd.dist <= this.gully.w + 0.03) return this.gullyAt(gd.t).y;
    }
    if (s > 55.5 && s < 60) {
      for (const pd of this.ponds) {
        const es = (s - pd.s) / pd.rs, ed = (d - (this.c(pd.s) + pd.dOff)) / pd.rd;
        if (es * es + ed * ed < 1) return this.y0(pd.s) + pd.lift;
      }
    }
    return -Infinity;
  }

  /** In either water channel (the main creek, the alternate route at the split, or the Springs gully). */
  inChannel(s, d, margin = 0) {
    return this.channelOf(s, d, margin) !== null;
  }

  inMain(s, d, margin = 0) {
    const c = this.c(s), dc = d - c;
    const w = dc < 0 ? this.wL(s) : this.wR(s);
    return Math.abs(dc) <= w + margin;
  }

  // ---------------------------------------------------------------- rocks
  buildRocks() {
    const rnd = mulberry32(1234);
    const rocks = [];
    const add = (s, d, r, opts = {}) => {
      const p = this.worldXZ(s, d);
      const bed = this.bedH(s, d);
      const bury = opts.bury ?? 0.35;
      const y = (opts.y ?? bed) + r * (1 - 2 * bury);
      rocks.push({ s, d, x: p.x, y, z: p.z, r, tag: opts.tag || 'rock', group: opts.group || null, decor: !!opts.decor, solid: opts.solid !== false });
    };
    // bank boulders along both sides
    for (let s = this.sMin + 1; s < this.sMax - 2; s += 0.35 + rnd() * 0.6) {
      for (const side of [-1, 1]) {
        if (rnd() < 0.3) continue;
        const c = this.c(s), w = side < 0 ? this.wL(s) : this.wR(s);
        const bankH = this.row(side < 0 ? this.rBankL : this.rBankR, s);
        // keep bench pads and gate clear
        let skip = false;
        for (const p of this.pads) if (side > 0 && s > p.s0 - 0.4 && s < p.s1 + 0.4) skip = true;
        if (s > S_FINISH - 0.8 && s < S_BASKET + 1.2) skip = true;
        if (skip) continue;
        const rockyBank = bankH > 0.8 || this.row(this.rRough, s) > 0.018;
        let r = rockyBank ? 0.08 + rnd() * 0.22 : 0.04 + rnd() * 0.12;
        if (bankH < 0 && side < 0) r = 0.05 + rnd() * 0.08; // shelf lip
        const dd = c + side * (w + 0.02 + r * (0.2 + rnd() * 0.9));
        add(s, dd, r, { bury: 0.3 + rnd() * 0.15, tag: 'bank' });
      }
    }
    // scattered boulders further up the banks
    const nScatter = Math.round((this.sMax - this.sMin) * 1.1);
    for (let k = 0; k < nScatter; k++) {
      const s = this.sMin + 1 + rnd() * (this.sMax - this.sMin - 3);
      const side = rnd() < 0.5 ? -1 : 1;
      const c = this.c(s), w = side < 0 ? this.wL(s) : this.wR(s);
      const dd = c + side * (w + 0.6 + rnd() * 6);
      let skip = false;
      for (const p of this.pads) if (s > p.s0 - 0.5 && s < p.s1 + 0.5 && dd > p.d0 - 0.4 && dd < p.d1 + 0.6) skip = true;
      if (s > S_FINISH - 1.5 && s < S_BASKET + 2 && Math.abs(dd - c) < 2.5) skip = true;
      if (skip) continue;
      add(s, dd, 0.1 + rnd() * rnd() * 0.6, { bury: 0.35, tag: 'boulder', decor: Math.abs(dd - c) > 2.5 });
    }
    // In-channel features
    if (this.isMain) {
    // the Clearing's deep pools: a stepping stone at the tail
    add(98.0, this.c(98.0) + 0.15, 0.06, { bury: 0.45, tag: 'stone' });
    // the Farlands braids: scattered cobbles and low gravel bars in the wide bed
    for (let ss = 1.5; ss < 31; ss += 1.1 + rnd() * 1.4) {
      const c = this.c(ss), side = rnd() < 0.5 ? -1 : 1, w = side < 0 ? this.wL(ss) : this.wR(ss);
      add(ss, c + side * w * (0.45 + rnd() * 0.45), 0.035 + rnd() * 0.04, { bury: 0.45, tag: 'braid', group: 'braidBars' });
    }
    // Shelf catch area jumble (below the drop)
    for (const [s, dd, r, bury] of [[328.9, 1.0, 0.075, 0.05], [329.05, 1.5, 0.075, 0.3], [328.62, 1.55, 0.065, 0.3], [329.3, 1.1, 0.06, 0.3], [328.95, 0.68, 0.07, 0.2]]) {
      add(s, dd, r, { bury, tag: 'catch', group: 'catchJumble' });
    }
    // a ball-sized notch between two rocks beside the landing
    add(329.22, this.c(329.22) + 0.1, 0.045, { y: this.y0(329.22) - 0.02, bury: 0.5, tag: 'catch', group: 'catchJumble' });
    add(329.3, this.c(329.3) + 0.2, 0.05, { y: this.y0(329.3) - 0.02, bury: 0.5, tag: 'catch', group: 'catchJumble' });
    // Waterfall lip rocks (sideways bounces) and approach boulders
    // horn rocks sitting right on the waterfall lip
    // horn rocks on the waterfall lip; beside each a smaller rock leaves a ball-sized notch
    for (const side of [-1, 1]) {
      add(450.75, this.c(450.75) + side * 0.13, 0.05, { y: this.y0(450.75) - 0.02, bury: 0.5, tag: 'lip' });
      add(450.79, this.c(450.79) + side * 0.235, 0.045, { y: this.y0(450.79) - 0.015, bury: 0.5, tag: 'lip' });
    }
    add(450.7, this.c(450.7) + 0.23, 0.07, { bury: 0.3, tag: 'lip' });
    for (const [s, dd, r] of [[415.7, 0.18, 0.05], [417.4, -0.16, 0.05], [449.4, 0.15, 0.045]]) add(s, this.c(s) + dd, r, { bury: 0.45, tag: 'stone' });
    for (const [s, dd, r] of [[552.7, -0.28, 0.06], [554.0, 0.3, 0.05]]) add(s, this.c(s) + dd, r, { bury: 0.45, tag: 'stone' });
    // ---- the Clearing: an exposed cobble toe below the wooded Shelf side (east bank)
    for (let k = 0; k < 18; k++) { const ss = 96.8 + rnd() * 2.8; add(ss, this.c(ss) - this.wL(ss) - 0.05 - rnd() * 0.3, 0.04 + rnd() * 0.05, { bury: 0.35, tag: 'cobble' }); }
    // rough patch pebbles (covered by the mat)
    for (let k = 0; k < 7; k++) {
      const s = this.roughPatch.s0 + 0.08 + rnd() * 0.75;
      const dd = this.c(s) + (rnd() - 0.5) * 0.55;
      add(s, dd, 0.016 + rnd() * 0.01, { bury: 0.3, tag: 'pebble', group: 'roughPebbles' });
    }
    // Flat Rocks: rounded cobbles all over the bar and into the shallows (the ground photo)
    if (this.ledge) {
      const lg = this.ledge;
      for (let k = 0; k < 520; k++) {
        const ss = lg.s0 - 1.0 + rnd() * (lg.s1 - lg.s0 + 2.0);
        const edge = this.c(ss) + this.wR(ss);
        const dd = -0.12 + rnd() * (lg.bar + 0.45);
        if (dd > lg.bar - 0.05 && ss > lg.s0 + 0.3 && ss < lg.s1 - 0.3 && rnd() < 0.7) continue; // keep the recess mostly clear
        const r = 0.022 + rnd() * rnd() * 0.08;
        add(ss, edge + dd, r, { bury: 0.5, tag: 'cobble', decor: true });
      }
    }
    // the primary waterfall route between the split and the falls: scattered stones near the edges
    for (let ss = 420; ss < 448; ss += 2.6 + rnd() * 1.8) { const side = rnd() < 0.5 ? -1 : 1; add(ss, this.c(ss) + side * (this.wR(ss) * 0.75), 0.04 + rnd() * 0.02, { bury: 0.45, tag: 'stone' }); }
    } else {
    // Springs pool: a few big submerged stones
    for (const [s, dd, r] of [[57, -0.6, 0.12], [59, 0.55, 0.11], [60.3, -0.3, 0.08]]) add(s, this.c(s) + dd, r, { bury: 0.5, tag: 'stone' });
    // Spillway snag rocks protruding from the sides (balls stall in their lee)
    for (const [s, side] of [[63.4, 1], [64.3, -1], [65.1, 1], [65.9, -1]]) {
      const c = this.c(s), w = 0.18;
      add(s, c + side * (w + 0.03), 0.085, { bury: 0.12, tag: 'snag' });
    }
    // rock jumble under the two drops in the runoff chute (covered by the landing boards)
    for (const st of this.STEPS) {
      const c = this.c(st.s + 0.5);
      add(st.s + 0.5, c - 0.16, 0.075, { bury: 0.25, tag: 'landing', group: 'runoffLanding' });
      add(st.s + 0.4, c + 0.12, 0.07, { bury: 0.1, tag: 'landing', group: 'runoffLanding' });
      add(st.s + 0.85, c + 0.02, 0.06, { bury: 0.3, tag: 'landing', group: 'runoffLanding' });
    }
    // the busiest bottleneck: at the Springs pool outlet two rocks leave a ball-sized notch
    add(61.92, this.c(61.92) - 0.44, 0.045, { y: this.y0(61.92) - 0.02, bury: 0.5, tag: 'snag', group: 'outletNotch' });
    add(62.0, this.c(62.0) - 0.54, 0.05, { y: this.y0(62.0) - 0.02, bury: 0.5, tag: 'snag', group: 'outletNotch' });
    }
    this.rocks = rocks;
  }

  // ---------------------------------------------------------------- flow field
  bakeFlow() {
    this.fD0 = this.cfg.fD0; this.fDD = 0.05; this.fDS = 0.1;
    const nd = Math.round((this.cfg.fD1 - this.fD0) / this.fDD) + 1;
    const ns = Math.round((this.sMax - this.sMin) / this.fDS) + 1;
    this.fnD = nd; this.fnS = ns;
    this.flowS = new Float32Array(ns * nd);
    this.flowD = new Float32Array(ns * nd);
    // eddies: s, d(relative to c), radius, tangential speed (+ = clockwise seen from above)
    const eddies = this.isMain ? [
      { s: 549.62, d: -0.3, R: 0.12, v: 0.05, trap: 0.05, tag: 'rootPocket' },
      { s: 453.0, d: 0.6, R: 0.34, v: -0.32, trap: 0.45, tag: 'poolEddy' },
      // the Clearing's deep pools: a slow recirculation on the east side, a faster tongue on the west
      { s: 98.3, d: -0.7, R: 0.62, v: 0.3, trap: 0.3, ring: true, tag: 'deepPool' },
    ] : [
      { s: 56.6, d: -0.55, R: 0.36, v: 0.15, trap: 0.05, ring: true, tag: 'springsL' }, { s: 59.8, d: 0.55, R: 0.32, v: -0.14, trap: 0.04, ring: true, tag: 'springsR' },
      // stagnant lower corners of the Springs pool beside the spillway mouth (the busiest bottleneck)
      { s: 61.75, d: -0.52, R: 0.17, v: 0.05, trap: 0.14, tag: 'cornerL' }, { s: 61.75, d: 0.5, R: 0.17, v: -0.05, trap: 0.14, tag: 'cornerR' },
      // Code Rot pocket at the mouth of the Springs runoff chute (simulated obstruction)
      { s: 58.9, d: 0.74, R: 0.24, v: -0.06, trap: 0.22, tag: 'codeRot' },
    ];
    this.eddies = eddies;
    const wetRocks = this.rocks.filter((r) => {
      const wl = this.waterLevel(r.s, r.d);
      return wl > -1e9 && r.y - r.r < wl && r.y + r.r > wl - 0.05;
    });
    const tmp = {};
    for (let i = 0; i < ns; i++) {
      const s = this.sMin + i * this.fDS;
      const ri = Math.round(this.rowIndex(s));
      const c = this.rC[ri], U = this.rU[ri], dcds = this.rDcds[ri];
      const wl = this.rWL[ri], wr = this.rWR[ri], y0 = this.rY0[ri];
      const nearRocks = wetRocks.filter((r) => Math.abs(r.s - s) < r.r * 5 + 0.2);
      const nearEddies = eddies.filter((e) => Math.abs(e.s - s) < e.R * 3);
      let dirS = 1, dirD = dcds;
      const l = Math.hypot(dirS, dirD); dirS /= l; dirD /= l;
      for (let j = 0; j < nd; j++) {
        const d = this.fD0 + j * this.fDD;
        const dc = d - c;
        const w = dc < 0 ? wl : wr;
        const u = Math.abs(dc) / w;
        let vs = 0, vd = 0;
        if (u < 1.15) {
          // slower near banks and in shallow edges
          const prof = Math.sqrt(clamp(1 - Math.pow(Math.min(u, 1), 4), 0.0, 1)) * 0.88 + 0.12;
          let sp = U * prof;
          // islands: water splits around them and comes back together below
          for (const isl of this.islands) {
            if (s <= isl.s0 - 0.4 || s >= isl.s1 + 0.4) continue;
            const di = d - (c + isl.dOff);
            const ts = clamp((s - isl.s0) / (isl.s1 - isl.s0), 0, 1);
            const push = Math.exp(-di * di / 0.08) * Math.sin(Math.PI * ts);
            vd += Math.sign(di || 1) * push * 0.25 * (s < (isl.s0 + isl.s1) / 2 ? 1 : -1);
          }
          if (this.isMain && s > 96.4 && s < 100.2 && dc > 0.25) sp *= 1 + 0.45 * Math.sin(Math.PI * (s - 96.4) / 3.8); // the deep pools' fast tongue
          // the waterfall split: the left side of the channel peels off towards the alternate route
          if (this.isMain && s > 417.1 && s < 418.6 && dc < 0.02) vd -= 0.95 * Math.sin(Math.PI * (s - 417.1) / 1.5) * smoothstep(-0.02, 0.12, -dc);
          // plunge pool roller below the waterfall
          if (this.isMain && s > 450.82 && s < 452.05) {
            const rs = (s - 450.82) / 1.23;
            const lat = 1 - smoothstep(0.1, 0.24, Math.abs(dc));
            sp = lerp(Math.max(sp, 0.45), -0.28 * Math.sin(Math.PI * clamp(rs * 1.05, 0, 1)), lat);
            // the roller spills outwards along the falls face, then leaves along the sides
            vd += Math.sign(dc || 0.01) * 0.06 * Math.sin(Math.PI * rs) * (1 - smoothstep(0.2, 0.32, Math.abs(dc)));
          }
          // the plunge pool's outflow skews towards its outside (left) edge
          // gorge step pools have smaller rollers
          for (const st of this.STEPS.filter((x) => x.name === 'gorge1' || x.name === 'gorge2' || x.name.startsWith('springsDrop'))) {
            if (s > st.s + 0.02 && s < st.s + 0.55) {
              const rs = (s - st.s - 0.02) / 0.53;
              const lat = 1 - smoothstep(0.15, 0.4, Math.abs(dc));
              sp = lerp(sp, -0.25 * Math.sin(Math.PI * rs), lat);
            }
          }
          vs = dirS * sp; vd += dirD * sp;
          // rocks: potential flow deflection plus a sheltered wake
          for (const r of nearRocks) {
            const wlv = y0;
            const hh = wlv - r.y;
            if (Math.abs(hh) >= r.r) continue;
            const Rw = Math.sqrt(r.r * r.r - hh * hh);
            const ps = s - r.s, pd = d - r.d;
            const rho2 = ps * ps + pd * pd;
            if (rho2 > (Rw * 5) ** 2) continue;
            // flow frame: x along (dirS, dirD)
            const x = ps * dirS + pd * dirD, y = -ps * dirD + pd * dirS;
            const r2 = Math.max(rho2, Rw * Rw);
            const R2 = Rw * Rw;
            let ux = 1 - (R2 * (x * x - y * y)) / (r2 * r2);
            let uy = (-R2 * 2 * x * y) / (r2 * r2);
            if (rho2 < R2) { ux = 0; uy = 0; }
            if (x > 0 && Math.abs(y) < Rw * 1.3 && x < Rw * 4.5) {
              const wk = 1 - (1 - x / (Rw * 4.5)) * (1 - Math.abs(y) / (Rw * 1.3));
              ux *= 0.15 + 0.85 * wk;
              // weak recirculation pulling floating things into the lee
              uy += -Math.sign(y) * 0.25 * (1 - wk);
            }
            const vx = sp * ux, vy = sp * uy;
            const ns2 = vx * dirS - vy * dirD, nd2 = vx * dirD + vy * dirS;
            vs += ns2 - dirS * sp; vd += nd2 - dirD * sp;
          }
          // eddies are sheltered: the main current is mostly absent inside them
          for (const e of nearEddies) {
            if (!e.trap) continue;
            const r = Math.hypot(s - e.s, dc - e.d);
            const f = 0.08 + 0.92 * smoothstep(e.R * 0.55, e.R * 1.25, r);
            vs *= f; vd *= f;
          }
          for (const e of nearEddies) {
            const ps = s - e.s, pd = dc - e.d;
            const r = Math.hypot(ps, pd);
            if (r < 1e-4) continue;
            const prof2 = r < e.R ? r / e.R : Math.exp(-(r - e.R) / (e.R * 0.6));
            // clockwise (seen from above, s down, d right): tangential = (pd, -ps)/r
            const k = e.v * prof2 / r;
            vs += k * pd * 1; vd += k * -ps;
            // surface convergence holds floating things on a ring inside the eddy
            if (e.trap) {
              // ring eddies hold things circling; still pockets gather them at the centre
              const kt = e.ring ? e.trap * (r - e.R * 0.6) / e.R * (1 - smoothstep(e.R, e.R * 1.5, r)) / r : e.trap * prof2 / r;
              vs -= kt * ps; vd -= kt * pd;
            }
            if (r < e.R * 1.2) { vs *= 0.7; vd *= 0.7; }
          }
          if (u > 1) { const f = 1 - smoothstep(1, 1.15, u); vs *= f; vd *= f; }
        }
        // the alternate cascade route carries its own current
        const al = this.alt;
        if (s > al.s0 && s < al.s1 && (u >= 1 || vs === 0)) {
          const da = d - this.altD(s);
          const ua = Math.abs(da) / al.w;
          if (ua < 1.15) {
            const dd = (this.altD(s + 0.1) - this.altD(s - 0.1)) / 0.2;
            const l2 = Math.hypot(1, dd);
            const sp = al.U * (Math.sqrt(clamp(1 - Math.min(ua, 1) ** 4, 0, 1)) * 0.85 + 0.15) * (1 - smoothstep(1, 1.15, ua));
            const f = u >= 1 ? 1 : 0.5;
            vs = vs * (1 - f) + (sp / l2) * f; vd = vd * (1 - f) + (sp * dd / l2) * f;
          }
        }
        // the Springs stream runs down its gully into the creek
        if (this.gully && (u >= 1 || vs === 0)) {
          const gd = this.gullyDist(s, d);
          if (gd && gd.dist < this.gully.w * 1.15) {
            const g = this.gully, es = g.sB - g.sA, ed = g.dB - g.dA, l3 = Math.hypot(es, ed);
            const sp = g.U * (Math.sqrt(clamp(1 - Math.min(gd.dist / g.w, 1) ** 4, 0, 1)) * 0.85 + 0.15) * (1 - smoothstep(g.w, g.w * 1.15, gd.dist));
            vs = (sp * es) / l3; vd = (sp * ed) / l3;
          }
        }
        this.flowS[i * nd + j] = vs;
        this.flowD[i * nd + j] = vd;
      }
    }
    // spring boils (upwelling) for visuals and a small outward push
    this.boils = this.isMain ? [] : [{ s: 52.9, d: 0.0, r: 0.2 }, { s: 56.4, d: 0.1, r: 0.18 }, { s: 58.3, d: -0.25, r: 0.15 }, { s: 59.6, d: 0.3, r: 0.16 }];
  }

  /**
   * Water velocity at a point. Writes world-space vx, vy, vz.
   * s/d are the point's channel coords; tx/tz the local tangent.
   */
  flowAt(s, d, y, t, tx, tz, out) {
    let fs = (s - this.sMin) / this.fDS, fd = (d - this.fD0) / this.fDD;
    out.vx = 0; out.vy = 0; out.vz = 0;
    if (fs < 0 || fs > this.fnS - 1.001 || fd < 0 || fd > this.fnD - 1.001) return out;
    const i = fs | 0, j = fd | 0, ts = fs - i, td = fd - j;
    const nd = this.fnD, k = i * nd + j;
    const A = this.flowS, B = this.flowD;
    let vs = (A[k] * (1 - td) + A[k + 1] * td) * (1 - ts) + (A[k + nd] * (1 - td) + A[k + nd + 1] * td) * ts;
    let vd = (B[k] * (1 - td) + B[k + 1] * td) * (1 - ts) + (B[k + nd] * (1 - td) + B[k + nd + 1] * td) * ts;
    // unsteady turbulence
    const ri = Math.round(this.rowIndex(s));
    const turb = this.rTurb[ri];
    if (vs !== 0 || vd !== 0) {
      const ts1 = Math.sin(1.9 * s + 2.3 * d + 1.7 * t) * 0.6 + Math.sin(3.7 * s - 1.1 * d - 2.9 * t + 1.3) * 0.4;
      const td1 = Math.sin(2.6 * s - 1.7 * d + 2.1 * t + 0.7) * 0.6 + Math.sin(4.3 * s + 2.9 * d + 3.3 * t) * 0.4;
      const mag = turb * (0.4 + 0.6 * Math.min(1, Math.hypot(vs, vd)));
      vs += ts1 * mag; vd += td1 * mag;
      // springs boils push outward
      if (this.boils.length && s > 52.5 && s < 60.5) {
        for (const b of this.boils) {
          const ps = s - b.s, pd = d - this.c(b.s) - b.d;
          const r2 = ps * ps + pd * pd;
          if (r2 < b.r * b.r * 4) { const f = 0.12 * Math.exp(-r2 / (b.r * b.r)) / Math.sqrt(r2 + 1e-4); vs += ps * f; vd += pd * f; }
        }
      }
      // plunge pools: the jet drives down, water runs downstream along the
      // bottom and boils up again, while the surface roller runs back to the falls
      for (let q = 0; q < this.POOLS.length; q++) {
        const P = this.POOLS[q];
        if (s < P.s - 0.02 || s > P.s + P.len) continue;
        const dep = this.rY0[ri] - y;
        const lat = 1 - smoothstep(P.w * 0.5, P.w, Math.abs(d - this.rC[ri]));
        const x = (s - P.s) / P.len;
        if (x < 0.3 && dep > -0.05 && dep < P.jetDepth) out.vy = -P.jet * (1 - x / 0.3) * lat;
        if (dep > 0.06) {
          const fr = Math.min(1, (dep - 0.06) / 0.06) * lat;
          vs = vs * (1 - fr) + P.under * fr;
          vd *= 1 - fr * 0.5;
        }
        if (x > 0.62 && x < 0.95 && dep > -0.05) out.vy = Math.max(out.vy, P.boil * Math.sin(Math.PI * (x - 0.62) / 0.33) * lat);
      }
    }
    // the deep pools' inflow sets toward the east-bank eddy (the float boom turns it back)
    if (this.isMain && s > 95.8 && s < 98.2) { const dc = d - this.rC[ri]; if (dc > -0.55 && dc < 0.9) vd -= 0.26 * Math.sin(Math.PI * (s - 95.8) / 2.4); }
    // installed equipment that changes the water itself
    const M = this.mods;
    if (M) {
      if (M.basinVane && this.isMain && s > 96.4 && s < 100.2) {
        const dc = d - this.rC[ri];
        if (dc < 0.3 && dc > -1.4) { const f = Math.sin(Math.PI * (s - 96.4) / 3.8); vd += 0.32 * f; vs += 0.22 * f; }
      }
      if (M.headGuide && this.isMain && s > 1 && s < 31) { const dc = d - this.rC[ri]; if (Math.abs(dc) > 0.4) { vd -= Math.sign(dc) * 0.24; vs += 0.1; } } // Farlands braid guide
      if (M.habitatGuide && !this.isMain && s > 57.2 && s < 60.6) { const dc = d - this.rC[ri]; if (dc > 0.45) vd -= 0.2; }
    }
    const nx = -tz, nz = tx;
    out.vx = tx * vs + nx * vd;
    out.vz = tz * vs + nz * vd;
    return out;
  }

  // Air movement: the Folk Draft (descending air at the Continental Shelf drop)
  windAt(s, d, y, t, out) {
    out.vx = 0; out.vy = 0; out.vz = 0;
    if (this.isMain && s > 326.6 && s < 329.6) {
      const ri = Math.round(this.rowIndex(s));
      const m = Math.sin(Math.PI * (s - 326.6) / 3.0) * (1 - smoothstep(1.2, 3.2, Math.abs(d - 1.4)));
      const gust = 0.75 + 0.25 * Math.sin(t * 1.3) * Math.sin(t * 0.37 + 1);
      // a Shelf Wind Screen breaks the draft along the protected ball lane
      const screen = this.mods && this.mods.windScreen && Math.abs(d - 1.6) < 0.7 && s < 328.6 ? 0.3 : 1;
      out.vy = -5.0 * m * gust * screen;
      // push towards the lower catch area (towards the approach channel at d≈0.5)
      const lat = clamp((1.2 - d) * 1.5, -2.2, 2.2) * m * gust * screen;
      const fr = this.frame(s);
      out.vx = fr.nx * lat + fr.tx * 0.6 * m;
      out.vz = fr.nz * lat + fr.tz * 0.6 * m;
      void ri;
    }
    return out;
  }

  // ---------------------------------------------------------------- colliders
  buildColliders() {
    const cols = [];
    this.colliders = cols;
    const P = (s, d, y) => { const p = this.worldXZ(s, d); return [p.x, y, p.z]; };
    for (const r of this.rocks) {
      if (r.decor || !r.solid) continue;
      cols.push({ type: 0, x: r.x, y: r.y, z: r.z, r: r.r * 0.94, mat: MAT.ROCK, group: r.group, tag: r.tag });
    }
    const capsule = (a, b, r, mat, group, tag) => cols.push({ type: 1, ax: a[0], ay: a[1], az: a[2], bx: b[0], by: b[1], bz: b[2], r, mat, group, tag });
    this.capsule = capsule;
    if (this.isMain) {
    // ---- exposed root at the trail entrance: comes out of the left bank, lies along the
    // surface and dives into the bed. Near the bank it lifts just enough to trap a ball.
    {
      const sA = 549.48, sB = 549.86, sC = 550.12;
      const cA = this.c(sA), cB = this.c(sB), cC = this.c(sC);
      const A0 = P(sA - 0.12, cA - this.wL(sA) - 0.32, this.bedH(sA - 0.12, cA - this.wL(sA) - 0.32) + 0.015);
      const A = P(sA, cA - this.wL(sA) + 0.04, this.y0(sA) + 0.03);
      const B = P(sB, cB - 0.13, this.y0(sB) + 0.014);
      const C = P(sC, cC + 0.03, this.bedH(sC, cC + 0.03) - 0.005);
      // a short spur reaching back upstream from the root's elbow forms a notch against the bank
      const D = P(sA - 0.13, this.c(sA - 0.13) - 0.3, this.y0(sA - 0.13) + 0.012);
      capsule(A0, A, 0.028, MAT.WOOD, 'root', 'root');
      capsule(A, B, 0.026, MAT.WOOD, 'root', 'root');
      capsule(B, C, 0.022, MAT.WOOD, 'root', 'root');
      capsule(A, D, 0.02, MAT.WOOD, 'root', 'root');
      this.rootPts = [A0, A, B, C];
      this.rootSpur = [A, D];
      // Root Bend Rail: closes the mouth of the notch so balls slide past the root's tip
      const sr = sA - 0.36, dr = this.c(sr) - this.wL(sr) - 0.12;
      const ra = P(sr, dr, Math.max(this.bedH(sr, dr), this.y0(sr)) + 0.016);
      const rb = P(sA - 0.06, this.c(sA - 0.06) - 0.19, this.y0(sA - 0.06) + 0.016);
      capsule(ra, rb, 0.012, MAT.METAL, 'rootRail', 'rail');
      this.rootRailPts = [ra, rb];
    }
    // ---- Splash guard: angled boards at the lip turn balls that glance off the horn rocks
    // back into the centre slot instead of into the notches beside them
    {
      for (const side of [-1, 1]) {
        const a = P(450.2, this.c(450.2) + side * 0.25, this.y0(450.2) + 0.03), b = P(450.72, this.c(450.72) + side * 0.112, this.y0(450.72) + 0.03);
        cols.push(this.obbFromSegment(a, b, 0.01, 0.06, MAT.WOOD, 'splashGuard'));
      }
    }
    // ---- Pool guide boom (floating, at the surface)
    {
      const y = this.y0(452.8);
      const pts = [[451.7, 0.5], [452.4, 0.4], [453.4, 0.36], [454.3, 0.3]].map(([s, dd]) => P(s, this.c(s) + dd, y + 0.01));
      for (let i = 0; i < pts.length - 1; i++) capsule(pts[i], pts[i + 1], 0.03, MAT.RUBBER, 'poolGuide', 'boom');
      this.poolGuidePts = pts;
    }
    // ---- Shelf catch ramp: receives balls off the shelf drop and sends them to the approach
    {
      const hiS = 328.5, loS = 329.55;
      const a = P(hiS, 1.32, this.y0(328.8) + 0.16);
      const b = P(loS, 0.8, this.y0(329.55) + 0.004);
      const ramp = this.obbFromSegment(a, b, 0.42, 0.01, MAT.WOOD, 'catchRamp', true);
      cols.push(ramp);
      this.catchRamp = { a, b, halfW: 0.42 };
      // side boards keep balls on the ramp
      for (const side of [-1, 1]) {
        const la = P(hiS, 1.32 + side * 0.42, this.y0(328.8) + 0.2);
        const lb = P(loS, 0.8 + side * 0.42, this.y0(329.55) + 0.05);
        capsule(la, lb, 0.015, MAT.WOOD, 'catchRamp', 'lip');
      }
    }
    // ---- the route split at the waterfall: an adjustable gate (Direct: close the alternate
    // branch's mouth; Calm: turn balls into it), and the merge rail where the branches rejoin
    {
      // pivot on the nose of the bank between the two branches; Direct lays the boom upstream
      // along the east edge across the alternate branch's mouth, Calm swings it to the west bank so
      // the current carries balls along it into the mouth
      const sp = 418.9, c = this.c(sp), y = this.y0(sp) + 0.02;
      const T = P(sp, c - this.wL(sp) - 0.07, y);
      capsule(T, P(416.8, this.c(416.8) - this.wL(416.8) + 0.02, this.y0(416.8) + 0.02), 0.02, MAT.WOOD, 'gateDirect', 'gate');
      capsule(T, P(417.0, this.c(417.0) + this.wR(417.0) - 0.02, this.y0(417.0) + 0.02), 0.02, MAT.WOOD, 'gateCalm', 'gate');
      this.splitGatePivot = T;
      const ma = P(466.4, this.c(466.4) - 0.36, this.y0(466.4) + 0.02), mb = P(468.0, this.c(468.0) - 0.12, this.y0(468.0) + 0.02);
      capsule(ma, mb, 0.018, MAT.WOOD, 'splitMergeRail', 'rail');
      this.mergeRailPts = [ma, mb];
    }
    // ---- the Clearing's deep pools: float boom along the eddy line
    {
      const pts = [[96.7, -0.22], [97.6, -0.3], [98.4, -0.32], [99.2, -0.25], [99.9, -0.12]].map(([ss, dd]) => P(ss, this.c(ss) + dd, this.y0(ss) + 0.01));
      for (let q = 0; q < pts.length - 1; q++) capsule(pts[q], pts[q + 1], 0.03, MAT.RUBBER, 'basinBoom', 'boom');
      this.basinBoomPts = pts;
    }
    // ---- the Farlands braids: floating guides along both shallow margins and low rails on the main braid
    {
      const pts = [];
      for (const side of [-1, 1]) {
        const g = [];
        for (let ss = 3; ss <= 29; ss += 2.6) g.push(P(ss, this.c(ss) + side * 0.62, this.y0(ss) + 0.01));
        for (let q = 0; q < g.length - 1; q++) capsule(g[q], g[q + 1], 0.028, MAT.RUBBER, 'headGuide', 'boom');
        pts.push(g);
      }
      this.headGuidePts = pts[0];
      this.headGuidePts2 = pts[1];
      for (const side of [-1, 1]) {
        const rp = [];
        for (let ss = 4; ss <= 30; ss += 0.5) rp.push(P(ss, this.c(ss) + side * 0.38, this.y0(ss) + 0.02));
        for (let q = 0; q < rp.length - 1; q++) capsule(rp[q], rp[q + 1], 0.01, MAT.METAL, 'headRails', 'rail');
      }
    }
    // ---- finish gate posts
    {
      const s = S_FINISH, c = this.c(s);
      for (const side of [-1, 1]) {
        const d = c + side * (this.wR(s) + 0.07);
        const base = P(s, d, this.bedH(s, d) - 0.05);
        const top = [base[0], base[1] + 0.9, base[2]];
        capsule(base, top, 0.04, MAT.WOOD, null, 'gate');
      }
    }
    } else {
    // ---- Spillway rails
    {
      for (const side of [-1, 1]) {
        const pts = [];
        const w0 = side < 0 ? this.wL(62.15) : this.wR(62.15);
        pts.push(P(62.15, this.c(62.15) + side * (w0 + 0.03), this.y0(62.15) + 0.02));
        pts.push(P(62.6, this.c(62.6) + side * 0.17, this.y0(62.6) + 0.022));
        for (let s = 62.95; s <= 66.9; s += 0.35) pts.push(P(s, this.c(s) + side * 0.13, this.y0(s) + 0.025));
        for (let i = 0; i < pts.length - 1; i++) capsule(pts[i], pts[i + 1], 0.01, MAT.METAL, 'spillRail', 'rail');
      }
    }
    // ---- Spring debris screen (fixed posts)
    {
      const pts = [[55.6, -0.25], [57.2, -0.45], [59.2, -0.45], [60.8, -0.3]].map(([s, dd]) => P(s, this.c(s) + dd, this.y0(s) + 0.03));
      for (let i = 0; i < pts.length - 1; i++) capsule(pts[i], pts[i + 1], 0.012, MAT.METAL, 'debrisScreen', 'screen');
      this.screenPts = pts;
    }
    // ---- runoff chute landing boards over the jumble under each drop
    for (const st of this.STEPS) {
      const y = this.y0(st.s + 0.5);
      const a = P(st.s + 0.12, this.c(st.s + 0.12), y + 0.02), b = P(st.s + 0.95, this.c(st.s + 0.95), y - 0.02);
      cols.push(this.obbFromSegment(a, b, 0.42, 0.012, MAT.WOOD, 'landingBoards', true));
    }
    this.landingBoards = this.STEPS.length ? { s: this.STEPS[0].s } : null;
    // ---- Crawfish Springs: raised guide around the habitat edge, rejoining at the spillway
    {
      const pts = [[56.9, 0.5], [58.0, 0.48], [59.2, 0.5], [60.4, 0.45], [61.6, 0.3]].map(([ss, dd]) => P(ss, this.c(ss) + dd, this.y0(ss) + 0.02));
      for (let q = 0; q < pts.length - 1; q++) capsule(pts[q], pts[q + 1], 0.02, MAT.WOOD, 'habitatBypass', 'boom');
      this.habitatPts = pts;
    }
    }
    this.buildColliderGrid();
  }

  /** Oriented box from a centre segment; `floor` puts the top face on the segment. */
  obbFromSegment(a, b, halfW, halfH, mat, group, floor = false) {
    let ex = b[0] - a[0], ey = b[1] - a[1], ez = b[2] - a[2];
    const len = Math.hypot(ex, ey, ez); ex /= len; ey /= len; ez /= len;
    // side axis: horizontal perpendicular
    let sx = -ez, sz = ex; const sl = Math.hypot(sx, sz); sx /= sl; sz /= sl;
    // up = side x forward... compute u = e x s
    let ux = ey * sz - ez * 0, uy = ez * sx - ex * sz, uz = ex * 0 - ey * sx;
    if (uy < 0) { ux = -ux; uy = -uy; uz = -uz; sx = -sx; sz = -sz; }
    const ul = Math.hypot(ux, uy, uz); ux /= ul; uy /= ul; uz /= ul;
    let cx = (a[0] + b[0]) / 2, cy = (a[1] + b[1]) / 2, cz = (a[2] + b[2]) / 2;
    let hx = len / 2, hy = halfH, hz = halfW;
    if (floor) { cx -= ux * halfH; cy -= uy * halfH; cz -= uz * halfH; }
    else {
      // wall: vertical plate, height axis = world-ish up, thickness = side
      hy = halfH; hz = halfW;
      return { type: 2, cx, cy, cz, ax: [ex, ey, ez], ay: [ux, uy, uz], az: [sx, 0, sz], h: [hx, halfH, halfW], mat, group, wall: true };
    }
    return { type: 2, cx, cy, cz, ax: [ex, ey, ez], ay: [ux, uy, uz], az: [sx, 0, sz], h: [hx, hy, hz], mat, group };
  }

  buildColliderGrid() {
    this.gcell = 0.5;
    this.grid = new Map();
    this.colliders.forEach((c, idx) => this.insertCollider(c, idx));
  }

  colliderBounds(c) {
    if (c.type === 0) return [c.x - c.r, c.z - c.r, c.x + c.r, c.z + c.r];
    if (c.type === 1) return [Math.min(c.ax, c.bx) - c.r, Math.min(c.az, c.bz) - c.r, Math.max(c.ax, c.bx) + c.r, Math.max(c.az, c.bz) + c.r];
    const ext = Math.abs(c.ax[0]) * c.h[0] + Math.abs(c.ay[0]) * c.h[1] + Math.abs(c.az[0]) * c.h[2];
    const ezt = Math.abs(c.ax[2]) * c.h[0] + Math.abs(c.ay[2]) * c.h[1] + Math.abs(c.az[2]) * c.h[2];
    return [c.cx - ext, c.cz - ezt, c.cx + ext, c.cz + ezt];
  }

  insertCollider(c, idx) {
    const [x0, z0, x1, z1] = this.colliderBounds(c);
    const g = this.gcell, m = BALL_R + 0.02;
    for (let i = Math.floor((x0 - m) / g); i <= Math.floor((x1 + m) / g); i++) {
      for (let j = Math.floor((z0 - m) / g); j <= Math.floor((z1 + m) / g); j++) {
        const key = i * 100003 + j;
        let a = this.grid.get(key);
        if (!a) { a = []; this.grid.set(key, a); }
        a.push(idx);
      }
    }
  }

  cellList(x, z) {
    return this.grid.get(Math.floor(x / this.gcell) * 100003 + Math.floor(z / this.gcell));
  }

  // ---------------------------------------------------------------- launch geometry
  /** Chute polyline (release, kink, exit) in world coords for start k. */
  chuteFor(k) {
    const st = STARTS[k];
    const s = this.siteS(st);
    const pad = this.padByK[k];
    const c = this.c(s), wR = this.wR(s), y0 = this.y0(s);
    const P = (ss, dd, y) => { const p = this.worldXZ(ss, dd); return [p.x, y, p.z]; };
    const benchTop = pad.y + 0.55;
    const [a, b, e] = pad.chute;
    const R0 = P(a.s, a.d, a.y), M = P(b.s, b.d, b.y), E = P(e.s, e.d, e.y);
    void c; void wR; void y0;
    return { R0, M, E, benchTop, pad };
  }

  chuteColliders(k) {
    const { R0, M, E } = this.chuteFor(k);
    const out = [];
    const seg = (a, b) => {
      out.push(this.obbFromSegment(a, b, 0.048, 0.006, MAT.WOOD, 'chute', true));
      // side walls
      let ex = b[0] - a[0], ez = b[2] - a[2]; const l = Math.hypot(ex, ez); ex /= l; ez /= l;
      const nx = -ez, nz = ex;
      for (const side of [-1, 1]) {
        const o = 0.052 * side;
        const aa = [a[0] + nx * o, a[1] + 0.03, a[2] + nz * o], bb = [b[0] + nx * o, b[1] + 0.03, b[2] + nz * o];
        out.push(this.obbFromSegment(aa, bb, 0.005, 0.032, MAT.WOOD, 'chute'));
      }
    };
    seg(R0, M); seg(M, E);
    return out;
  }
}
