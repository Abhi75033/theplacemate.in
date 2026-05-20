'use client'

import { motion } from 'framer-motion'

const DESIGN_WORKS = [
  { title: 'Brand Identity', icon: '✦', color: '#ec4899', desc: 'Logo, palette, typography & guidelines', bg: 'from-pink-500/20 to-purple-500/10' },
  { title: 'Social Media Pack', icon: '◈', color: '#f59e0b', desc: 'Instagram, LinkedIn & YouTube creatives', bg: 'from-yellow-500/20 to-orange-500/10' },
  { title: 'UI Design System', icon: '⬡', color: '#6366f1', desc: 'Components, tokens & Figma library', bg: 'from-indigo-500/20 to-violet-500/10' },
  { title: 'Motion Graphics', icon: '◎', color: '#06b6d4', desc: 'Animated logos and transitions', bg: 'from-cyan-500/20 to-blue-500/10' },
  { title: 'Poster & Print', icon: '▣', color: '#10b981', desc: 'Event posters, flyers & banners', bg: 'from-emerald-500/20 to-teal-500/10' },
  { title: 'App Interface', icon: '◑', color: '#8b5cf6', desc: 'Mobile UI with full prototyping', bg: 'from-violet-500/20 to-purple-500/10' },
]

export default function DesignSection() {
  return (
    <section id="design" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050508] via-[#0a0808] to-[#050508]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ec4899]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#f59e0b]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-[#ec4899]/30 text-[#ec4899] bg-[#ec4899]/10 mb-4">
            🎨 Design & Creative Programs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Create work that <span className="gradient-text-warm">stops the scroll</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            From brand identities to UI systems — our design programs turn creative beginners into portfolio-ready professionals.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {DESIGN_WORKS.map((work, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.03 }}
              className="group relative glass rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] transition-all cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${work.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10 p-6">
                <div className="text-4xl sm:text-5xl font-black mb-4 transition-transform duration-300 group-hover:scale-110 inline-block"
                  style={{ color: work.color, filter: `drop-shadow(0 0 16px ${work.color}60)` }}>{work.icon}</div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">{work.title}</h3>
                <p className="text-xs text-[#64748b]">{work.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${work.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-2xl p-5 border border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-base font-bold text-white mb-0.5">Tools you'll master</div>
            <div className="text-xs text-[#64748b]">Industry-standard creative suite</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Figma', 'Adobe Illustrator', 'Photoshop', 'After Effects', 'Canva Pro', 'Framer', 'Spline'].map(tool => (
              <span key={tool} className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#94a3b8] hover:text-white hover:border-[#ec4899]/30 transition-all cursor-default">{tool}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
