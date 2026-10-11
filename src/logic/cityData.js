// quirkEffect:
//   cost:       { [disasterId]: multiplier }  -> that disaster needs more units in this city
//   damage:     { [disasterId]: multiplier }  -> that disaster does more damage when not contained
//   efficiency: { [resource | 'all']: 0..1 }  -> each unit does less work, so incidents need more units
// riskProfile: { [disasterId]: weight } -> how much more likely that disaster is here (default weight 1)
const cityData = [
  {
    name: "Mumbai",
    difficulty: "hard",
    multiplier: 1.5,
    quirk: "Floods hit 40% harder. Also it's always raining anyway.",
    quirkEffect: { cost: { flood: 1.4 }, damage: { flood: 1.4 } },
    riskProfile: { flood: 5, cyclone: 3, building_collapse: 2 }
  },
  {
    name: "Delhi",
    difficulty: "hard",
    multiplier: 1.5,
    quirk: "Heatwaves drain medical twice as fast.",
    quirkEffect: { cost: { heatwave: 1.5 }, damage: { heatwave: 2 } },
    riskProfile: { heatwave: 5, pollution_emergency: 4, power_outage: 2 }
  },
  {
    name: "Chennai",
    difficulty: "medium",
    multiplier: 1.2,
    quirk: "Engineers are 20% slower.",
    quirkEffect: { efficiency: { engineers: 0.8 } },
    riskProfile: { cyclone: 4, flood: 3, heatwave: 2 }
  },
  {
    name: "Hyderabad",
    difficulty: "medium",
    multiplier: 1.2,
    quirk: "Traffic slows rescue 25%.",
    quirkEffect: { efficiency: { rescue: 0.75 } },
    riskProfile: { flood: 4, heatwave: 2, disease_outbreak: 2 }
  },
  {
    name: "Bengaluru",
    difficulty: "medium",
    multiplier: 1.2,
    quirk: "Everything slows 15% due to infrastructure overload.",
    quirkEffect: { efficiency: { all: 0.85 } },
    riskProfile: { infrastructure_failure: 4, power_outage: 3, flood: 2 }
  },
  {
    name: "Kolkata",
    difficulty: "easy",
    multiplier: 1.0,
    quirk: "Minor debuff only. Things are generally chill.",
    quirkEffect: { efficiency: { all: 0.95 } },
    riskProfile: { flood: 3, cyclone: 3, disease_outbreak: 2 }
  }
];

export default cityData;
