import * as THREE from 'three';

export const INDIA_CENTER = {
  lat: 20.5937,
  lon: 78.9629,
  label: 'SECTOR 81 // INDIA',
};

export const CITY_LOCATIONS = {
  Mumbai: {
    name: 'Mumbai',
    lat: 19.0760,
    lon: 72.8777,
    coords: '19.0760° N, 72.8777° E',
    pop: '20.6M',
    risk: 'LEVEL-4 DELUGE EMERGENCY',
  },
  Delhi: {
    name: 'Delhi',
    lat: 28.7041,
    lon: 77.1025,
    coords: '28.7041° N, 77.1025° E',
    pop: '32.9M',
    risk: 'LEVEL-5 HEATWAVE CRISIS',
  },
  Chennai: {
    name: 'Chennai',
    lat: 13.0827,
    lon: 80.2707,
    coords: '13.0827° N, 80.2707° E',
    pop: '7.1M',
    risk: 'LEVEL-3 CYCLONE ALERT',
  },
  Hyderabad: {
    name: 'Hyderabad',
    lat: 17.3850,
    lon: 78.4867,
    coords: '17.3850° N, 78.4867° E',
    pop: '10.0M',
    risk: 'LEVEL-3 FLOOD SURGE',
  },
  Bengaluru: {
    name: 'Bengaluru',
    lat: 12.9716,
    lon: 77.5946,
    coords: '12.9716° N, 77.5946° E',
    pop: '13.2M',
    risk: 'LEVEL-2 INFRASTRUCTURE FAIL',
  },
  Kolkata: {
    name: 'Kolkata',
    lat: 22.5726,
    lon: 88.3639,
    coords: '22.5726° N, 88.3639° E',
    pop: '14.8M',
    risk: 'LEVEL-2 MONSOON ALERT',
  },
};

/**
 * Converts geographic latitude and longitude to a 3D unit Vector3 on a sphere.
 * In Three.js SphereGeometry:
 * phi = (90 - lat) * (PI / 180)
 * theta = (lon + 180) * (PI / 180)
 */
export function latLonToVector3(lat, lon, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.cos(theta) * Math.sin(phi),
    radius * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi)
  );
}

/**
 * Returns the exact Euler rotation [rx, ry, 0] with order 'XYZ'
 * that will rotate the Earth so the given (lat, lon) faces directly towards the camera (along +Z).
 */
export function getRotationForLocation(lat, lon) {
  const rx = lat * (Math.PI / 180);
  const ry = -(lon + 90) * (Math.PI / 180);
  return { rx, ry, rz: 0 };
}
