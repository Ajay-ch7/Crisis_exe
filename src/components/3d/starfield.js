import * as THREE from 'three';

/**
 * Creates a high-fidelity starfield celestial background with subtle twinkling and varied star colors.
 */
export function createStarfield(count = 3200, radius = 90) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const starColors = [
    new THREE.Color(0xffffff), // pure white
    new THREE.Color(0xbfefff), // cyan-ice
    new THREE.Color(0x00f0ff), // tech cyan
    new THREE.Color(0xfff0c8), // pale gold
    new THREE.Color(0x99bbff), // pale blue
  ];

  for (let i = 0; i < count; i++) {
    // Generate random point on or within sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = radius * (0.8 + Math.random() * 0.4);

    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const col = starColors[Math.floor(Math.random() * starColors.length)];
    colors[i * 3]     = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;

    sizes[i] = Math.random() * 1.8 + 0.6;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Circular point texture for smooth stars
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
  grad.addColorStop(0.8, 'rgba(0,240,255,0.2)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 16);
  const starTex = new THREE.CanvasTexture(canvas);

  const material = new THREE.PointsMaterial({
    size: 1.4,
    vertexColors: true,
    map: starTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);

  function update(time) {
    points.rotation.y = time * 0.005;
    points.rotation.x = time * 0.002;
  }

  return { points, update };
}
