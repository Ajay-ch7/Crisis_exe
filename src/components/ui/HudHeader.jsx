import { useEffect, useState } from 'react';

/**
 * HudHeader — Sticky top status bar used across all screens.
 * Shows: DEFCON status, live UTC clock, satellite link, and
 * scrolling fake-alert ticker items.
 */
export default function HudHeader({ round = null, city = null, alerts = [] }) {
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${h}:${m}:${s} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="hud-ticker w-full py-1.5 px-4 flex flex-wrap items-center justify-between font-mono text-xs text-cyan-400 gap-2">
      {/* Left: DEFCON + SAT-LINK */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-widest text-slate-300 text-[11px]">
            {round ? `DEFCON ${round === 1 ? '3' : round === 2 ? '2' : '1'} // ROUND ${round}/3 ACTIVE` : 'DEFCON 2 // GLOBAL TELEMETRY ONLINE'}
          </span>
        </div>
        <span className="text-slate-600 hidden md:inline">|</span>
        <div className="hidden md:flex items-center space-x-1 text-[11px]">
          <span className="text-slate-400">SAT-LINK:</span>
          <span className="text-cyan-400 font-semibold">INSAT-3DR [98.4% SYNCED]</span>
        </div>
      </div>

      {/* Center: ticker / city info */}
      <div className="hidden lg:flex items-center space-x-5 text-[10px] text-slate-400 overflow-hidden">
        {city && (
          <div className="flex items-center space-x-1">
            <span className="text-amber-400 font-bold">SECTOR:</span>
            <span className="text-slate-200 uppercase">{city} // INDIA COASTAL CLUSTER</span>
          </div>
        )}
        {alerts.length > 0 && (
          <div className="flex items-center space-x-1">
            <span className="text-red-400 font-bold animate-pulse">ALERT:</span>
            <span className="text-slate-200">{alerts[0]}</span>
          </div>
        )}
        <div>
          <span className="text-cyan-400">UTC:</span>
          <span className="text-white ml-1">{utcTime}</span>
        </div>
      </div>

      {/* Right: coords */}
      <div className="flex items-center space-x-3 text-[10px] text-slate-500 font-mono hidden md:flex">
        <span>LAT: 20.5937° N</span>
        <span>LON: 78.9629° E</span>
      </div>
    </header>
  );
}
