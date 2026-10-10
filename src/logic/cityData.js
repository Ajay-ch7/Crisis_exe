const cityData = [
  {
    name: "Mumbai",
    difficulty: "hard",
    multiplier: 1.5,
    quirk: "Floods hit 40% harder. Also it's always raining anyway.",
    quirkEffect: { flood: 1.4 }
  },
  {
    name: "Delhi",
    difficulty: "hard",
    multiplier: 1.5,
    quirk: "Heatwaves drain medical twice as fast.",
    quirkEffect: { heatwave: 2 }
  },
  {
    name: "Chennai",
    difficulty: "medium",
    multiplier: 1.2,
    quirk: "Engineers are 20% slower.",
    quirkEffect: { engineerSpeed: 0.8 }
  },
  {
    name: "Hyderabad",
    difficulty: "medium",
    multiplier: 1.2,
    quirk: "Traffic slows rescue 25%.",
    quirkEffect: { rescueSpeed: 0.75 }
  },
  {
    name: "Bengaluru",
    difficulty: "medium",
    multiplier: 1.2,
    quirk: "Everything slows 30% due to infrastructure overload.",
    quirkEffect: { all: 0.7 }
  },
  {
    name: "Kolkata",
    difficulty: "easy",
    multiplier: 1.0,
    quirk: "Minor debuff only. Things are generally chill.",
    quirkEffect: { minor: 0.9 }
  }
];

export default cityData;
