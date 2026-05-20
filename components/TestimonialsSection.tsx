'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Aarav Shah', role: 'Full Stack Engineer @ Razorpay', avatar: 'AS', color: '#6366f1',
    before: 'Struggling CS student with no practical skills', after: 'Full Stack Engineer earning ₹18 LPA',
    salary: '₹18 LPA', quote: 'PlaceMate didn\'t just teach me code — they gave me the real-world experience I needed. The internship phase was the game-changer. I\'ve shipped 6 production apps and had 3 job offers.',
    techs: ['React', 'Node.js', 'AWS'],
  },
  {
    name: 'Preethi Rao', role: 'UI/UX Designer @ Swiggy', avatar: 'PR', color: '#ec4899',
    before: 'Arts graduate with no tech background', after: 'Product Designer at a top startup',
    salary: '₹14 LPA', quote: 'I came in knowing nothing about design tools. The mentorship was exceptional — my portfolio went from blank to 12 case studies. I got hired before the cohort even ended.',
    techs: ['Figma', 'Framer', 'Design Systems'],
  },
  {
    name: 'Karan Mehta', role: 'AI Engineer @ Startup', avatar: 'KM', color: '#06b6d4',
    before: 'Python beginner, no AI experience', after: 'Building AI SaaS products independently',
    salary: '₹22 LPA', quote: 'The GenAI track is incredible. I learned LangChain, RAG, and OpenAI APIs by actually building real products. The mentors are from the industry and give actual feedback.',
    techs: ['Python', 'LangChain', 'OpenAI'],
  },
  {
    name: 'Simran Kaur', role: 'DevOps Engineer @ MNC', avatar: 'SK', color: '#10b981',
    before: 'IT support engineer wanting to level up', after: 'DevOps Engineer with cloud expertise',
    salary: '₹16 LPA', quote: 'The DevOps track covered everything — Docker, Kubernetes, AWS, CI/CD pipelines. The hands-on approach and real deployment projects made all the difference in interviews.',
    techs: ['Docker', 'Kubernetes', 'AWS'],
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setCurrent(c => (c + 1) % TESTIMONIALS.length)
  const t = TESTIMONIALS[current]

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden bg-[#0a0a12]">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.07),transparent_70%)]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="tag mb-4 inline-flex">Student Transformations</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Real people, <span className="gradient-text">real results</span>
          </h2>
          <p className="text-[#94a3b8] text-base sm:text-lg max-w-xl mx-auto">
            Every story here is from a real student who went through the program and transformed their career.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-3xl p-6 sm:p-10 border border-white/[0.08] mb-6 relative overflow-hidden"
          >
            {/* Glow bg */}
            <div className="absolute inset-0 opacity-30 rounded-3xl"
              style={{ background: `radial-gradient(ellipse at top right, ${t.color}15, transparent 60%)` }} />
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${t.color}80, transparent)` }} />

            <div className="relative z-10 grid sm:grid-cols-2 gap-8 items-center">
              {/* Left */}
              <div>
                <Quote className="w-8 h-8 mb-4 opacity-30" style={{ color: t.color }} />
                <p className="text-base sm:text-lg text-[#e2e8f0] leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-black text-white"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`, boxShadow: `0 0 24px ${t.color}50` }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-xs text-[#94a3b8]">{t.role}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-lg font-black" style={{ color: t.color }}>{t.salary}</div>
                    <div className="text-[10px] text-[#64748b]">Package</div>
                  </div>
                </div>
              </div>

              {/* Right: Before/After */}
              <div className="space-y-4">
                <div className="glass rounded-2xl p-4 border border-red-500/10">
                  <div className="text-[10px] font-semibold text-red-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Before PlaceMate
                  </div>
                  <p className="text-sm text-[#94a3b8]">{t.before}</p>
                </div>
                <div className="flex justify-center">
                  <div className="text-2xl">↓</div>
                </div>
                <div className="glass rounded-2xl p-4" style={{ border: `1px solid ${t.color}30`, background: `${t.color}08` }}>
                  <div className="text-[10px] font-semibold mb-2 uppercase tracking-wider flex items-center gap-1.5" style={{ color: t.color }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.color }} /> After PlaceMate
                  </div>
                  <p className="text-sm text-white font-medium">{t.after}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {t.techs.map(tech => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full border"
                      style={{ color: t.color, borderColor: `${t.color}40`, background: `${t.color}10` }}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-[#6366f1]' : 'w-2 bg-white/20'}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} className="w-10 h-10 rounded-full glass border border-white/[0.08] flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-[#6366f1]/40 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full glass border border-white/[0.08] flex items-center justify-center text-[#94a3b8] hover:text-white hover:border-[#6366f1]/40 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
