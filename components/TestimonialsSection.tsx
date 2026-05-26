'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  ArrowDown, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Briefcase 
} from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  avatar: string
  color: string
  company: string
  salary: string
  quote: string
  techs: string[]
  struggles: string[]
  successMetrics: string[]
  growth: {
    before: number
    after: number
    metricName: string
  }
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Aarav Shah',
    role: 'Full Stack Engineer',
    avatar: 'AS',
    color: '#14B8A6',
    company: 'Razorpay',
    salary: '₹18 LPA',
    quote: 'PlaceMate didn\'t just teach me code — they gave me the real-world experience I needed. The internship phase was the game-changer. I\'ve shipped 6 production apps and had 3 job offers.',
    techs: ['React', 'Next.js', 'Node.js', 'AWS'],
    struggles: [
      'Struggling CS student with no practical skills',
      'Resumes got rejected by 50+ companies',
      'No guidance on structured interview prep'
    ],
    successMetrics: [
      'Placed as Full Stack Engineer at Razorpay',
      'Offered ₹18 LPA starting salary package',
      'Shipped 6 production-ready web apps'
    ],
    growth: {
      before: 15,
      after: 95,
      metricName: 'Dev Skills'
    }
  },
  {
    name: 'Preethi Rao',
    role: 'UI/UX Designer',
    avatar: 'PR',
    color: '#F97316',
    company: 'Swiggy',
    salary: '₹14 LPA',
    quote: 'I came in knowing nothing about design tools. The mentorship was exceptional — my portfolio went from blank to 12 case studies. I got hired before the cohort even ended.',
    techs: ['Figma', 'Framer', 'Design Systems'],
    struggles: [
      'Arts graduate with no tech background',
      'Portfolio was completely blank & unpolished',
      'Confused about UX research & industry tools'
    ],
    successMetrics: [
      'Hired before the cohort even ended',
      'Built a stellar portfolio with 12 case studies',
      'Offered ₹14 LPA Package at Swiggy'
    ],
    growth: {
      before: 10,
      after: 92,
      metricName: 'Design Competency'
    }
  },
  {
    name: 'Karan Mehta',
    role: 'AI Engineer',
    avatar: 'KM',
    color: '#0B3C6D',
    company: 'GrowthSpace',
    salary: '₹22 LPA',
    quote: 'The GenAI track is incredible. I learned LangChain, RAG, and OpenAI APIs by actually building real products. The mentors are from the industry and give actual feedback.',
    techs: ['Python', 'LangChain', 'OpenAI'],
    struggles: [
      'Python beginner with no AI/ML experience',
      'Stuck in tutorial hell, copying basic scripts',
      'No practical product-building knowledge'
    ],
    successMetrics: [
      'AI Engineer at high-growth GenAI startup',
      'Built and deployed 3 live RAG applications',
      'Offered ₹22 LPA CTC within 4 months'
    ],
    growth: {
      before: 20,
      after: 96,
      metricName: 'AI Engineering'
    }
  },
  {
    name: 'Simran Kaur',
    role: 'DevOps Engineer',
    avatar: 'SK',
    color: '#14B8A6',
    company: 'CloudScale',
    salary: '₹16 LPA',
    quote: 'The DevOps track covered everything — Docker, Kubernetes, AWS, CI/CD pipelines. The hands-on approach and real deployment projects made all the difference in interviews.',
    techs: ['Docker', 'Kubernetes', 'AWS'],
    struggles: [
      'IT support engineer wanting to escape tickets',
      'Zero practical knowledge of AWS, CI/CD, or K8s',
      'Thought DevOps was only for experienced devs'
    ],
    successMetrics: [
      'DevOps Engineer with cloud infra expertise',
      'Designed production-grade AWS environments',
      'Offered ₹16 LPA Cloud Specialist role'
    ],
    growth: {
      before: 25,
      after: 90,
      metricName: 'Infra Automation'
    }
  }
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  // Mobile swipe gesture support
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const minSwipeDistance = 50

  // Auto-slide logic with progress tracking (5.5 seconds loop)
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setCurrent(c => (c + 1) % TESTIMONIALS.length)
          return 0
        }
        return p + 2 // 50 steps * 110ms = 5.5 seconds
      })
    }, 110)
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

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null)
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return
    const distance = touchStartX - touchEndX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      next()
    } else if (isRightSwipe) {
      prev()
    }
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
            ? <span key={idx} className="font-extrabold text-[#0B3C6D] bg-[#14B8A6]/10 px-1.5 py-0.5 rounded border border-[#14B8A6]/25 shadow-sm inline-block tracking-tight">{sub}</span>
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
      className="section-padding relative overflow-hidden bg-slate-50"
    >
      {/* Background Grid & Ambient Glow Orbs */}
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#14B8A6]/10 to-[#0B3C6D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#F97316]/8 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="glass rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200/80 shadow-[0_20px_50px_rgba(11,60,109,0.05)] mb-8 relative overflow-hidden cursor-default group"
          >
            {/* Ambient subtle back glow matching student theme */}
            <div className="absolute inset-0 opacity-40 rounded-3xl transition-all duration-700 group-hover:scale-105 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at top right, ${t.color}10, transparent 65%)` }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#14B8A6]/35 to-transparent" />

            <div className="relative z-10 grid md:grid-cols-12 gap-8 md:gap-10 items-stretch">
              
              {/* Left Column: Quote Card (7/12 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                <div className="relative p-6 md:p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-[0_15px_35px_rgba(0,0,0,0.015)] overflow-hidden flex-1 flex flex-col justify-between transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(11,60,109,0.04)]">
                  
                  {/* Floating Quote Icon */}
                  <div className="absolute -top-3 -left-3 w-16 h-16 opacity-[0.05] pointer-events-none select-none">
                    <Quote className="w-full h-full text-[#14B8A6]" />
                  </div>

                  <div className="relative z-10 mb-8">
                    <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-[#14B8A6] mb-4">
                      <Sparkles className="w-3.5 h-3.5" /> Career Showcase
                    </span>
                    <blockquote className="text-base sm:text-lg md:text-xl font-bold text-[#0F172A] leading-relaxed tracking-tight">
                      &ldquo;{highlightQuoteText(t.quote)}&rdquo;
                    </blockquote>
                  </div>

                  {/* Profile info & Salary details inside card */}
                  <div className="flex items-center gap-4 pt-5 border-t border-slate-200/60 mt-auto">
                    <div className="relative">
                      {/* Avatar glow wrapper */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#14B8A6] to-purple-500 blur-sm opacity-50 animate-pulse pointer-events-none" />
                      <div className="relative w-13 h-13 rounded-full bg-[#0F172A] border border-white/90 flex items-center justify-center text-sm font-black text-white shadow-md transition-all duration-500 group-hover:scale-105">
                        <span className="bg-gradient-to-br from-white to-slate-200 bg-clip-text text-transparent">{t.avatar}</span>
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-[#14B8A6] border-2 border-white rounded-full flex items-center justify-center shadow">
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="font-black text-[#0B3C6D] text-sm sm:text-base flex items-center gap-1.5">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-[#475569] font-semibold">{t.role}</div>
                    </div>
                    
                    {/* Company Logo and salary tag */}
                    <div className="ml-auto text-right flex flex-col items-end gap-1.5">
                      <div className="bg-slate-900/[0.03] border border-slate-200/80 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm transition-all duration-300 group-hover:bg-[#14B8A6]/5 group-hover:border-[#14B8A6]/20">
                        <Briefcase className="w-3 h-3 text-[#14B8A6]" />
                        <span className="text-[10px] font-black text-[#0B3C6D] uppercase tracking-wider">{t.company}</span>
                      </div>
                      <div className="text-[10px] font-bold text-[#475569]">{t.salary} package</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Before/After & Tech (5/12 cols) */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                
                {/* Before Card (Struggle) */}
                <div className="relative p-5 rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-500/[0.03] to-orange-500/[0.01] backdrop-blur-md shadow-[0_8px_30px_rgba(239,68,68,0.02)] transition-all duration-500 overflow-hidden group/before hover:border-red-500/30">
                  {/* Red/orange warm ambient glow */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-500/10 rounded-full blur-xl group-hover/before:bg-red-500/15 transition-colors duration-500 pointer-events-none" />
                  
                  <div className="text-[10px] font-semibold text-red-500 mb-3.5 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                    Before PlaceMate
                  </div>
                  
                  {/* Struggles List */}
                  <ul className="space-y-2 relative z-10">
                    {t.struggles.map((struggle, idx) => (
                      <li key={idx} className="text-xs text-slate-600 font-medium flex items-start gap-2">
                        <span className="text-red-400 mt-0.5 shrink-0">•</span>
                        <span>{struggle}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Static Downward Transformation Connector */}
                <div className="flex flex-col items-center justify-center my-1 relative">
                  {/* Glowing line segment */}
                  <div className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-500/20 via-[#F97316]/20 to-[#14B8A6]/20" />
                  
                  <div className="relative z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#14B8A6]/30 hover:shadow-[0_0_15px_rgba(20,184,166,0.15)] group/arrow">
                    <ArrowDown className="w-4 h-4 text-[#0B3C6D] transition-transform duration-300 group-hover/arrow:translate-y-0.5" />
                  </div>
                </div>
                
                {/* After Card (Success) */}
                <div className="relative p-5 rounded-2xl border border-[#14B8A6]/20 bg-gradient-to-br from-[#14B8A6]/[0.04] to-purple-500/[0.02] backdrop-blur-md shadow-[0_12px_40px_rgba(20,184,166,0.04)] transition-all duration-500 overflow-hidden group/after hover:border-[#14B8A6]/40 hover:shadow-[0_15px_45px_rgba(20,184,166,0.08)]">
                  {/* Cyan/purple success ambient glow */}
                  <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-[#14B8A6]/10 rounded-full blur-2xl group-hover/after:bg-[#14B8A6]/15 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute -top-12 -left-12 w-20 h-20 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="text-[10px] font-semibold text-[#14B8A6] mb-3.5 uppercase tracking-wider flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6] animate-pulse" />
                      After PlaceMate
                    </div>
                    <span className="inline-flex items-center gap-1 text-[8px] font-bold px-2 py-0.5 rounded bg-[#14B8A6]/10 text-[#0B3C6D] border border-[#14B8A6]/20">
                      Verified
                    </span>
                  </div>
                  
                  {/* Success Metrics List */}
                  <ul className="space-y-2 relative z-10">
                    {t.successMetrics.map((metric, idx) => (
                      <li key={idx} className="text-xs text-[#0B3C6D] font-bold flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#14B8A6] shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mini Skill Growth Chart */}
                <div className="relative p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-200/60 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.01] to-[#14B8A6]/[0.01] pointer-events-none" />
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#14B8A6]" />
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">{t.growth.metricName} level</span>
                    </div>
                    <div className="text-xs font-black text-[#14B8A6] flex items-center gap-1">
                      <span>{t.growth.before}%</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-purple-600">{t.growth.after}%</span>
                    </div>
                  </div>
                  
                  {/* Skill Progress Bar Visualizer */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/50">
                    <div 
                      className="absolute top-0 bottom-0 left-0 bg-red-400/80 z-10" 
                      style={{ width: `${t.growth.before}%` }} 
                    />
                    <motion.div 
                      key={current}
                      initial={{ width: `${t.growth.before}%` }}
                      animate={{ width: `${t.growth.after}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-red-400 via-[#F97316] to-[#14B8A6] rounded-full"
                    />
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="pt-3 border-t border-slate-200/60">
                  <span className="block text-[8px] uppercase tracking-widest text-slate-500 font-extrabold mb-2.5">Technologies Learned</span>
                  <div className="flex flex-wrap gap-1.5">
                    {t.techs.map(tech => (
                      <span key={tech} className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#14B8A6]/5 border border-[#14B8A6]/15 text-[#0B3C6D] hover:bg-[#14B8A6]/10 transition-colors">
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
        <div className="flex items-center justify-between px-2 pt-2">
          {/* Navigation dots with progress indicator */}
          <div className="flex gap-2.5 items-center">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => handleNav(i)}
                className="relative h-2.5 rounded-full overflow-hidden transition-all duration-300 bg-slate-200/80 shadow-inner"
                style={{ width: i === current ? '44px' : '10px' }}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                {i === current && (
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-[#14B8A6] to-purple-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]" 
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
          <div className="flex gap-2.5">
            <button 
              onClick={prev} 
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm flex items-center justify-center text-[#0B3C6D] hover:text-[#14B8A6] hover:border-[#14B8A6]/30 hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:scale-105 transition-all duration-300 active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={next} 
              className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm flex items-center justify-center text-[#0B3C6D] hover:text-[#14B8A6] hover:border-[#14B8A6]/30 hover:shadow-[0_0_15px_rgba(20,184,166,0.1)] hover:scale-105 transition-all duration-300 active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
