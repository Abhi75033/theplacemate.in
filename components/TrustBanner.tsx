'use client'

import { motion } from 'framer-motion'
import AnimatedTicker from './AnimatedTicker'

const MARQUEE_ITEMS = [
  { icon: '⚛️', label: 'React.js' },
  { icon: '🔼', label: 'Next.js' },
  { icon: '🐍', label: 'Python' },
  { icon: '🤖', label: 'LangChain' },
  { icon: '🐳', label: 'Docker' },
  { icon: '☁️', label: 'AWS' },
  { icon: '🎨', label: 'Figma' },
  { icon: '🧠', label: 'OpenAI' },
  { icon: '📦', label: 'Node.js' },
  { icon: '🗄️', label: 'PostgreSQL' },
  { icon: '⚡', label: 'FastAPI' },
  { icon: '🔥', label: 'Firebase' },
  { icon: '🌊', label: 'Tailwind CSS' },
  { icon: '📊', label: 'Supabase' },
  { icon: '🚀', label: 'Vercel' },
  { icon: '🔗', label: 'GitHub' },
]

const METRICS = [
  { label: 'Student Satisfaction', value: '98%', sub: 'across all cohorts' },
  { label: 'Projects Shipped', value: '500+', sub: 'production-grade' },
  { label: 'GitHub Contributions', value: '12K+', sub: 'by our students' },
  { label: 'Portfolio Showcases', value: '300+', sub: 'live & deployed' },
  { label: 'Startup Collabs', value: '40+', sub: 'real client projects' },
]

const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

export default function TrustBanner() {
  return (
    <section className="py-16 relative overflow-hidden border-y border-white/[0.04]">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[#0a0a12]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="tag mb-4 inline-flex">Trusted by learners across India</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            The ecosystem you need to{' '}
            <span className="gradient-text">go from zero to hired</span>
          </h2>
        </motion.div>
      </div>

      {/* Metrics row */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {METRICS.map((m, i) => {
            const match = m.value.match(/^([\d,.]+)(.*)$/)
            const numericVal = match ? parseFloat(match[1].replace(/,/g, '')) : 0
            const suffix = match ? match[2] : ''
            const decimals = m.value.includes('.') ? 1 : 0
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-xl p-4 text-center border border-white/[0.06] hover:border-[#6366f1]/20 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-black gradient-text mb-1">
                  <AnimatedTicker value={numericVal} suffix={suffix} decimals={decimals} />
                </div>
                <div className="text-xs font-semibold text-white mb-0.5">{m.label}</div>
                <div className="text-[10px] text-[#64748b]">{m.sub}</div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a12] to-transparent z-10 pointer-events-none" />

        <div className="flex">
          <motion.div
            className="flex gap-4 shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 glass px-4 py-2.5 rounded-full border border-white/[0.06] text-sm text-[#94a3b8] hover:text-white hover:border-[#6366f1]/30 transition-all cursor-default whitespace-nowrap"
              >
                <span className="text-base">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
