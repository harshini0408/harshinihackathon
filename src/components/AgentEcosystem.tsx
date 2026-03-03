'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const agents = [
  {
    id: 'procurement',
    name: 'Procurement Agent',
    shortName: 'PROC',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    color: '#00e5ff',
    description: 'Autonomous RFQ generation, vendor scoring, and strategic sourcing powered by the National Freight Benchmark.',
    capabilities: ['Automated RFQ Generation', 'Vendor Intelligence Scoring', 'Benchmark-driven Pricing', 'Multi-modal Procurement'],
    metrics: { label: 'Avg. Savings', value: '12-18%' },
    simulation: 'Analyzing 2,400 lanes → Clustering shipments → Generating strategic RFQs → Scoring 340 carriers → Optimizing award scenarios...',
  },
  {
    id: 'route',
    name: 'Route Optimization Engine',
    shortName: 'ROUTE',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    color: '#14b8a6',
    description: 'Multi-variable route intelligence combining distance, cost, time, emissions, and infrastructure constraints.',
    capabilities: ['Dynamic Lane Intelligence', 'Multi-modal Routing', 'Constraint-based Optimization', 'Real-time Re-routing'],
    metrics: { label: 'Routes Optimized', value: '80,000+' },
    simulation: 'Ingesting live traffic data → Mapping infrastructure constraints → Computing 12,000 route permutations → Selecting optimal paths...',
  },
  {
    id: 'load',
    name: 'Load Consolidation Engine',
    shortName: 'LOAD',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    color: '#f59e0b',
    description: 'Intelligent shipment clustering that maximizes truck utilization and minimizes empty miles across the network.',
    capabilities: ['Shipment Clustering', 'FTL/LTL Optimization', 'Cross-dock Planning', 'Network Balancing'],
    metrics: { label: 'Utilization Boost', value: '+34%' },
    simulation: 'Scanning 5,600 pending shipments → Clustering by geography & time → Computing consolidation scenarios → Maximizing payload utilization...',
  },
  {
    id: 'carbon',
    name: 'Carbon Intelligence System',
    shortName: 'CO₂',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    color: '#10b981',
    description: 'Real-time carbon footprint tracking and reduction strategies across your logistics network with Scope 3 emissions reporting.',
    capabilities: ['Scope 3 Tracking', 'Green Route Selection', 'Carbon Offset Integration', 'ESG Report Generation'],
    metrics: { label: 'Carbon Reduced', value: '3,240T' },
    simulation: 'Computing emission baselines → Analyzing modal shift opportunities → Recommending green corridors → Generating ESG compliance report...',
  },
  {
    id: 'data',
    name: 'Data Cleaning Agent',
    shortName: 'DATA',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    color: '#8b5cf6',
    description: 'Transforms messy logistics data into clean, structured intelligence. Normalizes addresses, validates rates, deduplicates records.',
    capabilities: ['Address Normalization', 'Rate Validation', 'Duplicate Detection', 'Schema Standardization'],
    metrics: { label: 'Data Accuracy', value: '99.4%' },
    simulation: 'Ingesting raw shipment data → Detecting 847 anomalies → Normalizing 12,400 addresses → Validating rate structures → Building clean dataset...',
  },
];

export default function AgentEcosystem() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationText, setSimulationText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const runSimulation = useCallback((agent: typeof agents[0]) => {
    // Clear any existing simulation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setSimulationActive(true);
    setSimulationText('');
    const words = agent.simulation.split(' ');
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < words.length) {
        setSimulationText((prev) => prev + (i > 0 ? ' ' : '') + words[i]);
        i++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setSimulationActive(false), 2000);
      }
    }, 80);
  }, []);

  const handleAgentClick = useCallback((agent: typeof agents[0]) => {
    if (agent.id === activeAgent) {
      setActiveAgent(null);
      if (intervalRef.current) clearInterval(intervalRef.current);
      setSimulationActive(false);
      setSimulationText('');
    } else {
      setActiveAgent(agent.id);
      runSimulation(agent);
    }
  }, [activeAgent, runSimulation]);

  const selected = agents.find((a) => a.id === activeAgent);

  return (    <section id="agents" className="relative section-padding overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] mb-6">
            <span className="text-[10px] font-mono text-electric uppercase tracking-widest">Agent Ecosystem</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">The LoRRI </span>
            <span className="text-electric glow-text">Agent Hive</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            An interconnected network of AI agents operating as an autonomous logistics operating system.
            Not features — intelligent systems.
          </p>
        </motion.div>

        {/* Agent Network Visualization */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Agent nodes - left side */}
          <div className="lg:col-span-5 space-y-3">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onClick={() => handleAgentClick(agent)}
                className={`glass-card p-4 cursor-pointer transition-all duration-500 group ${
                  activeAgent === agent.id
                    ? 'border-electric/30 bg-white/[0.06] shadow-[0_0_30px_rgba(0,229,255,0.08)]'
                    : 'hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Agent icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${
                      activeAgent === agent.id ? 'bg-electric/20' : 'bg-white/[0.04]'
                    }`}
                    style={{ color: agent.color }}
                  >
                    {agent.icon}
                  </div>

                  {/* Agent info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-white truncate">{agent.name}</h3>
                      <span className="text-[10px] font-mono text-slate-500 bg-white/[0.04] px-2 py-0.5 rounded shrink-0">
                        {agent.shortName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{agent.description}</p>
                  </div>

                  {/* Status indicator */}
                  <div className={`w-2 h-2 rounded-full shrink-0 ${activeAgent === agent.id ? 'bg-electric' : 'bg-emerald-500/60'}`}
                    style={{ boxShadow: activeAgent === agent.id ? '0 0 8px #00e5ff' : '0 0 4px rgba(16,185,129,0.4)' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Agent detail panel - right side */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card p-6 md:p-8 relative overflow-hidden"
                  >
                    {/* Scan line effect */}
                    <div className="absolute inset-0 scan-line pointer-events-none" />

                    {/* Colored top accent */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${selected.color}60, transparent)` }} />

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2.5 rounded-xl bg-white/[0.04]" style={{ color: selected.color }}>
                            {selected.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{selected.name}</h3>
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                              Agent Active • v3.2.1
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-mono" style={{ color: selected.color }}>
                          {selected.metrics.value}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{selected.metrics.label}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{selected.description}</p>

                    {/* Capabilities */}
                    <div className="mb-6">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                        Core Capabilities
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selected.capabilities.map((cap, i) => (
                          <motion.div
                            key={cap}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 text-xs text-slate-300 bg-white/[0.03] rounded-lg px-3 py-2.5 border border-white/[0.03]"
                          >
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: selected.color }} />
                            {cap}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Live simulation */}
                    <div className="bg-navy-950/60 rounded-xl p-4 border border-white/[0.04]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-2 rounded-full ${simulationActive ? 'bg-electric animate-pulse' : 'bg-emerald-500'}`} />
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                          {simulationActive ? 'Agent Processing...' : 'Simulation Complete'}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-slate-400 leading-relaxed min-h-[48px]">
                        <span className="text-electric/80">{'>'}</span> {simulationText}
                        {simulationActive && <span className="animate-pulse text-electric ml-0.5">▊</span>}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-8 flex flex-col items-center justify-center text-center min-h-[420px]"
                  >
                    {/* Neural network illustration */}
                    <svg className="w-32 h-32 mb-6 text-electric/20" viewBox="0 0 100 100">
                      {/* Central node */}
                      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.6">
                        <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
                      </circle>
                      {/* Orbital nodes */}
                      {[0, 72, 144, 216, 288].map((angle, i) => {
                        const rad = (angle * Math.PI) / 180;
                        const x = 50 + 30 * Math.cos(rad);
                        const y = 50 + 30 * Math.sin(rad);
                        return (
                          <g key={i}>
                            <line x1="50" y1="50" x2={x} y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeDasharray="4,2" className="node-connection" />
                            <circle cx={x} cy={y} r="4" fill="currentColor" opacity="0.4">
                              <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                            </circle>
                          </g>
                        );
                      })}
                    </svg>
                    <h3 className="text-lg font-semibold text-white mb-2">Select an AI Agent</h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      Click any agent to view its capabilities, live metrics, and run a real-time processing simulation.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
