import * as THREE from 'three';

/**
 * Custom Fresnel Atmosphere Shader for orbital cinematic rim glow.
 */
export function createAtmosphereMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform vec3 glowColor;
      uniform float rimPower;
      uniform float rimIntensity;

      void main() {
        vec3 viewDir = normalize(-vPosition);
        float rim = 1.0 - max(0.0, dot(viewDir, vNormal));
        float glow = pow(rim, rimPower) * rimIntensity;
        gl_FragColor = vec4(glowColor, glow);
      }
    `,
    uniforms: {
      glowColor: { value: new THREE.Color(0x00f0ff) },
      rimPower: { value: 3.2 },
      rimIntensity: { value: 0.85 },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  });
}
