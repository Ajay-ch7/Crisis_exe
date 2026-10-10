# Crisis.exe — Implementation Plan

Oct 10, 2026

Full phase-by-phase build guide for two people, 7 days, vibe-coding with React + Firebase.

## Project overview

**Game:** Crisis.exe — browser game where players manage disasters across 3 rounds, built for a tech fest lab.

**Stack:** React + Vite · Tailwind CSS · Framer Motion · React Hot Toast · Firebase Realtime Database

**Repo:** One shared GitHub repo. Both people clone it. Work in separate component files; never edit the same file simultaneously.

| Who | Owns |
| --- | --- |
| Person 1 | All 7 screen components, App.jsx router, ResourceSlider, HealthBar UI |
| Person 2 | GameContext, all logic files, Firebase connector, FakeWarningToast |

**Handoff contract:** Person 2 ships `GameContext.jsx` and `cityData.js` by end of Day 2. Person 1 reads from context only — never writes game logic inline in screens.

**Target:** Full playable build by Day 5. Days 6–7 are polish and buffer only.

## Phase 0 — Setup (Day 1, both together, ~2 hrs)

**Goal:** Runnable blank app on both machines, Firebase live, folder structure agreed.

### Steps

1. **Scaffold the app**
   ```
   npm create vite@latest crisis-exe -- --template react
   cd crisis-exe
   npm install
   ```
2. **Install all dependencies at once**
   ```
   npm install tailwindcss @tailwindcss/vite framer-motion react-hot-toast firebase
   ```
3. **Configure Tailwind** — add the Vite plugin to `vite.config.js` and `@import "tailwindcss"` to `index.css`.
4. **Set up Firebase**
   - Go to [console.firebase.google.com](https://console.firebase.google.com)
   - Create project → Realtime Database → Start in test mode
   - Copy config keys into a `.env` file at repo root:
   ```
   VITE_FB_API_KEY=...
   VITE_FB_AUTH_DOMAIN=...
   VITE_FB_DATABASE_URL=...
   VITE_FB_PROJECT_ID=...
   ```
   - Add `.env` to `.gitignore` immediately.
5. **Create the folder structure** (Person 2 does this, commits, Person 1 pulls)
   ```
   src/
     components/
       screens/       ← Person 1 works here
       ui/            ← Person 1 works here
     logic/           ← Person 2 works here
     firebase/        ← Person 2 works here
     context/         ← Person 2 works here
     App.jsx
     main.jsx
   ```
6. **Build SplashScreen together** as a warm-up — shared first component, confirms both setups work.

**Done when:** Both machines run `npm run dev`, see the splash screen, and Firebase is connected.

## Phase 1 — Game data layer (Day 2, Person 2)

**Goal:** All static game data and logic functions written and exportable. Person 1 can start reading from these on Day 2.

### Files to build

**`src/logic/cityData.js`**

Export an array of 6 city objects:
```js
{
  name: "Mumbai",
  difficulty: "hard",         // "easy" | "medium" | "hard"
  multiplier: 1.5,
  quirk: "Floods hit 40% harder. Also it's always raining anyway.",
  quirkEffect: { flood: 1.4 }  // applied in score calculator
}
```

Cities: Mumbai (hard ×1.5), Delhi (hard ×1.5), Chennai (medium ×1.2), Hyderabad (medium ×1.2), Bengaluru (medium ×1.2), Kolkata (easy ×1.0).

**`src/logic/disasterData.js`**

Export an array of 9 disaster objects:
```js
{
  id: "flood",
  name: "Flood",
  emoji: "🌊",
  primaryResource: "rescue",
  secondaryResource: "food",
  baseCost: { rescue: 15, food: 10 },   // to resolve perfectly
  difficultyWeight: 2,                   // added to score bonus
  warning: "IMD has issued a Yellow Alert for coastal areas. The IMD is never wrong, except when it is."
}
```

**`src/logic/randomiser.js`**

Two exported functions:
- `assignCity()` — picks a random city from cityData
- `drawDisasters(round)` — draws 1 disaster for round 1, 2 for rounds 2 and 3; never the same disaster twice in one game

**`src/logic/scoreCalc.js`**

Exported function `calcScore({ cityHealth, resourcesLeft, disastersDefeated, city })`:
```
Base Score        = cityHealth (0–100)
Efficiency Bonus  = (rescue + medical + food + engineers left) × 0.3
Disaster Bonus    = sum of difficultyWeight of all defeated disasters
Final Score       = (Base + Efficiency + Disaster Bonus) × city.multiplier
```
Return `Math.round(finalScore)`.

**`src/logic/fakeWarnings.js`**

Export an array of 30 strings. Examples:
- `"ALERT: Your city's WiFi password has been changed to 'disaster123'. No one knows why."`
- `"WARNING: 47 engineers have submitted leave applications simultaneously. HR is investigating."`
- `"CRITICAL: The mayor's biryani order is delayed 45 minutes. Morale declining."`
- `"NOTICE: A local astrologer says today is inauspicious for flood management. He has 4.8 stars on Google."`
- `"URGENT: Someone in Block C is microwaving fish. Evacuation may be necessary."`

**Done when:** All 5 files export correctly, no runtime errors on import.

## Phase 2 — Core screens (Days 2–3, Person 1)

**Goal:** All 7 screens render with correct layout, read from GameContext, and chain to the next screen via `nextScreen()`. No animation yet — that is Phase 5.

### Screen checklist

- [ ] **SplashScreen** — Input for nickname (3–10 chars, validated), big START button, game title. On submit: saves nickname to context, goes to CityRevealScreen.
- [ ] **CityRevealScreen** — Shows a large card with the assigned city name, difficulty badge, and the city's quirk text. A CONTINUE button proceeds to WarningScreen (round 1).
- [ ] **WarningScreen** — Displays the warning text for the upcoming disaster(s). Styled like a system alert. Timer or button to proceed to AllocationScreen.
- [ ] **AllocationScreen** — Four sliders, one per resource type (Rescue, Medical, Food, Engineers). Shows remaining totals. A DEPLOY button locks in the allocation and goes to OutcomeScreen.
- [ ] **OutcomeScreen** — Shows which disasters hit, how well each was handled (✅ resolved / ⚠️ partial / ❌ failed), and a humour one-liner. City health bar updates. After 3 rounds, goes to FinalScoreScreen; otherwise back to WarningScreen.
- [ ] **FinalScoreScreen** — Shows final score (already computed by context), city survived or collapsed, efficiency and difficulty bonuses broken out. SUBMIT TO LEADERBOARD button → calls Firebase write → goes to LeaderboardScreen.
- [ ] **LeaderboardScreen** — Reads top 10 scores from Firebase, displays them in a ranked table. PLAY AGAIN button resets context and returns to SplashScreen.

### Key rules for Person 1

- Never write score logic or disaster resolution inline in a screen. Call functions from `scoreCalc.js` and `randomiser.js` via context.
- All resource values come from `useGameContext()`. Never use local state for game data.
- Use Tailwind classes for layout. Keep screens full viewport height (`min-h-screen`).
- Each screen lives in its own file under `src/components/screens/`.

**Done when:** You can click through all 7 screens manually with dummy context data and nothing crashes.

## Phase 3 — Systems (Days 2–3, Person 2)

**Goal:** GameContext fully functional, Firebase reading and writing, fake warnings firing. Person 1 can import and use all of this.

### Files to build

**`src/context/GameContext.jsx`**

Create a React context with `useReducer`. Export `GameProvider` and `useGameContext`.

State shape:
```js
{
  nickname: "",
  city: null,
  round: 1,
  disasters: [],           // this round's drawn disasters
  resources: { rescue: 25, medical: 25, food: 25, engineers: 25 },
  cityHealth: 100,
  score: 0,
  gameOver: false
}
```

Actions to handle:
- `SET_NICKNAME` — saves nickname
- `ASSIGN_CITY` — calls `assignCity()`, stores result
- `DRAW_DISASTERS` — calls `drawDisasters(round)`, stores result
- `ALLOCATE` — subtracts allocated resources, runs disaster resolution, updates health
- `NEXT_ROUND` — increments round, or sets gameOver if round was 3
- `CALC_SCORE` — runs `calcScore()` and stores result
- `RESET` — returns to initial state for Play Again

**`src/firebase/config.js`**
```js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  // ... rest of env vars
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
```

**`src/firebase/leaderboard.js`**

Two exported async functions:
- `submitScore({ nickname, score, city, survived })` — pushes a new entry to `scores/` node
- `getTopScores(limit = 10)` — reads scores, orders by score descending, returns top N

**`src/components/ui/FakeWarningToast.jsx`**
```jsx
// Call this component once, inside GameProvider or App.jsx
// On mount: start an interval (random 25–45s)
// Each tick: pick a random string from fakeWarnings.js
// Fire with react-hot-toast using custom style:
//   - red left border, monospace font, "⚠ SYSTEM ALERT" prefix
// Clear interval on unmount
```

**Done when:** `useGameContext()` works in any screen, scores write to Firebase and are readable in the leaderboard, and fake warnings pop up during a gameplay session.

## Phase 4 — Integration (Day 4, both)

**Goal:** Wire every screen to the real context. One full game loop — start to leaderboard — works without errors.

### Integration checklist

- [ ] Wrap `App.jsx` in `<GameProvider>` so all screens can call `useGameContext()`
- [ ] `SplashScreen` dispatches `SET_NICKNAME` on submit, navigates to CityRevealScreen
- [ ] `CityRevealScreen` dispatches `ASSIGN_CITY` on mount, reads city from context
- [ ] `WarningScreen` dispatches `DRAW_DISASTERS` on mount, displays correct warning text
- [ ] `AllocationScreen` reads live resource totals from context, dispatches `ALLOCATE` on DEPLOY
- [ ] `OutcomeScreen` reads disaster results from context, dispatches `NEXT_ROUND` or `CALC_SCORE`
- [ ] `FinalScoreScreen` reads computed score, calls `submitScore()` on button press
- [ ] `LeaderboardScreen` calls `getTopScores()` on mount, renders live data
- [ ] PLAY AGAIN dispatches `RESET` and navigates to SplashScreen

### Test run protocol (do this together on Day 4)

1. Open two browser tabs. Play one full game in each.
2. Confirm both scores appear on the leaderboard.
3. Confirm city health drops correctly when resources are under-allocated.
4. Confirm city-specific quirks apply (e.g. Delhi heatwave drains Medical twice as fast).
5. Confirm game ends early if city health hits 0.
6. Confirm fake warnings appear during gameplay and do not affect score.

**Done when:** Both of you complete a full game loop end-to-end with no console errors.

## Phase 5 — Polish (Day 5, both)

**Goal:** The game looks and feels great. Animations, city colour themes, humour text, sound cues.

### Animation (Framer Motion)

| Where | What |
| --- | --- |
| CityRevealScreen | Card flips over to reveal city (rotateY 180°, 0.6s) |
| WarningScreen | Alert box shakes on entry (x: [-10, 10, -10, 0], 0.3s) |
| AllocationScreen | Resource sliders animate to initial value on mount |
| OutcomeScreen | City health bar animates from old value to new (1s ease) |
| OutcomeScreen | Screen shakes briefly if a disaster was badly handled |
| FinalScoreScreen | Score counts up from 0 to final value (1.5s) |
| All screen transitions | Fade in on mount (`initial: {opacity:0}`, `animate: {opacity:1}`) |

### City colour themes

| City | Theme |
| --- | --- |
| Mumbai | Grey-blue, rain effect (CSS animation, subtle) |
| Delhi | Dusty orange, hazy |
| Chennai | Deep teal |
| Hyderabad | Warm amber |
| Bengaluru | Muted green |
| Kolkata | Soft terracotta |

### Content to write (both contribute)

- [ ] 20 humour one-liners for OutcomeScreen (cover: under-resourced, over-resourced, perfect, game over)
- [ ] Verify all 30 fake warnings are written and varied enough
- [ ] Finalise all 9 disaster warning strings (vague but hinting)

### Optional if time allows

- Subtle disaster sound effect on OutcomeScreen (a short audio clip via `new Audio()`)
- Confetti burst on FinalScoreScreen if health > 80 (use `canvas-confetti` package)

**Done when:** A stranger playing the game for the first time finds it polished, reads the humour text, and does not experience any jarring transitions.

## Phase 6 — Final checks (Days 6–7)

**Goal:** Game is event-ready. Tested on the actual lab computers. Leaderboard is clean.

### Pre-event checklist

- [ ] Run the full game on a lab computer (not your dev machine) and fix any layout issues
- [ ] Test on Chrome and Edge (both common in college labs)
- [ ] Confirm Firebase is in **live mode** (not test mode, which expires after 30 days)
- [ ] Check that `.env` values are correctly set in the deployed build (use Vite's `import.meta.env`)
- [ ] Delete all test scores from Firebase before the event (`/scores` node → delete all)
- [ ] Set Firebase rules to allow public writes but no deletes from the client:
  ```json
  {
    "rules": {
      "scores": {
        ".read": true,
        ".write": true
      }
    }
  }
  ```
- [ ] Open the leaderboard on a second monitor/tab for the stall display
- [ ] Brief your stall volunteers: explain the game in 2 sentences, know how to reset if it crashes
- [ ] Do one full playthrough as a first-time visitor would — no help, no context

### If something breaks on event day

- **Firebase not connecting** — check browser console for CORS/config errors; ensure env vars are in the build
- **Leaderboard not updating** — check Firebase rules allow `.read: true`
- **Game state stuck** — add a hidden keyboard shortcut (e.g. `Ctrl+Shift+R`) that dispatches `RESET`
- **Screen looks wrong on lab monitor** — add `max-w-4xl mx-auto` to the root layout div

**Done when:** One complete stranger plays the game without any guidance and reaches the leaderboard.

## Prompt library — copy-paste for vibe coding

Paste these directly into Claude Code. Swap `[PASTE FILE HERE]` with the actual file content.

---

**Phase 0 — Scaffold**
```
Create a new React + Vite project called crisis-exe.
Install: tailwindcss @tailwindcss/vite framer-motion react-hot-toast firebase.
Configure Tailwind with the Vite plugin.
Create this folder structure inside src/:
  components/screens/
  components/ui/
  logic/
  firebase/
  context/
Leave all files empty except main.jsx and App.jsx which should render "Crisis.exe loading...".
```

---

**Phase 1 — City data**
```
Create src/logic/cityData.js.
Export a default array of 6 city objects, each with:
  name, difficulty ("easy"/"medium"/"hard"), multiplier (1.0/1.2/1.5),
  quirk (a funny one-liner about the city), quirkEffect (an object describing the gameplay modifier).
Cities: Mumbai (hard, floods 40% harder), Delhi (hard, heatwaves drain medical twice),
Chennai (medium, engineers 20% slower), Hyderabad (medium, traffic slows rescue 25%),
Bengaluru (medium, everything slows 30%), Kolkata (easy, minor debuff only).
```

---

**Phase 1 — Disaster data**
```
Create src/logic/disasterData.js.
Export a default array of 9 disaster objects, each with:
  id, name, emoji, primaryResource, secondaryResource,
  baseCost (object with resource keys and point costs to resolve perfectly),
  difficultyWeight (1–3), warning (a vague funny IMD-style alert string).
Disasters: flood, wildfire, heatwave, cyclone, building collapse,
disease outbreak, power outage, infrastructure failure, pollution emergency.
```

---

**Phase 1 — Score calculator**
```
Create src/logic/scoreCalc.js.
Export a function calcScore({ cityHealth, resources, disastersDefeated, city }).
Formula:
  base = cityHealth
  efficiency = (resources.rescue + resources.medical + resources.food + resources.engineers) * 0.3
  disasterBonus = sum of difficultyWeight of each disaster in disastersDefeated
  final = Math.round((base + efficiency + disasterBonus) * city.multiplier)
Return final.
```

---

**Phase 2 — AllocationScreen**
```
Create src/components/screens/AllocationScreen.jsx.
It reads disasters (this round), resources (current totals) from useGameContext().
Render 4 sliders (rescue, medical, food, engineers), each 0 to current resource total.
Show a running total of resources being allocated vs available.
A DEPLOY button dispatches ALLOCATE with the chosen values and navigates to OutcomeScreen.
Use Tailwind for layout. No Framer Motion yet.
```

---

**Phase 3 — GameContext**
```
Create src/context/GameContext.jsx.
Use React.createContext and useReducer.
State: { nickname, city, round, disasters, resources: {rescue,medical,food,engineers}, cityHealth, score, gameOver }
Actions: SET_NICKNAME, ASSIGN_CITY, DRAW_DISASTERS, ALLOCATE, NEXT_ROUND, CALC_SCORE, RESET.
For ALLOCATE: subtract allocated resources, compute health damage for under-resourced disasters
  (damage = (required - allocated) / required * 20 per disaster), clamp health to 0.
Export GameProvider (wraps children) and useGameContext hook.
```

---

**Phase 3 — Firebase leaderboard**
```
Create src/firebase/config.js reading Firebase config from Vite env vars (VITE_FB_*).
Create src/firebase/leaderboard.js with two exported async functions:
  submitScore({ nickname, score, city, survived }) — push to Firebase path "scores/"
  getTopScores(limit = 10) — read all scores, sort by score descending, return top limit entries
Use the Firebase Realtime Database SDK (not Firestore).
```

---

**Phase 5 — Framer Motion animations**
```
I have an existing OutcomeScreen at [PASTE FILE HERE].
Add Framer Motion animations:
  1. The screen fades in on mount (opacity 0 → 1, 0.4s)
  2. If any disaster was badly handled (resolved < 50%), trigger a screen shake
     (motion.div with x: [0, -10, 10, -10, 0], duration 0.3s, on component mount)
  3. The city health bar animates from its previous value to the new value over 1s
Do not change any existing logic or Tailwind classes.
```

---

**Phase 5 — Fake warning toasts**
```
Create src/components/ui/FakeWarningToast.jsx.
On mount, start a setInterval with a random delay between 25000ms and 45000ms.
Each tick: pick a random string from src/logic/fakeWarnings.js.
Fire a react-hot-toast with custom style:
  background dark, border-left 4px solid red, font-family monospace,
  prefix the message with "⚠ SYSTEM ALERT: ".
Auto-dismiss after 4000ms.
Clear the interval on unmount.
This component has no visible output — it just fires toasts.
```
