'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Link from 'next/link'

const PHASES = [
  { week: 'Weeks 1–2', title: 'Onboarding & Project Assignment', desc: 'Meet your team, understand the codebase or design system, and receive your project brief. Set up development environment and attend orientation sessions with your project mentor.', icon: '🚀' },
  { week: 'Weeks 3–6', title: 'Core Development Sprint', desc: 'Work on assigned features, attend daily standups, submit pull requests, and receive code reviews from senior developers. Participate in sprint planning and retrospective meetings.', icon: '⚙️' },
  { week: 'Weeks 7–8', title: 'Testing & Deployment', desc: 'Write tests, fix bugs, deploy features to staging and production environments. Prepare project documentation and present your work to the team in a final showcase.', icon: '🎯' },
  { week: 'Post-Internship', title: 'Certificate & References', desc: 'Receive your verified internship completion certificate, performance review, and recommendation letter. Add the experience to your LinkedIn and resume with verifiable credentials.', icon: '🎉' },
]

const BENEFITS = [
  { title: 'Real Company Projects', desc: 'Work on actual product features for startups and tech companies, not simulated exercises. Your code ships to production and serves real users.' },
  { title: 'Mentor-Led Guidance', desc: 'Each intern is assigned a senior developer or designer who provides weekly one-on-one feedback sessions, code reviews, and career advice throughout the internship.' },
  { title: 'Agile Team Experience', desc: 'Participate in sprint planning, daily standups, and retrospectives. Learn the collaborative workflows that every product team uses in the industry.' },
  { title: 'Verifiable Certificate', desc: 'Receive a certificate co-signed by PlaceMate and the partner company. This is a verifiable credential that recruiters and HR teams can validate directly.' },
  { title: 'Portfolio Enhancement', desc: 'Every intern ships at least one significant feature or project that can be showcased in their portfolio with real deployment URLs and code repositories.' },
  { title: 'Networking Opportunities', desc: 'Connect with founders, CTOs, and senior engineers at partner companies. Many interns receive pre-placement offers based on their internship performance.' },
]

export function InternshipTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section className="py-16 bg-[#0a0a12] relative">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-12">
          How the <span className="gradient-text">internship works</span>
        </h2>
        
        <div ref={containerRef} className="relative space-y-6">
          {/* Background track */}
          <div className="absolute left-[43px] top-0 bottom-0 w-0.5 bg-white/[0.04]" />
          {/* Animated active path */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-[43px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#14B8A6] via-[#0B3C6D] to-[#F97316]"
          />

          {PHASES.map((p, i) => (
            <div key={i} className="relative z-10 glass rounded-2xl p-6 border border-white/[0.06] flex gap-5 items-start bg-[#0a0a12]/80">
              <div className="w-14 h-14 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 flex items-center justify-center text-2xl shrink-0">
                {p.icon}
              </div>
              <div>
                <div className="text-xs text-[#14B8A6] font-semibold mb-1">{p.week}</div>
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function InternshipBenefits() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-12">
          Internship <span className="gradient-text">benefits</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-[#14B8A6]/20 transition-all card-hover"
            >
              <h3 className="text-base font-bold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
