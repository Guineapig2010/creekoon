// Instanced tennis balls (rolling line, hopper, basket, crate) and far-zoom markers.
import * as THREE from 'three';
import { BALL_R, BF, RECIPES } from '../core/config.js';
import { ballTexture } from './textures.js';

export function variantOf(spec) {
  return spec & BF.REPLICA ? 4 : spec & BF.NCN ? 3 : spec & BF.STAMP ? 2 : spec & BF.PREMIUM ? 1 : 0;
}

export class BallRenderer {
  constructor(scene, quality) {
    this.cap = 3000; // factories run flat out: the creek can hold a couple of thousand balls
    const seg = quality === 'low' ? 16 : 32;
    const geo = new THREE.SphereGeometry(BALL_R, seg, Math.round(seg * 0.6));
    const size = quality === 'low' ? 512 : 1024;
    const texs = [ballTexture({ size }), ballTexture({ band: true, size }), ballTexture({ band: true, stamp: true, size }), ballTexture({ band: true, ncn: true, size }), ballTexture({ band: true, replica: true, size })];
    this.meshes = texs.map((map) => {
      const mat = new THREE.MeshPhysicalMaterial({
        map, roughness: 0.92, metalness: 0, sheen: 1, sheenRoughness: 0.55, sheenColor: new THREE.Color(0.85, 0.95, 0.5),
      });
      const m = new THREE.InstancedMesh(geo, mat, this.cap);
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      m.setColorAt(0, new THREE.Color(1, 1, 1));
      m.instanceColor.setUsage(THREE.DynamicDrawUsage);
      m.castShadow = true;
      m.receiveShadow = true;
      m.frustumCulled = false;
      m.count = 0;
      scene.add(m);
      return m;
    });
    this.counts = [0, 0, 0, 0, 0];
    this.m4 = new THREE.Matrix4();
    this.q = new THREE.Quaternion();
    this.p = new THREE.Vector3();
    this.sc = new THREE.Vector3(1, 1, 1);
    this.col = new THREE.Color();
    // far markers
    const mg = new THREE.BufferGeometry();
    this.markerPos = new Float32Array(this.cap * 3);
    mg.setAttribute('position', new THREE.BufferAttribute(this.markerPos, 3).setUsage(THREE.DynamicDrawUsage));
    this.markers = new THREE.Points(mg, new THREE.PointsMaterial({ color: 0xe8ff3a, size: 7, sizeAttenuation: false, depthTest: true, transparent: true, opacity: 0.95 }));
    this.markers.frustumCulled = false;
    this.markers.renderOrder = 5;
    scene.add(this.markers);
    this.nMarkers = 0;
    // highlight ring for followed ball
    const ring = new THREE.Mesh(new THREE.RingGeometry(BALL_R * 1.5, BALL_R * 1.9, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    ring.renderOrder = 4;
    scene.add(ring);
    this.ring = ring;
  }

  begin() { this.counts.fill(0); this.nMarkers = 0; }

  add(spec, x, y, z, qx, qy, qz, qw, wet = 0, marker = false, recipe = 0) {
    const v = variantOf(spec);
    const i = this.counts[v];
    if (i >= this.cap) return;
    this.counts[v]++;
    this.q.set(qx, qy, qz, qw);
    this.p.set(x, y, z);
    this.m4.compose(this.p, this.q, this.sc);
    const m = this.meshes[v];
    m.setMatrixAt(i, this.m4);
    const k = 1 - 0.5 * wet;
    const f = (RECIPES[recipe] || RECIPES[0]).felt;
    this.col.setRGB(k * f[0], k * f[1] * (1 - 0.04 * wet), k * f[2] * (1 - 0.1 * wet));
    m.setColorAt(i, this.col);
    if (marker && this.nMarkers < this.cap) {
      const j = this.nMarkers++ * 3;
      this.markerPos[j] = x; this.markerPos[j + 1] = y + 0.05; this.markerPos[j + 2] = z;
    }
  }

  end(markersVisible) {
    for (let v = 0; v < this.meshes.length; v++) {
      const m = this.meshes[v];
      m.count = this.counts[v];
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
    }
    this.markers.geometry.setDrawRange(0, this.nMarkers);
    this.markers.geometry.attributes.position.needsUpdate = true;
    this.markers.visible = markersVisible;
  }
}
