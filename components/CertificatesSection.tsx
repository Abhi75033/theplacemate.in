'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ShieldCheck, Eye, X, ChevronLeft, ChevronRight, ExternalLink, ZoomIn, ZoomOut, Check, Share2 } from 'lucide-react'
import Image from 'next/image'

const CERTIFICATES = [
  {
    id: 'industrial-training',
    title: 'Certificate of Industrial Training',
    recipient: 'Abhishek Kumar',
    issuer: 'PlaceMate',
    date: 'Oct 01, 2023 - Oct 31, 2023',
    description: 'Awarded for demonstrating dedication, active participation, and outstanding professionalism in an intensive 1-Month Industrial Training program.',
    image: '/certificates/industrial-training.png',
    skills: ['Full-Stack Development', 'Industrial Standards', 'Software Architecture', 'Agile Workflows'],
    verification: 'MSME, NSDC, Skill India, ISO 9001, Startup India Approved',
    badge: '🏆 Industrial Training',
    credentialId: 'PM-IT-2023-8849',
    category: 'Industrial Training',
    verificationUrl: 'https://www.theplacemate.in/'
  },
  {
    id: 'internship',
    title: 'Certificate of Internship',
    recipient: 'Abhishek Kumar',
    issuer: 'PlaceMate',
    date: 'Oct 01, 2023 - Nov 15, 2023',
    description: 'Awarded for successfully completing the Psychology Internship, demonstrating consistency, active participation, and user research innovation.',
    image: '/certificates/internship.png',
    skills: ['Psychology & UX Research', 'User Behavior Analysis', 'Product Innovation', 'Consistency'],
    verification: 'MSME, NSDC, Skill India, ISO 9001, Startup India Approved',
    badge: '🎓 Psychology Internship',
    credentialId: 'PM-INT-2023-9021',
    category: 'Psychology & UX Research',
    verificationUrl: 'https://www.theplacemate.in/'
  },
  {
    id: 'ibm-cloud',
    title: 'IBM Cloud Fundamental',
    recipient: 'Rahul Bedi',
    issuer: 'IBM CE (IBM Skills Network)',
    date: 'April 23, 2024',
    description: 'Issued by IBM to certify successful completion and passing grade in the IBM Cloud Fundamental curriculum, verifying expertise in core cloud models and services.',
    image: '/certificates/ibm-cloud-fundamental.jpg',
    skills: ['Cloud Computing', 'IBM Cloud Infrastructure', 'Virtualization Services', 'Cloud Architecture'],
    verification: 'IBM Skills Network Registry Verified',
    badge: '☁️ IBM Cloud Certified',
    credentialId: 'IBM-CF-2024-6f6c',
    category: 'Cloud Engineering',
    verificationUrl: 'https://courses.etrain.skillsnetwork.site/certificates/6f6c53e5f0b94b0da937f44570b1e7d0'
  }
]

export default function CertificatesSection() {
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const modalRef = useRef<HTMLDivElement>(null)

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (activeCertIndex === null) return
    setActiveCertIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : CERTIFICATES.length - 1))
    setIsZoomed(false)
    setTilt({ x: 0, y: 0 })
  }, [activeCertIndex])

  const handleNext = useCallback(() => {
    if (activeCertIndex === null) return
    setActiveCertIndex((prev) => (prev !== null && prev < CERTIFICATES.length - 1 ? prev + 1 : 0))
    setIsZoomed(false)
    setTilt({ x: 0, y: 0 })
  }, [activeCertIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCertIndex === null) return
      if (e.key === 'Escape') setActiveCertIndex(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeCertIndex, handlePrev, handleNext])

  // Lock scroll when modal is active
  useEffect(() => {
    if (activeCertIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeCertIndex])

  // Tilt calculations on mouse move
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isZoomed) return
    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left - box.width / 2
    const y = e.clientY - box.top - box.height / 2
    setTilt({
      x: (x / (box.width / 2)) * 6,
      y: (y / (box.height / 2)) * -6
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section className="relative section-padding overflow-hidden grid-overlay" id="certificates">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(20,184,166,0.06)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(11,60,109,0.06)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass text-xs font-semibold px-4 py-2 rounded-full border border-[#14B8A6]/30 text-[#14B8A6] mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            100% Verified Career Credentials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4"
          >
            Our Graduates&apos; <span className="gradient-text text-glow">Official Certifications</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#94a3b8]"
          >
            PlaceMate credentials stand out. Review authentic certificates earned by students through industrial training, rigorous internships, and globally recognized curriculum partners.
          </motion.p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col glass rounded-2xl border border-white/[0.06] hover:border-[#14B8A6]/30 overflow-hidden card-hover h-full"
            >
              {/* Image Container with high contrast overlay */}
              <div 
                className="relative aspect-[1.414/1] w-full bg-[#0a0a12] border-b border-white/[0.04] overflow-hidden cursor-pointer"
                onClick={() => {
                  setActiveCertIndex(index)
                  setIsZoomed(false)
                }}
              >
                {/* Visual Glow behind card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                <Image
                  src={cert.image}
                  alt={cert.title}
                  fill
                  unoptimized // Crucial to maintain full sharpness and no blur
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="glass px-3 py-1.5 rounded-full text-xs font-mono text-[#14B8A6] border border-white/[0.08] shadow-lg">
                    {cert.badge}
                  </span>
                </div>

                {/* Eye Hover overlay */}
                <div className="absolute inset-0 bg-[#050508]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 z-20">
                  <div className="flex flex-col items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="p-3 bg-[#14B8A6] rounded-full text-white shadow-lg shadow-[#14B8A6]/30">
                      <Eye className="w-5 h-5 animate-pulse" />
                    </span>
                    <span className="text-xs font-semibold text-white tracking-wider uppercase">View Full Resolution</span>
                  </div>
                </div>
              </div>

              {/* Certificate Metadata / Details */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-[#64748b] tracking-wider uppercase">{cert.issuer}</span>
                    <div className="flex items-center gap-1.5 text-xs text-[#10b981] bg-[#10b981]/5 px-2.5 py-1 rounded-full border border-[#10b981]/15">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                      </span>
                      Verified Credential
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#14B8A6] transition-colors duration-200">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-[#94a3b8] mb-4 leading-relaxed line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono font-medium px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05] text-[#94a3b8] hover:text-white hover:border-[#14B8A6]/20 transition-all"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs text-[#64748b]">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#475569] mb-0.5">Recipient</span>
                    <span className="font-semibold text-white">{cert.recipient}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] uppercase tracking-wider text-[#475569] mb-0.5">Date Issued</span>
                    <span className="font-medium text-[#cbd5e1]">{cert.date.split(' - ')[0]}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal View */}
      <AnimatePresence>
        {activeCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-6 bg-[#030712]/95 backdrop-blur-xl overflow-y-auto terminal"
            onClick={() => setActiveCertIndex(null)}
          >
            {/* Cinematic background lighting */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#14B8A6]/15 via-[#0B3C6D]/25 to-[#F97316]/10 rounded-full blur-3xl opacity-60 mix-blend-screen" />
              <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>

            {/* Top Controls / Actions */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
              {/* Copy Verification Link (Share) */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const url = CERTIFICATES[activeCertIndex].verificationUrl || `https://www.theplacemate.in/`
                  navigator.clipboard.writeText(url)
                  setCopiedIndex(activeCertIndex)
                  setTimeout(() => setCopiedIndex(null), 2000)
                }}
                className="p-2.5 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md rounded-full text-slate-300 hover:text-white transition-all border border-white/10 shadow-lg hover:shadow-[#14B8A6]/20 hover:border-[#14B8A6]/40 flex items-center justify-center hover:scale-105"
                title="Copy Verification Link"
              >
                {copiedIndex === activeCertIndex ? <Check className="w-4 h-4 text-[#14B8A6]" /> : <Share2 className="w-4 h-4" />}
              </button>

              {/* Zoom Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsZoomed(!isZoomed)
                }}
                className="p-2.5 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md rounded-full text-slate-300 hover:text-white transition-all border border-white/10 shadow-lg hover:shadow-[#14B8A6]/20 hover:border-[#14B8A6]/40 flex items-center justify-center hover:scale-105"
                title={isZoomed ? 'Zoom Out' : 'Zoom In'}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              {/* Open Raw Image */}
              <a
                href={CERTIFICATES[activeCertIndex].image}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2.5 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md rounded-full text-slate-300 hover:text-white transition-all border border-white/10 shadow-lg hover:shadow-[#14B8A6]/20 hover:border-[#14B8A6]/40 flex items-center justify-center hover:scale-105"
                title="View Raw Image"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                onClick={() => setActiveCertIndex(null)}
                className="p-2.5 bg-red-950/80 hover:bg-red-900/90 backdrop-blur-md rounded-full text-red-200 hover:text-white transition-all border border-red-900/40 shadow-lg flex items-center justify-center hover:scale-105"
                title="Close Viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Left Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-slate-900/60 hover:bg-slate-800/80 rounded-full text-slate-300 hover:text-white border border-white/10 shadow-lg transition-all hidden md:flex items-center justify-center hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Modal Content Wrapper */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full flex flex-col items-center justify-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Certificate Image Frame / Floating Glass Card */}
              <div 
                ref={modalRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`relative w-full aspect-[1.414/1] max-h-[50vh] md:max-h-[58vh] flex items-center justify-center bg-slate-950/40 rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-300 ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
                style={{
                  transform: isZoomed 
                    ? 'perspective(1000px) scale(1.35)' 
                    : `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: isZoomed ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s ease-out',
                  imageRendering: '-webkit-optimize-contrast',
                }}
              >
                <div 
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    transform: isZoomed ? 'scale(1.2)' : 'scale(1)',
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                  <Image
                    src={CERTIFICATES[activeCertIndex].image}
                    alt={CERTIFICATES[activeCertIndex].title}
                    fill
                    unoptimized // Disable Next.js image optimization API to preserve 100% of raw image quality & text readability
                    className="object-contain p-2 md:p-4 select-none"
                    priority
                  />
                </div>
                
                {/* Holographic light sheen overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-overlay transition-opacity duration-300" 
                  style={{
                    transform: `translateX(${tilt.x * 10}px) translateY(${tilt.y * 10}px)`,
                  }}
                />
              </div>

              {/* Bottom detail card */}
              <div className="w-full mt-6 bg-slate-950/85 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row gap-6 items-stretch justify-between text-left">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold font-mono bg-gradient-to-r from-[#14B8A6] to-[#0B3C6D] text-white border border-[#14B8A6]/20 shadow-sm">
                      {CERTIFICATES[activeCertIndex].category || 'Certification'}
                    </span>
                    <span className="text-slate-700 select-none font-light">|</span>
                    <div className="flex items-center gap-1.5 text-xs text-[#14B8A6] font-medium">
                      <ShieldCheck className="w-4 h-4 text-[#14B8A6] animate-pulse" />
                      <span className="text-[11px] font-mono tracking-wide">{CERTIFICATES[activeCertIndex].verification}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl md:text-2xl font-black text-white leading-tight mb-1">
                      {CERTIFICATES[activeCertIndex].title}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Issued to <span className="text-white font-bold text-sm bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">{CERTIFICATES[activeCertIndex].recipient}</span> &bull; Issued on {CERTIFICATES[activeCertIndex].date.split(' - ')[0]}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {CERTIFICATES[activeCertIndex].description}
                  </p>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {CERTIFICATES[activeCertIndex].skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[9px] font-mono px-2 py-1 rounded bg-[#14B8A6]/5 border border-[#14B8A6]/15 text-[#14B8A6] hover:bg-[#14B8A6]/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Right Side Trust / ID Panel */}
                <div className="md:w-64 shrink-0 flex flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 space-y-4">
                  <div className="w-full text-left md:text-right space-y-1">
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono">Credential ID</span>
                    <span className="font-mono text-xs font-semibold text-white bg-slate-900 px-2.5 py-1 rounded border border-white/5 inline-block">
                      {CERTIFICATES[activeCertIndex].credentialId || 'PM-CRED-VALID'}
                    </span>
                  </div>

                  <div className="w-full text-left md:text-right space-y-1">
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-mono">Verification Status</span>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981] text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                      Authentic Credential
                    </div>
                  </div>
                  
                  <div className="w-full pt-2">
                    {CERTIFICATES[activeCertIndex].verificationUrl && (
                      <a
                        href={CERTIFICATES[activeCertIndex].verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-[#14B8A6]/30 text-white font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all"
                      >
                        Verify Online <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-slate-900/60 hover:bg-slate-800/80 rounded-full text-slate-300 hover:text-white border border-white/10 shadow-lg transition-all hidden md:flex items-center justify-center hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Onboarding helper bar (bottom of modal) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-lg text-[10px] font-mono text-slate-300 flex items-center gap-4 z-40">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-sans text-[9px] border border-white/15">Esc</kbd> Close
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-sans text-[9px] border border-white/15">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-sans text-[9px] border border-white/15">→</kbd> Navigate
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-sans text-[9px] border border-white/15">Click</kbd> Zoom
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
