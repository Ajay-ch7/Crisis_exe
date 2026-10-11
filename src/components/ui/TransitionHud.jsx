import { motion } from 'framer-motion';

const STAGE_CONFIG = {
  clearing: {
    title: 'PROTOCOL ENGAGED',
    detail: 'CLEARING OPERATOR TERMINAL // ENCRYPTING DATA BUS',
    step: 1,
  },
  centering: {
    title: 'NADIR ALIGNMENT',
    detail: 'RETRACTING PLANETARY PROJECTION TO EQUATORIAL CENTER',
    step: 2,
  },
  revolving: {
    title: 'ORBITAL RECON PASS',
    detail: '360° PLANETARY REVOLUTION SCAN IN PROGRESS',
    step: 3,
  },
  locking_india: {
    title: 'TARGET ACQUIRED',
    detail: 'SECTOR 81 // INDIA SUB-CONTINENT LOCKED',
    step: 4,
  },
  zooming_india: {
    title: 'OPTICAL INGRESS',
    detail: 'DESCENDING TO SUB-ORBITAL VECTOR // ALT 280 KM',
    step: 5,
  },
  zooming_city: {
    title: 'SECTOR PINPOINT',
    detail: 'CONFIRMING URBAN THEATER COORDINATES',
    step: 6,
  },
};

export default function TransitionHud({ stage, cityName }) {
  const cfg = STAGE_CONFIG[stage] || STAGE_CONFIG.clearing;
  const detailText = stage === 'zooming_city' && cityName
    ? `LOCKING URBAN SECTOR: ${cityName.toUpperCase()} // RESOLVING HAZARD GRID`
    : cfg.detail;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-x-0 bottom-8 z-20 flex flex-col items-center pointer-events-none px-4"
    >
      <div className="tactical-panel corner-brackets px-6 py-4 max-w-lg w-full text-center bg-black/60 backdrop-blur-md border border-cyan-400/30 rounded shadow-[0_0_25px_rgba(0,240,255,0.2)]">
        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isDone = num < cfg.step;
            const isCur = num === cfg.step;
            return (
              <div
                key={num}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: isCur ? '28px' : '14px',
                  background: isCur ? '#00f0ff' : isDone ? 'rgba(0,240,255,0.6)' : 'rgba(255,255,255,0.15)',
                  boxShadow: isCur ? '0 0 10px #00f0ff' : 'none',
                }}
              />
            );
          })}
        </div>

        {/* Phase Header */}
        <div className="flex items-center justify-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase">
            [ STEP {cfg.step}/6 ] {cfg.title}
          </span>
        </div>

        {/* Detail readout */}
        <p className="mt-1 font-mono text-[11px] text-slate-300 tracking-wider">
          {detailText}
        </p>

        {/* Bottom telemetry line */}
        <div className="mt-2.5 pt-2 border-t border-cyan-400/15 flex items-center justify-between text-[10px] font-mono text-cyan-400/60">
          <span>LAT: 20.59° N</span>
          <span className="animate-pulse">● STREAM LIVE</span>
          <span>LON: 78.96° E</span>
        </div>
      </div>
    </motion.div>
  );
}
