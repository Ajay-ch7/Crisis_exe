# 🚨 CRISIS.EXE — Tactical Disaster Response Command

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-RTDB-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

An atmospheric, browser-based disaster management and resource allocation simulation. Operators step into an emergency command terminal, confronting unpredictable multi-vector crises across Indian metropolitan sectors under tight DEFCON time pressure.

---

## ⚡ Overview

In **Crisis.exe**, you serve as the chief disaster response commander for a high-density urban sector (Mumbai, Delhi, Chennai, Bengaluru, Hyderabad, or Kolkata). Across **three escalating rounds**, you must analyze satellite telemetry, anticipate cascading threats, and distribute your emergency reserves across four operational branches:

- ⚡ **NDRF Rescue Task Force** (Boats, choppers, divers)
- ✚ **Medical Corps** (Field ICUs, mobile trauma units, vaccination teams)
- 💧 **Food & Potable Water** (Clean hydration, ration distribution kits)
- 🏗️ **Structural Engineers** (Shoring, power grid restoration, levee reinforcement)

Maintain city integrity above 0%, maximize resource efficiency, and secure your place on the **Global Telemetry Hall of Fame**.

---

## ✨ Key Features

- **Cyber-Tactical HUD Interface:** Styled with high-contrast orbital telemetry aesthetics, radar sweeps, DEFCON status tickers, scanlines, and audio-visual cues built on custom Tailwind 4 + Framer Motion.
- **Dynamic Sector Assignments:** Procedural city allocation with tailored multipliers, historical risk profiles, and localized quirk debuffs (e.g., Mumbai monsoons hit 40% harder).
- **Escalating 3-Round Simulation:**
  - **Round 1 (DEFCON 3):** Single incident vector reconnaissance.
  - **Round 2 (DEFCON 2):** Dual concurrent disaster surge.
  - **Round 3 (DEFCON 1):** Multi-point catastrophic crisis.
- **Atmospheric Emergency Broadcasts:** Periodic in-game alert toasts reflecting real-time urban telemetry and comedic system warnings.
- **Dual Telemetry Modes (Online & Offline):**
  - **Online Mode:** Synchronizes scores with Firebase Realtime Database for competitive event leaderboards.
  - **Offline/Demo Mode:** Zero setup required out-of-the-box — automatically falls back to local storage and offline operator telemetry without crashing.
- **Resilient Architecture:** Integrated error boundary, type-safe state transitions via React Context reducer, and fully linted code.

---

## 🏗️ Project Architecture & Structure

```
Crisis_exe/
├── docs/
│   ├── DEPLOYMENT.md          # Multi-platform deployment guide (Vercel, Netlify, Firebase)
│   ├── DESIGN_SYSTEM.md       # Color palettes, typography tokens, and HUD specifications
│   └── IMPLEMENTATION.md      # Architecture breakdown and design specifications
├── public/
│   ├── favicon.svg            # Command terminal favicon
│   └── icons.svg              # HUD icon sprite definitions
├── src/
│   ├── assets/                # Static visual media
│   ├── components/
│   │   ├── screens/           # Game state screens
│   │   │   ├── SplashScreen.jsx       # Callsign authorization & terminal boot
│   │   │   ├── CityRevealScreen.jsx   # Sector telemetry & risk briefing
│   │   │   ├── WarningScreen.jsx      # Priority alert triage
│   │   │   ├── AllocationScreen.jsx   # Tactical map & resource sliders
│   │   │   ├── OutcomeScreen.jsx      # Round aftermath & damage calculation
│   │   │   ├── FinalScoreScreen.jsx   # Mission debrief & score animation
│   │   │   └── LeaderboardScreen.jsx  # Global / local operator rankings
│   │   └── ui/                # Core reusable HUD components
│   │       ├── ErrorBoundary.jsx      # Crash recovery screen
│   │       ├── FakeWarningToast.jsx   # Ambient toast notifications
│   │       └── HudHeader.jsx          # DEFCON status bar with live UTC clock
│   ├── context/
│   │   └── GameContext.jsx    # Centralized state management & game logic reducer
│   ├── firebase/
│   │   ├── config.js          # Resilient Firebase client initialization
│   │   └── leaderboard.js     # Dual-mode score submission & retrieval
│   ├── logic/
│   │   ├── cityData.js        # Sector quirks, population, and multipliers
│   │   ├── disasterData.js    # Disaster database, costs, and difficulty weights
│   │   ├── fakeWarnings.js    # Ambient warning ticker messages
│   │   ├── randomiser.js      # Deterministic seed & round generator
│   │   └── scoreCalc.js       # Scoring formulas & efficiency calculations
│   ├── App.jsx                # Screen router & provider wrapper
│   ├── index.css              # Stitch HUD design tokens, animations & Tailwind 4 setup
│   └── main.jsx               # Application mount point
├── .env.example               # Environment variables template
├── .gitignore                 # GitHub-ready ignore patterns
├── .oxlintrc.json             # Linter configuration
├── index.html                 # HTML shell with Google Fonts
├── package.json               # Dependencies and scripts
└── vite.config.js             # Vite configuration with Tailwind CSS plugin
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher (or `pnpm` / `yarn`)

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/your-username/crisis-exe.git
cd crisis-exe

# Install dependencies
npm install
```

### 2. Environment Configuration (Optional)

The game **runs fully offline without any configuration**. If you want to enable the live global Firebase leaderboard:

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
2. Populate `.env` with your Firebase credentials:
   ```env
   VITE_FB_API_KEY=your_firebase_api_key
   VITE_FB_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FB_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com/
   VITE_FB_PROJECT_ID=your_project_id
   ```

> **Security Note:** Never commit `.env` to version control. The repository's `.gitignore` automatically prevents local environment files from being tracked.

### 3. Firebase Database Rules (For Live Leaderboard)

When hosting for a competition or event, configure your Firebase Realtime Database rules:

```json
{
  "rules": {
    "scores": {
      ".read": true,
      ".write": true,
      ".indexOn": ["score"]
    }
  }
}
```

---

## 💻 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Launch local Vite development server with HMR at `http://localhost:5173` |
| `npm run build` | Compile optimized production bundle to `dist/` |
| `npm run preview` | Locally preview production build |
| `npm run lint` | Run Oxlint fast static analysis |

---

## 🎯 Gameplay Mechanics

### 1. Sector Assignment
Players are deployed to one of 6 sectors:
- **Mumbai:** Hard difficulty (1.4x score multiplier) — Monsoons and floods inflict amplified damage.
- **Delhi:** Hard difficulty (1.4x score multiplier) — Vulnerable to extreme heatwaves and pollution spikes.
- **Chennai:** Medium difficulty (1.2x score multiplier) — Prone to coastal storm surges and cyclones.
- **Hyderabad:** Medium difficulty (1.2x score multiplier) — Urban flooding and flash inundation risks.
- **Bengaluru:** Easy difficulty (1.0x score multiplier) — Infrastructure failures and power disruptions.
- **Kolkata:** Easy difficulty (1.0x score multiplier) — Riverine floods and seasonal monsoon delays.

### 2. Resource Management
Each player begins with **100 units of city integrity** and **25 units** in each of the 4 emergency categories. Unused resources carry forward across rounds.

### 3. Damage & Allocation Logic
Disasters demand specific operational assets. If the deployed resources fall short of requirements:
$$\text{Shortfall Ratio} = \frac{\text{Required} - \text{Provided}}{\text{Required}}$$
$$\text{Damage} = \text{Shortfall Ratio} \times 20 \times \text{Sector Quirk Multiplier}$$

### 4. Scoring Formula
$$\text{Final Score} = (\text{Remaining Health} + \text{Resource Efficiency Bonus} + \text{Disaster Bonus}) \times \text{City Multiplier}$$

---

## 🚢 Deployment

Detailed deployment instructions for Vercel, Netlify, and Firebase Hosting are documented in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

For production deployment on Vercel:
```bash
npx vercel
```

---

## 🛡️ Code Quality & Security

- **Zero Hardcoded Secrets:** All external APIs authenticate through Vite environment variables.
- **Safe Offline Fallbacks:** Leaderboard calls gracefully degrade to client storage if Firebase is unreachable.
- **Strict Linting:** Zero warnings or errors via `oxlint`.
- **Deterministic Dependencies:** Maintained through an audited `package-lock.json`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
