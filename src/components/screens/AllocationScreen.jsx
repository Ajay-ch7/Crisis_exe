import { useState } from 'react';
import { useGameContext } from '../../context/GameContext';
import { motion } from 'framer-motion';
import HudHeader from '../ui/HudHeader';

const RESOURCE_CONFIG = {
  rescue: {
    label: 'RESCUE TASK FORCE',
    sub: 'NDRF Boats, Choppers, Divers',
    icon: '⚡',
    sliderClass: 'slider-amber',
    accentColor: '#ffaa00',
    accentBg: 'rgba(255,170,0,0.08)',
  },
  medical: {
    label: 'MEDICAL CORPS',
    sub: 'Field ICUs, Vaccines, Trauma Units',
    icon: '✚',
    sliderClass: 'slider-alert',
    accentColor: '#ff2a55',
    accentBg: 'rgba(255,42,85,0.06)',
  },
  food: {
    label: 'FOOD & WATER',
    sub: 'Rations, Potable Water Kits',
    icon: '💧',
    sliderClass: '',
    accentColor: '#00f0ff',
    accentBg: 'rgba(0,240,255,0.06)',
  },
  engineers: {
    label: 'STRUCTURAL ENGINEERS',
    sub: 'Repair, Shoring, Power Restore',
    icon: '🏗️',
    sliderClass: 'slider-success',
    accentColor: '#00ff88',
    accentBg: 'rgba(0,255,136,0.06)',
  },
};

function TacticalMapSVG({ disasters, cityName }) {
  return (
    <div className="relative flex-1 bg-black/30 overflow-hidden flex items-center justify-center min-h-[260px]">
      {/* Radar sweep */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full border border-cyan-400/8 relative overflow-hidden">
          <div className="w-full h-full origin-center animate-[radar_4s_linear_infinite] rounded-full"
            style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0,240,255,0.12) 30deg, transparent 30deg)' }}
          />
        </div>
      </div>

      {/* City map SVG */}
      <svg className="absolute inset-0 w-full h-full select-none" preserveAspectRatio="none" viewBox="0 0 800 500">
        <defs>
          <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,240,255,0.07)" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
        {/* Waterway */}
        <path d="M 0,160 Q 220,190 340,300 T 800,320 L 800,500 L 0,500 Z" fill="rgba(0,70,120,0.18)" stroke="rgba(0,200,255,0.35)" strokeWidth="1.2" />
        <path d="M 320,0 Q 360,140 400,260 T 430,500" fill="none" stroke="rgba(0,180,255,0.3)" strokeLinecap="round" strokeWidth="4" />
        {/* Roads */}
        <g fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
          <line x1="80" y1="0" x2="720" y2="500" />
          <line x1="120" y1="480" x2="680" y2="40" />
          <line strokeDasharray="6,4" x1="0" y1="250" x2="800" y2="250" />
          <circle cx="400" cy="250" r="130" stroke="rgba(0,240,255,0.12)" strokeDasharray="4,8" />
        </g>
        {/* Evac routes */}
        <g fill="none" stroke="#38bdf8" strokeDasharray="8,5" strokeWidth="2">
          <path d="M 400,250 L 700,100" />
          <path d="M 400,250 L 150,80" />
          <path d="M 400,250 L 680,420" />
        </g>
        {/* HQ base */}
        <rect x="60" y="380" width="40" height="24" fill="rgba(0,255,136,0.15)" stroke="#00ff88" strokeWidth="1" rx="1" />
        <text x="80" y="396" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="monospace">HQ</text>
      </svg>

      {/* Disaster incident pins */}
      {(disasters || []).map((d, i) => {
        const positions = [
          { top: '38%', left: '28%' },
          { top: '28%', left: '62%' },
          { top: '68%', left: '52%' },
        ];
        const pos = positions[i % positions.length];
        const isRed = ['flood','wildfire','cyclone','building_collapse'].includes(d.id);
        const pinColor = isRed ? '#ff2a55' : '#ffaa00';

        return (
          <div
            key={d.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            style={{ top: pos.top, left: pos.left }}
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-60" style={{ background: pinColor }} />
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold shadow-lg group-hover:scale-125 transition-transform"
                style={{ background: '#0a1525', border: `2px solid ${pinColor}`, color: pinColor, boxShadow: `0 0 12px ${pinColor}70` }}
              >
                {d.emoji}
              </div>
            </div>
            <div
              className="absolute left-8 top-0 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono text-slate-200 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(4,14,29,0.95)', border: `1px solid ${pinColor}60` }}
            >
              {d.name.toUpperCase()}
            </div>
          </div>
        );
      })}

      {/* City label */}
      <div className="absolute bottom-3 left-3 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
        SECTOR: {cityName?.toUpperCase() || 'UNKNOWN'} // GRID RADAR ACTIVE
      </div>
    </div>
  );
}

export default function AllocationScreen({ onNext }) {
  const { state, dispatch } = useGameContext();
  const { disasters, resources, round, city } = state;

  const [allocations, setAllocations] = useState({
    rescue: 0,
    medical: 0,
    food: 0,
    engineers: 0,
  });

  const handleSliderChange = (resource, value) => {
    setAllocations(prev => ({ ...prev, [resource]: parseInt(value, 10) }));
  };

  const handleDeploy = () => {
    dispatch({ type: 'ALLOCATE', payload: allocations });
    onNext();
  };

  const getRequiredTotal = (resourceType) => {
    let total = 0;
    (disasters || []).forEach(d => { if (d.baseCost && d.baseCost[resourceType]) total += d.baseCost[resourceType]; });
    return total;
  };

  const totalBudget = Object.values(resources || {}).reduce((a, b) => a + b, 0);
  const allocated   = Object.values(allocations || {}).reduce((a, b) => a + b, 0);
  const remaining   = totalBudget - allocated;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="screen-wrapper flex flex-col"
    >
      <HudHeader round={round} city={city?.name} />

      <main className="flex-1 flex flex-col p-3 md:p-5 gap-4 min-h-[calc(100vh-38px)]">

        {/* Top Command HUD */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="tactical-panel tactical-clip p-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 rounded-sm bg-cyan-400" style={{ boxShadow: '0 0 10px #00f0ff' }} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-cyan-400 tracking-wider">TACTICAL SECTOR:</span>
                <span className="text-xl font-black uppercase text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {city?.name || 'UNKNOWN'}
                </span>
                <span className="bg-cyan-400/15 border border-cyan-400 text-cyan-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  ROUND {round} OF 3
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">RESOURCE DISPATCH CONTROLS // ALLOCATE ACTION POINTS</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <div className="border-l border-slate-700 pl-3">
              <span className="text-slate-400 block text-[10px]">BUDGET POOL:</span>
              <span className="text-lg font-bold text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {remaining} / {totalBudget} AP
              </span>
            </div>
            <div className="border-l border-slate-700 pl-3">
              <span className="text-slate-400 block text-[10px]">ALLOCATED:</span>
              <span className="text-lg font-bold text-amber-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {allocated} AP
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">

          {/* LEFT: Tactical Map (7 cols) */}
          <div className="lg:col-span-7 tactical-panel rounded flex flex-col relative overflow-hidden">
            {/* Map toolbar */}
            <div className="p-2.5 border-b border-cyan-400/15 bg-[#051122]/80 flex items-center justify-between text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">GRID RADAR // THREAT LAYER:</span>
                <span className="px-2 py-0.5 bg-red-400/15 border border-red-400 text-red-400 rounded text-[9px]">HAZARDS [ON]</span>
                <span className="px-2 py-0.5 bg-emerald-400/15 border border-emerald-400 text-emerald-400 rounded text-[9px]">ASSETS [ON]</span>
              </div>
              <span className="text-slate-500">FREQ: 142.9 MHz</span>
            </div>

            {/* Map */}
            <TacticalMapSVG disasters={disasters} cityName={city?.name} />

            {/* Incident detail panel */}
            <div className="p-3 border-t border-cyan-400/15 bg-[#030a17]/95 font-mono text-xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-red-400/15 text-red-400 border border-red-400/50 rounded text-[10px] font-bold">
                  ACTIVE THREATS
                </span>
                <div>
                  <span className="font-bold text-white tracking-wide">
                    {disasters.map(d => d.name).join(' + ')}
                  </span>
                  <p className="text-slate-400 text-[10px] mt-0.5">Prioritize resource allocation to minimize city damage</p>
                </div>
              </div>
              <div className="text-[10px] text-slate-400">
                URGENT: <strong className="text-cyan-400">
                  {(disasters || []).map(d => Object.keys(d.baseCost || {}).map(k => k.toUpperCase()).join(' + ')).join(' | ')}
                </strong>
              </div>
            </div>
          </div>

          {/* RIGHT: Resource Allocation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Scenario card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="tactical-panel tactical-clip p-4 rounded"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">TACTICAL SITUATION</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-400/15 text-amber-400 border border-amber-400/50 rounded">
                  STAGE {round}: ACTIVE
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1 uppercase" style={{ fontFamily: 'Chakra Petch, sans-serif' }}>
                ACTIVE THREATS: {disasters.map(d => d.name).join(' & ')}
              </h3>
              <div className="space-y-2 mt-3">
                {disasters.map((d) => (
                  <div key={d.id} className="flex items-center gap-3 bg-black/30 px-3 py-2 rounded border border-slate-800">
                    <span className="text-xl">{d.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs text-white uppercase truncate">{d.name}</p>
                      <p className="text-[10px] font-mono text-slate-400 truncate">
                        NEEDS: {Object.entries(d.baseCost).map(([k, v]) => `${v} ${k.toUpperCase()}`).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Sliders */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="tactical-panel-elevated p-4 rounded flex-1 flex flex-col"
            >
              <div className="flex justify-between items-center pb-2 border-b border-cyan-400/15 mb-4">
                <span className="font-bold text-sm text-white flex items-center gap-2" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                  RESOURCE DISPATCH
                </span>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">REMAINING</span>
                  <span className="text-sm font-mono font-bold text-cyan-400">{remaining} / {totalBudget} AP</span>
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                {Object.keys(resources || {}).map((resourceType, idx) => {
                  const cfg = RESOURCE_CONFIG[resourceType] || {
                    label: resourceType.toUpperCase(),
                    sub: 'Emergency Units',
                    icon: '⚙️',
                    sliderClass: '',
                    accentColor: '#00f0ff',
                    accentBg: 'rgba(0,240,255,0.06)'
                  };
                  const req = getRequiredTotal(resourceType);
                  const allocated = allocations[resourceType] || 0;
                  const available = (resources && resources[resourceType]) ?? 0;
                  const meetsReq = allocated >= req;

                  return (
                    <motion.div
                      key={resourceType}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.07 }}
                      className="p-2.5 rounded border"
                      style={{ background: cfg.accentBg, borderColor: `${cfg.accentColor}25` }}
                    >
                      <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                        <span className="font-bold flex items-center gap-1.5 text-slate-200">
                          <span>{cfg.icon}</span>
                          {cfg.label}
                        </span>
                        <span className="font-bold" style={{ color: cfg.accentColor }}>
                          {allocated} / {available} AP
                        </span>
                      </div>

                      <input
                        id={`slider-${resourceType}`}
                        type="range"
                        min="0"
                        max={available}
                        value={allocated}
                        onChange={(e) => handleSliderChange(resourceType, e.target.value)}
                        className={`w-full transition-all duration-300 ${cfg.sliderClass}`}
                      />

                      <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                        <span>{cfg.sub}</span>
                        <span className={meetsReq && req > 0 ? 'text-emerald-400' : req > 0 ? 'text-amber-400' : ''}>
                          {req > 0 ? `EST. NEED: ${req}${meetsReq ? ' ✓' : ''}` : 'NO DEMAND'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Deploy button */}
              <motion.button
                id="btn-deploy-resources"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleDeploy}
                className="tactical-btn w-full py-4 text-base font-black tracking-widest mt-6 flex items-center justify-center gap-3"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400" />
                </span>
                DEPLOY RESOURCES
              </motion.button>
            </motion.div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
