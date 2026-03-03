'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const layers = [
  {
    name: 'Enterprise Application Layer',
    shortName: 'APP',
    color: '#00e5ff',
    items: ['LoRRI Platform', 'Shipper Portal', 'Carrier Portal', 'Analytics Dashboard'],
    description: 'User-facing applications for shippers, carriers, and enterprise teams',
    metrics: { throughput: '12K req/s', latency: '85ms' },
  },
  {
    name: 'AI Agent Orchestration Layer',
    shortName: 'AGT',
    color: '#14b8a6',
    items: ['Procurement Agent', 'Route Engine', 'Load Optimizer', 'Carbon System', 'Data Cleaner'],
    description: 'Autonomous AI agents executing logistics intelligence in real-time',
    metrics: { throughput: '8K ops/s', latency: '45ms' },
  },
  {
    name: 'Intelligence & Analytics Layer',
    shortName: 'INT',
    color: '#8b5cf6',
    items: ['National Freight Benchmark', 'Lane Intelligence Builder', 'Predictive Analytics', 'ML Pipeline'],
    description: 'Core intelligence engine powering data-driven logistics decisions',
    metrics: { throughput: '5K qps', latency: '120ms' },
  },
  {
    name: 'Data Ingestion & Processing Layer',
    shortName: 'DAT',
    color: '#f59e0b',
    items: ['ETL Pipeline', 'Real-time Stream', 'Data Lake', 'API Gateway'],
    description: 'High-throughput data processing handling millions of logistics events',
    metrics: { throughput: '2.4M/day', latency: '30ms' },
  },
  {
    name: 'National Logistics Grid Foundation',
    shortName: 'GRD',
    color: '#ef4444',
    items: ['80,000+ Routes', '2,200+ Carriers', '$2.5B+ Spend Data', 'Multi-continent Coverage'],
    description: 'The foundational data backbone — India\'s most comprehensive logistics dataset',
    metrics: { throughput: '∞ scale', latency: '<10ms' },
  },
];

const stats = [
  {
    title: 'Data Ingested Daily',
    value: '2.4M+',
    subtitle: 'logistics events processed',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
  {
    title: 'Grid Uptime',
    value: '99.97%',
    subtitle: 'enterprise-grade reliability',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'API Latency',
    value: '<120ms',
    subtitle: 'average response time',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function InfrastructureSection() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const toggleLayer = useCallback((i: number) => {
    setExpandedLayer((prev) => (prev === i ? null : i));
  }, []);

  return (    <section id="infrastructure" className="relative section-padding overflow-hidden">
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
            <span className="w-1.5 h-1.5 rounded-full bg-electric live-indicator" />
            <span className="text-[10px] font-mono text-electric uppercase tracking-widest">Architecture</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">National Logistics </span>
            <span className="text-electric glow-text">Transformation Framework</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            LogisticsNow isn&apos;t a SaaS tool — it&apos;s infrastructure. A multi-layer architecture
            designed to serve as the digital backbone of India&apos;s logistics ecosystem.
          </p>
        </motion.div>

        {/* Infrastructure Stack */}
        <div className="space-y-3 mb-20" role="list" aria-label="Infrastructure layers">
          {layers.map((layer, i) => {
            const isExpanded = expandedLayer === i;
            const isHovered = hoveredLayer === i;

            return (
              <motion.div
                key={layer.name}
                role="listitem"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredLayer(i)}
                onMouseLeave={() => setHoveredLayer(null)}
                className="relative group"
              >
                {/* Colored top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${layer.color}${isHovered || isExpanded ? '80' : '30'}, transparent)`,
                  }}
                />

                <div
                  className="glass-card p-4 md:p-6 cursor-pointer transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.1]"
                  style={{
                    borderColor: isExpanded ? `${layer.color}30` : undefined,
                    boxShadow: isExpanded ? `0 0 30px ${layer.color}08` : undefined,
                  }}
                  onClick={() => toggleLayer(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLayer(i); } }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-label={`${layer.name} - click to ${isExpanded ? 'collapse' : 'expand'} details`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                    {/* Layer indicator */}
                    <div className="flex items-center gap-3 md:w-80 shrink-0">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 shrink-0"
                        style={{
                          backgroundColor: `${layer.color}${isHovered || isExpanded ? '25' : '15'}`,
                          color: layer.color,
                          boxShadow: isHovered || isExpanded ? `0 0 15px ${layer.color}20` : 'none',
                        }}
                      >
                        L{layers.length - i}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white truncate">{layer.name}</h3>
                          <span
                            className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shrink-0"
                            style={{ backgroundColor: `${layer.color}15`, color: layer.color }}
                          >
                            {layer.shortName}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 hidden md:block truncate">{layer.description}</p>
                      </div>
                    </div>

                    {/* Layer connection line */}
                    <div
                      className="hidden md:block flex-1 h-px transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, ${layer.color}40, ${layer.color}10)`,
                        opacity: isHovered ? 1 : 0.6,
                      }}
                    />

                    {/* Components */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 md:px-3 py-1 md:py-1.5 rounded-md text-[10px] md:text-[11px] font-medium border transition-all duration-300"
                          style={{
                            backgroundColor: `${layer.color}${isHovered ? '12' : '08'}`,
                            borderColor: `${layer.color}${isHovered ? '35' : '20'}`,
                            color: `${layer.color}cc`,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Expand chevron */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="hidden md:flex items-center justify-center w-6 h-6 shrink-0"
                    >
                      <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-white/[0.04]">
                          <p className="text-sm text-slate-400 mb-4 md:hidden">{layer.description}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                              <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Throughput</div>
                              <div className="text-sm font-semibold font-mono" style={{ color: layer.color }}>{layer.metrics.throughput}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                              <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Latency</div>
                              <div className="text-sm font-semibold font-mono" style={{ color: layer.color }}>{layer.metrics.latency}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                              <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Status</div>
                              <div className="flex items-center gap-1.5">
                                <span className="status-dot" />
                                <span className="text-sm font-semibold text-emerald-400">Online</span>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                              <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">Components</div>
                              <div className="text-sm font-semibold text-white">{layer.items.length} active</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Connection to next layer */}
                {i < layers.length - 1 && (
                  <div className="flex justify-center mt-3 -mb-3 relative z-10">
                    <div className="flex flex-col items-center">
                      <motion.div
                        className="w-px h-3 md:h-4"
                        style={{ backgroundColor: `${layer.color}30` }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                      <svg className="w-3 h-3" style={{ color: `${layer.color}60` }} viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 9L1 4h10L6 9z" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Data flow summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="glass-card p-6 text-center group hover:border-electric/20 transition-all duration-500 relative overflow-hidden"
            >
              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none" />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mx-auto mb-4 text-electric group-hover:bg-electric/20 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="metric-value text-3xl mb-1">{stat.value}</div>
                <h3 className="text-sm font-semibold text-white mb-1">{stat.title}</h3>
                <p className="text-xs text-slate-500">{stat.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
