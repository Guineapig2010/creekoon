// World objects added by the New Creek Nation expansion: equipment for the new reaches,
// lore-linked gadgets, the Bank Workshop yard and carts, field-note landmarks, Code Rot
// observations, crayfish and Nigatron, signs and map boards.
import * as THREE from 'three';
import { STARTS } from '../core/config.js';
import { SWEEPERS, WORKSHOP } from '../core/game.js';
import { MATS, mats, box, cyl, rod, obbMesh, capsuleMesh, sprite } from './equipment.js';
import { labelTexture } from './textures.js';
import { mulberry32, fbm } from '../core/noise.js';

const V = (a) => new THREE.Vector3(a[0], a[1], a[2]);

// Where for-sale stakes stand for the new creek equipment (s, bank side)
export const NEW_SPOTS = {
  slateBumpers: [-12.2, 1], slateOutlet: [-7.9, 1], leafGrate: [-14.75, -1], willowShield: [-26.1, 1], willowFlare: [-22.9, -1],
  splitGate: [-51.6, 1], splitMergeRail: [-40.8, 1], basinBoom: [-69, 1], basinVane: [-65.6, 1], spillApron: [-90.2, 1],
  spillSkimmer: [-87.8, 1], sluiceAlternator: [-121.4, 1], sluiceMerge: [-108.4, 1], headGuide: [-146.5, -1], headRails: [-134.2, 1],
  draftRibbon: [327.4, -1], windScreen: [326.2, -1], springsSampler: [58.2, -1, 'springs'], habitatBypass: [57.3, 1, 'springs'], branchSweeper: [47.4, -1],
};

/** Historical / field-note landmarks and their game placement status. */
// PROVISIONAL: every mapped landmark below is an approximate placement in game coordinates;
// unmapped landmarks have no position on purpose.
export function landmarkPlacements(cr) {
  const P = (s, dOff, ch = cr) => { const d = ch.c(s) + dOff; const p = ch.worldXZ(s, d); return { s, d, ch: ch.kind, x: p.x, y: Math.max(ch.bedH(s, d), ch.y0(s)), z: p.z }; };
  const sp = cr.springs || cr;
  return [
    { id: 'waterfallZone', name: 'Waterfall Zone', layer: 'field', ...P(451.6, 1.2), note: 'Historical area label at the falls. Waterfall Run is the game launch above the split.' },
    { id: 'split', name: 'Route split', layer: 'field', ...P(417.6, 0.6), note: 'The creek-right branch is the primary waterfall route; the alternate branch leaves on the creek-left (east) and rejoins below the falls. Placed from the creator’s map.' },
    { id: 'tapedSign', name: 'Taped sign (about 20 ft upstream of the split)', layer: 'field', ...P(414.4, -0.7), note: 'Field sign on a fallen trunk, about 20 ft (3 m at the game’s half scale) upstream of the split. Camera pin C (photo viewpoint) is a separate concept.' },
    { id: 'falls', name: 'Falls (primary route)', layer: 'field', ...P(450.8, -0.4), note: 'The falls sit farther down the primary route, at the creator’s red marks, about 67 m below the split on the map.' },
    { id: 'shelf', name: 'Continental Shelf', layer: 'field', ...P(230, -2.4), note: 'The rock terrace along the creek’s east bank (on your right walking upstream), from the Springs climb all the way up to the deep pools.' },
    { id: 'shelfClimb', name: 'Brushy opening and Shelf climb', layer: 'field', ...P(512, -1.9), note: 'Across from photo pin A: the brushy opening where you climb the Shelf to reach the Springs runoff chute and the double ponds (IMG_8183).' },
    { id: 'springsPonds', name: 'Crawfish Springs double ponds', layer: 'field', ...P(57.7, 1.8, sp), note: 'A secondary stream: the large double-pond spring in the deep forest on the Shelf, with crawfish. Its runoff chute joins the creek below the falls. Pond edges are illustrative, not surveyed.' },
    { id: 'flatRocks', name: 'Flat Rocks (usual historical start)', layer: 'field', ...P(142.8, 4.7), note: 'The big flat rocks: a thick sandstone ledge overhanging a dark undercut on the west bank, with a cobble bar and shallow water below (creator’s photo). About 270 m (map: 500 m) above the route split.' },
    { id: 'clearing', name: 'The Clearing and deep pools', layer: 'field', ...P(98.3, -0.5), note: 'Open reach where Nigatron, a large water bug, was found while carrying race balls upstream. Grass on the west side, the wooded Shelf to the east.' },
    { id: 'farlands', name: 'Farlands entrance', layer: 'field', ...P(33.5, 0), note: 'Entry marker, not a boundary, just above the deep pools where the Shelf ends. The Farlands continue upstream; only one or two expeditions have gone in.' },
    { id: 'finish', name: 'Regular finish (trail entrance)', layer: 'field', ...P(555, 0.6), note: 'Provisional game placement. Historical coordinates stay unset until the creator shares an anchor.' },
    // known names with no supported location: listed, never placed
    { id: 'norwayCavern', name: 'Norway Cavern', layer: 'field', unmapped: true, note: 'Site of the cut-branch extraction during the Great 300-Ball Race. Location not established.' },
    { id: 'crayfishPond', name: 'Crayfish Pond', layer: 'field', unmapped: true, note: 'A hawk was seen here during the 300-ball race. Separate from Crawfish Springs. Location not established.' },
    { id: 'peytonsPool', name: 'Peyton’s Pool', layer: 'field', unmapped: true, note: '#10 hemmy was recovered at or near here. Location not established.' },
    { id: 'nigusHowling', name: 'Nigus Howling Point', layer: 'field', unmapped: true, note: 'Named in expedition notes. Location not established.' },
    { id: 'leafCavern', name: 'Leaf-hidden cavern (unnamed)', layer: 'field', unmapped: true, note: 'From the 300-ball race records. Unnamed and separate from Norway Cavern. Location not established.' },
  ];
}

export class Expansion {
  constructor(scene, creek, game) {
    mats();
    this.scene = scene;
    this.creek = creek;
    this.items = {};
    this.stakes = {};
    const cr = creek, cols = creek.colliders;
    const spr = creek.springs || creek;
    const groupMeshes = (group, mat) => {
      const g = new THREE.Group();
      for (const c of [...cols, ...(creek.springs ? creek.springs.colliders : [])]) {
        if (c.group !== group) continue;
        if (c.type === 1) g.add(capsuleMesh(c, mat));
        else if (c.type === 2) g.add(obbMesh(c, mat));
      }
      return g;
    };
    const add = (id, g) => { g.visible = false; scene.add(g); this.items[id] = g; };
    const buoyLine = (pts, matA, matB) => {
      const g = new THREE.Group();
      const P = pts.map(V);
      for (let i = 0; i < P.length - 1; i++) {
        const a = P[i], b = P[i + 1];
        const n = Math.ceil(a.distanceTo(b) / 0.16);
        const dir = b.clone().sub(a).normalize();
        for (let k = 0; k < n; k++) {
          const fl = cyl(0.028, 0.028, 0.13, k % 2 ? matA : matB, 10);
          fl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
          fl.position.copy(a.clone().lerp(b, (k + 0.5) / n));
          g.add(fl);
        }
      }
      return g;
    };
    add('willowShield', groupMeshes('willowShield', MATS.steel));
    add('willowFlare', groupMeshes('willowFlare', MATS.wood));
    add('slateBumpers', groupMeshes('slateBumpers', MATS.rubber));
    add('leafGrate', groupMeshes('leafGrate', MATS.darkSteel));
    add('splitMergeRail', groupMeshes('splitMergeRail', MATS.wood));
    add('basinBoom', buoyLine(cr.basinBoomPts, MATS.yellow, MATS.orange));
    add('spillApron', groupMeshes('spillApron', MATS.wood));
    add('headGuide', buoyLine(cr.headGuidePts, MATS.white, MATS.blue));
    add('headRails', groupMeshes('headRails', MATS.steel));
    add('habitatBypass', groupMeshes('habitatBypass', MATS.bark));
    // Splitstone gate: a pivoting boom that swings between the two lanes
    {
      const g = new THREE.Group();
      const T = V(cr.splitGatePivot);
      g.position.copy(T);
      g.add(cyl(0.05, 0.06, 0.5, MATS.darkSteel, 10).translateY(0.1));
      const arm = new THREE.Group();
      const len = 0.95;
      const boom = box(len, 0.04, 0.05, MATS.wood, len / 2, 0, 0);
      arm.add(boom);
      g.add(arm);
      const fr = cr.frame(-51.15);
      g.rotation.y = Math.atan2(fr.tz, -fr.tx); // local +x points upstream
      this.gateArm = arm;
      add('splitGate', g);
    }
    // Sluice alternator: two flaps at the rib tip
    {
      const g = new THREE.Group();
      g.position.copy(V(cr.sluicePivot));
      g.add(cyl(0.04, 0.05, 0.4, MATS.darkSteel, 10).translateY(0.1));
      const flap = new THREE.Group();
      flap.add(box(0.7, 0.05, 0.03, MATS.steel, 0.35, 0, 0));
      g.add(flap);
      const fr = cr.frame(-121);
      g.rotation.y = Math.atan2(fr.tz, -fr.tx);
      this.sluiceFlap = flap;
      add('sluiceAlternator', g);
    }
    // Sluice merge basin: low wing walls opening the gravel bar
    {
      const g = new THREE.Group();
      for (const side of [-1, 1]) {
        const a = [...Object.values(cr.worldXZ(-110.6, cr.c(-110.6) + side * 0.62))];
        const pa = cr.worldXZ(-110.6, cr.c(-110.6) + side * 0.62), pb = cr.worldXZ(-106.4, cr.c(-106.4) + side * 0.8);
        void a;
        g.add(rod([pa.x, cr.y0(-110.6) + 0.05, pa.z], [pb.x, cr.y0(-106.4) + 0.05, pb.z], 0.025, MATS.darkWood));
      }
      add('sluiceMerge', g);
    }
    // Slate Pool Outlet: a cut board lip at the outlet
    {
      const g = new THREE.Group();
      const pa = cr.worldXZ(-7.75, cr.c(-7.75) - 0.3), pb = cr.worldXZ(-7.75, cr.c(-7.75) + 0.3);
      g.add(rod([pa.x, cr.y0(-7.75) - 0.03, pa.z], [pb.x, cr.y0(-7.75) - 0.03, pb.z], 0.02, MATS.wood));
      add('slateOutlet', g);
    }
    // Basin flow vane: three angled fins at the eddy line
    {
      const g = new THREE.Group();
      for (const ss of [-70.5, -68, -65.5]) {
        const p = cr.worldXZ(ss, cr.c(ss) - 0.05);
        const fin = box(0.4, 0.12, 0.02, MATS.darkSteel, 0, 0, 0);
        fin.position.set(p.x, cr.y0(ss) - 0.03, p.z);
        const fr = cr.frame(ss);
        fin.rotation.y = Math.atan2(-fr.tz, fr.tx) - 0.5;
        g.add(fin);
      }
      add('basinVane', g);
    }
    // Sweepers: the Norway-style branch at Alder Bend and the Spillway pool skimmer
    this.sweeperPivots = {};
    for (const S of SWEEPERS) {
      if (S.id === 'arm') continue;
      const g = new THREE.Group();
      const s = S.pivotS;
      const cr = S.cr ? spr : creek;
      const c = cr.c(s);
      const d = c + S.side * ((S.side < 0 ? cr.wL(s) : cr.wR(s)) + 0.25);
      const p = cr.worldXZ(s, d);
      g.position.set(p.x, cr.bedH(s, d), p.z);
      g.add(cyl(0.06, 0.08, 0.45, S.id === 'branch' ? MATS.bark : MATS.yellow, 10).translateY(0.22));
      const pivot = new THREE.Group();
      pivot.position.y = 0.42;
      const reach = (cr.wR(s) + cr.wL(s)) * 0.9;
      if (S.id === 'branch') {
        // a cut alder branch with forked twigs
        pivot.add(rod([0, 0, 0], [-reach, -0.25, 0], 0.03, MATS.bark, 7));
        for (let k = 1; k < 4; k++) pivot.add(rod([-reach * k / 4, -0.08 * k, 0], [-reach * k / 4 - 0.15, -0.08 * k - 0.15, 0.12 * (k % 2 ? 1 : -1)], 0.012, MATS.bark, 5));
      } else {
        pivot.add(box(reach, 0.035, 0.035, MATS.yellow, -reach / 2, 0, 0));
        pivot.add(box(0.03, 0.3, 0.45, MATS.rubber, -reach + 0.05, -0.28, 0));
      }
      g.add(pivot);
      const fr = cr.frame(s);
      const toC = new THREE.Vector3(-fr.nx * S.side, 0, -fr.nz * S.side);
      g.rotation.y = Math.atan2(toC.z, -toC.x);
      this.sweeperPivots[S.id] = pivot;
      add(S.up, g);
    }
    // Lore gadgets at the Shelf and the Springs
    {
      const g = new THREE.Group();
      const s = 327.4, d = 1.15;
      const p = cr.worldXZ(s, d);
      const y = cr.bedH(s, d);
      g.position.set(p.x, y, p.z);
      g.add(rod([0, 0, 0], [0, 1.6, 0], 0.02, MATS.darkWood));
      const rib = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.6), new THREE.MeshStandardMaterial({ color: 0xd8342a, side: THREE.DoubleSide }));
      rib.position.set(0.04, 1.28, 0);
      g.add(rib);
      this.ribbon = rib;
      const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 10), new THREE.MeshStandardMaterial({ color: 0x5ab0ff, emissive: 0x16304a }));
      arrow.rotation.x = Math.PI; arrow.position.set(0, 2.0, 0);
      g.add(arrow);
      add('draftRibbon', g);
    }
    {
      const g = new THREE.Group();
      const pts = [[325.6, 1.25], [326.6, 1.15], [327.6, 1.2]].map(([s, d]) => { const p = cr.worldXZ(s, d); return new THREE.Vector3(p.x, cr.y0(s) + 0.05, p.z); });
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1];
        const pnl = new THREE.Mesh(new THREE.PlaneGeometry(a.distanceTo(b), 0.7), MATS.mesh);
        pnl.position.copy(a).lerp(b, 0.5).setY((a.y + b.y) / 2 + 0.35);
        pnl.rotation.y = Math.atan2(-(b.z - a.z), b.x - a.x);
        g.add(pnl);
        g.add(rod(a, a.clone().setY(a.y + 0.75), 0.015, MATS.darkWood));
      }
      add('windScreen', g);
    }
    {
      const g = new THREE.Group();
      const cr = spr;
      const s = 58.2, d = cr.c(58.2) - cr.wL(58.2) - 0.35;
      const p = cr.worldXZ(s, d);
      g.position.set(p.x, cr.bedH(s, d), p.z);
      g.add(rod([0, 0, 0], [0, 1.0, 0], 0.025, MATS.steel));
      g.add(box(0.18, 0.22, 0.12, MATS.green, 0, 0.9, 0));
      const tube = rod([0.06, 0.8, 0], [0.4, -0.05, 0], 0.008, MATS.white);
      g.add(tube);
      add('springsSampler', g);
    }
    // ---- for-sale stakes for the new equipment
    for (const [id, [s, side, ch]] of Object.entries(NEW_SPOTS)) {
      const cr = ch ? spr : creek;
      const c = cr.c(s);
      const d = c + side * ((side < 0 ? cr.wL(s) : cr.wR(s)) + 0.4);
      const p = cr.worldXZ(s, d);
      const g = new THREE.Group();
      g.position.set(p.x, Math.max(cr.bedH(s, d), cr.y0(s)), p.z);
      g.add(rod([0, 0, 0], [0, 0.45, 0], 0.01, MATS.darkWood));
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.09), new THREE.MeshStandardMaterial({ color: 0xff8a2a, side: THREE.DoubleSide, emissive: 0x401800 }));
      flag.position.set(0.07, 0.4, 0);
      g.add(flag);
      g.userData.upgrade = id;
      g.userData.lazyLabel = true;
      g.visible = false;
      scene.add(g);
      this.stakes[id] = g;
    }
    // ---- Bank Workshop yard and carts
    {
      const s = WORKSHOP.s;
      const d = cr.c(s) + cr.wR(s) + 1.7;
      const p = cr.worldXZ(s, d);
      const y = cr.bedH(s, d);
      const g = new THREE.Group();
      g.position.set(p.x, y, p.z);
      const fr = cr.frame(s);
      g.rotation.y = Math.atan2(-fr.tz, fr.tx);
      g.add(box(1.6, 0.05, 1.1, MATS.darkWood, 0, 0.02, 0));
      for (const [x, z] of [[-0.75, -0.5], [0.75, -0.5], [-0.75, 0.5], [0.75, 0.5]]) g.add(box(0.07, 1.4, 0.07, MATS.darkWood, x, 0.7, z));
      const roof = box(1.8, 0.05, 1.3, MATS.green, 0, 1.42, 0); roof.rotation.x = 0.12; g.add(roof);
      for (let i = 0; i < 3; i++) g.add(box(0.35, 0.3, 0.35, MATS.wood, -0.45 + i * 0.45, 0.2, 0.25));
      const lab = sprite(labelTexture(['Bank Workshop', 'supply yard'], { w: 512, h: 150, font: 'bold 46px Georgia, serif', bg: '#24361f' }), 0.75, 0.22);
      lab.position.set(0, 1.75, 0);
      g.add(lab);
      add('bankWorkshop', g);
      this.yard = g;
    }
    this.carts = [];
    // ---- Code Rot observations: dark patchy deposits (a simulated condition layer)
    {
      const cr = spr;
      const rnd = mulberry32(31);
      const geo = new THREE.CircleGeometry(1, 9);
      geo.rotateX(-Math.PI / 2);
      const mat = new THREE.MeshStandardMaterial({ color: 0x1f1a24, roughness: 0.95, transparent: true, opacity: 0.62, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
      const list = [];
      for (const z of cr.codeRot) {
        const n = Math.round(14 * z.k);
        for (let i = 0; i < n; i++) {
          const a = rnd() * 6.28, r = Math.sqrt(rnd()) * z.r;
          const s = z.s + Math.cos(a) * r, d = cr.c(z.s) + z.dOff + Math.sin(a) * r * 0.8;
          list.push({ s, d, size: 0.08 + rnd() * 0.22 * z.k, rot: rnd() * 6.28 });
        }
      }
      const im = new THREE.InstancedMesh(geo, mat, list.length);
      const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(), pv = new THREE.Vector3();
      list.forEach((o, i) => {
        const p = cr.worldXZ(o.s, o.d);
        const y = Math.max(cr.bedH(o.s, o.d), cr.waterLevel(o.s, o.d) > -1e8 ? cr.bedH(o.s, o.d) : -1e9) + 0.006;
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), o.rot);
        m4.compose(pv.set(p.x, y, p.z), q, sc.set(o.size, 1, o.size * 0.7));
        im.setMatrixAt(i, m4);
      });
      im.renderOrder = 1;
      scene.add(im);
      this.codeRotMesh = im;
    }
    // ---- crayfish in the double ponds (few, the habitat is affected)
    {
      this.crayfish = [];
      const cr = spr;
      const mat = new THREE.MeshStandardMaterial({ color: 0x8a3a22, roughness: 0.6 });
      for (const [i, pd] of cr.ponds.entries()) {
        for (let k = 0; k < (i === 0 ? 2 : 1); k++) {
          const g = new THREE.Group();
          const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.012, 0.05, 4, 8), mat);
          body.rotation.z = Math.PI / 2; g.add(body);
          for (const side of [-1, 1]) { const cl = new THREE.Mesh(new THREE.SphereGeometry(0.01, 6, 5), mat); cl.position.set(0.04, 0, side * 0.018); cl.scale.set(1.6, 0.6, 1); g.add(cl); }
          g.userData = { pd, ph: k * 2.1 + i, r: 0.35 + 0.15 * k };
          scene.add(g);
          this.crayfish.push(g);
        }
      }
    }
    // ---- Nigatron: the large water bug in the Clearing's deep pools (field note)
    {
      const g = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 0.4, metalness: 0.2 });
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), mat);
      body.scale.set(1.8, 0.5, 1); g.add(body);
      for (let i = 0; i < 3; i++) for (const side of [-1, 1]) {
        g.add(rod([(-0.02 + i * 0.02), 0, side * 0.012], [(-0.06 + i * 0.05), -0.01, side * (0.07 + (i === 1 ? 0.03 : 0))], 0.0025, mat, 4));
      }
      scene.add(g);
      this.nigatron = g;
    }
    // ---- signs: taped sign on a fallen trunk, the Farlands entrance, map boards
    {
      const s = 414.4, d = cr.c(414.4) - 0.75;
      const p = cr.worldXZ(s, d);
      const y = cr.bedH(s, d);
      const g = new THREE.Group();
      g.position.set(p.x, y, p.z);
      const fr = cr.frame(s);
      g.rotation.y = Math.atan2(-fr.tz, fr.tx) + 0.6;
      const trunk = cyl(0.12, 0.16, 2.4, new THREE.MeshStandardMaterial({ color: 0x9c968c, roughness: 0.85 }), 10);
      trunk.rotation.z = Math.PI / 2 - 0.12; trunk.position.set(0, 0.35, 0); g.add(trunk);
      g.add(rod([0.5, 0.4, 0], [0.9, 0.95, 0.15], 0.05, MATS.bark, 7));
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.28), new THREE.MeshStandardMaterial({ map: labelTexture(['you’ve made it', 'to the falls', '—keep going—'], { w: 256, h: 320, font: 'bold 30px sans-serif', bg: '#1c3b5a', border: '#5aa0ff' }), roughness: 0.6 }));
      sign.position.set(0.1, 0.52, 0.17);
      g.add(sign);
      for (const x of [-0.08, 0.28]) g.add(box(0.05, 0.015, 0.004, new THREE.MeshStandardMaterial({ color: 0x3a7bff }), x, 0.67, 0.172));
      scene.add(g);
      this.tapedSign = g;
    }
    {
      const s = 33.5;
      const a = cr.worldXZ(s, cr.c(s) - 1.6), b = cr.worldXZ(s, cr.c(s) + 1.6);
      const y = cr.y0(s) + 0.02;
      const line = rod([a.x, y, a.z], [b.x, y, b.z], 0.012, new THREE.MeshBasicMaterial({ color: 0xf2d230 }), 6);
      scene.add(line);
      const sp = cr.worldXZ(s, cr.c(s) + 1.2);
      const g = new THREE.Group();
      g.position.set(sp.x, cr.bedH(s, cr.c(s) + 1.2), sp.z);
      g.add(rod([0, 0, 0], [0, 1.3, 0], 0.025, MATS.darkWood));
      const lab = sprite(labelTexture(['FARLANDS ↑', 'continue upstream'], { w: 512, h: 150, font: 'bold 50px Georgia, serif', bg: '#4a3a08', border: '#f2d230' }), 0.8, 0.24);
      lab.position.set(0, 1.5, 0);
      g.add(lab);
      scene.add(g);
    }
    // map boards beside every launch site and the finish
    this.boards = [];
    const boardTex = labelTexture(['MAP', 'press M'], { w: 256, h: 160, font: 'bold 46px Georgia, serif', bg: '#1f3326', border: '#e8d27a' });
    const placeBoard = (s, dOff, id, ch = creek) => {
      const cr = ch;
      const d = cr.c(s) + dOff;
      const p = cr.worldXZ(s, d);
      const g = new THREE.Group();
      g.position.set(p.x, cr.bedH(s, d), p.z);
      g.add(rod([0, 0, 0], [0, 1.1, 0], 0.025, MATS.darkWood));
      const pnl = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 0.28), new THREE.MeshStandardMaterial({ map: boardTex, side: THREE.DoubleSide }));
      pnl.position.set(0, 1.15, 0); g.add(pnl);
      const fr = cr.frame(s);
      g.rotation.y = Math.atan2(-fr.tz, fr.tx) + Math.PI / 2;
      scene.add(g);
      this.boards.push({ id, g, pos: g.position.clone() });
    };
    STARTS.forEach((st, k) => { const ch = st.cr ? spr : creek, s = ch.siteS(st); placeBoard(s - 1.9, ch.wR(s) + 1.1, 'site' + k, ch); });
    placeBoard(554.1, -0.95, 'finish');
    this.landmarks = landmarkPlacements(cr);
    if (cr.ledge) this.buildFlatRocks(cr);
  }

  /** The Flat Rocks ledge lip that overhangs the undercut (the heightfield cannot), a thin
   *  inner slab inside the recess, and the taped race signs (creator's ground photo). */
  buildFlatRocks(cr) {
    const lg = cr.ledge;
    const pos = [], col = [], idx = [];
    const tmpC = new THREE.Color();
    const sand = (y) => { const b = 0.5 + 0.5 * Math.sin(y * 21); tmpC.setRGB(0.8 + 0.1 * b, 0.68 + 0.09 * b, 0.5 + 0.07 * b, THREE.SRGBColorSpace); return [tmpC.r, tmpC.g, tmpC.b]; };
    const strip = (s0, s1, frontOf, yTop, thick, backOf) => {
      const base = pos.length / 3;
      const ring = 6;
      let rows = 0;
      for (let s = s0; s <= s1 + 1e-6; s += 0.18) {
        const t = (s - s0) / (s1 - s0);
        const taper = Math.min(1, Math.sin(Math.PI * t) * 2.2);
        const edge = cr.c(s) + cr.wR(s);
        const fr = frontOf(s), bk = backOf(s), yt = yTop(s), th = thick * (0.55 + 0.45 * taper);
        const y0 = cr.y0(s);
        // cross-section: back top, front top, rounded nose, front bottom, sloping underside, back bottom
        const sec = [[bk, yt], [fr + 0.04, yt], [fr - 0.02, yt - th * 0.35], [fr + 0.03, yt - th], [fr + 0.35, yt - th * 1.08], [bk, yt - th * 1.2]];
        for (const [dd, yy] of sec) {
          const p = cr.worldXZ(s, edge + dd);
          pos.push(p.x, y0 + yy, p.z);
          const c3 = sand(yy); col.push(...c3);
        }
        rows++;
      }
      for (let r = 0; r < rows - 1; r++) for (let k = 0; k < ring - 1; k++) {
        const a = base + r * ring + k, b = a + 1, c2 = a + ring, d2 = c2 + 1;
        idx.push(a, c2, b, b, c2, d2);
      }
      // end caps
      for (const r of [0, rows - 1]) { const a = base + r * ring; for (let k = 1; k < ring - 1; k++) r === 0 ? idx.push(a, a + k, a + k + 1) : idx.push(a, a + k + 1, a + k); }
    };
    const n = (s, k) => fbm(s * 1.9, k, 2, 71);
    // the big lip: its front sits at the bar edge, its back is buried in the ledge
    strip(lg.s0 + 0.15, lg.s1 - 0.15, (s) => lg.bar - 0.05 + 0.18 * n(s, 1), (s) => lg.h + 0.02 + 0.04 * n(s, 2), 0.7, (s) => cr.ledgeWall(s) + 0.5);
    // a thinner slab inside the dark recess
    const a0 = lg.s0 + (lg.s1 - lg.s0) * 0.45, a1 = lg.s1 - 0.5;
    strip(a0, a1, (s) => lg.bar + 0.35 + 0.12 * n(s, 3), () => 0.62, 0.16, (s) => cr.ledgeWall(s) + 0.2);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, flatShading: true, side: THREE.DoubleSide }));
    m.castShadow = true; m.receiveShadow = true;
    this.scene.add(m);
    this.flatRocks = m;
    // taped laminated race signs on the ledge face, and blue tape draped over the top
    const signMat = new THREE.MeshStandardMaterial({ color: 0x1d2127, roughness: 0.35, metalness: 0.1 });
    const tape = new THREE.MeshStandardMaterial({ color: 0x8fb8ff, roughness: 0.6 });
    for (const [fs, dy] of [[0.42, -0.2], [0.62, 0.05]]) {
      const s = lg.s0 + (lg.s1 - lg.s0) * fs;
      const edge = cr.c(s) + cr.wR(s);
      const p = cr.worldXZ(s, edge + lg.bar - 0.08);
      const fr = cr.frame(s);
      const sg = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.2), signMat);
      sg.position.set(p.x, cr.y0(s) + lg.h - 0.45 + dy, p.z);
      sg.rotation.y = Math.atan2(-fr.nx, -fr.nz);
      this.scene.add(sg);
      const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.8, 0.004), tape);
      t1.position.set(p.x, cr.y0(s) + lg.h - 0.2, p.z);
      t1.rotation.set(0.5, Math.atan2(-fr.nx, -fr.nz), 0.4);
      this.scene.add(t1);
    }
  }

  configure(game) {
    for (const [id, g] of Object.entries(this.items)) g.visible = game.owned.has(id);
    for (const [id, st] of Object.entries(this.stakes)) {
      const show = !game.owned.has(id) && !game.blocked(id);
      st.visible = show;
      if (show && st.userData.lazyLabel) {
        st.userData.lazyLabel = false;
        const u = UPG[id];
        if (u) { const lab = sprite(labelTexture([u.name, `$${u.price.toLocaleString()}`], { w: 512, h: 160, font: 'bold 50px sans-serif', bg: '#3b2a12' }), 0.75, 0.234); lab.position.set(0, 0.7, 0); st.add(lab); }
      }
    }
  }

  update(dt, game, t) {
    const cr = this.creek;
    // gate swing: closed lane follows the active physics group
    if (this.gateArm) {
      const toDirect = !game.phys.disabled.has('gateDirect');
      const toCalm = !game.phys.disabled.has('gateCalm');
      const want = toDirect ? 0.75 : toCalm ? -0.75 : 0;
      this.gateArm.rotation.y += (want - this.gateArm.rotation.y) * Math.min(1, dt * 6);
    }
    if (this.sluiceFlap) {
      const want = !game.phys.disabled.has('sluiceToRight') ? 0.7 : !game.phys.disabled.has('sluiceToLeft') ? -0.7 : 0;
      this.sluiceFlap.rotation.y += (want - this.sluiceFlap.rotation.y) * Math.min(1, dt * 8);
    }
    SWEEPERS.forEach((S, i) => {
      const pv = this.sweeperPivots[S.id];
      if (!pv) return;
      const ph = game.sweep[i].phase;
      pv.rotation.y = ph > 0 ? Math.sin(ph * Math.PI) * 1.1 - 0.55 : -0.55;
    });
    if (this.ribbon) this.ribbon.rotation.y = Math.sin(t * 7) * 0.4;
    // carts on the bank
    const W = game.workshop;
    while (this.carts.length < W.carts.length) {
      const g = new THREE.Group();
      g.add(box(0.5, 0.04, 0.3, MATS.wood, 0, 0.12, 0));
      for (const [x, z] of [[-0.18, -0.16], [0.18, -0.16], [-0.18, 0.16], [0.18, 0.16]]) { const w = cyl(0.05, 0.05, 0.03, MATS.rubber, 10); w.rotation.x = Math.PI / 2; w.position.set(x, 0.05, z); g.add(w); }
      const deck2 = box(0.5, 0.03, 0.3, MATS.wood, 0, 0.26, 0); deck2.name = 'deck2'; g.add(deck2);
      for (const [x, z] of [[-0.24, -0.14], [0.24, 0.14]]) g.add(box(0.02, 0.16, 0.02, MATS.darkWood, x, 0.2, z));
      this.scene.add(g);
      this.carts.push({ g, deck2 });
    }
    this.carts.forEach((C, i) => {
      const cart = W.carts[i];
      if (!cart || !game.owned.has('bankWorkshop')) { C.g.visible = false; return; }
      C.g.visible = true;
      const s = Math.max(cr.sMin + 1, Math.min(cr.sMax - 2, cart.s));
      const d = cr.c(s) + cr.wR(s) + 1.15 + (i % 2) * 0.35;
      const p = cr.worldXZ(s, d);
      C.g.position.set(p.x, cr.bedH(s, d), p.z);
      const fr = cr.frame(s);
      C.g.rotation.y = Math.atan2(-fr.tz, fr.tx);
      C.deck2.visible = game.owned.has('doubleDeck');
      C.load = cart.load ? cart.load.length : 0;
    });
    // crayfish creep around the pond floor
    for (const cf of this.crayfish) {
      const cr = this.creek.springs || this.creek;
      const { pd, ph, r } = cf.userData;
      const a = t * 0.12 + ph;
      const s = pd.s + Math.cos(a) * pd.rs * r, d = cr.c(pd.s) + pd.dOff + Math.sin(a) * pd.rd * r;
      const p = cr.worldXZ(s, d);
      cf.position.set(p.x, cr.bedH(s, d) + 0.012, p.z);
      cf.rotation.y = -a;
    }
    // Nigatron skates in short bursts over the deep pool
    if (this.nigatron) {
      const k = Math.floor(t / 3), f = (t % 3) / 3;
      const rr = (n) => { const x = Math.sin(n * 12.9898) * 43758.5453; return x - Math.floor(x); };
      const s0 = 98.3 + (rr(k) - 0.5) * 1.4, d0 = -0.5 + (rr(k + 7) - 0.5) * 0.6;
      const s1 = 98.3 + (rr(k + 1) - 0.5) * 1.4, d1 = -0.5 + (rr(k + 8) - 0.5) * 0.6;
      const e = f < 0.3 ? (f / 0.3) * (f / 0.3) * (3 - 2 * f / 0.3) : 1;
      const s = s0 + (s1 - s0) * e, d = cr.c(s) + d0 + (d1 - d0) * e;
      const p = cr.worldXZ(s, d);
      this.nigatron.position.set(p.x, cr.y0(s) + 0.004, p.z);
      this.nigatron.rotation.y = Math.atan2(-(d1 - d0), s1 - s0) + (cr.frame(s).tx > 0 ? 0 : Math.PI);
    }
  }

  /** Hopper-style ball positions on the carts (for the ball renderer). */
  cartSlots(i, n) {
    const C = this.carts[i];
    if (!C || !C.g.visible) return [];
    const out = [];
    C.g.updateMatrixWorld(true);
    for (let k = 0; k < n; k++) {
      const deck = k < 6 ? 0 : 1;
      const j = k % 6;
      out.push(new THREE.Vector3(-0.17 + (j % 3) * 0.17, (deck ? 0.31 : 0.17) + 0.034, -0.07 + Math.floor(j / 3) * 0.14).applyMatrix4(C.g.matrixWorld));
    }
    return out;
  }
}

import { UPGRADE_BY_ID as UPG } from '../core/config.js';
