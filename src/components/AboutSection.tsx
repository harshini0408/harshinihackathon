'use client';

import { motion } from 'framer-motion';

const timeline = [
  { year: '2019', title: 'Founded', desc: 'LogisticsNow established in Mumbai with a vision to digitize India\'s logistics.' },
  { year: '2020', title: 'LoRRI v1 Launch', desc: 'First version of the Logistics Rate & Route Intelligence platform goes live.' },
  { year: '2021', title: 'National Freight Benchmark', desc: 'Built India\'s largest freight rate benchmark covering 40,000+ lanes.' },
  { year: '2022', title: 'AI Agent Architecture', desc: 'Introduced autonomous AI agents for procurement and route optimization.' },
  { year: '2023', title: '80K+ Routes', desc: 'Expanded to 80,000+ routes across 3 continents with 2,200+ carriers.' },
  { year: '2024', title: 'Intelligence Grid', desc: 'Launched the National Logistics Intelligence Grid — India\'s logistics operating system.' },
];

const team = [
  { role: 'Leadership', count: 4, focus: 'Strategy & Vision' },
  { role: 'Engineering', count: 18, focus: 'AI, ML & Platform' },
  { role: 'Data Science', count: 8, focus: 'Analytics & Intelligence' },
  { role: 'Operations', count: 6, focus: 'Customer Success' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
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
            <span className="text-[10px] font-mono text-electric uppercase tracking-widest">About Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Our Mission: </span>
            <span className="text-electric glow-text">AI-Led Logistics Transformation</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            LogisticsNow is building the digital backbone of India&apos;s logistics ecosystem —
            replacing fragmented, manual processes with autonomous AI intelligence at national scale.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center text-electric">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Vision</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              To build India&apos;s National Logistics Intelligence Grid — a unified, AI-powered
              platform that connects every stakeholder in the supply chain, enabling data-driven
              decisions that reduce costs, cut emissions, and accelerate commerce at national scale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center text-electric">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Mission</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Deploy autonomous AI agents that replace manual logistics workflows — from procurement
              and rate benchmarking to route optimization and carbon tracking — making intelligence
              accessible to every enterprise, carrier, and logistics professional in the ecosystem.
            </p>
          </motion.div>
        </div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-8 text-center">Our Journey</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-4 text-center group hover:border-electric/20 transition-all duration-500"
              >
                <div className="text-2xl font-bold font-mono text-electric mb-1">{item.year}</div>
                <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 text-center">Team Composition</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((t, i) => (
              <motion.div
                key={t.role}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 text-center hover:border-electric/20 transition-all"
              >
                <div className="text-3xl font-bold font-mono text-electric">{t.count}</div>
                <div className="text-sm font-semibold text-white mt-1">{t.role}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{t.focus}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
