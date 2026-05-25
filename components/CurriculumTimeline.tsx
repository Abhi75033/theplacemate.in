'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const PHASES = [
  {
    week: 'Weeks 1–2', phase: 'Foundation', icon: '🏗️', color: '#14B8A6', tag: 'Beginner',
    description: 'Environment setup, dev tools, Git/GitHub, coding fundamentals, and team onboarding.',
    milestones: ['Set up professional dev environment', 'Git workflow & version control', 'Command line mastery', 'First mini project deployed'],
  },
  {
    week: 'Weeks 3–6', phase: 'Core Skills', icon: '⚙️', color: '#0B3C6D', tag: 'Intermediate',
    description: 'Deep-dive into your chosen track — full stack, AI, design, or DevOps.',
    milestones: ['Core language & framework mastery', 'Build 2 guided projects', 'Weekly code reviews with mentors', 'Portfolio page live on GitHub'],
  },
  {
    week: 'Weeks 7–10', phase: 'Real Projects', icon: '🚀', color: '#F97316', tag: 'Advanced',
    description: 'Team-based project sprints simulating a real engineering environment.',
    milestones: ['Team project with agile workflow', 'Sprint planning & retrospectives', 'Code review & pull requests', '2 production-grade apps shipped'],
  },
  {
    week: 'Weeks 11–12', phase: 'Internship Phase', icon: '💼', color: '#14B8A6', tag: 'Internship',
    description: 'Work on real client problems with actual startup partners and company workflows.',
    milestones: ['Join a startup partner project', 'Daily standups & task management', 'Mentor-guided code reviews', 'Internship certificate issued'],
  },
  {
    week: 'Week 13', phase: 'Deployment & Launch', icon: '🌐', color: '#0B3C6D', tag: 'Deployment',
    description: 'Deploy all projects to production with CI/CD pipelines, cloud hosting, and custom domains.',
    milestones: ['Deploy apps to cloud (AWS/Vercel)', 'Set up CI/CD pipelines', 'Portfolio launched with custom domain', 'GitHub profile polished'],
  },
  {
    week: 'Weeks 14–16', phase: 'Interview & Placement Prep', icon: '🎯', color: '#F97316', tag: 'Career',
    description: 'Intensive placement preparation — resume, LinkedIn, mock interviews, and referrals.',
    milestones: ['Resume & LinkedIn reviewed', '5 mock interview sessions', 'DSA + system design coaching', 'Interview referrals & opportunities'],
  },
]

export default function CurriculumTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  })

  // Smooth out scroll speed differences
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section id="curriculum" className="section-padding relative overflow-hidden bg-[#0a0a12]">
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(20,184,166,0.06),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="tag mb-4 inline-flex">16-Week Roadmap</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Your journey from <span className="gradient-text">zero to hired</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto">
            A structured, week-by-week progression designed to take you from fundamentals to production-ready engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Background track (Mobile/Tablet) */}
          <div className="absolute left-4 sm:left-8 lg:hidden top-0 bottom-0 w-0.5 bg-white/[0.04]" />
          {/* Active path (Mobile/Tablet) */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 sm:left-8 lg:hidden top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#14B8A6] via-[#0B3C6D] to-[#F97316]"
          />

          {/* Background track (Desktop) */}
          <div className="absolute hidden lg:block left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-white/[0.04]" />
          {/* Active path (Desktop) */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute hidden lg:block left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#14B8A6] via-[#0B3C6D] to-[#F97316]"
          />

          <div className="space-y-8 lg:space-y-12">
            {PHASES.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
                className={`relative flex gap-6 lg:gap-0 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Mobile/tablet left dot */}
                <div className="shrink-0 flex flex-col items-center lg:hidden">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white z-10"
                    style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.color}cc)`, boxShadow: `0 0 16px ${phase.color}50` }}>
                    {i + 1}
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 lg:w-[45%] lg:flex-none glass rounded-2xl p-5 sm:p-6 border border-white/[0.06] hover:border-white/[0.12] card-hover transition-all`}
                  style={{ borderColor: `${phase.color}15` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{phase.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs text-[#64748b] font-mono">{phase.week}</div>
                      <div className="text-base font-bold text-white">{phase.phase}</div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${phase.color}20`, color: phase.color, border: `1px solid ${phase.color}40` }}>
                      {phase.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94a3b8] mb-3">{phase.description}</p>
                  <ul className="space-y-1.5">
                    {phase.milestones.map((m, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-[#94a3b8]">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: phase.color }} />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Desktop center node */}
                <div className="hidden lg:flex lg:w-[10%] items-start justify-center pt-4 shrink-0">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white z-10"
                    style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.color}cc)`, boxShadow: `0 0 20px ${phase.color}60` }}>
                    {i + 1}
                  </div>
                </div>

                {/* Desktop spacer */}
                <div className="hidden lg:block lg:w-[45%] lg:flex-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
