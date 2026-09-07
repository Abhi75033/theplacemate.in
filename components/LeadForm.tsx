'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

interface LeadFormProps {
  courseName: string
  cityName?: string
  variant?: 'sidebar' | 'inline'
}

export default function LeadForm({ courseName, cityName, variant = 'inline' }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: cityName || '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    // Client-side validation
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number')
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone,
          course: courseName,
        }),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`glass rounded-2xl border border-[#10b981]/20 p-6 ${variant === 'sidebar' ? '' : ''}`}>
        <div className="text-center">
          <CheckCircle2 className="w-12 h-12 text-[#10b981] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Thank you!</h3>
          <p className="text-sm text-[#94a3b8]">Our team will call you within 24 hours to discuss {courseName}{cityName ? ` in ${cityName}` : ''}.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`glass rounded-2xl border border-white/[0.06] p-6 ${variant === 'sidebar' ? '' : ''}`} id="lead-form">
      <h3 className="text-lg font-bold text-white mb-1">Get Free Counselling Call</h3>
      <p className="text-xs text-[#64748b] mb-5">Our career advisor will help you choose the right path</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="lead-name" className="text-xs text-[#94a3b8] mb-1 block">Full Name *</label>
          <input
            id="lead-name" type="text" required
            value={formData.name}
            onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
            className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/40 focus:outline-none transition-all"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="text-xs text-[#94a3b8] mb-1 block">Phone Number *</label>
          <input
            id="lead-phone" type="tel" required
            value={formData.phone}
            onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
            className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/40 focus:outline-none transition-all"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <div>
          <label htmlFor="lead-email" className="text-xs text-[#94a3b8] mb-1 block">Email Address *</label>
          <input
            id="lead-email" type="email" required
            value={formData.email}
            onChange={e => setFormData(d => ({ ...d, email: e.target.value }))}
            className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/40 focus:outline-none transition-all"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="lead-city" className="text-xs text-[#94a3b8] mb-1 block">City</label>
          <input
            id="lead-city" type="text"
            value={formData.city}
            onChange={e => setFormData(d => ({ ...d, city: e.target.value }))}
            className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/40 focus:outline-none transition-all"
            placeholder="Your city"
          />
        </div>
        <div>
          <label className="text-xs text-[#94a3b8] mb-1 block">Interested In</label>
          <div className="glass rounded-xl px-4 py-2.5 text-sm text-[#a78bfa] border border-[#6366f1]/20 font-medium">
            {courseName}
          </div>
        </div>

        {errorMsg && (
          <p className="text-xs text-red-400">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary cta-shimmer text-sm py-3 relative z-10 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {status === 'loading' ? (
            <><Loader2 className="w-4 h-4 animate-spin relative z-10" /><span className="relative z-10">Submitting...</span></>
          ) : (
            <span className="relative z-10">Get Free Counselling Call</span>
          )}
        </button>
      </form>
    </div>
  )
}
