'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Play, ArrowRight } from 'lucide-react'
import TerminalContactForm from './TerminalContactForm'
import AnimatedTicker from './AnimatedTicker'

const STATS = [
  { value: '2,800+', label: 'Students Trained', icon: '🎓' },
  { value: '500+', label: 'Projects Built', icon: '🚀' },
  { value: '80+', label: 'Hiring Partners', icon: '🏢' },
  { value: '300+', label: 'Internships', icon: '💼' },
]

const FLOATING_TAGS = [
  { text: 'React.js', x: '5%', y: '22%', delay: 0 },
  { text: 'Python', x: '88%', y: '18%', delay: 0.5 },
  { text: 'Next.js', x: '8%', y: '68%', delay: 1 },
  { text: 'Gen AI', x: '85%', y: '62%', delay: 1.5 },
  { text: 'Docker', x: '14%', y: '84%', delay: 0.8 },
  { text: 'Figma', x: '79%', y: '80%', delay: 1.2 },
  { text: 'LangChain', x: '80%', y: '38%', delay: 0.3 },
]

function MagneticButton({ children, className, href, id }: { children: React.ReactNode, className?: string, href?: string, id?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.a
      ref={ref}
      href={href}
      id={id}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}


export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-overlay pt-16"
      id="hero"
    >
      {/* Radial glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18)_0%,transparent_70%)]" />
        <motion.div style={{ y: y2 }} className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_70%)] blur-2xl" />
        <motion.div style={{ y: y3 }} className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(6,182,212,0.07)_0%,transparent_70%)] blur-2xl" />
      </div>

      {/* Animated floating particles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#6366f1]/40 animate-float pointer-events-none"
          style={{
            left: `${12 + (i * 8) % 80}%`,
            top: `${18 + (i * 9) % 65}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${5 + (i % 4)}s`,
          }}
        />
      ))}

      {/* Floating tech tags — desktop only */}
      {FLOATING_TAGS.map((tag, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex items-center gap-1.5 glass text-xs font-mono px-3 py-1.5 rounded-full border border-white/[0.08] text-[#94a3b8] z-20 pointer-events-none"
          style={{ left: tag.x, top: tag.y }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: tag.delay, ease: 'easeInOut' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
          {tag.text}
        </motion.div>
      ))}

      {/* Main content — guaranteed visible */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 glass text-xs font-medium px-4 py-2 rounded-full border border-[#6366f1]/30 text-[#a78bfa] mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              Cohort 2025 — Applications Open
              <ChevronRight className="w-3 h-3" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight mb-5"
            >
              <span className="block text-white">Learn. Build.</span>
              <span className="block gradient-text text-glow">Get Hired.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-[#94a3b8] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Industry-focused cohort programs with{' '}
              <span className="text-white font-medium">real-world projects</span>,{' '}
              <span className="text-white font-medium">mentorship</span>, actual{' '}
              <span className="text-white font-medium">internship experience</span>, and{' '}
              <span className="text-white font-medium">placement support</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10 justify-center lg:justify-start"
            >
              <MagneticButton
                href="#apply"
                id="apply-now-btn"
                className="btn-primary cta-shimmer flex items-center gap-2 text-sm sm:text-base relative z-10"
              >
                <span className="relative z-10">Apply Now</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </MagneticButton>
              <MagneticButton href="#programs" className="btn-secondary flex items-center gap-2 text-sm sm:text-base">
                Explore Programs
              </MagneticButton>
              <a
                href="#counseling"
                className="flex items-center gap-2 text-sm sm:text-base text-[#94a3b8] hover:text-white transition-colors px-2 py-3"
              >
                <Play className="w-4 h-4 text-[#6366f1]" />
                Book Free Counseling
              </a>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {STATS.map((stat, i) => {
                const match = stat.value.match(/^([\d,.]+)(.*)$/)
                const numericVal = match ? parseFloat(match[1].replace(/,/g, '')) : 0
                const suffix = match ? match[2] : ''
                const decimals = stat.value.includes('.') ? 1 : 0
                return (
                  <div
                    key={i}
                    className="glass rounded-xl p-3 text-center border border-white/[0.06] hover:border-[#6366f1]/30 transition-all duration-300"
                  >
                    <div className="text-lg mb-0.5">{stat.icon}</div>
                    <div className="text-xl sm:text-2xl font-bold gradient-text">
                      <AnimatedTicker value={numericVal} suffix={suffix} decimals={decimals} />
                    </div>
                    <div className="text-[10px] sm:text-xs text-[#64748b] font-medium">{stat.label}</div>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Right — terminal + floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-4"
          >
            <TerminalContactForm />

            {/* Placement success card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="glass rounded-xl p-4 border border-white/[0.08]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div>
                  <div className="text-sm font-semibold text-white">Aarav Shah</div>
                  <div className="text-xs text-[#64748b]">Got placed at Razorpay</div>
                </div>
                <div className="ml-auto text-xs font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-full">₹18 LPA</div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {['React', 'Node.js', 'AWS'].map(t => (
                  <span key={t} className="tag text-[10px]">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* PR merged card */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="glass rounded-xl p-4 border border-[#6366f1]/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-xs font-bold shrink-0">PR</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#64748b] mb-0.5">Pull Request merged</div>
                  <div className="text-sm font-medium text-white truncate">feat: AI chatbot with RAG pipeline</div>
                </div>
                <span className="text-[10px] text-[#a78bfa] font-mono whitespace-nowrap">2h ago</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  )
}
