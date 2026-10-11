// Points per difficultyWeight for each disaster outcome
const OUTCOME_POINTS = { resolved: 3, partial: 1, failed: 0 };

const EFFICIENCY_RATE = 0.25;
const EFFICIENCY_CAP = 20;

// history: every disaster result from the whole game ({ status, difficultyWeight })
export function calcScore({ cityHealth, resources, history, city }) {
  const survived = cityHealth > 0;
  const base = Math.max(0, Math.round(cityHealth));

  // Reserves only count if there is still a city left to use them
  const reserves = Object.values(resources).reduce((sum, amount) => sum + amount, 0);
  const efficiency = survived ? Math.min(EFFICIENCY_CAP, Math.round(reserves * EFFICIENCY_RATE)) : 0;

  const disasterBonus = history.reduce((sum, result) => {
    return sum + result.difficultyWeight * (OUTCOME_POINTS[result.status] ?? 0);
  }, 0);

  const score = Math.round((base + efficiency + disasterBonus) * (city?.multiplier || 1));
  return { score, details: { base, efficiency, disasterBonus } };
}
