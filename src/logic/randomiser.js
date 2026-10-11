import cityData from './cityData.js';
import disasterData from './disasterData.js';

// Everything here is driven by a seed kept in game state, so the reducer stays
// pure: the same seed always produces the same city and the same disasters.

export function randomSeed() {
  return Math.floor(Math.random() * 0xffffffff) >>> 0;
}

// mulberry32 — small, fast seeded PRNG returning floats in [0, 1)
export function createRng(seed) {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Seed for the next game, derived from the current one
export function nextSeed(seed) {
  return Math.floor(createRng(seed ^ 0x9e3779b9)() * 0xffffffff) >>> 0;
}

export function assignCity(rng) {
  return cityData[Math.floor(rng() * cityData.length)];
}

// Picks every disaster for the whole game up front (no repeats), weighted by
// the city's risk profile. Returns one array of disaster ids per round.
export function buildSchedule(rng, city, countsPerRound) {
  const pool = disasterData.map(d => ({ id: d.id, weight: city?.riskProfile?.[d.id] ?? 1 }));

  return countsPerRound.map(count => {
    const picked = [];
    for (let n = 0; n < count && pool.length > 0; n++) {
      const totalWeight = pool.reduce((sum, d) => sum + d.weight, 0);
      let roll = rng() * totalWeight;
      let index = pool.findIndex(d => (roll -= d.weight) < 0);
      if (index === -1) index = pool.length - 1;
      picked.push(pool.splice(index, 1)[0].id);
    }
    return picked;
  });
}
