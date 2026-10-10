---
name: Orbital Telemetry & Incident Command
colors:
  surface: '#0d141d'
  surface-dim: '#0d141d'
  surface-bright: '#333a44'
  surface-container-lowest: '#080f18'
  surface-container-low: '#151c26'
  surface-container: '#19202a'
  surface-container-high: '#242a34'
  surface-container-highest: '#2e353f'
  on-surface: '#dce3f0'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dce3f0'
  inverse-on-surface: '#2a313b'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ffd799'
  on-secondary: '#432c00'
  secondary-container: '#feb300'
  on-secondary-container: '#6a4800'
  tertiary: '#fff3f2'
  on-tertiary: '#68001a'
  tertiary-container: '#ffcdce'
  on-tertiary-container: '#bf0037'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffdeac'
  secondary-fixed-dim: '#ffba38'
  on-secondary-fixed: '#281900'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#ffdada'
  tertiary-fixed-dim: '#ffb3b6'
  on-tertiary-fixed: '#40000c'
  on-tertiary-fixed-variant: '#920028'
  background: '#0d141d'
  on-background: '#dce3f0'
  surface-variant: '#2e353f'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: 0em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0.02em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: 0.04em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.08em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 9px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-sm: 1rem
  margin-lg: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an ultra-precise, mission-critical operations aesthetic engineered for planetary disaster response, orbital surveillance, and tactical coordination. The interface merges military-grade functional density with speculative holographic glassmorphism. It positions operators not merely as software users, but as orbital command directors overseeing planetary biometrics, seismic ruptures, orbital trajectories, and emergency mitigation vectors.

The aesthetic fuses three core design disciplines:
- **Futuristic HUD & Holographic Glassmorphism:** Layered optical depth, polarized cyan illumination, high-transmission tinted backdrops, and luminous spatial vectors simulating multi-focal cockpit projection glass.
- **Instrument Precision Brutalism:** Extreme grid fidelity, hairline target markings, angular chamfers, dense data readouts, and strict information hierarchy stripped of ornamental consumer fluff.
- **Dynamic Chromatic Alert States:** High-contrast atmospheric luminous indicators designed for rapid threat tier comprehension against pitch-black situational fields.

Target audiences include disaster response directors, orbital mechanics engineers, orbital payload telemetry specialists, and frontline emergency command staff. The visual experience must evoke absolute technical certainty, unflinching clarity under existential crisis, and the calm mastery of high-orbit planetary defense operations.

## Colors

The palette is engineered exclusively for an absolute dark vacuum environment (`#050b14`), referencing low Earth orbit space conditions punctuated by atmospheric limb glow and radiant vector lines.

- **Primary Cyan (`#00f0ff`):** Nominal telemetry, orbital paths, sensor sweeps, primary actuators, active telemetry HUD rings, and confirmed planetary data links.
- **Secondary Amber (`#ffb300`):** Threat escalation, delta-v divergences, predictive geological failure thresholds, degraded satellite links, and advisory states.
- **Tertiary Emergency Red (`#ff2a55`):** Catastrophic rupture vectors, structural breach alerts, override confirmations, orbital decay warnings, and hard emergency locks.
- **Neutral Abyss (`#050b14`):** The spatial base canvas, fortified by deep oceanic navy tints (`#0a1526`, `#0f1f38`) to emulate deep exosphere space backlit by faint terrestrial light.

### Color Tokens & Environmental Roles
- **Surfaces & Backplates:** Surfaces exist as polarized translucent strata (`rgba(5, 11, 20, 0.72)` to `rgba(15, 31, 56, 0.65)`). They must preserve visibility into background starfield coordinates and layered geographical canvas projections.
- **Data Tints & Vectors:** Hairline telemetry rings, dynamic trajectory sweeps, and coordinates utilize primary cyan at stepped opacities (100% active, 40% passive baseline, 15% dormant spatial grids).
- **Alert States:** Amber and Red are reserved strictly for anomalous conditions; they never appear in neutral decoration to prevent situational desensitization.

## Typography

The typographic hierarchy pairs scientific modernism with unyielding instrument precision:

- **Display & Section Headers (`Space Grotesk`):** Delivers geometric authority with sharp structural cuts that echo industrial aeronautical consoles and orbital vector software.
- **Operational Body Text (`Geist`):** Engineered for ultra-high legibility across compressed tactical layouts and density-stacked sensor reports.
- **Telemetry Readouts & Tactical Labels (`JetBrains Mono`):** Dedicated to mission logs, azimuth coordinates, orbital epoch timers, status codes, and vector diagnostics.

### Typographic Guidelines
- All `label-*` roles must be set to `text-transform: uppercase` to reflect naval and aerospace standard operating procedures.
- Numbers within telemetry dashboards must enforce tabular lining figures (`font-variant-numeric: tabular-nums`) to prevent optical jitter during live real-time variable recalculations.
- Line heights are intentionally tighter than editorial layouts to preserve data density across auxiliary status ribbons.

## Layout & Spacing

Command consoles prioritize simultaneous situational awareness over paginated step flows. The architecture uses an adaptable multi-dock modular grid:

- **Desktop & Multi-Display Array (1440px+):** 12-column variable fluid grid framed by persistent tactical telemetry bars (top epoch bar, bottom asset status ribbon) and collateral diagnostic drawers (left orbital tracker, right triage action panel). Gutters are locked to `1.5rem` (`gutter-lg`) with outer canvas margins of `2.5rem` (`margin-lg`).
- **Tablet / Tactical Field Slate (768px - 1439px):** 8-column layout with collapsable auxiliary monitoring panels into dynamic bottom sheets. Gutters scale to `1rem` (`gutter`), outer margin locked to `1.5rem` (`margin`).
- **Mobile Handheld Relay (< 768px):** 4-column stack prioritizing the single highest-severity incident vector with swift horizontal tab swapping between orbital telemetry, incident feed, and actuator controls. Gutter scales to `0.75rem` (`gutter-sm`) and margin to `1rem` (`margin-sm`).

Spacing rhythms enforce geometric 4px/8px alignment units. Element buffers should remain tight (`space-xs` through `space-md`) to ensure critical diagnostics remain above the fold across all form factors.

## Elevation & Depth

Visual hierarchy does not rely on traditional dropped shadows; true vacuum space lacks diffuse light sources. Depth is conveyed exclusively through **polarized glass layers, luminous vector glows, and optical chromatic refraction**.

### Tier 0: Deep Void (Base Layer)
- Background color: `#050b14` overlaid with an astronomical coordinate grid (0.5px line, 8% cyan opacity) and procedural vector starfield points.
- Central Earth globe or topographical incident model rendered with a high-intensity cyan limb glow (`0 0 80px rgba(0, 240, 255, 0.25)`).

### Tier 1: Ground Telemetry HUD Panels (Base Containers)
- Translucent dark backplates: `background: rgba(5, 11, 20, 0.65)`.
- Optical filtration: `backdrop-filter: blur(16px) saturate(140%)`.
- Structural hair-borders: `1px solid rgba(0, 240, 255, 0.15)`.
- Corner bracket treatments: Hairline 4px angled corner accents on all functional viewports.

### Tier 2: Active Instruments & Focus Cards
- Elevated backplate: `background: rgba(10, 21, 38, 0.75)`.
- Borders: `1px solid rgba(0, 240, 255, 0.45)`.
- Internal ambient luminance: Subtle inner gradient radiating from the top edge (`linear-gradient(180deg, rgba(0, 240, 255, 0.08) 0%, transparent 40%)`).
- Focus vector illumination: `box-shadow: 0 0 20px rgba(0, 240, 255, 0.2), inset 0 0 12px rgba(0, 240, 255, 0.05)`.

### Tier 3: Critical Threat Modals & System Alerts
- Amber state: `border: 1px solid #ffb300`, `box-shadow: 0 0 30px rgba(255, 179, 0, 0.35)`.
- Red breach state: `border: 1px solid #ff2a55`, `box-shadow: 0 0 40px rgba(255, 42, 85, 0.45)`, accompanied by a rhythmic 1.2s pulse cycle on border luminosity.

## Shapes

The design system adopts a crisp, military-technical geometric profile with a `roundedness` value of `1` (subtle 0.25rem corner curves) combined with angular technical cuts. Excessive roundedness creates an informal, consumer-app tone that undermines tactical operational urgency.

- **Standard Containers & Modals:** `0.25rem` corner radius with optional 45-degree chamfered upper-right corners (cut-corner polygon accents).
- **HUD Reticles & Orbital Indicators:** Pure concentric circles (`border-radius: 50%`) interrupted by dashed quadrant gaps, radial degree ticks, and concentric azimuth rings.
- **Badges & Status Anchors:** Sharp or micro-radius (`0.25rem`) badges featuring technical border notches and bracketed framing glyphs (`[ OK ]`, `[ EVAC ]`).
- **Telemetry Dividers:** 1px hairline paths terminating in miniature diamond or 45-degree crosshairs.

## Components

### 1. Actuators & Buttons
- **Primary Telemetry Actuator:** Solid dark cyan background (`rgba(0, 240, 255, 0.12)`) bounded by a `1px solid #00f0ff` border. Typography is `JetBrains Mono` uppercase with `0.08em` tracking. Hover initiates an intense inner glow (`box-shadow: 0 0 16px rgba(0, 240, 255, 0.4)`) and border flash.
- **Emergency / Override Button:** Tertiary red tinted glass (`rgba(255, 42, 85, 0.15)`) with an outer border of `#ff2a55`. Requires a double-press confirmation or slide-lock vector track to engage.
- **Ghost / Tool Buttons:** Transparent surface with `rgba(0, 240, 255, 0.25)` borders, glowing solid `#00f0ff` on interaction.

### 2. Holographic HUD Reticles
- Circular multi-ring telemetry gauges displaying target coordinate locks, atmospheric pressure indices, and satellite coverage cones.
- Rings incorporate subtle CSS keyframe rotation for continuous radar sweeps, tick marks at 30-degree increments, and cardinal tracking labels (`N`, `E`, `S`, `W`).

### 3. Status Chips & Telemetry Tags
- Compact monospace markers framed by micro-brackets.
- **Nominal:** Cyan border, cyan glyph, transparent backplate.
- **Warning:** Amber border (`#ffb300`), amber pulsing indicator dot, faint amber background tint (`rgba(255, 179, 0, 0.08)`).
- **Critical Failure:** Red border (`#ff2a55`), red strobing beacon glyph, red fill (`rgba(255, 42, 85, 0.12)`).

### 4. Interactive Data Feeds & Log Lists
- Striped with hairline dividers (`rgba(0, 240, 255, 0.08)`).
- Time-stamped using UTC epoch in `JetBrains Mono`.
- Active row selection illuminates the left margin with an aggressive 3px cyan indicator bar and triggers a subtle horizontal vector scanline highlight.

### 5. Tactical Form Inputs & Steppers
- Inputs feature sunken dark glass backplates (`rgba(0, 5, 12, 0.8)`) with recessed top inner shadows.
- Active focus displays an unbroken `#00f0ff` baseline and crosshair reticles at the input box extremities.
- Placeholder text is formatted in low-opacity monospace uppercase (`rgba(0, 240, 255, 0.4)`).

### 6. Checkboxes & Binary Toggle Switches
- Checkboxes are small angular diamonds or hard squares with corner ticks. Checked state activates an illuminated cyan crosshair.
- Toggles utilize an aerospace bus architecture: mechanical-styled sliding brackets showing discrete binary states (`ENGAGED / DISENGAGED`) with luminous LED status dots.

### 7. Glassmorphism HUD Telemetry Cards
- Core modular framing unit for maps, seismographs, satellite arrays, and triage rosters.
- Header bar features dedicated coordinate meta-stamps (`LAT / LONG / ALT`), real-time ping monitors, and minimize/detach controls.
- Card borders have micro-recessed corner brackets that simulate optical instrument glass mountings.