import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CRISIS.EXE Runtime Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="screen-wrapper flex items-center justify-center p-6 bg-[#03070d] text-slate-200">
          <div className="tactical-panel corner-brackets max-w-lg w-full p-8 text-center border border-red-500/40 shadow-2xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center text-red-500 text-2xl font-bold">
              ⚠
            </div>
            <h2 className="text-xl md:text-2xl font-black font-mono text-red-400 tracking-wider mb-2">
              TELEMETRY BUS FAULT // 0xCRASH
            </h2>
            <p className="text-xs font-mono text-slate-400 mb-4 leading-relaxed">
              A critical exception was intercepted by the tactical command subsystem.
            </p>
            <div className="bg-black/60 border border-red-500/20 p-3 rounded font-mono text-[11px] text-red-300 text-left overflow-auto max-h-32 mb-6">
              {this.state.error?.message || 'Unknown runtime error'}
            </div>
            <button
              onClick={this.handleReset}
              className="tactical-btn w-full py-3 text-sm font-bold tracking-widest text-cyan-400"
            >
              EMERGENCY REBOOT
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
