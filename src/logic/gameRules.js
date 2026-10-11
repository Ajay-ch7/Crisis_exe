import disasterData from './disasterData.js';

export const TOTAL_ROUNDS = 3;
export const RESOURCE_TYPES = ['rescue', 'medical', 'food', 'engineers'];
export const STARTING_RESOURCES = { rescue: 25, medical: 25, food: 25, engineers: 25 };
export const STARTING_HEALTH = 100;

// How many disasters hit each round, and how much bigger they are than their base stats
export const ROUND_CONFIG = {
  1: { count: 1, severity: 1 },
  2: { count: 2, severity: 1 },
  3: { count: 3, severity: 1.15 }
};

// Units of every resource delivered by central relief between rounds
export const RESUPPLY_PER_ROUND = 12;

// Uncontained disasters make the next round's threats bigger
export const ESCALATION = { failed: 0.1, partial: 0.05, max: 0.3 };

// Below this share of needs met, a disaster counts as failed rather than partial
export const FAILED_COVERAGE = 0.5;

export function disastersPerRound() {
  return Array.from({ length: TOTAL_ROUNDS }, (_, i) => ROUND_CONFIG[i + 1].count);
}

function resourceEfficiency(city, resource) {
  const efficiency = city?.quirkEffect?.efficiency;
  return efficiency?.[resource] ?? efficiency?.all ?? 1;
}

function costMultiplier(city, disasterId) {
  return city?.quirkEffect?.cost?.[disasterId] ?? 1;
}

function damageMultiplier(city, disasterId) {
  return city?.quirkEffect?.damage?.[disasterId] ?? 1;
}

// Turns this round's scheduled disasters into live incidents. Round severity,
// escalation and city quirks are baked into baseCost / maxDamage, so whatever
// the screens show as "needed" is exactly what resolveRound will ask for.
export function buildIncidents(disasterIds, round, city, escalation = 0) {
  const { severity } = ROUND_CONFIG[round] ?? ROUND_CONFIG[TOTAL_ROUNDS];
  const costScale = severity * (1 + escalation);

  return disasterIds.map(id => {
    const disaster = disasterData.find(d => d.id === id);
    const scale = costScale * costMultiplier(city, id);
    const baseCost = {};
    for (const [resource, amount] of Object.entries(disaster.baseCost)) {
      baseCost[resource] = Math.max(1, Math.round((amount * scale) / resourceEfficiency(city, resource)));
    }
    const maxDamage = Math.round((10 + 5 * disaster.difficultyWeight) * severity * damageMultiplier(city, id));

    return { ...disaster, baseCost, maxDamage };
  });
}

function outcomeMessage(status, coveragePct, damage) {
  if (status === 'resolved') return 'Handled flawlessly! Zero damage to the city.';
  if (status === 'partial') return `We survived, but it was messy. ${coveragePct}% of needs met, city integrity -${damage}%.`;
  return `Total catastrophe! Only ${coveragePct}% of needs met, city integrity -${damage}%.`;
}

// Resolves a round. Deployed units are shared between incidents, with the most
// dangerous incident supplied first. Returns results in the incidents' original order.
export function resolveRound(incidents, allocated) {
  const pool = { ...allocated };
  const triageOrder = incidents
    .map((incident, index) => ({ incident, index }))
    .sort((a, b) => b.incident.maxDamage - a.incident.maxDamage || a.index - b.index);

  const results = [];
  let totalDamage = 0;
  let escalation = 0;

  for (const { incident, index } of triageOrder) {
    let required = 0;
    let provided = 0;
    for (const [resource, amount] of Object.entries(incident.baseCost)) {
      const assigned = Math.min(pool[resource] || 0, amount);
      pool[resource] = (pool[resource] || 0) - assigned;
      required += amount;
      provided += assigned;
    }

    const coverage = required > 0 ? provided / required : 1;
    let status = 'resolved';
    if (coverage < FAILED_COVERAGE) status = 'failed';
    else if (coverage < 1) status = 'partial';

    const damage = status === 'resolved' ? 0 : Math.max(1, Math.round(incident.maxDamage * (1 - coverage)));
    totalDamage += damage;
    escalation += ESCALATION[status] ?? 0;

    results[index] = {
      id: incident.id,
      name: incident.name,
      emoji: incident.emoji,
      status,
      message: outcomeMessage(status, Math.round(coverage * 100), damage),
      difficultyWeight: incident.difficultyWeight,
      required,
      provided,
      coverage,
      damage
    };
  }

  // Units deployed beyond what the incidents needed are used up anyway
  const wasted = Object.values(pool).reduce((sum, left) => sum + left, 0);

  return { results, totalDamage, escalation, wasted };
}

// Clamps a requested allocation to whole, non-negative units the player actually has
export function sanitiseAllocation(requested, resources) {
  const allocation = {};
  for (const resource of RESOURCE_TYPES) {
    const amount = Math.floor(Number(requested?.[resource]) || 0);
    allocation[resource] = Math.min(Math.max(amount, 0), resources[resource] ?? 0);
  }
  return allocation;
}

export function resupply(resources) {
  const next = { ...resources };
  for (const resource of RESOURCE_TYPES) {
    next[resource] = (next[resource] ?? 0) + RESUPPLY_PER_ROUND;
  }
  return next;
}
