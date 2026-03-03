'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function AnimatedMetric({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 50;
          const inc = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
              setValue(target);
              clearInterval(timer);
            } else {
              setValue(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

const differentiators = [
  {
    category: 'Capability',
    logisticsNow: 'Autonomous AI Agents',
    traditional: 'Manual Process Workflows',
    advantage: true,
  },
  {
    category: 'Data Foundation',
    logisticsNow: 'National Freight Benchmark (80K+ lanes)',
    traditional: 'Fragmented, siloed datasets',
    advantage: true,
  },
  {
    category: 'Optimization',
    logisticsNow: 'ML-driven, multi-variable',
    traditional: 'Rule-based, single variable',
    advantage: true,
  },
  {
    category: 'Time to Value',
    logisticsNow: 'Days (plug-and-play)',
    traditional: 'Months of implementation',
    advantage: true,
  },
  {
    category: 'Carbon Tracking',
    logisticsNow: 'Built-in Scope 3 with offsets',
    traditional: 'Manual or third-party add-on',
    advantage: true,
  },
  {
    category: 'Network Effect',
    logisticsNow: 'Grid intelligence shared across ecosystem',
    traditional: 'Isolated per-client data',
    advantage: true,
  },
];

export default function EnterpriseSection() {
  return (    <section id="enterprise" className="relative section-padding overflow-hidden">
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
            <span className="text-[10px] font-mono text-electric uppercase tracking-widest">Enterprise & Investors</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Market Authority </span>
            <span className="text-electric glow-text">& Scale</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Data-driven positioning. Not claims — evidence of national-scale logistics transformation.
          </p>
        </motion.div>

        {/* Impact metrics - large counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { value: 80000, suffix: '+', label: 'Routes Mapped Worldwide', icon: '◈' },
            { value: 2200, suffix: '+', label: 'Carriers / Transporters', icon: '◇' },
            { value: 2, suffix: '.5B+', label: 'USD Logistics Spend Analyzed', icon: '⬡' },
            { value: 3, suffix: '', label: 'Continents Covered', icon: '◉' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center group hover:border-electric/20 transition-all duration-500"
            >
              <div className="text-electric/30 text-xl mb-2 font-mono">{item.icon}</div>
              <div className="metric-value text-3xl md:text-4xl">
                <AnimatedMetric target={item.value} suffix={item.suffix} />
              </div>
              <div className="text-xs text-slate-500 mt-2 uppercase tracking-wider">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Differentiation Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 text-center">
            Competitive Differentiation Matrix
          </h3>          <div className="glass-card overflow-hidden overflow-x-auto">
            {/* Table header */}
            <div className="grid grid-cols-3 px-4 md:px-6 py-3 border-b border-white/[0.06] bg-white/[0.02] min-w-[500px]">
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Dimension</div>
              <div className="text-[11px] font-mono text-electric uppercase tracking-wider text-center">LogisticsNow</div>
              <div className="text-[11px] font-mono text-slate-600 uppercase tracking-wider text-center">Traditional Solutions</div>
            </div>
            {/* Table rows */}
            {differentiators.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="grid grid-cols-3 px-4 md:px-6 py-3 md:py-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors min-w-[500px]"
              >
                <div className="text-xs md:text-sm text-slate-300 font-medium">{row.category}</div>
                <div className="text-xs md:text-sm text-electric/90 text-center flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{row.logisticsNow}</span>
                </div>                <div className="text-xs md:text-sm text-slate-500 text-center">{row.traditional}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market positioning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Testimonial / Trust signals */}
          <div className="glass-card p-6">
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Industry Validation</h3>
            <div className="space-y-4">
              {[
                { quote: 'LoRRI will organize the fragmented logistics industry.', source: 'Head Supply Chain, Fortune 500 Company' },
                { quote: 'Great integration of technology. Drives cost saving and enhances services with potential to change the ecosystem.', source: 'Head Supply Chain, Leading MNC' },
                { quote: 'End to end, one-stop solution with huge potential.', source: 'Head Supply Chain, Leading MNC' },
              ].map((t, i) => (
                <div key={i} className="border-l-2 border-electric/20 pl-4 py-1">
                  <p className="text-sm text-slate-300 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-[11px] text-slate-500 mt-1">— {t.source}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Growth & market */}
          <div className="glass-card p-6">
            <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Market Opportunity</h3>
            <div className="space-y-6">
              {/* TAM */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-slate-400">India Logistics Market</span>
                  <span className="text-lg font-bold font-mono text-electric">$380B</span>
                </div>
                <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-electric/60 to-electric/20 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              {/* SAM */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-slate-400">Enterprise Logistics Tech (SAM)</span>
                  <span className="text-lg font-bold font-mono text-electric">$12B</span>
                </div>
                <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-electric/60 to-electric/20 rounded-full" style={{ width: '38%' }} />
                </div>
              </div>
              {/* SOM */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-slate-400">Addressable Near-term (SOM)</span>
                  <span className="text-lg font-bold font-mono text-electric">$800M</span>
                </div>
                <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-electric/60 to-electric/20 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.04]">
                <p className="text-xs text-slate-500 leading-relaxed">
                  India&apos;s logistics cost as % of GDP is 13-14% vs 8-9% in developed economies. 
                  AI-driven optimization represents a multi-billion dollar opportunity to close this gap.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
