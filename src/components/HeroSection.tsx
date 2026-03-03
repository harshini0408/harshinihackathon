'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// India map node positions (approximate screen coordinates for major logistics hubs)
const indiaNodes = [
  { id: 'DEL', name: 'New Delhi', x: 42, y: 22, size: 8 },
  { id: 'MUM', name: 'Mumbai', x: 30, y: 52, size: 9 },
  { id: 'CHN', name: 'Chennai', x: 48, y: 72, size: 7 },
  { id: 'KOL', name: 'Kolkata', x: 62, y: 38, size: 7 },
  { id: 'BLR', name: 'Bengaluru', x: 40, y: 72, size: 7 },
  { id: 'HYD', name: 'Hyderabad', x: 43, y: 58, size: 6 },
  { id: 'AMD', name: 'Ahmedabad', x: 26, y: 38, size: 6 },
  { id: 'PUN', name: 'Pune', x: 32, y: 56, size: 5 },
  { id: 'JAI', name: 'Jaipur', x: 35, y: 28, size: 5 },
  { id: 'LKO', name: 'Lucknow', x: 50, y: 27, size: 5 },
  { id: 'CHG', name: 'Chandigarh', x: 39, y: 16, size: 4 },
  { id: 'IND', name: 'Indore', x: 35, y: 42, size: 4 },
  { id: 'COC', name: 'Kochi', x: 38, y: 80, size: 4 },
  { id: 'VIS', name: 'Visakhapatnam', x: 54, y: 55, size: 4 },
  { id: 'NAG', name: 'Nagpur', x: 43, y: 44, size: 5 },
  { id: 'GUW', name: 'Guwahati', x: 72, y: 28, size: 4 },
];

// Connections between hubs (logistics lanes)
const connections = [
  ['DEL', 'MUM'], ['DEL', 'KOL'], ['DEL', 'JAI'], ['DEL', 'LKO'], ['DEL', 'CHG'],
  ['MUM', 'PUN'], ['MUM', 'AMD'], ['MUM', 'BLR'], ['MUM', 'NAG'],
  ['CHN', 'BLR'], ['CHN', 'HYD'], ['CHN', 'KOL'],
  ['KOL', 'GUW'], ['KOL', 'VIS'],
  ['BLR', 'HYD'], ['BLR', 'COC'],
  ['HYD', 'NAG'], ['HYD', 'VIS'],
  ['AMD', 'JAI'], ['AMD', 'IND'],
  ['NAG', 'IND'], ['NAG', 'LKO'],
  ['DEL', 'NAG'],
];

// India outline path (simplified)
const indiaOutline = "M39,8 L42,10 L46,10 L48,12 L44,14 L39,14 L36,13 L33,14 L30,16 L28,18 L25,22 L23,26 L22,30 L22,34 L24,38 L23,42 L22,46 L23,50 L25,54 L28,58 L30,60 L32,62 L34,66 L36,70 L38,74 L40,78 L42,82 L44,84 L46,82 L48,78 L50,74 L52,70 L54,66 L56,62 L58,58 L60,54 L62,50 L64,46 L66,42 L68,38 L70,34 L72,30 L70,26 L68,24 L64,22 L60,24 L58,28 L56,32 L54,36 L52,34 L50,30 L48,26 L46,22 L44,18 L42,14 L40,10 Z";

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2500;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="metric-value">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

function DataPacket({ from, to, delay }: { from: typeof indiaNodes[0]; to: typeof indiaNodes[0]; delay: number }) {
  return (
    <motion.circle
      r="1.5"
      fill="#00e5ff"
      filter="url(#glow)"
      initial={{ cx: `${from.x}%`, cy: `${from.y}%`, opacity: 0 }}
      animate={{
        cx: [`${from.x}%`, `${to.x}%`],
        cy: [`${from.y}%`, `${to.y}%`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.5 + Math.random() * 1.5,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 4 + Math.random() * 4,
        ease: 'linear',
      }}
    />
  );
}

// Simulated live time display
function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', {
        hour12: false,
        timeZone: 'Asia/Kolkata',
      }) + ' IST');
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-mono text-slate-500 text-[10px]">{time}</span>;
}

export default function HeroSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);

  // Cycle through nodes automatically for ambient effect
  const cycleRef = useRef<NodeJS.Timeout | null>(null);
  
  const startAutoCycle = useCallback(() => {
    let idx = 0;
    cycleRef.current = setInterval(() => {
      setActiveNode(indiaNodes[idx % indiaNodes.length].id);
      idx++;
    }, 3000);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(startAutoCycle, 5000);
    return () => {
      clearTimeout(timeout);
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [startAutoCycle]);

  const handleNodeHover = (nodeId: string | null) => {
    if (cycleRef.current) {
      clearInterval(cycleRef.current);
      cycleRef.current = null;
    }
    setActiveNode(nodeId);
    if (!nodeId) {
      startAutoCycle();
    }
  };

  return (    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950 opacity-60" />

      {/* Map visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          className="w-full h-full max-w-4xl max-h-[80vh] opacity-50 pointer-events-auto"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* India outline (subtle) */}
          <path
            d={indiaOutline}
            fill="none"
            stroke="#1e3a5f"
            strokeWidth="0.3"
            opacity="0.25"
            strokeDasharray="2,2"
          />

          {/* Connection lines */}
          {connections.map(([fromId, toId], i) => {
            const from = indiaNodes.find((n) => n.id === fromId)!;
            const to = indiaNodes.find((n) => n.id === toId)!;
            const isActive = activeNode === fromId || activeNode === toId;
            return (
              <line
                key={i}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke={isActive ? '#00e5ff' : '#1e3a5f'}
                strokeWidth={isActive ? 0.4 : 0.15}
                opacity={isActive ? 0.7 : 0.25}
                className="transition-all duration-700"
              />
            );
          })}

          {/* Data packets moving along routes */}
          {connections.slice(0, 12).map(([fromId, toId], i) => {
            const from = indiaNodes.find((n) => n.id === fromId)!;
            const to = indiaNodes.find((n) => n.id === toId)!;
            return <DataPacket key={`pkt-${i}`} from={from} to={to} delay={i * 0.6} />;
          })}

          {/* Nodes */}
          {indiaNodes.map((node) => {
            const isActive = activeNode === node.id;
            return (
              <g
                key={node.id}
                onMouseEnter={() => handleNodeHover(node.id)}
                onMouseLeave={() => handleNodeHover(null)}
                className="cursor-pointer"
              >
                {/* Outer pulse ring */}
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={node.size * 0.6}
                  fill="none"
                  stroke="#00e5ff"
                  strokeWidth="0.12"
                  opacity="0.2"
                >
                  <animate
                    attributeName="r"
                    from={node.size * 0.4}
                    to={node.size * 1.4}
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.3"
                    to="0"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Glow halo on active */}
                {isActive && (
                  <circle
                    cx={`${node.x}%`}
                    cy={`${node.y}%`}
                    r={node.size * 0.8}
                    fill="#00e5ff"
                    opacity="0.08"
                    filter="url(#softGlow)"
                  />
                )}
                {/* Core dot */}
                <circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={isActive ? node.size * 0.45 : node.size * 0.25}
                  fill="#00e5ff"
                  opacity={isActive ? 1 : 0.6}
                  filter="url(#glow)"
                  className="transition-all duration-300"
                />
                {/* Label on hover */}
                {isActive && (
                  <>
                    <rect
                      x={`${node.x - 6}%`}
                      y={`${node.y - 5.5}%`}
                      width="12%"
                      height="3%"
                      rx="0.5"
                      fill="#0a0e1a"
                      fillOpacity="0.85"
                      stroke="#00e5ff"
                      strokeWidth="0.15"
                      strokeOpacity="0.4"
                    />
                    <text
                      x={`${node.x}%`}
                      y={`${node.y - 3.5}%`}
                      textAnchor="middle"
                      fill="#00e5ff"
                      fontSize="1.6"
                      fontFamily="'Roboto Mono', monospace"
                      fontWeight="500"
                    >
                      {node.name}
                    </text>
                  </>
                )}
                {/* Node ID label (always visible for major hubs) */}
                {node.size >= 6 && !isActive && (
                  <text
                    x={`${node.x}%`}
                    y={`${node.y + 2.8}%`}
                    textAnchor="middle"
                    fill="#1e3a5f"
                    fontSize="1.2"
                    fontFamily="'Roboto Mono', monospace"
                    fontWeight="500"
                  >
                    {node.id}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Main content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8"
        >
          <span className="flex items-center gap-2">
            <span className="status-dot" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              National Grid Active
            </span>
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="text-xs font-mono text-slate-500">{indiaNodes.length} Hubs</span>
          <span className="h-3 w-px bg-white/10 hidden sm:block" />
          <span className="hidden sm:inline"><LiveClock /></span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
        >
          <span className="text-white">Powering India&apos;s</span>
          <br />
          <span className="gradient-text-animate">Logistics Intelligence Grid</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Autonomous AI agents orchestrating procurement, route optimization, 
          and sustainability across India&apos;s logistics network — at national scale.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#command-center"
            className="group px-8 py-3.5 bg-electric text-navy-950 font-semibold rounded-lg text-sm hover:bg-electric-light transition-all hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Enter the Intelligence Grid
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a
            href="#agents"
            className="px-8 py-3.5 glass-card text-white font-semibold rounded-lg text-sm hover:bg-white/[0.06] transition-all flex items-center gap-2 border-white/[0.08]"
          >
            <svg className="w-4 h-4 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Explore AI Agents
          </a>
        </motion.div>

        {/* Live metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-4xl mx-auto"
        >
          {[
            { label: 'Active Lanes', value: 80000, suffix: '+', icon: '◈' },
            { label: 'AI Decisions Today', value: 14892, suffix: '', icon: '⬡' },
            { label: 'Carbon Tons Saved', value: 3240, suffix: 'T', icon: '◉' },
            { label: 'Cost Optimized', value: 2500, prefix: '$', suffix: 'M+', icon: '⬢' },
          ].map((metric, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onHoverStart={() => setHoveredMetric(i)}
              onHoverEnd={() => setHoveredMetric(null)}
              className={`glass-card p-4 md:p-5 text-center group transition-all duration-500 cursor-default ${
                hoveredMetric === i ? 'border-electric/25 shadow-[0_0_25px_rgba(0,229,255,0.08)]' : 'hover:border-electric/15'
              }`}
            >
              <div className="text-electric/40 text-base mb-1 font-mono">{metric.icon}</div>
              <AnimatedCounter target={metric.value} suffix={metric.suffix} prefix={metric.prefix || ''} />
              <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-medium">{metric.label}</div>
              {/* Live indicator */}
              <div className="flex items-center justify-center gap-1 mt-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500/60 live-indicator" />
                <span className="text-[8px] font-mono text-slate-600 uppercase">Live</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600 font-mono">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-slate-700/50 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-electric/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
