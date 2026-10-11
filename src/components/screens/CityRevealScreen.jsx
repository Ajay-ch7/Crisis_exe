import { useEffect } from 'react';
import { useGameContext } from '../../context/GameContext';
import { motion } from 'framer-motion';
import HudHeader from '../ui/HudHeader';

const CITY_COORDS = {
  Mumbai:    { coords: '19.0760° N, 72.8777° E', pop: '20.6M', risk: 'LEVEL-4 DELUGE EMERGENCY' },
  Delhi:     { coords: '28.7041° N, 77.1025° E', pop: '32.9M', risk: 'LEVEL-5 HEATWAVE CRISIS' },
  Chennai:   { coords: '13.0827° N, 80.2707° E', pop: '7.1M',  risk: 'LEVEL-3 CYCLONE ALERT' },
  Hyderabad: { coords: '17.3850° N, 78.4867° E', pop: '10.0M', risk: 'LEVEL-3 FLOOD SURGE' },
  Bengaluru: { coords: '12.9716° N, 77.5946° E', pop: '13.2M', risk: 'LEVEL-2 INFRASTRUCTURE FAIL' },
  Kolkata:   { coords: '22.5726° N, 88.3639° E', pop: '14.8M', risk: 'LEVEL-2 MONSOON ALERT' },
};

const DIFFICULTY_CONFIG = {
  hard:   { color: '#ff2a55', label: 'HIGH THREAT',   bg: 'rgba(255,42,85,0.12)',   border: 'rgba(255,42,85,0.6)' },
  medium: { color: '#ffaa00', label: 'MODERATE RISK', bg: 'rgba(255,170,0,0.10)',   border: 'rgba(255,170,0,0.6)' },
  easy:   { color: '#00ff88', label: 'CONTAINED',     bg: 'rgba(0,255,136,0.08)',   border: 'rgba(0,255,136,0.55)' },
};

export default function CityRevealScreen({ onNext }) {
  const { state, dispatch } = useGameContext();

  useEffect(() => {
    if (!state.city) {
      dispatch({ type: 'ASSIGN_CITY' });
    }
  }, [dispatch, state.city]);

  const { city } = state;

  if (!city) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="font-mono text-cyan-400 animate-pulse text-lg tracking-widest">
          INITIALIZING SECTOR LOCK...
        </div>
      </div>
    );
  }

  const meta    = CITY_COORDS[city.name] || { coords: '19.0760° N, 72.8777° E', pop: '20.6M', risk: 'LEVEL-4 DELUGE EMERGENCY' };
  const diffCfg = DIFFICULTY_CONFIG[city.difficulty] || DIFFICULTY_CONFIG.easy;

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden">
      <HudHeader />

      <main className="relative flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-[calc(100vh-38px)]">
        {/* Target Lock Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Scan progress bar */}
          <div className="mb-4 font-mono text-[10px] text-cyan-400/80 tracking-widest text-center">
            <span className="animate-pulse">[ TARGET LOCK CONFIRMED // SECTOR 81 ]</span>
          </div>

          <div className="tactical-panel tactical-clip corner-brackets p-6 md:p-8 rounded bg-black/75 backdrop-blur-md border border-cyan-400/35 shadow-[0_0_40px_rgba(0,240,255,0.2)]">
            {/* Zone header */}
            <div className="text-center mb-4">
              <div className="font-mono text-[11px] text-cyan-400/70 tracking-widest uppercase mb-1">
                ZONE: INDIA // SECTOR 81
              </div>
              <motion.h1
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-black uppercase text-white text-glow-cyan tracking-wider"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {city.name}
              </motion.h1>
              <div className="mt-2">
                <span
                  className="inline-block px-3 py-1 text-[11px] font-mono uppercase font-bold rounded-sm border"
                  style={{
                    backgroundColor: diffCfg.bg,
                    borderColor: diffCfg.border,
                    color: diffCfg.color,
                    textShadow: `0 0 6px ${diffCfg.color}`,
                  }}
                >
                  {meta.risk}
                </span>
              </div>
            </div>

            {/* Telemetry grid */}
            <div className="bg-black/60 border border-cyan-400/20 rounded p-3 font-mono text-xs space-y-2 mb-4">
              {[
                { label: 'COORDINATES', val: meta.coords, color: '#00f0ff' },
                { label: 'POP AT RISK',  val: meta.pop,    color: '#ffffff' },
                { label: 'DIFFICULTY',   val: diffCfg.label, color: diffCfg.color },
                { label: 'MULTIPLIER',   val: `×${city.multiplier}`, color: '#ffaa00' },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-slate-400">{label}:</span>
                  <span style={{ color }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Quirk */}
            <div className="border-l-2 border-amber-400/70 pl-3 mb-6">
              <div className="text-[10px] font-mono text-amber-400/70 tracking-widest uppercase mb-1">TACTICAL QUIRK</div>
              <p className="text-sm text-slate-300 italic leading-relaxed">"{city.quirk}"</p>
            </div>

            {/* CTA */}
            <button
              id="btn-confirm-city"
              onClick={onNext}
              className="tactical-btn w-full py-4 text-base font-black tracking-widest flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <span className="group-hover:tracking-[0.2em] transition-all duration-300">
                ENGAGE SECTOR DISPATCH
              </span>
              <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </button>
          </div>

          {/* Scan calibration bar */}
          <div className="mt-4 text-center">
            <p className="text-[10px] font-mono text-cyan-400/60 tracking-widest mb-1">
              CALIBRATING ORBITAL DRONE RELAYS & EMERGENCY COMM FREQUENCIES...
            </p>
            <div className="w-64 h-1 bg-slate-800 rounded-full mx-auto overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }}
              />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
