'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const quickPrompts = [
  'How can LoRRI optimize my procurement?',
  'What is the National Logistics Grid?',
  'Run a logistics capability assessment',
  'How does the carbon tracking work?',
];

const aiResponses: Record<string, string> = {
  'How can LoRRI optimize my procurement?':
    'LoRRI\'s Procurement Agent autonomously analyzes your shipment data, clusters lanes strategically, benchmarks rates against the National Freight Benchmark (80,000+ routes), and generates AI-optimized RFQs. Our clients typically see 12-18% cost savings within the first procurement cycle.\n\nWould you like me to run a quick simulation for your industry?',
  'What is the National Logistics Grid?':
    'The National Logistics Grid is India\'s most comprehensive logistics data backbone — covering 80,000+ routes, 2,200+ carriers, and $2.5B+ in analyzed logistics spend across 3 continents.\n\nIt serves as the foundational intelligence layer that powers all LoRRI AI agents, enabling benchmark-driven decisions, real-time market intelligence, and predictive logistics optimization.\n\nThink of it as the \'Google Maps\' of logistics intelligence.',
  'Run a logistics capability assessment':
    'I\'d be happy to run a quick Logistics Capability Assessment. Based on typical enterprise profiles:\n\n📊 **Assessment Areas:**\n• Procurement Efficiency Score\n• Network Optimization Potential\n• Data Readiness Level\n• Carbon Footprint Baseline\n• Technology Integration Maturity\n\nTo give you a personalized assessment, I\'d need to understand your industry, shipment volume, and current pain points. Would you like to schedule a detailed assessment with our team?',
  'How does the carbon tracking work?':
    'Our Carbon Intelligence System provides:\n\n🌍 **Scope 3 Emissions Tracking** — Automatic calculation across your entire logistics network\n🛣️ **Green Route Selection** — AI recommends lower-emission route alternatives\n📊 **ESG Report Generation** — Compliance-ready reports for stakeholders\n♻️ **Carbon Offset Integration** — Connect to verified offset programs\n\nWe\'ve helped enterprises reduce logistics carbon emissions by 3,240+ tons through intelligent route optimization and modal shift recommendations.',
};

const defaultResponse = 'Thank you for your question! As the LogisticsNow AI advisor, I can help you understand our platform capabilities, run logistics assessments, and explore how the Intelligence Grid can optimize your operations.\n\nFor detailed inquiries, I recommend scheduling a demo with our team at connect@logisticsnow.in.';

export default function LogiGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Welcome to the Logistics Intelligence Grid. I\'m Logi-Guide, your AI advisor.\n\nI can help you explore platform capabilities, run logistics assessments, or answer questions about the National Grid. How can I assist you?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content }]);
    setInput('');
    setIsTyping(true);

    const response = aiResponses[content] || defaultResponse;

    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    }, 1200 + Math.random() * 800);
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
          isOpen
            ? 'bg-white/10 backdrop-blur-xl border border-white/10'
            : 'bg-electric text-navy-950 hover:bg-electric-light hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] sm:max-h-[560px] rounded-2xl overflow-hidden border border-white/[0.08] bg-navy-900/95 backdrop-blur-xl shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-electric/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Logi-Guide</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="status-dot" style={{ width: 6, height: 6 }} />
                    <span className="text-[10px] text-emerald-400 font-mono">AI Advisor Online</span>
                  </div>
                </div>
              </div>
            </div>            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] sm:min-h-[280px] max-h-[40vh] sm:max-h-[360px] hide-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-electric/20 text-white rounded-br-md'
                        : 'bg-white/[0.04] text-slate-300 rounded-bl-md border border-white/[0.04]'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.04] rounded-2xl rounded-bl-md px-4 py-3 border border-white/[0.04]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-electric/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-electric/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-electric/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="px-2.5 py-1 rounded-full text-[10px] bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:bg-electric/10 hover:text-electric hover:border-electric/20 transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/[0.06]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about logistics intelligence..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-electric/30 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-electric/20 flex items-center justify-center text-electric hover:bg-electric/30 transition-all disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
