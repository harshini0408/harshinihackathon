'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const industries = [
  'FMCG & Consumer Goods',
  'Automotive & Manufacturing',
  'Pharmaceuticals & Healthcare',
  'E-commerce & Retail',
  'Chemicals & Petrochemicals',
  'Steel & Metals',
  'Cement & Building Materials',
  'Agriculture & Food Processing',
];

const volumeOptions = [
  { label: '500-2,000', value: 1000 },
  { label: '2,000-10,000', value: 5000 },
  { label: '10,000-50,000', value: 25000 },
  { label: '50,000+', value: 75000 },
];

const complexityOptions = [
  { label: 'Regional (1-5 states)', value: 1 },
  { label: 'National (10+ states)', value: 2 },
  { label: 'Pan-India + International', value: 3 },
];

interface SimResult {
  costSaving: number;
  carbonReduction: number;
  routeOptimization: number;
  utilizationGain: number;
  aiDecisions: number;
  recommendations: string[];
}

function computeResults(volume: number, complexity: number): SimResult {
  const baseSaving = 8 + complexity * 3 + Math.min(volume / 10000, 5);
  const carbonBase = volume * 0.02 * complexity;
  return {
    costSaving: Math.round(baseSaving * 10) / 10,
    carbonReduction: Math.round(carbonBase),
    routeOptimization: Math.round(60 + complexity * 10 + Math.random() * 10),
    utilizationGain: Math.round(20 + complexity * 8 + Math.random() * 10),
    aiDecisions: Math.round(volume * 2.4 * complexity),
    recommendations: [
      `Deploy Procurement Agent across ${Math.round(volume * 0.3)} high-frequency lanes for maximum RFQ optimization`,
      `Enable Carbon Intelligence on ${complexity > 1 ? 'national' : 'regional'} corridors — estimated ${Math.round(carbonBase)}T CO₂ reduction/year`,
      `Activate Load Consolidation Engine for ${Math.round(baseSaving * 0.6)}% utilization improvement`,
      complexity >= 2 ? 'Integrate Lane Intelligence Builder for cross-regional shipment clustering' : 'Start with regional route optimization before scaling nationally',
      `Connect to National Grid for real-time benchmark data across ${Math.round(volume * 0.7)} active lanes`,
    ],
  };
}

function ProgressBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-slate-400">{label}</span>
        <span className="text-[11px] font-mono" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

const processingStageLabels = [
  'Connecting to National Logistics Grid...',
  'Analyzing industry benchmark data...',
  'Computing route optimization scenarios...',
  'Running carbon impact analysis...',
  'Generating AI recommendations...',
  'Simulation complete.',
];

export default function CommandCenter() {
  const [step, setStep] = useState(0); // 0=config, 1=processing, 2=results
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedVolume, setSelectedVolume] = useState<number>(0);
  const [selectedComplexity, setSelectedComplexity] = useState<number>(0);
  const [results, setResults] = useState<SimResult | null>(null);
  const [processingStage, setProcessingStage] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const runSimulation = useCallback(() => {
    setStep(1);
    setProcessingStage(0);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    processingStageLabels.forEach((_, i) => {
      const timer = setTimeout(() => {
        setProcessingStage(i);
        if (i === processingStageLabels.length - 1) {
          const finalTimer = setTimeout(() => {
            setResults(computeResults(selectedVolume, selectedComplexity));
            setStep(2);
          }, 600);
          timersRef.current.push(finalTimer);
        }
      }, i * 800);
      timersRef.current.push(timer);
    });
  }, [selectedVolume, selectedComplexity]);

  const resetSimulation = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStep(0);
    setSelectedIndustry('');
    setSelectedVolume(0);
    setSelectedComplexity(0);
    setResults(null);
  }, []);

  const canRun = selectedIndustry && selectedVolume > 0 && selectedComplexity > 0;

  return (    <section id="command-center" className="relative section-padding overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] mb-6">
            <span className="text-[10px] font-mono text-electric uppercase tracking-widest">Interactive Simulation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">AI Command </span>
            <span className="text-electric glow-text">Center</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Configure your logistics profile. Our AI will simulate the impact of deploying the 
            Intelligence Grid on your operations.
          </p>
        </motion.div>

        {/* Command Center Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[11px] font-mono text-slate-500">logistics-grid-simulator v2.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                {step === 0 ? 'Ready' : step === 1 ? 'Processing' : 'Complete'}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* Step 0: Configuration */}
              {step === 0 && (
                <motion.div
                  key="config"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-8"
                >
                  {/* Industry */}
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block">
                      ① Select Industry
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {industries.map((ind) => (
                        <button
                          key={ind}
                          onClick={() => setSelectedIndustry(ind)}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                            selectedIndustry === ind
                              ? 'bg-electric/20 border border-electric/40 text-electric'
                              : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Volume */}
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block">
                      ② Monthly Shipment Volume
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {volumeOptions.map((vol) => (
                        <button
                          key={vol.value}
                          onClick={() => setSelectedVolume(vol.value)}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                            selectedVolume === vol.value
                              ? 'bg-electric/20 border border-electric/40 text-electric'
                              : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          {vol.label} shipments
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Complexity */}
                  <div>
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block">
                      ③ Network Complexity
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {complexityOptions.map((comp) => (
                        <button
                          key={comp.value}
                          onClick={() => setSelectedComplexity(comp.value)}
                          className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                            selectedComplexity === comp.value
                              ? 'bg-electric/20 border border-electric/40 text-electric'
                              : 'bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          {comp.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Run button */}
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={runSimulation}
                      disabled={!canRun}
                      className={`px-10 py-3.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                        canRun
                          ? 'bg-electric text-navy-950 hover:bg-electric-light hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] cursor-pointer'
                          : 'bg-white/[0.06] text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Run AI Simulation
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Processing */}
              {step === 1 && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center justify-center min-h-[300px]"
                >
                  {/* Spinner */}
                  <div className="relative w-20 h-20 mb-8">
                    <div className="absolute inset-0 rounded-full border-2 border-white/[0.06]" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-electric animate-spin" />
                    <div className="absolute inset-2 rounded-full border border-transparent border-t-electric/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-electric animate-pulse" />
                    </div>
                  </div>

                  {/* Processing stages */}
                  <div className="space-y-2 w-full max-w-md">
                    {processingStageLabels.map((stage, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 text-xs font-mono transition-all duration-500 ${
                          i <= processingStage ? 'text-slate-300 opacity-100' : 'text-slate-600 opacity-30'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                          i < processingStage ? 'bg-emerald-400' : i === processingStage ? 'bg-electric animate-pulse' : 'bg-slate-700'
                        }`} />
                        {stage}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Results */}
              {step === 2 && results && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Config summary */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-500">
                    <span className="text-electric">{selectedIndustry}</span>
                    <span>•</span>
                    <span>{selectedVolume.toLocaleString()} shipments/mo</span>
                    <span>•</span>
                    <span>Complexity L{selectedComplexity}</span>
                  </div>

                  {/* Key metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Projected Cost Savings', value: `${results.costSaving}%`, color: '#00e5ff' },
                      { label: 'Carbon Reduction', value: `${results.carbonReduction}T/yr`, color: '#10b981' },
                      { label: 'Route Efficiency', value: `${results.routeOptimization}%`, color: '#14b8a6' },
                      { label: 'AI Decisions/Month', value: results.aiDecisions.toLocaleString(), color: '#8b5cf6' },
                    ].map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]"
                      >
                        <div className="text-2xl md:text-3xl font-bold font-mono mb-1" style={{ color: m.color }}>
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{m.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress indicators */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Optimization Metrics</h4>
                      <ProgressBar value={results.costSaving} max={25} color="#00e5ff" label="Cost Optimization" />
                      <ProgressBar value={results.routeOptimization} max={100} color="#14b8a6" label="Route Efficiency" />
                      <ProgressBar value={results.utilizationGain} max={50} color="#f59e0b" label="Utilization Gain" />
                    </div>

                    {/* AI Recommendations */}
                    <div>
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">AI Recommendations</h4>
                      <div className="space-y-2">
                        {results.recommendations.map((rec, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="flex items-start gap-2 text-xs text-slate-400 bg-white/[0.02] rounded-lg px-3 py-2"
                          >
                            <span className="text-electric font-mono mt-0.5 shrink-0">▸</span>
                            {rec}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <button
                      onClick={resetSimulation}
                      className="px-6 py-2.5 rounded-lg text-sm font-medium bg-white/[0.04] border border-white/[0.06] text-slate-300 hover:bg-white/[0.08] transition-all"
                    >
                      Run New Simulation
                    </button>
                    <a
                      href="#contact"
                      className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-electric text-navy-950 hover:bg-electric-light transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                    >
                      Schedule Enterprise Demo →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
