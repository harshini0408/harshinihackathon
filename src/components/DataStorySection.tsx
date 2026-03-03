'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    stage: '01',
    title: 'Raw Data Ingestion',
    subtitle: 'Dirty, unstructured logistics data',
    description: 'Millions of shipment records, carrier invoices, rate cards, and logistics events flow in from multiple sources — spreadsheets, ERPs, emails, PDFs.',
    visual: 'CHAOS',
    color: '#ef4444',
    tags: ['CSV Dumps', 'PDFs', 'ERP Exports', 'Email Chains', 'Manual Logs'],
  },
  {
    stage: '02',
    title: 'AI Data Cleaning',
    subtitle: 'Autonomous normalization & validation',
    description: 'The Data Cleaning Agent normalizes addresses, deduplicates records, validates rate structures, and standardizes schemas — automatically.',
    visual: 'PROCESSING',
    color: '#f59e0b',
    tags: ['Address Normalization', 'Deduplication', 'Rate Validation', 'Schema Mapping'],
  },
  {
    stage: '03',
    title: 'Lane Intelligence Building',
    subtitle: 'Clustering & benchmark mapping',
    description: 'Clean data is clustered into intelligent lane groups, mapped against the National Freight Benchmark, and enriched with market intelligence.',
    visual: 'STRUCTURING',
    color: '#14b8a6',
    tags: ['Lane Clustering', 'Benchmark Mapping', 'Market Intelligence', 'Trend Analysis'],
  },
  {
    stage: '04',
    title: 'Strategic RFQ Generation',
    subtitle: 'AI-powered procurement intelligence',
    description: 'The Procurement Agent generates strategic RFQs with optimal lane groupings, data-backed rate targets, and intelligent carrier shortlists.',
    visual: 'INTELLIGENCE',
    color: '#00e5ff',
    tags: ['Strategic RFQs', 'Rate Targets', 'Carrier Scoring', 'Award Optimization'],
  },
];

export default function DataStorySection() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] mb-6">
            <span className="text-[10px] font-mono text-electric uppercase tracking-widest">Data Intelligence Pipeline</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">From Dirty Data to </span>
            <span className="text-electric glow-text">Strategic Intelligence</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Watch how the LogisticsNow AI pipeline transforms raw, messy logistics data 
            into actionable procurement strategies — autonomously.
          </p>
        </motion.div>        {/* Pipeline steps */}
        <div className="relative">
          {/* Vertical connection line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px">
            <div className="h-full bg-gradient-to-b from-red-500/20 via-amber-500/20 to-electric/20" />
            {/* Animated flow dot */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-electric/60"
              style={{ filter: 'blur(1px)' }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.stage}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative flex gap-6 md:gap-10"
              >
                {/* Stage indicator */}
                <div className="relative z-10 shrink-0">
                  <div
                    className="w-16 h-16 md:w-24 md:h-24 rounded-2xl flex flex-col items-center justify-center border transition-all"
                    style={{
                      backgroundColor: `${step.color}08`,
                      borderColor: `${step.color}25`,
                    }}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: `${step.color}80` }}>
                      Stage
                    </span>
                    <span className="text-xl md:text-2xl font-bold font-mono" style={{ color: step.color }}>
                      {step.stage}
                    </span>
                  </div>
                  {/* Connection dot */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex flex-col items-center mt-2">
                      <div className="w-px h-8" style={{ backgroundColor: `${step.color}20` }} />
                      <svg className="w-3 h-3" style={{ color: `${step.color}40` }} viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 9L1 4h10L6 9z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 glass-card p-5 md:p-6 hover:border-white/10 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">{step.subtitle}</p>
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-1 rounded"
                      style={{ backgroundColor: `${step.color}15`, color: step.color }}
                    >
                      {step.visual}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{step.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-[10px] font-medium border"
                        style={{
                          backgroundColor: `${step.color}06`,
                          borderColor: `${step.color}15`,
                          color: `${step.color}aa`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Result indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 ml-[5.5rem] md:ml-[8.5rem] glass-card p-6 border-electric/20 bg-electric/[0.03]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center text-electric">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-electric">Output: Strategic Procurement Intelligence</h3>
                <p className="text-sm text-slate-400">
                  Clean data → Intelligent lanes → Optimized RFQs → 12-18% average cost savings
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
