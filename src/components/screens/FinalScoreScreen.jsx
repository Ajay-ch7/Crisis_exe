import { useState, useEffect } from 'react';
import { useGameContext } from '../../context/GameContext';
import { submitScore } from '../../firebase/leaderboard';
import { motion } from 'framer-motion';
import HudHeader from '../ui/HudHeader';

export default function FinalScoreScreen({ onNext }) {
  const { state } = useGameContext();
  const { score, cityHealth, nickname, city, scoreDetails } = state;
  const [submitting, setSubmitting] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const survived = cityHealth > 0;

  // Score count-up animation
  useEffect(() => {
    let start = 0;
    const end = score;
    if (start === end) return;
    const duration = 1800;
    const step = Math.max(1, Math.ceil(end / 60));
    const interval = Math.floor(duration / (end / step + 1));

    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      setDisplayScore(start);
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [score]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitScore({
        nickname,
        score,
        city: city?.name || 'Unknown',
        survived,
      });
      setSubmitted(true);
      setTimeout(() => onNext(), 800);
    } catch (e) {
      console.error(e);
      onNext();
    }
  };

  const primaryColor = survived ? '#00ff88' : '#ff2a55';
  const statusText   = survived ? 'CITY SURVIVED' : 'CITY COLLAPSED';
  const statusLabel  = survived ? 'MISSION SUCCESS' : 'MISSION FAILED';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="screen-wrapper flex flex-col"
    >
      <HudHeader city={city?.name} />

      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 min-h-[calc(100vh-38px)] relative overflow-hidden">

        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${primaryColor}08 0%, transparent 65%)` }}
        />

        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
          className="relative z-10 w-full max-w-lg"
        >
          {/* Status header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3 border font-mono text-[11px] font-bold tracking-widest uppercase"
              style={{
                background: `${primaryColor}12`,
                borderColor: `${primaryColor}50`,
                color: primaryColor,
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: primaryColor }} />
              {statusLabel}
            </motion.div>

            <h1
              className="text-4xl md:text-5xl font-black uppercase tracking-wider"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                color: primaryColor,
                textShadow: `0 0 20px ${primaryColor}70, 0 0 40px ${primaryColor}30`,
              }}
            >
              {statusText}
            </h1>

            <p className="font-mono text-sm text-slate-400 mt-2">
              FINAL STATUS FOR <span className="text-white font-bold">{nickname || 'OPERATOR'}</span>
              &apos;S <span className="text-cyan-400">{city?.name || 'UNKNOWN'}</span>
            </p>
          </div>

          {/* Main score card */}
          <div className="tactical-panel-elevated tactical-clip corner-brackets p-6 md:p-8 rounded mb-4">

            {/* Score display */}
            <div className="text-center mb-6">
              <div className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-2">FINAL SCORE</div>
              <motion.div
                key={displayScore}
                className="text-6xl md:text-7xl font-black tabular-nums"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  color: '#ffffff',
                  textShadow: `0 0 30px rgba(0,240,255,0.5)`,
                }}
              >
                {displayScore.toLocaleString()}
              </motion.div>
              <div className="text-sm font-mono text-slate-500 mt-1 tracking-widest">POINTS</div>
            </div>

            {/* Score breakdown */}
            {scoreDetails && (
              <div className="bg-black/40 border border-cyan-400/15 rounded p-4 font-mono text-xs space-y-2 mb-4">
                <div className="text-[10px] text-cyan-400/70 tracking-widest uppercase mb-2">SCORE BREAKDOWN</div>
                {[
                  { label: 'BASE (City Health)',    val: scoreDetails.base,         color: '#b8e1fc' },
                  { label: 'EFFICIENCY BONUS',      val: `+${scoreDetails.efficiency}`, color: '#ffaa00' },
                  { label: 'DISASTER BONUS',        val: `+${scoreDetails.disasterBonus}`, color: '#00ff88' },
                  { label: `MULTIPLIER (${city?.name})`, val: `×${city?.multiplier}`, color: '#00f0ff' },
                ].map(({ label, val, color }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-slate-400">{label}:</span>
                    <span className="font-bold" style={{ color }}>{val}</span>
                  </div>
                ))}
                <div className="border-t border-slate-700 pt-2 flex justify-between items-center">
                  <span className="text-white font-bold">FINAL SCORE:</span>
                  <span className="font-bold text-white">{score.toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* City health indicator */}
            <div className="flex items-center gap-3 bg-black/30 rounded p-3 border border-slate-800 mb-4">
              <div
                className="w-3 h-10 rounded-sm flex-shrink-0"
                style={{ background: primaryColor, boxShadow: `0 0 8px ${primaryColor}` }}
              />
              <div>
                <div className="text-[10px] font-mono text-slate-500 tracking-widest">CITY INTEGRITY</div>
                <div
                  className="text-2xl font-black font-mono"
                  style={{ color: primaryColor }}
                >
                  {Math.round(cityHealth)}%
                </div>
              </div>
              <div className="flex-1 ml-2">
                <div className="w-full bg-black/50 rounded-sm h-2 overflow-hidden">
                  <div
                    className="h-full rounded-sm"
                    style={{ width: `${Math.max(0, cityHealth)}%`, background: primaryColor, boxShadow: `0 0 8px ${primaryColor}70` }}
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              id="btn-submit-score"
              onClick={handleSubmit}
              disabled={submitting || submitted}
              className="tactical-btn w-full py-4 text-sm font-black tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {submitted ? (
                <><span className="text-emerald-400">✓</span> SUBMITTED TO LEADERBOARD</>
              ) : submitting ? (
                <><span className="animate-spin inline-block">⟳</span> TRANSMITTING...</>
              ) : (
                <>
                  <span>SUBMIT TO LEADERBOARD</span>
                  <span className="text-cyan-400">★</span>
                </>
              )}
            </button>
          </div>

          {/* Skip link */}
          <div className="text-center">
            <button
              onClick={onNext}
              className="font-mono text-[11px] text-slate-600 hover:text-slate-400 transition-colors underline underline-offset-4"
            >
              [SKIP — VIEW LEADERBOARD WITHOUT SUBMITTING]
            </button>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
