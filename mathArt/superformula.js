import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// 🎬 Scene & Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 🌌 Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(5, 10, 5);
scene.add(ambientLight, dirLight);

// 🪞 Floor
const floorGeometry = new THREE.PlaneGeometry(30, 30);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222,
  roughness: 0.8,
  metalness: 0.4
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -4;
scene.add(floor);

// 🌀 Superformula Function
function superformula(t, m, a, b, n1, n2, n3) {
  const part1 = Math.pow(Math.abs(Math.cos(m * t / 4) / a), n2);
  const part2 = Math.pow(Math.abs(Math.sin(m * t / 4) / b), n3);
  const r = Math.pow(part1 + part2, -1 / n1);
  return r;
}

// 🧮 Generate Superformula Curve as Point Cloud
const geometry = new THREE.BufferGeometry();
const points = [];

const m = 7;
const a = 1;
const b = 1;
const n1 = 0.3;
const n2 = 0.3;
const n3 = 1.7;

const loops = 50;
const step = 0.02;

for (let t = 0; t < Math.PI * 2 * loops; t += step) {
  const r = superformula(t, m, a, b, n1, n2, n3);
  const x = r * Math.cos(t);
  const y = r * Math.sin(t);
  const z = Math.sin(t * 2); // vertical variation
  points.push(new THREE.Vector3(x, y, z));
}

geometry.setFromPoints(points);

// 🎨 Point Material
const material = new THREE.PointsMaterial({
  color: 0xff44aa,
  size: 0.05
});
const superPoints = new THREE.Points(geometry, material);
scene.add(superPoints);

// 🧭 Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 🔁 Animate
function animate() {
  requestAnimationFrame(animate);
  superPoints.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}

animate();
