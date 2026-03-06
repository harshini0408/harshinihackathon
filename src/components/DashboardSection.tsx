'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

/* ─── Sample data ─── */
const demandData = [
  { name: 'Jan', demand: 4200, capacity: 4800 },
  { name: 'Feb', demand: 3800, capacity: 4600 },
  { name: 'Mar', demand: 5100, capacity: 4800 },
  { name: 'Apr', demand: 4600, capacity: 5000 },
  { name: 'May', demand: 5400, capacity: 5200 },
  { name: 'Jun', demand: 6200, capacity: 5800 },
  { name: 'Jul', demand: 5800, capacity: 5600 },
  { name: 'Aug', demand: 6800, capacity: 6200 },
];

const costIndex = [
  { name: 'W1', index: 100 }, { name: 'W2', index: 103 }, { name: 'W3', index: 98 },
  { name: 'W4', index: 106 }, { name: 'W5', index: 112 }, { name: 'W6', index: 108 },
  { name: 'W7', index: 115 }, { name: 'W8', index: 110 },
];

const routePerf = [
  { route: 'DEL-MUM', score: 92 }, { route: 'MUM-BLR', score: 87 },
  { route: 'DEL-KOL', score: 78 }, { route: 'CHN-HYD', score: 95 },
  { route: 'BLR-CHN', score: 83 }, { route: 'AMD-DEL', score: 90 },
];

/* ─── Heatmap cells ─── */
const heatmapData = [
  [3, 5, 2, 7, 4, 6],
  [6, 8, 4, 3, 7, 5],
  [2, 4, 9, 5, 3, 8],
  [7, 3, 5, 8, 6, 2],
  [4, 7, 3, 6, 9, 4],
];
const heatRows = ['North', 'West', 'South', 'East', 'Central'];
const heatCols = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const riskIndicators = [
  { label: 'Weather Disruption', level: 'Medium', color: 'bg-yellow-400', pct: 45 },
  { label: 'Route Congestion', level: 'High', color: 'bg-red-400', pct: 72 },
  { label: 'Carrier Availability', level: 'Low', color: 'bg-green-400', pct: 18 },
  { label: 'Fuel Price Volatility', level: 'Medium', color: 'bg-yellow-400', pct: 55 },
];

const tabs = ['Demand', 'Routes', 'Cost Index', 'Risk'];

export default function DashboardSection() {
  const [activeTab, setActiveTab] = useState('Demand');

  return (
    <section id="dashboard" className="section-padding section-alt">
      <div className="max-w-content mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="badge mx-auto mb-4">Live Intelligence</div>
          <h2 className="section-title mb-4">Logistics Intelligence Dashboard</h2>
          <p className="section-subtitle mx-auto">Real-time visibility into freight demand, route performance, and risk indicators.</p>
        </div>

        {/* Dashboard card */}
        <div className="card overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-neutral-100 overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'border-cyan text-deep-blue'
                    : 'border-transparent text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto flex items-center pr-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2" />
              <span className="text-xs text-neutral-400">Live</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'Demand' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex flex-wrap gap-8 mb-6">
                  <div><div className="text-2xl font-bold text-deep-blue">6,800</div><div className="text-xs text-neutral-400">Current Demand (loads)</div></div>
                  <div><div className="text-2xl font-bold text-cyan">6,200</div><div className="text-xs text-neutral-400">Available Capacity</div></div>
                  <div><div className="text-2xl font-bold text-red-400">9.7%</div><div className="text-xs text-neutral-400">Capacity Gap</div></div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={demandData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="capacity" stroke="#E2E8F0" fill="#F8FAFC" strokeWidth={2} />
                      <Area type="monotone" dataKey="demand" stroke="#00B4D8" fill="#E8F8FC" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                {/* Heatmap */}
                <div className="mt-8">
                  <h4 className="text-sm font-semibold text-deep-blue mb-3">Freight Demand Heatmap</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="py-2 pr-3 text-left text-neutral-400 font-medium">Region</th>
                          {heatCols.map((c) => (
                            <th key={c} className="py-2 px-2 text-center text-neutral-400 font-medium">{c}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {heatmapData.map((row, ri) => (
                          <tr key={ri}>
                            <td className="py-1.5 pr-3 text-neutral-600 font-medium">{heatRows[ri]}</td>
                            {row.map((val, ci) => (
                              <td key={ci} className="py-1.5 px-2">
                                <div
                                  className="w-full h-8 rounded flex items-center justify-center text-white font-semibold"
                                  style={{ backgroundColor: `rgba(0, 180, 216, ${val / 10})` }}
                                >
                                  {val > 5 ? val : ''}
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Routes' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h4 className="text-sm font-semibold text-deep-blue mb-4">Route Performance Score</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={routePerf} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <YAxis dataKey="route" type="category" tick={{ fontSize: 12, fill: '#64748B' }} axisLine={false} tickLine={false} width={80} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#00B4D8" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeTab === 'Cost Index' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="flex items-baseline gap-3 mb-6">
                  <div className="text-2xl font-bold text-deep-blue">110</div>
                  <div className="text-sm text-red-400 font-medium">+10% vs baseline</div>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={costIndex}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} domain={[90, 120]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="index" stroke="#0A2540" fill="#0A2540" fillOpacity={0.05} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {activeTab === 'Risk' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <h4 className="text-sm font-semibold text-deep-blue mb-6">Delivery Risk Indicators</h4>
                <div className="space-y-5">
                  {riskIndicators.map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm text-neutral-600">{r.label}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          r.level === 'High' ? 'bg-red-50 text-red-500' :
                          r.level === 'Medium' ? 'bg-yellow-50 text-yellow-600' :
                          'bg-green-50 text-green-600'
                        }`}>{r.level}</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${r.pct}%` }}
                          transition={{ duration: 0.8 }}
                          className={`h-full rounded-full ${r.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
