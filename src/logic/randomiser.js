import cityData from './cityData.js';
import disasterData from './disasterData.js';

let drawnDisasterIds = new Set();

export function assignCity() {
  const randomIndex = Math.floor(Math.random() * cityData.length);
  return cityData[randomIndex];
}

export function drawDisasters(round) {
  const numToDraw = round === 1 ? 1 : 2;
  const availableDisasters = disasterData.filter(d => !drawnDisasterIds.has(d.id));
  
  // If we somehow run out of disasters (shouldn't happen with 9 total and max 5 drawn), reset
  if (availableDisasters.length < numToDraw) {
    drawnDisasterIds.clear();
    return drawDisasters(round);
  }

  // Shuffle available disasters
  for (let i = availableDisasters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableDisasters[i], availableDisasters[j]] = [availableDisasters[j], availableDisasters[i]];
  }

  const drawn = availableDisasters.slice(0, numToDraw);
  drawn.forEach(d => drawnDisasterIds.add(d.id));
  
  return drawn;
}

export function resetRandomiser() {
  drawnDisasterIds.clear();
}
