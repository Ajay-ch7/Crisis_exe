# Game Logic Changes

This document describes how the game rules changed from the original version (commit `aa76a9b`, "Initial Commit") to the current one. No screen component and no leaderboard code was modified; only the files under `src/logic/` and `src/context/GameContext.jsx`.

## Summary

| Area | Before | After |
|---|---|---|
| Disasters per round | 1, 2, 2 | 1, 2, 3 |
| Round 3 severity | Same as other rounds | Costs and damage 15% higher |
| Resupply between rounds | None | +12 units to every branch |
| Escalation | None | Uncontained disasters make the next round more expensive |
| Damage per disaster | Up to 20 for every disaster | Up to 15, 20 or 25 depending on the disaster |
| "Failed" status | Only when zero units were sent | When less than 50% of the need is met |
| Who gets supplied first | Whichever disaster was drawn first | The most dangerous disaster |
| City quirks | Only Mumbai and Delhi had any effect | All six cities have a working quirk |
| Disaster selection | Uniformly random | Weighted by each city's risk profile |
| Disaster bonus (score) | Flat +10 | Earned per disaster, based on outcome and difficulty |
| Efficiency bonus (score) | 0.3 per leftover unit, always | 0.25 per leftover unit, max 20, zero if the city collapsed |
| Randomness | `Math.random()` inside the reducer | Seeded generator; the seed lives in game state |

## Rounds

| Round | Disasters | Severity |
|---|---|---|
| 1 | 1 | ×1.0 |
| 2 | 2 | ×1.0 |
| 3 | 3 | ×1.15 |

Severity multiplies both the units a disaster needs and the damage it can do. No disaster appears twice in one game (6 of the 9 are used).

## Resources

- Starting stock is unchanged: 25 units in each of the four branches, 100% city integrity.
- **New:** after rounds 1 and 2, every branch receives +12 units.
- Unused units still carry forward.
- Units deployed beyond what the disasters need are still lost. This is unchanged, but the game now clamps a deployment to what the player actually has.

## Disaster cost

The units a disaster needs are no longer the fixed numbers from `disasterData.js`. For each resource:

```
needed = base cost × round severity × (1 + escalation) × city cost quirk ÷ city efficiency quirk
```

rounded to a whole number. The result replaces `baseCost` on each disaster in `state.disasters`, so the numbers the screens already display ("NEEDS", "EST. NEED") are the real requirements.

## Escalation

New mechanic. After each round:

- each **failed** disaster adds 10% to the cost of all later disasters,
- each **partial** disaster adds 5%,
- the total is capped at 30%.

## Resolving a round

1. Disasters are sorted by maximum damage, highest first.
2. Each disaster in turn takes what it needs from the deployed units, as far as they last.
3. Coverage = units received ÷ units needed.

| Coverage | Status | Damage |
|---|---|---|
| 100% | resolved | 0 |
| 50% to 99% | partial | max damage × (1 − coverage) |
| under 50% | failed | max damage × (1 − coverage) |

Maximum damage per disaster:

```
max damage = (10 + 5 × difficulty weight) × round severity × city damage quirk
```

| Difficulty weight | Disasters | Max damage (rounds 1–2) |
|---|---|---|
| 1 | Power Outage | 15 |
| 2 | Flood, Heatwave, Building Collapse, Infrastructure Failure, Pollution Emergency | 20 |
| 3 | Wildfire, Cyclone, Disease Outbreak | 25 |

Before, every disaster did `shortfall × 20`, and only Mumbai floods and Delhi heatwaves were modified.

The city collapses and the game ends when integrity reaches 0, as before.

## City quirks

| City | Quirk text | Before | After |
|---|---|---|---|
| Mumbai | Floods hit 40% harder | Flood damage ×1.4 | Flood damage ×1.4 and flood cost ×1.4 |
| Delhi | Heatwaves drain medical twice as fast | Heatwave damage ×2 | Heatwave damage ×2 and heatwave cost ×1.5 |
| Chennai | Engineers are 20% slower | No effect | Engineer needs ×1.25 |
| Hyderabad | Traffic slows rescue 25% | No effect | Rescue needs ×1.33 |
| Bengaluru | Everything slows 15% (was 30%) | No effect | All needs ×1.18 |
| Kolkata | Minor debuff only | No effect | All needs ×1.05 |

Bengaluru's text and value were reduced from 30% to 15%; at 30% it was the hardest city in the game despite being rated medium. Score multipliers and difficulty labels are unchanged.

## City risk profiles

New. Each city makes certain disasters more likely to be drawn (other disasters have weight 1):

| City | More likely disasters (weight) |
|---|---|
| Mumbai | Flood (5), Cyclone (3), Building Collapse (2) |
| Delhi | Heatwave (5), Pollution Emergency (4), Power Outage (2) |
| Chennai | Cyclone (4), Flood (3), Heatwave (2) |
| Hyderabad | Flood (4), Heatwave (2), Disease Outbreak (2) |
| Bengaluru | Infrastructure Failure (4), Power Outage (3), Flood (2) |
| Kolkata | Flood (3), Cyclone (3), Disease Outbreak (2) |

## Scoring

The overall formula is unchanged:

```
final score = (base + efficiency bonus + disaster bonus) × city multiplier
```

| Part | Before | After |
|---|---|---|
| Base | City integrity | City integrity (unchanged) |
| Efficiency bonus | Leftover units × 0.3 | Leftover units × 0.25, capped at 20, and 0 if the city collapsed |
| Disaster bonus | Always 10 | Sum over every disaster of difficulty weight × 3 (resolved), × 1 (partial) or × 0 (failed) |

The values submitted to the leaderboard (`nickname`, `score`, `city`, `survived`) have the same shape as before.

## Bug fixes

- **Double-drawn disasters.** The reducer used `Math.random()` and a module-level set, so React StrictMode drew disasters twice and used them up. The city and the full disaster schedule now come from a seed stored in state, and the reducer is pure.
- **Stale disasters on the warning screen.** The next round's disasters are now drawn when the round advances, not after the warning screen mounts.
- **Deploying twice.** A second `ALLOCATE` in the same round is ignored.
- **Invalid allocations.** Negative, fractional, unknown or over-stock amounts are clamped.
- **Unused code.** `scoreCalc.js` existed but was never called; it now holds the scoring formula.

## State and actions

Action names and existing state fields are unchanged, so the screens work without modification.

New fields on game state:

| Field | Meaning |
|---|---|
| `seed` | Seed for this game's city and disasters |
| `schedule` | Disaster ids for all three rounds |
| `disastersRound` | Round the current `disasters` were drawn for |
| `escalation` | Current escalation, 0 to 0.3 |
| `roundResolved` | True once resources were deployed this round |
| `lastSupply` | Units added by the last resupply, per branch |
| `lastDamage` | Total integrity lost in the last round |
| `history` | Every disaster result so far |

New field on each entry of `state.disasters`: `maxDamage`. The existing `baseCost` now holds the scaled cost.

New fields on each entry of `state.lastResults`: `difficultyWeight`, `required`, `provided`, `coverage` (0 to 1), `damage`. The `message` text now includes the coverage percentage and integrity lost.

## Files

| File | Change |
|---|---|
| `src/logic/gameRules.js` | New. Round setup, costs, resolution, resupply, and all tuning constants |
| `src/logic/randomiser.js` | Rewritten. Seeded generator, city assignment, weighted disaster schedule |
| `src/logic/scoreCalc.js` | Rewritten. Scoring formula |
| `src/logic/cityData.js` | Quirk effects restructured, risk profiles added, Bengaluru text changed |
| `src/context/GameContext.jsx` | Reducer now delegates to the logic files |
| `src/logic/disasterData.js` | Unchanged |

## Not yet updated

The gameplay section of `README.md` still describes the old damage formula and scoring.
