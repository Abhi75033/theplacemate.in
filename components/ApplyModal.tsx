'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronRight,
  ChevronLeft,
  Send,
  Calendar,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  GraduationCap,
  Briefcase,
  Building,
  Target,
  MessageCircle,
} from 'lucide-react'

// Course list matching options in the page
const COURSES = [
  { id: 'full-stack', title: 'Full Stack Web Development', duration: '16 Weeks', icon: '💻', color: '#14B8A6' },
  { id: 'ai-eng', title: 'Generative AI & AI Engineering', duration: '14 Weeks', icon: '🤖', color: '#8b5cf6' },
  { id: 'ui-ux', title: 'UI/UX Design & Research', duration: '12 Weeks', icon: '🎨', color: '#F97316' },
  { id: 'devops', title: 'DevOps & Cloud Engineering', duration: '12 Weeks', icon: '⚙️', color: '#06b6d4' },
  { id: 'backend', title: 'Backend Engineering', duration: '12 Weeks', icon: '⚡', color: '#ec4899' },
]

type Step = 'details' | 'profile' | 'course' | 'submitting' | 'success'

export default function ApplyModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>('details')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    status: '', // student, professional, freelancer, other
    orgName: '', // college/company name
    goal: '', // career transition, internship, up-skilling, freelancing
    selectedCourse: '', // course ID
  })

  // Input errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Intercept global clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const clickable = target.closest('a, button')
      if (!clickable) return

      const isApply =
        clickable.getAttribute('data-action') === 'apply' ||
        clickable.textContent?.trim().toLowerCase() === 'apply now' ||
        clickable.textContent?.trim().toLowerCase().startsWith('apply now —') ||
        clickable.getAttribute('href') === '#apply' ||
        clickable.id === 'apply-now-btn'

      if (isApply) {
        e.preventDefault()
        setIsOpen(true)
        setCurrentStep('details')
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  // Programmatic event listener
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setCurrentStep('details')
    }
    window.addEventListener('open-apply-modal', handleOpen)
    return () => window.removeEventListener('open-apply-modal', handleOpen)
  }, [])

  // Canvas confetti animation
  useEffect(() => {
    if (currentStep !== 'success' || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500
      canvas.height = canvas.parentElement?.clientHeight || 600
    }
    resizeCanvas()

    const colors = ['#14B8A6', '#F97316', '#6366f1', '#a78bfa', '#10b981', '#ec4899']
    const particles = Array.from({ length: 90 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -100 - 10,
      r: Math.random() * 5 + 3,
      d: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.05 + 0.02,
      tiltAngle: 0,
      speed: Math.random() * 3 + 2,
    }))

    let animationId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let finished = true

      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental
        p.y += p.speed
        p.x += Math.sin(p.tiltAngle)
        p.tilt = Math.sin(p.tiltAngle) * 12

        if (p.y < canvas.height) {
          finished = false
        }

        ctx.beginPath()
        ctx.lineWidth = p.r
        ctx.strokeStyle = p.color
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y)
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2)
        ctx.stroke()
      })

      if (!finished) {
        animationId = requestAnimationFrame(draw)
      }
    }

    draw()
    return () => cancelAnimationFrame(animationId)
  }, [currentStep])

  const validateDetails = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Full Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required'
    } else if (!/^[+]?[\d\s-]{10,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (10+ digits)'
    }
    if (!formData.city.trim()) newErrors.city = 'City/Location is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateProfile = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.status) newErrors.status = 'Please select your current status'
    if (!formData.orgName.trim()) {
      newErrors.orgName =
        formData.status === 'student' ? 'College Name is required' : 'Company/Organization Name is required'
    }
    if (!formData.goal) newErrors.goal = 'Please select your career goal'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 'details' && validateDetails()) {
      setCurrentStep('profile')
    } else if (currentStep === 'profile' && validateProfile()) {
      setCurrentStep('course')
    }
  }

  const handleBack = () => {
    if (currentStep === 'profile') {
      setCurrentStep('details')
    } else if (currentStep === 'course') {
      setCurrentStep('profile')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.selectedCourse) {
      setErrors({ selectedCourse: 'Please choose a course' })
      return
    }

    setCurrentStep('submitting')

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Log the submission to console (dev environment help)
    console.log('PlaceMate Application Submitted Successfully:', formData)

    setCurrentStep('success')
  }

  // Handle whatsapp redirection
  const handleWhatsAppRedirect = () => {
    const selectedCourseLabel = COURSES.find((c) => c.id === formData.selectedCourse)?.title || 'Selected Program'
    const msg = [
      `🎓 *Application Received — PlaceMate*`,
      ``,
      `👤 *Name:* ${formData.name}`,
      `📧 *Email:* ${formData.email}`,
      `📞 *Phone:* ${formData.phone}`,
      `📍 *Location:* ${formData.city}`,
      `💼 *Status:* ${formData.status}`,
      `🏫 *Org/College:* ${formData.orgName}`,
      `🎯 *Goal:* ${formData.goal}`,
      `📚 *Program:* ${selectedCourseLabel}`,
    ].join('\n')

    window.open(`https://wa.me/916394753801?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="dark-modal relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#09090f] border border-white/[0.08] shadow-[0_0_50px_rgba(20,184,166,0.15)] flex flex-col min-h-[500px]"
          >
            {/* Success Canvas overlay */}
            {currentStep === 'success' && (
              <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />
            )}

            {/* Cinematic background glows */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(20,184,166,0.08),transparent_70%)] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 px-6 pt-6 pb-4 border-b border-white/[0.04] flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span className="gradient-text">PlaceMate</span> Cohort Application
                </h2>
                <p className="text-xs text-[#94a3b8] mt-0.5">Cohort 2025 · Transform Your Career</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-white/[0.08] text-[#94a3b8] hover:text-white hover:border-white/20 transition-all flex items-center justify-center bg-white/[0.02]"
                aria-label="Close application form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Progress Header */}
            {currentStep !== 'submitting' && currentStep !== 'success' && (
              <div className="relative z-10 px-6 py-2 border-b border-white/[0.02] flex items-center justify-between text-xs text-[#64748b]">
                <div className="flex gap-1 items-center">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${currentStep === 'details' ? 'bg-[#14B8A6] text-white' : 'bg-[#14B8A6]/20 text-[#14B8A6]'}`}>1</span>
                  <span className={currentStep === 'details' ? 'text-white font-medium' : ''}>Contact</span>
                </div>
                <div className="flex-1 h-px bg-white/[0.06] mx-2" />
                <div className="flex gap-1 items-center">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${currentStep === 'profile' ? 'bg-[#14B8A6] text-white' : currentStep === 'course' ? 'bg-[#14B8A6]/20 text-[#14B8A6]' : 'bg-white/[0.04]'}`}>2</span>
                  <span className={currentStep === 'profile' ? 'text-white font-medium' : ''}>Profile</span>
                </div>
                <div className="flex-1 h-px bg-white/[0.06] mx-2" />
                <div className="flex gap-1 items-center">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${currentStep === 'course' ? 'bg-[#14B8A6] text-white' : 'bg-white/[0.04]'}`}>3</span>
                  <span className={currentStep === 'course' ? 'text-white font-medium' : ''}>Program</span>
                </div>
              </div>
            )}

            {/* Body */}
            <div className="relative z-10 flex-1 p-6 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {currentStep === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="modal-name" className="text-xs font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#14B8A6]" /> Full Name
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full bg-white/[0.02] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] border border-white/[0.08] focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/20 focus:outline-none transition-all"
                        placeholder="e.g. Priyanjali Sen"
                      />
                      {errors.name && <span className="text-[11px] text-red-400 mt-1 block">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="modal-email" className="text-xs font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#14B8A6]" /> Email Address
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        className="w-full bg-white/[0.02] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] border border-white/[0.08] focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/20 focus:outline-none transition-all"
                        placeholder="you@example.com"
                      />
                      {errors.email && <span className="text-[11px] text-red-400 mt-1 block">{errors.email}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Phone */}
                      <div>
                        <label htmlFor="modal-phone" className="text-xs font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#14B8A6]" /> WhatsApp Number
                        </label>
                        <input
                          id="modal-phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                          className="w-full bg-white/[0.02] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] border border-white/[0.08] focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/20 focus:outline-none transition-all"
                          placeholder="+91 XXXXX XXXXX"
                        />
                        {errors.phone && <span className="text-[11px] text-red-400 mt-1 block">{errors.phone}</span>}
                      </div>

                      {/* City */}
                      <div>
                        <label htmlFor="modal-city" className="text-xs font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#14B8A6]" /> Current City
                        </label>
                        <input
                          id="modal-city"
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                          className="w-full bg-white/[0.02] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] border border-white/[0.08] focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/20 focus:outline-none transition-all"
                          placeholder="e.g. Bangalore"
                        />
                        {errors.city && <span className="text-[11px] text-red-400 mt-1 block">{errors.city}</span>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Status Dropdown */}
                    <div>
                      <label htmlFor="modal-status" className="text-xs font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-[#14B8A6]" /> I am currently a:
                      </label>
                      <select
                        id="modal-status"
                        value={formData.status}
                        onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
                        className="w-full bg-[#0d0d1a] border border-white/[0.08] text-white rounded-xl px-4 py-2.5 text-sm focus:border-[#14B8A6]/50 focus:outline-none transition-all"
                      >
                        <option value="" disabled>Select Status</option>
                        <option value="student">College Student</option>
                        <option value="professional">Working Professional</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="other">Self-taught / Unemployed</option>
                      </select>
                      {errors.status && <span className="text-[11px] text-red-400 mt-1 block">{errors.status}</span>}
                    </div>

                    {/* Org / College Name */}
                    {formData.status && (
                      <div>
                        <label htmlFor="modal-org" className="text-xs font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                          {formData.status === 'student' ? (
                            <>
                              <Building className="w-3.5 h-3.5 text-[#14B8A6]" /> College / University Name
                            </>
                          ) : (
                            <>
                              <Briefcase className="w-3.5 h-3.5 text-[#14B8A6]" /> Company / Organization Name
                            </>
                          )}
                        </label>
                        <input
                          id="modal-org"
                          type="text"
                          value={formData.orgName}
                          onChange={(e) => setFormData((p) => ({ ...p, orgName: e.target.value }))}
                          className="w-full bg-white/[0.02] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] border border-white/[0.08] focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/20 focus:outline-none transition-all"
                          placeholder={formData.status === 'student' ? 'e.g. VIT University' : 'e.g. Infosys / Freelance'}
                        />
                        {errors.orgName && <span className="text-[11px] text-red-400 mt-1 block">{errors.orgName}</span>}
                      </div>
                    )}

                    {/* Goal Selection */}
                    <div>
                      <label className="text-xs font-semibold text-[#94a3b8] mb-2 flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-[#14B8A6]" /> Primary Career Goal:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'job', label: 'Get a Job Referrals', icon: '🎯' },
                          { id: 'intern', label: 'Gain Internship Exp', icon: '💼' },
                          { id: 'skills', label: 'Learn Technical Skills', icon: '🚀' },
                          { id: 'freelance', label: 'Start Freelancing', icon: '💸' },
                        ].map((goalItem) => (
                          <button
                            key={goalItem.id}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, goal: goalItem.id }))}
                            className={`flex items-center gap-2 p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                              formData.goal === goalItem.id
                                ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-white shadow-[0_0_15px_rgba(20,184,166,0.15)]'
                                : 'border-white/[0.06] bg-white/[0.01] text-[#94a3b8] hover:border-white/[0.15] hover:bg-white/[0.03]'
                            }`}
                          >
                            <span>{goalItem.icon}</span>
                            <span>{goalItem.label}</span>
                          </button>
                        ))}
                      </div>
                      {errors.goal && <span className="text-[11px] text-red-400 mt-1 block">{errors.goal}</span>}
                    </div>
                  </motion.div>
                )}

                {currentStep === 'course' && (
                  <motion.div
                    key="course"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <label className="text-xs font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" /> Choose Your Program Track:
                    </label>
                    <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
                      {COURSES.map((course) => {
                        const isSelected = formData.selectedCourse === course.id
                        return (
                          <div
                            key={course.id}
                            onClick={() => setFormData((p) => ({ ...p, selectedCourse: course.id }))}
                            className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-[#14B8A6] bg-[#14B8A6]/10 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                                : 'border-white/[0.06] bg-white/[0.01] hover:border-white/[0.15] hover:bg-white/[0.02]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{course.icon}</span>
                              <div>
                                <h4 className="text-xs font-bold text-white leading-tight">{course.title}</h4>
                                <p className="text-[10px] text-[#64748b] mt-0.5">{course.duration} Cohort Program</p>
                              </div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#14B8A6] bg-[#14B8A6]' : 'border-white/30'}`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {errors.selectedCourse && <span className="text-[11px] text-red-400 mt-1 block">{errors.selectedCourse}</span>}
                  </motion.div>
                )}

                {currentStep === 'submitting' && (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-[#14B8A6]/20 animate-pulse" />
                      <div
                        className="absolute inset-0 w-16 h-16 rounded-full border-2 border-transparent border-t-[#14B8A6] animate-spin"
                        style={{ animationDuration: '0.8s' }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Submitting Application...</h3>
                      <p className="text-xs text-[#64748b] mt-1">Securing your seat in Cohort 2025</p>
                    </div>
                  </motion.div>
                )}

                {currentStep === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-4 space-y-6"
                  >
                    {/* SVG checkmark animation */}
                    <div className="w-20 h-20 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <motion.svg
                        className="w-10 h-10 text-[#10b981]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Application Submitted! 🎉</h3>
                      <p className="text-sm text-[#94a3b8] mt-2 max-w-[320px] mx-auto leading-relaxed">
                        Congratulations! Your cohort registration has been registered. Our Academic Team will reach out in 24 hours.
                      </p>
                    </div>

                    {/* Secondary Call to Action Buttons */}
                    <div className="flex flex-col gap-2.5 w-full max-w-[300px]">
                      {/* WhatsApp verification */}
                      <button
                        onClick={handleWhatsAppRedirect}
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-[0_4px_15px_rgba(37,211,102,0.25)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.4)] group"
                        style={{
                          background: 'linear-gradient(135deg, #25D366, #128C7E)',
                        }}
                      >
                        <MessageCircle className="w-4 h-4" /> Connect counselor on WhatsApp
                      </button>

                      {/* Calendly placeholder booking */}
                      <a
                        href="https://calendly.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs font-bold text-white hover:bg-white/[0.06] hover:border-white/20 transition-all"
                      >
                        <Calendar className="w-4 h-4 text-[#14B8A6]" /> Book Free Counseling Slot
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Buttons */}
            {currentStep !== 'submitting' && currentStep !== 'success' && (
              <div className="relative z-10 px-6 py-4 border-t border-white/[0.04] flex items-center justify-between bg-black/20">
                {currentStep !== 'details' ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#94a3b8] hover:text-white hover:bg-white/[0.03] rounded-lg border border-white/[0.06] transition-all"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Back
                  </button>
                ) : (
                  <span /> // placeholder
                )}

                {currentStep === 'course' ? (
                  <button
                    onClick={handleSubmit}
                    className="btn-primary text-xs flex items-center gap-1.5 relative z-10 py-2.5 px-5"
                  >
                    <span className="relative z-10">Submit Application</span>
                    <Send className="w-3.5 h-3.5 relative z-10" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="btn-primary text-xs flex items-center gap-1.5 relative z-10 py-2.5 px-5"
                  >
                    <span className="relative z-10">Continue</span>
                    <ChevronRight className="w-3.5 h-3.5 relative z-10" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
