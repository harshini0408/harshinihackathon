'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Intelligence Grid', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'AI Agents', href: '#agents' },
  { name: 'Command Center', href: '#command-center' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Infrastructure', href: '#infrastructure' },
  { name: 'Enterprise', href: '#enterprise' },
  { name: 'News', href: '#news' },
  { name: 'Careers', href: '#careers' },
  { name: 'Contact', href: '#contact' },
];

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);

    // Determine active section
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    let currentSection = sections[0];
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150) {
          currentSection = sectionId;
        }
      }
    }
    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    // Update theme-color meta
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#0a0e1a' : '#f8fafc');
  }, [theme]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-xl border-b shadow-sm'
            : 'bg-transparent'
        }`}
        style={scrolled ? { backgroundColor: 'var(--nav-bg)', borderColor: 'var(--card-border)' } : {}}
      >
        {/* Top bar - contact info */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
            <div className="flex items-center gap-6">
              <a href="mailto:connect@logisticsnow.in" className="hover:text-electric transition-colors flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                connect@logisticsnow.in
              </a>
              <a href="tel:+919867773508" className="hover:text-electric transition-colors items-center gap-1.5 hidden sm:flex">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +91-9867773508
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a href="https://www.linkedin.com/company/logisticsnow/" target="_blank" rel="noopener noreferrer" className="hover:text-electric transition-colors" aria-label="LinkedIn">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="status-dot" />
                <span className="text-[10px] uppercase tracking-widest">Grid Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-lg bg-electric/10 group-hover:bg-electric/20 transition-colors" />
              <svg className="w-5 h-5 text-electric relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>            <div>
              <span className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Logistics</span>
              <span className="text-lg font-bold tracking-tight text-electric">Now</span>
              <div className="text-[9px] uppercase tracking-[0.25em] -mt-0.5" style={{ color: 'var(--text-muted)' }}>Intelligence Grid</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}                  className={`relative px-3 py-2 text-[13px] transition-colors rounded-lg font-medium ${
                    isActive
                      ? 'text-electric bg-electric/[0.08]'
                      : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.04]'
                  }`}
                  style={!isActive ? { color: 'var(--text-secondary)' } : {}}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px bg-electric"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>          {/* CTA + Theme toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border transition-all duration-300 hover:border-electric/40"
              style={{
                color: 'var(--text-secondary)',
                borderColor: 'var(--card-border)',
                backgroundColor: 'var(--card-bg)',
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href="https://www.lorri.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-semibold text-navy-950 bg-electric rounded-lg hover:bg-electric-light transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              Enter Grid →
            </a>
          </div>

          {/* Mobile menu button */}          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 backdrop-blur-xl pt-28 px-6 lg:hidden"
            style={{ backgroundColor: theme === 'dark' ? 'rgba(10, 14, 26, 0.95)' : 'rgba(248, 250, 252, 0.95)' }}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 text-lg hover:text-electric transition-colors border-b"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--card-border)' }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="https://www.lorri.in"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 px-6 py-3 text-center text-sm font-semibold text-navy-950 bg-electric rounded-lg"
              >                Enter Intelligence Grid →
              </motion.a>
              <motion.button
                onClick={toggleTheme}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-3 px-6 py-3 text-center text-sm font-medium rounded-lg border flex items-center justify-center gap-2"
                style={{
                  color: 'var(--text-secondary)',
                  borderColor: 'var(--card-border)',
                  backgroundColor: 'var(--card-bg)',
                }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
