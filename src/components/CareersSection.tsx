'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const pillars = [
  {
    title: 'AI & Machine Learning Lab',
    description: 'Build autonomous agents that make real logistics decisions. Reinforcement learning, NLP for document processing, predictive models for rate intelligence.',
    color: '#00e5ff',
    openings: 3,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: 'Systems Architecture',
    description: 'Design the backbone of national logistics infrastructure. Distributed systems processing millions of events. Real-time data pipelines at scale.',
    color: '#14b8a6',
    openings: 2,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: 'Data Science & Analytics',
    description: 'Work with India\'s largest logistics dataset. Build the National Freight Benchmark. Create models that predict market movements and optimize across 80K+ lanes.',
    color: '#8b5cf6',
    openings: 4,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: 'Product & Design Thinking',
    description: 'Transform complex logistics workflows into intuitive experiences. Design command-center interfaces that put intelligence at users\' fingertips.',
    color: '#f59e0b',
    openings: 2,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
];

const workStyle = [
  { text: 'Small, high-impact teams', icon: '▸' },
  { text: 'Ship daily to production', icon: '▸' },
  { text: 'Data over opinions', icon: '▸' },
  { text: 'Ownership, not tasks', icon: '▸' },
];

export default function CareersSection() {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  return (    <section id="careers" className="relative section-padding overflow-hidden">
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
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-indicator" />
            <span className="text-[10px] font-mono text-electric uppercase tracking-widest">Join the Mission</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Build the Intelligence Layer </span>
            <br className="hidden md:block" />
            <span className="text-electric glow-text">of India&apos;s Logistics Future</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg">
            We&apos;re not hiring for jobs. We&apos;re assembling the team that will build
            the national logistics operating system. Engineers, researchers, builders.
          </p>
        </motion.div>

        {/* Engineering pillars */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -3, transition: { duration: 0.3 } }}
              onMouseEnter={() => setHoveredPillar(i)}
              onMouseLeave={() => setHoveredPillar(null)}
              className="relative glass-card p-6 group overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.12]"
            >
              {/* Colored top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${pillar.color}${hoveredPillar === i ? '80' : '30'}, transparent)`,
                }}
              />

              {/* Shimmer on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 shimmer pointer-events-none" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                    style={{
                      backgroundColor: `${pillar.color}15`,
                      color: pillar.color,
                      boxShadow: hoveredPillar === i ? `0 0 20px ${pillar.color}20` : 'none',
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                    style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
                  >
                    {pillar.openings} {pillar.openings === 1 ? 'opening' : 'openings'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-electric/90 transition-colors duration-300">{pillar.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{pillar.description}</p>
                <a
                  href={`mailto:connect@logisticsnow.in?subject=Career Inquiry — ${pillar.title}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-300 group-hover:gap-2.5"
                  style={{ color: pillar.color }}
                  aria-label={`Apply for ${pillar.title}`}
                >
                  Explore role
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Culture strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-6 md:p-8 relative overflow-hidden"
        >
          {/* Scan line */}
          <div className="absolute inset-0 pointer-events-none scan-line" />

          <div className="relative grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-[10px] font-mono text-electric uppercase tracking-widest mb-3">How We Work</h4>
              <ul className="space-y-2 text-sm text-slate-400" role="list">
                {workStyle.map((item) => (
                  <li key={item.text} className="flex items-start gap-2 group/item">
                    <span className="text-electric mt-0.5 transition-transform duration-200 group-hover/item:translate-x-0.5">{item.icon}</span>
                    <span className="group-hover/item:text-slate-300 transition-colors duration-200">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono text-electric uppercase tracking-widest mb-3">Impact Scale</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Your code will optimize logistics for Fortune 500 companies, reduce carbon emissions
                at national scale, and shape how goods move across India.
              </p>
              <a
                href="mailto:connect@logisticsnow.in?subject=Career Inquiry"
                className="inline-flex items-center gap-2 text-sm text-electric hover:text-electric-light transition-colors duration-300 group/cta btn-glow px-4 py-2 rounded-lg border border-electric/20 hover:border-electric/40"
                aria-label="Explore career opportunities at LogisticsNow"
              >
                Explore Opportunities
                <svg className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </motion.div>      </div>
    </section>
  );
}
