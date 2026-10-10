import { useGameContext } from '../../context/GameContext';
import { motion } from 'framer-motion';
import HudHeader from '../ui/HudHeader';

const STATUS_CONFIG = {
  resolved: {
    label: '✓ HANDLED',
    barColor: '#00ff88',
    borderColor: 'rgba(0,255,136,0.4)',
    bg: 'rgba(0,255,136,0.05)',
    chipClass: 'status-chip-resolved',
    glowColor: 'rgba(0,255,136,0.2)',
  },
  partial: {
    label: '⚠ PARTIAL',
    barColor: '#ffaa00',
    borderColor: 'rgba(255,170,0,0.45)',
    bg: 'rgba(255,170,0,0.06)',
    chipClass: 'status-chip-partial',
    glowColor: 'rgba(255,170,0,0.15)',
  },
  failed: {
    label: '✕ FAILED',
    barColor: '#ff2a55',
    borderColor: 'rgba(255,42,85,0.55)',
    bg: 'rgba(255,42,85,0.08)',
    chipClass: 'status-chip-failed',
    glowColor: 'rgba(255,42,85,0.2)',
  },
};

function ResultCard({ result, index }) {
  const cfg = STATUS_CONFIG[result.status] || STATUS_CONFIG.partial;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.12 + 0.3, type: 'spring', stiffness: 90 }}
      className="relative rounded overflow-hidden"
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.borderColor}`,
        boxShadow: `0 0 16px ${cfg.glowColor}`,
      }}
    >
      {/* Left status bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: cfg.barColor, boxShadow: `0 0 8px ${cfg.barColor}` }} />

      <div className="pl-4 pr-4 py-3 flex items-center gap-4">
        <span className="text-3xl flex-shrink-0">{result.emoji}</span>
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <h3 className="font-bold text-sm uppercase text-white tracking-wide" style={{ fontFamily: 'Chakra Petch, sans-serif' }}>
              {result.name}
            </h3>
            <span className={`status-chip ${cfg.chipClass}`}>
              {cfg.label}
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400 italic">"{result.message}"</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function OutcomeScreen({ onNext }) {
  const { state, dispatch } = useGameContext();
  const { cityHealth, lastResults, round, gameOver } = state;

  const handleNext = () => {
    if (gameOver || round >= 3) {
      dispatch({ type: 'CALC_SCORE' });
      onNext('FinalScoreScreen');
    } else {
      dispatch({ type: 'NEXT_ROUND' });
      onNext('WarningScreen');
    }
  };

  const hasFailed  = lastResults.some(r => r.status !== 'resolved');
  const allFailed  = lastResults.length > 0 && lastResults.every(r => r.status === 'failed');
  const healthColor = cityHealth > 60 ? '#00ff88' : cityHealth > 25 ? '#ffaa00' : '#ff2a55';

  const isGameEnd = gameOver || round >= 3;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        x: hasFailed ? [0, -8, 8, -6, 6, 0] : 0,
      }}
      transition={{ duration: hasFailed ? 0.4 : 0.5 }}
      className="screen-wrapper flex flex-col"
    >
      <HudHeader round={round} city={state.city?.name} />

      <main className="flex-1 flex flex-col p-4 md:p-6 min-h-[calc(100vh-38px)]">

        {/* Top HUD */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="tactical-panel tactical-clip mb-5 p-4 flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-10 rounded-sm" style={{ background: healthColor, boxShadow: `0 0 10px ${healthColor}` }} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono text-slate-400 tracking-wider">SITUATION REPORT //</span>
                <span className="text-xl font-black uppercase text-white" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  ROUND {round} DEBRIEF
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {allFailed ? 'CATASTROPHIC FAILURE — RESOURCES WASTED' :
                 hasFailed ? 'PARTIAL SUCCESS — SOME THREATS NOT CONTAINED' :
                 'OPERATIONAL SUCCESS — ALL THREATS NEUTRALIZED'}
              </p>
            </div>
          </div>

          {/* Health indicator */}
          <div className="border-l border-slate-700 pl-3">
            <span className="text-[10px] font-mono text-slate-400 block">CITY INTEGRITY:</span>
            <span
              className="text-xl font-black font-mono"
              style={{ color: healthColor, textShadow: `0 0 8px ${healthColor}70`, fontFamily: 'Orbitron, sans-serif' }}
            >
              {Math.round(cityHealth)}%
            </span>
          </div>
        </motion.div>

        {/* City health bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="tactical-panel p-4 mb-5 rounded"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-sm uppercase tracking-widest text-slate-300" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              CITY HEALTH STATUS
            </span>
            <span className="font-mono text-sm font-bold" style={{ color: healthColor }}>
              {Math.round(cityHealth)}% INTEGRITY
            </span>
          </div>

          <div className="w-full bg-black/50 rounded-sm h-5 overflow-hidden border border-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(0, cityHealth)}%` }}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
              className="h-full rounded-sm relative overflow-hidden"
              style={{ background: `linear-gradient(90deg, ${healthColor}88, ${healthColor})`, boxShadow: `0 0 12px ${healthColor}60` }}
            >
              {/* Scanline shimmer */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  animation: 'scanline 2s linear infinite',
                }}
              />
            </motion.div>
          </div>

          {/* Scale ticks */}
          <div className="flex justify-between mt-1 font-mono text-[10px] text-slate-600">
            {[0, 25, 50, 75, 100].map(v => (
              <span key={v}>{v}%</span>
            ))}
          </div>
        </motion.div>

        {/* Results list */}
        <div className="space-y-3 mb-6 flex-1">
          <div className="font-mono text-[10px] text-slate-500 tracking-widest uppercase mb-2">
            DISASTER RESPONSE OUTCOMES:
          </div>
          {(lastResults || []).map((result, i) => (
            <ResultCard key={result.id || i} result={result} index={i} />
          ))}
        </div>

        {/* Next round / finish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-end"
        >
          {!isGameEnd && (
            <div className="font-mono text-[11px] text-slate-500 self-center">
              ROUND {round + 1} OF 3 INCOMING...
            </div>
          )}
          <button
            id="btn-next-round"
            onClick={handleNext}
            className={`tactical-btn px-8 py-3.5 text-sm font-black tracking-widest flex items-center justify-center gap-3 ${isGameEnd ? 'tactical-btn-danger' : ''}`}
          >
            {isGameEnd ? (
              <>
                <span>VIEW FINAL SCORE</span>
                <span className="text-base">→</span>
              </>
            ) : (
              <>
                <span>NEXT ROUND</span>
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </>
            )}
          </button>
        </motion.div>
      </main>
    </motion.div>
  );
}
