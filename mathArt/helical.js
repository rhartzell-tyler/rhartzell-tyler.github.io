import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';

// 🎬 Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 🌌 Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(5, 10, 5);
scene.add(ambientLight, dirLight);

// 🪞 Reflective Floor
const floorGeometry = new THREE.PlaneGeometry(30, 30);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222,
  roughness: 0.9,
  metalness: 0.3
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -6;
scene.add(floor);

// 🌀 Helicoid Surface Function
function helicoid(u, v, target) {
  const t = u * Math.PI * 4;  // angular spin
  const radius = THREE.MathUtils.lerp(-2.5, 2.5, v); // sweep from -2.5 to 2.5

  const x = radius * Math.cos(t);
  const y = radius * Math.sin(t);
  const z = 0.5 * t;  // spiral upward

  target.set(x, y, z);
}

// 🔧 Geometry and Material
const resolution = 200;
const geometry = new ParametricGeometry(helicoid, resolution, resolution);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  metalness: 0.5,
  roughness: 0.4,
  flatShading: true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 🧭 Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 🔁 Animate
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.005;
  mesh.rotation.x += 0.025;
  controls.update();
  renderer.render(scene, camera);
}

animate();
