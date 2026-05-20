'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'

export default function CTASection() {
  return (
    <section id="apply" className="section-padding relative overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 bg-[#050508]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(99,102,241,0.18),transparent_70%)]" />
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Animated glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.25),transparent_70%)] blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[radial-gradient(ellipse,rgba(139,92,246,0.2),transparent_70%)] blur-2xl pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass text-xs font-medium px-4 py-2 rounded-full border border-[#6366f1]/30 text-[#a78bfa] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          Cohort 2025 · Limited Seats Available
        </motion.div>

        {/* Headline */}
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-6">
          <span className="text-white">Join the </span>
          <span className="gradient-text text-glow">next cohort.</span>
          <br />
          <span className="text-white">Transform your </span>
          <span className="gradient-text">career.</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-[#94a3b8] mb-10 max-w-2xl mx-auto">
          Real projects. Real internships. Real mentorship. Real career support. Everything you need to become industry-ready — in one cohort.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="#" className="btn-primary flex items-center justify-center gap-2 text-base sm:text-lg px-8 py-4 relative z-10 glow-purple">
            <span className="relative z-10">Apply Now — It's Free</span>
            <ArrowRight className="w-5 h-5 relative z-10" />
          </a>
          <a href="#" className="btn-secondary flex items-center justify-center gap-2 text-base sm:text-lg px-8 py-4">
            <Calendar className="w-5 h-5" />
            Book Free Counseling
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748b]">
          {['✓ No prior experience needed', '✓ EMI options available', '✓ Internship certificate', '✓ Career support included'].map((t, i) => (
            <span key={i} className="text-[#94a3b8]">{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
