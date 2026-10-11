import * as THREE from 'three';

/**
 * Creates an instant high-tech cybernetic procedural Earth texture canvas
 * to use as immediate fallback or initial texture while image loads.
 */
export function createFallbackEarthCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep space ocean gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
  oceanGrad.addColorStop(0, '#04101e');
  oceanGrad.addColorStop(0.5, '#061c36');
  oceanGrad.addColorStop(1, '#04101e');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Lat/Lon grid lines (tactical orbital grid)
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
  ctx.lineWidth = 1;
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * 1024;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }

  // Simplified continent landmass blobs
  ctx.fillStyle = 'rgba(0, 210, 255, 0.22)';
  // Eurasia / Africa
  ctx.beginPath();
  ctx.ellipse(600, 180, 180, 90, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(540, 300, 70, 100, 0, 0, Math.PI * 2);
  ctx.fill();
  // Americas
  ctx.beginPath();
  ctx.ellipse(260, 180, 90, 90, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(320, 340, 60, 100, 0, 0, Math.PI * 2);
  ctx.fill();
  // Australia
  ctx.beginPath();
  ctx.ellipse(820, 360, 50, 40, 0, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

/**
 * Loads earth textures with instant fallback safety.
 */
export function loadEarthTextures(onLoaded) {
  const loader = new THREE.TextureLoader();
  const fallback = createFallbackEarthCanvas();

  const textures = {
    earthMap: fallback,
    cloudsMap: null,
    specularMap: null,
    normalMap: null,
  };

  loader.load(
    '/textures/earth_atmos_2048.jpg',
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      textures.earthMap = tex;
      if (onLoaded) onLoaded(textures);
    },
    undefined,
    () => {
      // Keep fallback
      if (onLoaded) onLoaded(textures);
    }
  );

  loader.load('/textures/earth_clouds_1024.png', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    textures.cloudsMap = tex;
    if (onLoaded) onLoaded(textures);
  });

  loader.load('/textures/earth_specular_2048.jpg', (tex) => {
    textures.specularMap = tex;
    if (onLoaded) onLoaded(textures);
  });

  loader.load('/textures/earth_normal_2048.jpg', (tex) => {
    textures.normalMap = tex;
    if (onLoaded) onLoaded(textures);
  });

  return textures;
}
