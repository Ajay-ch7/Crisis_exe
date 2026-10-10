export function calcScore({ cityHealth, resources, disastersDefeated, city }) {
  const base = cityHealth;
  
  const efficiency = (
    resources.rescue + 
    resources.medical + 
    resources.food + 
    resources.engineers
  ) * 0.3;
  
  const disasterBonus = disastersDefeated.reduce((sum, disaster) => {
    return sum + disaster.difficultyWeight;
  }, 0);
  
  const final = Math.round((base + efficiency + disasterBonus) * city.multiplier);
  return final;
}
