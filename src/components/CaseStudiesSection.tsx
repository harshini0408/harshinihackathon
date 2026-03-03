'use client';

import { motion } from 'framer-motion';

const caseStudies = [
  {
    industry: 'FMCG',
    company: 'Fortune 500 FMCG Manufacturer',
    challenge: 'Manual freight procurement across 1,200+ lanes with no rate benchmarking, leading to 15-20% cost overruns.',
    solution: 'Deployed LoRRI Procurement Agent with National Freight Benchmark integration for automated RFQ generation and carrier scoring.',
    results: [
      { metric: '18%', label: 'Cost Reduction' },
      { metric: '3x', label: 'Faster Procurement' },
      { metric: '1,200+', label: 'Lanes Optimized' },
    ],
    quote: 'LoRRI will organize the fragmented logistics industry.',
    quoteSource: 'Head of Supply Chain',
    color: '#00e5ff',
  },
  {
    industry: 'Automotive',
    company: 'Leading Automotive OEM',
    challenge: 'Complex multi-modal supply chain with no visibility into Scope 3 emissions across 800+ suppliers.',
    solution: 'Implemented Carbon Intelligence System with green route selection and ESG report automation.',
    results: [
      { metric: '840T', label: 'CO₂ Reduced' },
      { metric: '92%', label: 'ESG Compliance' },
      { metric: '₹4.2Cr', label: 'Annual Savings' },
    ],
    quote: 'Great integration of technology. Drives cost saving and enhances services.',
    quoteSource: 'Head of Supply Chain',
    color: '#10b981',
  },
  {
    industry: 'Chemicals',
    company: 'Global Specialty Chemicals MNC',
    challenge: 'Fragmented carrier base with inconsistent service levels and no data-driven vendor evaluation.',
    solution: 'Deployed AI-powered vendor scoring with benchmark-driven pricing and load consolidation engine.',
    results: [
      { metric: '34%', label: 'Better Utilization' },
      { metric: '22%', label: 'Fewer Carriers' },
      { metric: '99.2%', label: 'On-time Delivery' },
    ],
    quote: 'End to end, one-stop solution with huge potential.',
    quoteSource: 'Head of Supply Chain',
    color: '#8b5cf6',
  },
];

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative section-padding overflow-hidden">
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
            <span className="text-[10px] font-mono text-electric uppercase tracking-widest">Customer Success</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Real Results, </span>
            <span className="text-electric glow-text">Proven Impact</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            See how enterprises across industries are transforming logistics operations with the Intelligence Grid.
          </p>
        </motion.div>

        {/* Case Study Cards */}
        <div className="space-y-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="glass-card p-6 md:p-8 hover:border-white/10 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Left: Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                      style={{ backgroundColor: `${cs.color}15`, color: cs.color }}
                    >
                      {cs.industry}
                    </span>
                    <span className="text-xs text-slate-500">{cs.company}</span>
                  </div>

                  <div className="mb-3">
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Challenge</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{cs.challenge}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Solution</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{cs.solution}</p>
                  </div>

                  {/* Quote */}
                  <div className="border-l-2 pl-4 py-1" style={{ borderColor: `${cs.color}40` }}>
                    <p className="text-sm text-slate-300 italic">&ldquo;{cs.quote}&rdquo;</p>
                    <p className="text-[11px] text-slate-500 mt-1">— {cs.quoteSource}, {cs.company}</p>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="flex md:flex-col gap-4 md:gap-3 md:min-w-[160px]">
                  {cs.results.map((r, j) => (
                    <div
                      key={j}
                      className="flex-1 md:flex-none rounded-xl p-3 text-center border"
                      style={{ backgroundColor: `${cs.color}08`, borderColor: `${cs.color}15` }}
                    >
                      <div className="text-xl md:text-2xl font-bold font-mono" style={{ color: cs.color }}>
                        {r.metric}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
