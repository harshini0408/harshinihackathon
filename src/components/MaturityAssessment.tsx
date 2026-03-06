'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Step = 'input' | 'loading' | 'result';

interface FormData {
  fleetSize: string;
  shipmentVolume: string;
  transportModes: string[];
  region: string;
}

const modes = ['FTL', 'LTL', 'Rail', 'Intermodal', 'Last-mile'];
const regions = ['North India', 'South India', 'West India', 'East India', 'Pan-India'];

function scoreMaturity(data: FormData): { score: number; level: string; suggestions: string[] } {
  let score = 30;
  const fleet = parseInt(data.fleetSize) || 0;
  if (fleet > 500) score += 20; else if (fleet > 100) score += 12; else if (fleet > 20) score += 6;
  const vol = parseInt(data.shipmentVolume) || 0;
  if (vol > 5000) score += 20; else if (vol > 1000) score += 12; else if (vol > 200) score += 6;
  score += data.transportModes.length * 5;
  if (data.region === 'Pan-India') score += 10; else score += 5;
  score = Math.min(score, 100);

  const level = score >= 80 ? 'Advanced' : score >= 55 ? 'Intermediate' : 'Developing';
  const suggestions = [
    score < 60 ? 'Implement real-time GPS tracking across fleet' : 'Optimize route prediction models with ML',
    score < 70 ? 'Adopt automated freight benchmarking' : 'Deploy demand forecasting for capacity planning',
    data.transportModes.length < 3 ? 'Explore multi-modal transport for cost efficiency' : 'Integrate carbon tracking into transport decisions',
  ];
  return { score, level, suggestions };
}

export default function MaturityAssessment() {
  const [step, setStep] = useState<Step>('input');
  const [form, setForm] = useState<FormData>({ fleetSize: '', shipmentVolume: '', transportModes: [], region: '' });
  const [result, setResult] = useState<ReturnType<typeof scoreMaturity> | null>(null);

  const toggleMode = (m: string) => {
    setForm((f) => ({
      ...f,
      transportModes: f.transportModes.includes(m) ? f.transportModes.filter((x) => x !== m) : [...f.transportModes, m],
    }));
  };

  const handleSubmit = () => {
    setStep('loading');
    setTimeout(() => {
      setResult(scoreMaturity(form));
      setStep('result');
    }, 1500);
  };

  const canSubmit = form.fleetSize && form.shipmentVolume && form.transportModes.length > 0 && form.region;

  return (
    <section id="maturity" className="section-padding">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">AI Assessment</div>
          <h2 className="section-title mb-4">Logistics Maturity Assessment</h2>
          <p className="section-subtitle mx-auto">Answer 4 questions and get an AI-powered logistics maturity score with optimization suggestions.</p>
        </div>

        <div className="max-w-2xl mx-auto card p-8">
          {step === 'input' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-deep-blue block mb-2">Fleet Size</label>
                <input
                  type="number"
                  value={form.fleetSize}
                  onChange={(e) => setForm({ ...form, fleetSize: e.target.value })}
                  placeholder="e.g. 150"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-deep-blue block mb-2">Monthly Shipment Volume</label>
                <input
                  type="number"
                  value={form.shipmentVolume}
                  onChange={(e) => setForm({ ...form, shipmentVolume: e.target.value })}
                  placeholder="e.g. 2500"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-deep-blue block mb-2">Transport Modes</label>
                <div className="flex flex-wrap gap-2">
                  {modes.map((m) => (
                    <button
                      key={m}
                      onClick={() => toggleMode(m)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        form.transportModes.includes(m)
                          ? 'bg-cyan text-white'
                          : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-deep-blue block mb-2">Operating Region</label>
                <div className="flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setForm({ ...form, region: r })}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                        form.region === r
                          ? 'bg-deep-blue text-white'
                          : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleSubmit} disabled={!canSubmit} className="btn-primary w-full !py-3 disabled:opacity-40">
                Analyze Maturity
              </button>
            </motion.div>
          )}

          {step === 'loading' && (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-2 border-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-neutral-500">AI analyzing your logistics profile...</p>
            </div>
          )}

          {step === 'result' && result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Score ring */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="42" stroke="#E2E8F0" strokeWidth="8" fill="none" />
                    <motion.circle
                      cx="50" cy="50" r="42"
                      stroke="#00B4D8" strokeWidth="8" fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - result.score / 100) }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-deep-blue">{result.score}</span>
                    <span className="text-xs text-neutral-400">/100</span>
                  </div>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  result.level === 'Advanced' ? 'bg-green-50 text-green-600' :
                  result.level === 'Intermediate' ? 'bg-cyan-light text-cyan-hover' :
                  'bg-yellow-50 text-yellow-600'
                }`}>{result.level}</span>
              </div>

              {/* Suggestions */}
              <div>
                <h4 className="text-sm font-semibold text-deep-blue mb-3">Optimization Suggestions</h4>
                <div className="space-y-3">
                  {result.suggestions.map((s, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-soft-grey rounded-lg">
                      <span className="w-6 h-6 rounded-full bg-cyan text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <p className="text-sm text-neutral-600">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => { setStep('input'); setResult(null); }} className="btn-secondary w-full">
                Reassess
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
