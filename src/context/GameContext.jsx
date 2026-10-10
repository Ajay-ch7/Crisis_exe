import { createContext, useContext, useReducer } from 'react';
import { assignCity, drawDisasters, resetRandomiser } from '../logic/randomiser';

const GameContext = createContext();

const initialState = {
  nickname: "",
  city: null,
  round: 1,
  disasters: [],
  resources: { rescue: 25, medical: 25, food: 25, engineers: 25 },
  cityHealth: 100,
  score: 0,
  gameOver: false,
  lastResults: [],
  scoreDetails: null
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_NICKNAME':
      return { ...state, nickname: action.payload };
      
    case 'ASSIGN_CITY':
      return { ...state, city: assignCity() };
      
    case 'DRAW_DISASTERS':
      return { ...state, disasters: drawDisasters(state.round) };
      
    case 'ALLOCATE': {
      const allocated = action.payload; // { rescue: 5, ... }
      
      // Subtract resources
      const newResources = { ...state.resources };
      for (const [key, val] of Object.entries(allocated)) {
        newResources[key] -= val;
      }

      let totalDamage = 0;
      const results = [];

      // Distribute the allocated resources against disaster requirements
      let availableForAlloc = { ...allocated };
      
      state.disasters.forEach(disaster => {
        let disasterDamage = 0;
        let required = 0;
        let provided = 0;

        for (const [resType, reqAmt] of Object.entries(disaster.baseCost)) {
          required += reqAmt;
          const assigned = Math.min(availableForAlloc[resType] || 0, reqAmt);
          provided += assigned;
          availableForAlloc[resType] -= assigned;
        }

        if (required > 0) {
          const shortfallRatio = (required - provided) / required;
          if (shortfallRatio > 0) {
            disasterDamage += shortfallRatio * 20; // up to 20 damage per disaster
          }
        }

        // Determine status
        let status = 'resolved';
        if (provided === 0) status = 'failed';
        else if (provided < required) status = 'partial';

        // Apply city quirks (e.g. Mumbai flood hits 40% harder)
        if (state.city?.quirkEffect && state.city.quirkEffect[disaster.id]) {
          disasterDamage *= state.city.quirkEffect[disaster.id];
        } else if (state.city?.quirkEffect?.all) {
          // just an example of applying global debuff if any
        }

        totalDamage += disasterDamage;

        results.push({
          id: disaster.id,
          name: disaster.name,
          emoji: disaster.emoji,
          status,
          message: status === 'resolved' ? 'Handled flawlessly!' : status === 'partial' ? 'We survived, but it was messy.' : 'Total catastrophe!'
        });
      });

      const newHealth = Math.max(0, state.cityHealth - totalDamage);
      const isGameOver = newHealth === 0;

      return { 
        ...state, 
        resources: newResources,
        cityHealth: newHealth,
        lastResults: results,
        gameOver: isGameOver
      };
    }
      
    case 'NEXT_ROUND':
      return { 
        ...state, 
        round: state.round + 1,
        gameOver: state.round + 1 > 3
      };
      
    case 'CALC_SCORE': {
      // Calculate efficiency and bonuses
      const base = state.cityHealth;
      const efficiency = Math.round((state.resources.rescue + state.resources.medical + state.resources.food + state.resources.engineers) * 0.3);
      
      // Disaster bonus for completing the simulation
      const disasterBonus = 10;

      const finalScore = Math.round((base + efficiency + disasterBonus) * (state.city?.multiplier || 1));

      return { 
        ...state, 
        score: finalScore,
        scoreDetails: { base, efficiency, disasterBonus }
      };
    }
      
    case 'RESET':
      resetRandomiser();
      return { ...initialState };
      
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
