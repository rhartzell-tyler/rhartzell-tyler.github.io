import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';
import { createNoise3D } from 'simplex-noise'; // ✅ named export
const noise3D = createNoise3D();


// 🎬 Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 🌌 Lighting
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// 🪞 Reflective Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(30, 30),
  new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.9,
    metalness: 0.3
  })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -6;
scene.add(floor);

// 🧭 OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 🧮 Parametric Functions
function mobius(u, v, target) {
  u *= Math.PI * 2;
  v = v * 2 - 1;
  const radius = 2;
  const x = (radius + v * Math.cos(u / 2)) * Math.cos(u);
  const y = (radius + v * Math.cos(u / 2)) * Math.sin(u);
  const z = v * Math.sin(u / 2);
  target.set(x, y, z);
}

function helicoid(u, v, target) {
  const t = u * Math.PI * 4;
  const r = THREE.MathUtils.lerp(-2.5, 2.5, v);
  const x = r * Math.cos(t);
  const y = r * Math.sin(t);
  const z = 0.5 * t;
  target.set(x, y, z);
}

function superformulaSurface(u, v, target) {
  const t = u * Math.PI * 2 * 4;
  const m = 7, a = 1, b = 1, n1 = 0.3, n2 = 0.3, n3 = 1.7;
  const part1 = Math.pow(Math.abs(Math.cos(m * t / 4) / a), n2);
  const part2 = Math.pow(Math.abs(Math.sin(m * t / 4) / b), n3);
  const r = Math.pow(part1 + part2, -1 / n1);

  const x = r * Math.cos(t);
  const y = r * Math.sin(t);
  const z = Math.sin(v * Math.PI * 2);
  target.set(x, y, z);
}

function enneper(u, v, target) {
    u = u * 2 - 1;
    v = v * 2 - 1;
  
    const x = u - (u ** 3) / 3 + u * v ** 2;
    const y = v - (v ** 3) / 3 + v * u ** 2;
    const z = u ** 2 - v ** 2;
  
    target.set(x, y, z);
  }

  
  // 🧮 Generate 3D Rose Curve
  const k = 6, a = 2, b = 3, c = 4, δ = Math.PI / 2;
  const numLoops = Math.PI * 2 * k;
  const slices = 100; // resolution along t
  const stacks = 1;   // unused in 1D parametric curves, but required

  const rosepetal = (u, v, target) => {
    const t = u * numLoops; // scale u to full range

    const r = a * Math.cos(k * t);

    const x = Math.sin(a * t + δ);
    const y = Math.sin(b * t);
    const z = Math.sin(c * t);

    target.set(x, y, z);
  };

  function klein(u, v, target) {
    u *= Math.PI * 2;
    v *= Math.PI * 2;
  
    const r = 2 * (1 - Math.cos(u) / 2);
    const x = Math.cos(u) * (r + Math.cos(v) * Math.sin(u));
    const y = Math.sin(u) * (r + Math.cos(v) * Math.sin(u));
    const z = Math.sin(v) * Math.sin(u);
  
    target.set(x, y, z);
  }
  
  function torusKnotSurface(u, v, target) {
    const p = 2, q = 3;
    const R = 2, r = 0.4;
  
    const theta = u * Math.PI * 2;
    const phi = v * Math.PI * 2;
  
    // Torus knot path
    const x0 = (R + r * Math.cos(q * theta)) * Math.cos(p * theta);
    const y0 = (R + r * Math.cos(q * theta)) * Math.sin(p * theta);
    const z0 = r * Math.sin(q * theta);
  
    // Normal direction for sweeping
    const dx = -p * (R + r * Math.cos(q * theta)) * Math.sin(p * theta) - r * q * Math.sin(q * theta) * Math.cos(p * theta);
    const dy = p * (R + r * Math.cos(q * theta)) * Math.cos(p * theta) - r * q * Math.sin(q * theta) * Math.sin(p * theta);
    const dz = r * q * Math.cos(q * theta);
  
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const nx = dx / len;
    const ny = dy / len;
    const nz = dz / len;
  
    // Sweep a small circle around the knot path
    const cx = Math.cos(phi) * nx;
    const cy = Math.cos(phi) * ny;
    const cz = Math.cos(phi) * nz;
  
    const width = 1.0;
    const sx = x0 + params.width * cx;
    const sy = y0 + params.width * cy;
    const sz = z0 + params.width * cz;    
  
    target.set(sx, sy, sz);
  }  
  
  const mandelbrotMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
        varying vec2 vUv;

        vec3 getColor(float iter, float maxIter) {
        float t = iter / maxIter;
        return vec3(0.5 + 0.5 * cos(6.2831 * t),
                    0.5 + 0.5 * cos(6.2831 * t + 2.0),
                    0.5 + 0.5 * cos(6.2831 * t + 4.0));
        }

        void main() {
        vec2 c = vec2(vUv.x * 3.5 - 2.5, vUv.y * 2.0 - 1.0);
        vec2 z = vec2(0.0);
        float maxIter = 150.0;
        float i;
        
        for (i = 0.0; i < maxIter; i++) {
            if (dot(z, z) > 4.0) break;
            z = vec2(z.x * z.x - z.y * z.y + c.x,
                    2.0 * z.x * z.y + c.y);
        }

        float smoothed = i - log2(log2(dot(z, z))) + 4.0;
        vec3 color = getColor(smoothed, maxIter);
        gl_FragColor = vec4(color, 1.0);
        }
    `,
    side: THREE.DoubleSide
  });
  
  const mandelbrotPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 4),
    mandelbrotMaterial
  );
  mandelbrotPlane.position.set(0, 0, -2); // adjust as needed
  scene.add(mandelbrotPlane);
  mandelbrotPlane.visible = false; // initially hidden
  

// 🖼️ Current Surface State
let mesh, originalPositions;
let widthController = null;
const resolution = 200;

function updateSurface(type) {
  if (mesh) scene.remove(mesh);
  if (mandelbrotPlane.visible) mandelbrotPlane.visible = false; // hide Mandelbrot if visible
  let geometry;
  switch (type) {
    case 'dodecahedron': geometry = new ParametricGeometry(rosepetal, slices, stacks); break;
    case 'Möbius Strip': geometry = new ParametricGeometry(mobius, resolution, 20); break;
    case 'Helicoid': geometry = new ParametricGeometry(helicoid, resolution, resolution); break;
    case 'Superformula': geometry = new ParametricGeometry(superformulaSurface, resolution, resolution); break;
    case 'Dodecahedron': geometry = new THREE.DodecahedronGeometry(3, 2); break; // size and detail
    case 'Enneper Surface': geometry = new ParametricGeometry(enneper, resolution, resolution); break;
    case 'Klein Bottle': geometry = new ParametricGeometry(klein, resolution, resolution); break;
    case 'Torus Knot': geometry = new ParametricGeometry(torusKnotSurface, resolution, resolution); break;
    case 'Mandelbrot': mandelbrotPlane.visible = true; break;
  }
  // add temperature to each vertex on the current geometry.
  const colors = [];

  for (let i = 0; i < geometry.attributes.position.count; i++) {
    const x = geometry.attributes.position.array[i * 3];
    const y = geometry.attributes.position.array[i * 3 + 1];
    const z = geometry.attributes.position.array[i * 3 + 2];
  
    const r = Math.sqrt(x * x + y * y + z * z); // radial distance
    const noise = noise3D(x * 0.3, y * 0.3, 0); // static base
    const heat = (noise + r * 0.3 + 1) / 2;     // normalize to [0,1]
  
    const hue = 0.7 - heat * 0.7;               // map blue→red
    const color = new THREE.Color();
    color.setHSL(hue, 1.0, 0.5);                // vivid color
  
    colors.push(color.r, color.g, color.b);
  }
  
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  


  // Store original positions for vertex animation
  originalPositions = geometry.attributes.position.array.slice();

  // Add the slider for changing the torus knot width
  // Remove old slider if it exists
    if (widthController) {
        widthController.destroy();
        widthController = null;        
    }
  
  // Add width slider only for Torus Knot
  if (type === 'Torus Knot') {
    widthController = gui.add(params, 'width', 0.1, 1.5, 0.01)
      .name('Ribbon Width')
      .onChange(() => updateSurface('Torus Knot'));
  }

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    metalness: 0.5,
    roughness: 0.4,
    side: THREE.DoubleSide,
    flatShading: true
  });
  

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

// 🧭 GUI Controls
    const gui = new GUI();
    const params = { 
        surface: 'Dodecahedron',
        width: 0.5 // 👈 new slider parameter 
    };

    gui.add(params, 'surface', ['Dodecahedron', 'Möbius Strip', 'Helicoid', 'Superformula', 'Enneper Surface', 'Klein Bottle', 'Torus Knot', 'Mandelbrot'])
   .onChange(updateSurface);
  

// 🎬 Start with default
updateSurface(params.surface);

// 🔁 Animate
function animate() {
    requestAnimationFrame(animate);
  
    const time = performance.now() * 0.001;
  
    if (mesh && mesh.geometry && mesh.geometry.attributes.position) {
      const pos = mesh.geometry.attributes.position;
      const colorAttr = mesh.geometry.attributes.color;
  
      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;
  
        // Original animated vertex position
        const ox = originalPositions[ix];
        const oy = originalPositions[ix + 1];
        const oz = originalPositions[ix + 2];
  
        const n = noise3D(ox * 0.3, oy * 0.3, time);
        const amplitude = 0.4;
  
        pos.array[ix]     = ox + amplitude * n;
        pos.array[ix + 1] = oy + amplitude * n;
        pos.array[ix + 2] = oz + amplitude * n;
  
        // 🌡️ Calculate "temperature" and update vertex color
        const r = Math.sqrt(
          pos.array[ix] ** 2 +
          pos.array[ix + 1] ** 2 +
          pos.array[ix + 2] ** 2
        );
  
        const raw = noise3D(pos.array[ix] * 0.4, pos.array[ix + 1] * 0.4, time * 0.5);
        const heat = (raw + r * 0.3 + 1) / 2; // normalize to [0,1]
        const hue = 0.7 - heat * 0.7;
        const glow = 0.4 + 0.2 * Math.sin(time * 2 + r); // shimmer
        const saturation = 0.8 + 0.2 * Math.sin(time * 1.5 + ox);
  
        const c = new THREE.Color();
        c.setHSL(hue, saturation, glow);
  
        colorAttr.array[ix]     = c.r;
        colorAttr.array[ix + 1] = c.g;
        colorAttr.array[ix + 2] = c.b;
      }
  
      pos.needsUpdate = true;
      colorAttr.needsUpdate = true;
    }
  
    if (mesh) mesh.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
  }
  
  
  

animate();
