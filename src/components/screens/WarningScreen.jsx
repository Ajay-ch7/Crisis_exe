import { useEffect } from 'react';
import { useGameContext } from '../../context/GameContext';
import { motion } from 'framer-motion';
import HudHeader from '../ui/HudHeader';

const SEVERITY_CONFIG = {
  flood:               { color: '#38bdf8', glow: 'rgba(56,189,248,0.4)',  sev: 'CRITICAL',   icon: '🌊', priority: 1 },
  wildfire:            { color: '#ff2a55', glow: 'rgba(255,42,85,0.4)',   sev: 'CRITICAL',   icon: '🔥', priority: 1 },
  heatwave:            { color: '#ffaa00', glow: 'rgba(255,170,0,0.35)',  sev: 'SEVERE',     icon: '☀️', priority: 2 },
  cyclone:             { color: '#ff2a55', glow: 'rgba(255,42,85,0.4)',   sev: 'CRITICAL',   icon: '🌀', priority: 1 },
  building_collapse:   { color: '#ff2a55', glow: 'rgba(255,42,85,0.4)',   sev: 'CRITICAL',   icon: '🏢', priority: 1 },
  disease_outbreak:    { color: '#ffaa00', glow: 'rgba(255,170,0,0.35)',  sev: 'SEVERE',     icon: '🦠', priority: 2 },
  power_outage:        { color: '#ffd700', glow: 'rgba(255,215,0,0.35)',  sev: 'HIGH',       icon: '⚡', priority: 3 },
  infrastructure_failure: { color: '#ffaa00', glow: 'rgba(255,170,0,0.3)', sev: 'SEVERE', icon: '🚧', priority: 2 },
  pollution_emergency: { color: '#a855f7', glow: 'rgba(168,85,247,0.35)', sev: 'HIGH',      icon: '😷', priority: 3 },
};

function AlertCard({ disaster, index }) {
  const cfg = SEVERITY_CONFIG[disaster.id] || { color: '#ffaa00', glow: 'rgba(255,170,0,0.3)', sev: 'ALERT', icon: '⚠️', priority: 2 };
  const isRed = cfg.priority === 1;

  return (
    <motion.article
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 + 0.3, type: 'spring', stiffness: 100 }}
      className="relative rounded overflow-hidden cursor-default"
      style={{
        background: `rgba(5,15,29,0.9)`,
        border: `1px solid ${cfg.color}40`,
        boxShadow: isRed ? `0 0 20px ${cfg.glow}` : `0 0 10px ${cfg.glow}`,
      }}
    >
      {/* Severity left bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: cfg.color }} />

      <div className="pl-4 pr-4 py-3.5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{cfg.icon}</span>
            <span
              className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-sm border"
              style={{ color: cfg.color, borderColor: `${cfg.color}60`, background: `${cfg.color}14` }}
            >
              {cfg.sev} // PRIORITY {cfg.priority}
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-400">
            SEV: {90 - (cfg.priority - 1) * 15}/100
          </span>
        </div>

        {/* Disaster name */}
        <h3
          className="text-base font-bold mb-1 uppercase tracking-wider"
          style={{ fontFamily: 'Chakra Petch, sans-serif', color: cfg.color }}
        >
          {disaster.name} DETECTED
        </h3>

        {/* Warning message */}
        <p className="text-xs text-slate-300 leading-relaxed mb-2">
          {disaster.warning}
        </p>

        {/* Resource requirements */}
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(disaster.baseCost).map(([res, amt]) => (
            <span
              key={res}
              className="font-mono text-[10px] px-2 py-0.5 rounded-sm border border-cyan-400/30 text-cyan-400 bg-cyan-400/5"
            >
              {res.toUpperCase()}: {amt} AP
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function WarningScreen({ onNext }) {
  const { state, dispatch } = useGameContext();

  useEffect(() => {
    dispatch({ type: 'DRAW_DISASTERS' });
  }, [dispatch, state.round]);

  const { disasters, round, city } = state;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="screen-wrapper flex flex-col"
    >
      <HudHeader round={round} city={city?.name} />

      <main className="flex-1 flex flex-col p-4 md:p-6 min-h-[calc(100vh-38px)]">

        {/* Dashboard header HUD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="tactical-panel tactical-clip mb-5 p-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 rounded-sm" style={{ background: '#ff2a55', boxShadow: '0 0 10px #ff2a55' }} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-red-400 tracking-wider">SYSTEM ALERT //</span>
                <span
                  className="text-lg md:text-2xl font-black uppercase tracking-wide text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  ROUND {round}/3
                </span>
                <span className="bg-red-400/20 border border-red-400 text-red-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded animate-pulse">
                  ACTIVE THREAT
                </span>
              </div>
              <p className="text-xs font-mono text-slate-300 mt-0.5">
                TACTICAL SECTOR: {city?.name?.toUpperCase() || 'UNKNOWN'} // INCOMING DISASTERS DETECTED
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 font-mono text-xs">
            <div className="border-l border-slate-700 pl-3">
              <span className="text-slate-400 block text-[10px]">THREATS DETECTED:</span>
              <span className="text-lg font-bold text-red-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {disasters.length}
              </span>
            </div>
            <div className="border-l border-slate-700 pl-3">
              <span className="text-slate-400 block text-[10px]">STATUS:</span>
              <span className="text-lg font-bold text-amber-400 animate-pulse" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                CODE RED
              </span>
            </div>
          </div>
        </motion.div>

        {/* Alerts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 flex-1">
          {disasters.map((d, i) => (
            <AlertCard key={d.id} disaster={d} index={i} />
          ))}
        </div>

        {/* City Health briefing */}
        {city && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="tactical-panel p-3 mb-5 flex items-center gap-3 rounded"
          >
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
            <p className="text-xs font-mono text-slate-300">
              <span className="text-amber-400 font-bold">TACTICAL QUIRK ACTIVE:</span>{' '}
              {city.quirk}
            </p>
          </motion.div>
        )}

        {/* Proceed CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-end"
        >
          <button
            id="btn-proceed-allocation"
            onClick={onNext}
            className="tactical-btn px-8 py-3 text-sm font-black tracking-widest flex items-center gap-3"
          >
            <span>PROCEED TO ALLOCATION</span>
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>
        </motion.div>
      </main>
    </motion.div>
  );
}
