'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactFooter() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      {/* Contact Section */}      <section id="contact" className="relative section-padding overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] mb-6">
              <span className="text-[10px] font-mono text-electric uppercase tracking-widest">Connect</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-white">Enter the </span>
              <span className="text-electric glow-text">Grid</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              Ready to deploy intelligence across your logistics network? Let&apos;s connect.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8"
            >
              <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">Schedule a Demo</h3>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Request Received</h3>
                  <p className="text-sm text-slate-400">Our team will connect with you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-electric/40 focus:bg-white/[0.06] transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-electric/40 focus:bg-white/[0.06] transition-all"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-electric/40 focus:bg-white/[0.06] transition-all"
                  />
                  <textarea
                    placeholder="What would you want LoRRI to solve for you?"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-electric/40 focus:bg-white/[0.06] transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg text-sm font-semibold bg-electric text-navy-950 hover:bg-electric-light transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                  >
                    Request Demo Access →
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Quick links */}
              <div className="glass-card p-6">
                <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Platform Access</h3>
                <div className="space-y-3">
                  <a
                    href="https://www.lorri.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.04] hover:border-electric/20 transition-all group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">LoRRI for Shippers / Manufacturers</div>
                      <div className="text-xs text-slate-500">Procurement, intelligence, optimization</div>
                    </div>
                    <svg className="w-5 h-5 text-slate-600 group-hover:text-electric transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    href="https://transporter.lorri.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.04] hover:border-electric/20 transition-all group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white">LoRRI for Carriers / Transporters</div>
                      <div className="text-xs text-slate-500">Network visibility, route intelligence</div>
                    </div>
                    <svg className="w-5 h-5 text-slate-600 group-hover:text-electric transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Contact details */}
              <div className="glass-card p-6">
                <h3 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center text-electric shrink-0 mt-0.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">409, Neptune&apos;s Flying Colors, L.B.S Cross Road</p>
                      <p className="text-sm text-slate-400">Near Mulund Check Naka, Mumbai 400080</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center text-electric shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <a href="mailto:connect@logisticsnow.in" className="text-sm text-electric hover:text-electric-light transition-colors">
                      connect@logisticsnow.in
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center text-electric shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div>
                      <a href="tel:+919867773508" className="text-sm text-slate-300 hover:text-electric transition-colors">+91-9867773508</a>
                      <span className="text-slate-600 mx-2">/</span>
                      <a href="tel:+919653620207" className="text-sm text-slate-300 hover:text-electric transition-colors">+91-9653620207</a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.04] bg-navy-950">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-electric" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <span className="font-bold text-white">Logistics</span>
                  <span className="font-bold text-electric">Now</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Building the digital backbone of India&apos;s logistics ecosystem. Trusted by Fortune 500 companies.
              </p>
            </div>

            {/* Links */}            <div>
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Platform</h4>
              <div className="space-y-2">
                <a href="#hero" className="block text-sm text-slate-400 hover:text-electric transition-colors">Intelligence Grid</a>
                <a href="#agents" className="block text-sm text-slate-400 hover:text-electric transition-colors">AI Agents</a>
                <a href="https://www.lorri.in" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-400 hover:text-electric transition-colors">LoRRI for Shippers</a>
                <a href="https://transporter.lorri.in/" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-400 hover:text-electric transition-colors">LoRRI for Carriers</a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Company</h4>
              <div className="space-y-2">
                <a href="#enterprise" className="block text-sm text-slate-400 hover:text-electric transition-colors">About Us</a>
                <a href="#careers" className="block text-sm text-slate-400 hover:text-electric transition-colors">Careers</a>
                <a href="#infrastructure" className="block text-sm text-slate-400 hover:text-electric transition-colors">Infrastructure</a>
                <a href="#contact" className="block text-sm text-slate-400 hover:text-electric transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Legal</h4>
              <div className="space-y-2">
                {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((link) => (
                  <a key={link} href="#" className="block text-sm text-slate-400 hover:text-electric transition-colors">{link}</a>
                ))}
              </div>
              {/* Social */}
              <div className="flex items-center gap-3 mt-4">
                <a href="https://www.linkedin.com/company/logisticsnow/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-500 hover:text-electric hover:bg-electric/10 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.facebook.com/logisticsnow/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-500 hover:text-electric hover:bg-electric/10 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/logisticsnowln/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-500 hover:text-electric hover:bg-electric/10 transition-all">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              © {new Date().getFullYear()} LogisticsNow. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="status-dot" />
              <span className="font-mono">All systems operational</span>
              <span className="mx-2">|</span>
              <span className="font-mono">Grid v3.2.1</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
