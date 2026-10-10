const disasterData = [
  {
    id: "flood",
    name: "Flood",
    emoji: "🌊",
    primaryResource: "rescue",
    secondaryResource: "food",
    baseCost: { rescue: 15, food: 10 },
    difficultyWeight: 2,
    warning: "IMD has issued a Yellow Alert for coastal areas. The IMD is never wrong, except when it is."
  },
  {
    id: "wildfire",
    name: "Wildfire",
    emoji: "🔥",
    primaryResource: "rescue",
    secondaryResource: "engineers",
    baseCost: { rescue: 15, engineers: 10 },
    difficultyWeight: 3,
    warning: "Dry winds are picking up. Someone dropped a cigarette in the dry bush. Again."
  },
  {
    id: "heatwave",
    name: "Heatwave",
    emoji: "☀️",
    primaryResource: "medical",
    secondaryResource: "food",
    baseCost: { medical: 20, food: 5 },
    difficultyWeight: 2,
    warning: "Temperatures are soaring above 45°C. ACs are melting."
  },
  {
    id: "cyclone",
    name: "Cyclone",
    emoji: "🌀",
    primaryResource: "rescue",
    secondaryResource: "medical",
    baseCost: { rescue: 20, medical: 15 },
    difficultyWeight: 3,
    warning: "A low pressure system is developing. Hoard your Maggi noodles."
  },
  {
    id: "building_collapse",
    name: "Building Collapse",
    emoji: "🏢",
    primaryResource: "engineers",
    secondaryResource: "rescue",
    baseCost: { engineers: 15, rescue: 15 },
    difficultyWeight: 2,
    warning: "That new bridge looks a bit wobbly. Probably just the wind."
  },
  {
    id: "disease_outbreak",
    name: "Disease Outbreak",
    emoji: "🦠",
    primaryResource: "medical",
    secondaryResource: "food",
    baseCost: { medical: 25, food: 10 },
    difficultyWeight: 3,
    warning: "Everyone seems to have a cough suddenly. Stay away from the pani puri."
  },
  {
    id: "power_outage",
    name: "Power Outage",
    emoji: "⚡",
    primaryResource: "engineers",
    secondaryResource: "medical",
    baseCost: { engineers: 20, medical: 5 },
    difficultyWeight: 1,
    warning: "The grid is fluctuating. Save your work."
  },
  {
    id: "infrastructure_failure",
    name: "Infrastructure Failure",
    emoji: "🚧",
    primaryResource: "engineers",
    secondaryResource: "rescue",
    baseCost: { engineers: 25, rescue: 5 },
    difficultyWeight: 2,
    warning: "The main water pipeline burst. Free swimming pool in Sector 4!"
  },
  {
    id: "pollution_emergency",
    name: "Pollution Emergency",
    emoji: "😷",
    primaryResource: "medical",
    secondaryResource: "engineers",
    baseCost: { medical: 15, engineers: 10 },
    difficultyWeight: 2,
    warning: "AQI is crossing 500. Breathing is now considered a health hazard."
  }
];

export default disasterData;
