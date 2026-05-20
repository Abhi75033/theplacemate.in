'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import AnimatedTicker from './AnimatedTicker'

const STEPS = [
  { icon: '📄', title: 'Resume Building', desc: 'ATS-optimized resume crafted with expert feedback and industry-aligned formatting.', color: '#6366f1' },
  { icon: '💼', title: 'LinkedIn Optimization', desc: 'Profile headline, about, and skills optimized for recruiter visibility.', color: '#8b5cf6' },
  { icon: '🎤', title: 'Mock Interviews', desc: '5+ rounds of technical and HR mock interviews with detailed feedback.', color: '#06b6d4' },
  { icon: '🗂️', title: 'Portfolio Review', desc: 'Projects reviewed for quality, presentation, and recruiter impact.', color: '#10b981' },
  { icon: '🤝', title: 'Referral Network', desc: 'Access to our hiring partner network for referrals and job opportunities.', color: '#f59e0b' },
  { icon: '📊', title: 'DSA + System Design', desc: 'Structured prep for technical rounds at product-based companies.', color: '#ec4899' },
]

const OUTCOMES = [
  { value: '85%', label: 'Students land interviews within 60 days' },
  { value: '3.2x', label: 'Average salary jump post-program' },
  { value: '80+', label: 'Active hiring partners in network' },
  { value: '500+', label: 'Student portfolios deployed live' },
]

export default function PlacementSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })
  
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="placement" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a12]" />
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.06),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="tag mb-4 inline-flex">Career Support</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Your career, <span className="gradient-text">fully supported</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            We don't make fake guarantees. We provide real, structured career support — resume, interviews, referrals, and networking — every step of the way.
          </p>
        </motion.div>

        {/* Outcome metrics */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {OUTCOMES.map((o, i) => {
            const match = o.value.match(/^([\d,.]+)(.*)$/)
            const numericVal = match ? parseFloat(match[1].replace(/,/g, '')) : 0
            const suffix = match ? match[2] : ''
            const decimals = o.value.includes('.') ? 1 : 0
            return (
              <div key={i} className="glass rounded-2xl p-5 text-center border border-white/[0.06] hover:border-[#10b981]/20 transition-all">
                <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">
                  <AnimatedTicker value={numericVal} suffix={suffix} decimals={decimals} />
                </div>
                <div className="text-xs text-[#94a3b8]">{o.label}</div>
              </div>
            )
          })}
        </motion.div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group glass rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 card-hover animated-border"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                {step.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Career roadmap visual */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Your Career Progression Path</h3>
            <p className="text-sm text-[#64748b] mt-1">From enrollment to first role</p>
          </div>
          <div ref={containerRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4 relative px-2 sm:px-0">
            {/* Background track (Mobile) */}
            <div className="absolute left-[31px] sm:hidden top-0 bottom-0 w-0.5 bg-white/[0.04]" />
            {/* Animated active path (Mobile) */}
            <motion.div 
              style={{ scaleY: scaleProgress, originY: 0 }}
              className="absolute left-[31px] sm:hidden top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6366f1] via-[#8b5cf6] to-[#06b6d4]"
            />

            {/* Background track (Desktop) */}
            <div className="absolute hidden sm:block top-6 left-[24px] right-[24px] h-0.5 bg-white/[0.04]" />
            {/* Animated active path (Desktop) */}
            <motion.div 
              style={{ scaleX: scaleProgress, originX: 0 }}
              className="absolute hidden sm:block top-6 left-[24px] right-[24px] h-0.5 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4]"
            />

            {[
              { label: 'Enroll', sub: 'Day 1', color: '#6366f1', icon: '🚀' },
              { label: 'Learn & Build', sub: 'Weeks 1–10', color: '#8b5cf6', icon: '⚙️' },
              { label: 'Internship', sub: 'Weeks 11–12', color: '#06b6d4', icon: '💼' },
              { label: 'Career Prep', sub: 'Weeks 13–16', color: '#10b981', icon: '🎯' },
              { label: 'Get Hired', sub: 'Post-Program', color: '#f59e0b', icon: '🎉' },
            ].map((step, i, arr) => (
              <div key={i} className="flex sm:flex-col items-center gap-4 sm:gap-3 w-full sm:w-auto relative z-10 bg-[#0a0a12]/40 sm:bg-transparent rounded-full sm:rounded-none pr-4 sm:pr-0">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 bg-[#0a0a12]"
                  style={{ border: `2px solid ${step.color}60`, boxShadow: `0 0 20px ${step.color}30` }}>
                  {step.icon}
                </div>
                <div className="text-left sm:text-center">
                  <div className="text-sm font-semibold text-white">{step.label}</div>
                  <div className="text-[10px] text-[#64748b]">{step.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
