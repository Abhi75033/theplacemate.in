'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ShieldCheck, Eye, X, ChevronLeft, ChevronRight, ExternalLink, ZoomIn, ZoomOut, Check } from 'lucide-react'
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
    badge: '🏆 Industrial Training'
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
    badge: '🎓 Psychology Internship'
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
    verification: 'Verifiable via courses.etrain.skillsnetwork.site/certificates/6f6c53e5f0b94b0da937f44570b1e7d0',
    badge: '☁️ IBM Cloud Certified'
  }
]

export default function CertificatesSection() {
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (activeCertIndex === null) return
    setActiveCertIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : CERTIFICATES.length - 1))
    setIsZoomed(false)
  }, [activeCertIndex])

  const handleNext = useCallback(() => {
    if (activeCertIndex === null) return
    setActiveCertIndex((prev) => (prev !== null && prev < CERTIFICATES.length - 1 ? prev + 1 : 0))
    setIsZoomed(false)
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

  return (
    <section className="relative section-padding overflow-hidden grid-overlay" id="certificates">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass text-xs font-semibold px-4 py-2 rounded-full border border-[#6366f1]/30 text-[#a78bfa] mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
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
              className="group flex flex-col glass rounded-2xl border border-white/[0.06] hover:border-[#6366f1]/30 overflow-hidden card-hover h-full"
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
                  <span className="glass px-3 py-1.5 rounded-full text-xs font-mono text-[#a78bfa] border border-white/[0.08] shadow-lg">
                    {cert.badge}
                  </span>
                </div>

                {/* Eye Hover overlay */}
                <div className="absolute inset-0 bg-[#050508]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 z-20">
                  <div className="flex flex-col items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="p-3 bg-[#6366f1] rounded-full text-white shadow-lg shadow-[#6366f1]/30">
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

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#a78bfa] transition-colors duration-200">
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
                        className="text-[10px] font-mono font-medium px-2 py-1 rounded bg-white/[0.03] border border-white/[0.05] text-[#94a3b8] hover:text-white hover:border-[#6366f1]/20 transition-all"
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

      {/* Lightbox / Modal Modal View */}
      <AnimatePresence>
        {activeCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={() => setActiveCertIndex(null)}
          >
            {/* Close instruction (top of modal) */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
              {/* Zoom Toggle button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsZoomed(!isZoomed)
                }}
                className="p-3 bg-white/[0.05] hover:bg-white/[0.1] rounded-full text-[#cbd5e1] hover:text-white transition-all border border-white/[0.08]"
                title={isZoomed ? 'Zoom Out' : 'Zoom In for details'}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </button>
              
              {/* External view button */}
              <a
                href={CERTIFICATES[activeCertIndex].image}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-3 bg-white/[0.05] hover:bg-white/[0.1] rounded-full text-[#cbd5e1] hover:text-white transition-all border border-white/[0.08]"
                title="Open raw image in new tab"
              >
                <ExternalLink className="w-5 h-5" />
              </a>

              {/* Close button */}
              <button
                onClick={() => setActiveCertIndex(null)}
                className="p-3 bg-white/[0.05] hover:bg-white/[0.1] rounded-full text-[#cbd5e1] hover:text-white transition-all border border-white/[0.08] shadow-lg shadow-black/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Left Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-white/[0.04] hover:bg-white/[0.08] rounded-full text-[#cbd5e1] hover:text-white border border-white/[0.08] transition-all hidden sm:flex items-center justify-center hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Modal Content Wrapper */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Certificate Image Frame */}
              <div 
                ref={modalRef}
                className={`relative w-full aspect-[1.414/1] max-h-[75vh] flex items-center justify-center bg-[#07070d] rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl transition-all duration-300 ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <div 
                  className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
                  style={{
                    transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                >
                  <Image
                    src={CERTIFICATES[activeCertIndex].image}
                    alt={CERTIFICATES[activeCertIndex].title}
                    fill
                    unoptimized // Disable Next.js image optimization API to preserve 100% of raw image quality & text readability
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Bottom detail card */}
              <div className="w-full mt-4 glass p-5 rounded-xl border border-white/[0.08] bg-black/60 shadow-xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-left">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-semibold text-[#a78bfa] tracking-wider font-mono">
                      {CERTIFICATES[activeCertIndex].badge}
                    </span>
                    <span className="text-[10px] font-mono text-[#64748b]">|</span>
                    <span className="text-[10px] font-mono text-[#10b981] flex items-center gap-1">
                      <Check className="w-3 h-3 bg-[#10b981]/10 rounded-full border border-[#10b981]/30 p-0.5" />
                      {CERTIFICATES[activeCertIndex].verification}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">
                    {CERTIFICATES[activeCertIndex].title}
                  </h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    Issued to <span className="text-white font-semibold">{CERTIFICATES[activeCertIndex].recipient}</span> &bull; {CERTIFICATES[activeCertIndex].description}
                  </p>
                </div>
                
                {/* External Validation Action */}
                <div className="shrink-0 flex items-center gap-2 self-stretch md:self-auto justify-end">
                  <span className="text-xs font-mono text-[#cbd5e1] glass px-3 py-1.5 rounded-full border border-white/[0.08]">
                    Issued: {CERTIFICATES[activeCertIndex].date}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3.5 bg-white/[0.04] hover:bg-white/[0.08] rounded-full text-[#cbd5e1] hover:text-white border border-white/[0.08] transition-all hidden sm:flex items-center justify-center hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Escape to close notification (bottom of modal) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#475569] pointer-events-none hidden sm:block">
              Use arrow keys &larr; &rarr; to navigate &bull; Esc to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
