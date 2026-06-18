import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'motion/react';
import { Play, RefreshCw, Cpu, Server, CheckCircle2, ShieldAlert, TrendingUp, HelpCircle } from 'lucide-react';

interface ModelPreset {
  id: string;
  name: string;
  category: string;
  inputs: {
    label: string;
    type: 'slider' | 'select';
    min?: number;
    max?: number;
    step?: number;
    options?: string[];
    value: any;
  }[];
  inferenceLogs: string[];
  getOutput: (inputs: any[]) => {
    metrics: { label: string; value: string | number; colorClass: string }[];
    percentage: number;
    verdict: string;
    details: string;
  };
}

export const PredictiveInferenceSandbox: React.FC = () => {
  const { theme, colors } = useTheme();
  
  const presets: ModelPreset[] = [
    {
      id: 'finbert',
      name: 'FinBERT Stock Sentiment',
      category: 'NLP & Quantitative Finance',
      inputs: [
        { label: 'Sentiment Index', type: 'slider', min: -100, max: 100, step: 5, value: -65 },
        { label: 'Microblog Tweet Volume', type: 'slider', min: 100, max: 5000, step: 50, value: 3400 }
      ],
      inferenceLogs: [
        'Initializing double-tensor buffers...',
        'Running FinBERT tokenizer on high-volume feeds...',
        'Aggregating temporal sentiment weighting arrays...',
        'Solving hybrid GARCH equations with LSTM seeds...',
        'Inference converged.'
      ],
      getOutput: (inputs) => {
        const sentiment = inputs[0] / 100; // -1 to 1
        const volume = inputs[1];
        
        // Calculate volatility probability
        const volPct = Math.round(Math.min(99.8, Math.max(5.0, (1 - sentiment) * 45 + (volume / 5000) * 10)));
        const riskLevel = volPct > 75 ? 'HIGH RANGE SHOCK' : volPct > 40 ? 'ELEVATED NOISE' : 'STABLE HORIZON';
        const color = volPct > 75 ? 'text-red-400' : volPct > 40 ? 'text-amber-400' : 'text-emerald-400';
        
        return {
          metrics: [
            { label: 'Forecasted Daily Volatility Risk', value: `${volPct}%`, colorClass: color },
            { label: 'Calculated Hedge Priority', value: riskLevel, colorClass: color }
          ],
          percentage: volPct,
          verdict: riskLevel,
          details: `FinBERT weights detected pessimistic social indicators. Outflow pressure is high with sound confidence validation.`
        };
      }
    },
    {
      id: 'deepfake',
      name: 'EfficientNet-B4 Dual-Stream',
      category: 'Computer Vision & Biometrics',
      inputs: [
        { label: 'Spatial Pixels Variance', type: 'slider', min: 0, max: 100, step: 1, value: 87 },
        { label: 'Temporal FPS Jitter', type: 'slider', min: 0, max: 60, step: 2, value: 42 }
      ],
      inferenceLogs: [
        'Acquiring frame stream layers...',
        'Extracting landmark matrices via MTCNN...',
        'Evaluating EfficientNet spatial facial boundaries...',
        'ConvLSTM temporal coherence audit complete...',
        'Classification complete.'
      ],
      getOutput: (inputs) => {
        const spatial = inputs[0];
        const jitter = inputs[1];
        
        const fakePct = Math.round(Math.min(99.9, Math.max(1.2, (spatial * 0.7) + (jitter * 0.5))));
        const classification = fakePct > 80 ? 'GENERATED / DEEPFAKE' : fakePct > 40 ? 'SUSPICIOUS METRIC' : 'AUTHENTIC BIOMETRIC';
        const color = fakePct > 80 ? 'text-rose-500' : fakePct > 40 ? 'text-orange-400' : 'text-green-500';
        
        return {
          metrics: [
            { label: 'Synthetic Manipulation Index', value: `${fakePct}%`, colorClass: color },
            { label: 'Dual-Stream Classification', value: classification, colorClass: color }
          ],
          percentage: fakePct,
          verdict: classification,
          details: fakePct > 80 
            ? 'Facial margins show blend inconsistencies. High chance of GAN interpolation.' 
            : 'Coherent pixel gradients found across sequential frame arrays.'
        };
      }
    },
    {
      id: 'biobert',
      name: 'BioBERT Rx Knowledge Graph',
      category: 'Clinical NLP & Healthcare',
      inputs: [
        { 
          label: 'Inhaled Symptoms', 
          type: 'select', 
          options: ['Hypertension & Chest pain', 'Bronchospasm & Cough', 'Dermal rash & Toxicity', 'Migraine & Brain pressure'],
          value: 'Bronchospasm & Cough'
        }
      ],
      inferenceLogs: [
        'Ingesting medical symptom phrase tokens...',
        'Querying BioBERT semantic overlaps...',
        'Traversing Neo4j chemical knowledge hierarchy...',
        'Calculating drug interaction contraindications...',
        'Recommendation matrix loaded.'
      ],
      getOutput: (inputs) => {
        const selectedSymptom = inputs[0];
        let compound = 'Albuterol / Salbutamol';
        let safetyRatio = 98.4;
        let warning = 'Contraindication test: SAFE';
        let color = 'text-teal-400';
        
        if (selectedSymptom === 'Hypertension & Chest pain') {
          compound = 'Lisinopril + Atenolol Combination';
          safetyRatio = 96.1;
          color = 'text-cyan-400';
        } else if (selectedSymptom === 'Dermal rash & Toxicity') {
          compound = 'Hydrocortisone / Terbinafine Compound';
          safetyRatio = 84.5;
          warning = 'CAUTION: Avoid NSAID overlapping';
          color = 'text-amber-400';
        } else if (selectedSymptom === 'Migraine & Brain pressure') {
          compound = 'Sumatriptan Succinate';
          safetyRatio = 97.2;
          color = 'text-emerald-400';
        }

        return {
          metrics: [
            { label: 'Target Molecular Formula', value: compound, colorClass: 'text-indigo-400 dark:text-indigo-300 font-sans' },
            { label: 'Safety Confidence Score', value: `${safetyRatio}%`, colorClass: color }
          ],
          percentage: safetyRatio,
          verdict: warning,
          details: `BioBERT semantic alignment parsed symptoms. Chemical targets suggested with drug overlapping crosscheck.`
        };
      }
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const activePreset = presets[activeIdx];
  
  // State for user-modified inputs for active preset
  const [currentInputs, setCurrentInputs] = useState<any[]>([]);
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [outputs, setOutputs] = useState<any>(null);

  // Initialize input state whenever active preset changes
  useEffect(() => {
    setCurrentInputs(activePreset.inputs.map(input => input.value));
    setLogs([]);
    setOutputs(null);
  }, [activeIdx]);

  const handleInputChange = (inputIdx: number, val: any) => {
    setCurrentInputs(prev => {
      const copy = [...prev];
      copy[inputIdx] = val;
      return copy;
    });
    // Reset outputs to enforce "Run" button action style
    setOutputs(null);
  };

  const triggerInference = () => {
    if (running) return;
    setRunning(true);
    setLogs([]);
    setOutputs(null);
    
    // Simulate terminal step printing
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < activePreset.inferenceLogs.length) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${activePreset.inferenceLogs[currentStep]}`]);
        currentStep++;
      } else {
        clearInterval(interval);
        setRunning(false);
        setOutputs(activePreset.getOutput(currentInputs));
      }
    }, 280);
  };

  return (
    <div 
      className="p-5 sm:p-6 rounded-2xl border backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-6 overflow-hidden relative"
      style={{
        backgroundColor: colors.cardBg,
        borderColor: colors.borderColor
      }}
    >
      {/* Decorative top header representing a modular compiler widget */}
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.borderColor }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[10px] sm:text-xs font-mono opacity-80 tracking-wide">
            prediction_sandbox_v1.0.tsx
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xxs font-bold text-indigo-400 animate-pulse">
          <Cpu className="w-3.5 h-3.5 shrink-0" />
          <span>CUDA: ACTIVE (T4 GPU)</span>
        </div>
      </div>

      {/* Model Preset selector tabs */}
      <div className="space-y-1.5">
        <span className="text-xxs font-mono uppercase tracking-widest opacity-60 block">
          Select Active Machine Learning Hub Module
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {presets.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => { if (!running) setActiveIdx(idx); }}
              className={`text-[10px] sm:text-xs py-2 px-1.5 rounded-lg border font-semibold truncate transition-all cursor-pointer ${running ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{
                backgroundColor: activeIdx === idx 
                  ? colors.primary 
                  : (theme === 'aurora' ? 'rgba(8, 11, 20, 0.4)' : '#ffffff'),
                borderColor: colors.borderColor,
                color: activeIdx === idx ? '#ffffff' : colors.text
              }}
            >
              {preset.id === 'finbert' ? 'FinBERT' : preset.id === 'deepfake' ? 'Deepfake' : 'BioBERT'}
            </button>
          ))}
        </div>
        <span className="text-[10px] font-medium block italic opacity-70" style={{ color: colors.secondary }}>
          {activePreset.name} — {activePreset.category}
        </span>
      </div>

      {/* Interactive Inputs */}
      <div className="space-y-3 p-3.5 rounded-xl border border-dashed text-xs" style={{ borderColor: colors.borderColor }}>
        <span className="text-xxs font-mono uppercase tracking-wide opacity-75 block">
          Tweak Neural Parameter Vectors
        </span>
        
        {activePreset.inputs.map((input, idx) => {
          const val = currentInputs[idx] !== undefined ? currentInputs[idx] : input.value;
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between font-medium">
                <span className="opacity-80">{input.label}</span>
                {input.type === 'slider' && (
                  <span className="font-mono font-bold" style={{ color: colors.secondary }}>
                    {val > 0 && input.min === -100 ? `+${val}%` : `${val}`}
                  </span>
                )}
              </div>

              {input.type === 'slider' ? (
                <input
                  type="range"
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  value={val}
                  disabled={running}
                  onChange={(e) => handleInputChange(idx, Number(e.target.value))}
                  className="w-full h-1.5 rounded-lg appearance-none cursor-ew-resize focus:outline-none"
                  style={{
                    background: theme === 'aurora' ? '#1E293B' : '#CBD5E1',
                    accentColor: colors.primary
                  }}
                />
              ) : (
                <select
                  disabled={running}
                  value={val}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  className="w-full text-xxs px-2.5 py-1.5 rounded-lg border outline-none font-medium"
                  style={{
                    backgroundColor: theme === 'aurora' ? '#080B14' : '#ffffff',
                    borderColor: colors.borderColor,
                    color: colors.text
                  }}
                >
                  {input.options?.map((opt, oIdx) => (
                    <option key={oIdx} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          );
        })}

        {/* Start Inference trigger */}
        <button
          onClick={triggerInference}
          disabled={running}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-bold text-xs shadow-md transition-all cursor-pointer hover:opacity-90 disabled:opacity-40"
          style={{
            backgroundColor: colors.primary,
            color: '#ffffff'
          }}
        >
          {running ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          <span>{running ? 'Executing Forward Pass...' : 'Execute Live Model Inference'}</span>
        </button>
      </div>

      {/* Terminal logs and Telemetry result screen */}
      <div 
        className="rounded-xl border p-4 font-mono text-[10px] leading-relaxed overflow-hidden h-44 flex flex-col justify-between"
        style={{
          backgroundColor: theme === 'aurora' ? 'rgba(4, 6, 12, 0.9)' : 'rgba(0, 0, 0, 0.04)',
          borderColor: colors.borderColor
        }}
      >
        {/* If not running and no output, show invite */}
        {!running && !outputs && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-1 select-none">
            <Server className="w-7 h-7 stroke-1 text-slate-500 animate-pulse" />
            <span className="opacity-55 block">Waiting for network invocation...</span>
            <span className="opacity-40 text-[9px] block">Select values and hit &quot;Execute Live Model Inference&quot;</span>
          </div>
        )}

        {/* If running logs print */}
        {running && (
          <div className="flex-1 flex flex-col justify-end space-y-1">
            {logs.map((log, lIdx) => (
              <motion.div 
                key={lIdx} 
                initial={{ opacity: 0, x: -4 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-emerald-400 dark:text-emerald-300"
              >
                {log}
              </motion.div>
            ))}
          </div>
        )}

        {/* If outputs ready */}
        {!running && outputs && (
          <div className="space-y-2.5 h-full flex flex-col justify-between animate-fade-in">
            <div className="flex justify-between items-center border-b pb-1.5" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <span className="font-bold text-indigo-400 flex items-center gap-1.5 uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>INFERENCE SUCCESS</span>
              </span>
              <span className="text-[9px] opacity-50 uppercase font-bold text-slate-400">
                EVAL_STABLE (8.2ms)
              </span>
            </div>

            {/* Simulated analytics grid */}
            <div className="grid grid-cols-2 gap-2">
              {outputs.metrics.map((met: any, mIdx: number) => (
                <div key={mIdx} className="space-y-0.5">
                  <span className="opacity-55 block text-[8px] uppercase tracking-wider">{met.label}</span>
                  <span className={`block text-xs font-bold ${met.colorClass}`}>{met.value}</span>
                </div>
              ))}
            </div>

            <p className="text-[9px] leading-tight opacity-75 border-t pt-1.5 font-sans" style={{ borderColor: 'rgba(255,255,255,0.05)', color: colors.text }}>
              {outputs.details}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
