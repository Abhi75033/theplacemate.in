'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Calendar,
  Clock,
  ChevronRight,
  ChevronLeft,
  Phone,
  User,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  GraduationCap,
} from 'lucide-react'

const WHATSAPP_NUMBER = '916394753801'

// Days available (next 7 days, skip Sundays)
function getAvailableDays() {
  const days = []
  const d = new Date()
  while (days.length < 7) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0) {
      // skip Sundays
      days.push(new Date(d))
    }
  }
  return days
}

const SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM',
]

const TOPICS = [
  { id: 'course', label: 'Which course is right for me?', icon: '🎯' },
  { id: 'placement', label: 'Placement success rates', icon: '💼' },
  { id: 'internship', label: 'Internship opportunities', icon: '🏢' },
  { id: 'fees', label: 'Fees & EMI options', icon: '💳' },
  { id: 'schedule', label: 'Batch schedule & timings', icon: '📅' },
  { id: 'other', label: 'General questions', icon: '💬' },
]

type Step = 'details' | 'schedule' | 'confirm' | 'success'

function formatDay(date: Date) {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

export default function CounselingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<Step>('details')
  const [availableDays] = useState(getAvailableDays)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: '',
    topic: '',
  })
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  // ── Global click interceptor ────────────────────────────────────────────
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const el = target.closest('a, button')
      if (!el) return

      const text = el.textContent?.trim().toLowerCase() ?? ''
      const isCounseling =
        el.getAttribute('data-action') === 'counseling' ||
        text.includes('book free counsel') ||
        text.includes('book free consult') ||
        el.getAttribute('href') === '#counseling'

      if (isCounseling) {
        e.preventDefault()
        open()
      }
    }
    document.addEventListener('click', handle)
    return () => document.removeEventListener('click', handle)
  }, [])

  // Programmatic open
  useEffect(() => {
    const handle = () => open()
    window.addEventListener('open-counseling-modal', handle)
    return () => window.removeEventListener('open-counseling-modal', handle)
  }, [])

  const open = () => {
    setStep('details')
    setFormData({ name: '', phone: '', status: '', topic: '' })
    setSelectedDay(null)
    setSelectedSlot('')
    setErrors({})
    setIsOpen(true)
  }

  // ── Validation ─────────────────────────────────────────────────────────
  const validateDetails = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.phone.trim() || !/^[+]?[\d\s-]{10,14}$/.test(formData.phone.replace(/\s/g, '')))
      e.phone = 'Enter a valid WhatsApp number'
    if (!formData.status) e.status = 'Please select your current status'
    if (!formData.topic) e.topic = 'Please choose a topic'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateSchedule = () => {
    const e: Record<string, string> = {}
    if (!selectedDay) e.day = 'Please pick a day'
    if (!selectedSlot) e.slot = 'Please pick a time slot'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Navigation ─────────────────────────────────────────────────────────
  const handleNext = () => {
    if (step === 'details' && validateDetails()) setStep('schedule')
    else if (step === 'schedule' && validateSchedule()) setStep('confirm')
  }

  const handleBack = () => {
    if (step === 'schedule') setStep('details')
    else if (step === 'confirm') setStep('schedule')
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setStep('success')

    const dayStr = selectedDay ? formatDay(selectedDay) : ''
    const topicLabel = TOPICS.find((t) => t.id === formData.topic)?.label ?? formData.topic

    const msg = [
      `📞 *Free Counseling Booking — PlaceMate*`,
      ``,
      `👤 *Name:* ${formData.name}`,
      `📱 *WhatsApp:* ${formData.phone}`,
      `📌 *Status:* ${formData.status}`,
      `💡 *Topic:* ${topicLabel}`,
      ``,
      `🗓️ *Preferred Day:* ${dayStr}`,
      `🕐 *Preferred Time:* ${selectedSlot}`,
    ].join('\n')

    setTimeout(() => {
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    }, 800)
  }

  // ── Step labels ────────────────────────────────────────────────────────
  const STEPS: Step[] = ['details', 'schedule', 'confirm']
  const stepIdx = STEPS.indexOf(step)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 36 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 36 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="dark-modal relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] shadow-[0_0_60px_rgba(20,184,166,0.18)] flex flex-col"
            style={{ background: 'linear-gradient(160deg, #0a0a14 0%, #080810 100%)' }}
          >
            {/* Decorative glows */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(20,184,166,0.12),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_90%,rgba(99,102,241,0.08),transparent_60%)]" />

            {/* ── Header ───────────────────────────────────────────────── */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.05]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#14B8A6]" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white leading-tight">Book Free Counseling</h2>
                  <p className="text-[11px] text-[#64748b] mt-0.5">Mon–Sat · 10 AM – 7 PM IST · Free & No-Commitment</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full border border-white/[0.08] text-[#64748b] hover:text-white hover:border-white/20 transition-all flex items-center justify-center bg-white/[0.02]"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ── Progress bar ──────────────────────────────────────────── */}
            {step !== 'success' && (
              <div className="relative z-10 px-6 py-2.5 border-b border-white/[0.03] flex items-center gap-2">
                {[
                  { label: 'Your Info', icon: User },
                  { label: 'Schedule', icon: Calendar },
                  { label: 'Confirm', icon: CheckCircle2 },
                ].map((s, i) => {
                  const Icon = s.icon
                  const done = stepIdx > i
                  const active = stepIdx === i
                  return (
                    <div key={s.label} className="flex items-center gap-1.5 flex-1">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-400 ${
                          done
                            ? 'bg-[#14B8A6] shadow-[0_0_10px_rgba(20,184,166,0.4)]'
                            : active
                            ? 'bg-[#0B3C6D] border border-[#14B8A6] shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                            : 'bg-white/[0.04] border border-white/[0.08]'
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        ) : (
                          <Icon className={`w-2.5 h-2.5 ${active ? 'text-[#14B8A6]' : 'text-[#475569]'}`} />
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-medium hidden sm:block transition-colors ${
                          done ? 'text-[#14B8A6]' : active ? 'text-white' : 'text-[#475569]'
                        }`}
                      >
                        {s.label}
                      </span>
                      {i < 2 && <div className={`flex-1 h-px transition-colors duration-400 ${done ? 'bg-[#14B8A6]/40' : 'bg-white/[0.05]'}`} />}
                    </div>
                  )
                })}
              </div>
            )}

            {/* ── Body ─────────────────────────────────────────────────── */}
            <div className="relative z-10 flex-1 p-6 min-h-[320px] flex flex-col justify-center">
              <AnimatePresence mode="wait">

                {/* STEP 1 — Details */}
                {step === 'details' && (
                  <motion.div key="details" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="c-name" className="text-[11px] font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <User className="w-3 h-3 text-[#14B8A6]" /> Full Name
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        placeholder="e.g. Priya Sharma"
                        className="w-full bg-white/[0.02] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] border border-white/[0.08] focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/20 focus:outline-none transition-all"
                      />
                      {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="c-phone" className="text-[11px] font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-[#14B8A6]" /> WhatsApp Number
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-white/[0.02] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#64748b] border border-white/[0.08] focus:border-[#14B8A6]/50 focus:ring-1 focus:ring-[#14B8A6]/20 focus:outline-none transition-all"
                      />
                      {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Status */}
                    <div>
                      <label htmlFor="c-status" className="text-[11px] font-semibold text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <GraduationCap className="w-3 h-3 text-[#14B8A6]" /> I am currently a:
                      </label>
                      <select
                        id="c-status"
                        value={formData.status}
                        onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
                        className="w-full bg-[#0c0c18] rounded-xl px-4 py-2.5 text-sm text-white border border-white/[0.08] focus:border-[#14B8A6]/50 focus:outline-none transition-all"
                      >
                        <option value="" disabled>Select Status</option>
                        <option value="College Student">College Student</option>
                        <option value="Working Professional">Working Professional</option>
                        <option value="Fresher / Unemployed">Fresher / Unemployed</option>
                        <option value="Freelancer">Freelancer</option>
                      </select>
                      {errors.status && <p className="text-[11px] text-red-400 mt-1">{errors.status}</p>}
                    </div>

                    {/* Topic */}
                    <div>
                      <label className="text-[11px] font-semibold text-[#94a3b8] mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#14B8A6]" /> What would you like to discuss?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {TOPICS.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, topic: t.id }))}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-[11px] font-medium transition-all ${
                              formData.topic === t.id
                                ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-white shadow-[0_0_12px_rgba(20,184,166,0.12)]'
                                : 'border-white/[0.06] bg-white/[0.01] text-[#94a3b8] hover:border-white/[0.15] hover:bg-white/[0.03]'
                            }`}
                          >
                            <span className="text-base">{t.icon}</span>
                            <span className="leading-tight">{t.label}</span>
                          </button>
                        ))}
                      </div>
                      {errors.topic && <p className="text-[11px] text-red-400 mt-1">{errors.topic}</p>}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 — Schedule */}
                {step === 'schedule' && (
                  <motion.div key="schedule" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-5">
                    {/* Day picker */}
                    <div>
                      <label className="text-[11px] font-semibold text-[#94a3b8] mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#14B8A6]" /> Choose a Day
                      </label>
                      <div className="flex gap-1.5 flex-wrap">
                        {availableDays.map((day, i) => {
                          const isSelected = selectedDay?.toDateString() === day.toDateString()
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedDay(day)}
                              className={`flex flex-col items-center px-3 py-2 rounded-xl border text-[10px] font-semibold transition-all ${
                                isSelected
                                  ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-white shadow-[0_0_12px_rgba(20,184,166,0.15)]'
                                  : 'border-white/[0.06] bg-white/[0.01] text-[#64748b] hover:border-white/[0.15] hover:text-white'
                              }`}
                            >
                              <span className="text-[9px] font-medium uppercase tracking-widest opacity-60">
                                {day.toLocaleDateString('en-IN', { weekday: 'short' })}
                              </span>
                              <span className="text-sm font-black mt-0.5">{day.getDate()}</span>
                              <span className="text-[9px] opacity-60">{day.toLocaleDateString('en-IN', { month: 'short' })}</span>
                            </button>
                          )
                        })}
                      </div>
                      {errors.day && <p className="text-[11px] text-red-400 mt-1">{errors.day}</p>}
                    </div>

                    {/* Time slot picker */}
                    <div>
                      <label className="text-[11px] font-semibold text-[#94a3b8] mb-2 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#14B8A6]" /> Choose a Time Slot
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {SLOTS.map((slot) => {
                          const isSelected = selectedSlot === slot
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-2 px-3 rounded-xl border text-[11px] font-semibold transition-all ${
                                isSelected
                                  ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-white shadow-[0_0_12px_rgba(20,184,166,0.15)]'
                                  : 'border-white/[0.06] bg-white/[0.01] text-[#64748b] hover:border-white/[0.15] hover:text-white'
                              }`}
                            >
                              {slot}
                            </button>
                          )
                        })}
                      </div>
                      {errors.slot && <p className="text-[11px] text-red-400 mt-1">{errors.slot}</p>}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 — Confirm */}
                {step === 'confirm' && (
                  <motion.div key="confirm" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-4">
                    <p className="text-sm font-semibold text-white">Review your booking details</p>

                    <div className="glass rounded-2xl border border-white/[0.06] divide-y divide-white/[0.04] overflow-hidden">
                      {[
                        { label: 'Name', value: formData.name, icon: '👤' },
                        { label: 'WhatsApp', value: formData.phone, icon: '📱' },
                        { label: 'Status', value: formData.status, icon: '🎓' },
                        { label: 'Topic', value: TOPICS.find((t) => t.id === formData.topic)?.label ?? '', icon: '💡' },
                        { label: 'Day', value: selectedDay ? formatDay(selectedDay) : '', icon: '📅' },
                        { label: 'Time', value: selectedSlot, icon: '🕐' },
                      ].map((r) => (
                        <div key={r.label} className="flex items-center justify-between px-4 py-2.5 text-sm">
                          <span className="text-[#64748b] text-xs flex items-center gap-2">
                            <span>{r.icon}</span> {r.label}
                          </span>
                          <span className="text-white font-medium text-xs text-right max-w-[55%]">{r.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start gap-2.5 glass rounded-xl p-3 border border-[#14B8A6]/15">
                      <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                        After confirming, our counselor will reach out on WhatsApp at your preferred time. Sessions are 100% free and no-commitment.
                      </p>
                    </div>

                    {/* Simulate loading during submission */}
                    {submitting && (
                      <div className="flex items-center justify-center gap-3 py-2">
                        <div className="w-5 h-5 rounded-full border-2 border-[#14B8A6]/30 border-t-[#14B8A6] animate-spin" />
                        <span className="text-xs text-[#64748b]">Booking your slot…</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* SUCCESS */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-6 space-y-5"
                  >
                    {/* Animated checkmark */}
                    <div className="w-20 h-20 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/25 flex items-center justify-center shadow-[0_0_40px_rgba(20,184,166,0.2)]">
                      <motion.svg
                        className="w-10 h-10 text-[#14B8A6]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.55, ease: 'easeOut' }}
                        />
                      </motion.svg>
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-white">Session Booked! 🎉</h3>
                      <p className="text-sm text-[#94a3b8] mt-2 max-w-[300px] mx-auto leading-relaxed">
                        Our counselor will WhatsApp you on{' '}
                        <span className="text-white font-semibold">{selectedDay ? formatDay(selectedDay) : ''}</span>{' '}
                        at <span className="text-white font-semibold">{selectedSlot}</span>. Keep your phone handy!
                      </p>
                    </div>

                    {/* Booking summary pill */}
                    <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-[#14B8A6]/20 text-xs text-[#94a3b8]">
                      <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                      Awaiting counselor confirmation on WhatsApp
                    </div>

                    <div className="flex flex-col gap-2.5 w-full max-w-[280px]">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-[0_4px_15px_rgba(37,211,102,0.2)] hover:shadow-[0_8px_25px_rgba(37,211,102,0.35)]"
                        style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat with our counselor
                      </a>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="py-2.5 px-4 rounded-xl border border-white/[0.08] bg-white/[0.02] text-xs font-semibold text-[#94a3b8] hover:text-white hover:bg-white/[0.05] transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* ── Footer Buttons ────────────────────────────────────────── */}
            {step !== 'success' && (
              <div className="relative z-10 px-6 py-4 border-t border-white/[0.04] flex items-center justify-between bg-black/20">
                {step !== 'details' ? (
                  <button
                    onClick={handleBack}
                    disabled={submitting}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#94a3b8] hover:text-white hover:bg-white/[0.03] rounded-lg border border-white/[0.06] transition-all disabled:opacity-40"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Back
                  </button>
                ) : (
                  <span />
                )}

                {step === 'confirm' ? (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="btn-primary text-xs flex items-center gap-1.5 relative z-10 py-2.5 px-5 disabled:opacity-60"
                  >
                    <span className="relative z-10">{submitting ? 'Booking…' : 'Confirm Booking'}</span>
                    {!submitting && <CheckCircle2 className="w-3.5 h-3.5 relative z-10" />}
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
