import { useState } from 'react';
import { useGameContext } from '../../context/GameContext';
import { motion } from 'framer-motion';
import HudHeader from '../ui/HudHeader';

export default function SplashScreen({ onNext }) {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useGameContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nickname.length < 3 || nickname.length > 10) {
      setError('CALLSIGN MUST BE 3–10 CHARACTERS');
      return;
    }
    dispatch({ type: 'SET_NICKNAME', payload: nickname });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="screen-wrapper flex flex-col"
    >
      {/* Sticky HUD Bar */}
      <HudHeader />

      {/* Main Landing Hero */}
      <main className="relative flex-1 flex flex-col justify-between overflow-hidden p-4 md:p-8 min-h-[calc(100vh-38px)]">

        {/* Background atmospheric globe glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#03070d] via-transparent to-[#03070d]/80" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full globe-float"
            style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.07) 0%, rgba(0,240,255,0.03) 40%, transparent 70%)' }}
          />
        </div>

        {/* Concentric target rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[600px] h-[600px] md:w-[860px] md:h-[860px] flex items-center justify-center">
          <div className="w-full h-full rounded-full radar-ring-outer absolute" />
          <div className="w-[80%] h-[80%] rounded-full radar-ring-mid absolute" />
          <div className="w-[94%] h-[1px] absolute" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,240,255,0.22), transparent)' }} />
          <div className="h-[94%] w-[1px] absolute" style={{ background: 'linear-gradient(180deg, transparent, rgba(0,240,255,0.22), transparent)' }} />
          <div className="w-64 h-64 rounded-full border border-cyan-400/30 animate-ping opacity-10 absolute" />
          {/* Radar sweep arm */}
          <div className="w-[58%] h-[58%] rounded-full absolute overflow-hidden">
            <div className="w-full h-full origin-center radar-sweep-arm" />
          </div>
        </div>

        {/* Hero Header */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mt-6 md:mt-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/40 rounded-full mb-4 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest text-cyan-400 font-bold uppercase">
              STRATEGIC DISASTER MITIGATION SYSTEM // LEVEL 5 ENGAGEMENT
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: 'spring', stiffness: 100 }}
            className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white text-glow-cyan hud-title"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            CRISIS<span className="text-cyan-400">.</span>EXE
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-lg sm:text-2xl font-bold text-slate-300 tracking-[0.15em] uppercase"
            style={{ fontFamily: 'Chakra Petch, sans-serif' }}
          >
            DISASTER RESPONSE <span className="text-cyan-400">COMMAND</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-sm sm:text-base font-mono text-cyan-400/70 max-w-2xl mx-auto leading-relaxed"
          >
            "Every decision saves a life. Every resource counts."
          </motion.p>
          <p className="mt-2 text-xs font-mono text-slate-500 max-w-xl mx-auto">
            Global early-warning sensors have triggered high-tier emergency protocols across high-density urban clusters. Tactical deployment clearance granted.
          </p>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: 'spring' }}
          className="relative z-10 max-w-lg mx-auto w-full my-auto py-10 flex flex-col items-center space-y-6"
        >
          {/* Nickname Input */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center space-y-4">
            <div className="w-full relative">
              <label className="block font-mono text-[11px] text-cyan-400/70 tracking-[0.15em] uppercase mb-2 text-center">
                ENTER OPERATOR CALLSIGN
              </label>
              <div className="relative corner-brackets">
                <input
                  id="callsign-input"
                  type="text"
                  value={nickname}
                  onChange={(e) => { setNickname(e.target.value); setError(''); }}
                  placeholder="CALLSIGN (3–10 CHARS)"
                  maxLength={10}
                  autoComplete="off"
                  className="tactical-input text-xl font-bold rounded-sm"
                />
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-400 text-xs font-mono mt-2 text-center tracking-wider"
                >
                  ⚠ {error}
                </motion.p>
              )}
            </div>

            <button
              id="btn-play-game"
              type="submit"
              className="tactical-btn w-full py-4 sm:py-5 text-lg sm:text-xl font-black tracking-widest flex items-center justify-center space-x-3 group"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400" />
              </span>
              <span className="group-hover:tracking-[0.25em] transition-all duration-300">
                INITIATE RESPONSE PROTOCOL
              </span>
              <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 5l7 7-7 7M5 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </button>
          </form>

          <p className="font-mono text-[11px] text-slate-500 tracking-wider text-center">
            TACTICAL GRID READY • BROWSER DISPATCH TERMINAL V4.8 • 3-ROUND PROTOCOL
          </p>

          {/* Mini stat chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {[
              { label: 'CITIES', val: '6' },
              { label: 'DISASTERS', val: '9' },
              { label: 'ROUNDS', val: '3' },
            ].map(({ label, val }) => (
              <div key={label} className="px-3 py-1.5 tactical-clip-sm tactical-panel text-center">
                <div className="text-[10px] font-mono text-slate-500 tracking-widest">{label}</div>
                <div className="text-base font-bold text-cyan-400 font-mono">{val}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer coordinates */}
        <div className="relative z-10 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-600 border-t border-slate-800/60 pt-3">
          <div className="flex space-x-4">
            <span>LAT: 20.59° N</span>
            <span>LON: 78.96° E</span>
            <span>ALT: 412 KM (LEO-ORBIT)</span>
          </div>
          <span>DATA GTC-0026 EXTRACTION // ENCRYPTED QUANTUM STREAM</span>
        </div>
      </main>
    </motion.div>
  );
}
