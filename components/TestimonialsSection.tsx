'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, ArrowDown, ArrowRight } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Aarav Shah', role: 'Full Stack Engineer @ Razorpay', avatar: 'AS', color: '#14B8A6',
    before: 'Struggling CS student with no practical skills', after: 'Full Stack Engineer earning ₹18 LPA',
    salary: '₹18 LPA', quote: 'PlaceMate didn\'t just teach me code — they gave me the real-world experience I needed. The internship phase was the game-changer. I\'ve shipped 6 production apps and had 3 job offers.',
    techs: ['React', 'Next.js', 'Node.js', 'AWS'],
  },
  {
    name: 'Preethi Rao', role: 'UI/UX Designer @ Swiggy', avatar: 'PR', color: '#F97316',
    before: 'Arts graduate with no tech background', after: 'Product Designer at a top startup',
    salary: '₹14 LPA', quote: 'I came in knowing nothing about design tools. The mentorship was exceptional — my portfolio went from blank to 12 case studies. I got hired before the cohort even ended.',
    techs: ['Figma', 'Framer', 'Design Systems'],
  },
  {
    name: 'Karan Mehta', role: 'AI Engineer @ Startup', avatar: 'KM', color: '#0B3C6D',
    before: 'Python beginner, no AI experience', after: 'Building AI SaaS products independently',
    salary: '₹22 LPA', quote: 'The GenAI track is incredible. I learned LangChain, RAG, and OpenAI APIs by actually building real products. The mentors are from the industry and give actual feedback.',
    techs: ['Python', 'LangChain', 'OpenAI'],
  },
  {
    name: 'Simran Kaur', role: 'DevOps Engineer @ MNC', avatar: 'SK', color: '#14B8A6',
    before: 'IT support engineer wanting to level up', after: 'DevOps Engineer with cloud expertise',
    salary: '₹16 LPA', quote: 'The DevOps track covered everything — Docker, Kubernetes, AWS, CI/CD pipelines. The hands-on approach and real deployment projects made all the difference in interviews.',
    techs: ['Docker', 'Kubernetes', 'AWS'],
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  // Auto-slide logic with progress tracking
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setCurrent(c => (c + 1) % TESTIMONIALS.length)
          return 0
        }
        return p + 2 // 50 steps * 100ms = 5 seconds total auto-slide interval
      })
    }, 100)
    return () => clearInterval(interval)
  }, [isHovered])

  const prev = () => {
    setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    setProgress(0)
  }

  const next = () => {
    setCurrent(c => (c + 1) % TESTIMONIALS.length)
    setProgress(0)
  }

  const handleNav = (index: number) => {
    setCurrent(index)
    setProgress(0)
  }

  // Highlight specific emotional phrases in quotes
  const highlightQuoteText = (text: string) => {
    const highlights = [
      'real-world experience',
      'game-changer',
      '3 job offers',
      'shipped 6 production apps',
      'exceptional',
      'hired before the cohort even ended',
      'incredible',
      'building real products',
      'made all the difference'
    ]
    
    let parts: (string | JSX.Element)[] = [text]
    highlights.forEach(h => {
      parts = parts.flatMap(part => {
        if (typeof part !== 'string') return part
        const regex = new RegExp(`(${h})`, 'gi')
        const subParts = part.split(regex)
        return subParts.map((sub, idx) => 
          idx % 2 === 1 
            ? <span key={idx} className="font-extrabold text-[#0B3C6D] bg-gradient-to-r from-[#14B8A6]/10 to-[#F97316]/10 px-1 py-0.5 rounded border border-[#14B8A6]/20 inline-block">{sub}</span>
            : sub
        )
      })
    })
    return parts
  }

  const t = TESTIMONIALS[current]

  return (
    <section 
      id="testimonials" 
      className="section-padding relative overflow-hidden bg-[#F8FAFC]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 grid-overlay opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(20,184,166,0.05)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(249,115,22,0.03)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-[#14B8A6]/30 text-[#14B8A6] bg-[#14B8A6]/5 mb-4">
            🎓 Student Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] mb-4">
            Real people, <span className="gradient-text">real results</span>
          </h2>
          <p className="text-[#475569] text-base sm:text-lg">
            Every story here is from a real student who completed the program and transformed their career.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="glass rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-[0_15px_40px_rgba(11,60,109,0.06)] mb-8 relative overflow-hidden cursor-default group"
          >
            {/* Glow background */}
            <div className="absolute inset-0 opacity-40 rounded-3xl transition-all duration-500 group-hover:scale-105"
              style={{ background: `radial-gradient(ellipse at top right, ${t.color}15, transparent 65%)` }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#14B8A6]/40 to-transparent" />

            <div className="relative z-10 grid md:grid-cols-12 gap-8 md:gap-10 items-stretch">
              
              {/* Left Column: Quote Card (7/12 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/95 to-slate-50/80 border border-slate-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] backdrop-blur-sm overflow-hidden flex-1 flex flex-col justify-center transition-all group-hover:shadow-[0_8px_30px_rgba(11,60,109,0.05)]">
                  
                  {/* Floating Quote Icon */}
                  <div className="absolute -top-3 -left-3 w-16 h-16 opacity-[0.06] pointer-events-none select-none">
                    <Quote className="w-full h-full text-[#14B8A6]" />
                  </div>

                  <blockquote className="relative z-10 text-base sm:text-lg md:text-xl font-medium text-[#0F172A] leading-relaxed tracking-tight mb-6">
                    &ldquo;{highlightQuoteText(t.quote)}&rdquo;
                  </blockquote>

                  {/* Profile info & Salary details inside card */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-black text-white shadow-md transition-transform group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)`, boxShadow: `0 4px 12px ${t.color}40` }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-extrabold text-[#0B3C6D] text-sm sm:text-base">{t.name}</div>
                      <div className="text-xs text-[#475569] font-medium">{t.role}</div>
                    </div>
                    
                    {/* Floating Package Badge */}
                    <div className="ml-auto text-right bg-gradient-to-br from-[#14B8A6]/10 to-[#0B3C6D]/5 border border-[#14B8A6]/20 px-3.5 py-1.5 rounded-xl shadow-sm hover:scale-105 transition-transform duration-300">
                      <div className="text-sm sm:text-base font-black text-[#0B3C6D]">{t.salary}</div>
                      <div className="text-[8px] font-extrabold uppercase tracking-wider text-[#475569]">CTC Package</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Before/After & Tech (5/12 cols) */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                
                {/* Before Card (Struggle) */}
                <div className="relative p-5 rounded-2xl border border-red-100 bg-gradient-to-br from-red-50/50 to-orange-50/15 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group/before">
                  {/* Muted warm pulse glow */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-400/5 rounded-full blur-xl group-hover/before:bg-red-400/10 transition-colors" />
                  
                  <div className="text-[10px] font-semibold text-red-500 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> 
                    Before PlaceMate
                  </div>
                  <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed mb-3">{t.before}</p>
                  
                  {/* Struggle tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[8px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/5 border border-red-500/10 text-red-500">
                      ⚠️ No projects shipped
                    </span>
                    <span className="text-[8px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/5 border border-red-500/10 text-red-500">
                      ❌ 0 interview calls
                    </span>
                  </div>
                </div>
                
                {/* Transformation Connector with animation */}
                <div className="flex md:flex-col items-center justify-center py-2 md:py-0 md:px-2 gap-2 relative">
                  <div className="p-2 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0B3C6D] text-white shadow-[0_0_15px_rgba(20,184,166,0.3)] animate-pulse relative z-10 scale-105">
                    <ArrowDown className="w-4 h-4 md:hidden block animate-bounce" />
                    <ArrowRight className="w-4 h-4 md:block hidden animate-pulse" />
                  </div>
                  <div className="absolute md:top-0 md:bottom-0 md:w-px md:h-full w-full h-px border-t md:border-t-0 md:border-l border-dashed border-slate-200 pointer-events-none select-none z-0 opacity-80" />
                </div>
                
                {/* After Card (Success) */}
                <div className="relative p-5 rounded-2xl border border-[#14B8A6]/30 bg-gradient-to-br from-[#14B8A6]/5 to-[#0B3C6D]/5 shadow-[0_4px_16px_rgba(20,184,166,0.04)] hover:shadow-lg hover:border-[#14B8A6]/50 transition-all duration-300 overflow-hidden group/after">
                  {/* Cyan success pulse glow */}
                  <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#14B8A6]/10 rounded-full blur-2xl group-hover/after:bg-[#14B8A6]/15 transition-colors" />
                  
                  <div className="text-[10px] font-semibold text-[#14B8A6] mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" /> 
                    After PlaceMate
                  </div>
                  <p className="text-xs sm:text-sm text-[#0B3C6D] font-extrabold leading-relaxed mb-3">{t.after}</p>
                  
                  {/* Success tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[8px] font-mono font-bold px-2 py-0.5 rounded bg-[#10b981]/5 border border-[#10b981]/25 text-[#10b981]">
                      🚀 Placed at Top Firm
                    </span>
                    <span className="text-[8px] font-mono font-bold px-2 py-0.5 rounded bg-[#14B8A6]/5 border border-[#14B8A6]/25 text-[#0B3C6D]">
                      🎓 Industry Certified
                    </span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="block text-[8px] uppercase tracking-wider text-[#475569] font-mono mb-2">Technologies Learned</span>
                  <div className="flex flex-wrap gap-1.5">
                    {t.techs.map(tech => (
                      <span key={tech} className="text-[9px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#14B8A6]/5 border border-[#14B8A6]/15 text-[#0B3C6D] hover:bg-[#14B8A6]/10 transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls / Progress bar pagination */}
        <div className="flex items-center justify-between px-2">
          {/* Navigation dots with progress indicator */}
          <div className="flex gap-2 items-center">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleNav(i)}
                className="relative h-2 rounded-full overflow-hidden transition-all duration-300 bg-slate-200/60"
                style={{ width: i === current ? '36px' : '8px' }}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                {i === current && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-[#14B8A6] to-[#0B3C6D]" 
                    style={{ 
                      width: `${progress}%`,
                      transition: 'width 0.1s linear'
                    }} 
                  />
                )}
              </button>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex gap-2">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-white border border-[#0B3C6D]/10 hover:border-[#14B8A6]/45 text-[#0B3C6D] hover:text-[#14B8A6] hover:bg-[#14B8A6]/5 flex items-center justify-center transition-all shadow-sm active:scale-95">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="w-10 h-10 rounded-full bg-white border border-[#0B3C6D]/10 hover:border-[#14B8A6]/45 text-[#0B3C6D] hover:text-[#14B8A6] hover:bg-[#14B8A6]/5 flex items-center justify-center transition-all shadow-sm active:scale-95">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
