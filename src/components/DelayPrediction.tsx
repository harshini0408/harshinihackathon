'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const routes = [
  'Delhi → Mumbai', 'Mumbai → Bengaluru', 'Delhi → Kolkata', 'Chennai → Hyderabad',
  'Ahmedabad → Delhi', 'Pune → Chennai', 'Bengaluru → Kolkata', 'Jaipur → Mumbai',
];

const weatherOptions = ['Clear', 'Rain', 'Fog', 'Heavy Rain', 'Storm'];
const trafficOptions = ['Low', 'Moderate', 'High', 'Severe'];

interface PredictionResult {
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  estimatedDelay: string;
  factors: { name: string; impact: number }[];
  recommendation: string;
}

function predictDelay(route: string, weather: string, traffic: string): PredictionResult {
  let base = 15;
  const wi = weatherOptions.indexOf(weather);
  const ti = trafficOptions.indexOf(traffic);
  base += wi * 12 + ti * 15 + (routes.indexOf(route) % 3) * 5;
  base = Math.min(base, 98);

  const factors = [
    { name: 'Weather Impact', impact: wi * 18 + 5 },
    { name: 'Traffic Congestion', impact: ti * 22 + 8 },
    { name: 'Historical Delays', impact: 10 + (routes.indexOf(route) % 4) * 8 },
    { name: 'Route Distance', impact: 5 + (routes.indexOf(route) % 5) * 4 },
  ].sort((a, b) => b.impact - a.impact);

  const riskLevel: PredictionResult['riskLevel'] = base >= 75 ? 'Critical' : base >= 50 ? 'High' : base >= 30 ? 'Medium' : 'Low';
  const estimatedDelay = base >= 75 ? '4-8 hours' : base >= 50 ? '2-4 hours' : base >= 30 ? '1-2 hours' : '<30 min';
  const recommendations: Record<string, string> = {
    Critical: 'Reroute shipment immediately. Consider alternative carriers or transport modes.',
    High: 'Alert driver and receiver. Prepare backup delivery plan.',
    Medium: 'Monitor route actively. Adjust ETA communication to receiver.',
    Low: 'No action needed. Shipment expected to arrive on time.',
  };

  return { riskScore: base, riskLevel, estimatedDelay, factors, recommendation: recommendations[riskLevel] };
}

export default function DelayPrediction() {
  const [route, setRoute] = useState('');
  const [weather, setWeather] = useState('');
  const [traffic, setTraffic] = useState('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    if (!route || !weather || !traffic) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(predictDelay(route, weather, traffic));
      setLoading(false);
    }, 1500);
  };

  const riskColor = (level: string) =>
    level === 'Critical' ? 'text-red-600 bg-red-50' :
    level === 'High' ? 'text-orange-600 bg-orange-50' :
    level === 'Medium' ? 'text-yellow-600 bg-yellow-50' :
    'text-green-600 bg-green-50';

  return (
    <section id="delay-prediction" className="section-padding">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">AI Prediction</div>
          <h2 className="section-title mb-4">Predictive Delay Detection</h2>
          <p className="section-subtitle mx-auto">AI predicts delivery delays based on traffic, weather, and historical route data.</p>
        </div>

        <div className="max-w-2xl mx-auto card p-8">
          <div className="space-y-5 mb-6">
            <div>
              <label className="text-sm font-medium text-deep-blue block mb-2">Route</label>
              <select value={route} onChange={(e) => setRoute(e.target.value)} className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                <option value="">Select route</option>
                {routes.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-deep-blue block mb-2">Weather Condition</label>
                <select value={weather} onChange={(e) => setWeather(e.target.value)} className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                  <option value="">Select weather</option>
                  {weatherOptions.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-deep-blue block mb-2">Traffic Level</label>
                <select value={traffic} onChange={(e) => setTraffic(e.target.value)} className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none">
                  <option value="">Select traffic</option>
                  {trafficOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </div>

          <button onClick={handlePredict} disabled={!route || !weather || !traffic || loading} className="btn-primary w-full !py-3 disabled:opacity-40">
            {loading ? 'Analyzing route...' : 'Predict Delay Risk'}
          </button>

          {result && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 space-y-6">
              {/* Risk gauge */}
              <div className="text-center p-6 bg-soft-grey rounded-xl">
                <div className="relative w-28 h-28 mx-auto mb-3">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="#E2E8F0" strokeWidth="10" fill="none" />
                    <motion.circle cx="50" cy="50" r="40"
                      stroke={result.riskScore >= 75 ? '#DC2626' : result.riskScore >= 50 ? '#F97316' : result.riskScore >= 30 ? '#EAB308' : '#22C55E'}
                      strokeWidth="10" fill="none" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - result.riskScore / 100) }}
                      transition={{ duration: 1 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-deep-blue">{result.riskScore}</span>
                  </div>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${riskColor(result.riskLevel)}`}>
                  {result.riskLevel} Risk
                </span>
                <div className="text-sm text-neutral-500 mt-2">Estimated delay: <strong>{result.estimatedDelay}</strong></div>
              </div>

              {/* Contributing factors */}
              <div>
                <h4 className="text-sm font-semibold text-deep-blue mb-3">Contributing Factors</h4>
                <div className="space-y-3">
                  {result.factors.map((f) => (
                    <div key={f.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-neutral-600">{f.name}</span>
                        <span className="text-neutral-400">{f.impact}%</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${f.impact}%` }}
                          transition={{ duration: 0.6 }}
                          className="h-full rounded-full bg-cyan"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div className="p-4 bg-cyan-light rounded-lg border border-cyan/10">
                <div className="text-xs font-semibold text-cyan uppercase tracking-wider mb-1">AI Recommendation</div>
                <p className="text-sm text-deep-blue">{result.recommendation}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
