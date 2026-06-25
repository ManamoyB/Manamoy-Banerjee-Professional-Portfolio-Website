import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Database, 
  Clock, 
  Activity, 
  LogOut, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Search, 
  Settings, 
  Trash2, 
  Sliders, 
  AlertTriangle,
  Flame,
  Binary
} from 'lucide-react';

interface AdminPageProps {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    mutedText: string;
    borderColor: string;
    cardBg: string;
    accent?: string;
  };
  theme: string;
  onNavigateHome: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ colors, theme, onNavigateHome }) => {
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('admin_session') === 'true';
  });

  // Controls State
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCmsSyncing, setIsCmsSyncing] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugLogs, setDebugLogs] = useState(true);
  const [lowLatency, setLowLatency] = useState(false);
  const [telemetryFilter, setTelemetryFilter] = useState('ALL');

  // Logs state
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, stamp: '01:14:22', source: 'SYS', text: 'Kernel bootloader executed successfully.', type: 'info' },
    { id: 2, stamp: '01:14:23', source: 'THEME', text: 'Color tokens loaded from context palette.', type: 'info' },
    { id: 3, stamp: '01:14:24', source: 'ROUTER', text: 'Secure route hierarchy bound to /main.', type: 'info' },
    { id: 4, stamp: '01:14:25', source: 'CMS', text: 'Initiating connection to dynamic source (Google Sheets)...', type: 'info' },
    { id: 5, stamp: '01:14:26', source: 'CMS', text: 'Received 12 rows of raw certificate mappings.', type: 'success' },
    { id: 6, stamp: '01:14:26', source: 'CACHE', text: 'Persisted sheet responses into secure client cache.', type: 'success' },
    { id: 7, stamp: '01:15:30', source: 'ENGINE', text: 'Rendered home stage visuals and ParticleCanvas.', type: 'info' },
    { id: 8, stamp: '01:28:45', source: 'STYLE', text: 'Refactored CurrentFocus sub-layouts.', type: 'warning' },
    { id: 9, stamp: '02:47:20', source: 'AUTH', text: 'Loading administrator authentication panels.', type: 'warning' },
  ]);

  // Live clock tracker
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Periodic log generator
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      const sources = ['SYS', 'ROUTER', 'CMS', 'NET', 'MEMORY', 'CPU'];
      const types = ['info', 'success', 'warning', 'error'];
      const actions = [
        'GC routine executed. Reclaimed 14MB block state.',
        'Validated client-side cache integrity index.',
        'Heartbeat signal pinged back from deployment ingress.',
        'Synced navigation indices successfully.',
        'Updated configuration properties.',
        'API endpoint returned response 200 OK.',
      ];

      const newLog = {
        id: Date.now(),
        stamp: new Date().toLocaleTimeString(),
        source: sources[Math.floor(Math.random() * sources.length)],
        text: actions[Math.floor(Math.random() * actions.length)],
        type: types[Math.floor(Math.random() * 3)], // Keep errors sparse
      };

      setLogs(prev => [newLog, ...prev.slice(0, 49)]); // Maintain max 50 logs
    }, 6000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setErrorMsg('');

    // Verification check (Admin / admin)
    setTimeout(() => {
      if (username.toLowerCase() === 'admin' && password === 'admin') {
        setIsLoggedIn(true);
        sessionStorage.setItem('admin_session', 'true');
        setErrorMsg('');
      } else {
        setErrorMsg('Invalid Administrator Credentials. Access Denied.');
      }
      setIsLoggingIn(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin_session');
    setUsername('');
    setPassword('');
  };

  const clearAllLogs = () => {
    setLogs([]);
  };

  const triggerCmsSync = () => {
    setIsCmsSyncing(true);
    // Mimic sync workflow
    setTimeout(() => {
      setIsCmsSyncing(false);
      const syncLog = {
        id: Date.now(),
        stamp: new Date().toLocaleTimeString(),
        source: 'CMS',
        text: 'Force manual sync: Extracted latest records from spreadsheet successfully.',
        type: 'success',
      };
      setLogs(prev => [syncLog, ...prev]);
    }, 1200);
  };

  // Filtered logs
  const filteredLogs = logs.filter(l => {
    if (telemetryFilter !== 'ALL' && l.type !== telemetryFilter.toLowerCase()) return false;
    const searchLower = logSearchQuery.toLowerCase();
    return l.text.toLowerCase().includes(searchLower) || l.source.toLowerCase().includes(searchLower);
  });

  return (
    <div className="space-y-8 py-4 animate-fade-in" id="admin-console-page">
      
      {/* Title Header */}
      <div className="border-b pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderColor: colors.borderColor }}>
        <div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: colors.text }}>
            Admin Control Center
          </h2>
          <p className="text-xs sm:text-sm font-semibold mt-1" style={{ color: colors.mutedText }}>
            System activity telemetries, cloud diagnostic metrics, and deployment state controllers.
          </p>
        </div>
        <button 
          onClick={onNavigateHome}
          className="px-4 py-2 rounded-full border text-xs font-mono font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
          style={{ borderColor: colors.borderColor, color: colors.text }}
        >
          ← Return to Portfolio
        </button>
      </div>

      {!isLoggedIn ? (
        /* Login Card View */
        <div className="max-w-md mx-auto py-8">
          <div 
            className="p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-350"
            style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
          >
            {/* Glowing top line accent */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: colors.primary }} />

            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div 
                  className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center border shadow-sm"
                  style={{ backgroundColor: `${colors.primary}10`, borderColor: colors.primary }}
                >
                  <Lock className="w-6 h-6" style={{ color: colors.primary }} />
                </div>
                <h3 className="text-xl font-black tracking-tight" style={{ color: colors.text }}>
                  Authentication Required
                </h3>
                <p className="text-xs font-medium" style={{ color: colors.mutedText }}>
                  Secure system authorization. Inputs are masked for privacy.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-black uppercase tracking-wider block" style={{ color: colors.text }}>
                    Admin Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter admin username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 font-mono"
                    style={{ 
                      backgroundColor: colors.theme === 'aurora' ? 'rgba(8, 12, 24, 0.6)' : '#ffffff', 
                      borderColor: colors.borderColor,
                      color: colors.text 
                    }}
                  />
                  <span className="text-[9px] font-mono text-slate-500 block">Default is <code className="font-bold">admin</code></span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-black uppercase tracking-wider block" style={{ color: colors.text }}>
                    Secret Passkey
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter secret passcode"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 font-mono"
                      style={{ 
                        backgroundColor: colors.theme === 'aurora' ? 'rgba(8, 12, 24, 0.6)' : '#ffffff', 
                        borderColor: colors.borderColor,
                        color: colors.text 
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                      style={{ color: colors.text }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 block">Default passkey is <code className="font-bold">admin</code></span>
                </div>

                {errorMsg && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/25 rounded-xl flex items-start gap-2 text-[10px] sm:text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-rose-500 font-semibold">{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 rounded-xl border font-mono font-black text-xs uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  style={{ 
                    backgroundColor: colors.primary, 
                    borderColor: colors.primary,
                    color: '#ffffff'
                  }}
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying Authority...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Authenticate Session</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard Portal */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Controls Section (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div 
                className="p-4 rounded-2xl border flex items-center gap-4 shadow-xs" 
                style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
              >
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.primary}10` }}>
                  <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold" style={{ color: colors.mutedText }}>Dynamic Time</span>
                  <p className="text-sm font-bold font-mono" style={{ color: colors.text }}>
                    {currentTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div 
                className="p-4 rounded-2xl border flex items-center gap-4 shadow-xs" 
                style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
              >
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.secondary}10` }}>
                  <Activity className="w-5 h-5 animate-pulse" style={{ color: colors.secondary }} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold" style={{ color: colors.mutedText }}>Platform Latency</span>
                  <p className="text-sm font-bold font-mono text-emerald-500 dark:text-emerald-400">
                    {lowLatency ? '3ms (Ultra-Low)' : '24ms (Secure)'}
                  </p>
                </div>
              </div>

              <div 
                className="p-4 rounded-2xl border flex items-center gap-4 shadow-xs" 
                style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
              >
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.accent || colors.primary}10` }}>
                  <Database className="w-5 h-5" style={{ color: colors.accent || colors.primary }} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold" style={{ color: colors.mutedText }}>CMS Cached Records</span>
                  <p className="text-sm font-bold font-mono" style={{ color: colors.text }}>
                    48 Indexed Rows
                  </p>
                </div>
              </div>
            </div>

            {/* System Console & Streaming Log Output */}
            <div 
              className="rounded-3xl border shadow-xl overflow-hidden"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
            >
              {/* Header with terminal style */}
              <div className="p-4 sm:px-6 flex flex-wrap justify-between items-center gap-3 border-b" style={{ borderColor: colors.borderColor }}>
                <div className="flex items-center gap-2">
                  <span className="flex gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono font-black" style={{ color: colors.text }}>SYS_ENG_SHELL // LOG_STREAM</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 opacity-40" style={{ color: colors.text }} />
                    <input 
                      type="text" 
                      placeholder="Sys grep..." 
                      value={logSearchQuery}
                      onChange={(e) => setLogSearchQuery(e.target.value)}
                      className="pl-7 pr-3 py-1 rounded-full border text-[10px] font-mono focus:outline-none focus:border-indigo-400 w-32"
                      style={{ 
                        backgroundColor: colors.theme === 'aurora' ? 'rgba(8, 12, 24, 0.4)' : '#ffffff', 
                        borderColor: colors.borderColor,
                        color: colors.text 
                      }}
                    />
                  </div>
                  <button 
                    onClick={clearAllLogs}
                    className="p-1 rounded-md border hover:bg-rose-500/10 text-rose-500 transition-colors"
                    style={{ borderColor: colors.borderColor }}
                    title="Clear Log History"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Log filter tabs */}
              <div className="flex px-4 py-2 gap-1.5 border-b text-[10px] sm:text-xs font-mono" style={{ borderColor: colors.borderColor }}>
                {['ALL', 'INFO', 'SUCCESS', 'WARNING'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setTelemetryFilter(f)}
                    className={`px-2.5 py-1 rounded-md border font-semibold cursor-pointer transition-colors ${
                      telemetryFilter === f 
                        ? 'bg-indigo-500 text-white border-indigo-500' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ 
                      borderColor: telemetryFilter === f ? colors.primary : colors.borderColor,
                      color: telemetryFilter === f ? '#ffffff' : colors.text
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Scrolling Terminal Code Block */}
              <div className="bg-slate-950 p-5 font-mono text-[11px] leading-relaxed select-text space-y-2 h-72 overflow-y-auto border-b border-black">
                {filteredLogs.length === 0 ? (
                  <div className="text-slate-500 py-12 text-center">
                    <Binary className="w-8 h-8 mx-auto opacity-30 animate-pulse mb-2" />
                    <span>-- Telemetry stack empty --</span>
                  </div>
                ) : (
                  filteredLogs.map((l) => (
                    <div key={l.id} className="flex gap-2 items-start hover:bg-slate-900/40 py-0.5 px-1 rounded transition-colors group">
                      <span className="text-slate-600 font-bold tracking-tight shrink-0">[{l.stamp}]</span>
                      <span className={`font-black shrink-0 px-1 py-0.2 rounded text-[10px] leading-none uppercase ${
                        l.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                        l.type === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                        l.type === 'error' ? 'bg-rose-500/10 text-rose-400' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        {l.source}
                      </span>
                      <span className="text-slate-300 flex-1 group-hover:text-white transition-colors">{l.text}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Console summary footer */}
              <div className="p-3.5 flex justify-between items-center text-[10px] font-mono" style={{ color: colors.mutedText }}>
                <span>Active stream entries: {filteredLogs.length} / 50</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Telemetry daemon active
                </span>
              </div>
            </div>

            {/* Simulated Admin Control panel */}
            <div 
              className="rounded-3xl border shadow-xl p-5 sm:p-6 space-y-4"
              style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4" style={{ color: colors.primary }} />
                <h4 className="text-base font-black tracking-tight" style={{ color: colors.text }}>System Configuration Options</h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Switch 1: Maintenance mode */}
                <div className="flex justify-between items-center p-3.5 rounded-2xl border" style={{ borderColor: colors.borderColor }}>
                  <div>
                    <span className="text-xs font-bold block" style={{ color: colors.text }}>Developer Maintenance</span>
                    <span className="text-[10px]" style={{ color: colors.mutedText }}>Simulate portfolio suspension</span>
                  </div>
                  <button 
                    onClick={() => {
                      setMaintenanceMode(!maintenanceMode);
                      const act = !maintenanceMode ? 'Enabled Portfolio Maintenance Simulation' : 'Disabled Portfolio Maintenance Simulation';
                      setLogs(prev => [{ id: Date.now(), stamp: new Date().toLocaleTimeString(), source: 'SYS', text: act, type: 'warning' }, ...prev]);
                    }}
                    className={`w-11 h-6 rounded-full relative transition-colors ${maintenanceMode ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${maintenanceMode ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                {/* Switch 2: Debug Mode */}
                <div className="flex justify-between items-center p-3.5 rounded-2xl border" style={{ borderColor: colors.borderColor }}>
                  <div>
                    <span className="text-xs font-bold block" style={{ color: colors.text }}>Verbose Core Logging</span>
                    <span className="text-[10px]" style={{ color: colors.mutedText }}>Capture background micro-signals</span>
                  </div>
                  <button 
                    onClick={() => {
                      setDebugLogs(!debugLogs);
                      const act = !debugLogs ? 'Verbose logging turned ON.' : 'Verbose logging turned OFF.';
                      setLogs(prev => [{ id: Date.now(), stamp: new Date().toLocaleTimeString(), source: 'SYS', text: act, type: 'info' }, ...prev]);
                    }}
                    className={`w-11 h-6 rounded-full relative transition-colors ${debugLogs ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${debugLogs ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                {/* Switch 3: Low Latency Mode */}
                <div className="flex justify-between items-center p-3.5 rounded-2xl border" style={{ borderColor: colors.borderColor }}>
                  <div>
                    <span className="text-xs font-bold block" style={{ color: colors.text }}>Optimize Rendering Thread</span>
                    <span className="text-[10px]" style={{ color: colors.mutedText }}>De-escalate shadow calculations</span>
                  </div>
                  <button 
                    onClick={() => {
                      setLowLatency(!lowLatency);
                      const act = !lowLatency ? 'Optimized GPU rendering thread context.' : 'Restored default display settings.';
                      setLogs(prev => [{ id: Date.now(), stamp: new Date().toLocaleTimeString(), source: 'ENGINE', text: act, type: 'success' }, ...prev]);
                    }}
                    className={`w-11 h-6 rounded-full relative transition-colors ${lowLatency ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${lowLatency ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                {/* Switch 4: Auto-sync validation */}
                <div className="flex justify-between items-center p-3.5 rounded-2xl border" style={{ borderColor: colors.borderColor }}>
                  <div>
                    <span className="text-xs font-bold block" style={{ color: colors.text }}>Dynamic Sheet Trigger</span>
                    <span className="text-[10px]" style={{ color: colors.mutedText }}>Synchronize data layers</span>
                  </div>
                  <button 
                    onClick={triggerCmsSync}
                    disabled={isCmsSyncing}
                    className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <RefreshCw className={`w-3 h-3 ${isCmsSyncing ? 'animate-spin' : ''}`} />
                    <span>Sync Now</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Architecture Status Information (4 Columns) - Relocated to Admin Portal */}
          <div className="lg:col-span-4 space-y-6">
            
            <div 
              className="rounded-3xl border shadow-xl p-5 space-y-4 relative overflow-hidden" 
              style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-emerald-500" style={{ color: colors.accent }} />
                <h4 className="text-base font-black tracking-tight" style={{ color: colors.text }}>Architecture Specifications</h4>
              </div>

              <div className="space-y-3 font-mono text-[11px] leading-relaxed">
                <div 
                  className="flex justify-between items-center border-b pb-2" 
                  style={{ borderColor: 'rgba(15,23,42,0.06)' }}
                >
                  <span style={{ color: colors.mutedText }} className="font-bold">CMS Core Synced:</span>
                  <span className="font-black text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    ACTIVE
                  </span>
                </div>

                <div 
                  className="flex justify-between items-center border-b pb-2" 
                  style={{ borderColor: 'rgba(15,23,42,0.06)' }}
                >
                  <span style={{ color: colors.mutedText }} className="font-bold">Active Provider:</span>
                  <span className="font-black" style={{ color: colors.text }}>
                    Google Sheets API
                  </span>
                </div>

                <div 
                  className="flex justify-between items-center border-b pb-2" 
                  style={{ borderColor: 'rgba(15,23,42,0.06)' }}
                >
                  <span style={{ color: colors.mutedText }} className="font-bold">Caching Buffer:</span>
                  <span className="font-black" style={{ color: colors.text }}>
                    5m Browser Storage
                  </span>
                </div>

                <div 
                  className="flex justify-between items-center border-b pb-2" 
                  style={{ borderColor: 'rgba(15,23,42,0.06)' }}
                >
                  <span style={{ color: colors.mutedText }} className="font-bold">Dynamic Engine:</span>
                  <span className="font-black" style={{ color: colors.text }}>
                    Vite HMR Excluded
                  </span>
                </div>

                <div 
                  className="flex justify-between items-center border-b pb-2" 
                  style={{ borderColor: 'rgba(15,23,42,0.06)' }}
                >
                  <span style={{ color: colors.mutedText }} className="font-bold">Client Router:</span>
                  <span className="font-black" style={{ color: colors.text }}>
                    React 19 Hash Map
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span style={{ color: colors.mutedText }} className="font-bold">Admin Authority:</span>
                  <span className="font-black text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    SESS_LEVEL_1
                  </span>
                </div>
              </div>
            </div>

            <div 
              className="rounded-3xl border shadow-xl p-5 space-y-3 relative overflow-hidden" 
              style={{ backgroundColor: colors.cardBg, borderColor: colors.borderColor }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <h4 className="text-base font-black tracking-tight" style={{ color: colors.text }}>Diagnostic Notice</h4>
              </div>

              <p className="text-xs leading-relaxed" style={{ color: colors.mutedText }}>
                This is a secure administrator environment designed for debugging client models and CMS data integrations on this landing page. Actions like syncing refresh local database overlays immediately.
              </p>

              <button 
                onClick={handleLogout}
                className="w-full mt-2 py-2 flex items-center justify-center gap-2 rounded-xl border font-mono font-black text-xxs text-rose-500 hover:bg-rose-500/10 border-rose-500/30 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Revoke Admin Session</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
