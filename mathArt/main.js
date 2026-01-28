import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 🌌 Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

// 🖼️ Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✨ Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(ambientLight, dirLight);

// 🧭 OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 🌘 Reflective Floor
const floorGeometry = new THREE.PlaneGeometry(30, 30);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222,
  roughness: 0.8,
  metalness: 0.4
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.5;
scene.add(floor);

// 🧮 Generate 3D Rose Curve
const geometry = new THREE.BufferGeometry();
const points = [];
const k = 6, a = 2, step = 0.05;
const b = 3, c = 4, δ = Math.PI / 2; // phase shift for Lissajous curve

for (let t = 0; t < Math.PI * 2 * k; t += step) {
 const r = a * Math.cos(k * t);

 // Lissajouse Curve
 const x = Math.sin(a * t + δ);
 const y = Math.sin(b * t);
 const z = Math.sin(c * t);

  points.push(new THREE.Vector3(x, y, z));
}

geometry.setFromPoints(points);

// 🎨 Replace Line with Point Cloud for Depth Feeling
const material = new THREE.PointsMaterial({
  color: 0xff00ff,
  size: 0.05
});
const curvePoints = new THREE.Points(geometry, material);
scene.add(curvePoints);

// 🌀 Vector Field Arrows
// points.forEach(pt => {
//   const dir = pt.clone().normalize(); // outward direction
//   const origin = pt.clone();
//   const length = 0.2;
//   const arrow = new THREE.ArrowHelper(dir, origin, length, 0x00ffff);
//   scene.add(arrow);
// });

// 🔁 Animate
function animate() {
  requestAnimationFrame(animate);
  curvePoints.rotation.x += 0.005;
  curvePoints.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
