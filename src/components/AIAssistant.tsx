'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = { role: 'user' | 'assistant'; text: string };

const quickPrompts = [
  'What is LoRRI?',
  'How does AI reduce logistics costs?',
  'Show me ROI estimates',
  'Schedule a demo',
];

const responses: Record<string, string> = {
  'what is lorri':
    'LoRRI is an AI-powered logistics intelligence platform. We help enterprises reduce freight costs by 12-18%, predict delays with 94% accuracy, and optimize routes across India\'s transport network. Think of us as the AI brain for your logistics operations.',
  'how does ai reduce logistics costs':
    'Our AI reduces costs through three channels:\n\n1. **Freight benchmarking** — compares your rates against 15,000+ market lanes\n2. **Route optimization** — finds the fastest, cheapest routes in real-time\n3. **Load consolidation** — increases truck utilization by 34%\n\nMost clients see ROI within the first quarter.',
  'show me roi estimates':
    'For a mid-size shipper with 1,000+ monthly shipments, typical annual savings range from ₹1.5–4 Cr depending on industry. Try our ROI tools above — the Maturity Assessment and Freight Benchmark Explorer give personalized estimates.',
  'schedule a demo':
    'I\'d love to help! You can fill out the demo form in the Contact section below, or email us at hello@lorri.ai. Our team typically responds within 4 hours.',
  'what industries do you serve':
    'We serve Manufacturing, FMCG, Retail & E-Commerce, and Logistics Providers. Each solution is purpose-built for industry-specific challenges like JIT delivery, cold-chain, or hazmat routing.',
  'how accurate are predictions':
    'Our delay prediction model achieves 94.2% accuracy, trained on 3+ years of historical route data, real-time weather, and traffic feeds. The freight rate model benchmarks against 15,000+ active lanes across India.',
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('openLogiGuide', handleOpen);
    return () => window.removeEventListener('openLogiGuide', handleOpen);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    const userMsg: Message = { role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const key = text.toLowerCase().replace(/[?!.,]/g, '').trim();
      const reply = Object.entries(responses).find(([k]) => key.includes(k))?.[1]
        || 'Thanks for your question! I can help with LoRRI\'s platform, AI capabilities, pricing, or scheduling a demo. Try asking about how AI reduces costs, our prediction accuracy, or which industries we serve.';
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    send(input.trim());
  };

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-deep-blue text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
            aria-label="Open AI assistant"
          >
            <svg className="w-6 h-6 text-cyan group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] max-h-[520px] bg-white rounded-2xl shadow-xl border border-neutral-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-deep-blue text-white rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">LoRRI AI Assistant</div>
                  <div className="text-[11px] text-neutral-300">Ask anything about logistics</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors" aria-label="Close">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
              {messages.length === 0 && (
                <div className="py-4">
                  <p className="text-sm text-neutral-500 mb-4">Hi! I can help you understand LoRRI, explore our AI capabilities, or schedule a demo.</p>
                  <div className="space-y-2">
                    {quickPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => send(prompt)}
                        className="block w-full text-left px-3 py-2.5 text-sm text-deep-blue bg-soft-grey hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-deep-blue text-white rounded-br-md'
                      : 'bg-soft-grey text-deep-blue rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-100">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about LoRRI..."
                  className="flex-1 px-3.5 py-2.5 text-sm border border-neutral-200 rounded-lg bg-white text-deep-blue placeholder-neutral-400 focus:ring-2 focus:ring-cyan/20 focus:border-cyan outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="px-3.5 py-2.5 bg-cyan text-white rounded-lg hover:bg-cyan-hover disabled:opacity-40 transition-all"
                  aria-label="Send"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
