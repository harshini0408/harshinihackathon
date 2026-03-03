'use client';

import { motion } from 'framer-motion';

const newsItems = [
  {
    type: 'Press Release',
    date: 'Dec 2024',
    title: 'LogisticsNow Launches National Logistics Intelligence Grid',
    summary:
      'India\'s first unified logistics operating system goes live, connecting 2,200+ carriers across 80,000+ routes with real-time AI-driven intelligence.',
    link: '#',
    color: '#00e5ff',
  },
  {
    type: 'Industry Report',
    date: 'Nov 2024',
    title: 'National Freight Index Q3 2024: Key Trends & Insights',
    summary:
      'Our latest quarterly report reveals a 12% drop in spot rates for western corridors and a shift toward multi-modal freight solutions.',
    link: '#',
    color: '#a78bfa',
  },
  {
    type: 'Award',
    date: 'Oct 2024',
    title: 'LogisticsNow Recognized as Top Supply-Chain Innovator',
    summary:
      'Named among India\'s Top 10 Supply-Chain Tech companies by Logistics Insider for our AI-agent architecture and carbon intelligence platform.',
    link: '#',
    color: '#34d399',
  },
];

const events = [
  {
    date: 'Jan 15–17, 2025',
    title: 'India Logistics Summit 2025',
    location: 'Bombay Exhibition Centre, Mumbai',
    description:
      'Meet our team at Booth #A12. Live demos of LoRRI Procurement Agent, Carbon Intelligence, and the National Freight Benchmark.',
    cta: 'Register Now',
  },
  {
    date: 'Feb 8, 2025',
    title: 'Webinar: AI Agents in Freight Procurement',
    location: 'Virtual Event',
    description:
      'A 60-minute deep-dive into how autonomous AI agents are transforming freight RFQ management. Featuring real customer case studies.',
    cta: 'Save Your Spot',
  },
  {
    date: 'Mar 22, 2025',
    title: 'LogisticsNow Carbon Workshop',
    location: 'The Lalit, New Delhi',
    description:
      'Hands-on workshop on Scope 3 logistics emissions measurement, ESG reporting automation, and green corridor planning.',
    cta: 'Learn More',
  },
];

export default function NewsEventsSection() {
  return (
    <section id="news" className="relative section-padding overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4"
            style={{ color: '#00e5ff', border: '1px solid rgba(0,229,255,0.3)', backgroundColor: 'rgba(0,229,255,0.08)' }}>
            Stay Updated
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            News &amp; Events
          </h2>
          <p className="max-w-2xl mx-auto text-base" style={{ color: 'var(--text-secondary)' }}>
            The latest from LogisticsNow — product launches, industry insights, and upcoming events.
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="mb-16">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#00e5ff' }} />
            Latest News
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {newsItems.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.link}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card p-6 flex flex-col gap-3 group cursor-pointer"
                aria-label={`Read more: ${item.title}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ color: item.color, backgroundColor: `${item.color}18` }}
                  >
                    {item.type}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.date}</span>
                </div>
                <h4
                  className="text-base font-semibold leading-snug group-hover:underline decoration-1 underline-offset-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {item.summary}
                </p>
                <span className="text-xs font-medium mt-auto" style={{ color: item.color }}>
                  Read more →
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#a78bfa' }} />
            Upcoming Events
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            {events.map((evt, i) => (
              <motion.div
                key={evt.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card p-6 flex flex-col gap-3"
              >
                <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>{evt.date}</span>
                <h4 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{evt.title}</h4>
                <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {evt.location}
                </p>
                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {evt.description}
                </p>
                <button
                  className="mt-auto self-start px-4 py-2 text-xs font-semibold rounded-lg transition-colors"
                  style={{
                    color: '#a78bfa',
                    border: '1px solid rgba(167,139,250,0.3)',
                    backgroundColor: 'rgba(167,139,250,0.08)',
                  }}
                  aria-label={evt.cta}
                >
                  {evt.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
