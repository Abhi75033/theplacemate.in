'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Phone, Mail, BookOpen, MapPin } from 'lucide-react'

const WHATSAPP_NUMBER = '916394753801'

const courses = [
  'Full Stack Development',
  'AI & Machine Learning',
  'Data Science',
  'UI/UX Design',
  'DevOps Engineering',
  'Cloud Computing',
  'Cybersecurity',
  'Digital Marketing',
  'Other',
]

export default function FloatingContactForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    city: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build WhatsApp message
    const lines = [
      `🎓 *New Enquiry from PlaceMate Website*`,
      ``,
      `👤 *Name:* ${formData.name}`,
      `📞 *Phone:* ${formData.phone}`,
      formData.email ? `📧 *Email:* ${formData.email}` : '',
      `📚 *Course:* ${formData.course}`,
      formData.city ? `📍 *City:* ${formData.city}` : '',
      formData.message ? `💬 *Message:* ${formData.message}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const encodedMsg = encodeURIComponent(lines)
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`

    window.open(waUrl, '_blank')
    setSubmitted(true)

    // Reset after 4 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', phone: '', email: '', course: '', city: '', message: '' })
      setIsOpen(false)
    }, 4000)
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Form Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '110%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '110%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[999] w-full max-w-[420px] overflow-y-auto"
          >
            <div className="min-h-full flex flex-col glass-strong border-l border-white/[0.08]">
              {/* Header */}
              <div className="sticky top-0 z-10 glass-strong border-b border-white/[0.08] px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    Get in Touch
                  </h2>
                  <p className="text-xs text-[#64748b] mt-0.5">
                    Fill the form & we'll reply on WhatsApp instantly
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.08] text-[#94a3b8] hover:text-white hover:border-white/20 transition-all"
                  aria-label="Close contact form"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body */}
              <div className="flex-1 px-6 py-5">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-[#25D366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent! 🎉</h3>
                    <p className="text-sm text-[#94a3b8] max-w-[280px]">
                      Your enquiry has been sent to WhatsApp. Our counselor will respond shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="fc-name" className="text-xs font-medium text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <User className="w-3 h-3" /> Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="fc-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/50 focus:ring-1 focus:ring-[#6366f1]/20 focus:outline-none transition-all"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="fc-phone" className="text-xs font-medium text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <Phone className="w-3 h-3" /> Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="fc-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/50 focus:ring-1 focus:ring-[#6366f1]/20 focus:outline-none transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="fc-email" className="text-xs font-medium text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <Mail className="w-3 h-3" /> Email Address
                      </label>
                      <input
                        id="fc-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/50 focus:ring-1 focus:ring-[#6366f1]/20 focus:outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Course */}
                    <div>
                      <label htmlFor="fc-course" className="text-xs font-medium text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3" /> Interested Course <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="fc-course"
                        name="course"
                        required
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white border border-white/[0.08] focus:border-[#6366f1]/50 focus:ring-1 focus:ring-[#6366f1]/20 focus:outline-none transition-all appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236366f1%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat"
                      >
                        <option value="" disabled className="bg-[#0d0d1a] text-[#475569]">
                          Select a course
                        </option>
                        {courses.map((c) => (
                          <option key={c} value={c} className="bg-[#0d0d1a] text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="fc-city" className="text-xs font-medium text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> City
                      </label>
                      <input
                        id="fc-city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/50 focus:ring-1 focus:ring-[#6366f1]/20 focus:outline-none transition-all"
                        placeholder="Your city"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="fc-message" className="text-xs font-medium text-[#94a3b8] mb-1.5 flex items-center gap-1.5">
                        <MessageCircle className="w-3 h-3" /> Message (Optional)
                      </label>
                      <textarea
                        id="fc-message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/50 focus:ring-1 focus:ring-[#6366f1]/20 focus:outline-none transition-all resize-none"
                        placeholder="Any specific question?"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all relative overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, #25D366, #128C7E)',
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#128C7E] to-[#075E54] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Send className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Send via WhatsApp</span>
                    </button>

                    <p className="text-[10px] text-center text-[#475569] mt-2">
                      By submitting, you agree to receive communication from PlaceMate.
                    </p>
                  </form>
                )}
              </div>

              {/* Footer Branding */}
              <div className="px-6 py-3 border-t border-white/[0.06] text-center">
                <p className="text-[10px] text-[#475569]">
                  Powered by <span className="gradient-text font-semibold">PlaceMate</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[997] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all group"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
            : 'linear-gradient(135deg, #25D366, #128C7E)',
          boxShadow: isOpen
            ? '0 0 30px rgba(239, 68, 68, 0.4)'
            : '0 0 30px rgba(37, 211, 102, 0.4)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close contact form' : 'Open contact form'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30 pointer-events-none" />
        )}
      </motion.button>

      {/* Tooltip on hover (only when closed) */}
      {!isOpen && (
        <div className="fixed bottom-[88px] right-5 z-[997] hidden md:block pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.4 }}
            className="glass rounded-lg px-3 py-1.5 text-xs text-[#94a3b8] border border-white/[0.08] whitespace-nowrap"
          >
            💬 Chat with us
          </motion.div>
        </div>
      )}
    </>
  )
}
