'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Flame,
  Clock,
  PhoneCall,
  RefreshCw,
  Sparkles,
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Calendar,
  Check,
  Briefcase,
} from 'lucide-react'

interface SeatReservationModalProps {
  isOpen: boolean
  onClose: () => void
  courseTitle?: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

// Razorpay Official Logo SVG Component
function RazorpayLogo({ className = "h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.46 0L0 24H7.59L15.79 8.18L12.46 0Z" fill="#0C2340" />
      <path d="M15.79 8.18L10.61 18.12L14.73 24H22.32L15.79 8.18Z" fill="#0284C7" />
      <text x="28" y="17" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="14" fill="#0C2340" letterSpacing="-0.4">
        Razorpay
      </text>
    </svg>
  )
}

// Helper to generate current + next 3 months
function getPreferredMonths() {
  const months = []
  const date = new Date()
  for (let i = 0; i < 4; i++) {
    const d = new Date(date.getFullYear(), date.getMonth() + i, 1)
    const monthName = d.toLocaleString('en-US', { month: 'long', year: 'numeric' })
    months.push(i === 0 ? `${monthName} (Immediate)` : monthName)
  }
  return months
}

export default function SeatReservationModal({
  isOpen,
  onClose,
  courseTitle = 'Full Stack Web Development Program',
}: SeatReservationModalProps) {
  const monthsList = getPreferredMonths()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    address: '',
    batchCategory: 'fresher' as 'fresher' | 'working-professional',
    batchTiming: '11:00 AM - 1:00 PM (Morning)',
    preferredMonth: monthsList[0],
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'cancelled' | 'callback-submitted'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [callbackMsg, setCallbackMsg] = useState('')
  const [paymentResult, setPaymentResult] = useState<{ paymentId: string; orderId: string } | null>(null)

  // Mini live timer (24h midnight target)
  const [miniTimer, setMiniTimer] = useState({ h: '00', m: '15', s: '00' })

  useEffect(() => {
    const updateMiniTimer = () => {
      const now = new Date()
      const istOffset = 5.5 * 60 * 60 * 1000
      const istNow = new Date(now.getTime() + istOffset)
      const istMidnight = new Date(istNow)
      istMidnight.setHours(24, 0, 0, 0)
      let diffMs = istMidnight.getTime() - istNow.getTime()
      if (diffMs <= 0) diffMs = 24 * 60 * 60 * 1000

      const h = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0')
      const m = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
      const s = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, '0')
      setMiniTimer({ h, m, s })
    }

    updateMiniTimer()
    const interval = setInterval(updateMiniTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  // Reset timing choices when category changes
  useEffect(() => {
    if (formData.batchCategory === 'working-professional') {
      setFormData((prev) => ({ ...prev, batchTiming: '6:00 PM - 8:00 PM (Evening)' }))
    } else {
      setFormData((prev) => ({ ...prev, batchTiming: '11:00 AM - 1:00 PM (Morning)' }))
    }
  }, [formData.batchCategory])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle')
      setErrorMsg('')
      setCallbackMsg('')
      setPaymentResult(null)
    }
  }, [isOpen])

  // Load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number')
      setStatus('idle')
      return
    }

    try {
      // Step 1: Create Order via backend API
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 199,
          courseTitle,
          planTitle: `Seat Reservation (Category: ${formData.batchCategory}, Month: ${formData.preferredMonth})`,
        }),
      })

      const orderData = await res.json()

      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to create payment order')
      }

      // Step 2: Handle Simulated Mode (when live Razorpay keys are not provided in environment)
      if (orderData.isSimulated) {
        const verifyRes = await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: orderData.orderId,
            razorpay_payment_id: `pay_simulated_${Date.now()}`,
            razorpay_signature: 'simulated_sig',
            isSimulated: true,
            courseTitle,
            planTitle: 'Seat Reservation Fee (₹199)',
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: cleanPhone,
          }),
        })
        const verifyData = await verifyRes.json()
        setPaymentResult({
          paymentId: verifyData.paymentId || `pay_res_${Date.now()}`,
          orderId: orderData.orderId,
        })
        setStatus('success')
        return
      }

      // Step 3: Handle Live / Test Mode (when Razorpay keys ARE configured)
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded) {
        setErrorMsg('Failed to load Razorpay SDK. Please check your internet connection.')
        setStatus('idle')
        return
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'ThePlaceMate',
        description: `Seat Reservation Fee — ₹199 (${courseTitle})`,
        image: '/images/theplacemate-logo-icon.png',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseTitle,
                planTitle: 'Seat Reservation Fee (₹199)',
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: cleanPhone,
              }),
            })

            const verifyData = await verifyRes.json()

            if (verifyRes.ok && verifyData.success) {
              setPaymentResult({
                paymentId: response.razorpay_payment_id || `pay_res_${Date.now()}`,
                orderId: response.razorpay_order_id || orderData.orderId,
              })
              setStatus('success')
            } else {
              setErrorMsg(verifyData.error || 'Payment verification failed')
              setStatus('idle')
            }
          } catch (err: any) {
            setErrorMsg(err.message || 'Payment verification failed')
            setStatus('idle')
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: cleanPhone,
        },
        theme: {
          color: '#0D9488',
        },
        modal: {
          ondismiss: function () {
            setStatus('cancelled')
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err: any) {
      console.error('Razorpay Error:', err)
      setErrorMsg(err.message || 'Payment process failed. Please try again.')
      setStatus('idle')
    }
  }

  const handleRequestCallback = async () => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || 'Interested Candidate',
          email: formData.email,
          phone: formData.phone,
          course: courseTitle,
          notes: `Callback requested after cancelling ₹199 seat reservation. College: ${formData.college}, Category: ${formData.batchCategory}, Timing: ${formData.batchTiming}, Preferred Month: ${formData.preferredMonth}`,
        }),
      })
      setStatus('callback-submitted')
      setCallbackMsg('Callback request submitted! Our admissions team will reach out to you within 15 minutes.')
    } catch (err) {
      setCallbackMsg('Request logged. Our counselor will get in touch with you shortly.')
      setStatus('callback-submitted')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="dark-modal relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 z-10 text-left overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Executive Header Banner */}
          <div className="dark-modal relative bg-gradient-to-r from-[#0F172A] via-[#0B3C6D] to-[#071E36] p-5 sm:p-6 text-white shrink-0">
            {/* Background Light Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/25 via-transparent to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer z-20"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Top Bar Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-[11px] font-extrabold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span style={{ color: '#5eead4' }}>Priority Seat Reservation</span>
              </div>

              {/* Live Mini Timer */}
              <div className="inline-flex items-center gap-1.5 bg-black/50 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-slate-200">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span style={{ color: '#e2e8f0' }}>Offer Ends:</span>
                <span className="font-mono font-bold text-white bg-teal-500/30 px-2 py-0.5 rounded text-[11px] tabular-nums" style={{ color: '#ffffff' }}>
                  {miniTimer.h}:{miniTimer.m}:{miniTimer.s}
                </span>
              </div>
            </div>

            {/* Header Title & Subtitle with Explicit Colors */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: '#ffffff' }}>
                  Reserve Your Placement Seat
                </h3>
                <p className="text-xs font-medium mt-0.5" style={{ color: '#cbd5e1' }}>
                  Lock your batch slot & 1-on-1 mentorship for <strong className="text-teal-300" style={{ color: '#5eead4' }}>{courseTitle}</strong>
                </p>
              </div>

              {/* Price Tag Box */}
              <div className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 text-center sm:text-right">
                <div className="text-[10px] uppercase font-extrabold tracking-wider" style={{ color: '#5eead4' }}>Reservation Fee</div>
                <div className="flex items-center gap-2 justify-center sm:justify-end">
                  <span className="text-xs line-through font-bold" style={{ color: '#94a3b8' }}>₹1,999</span>
                  <span className="text-2xl font-black" style={{ color: '#ffffff' }}>₹199</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Body Container (Scrollable) */}
          <div className="p-5 sm:p-7 overflow-y-auto scrollbar-thin space-y-6">
            
            {/* SUCCESS STATE */}
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black text-[#0F172A] mb-2">Reservation Confirmed!</h3>
                <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                  Congratulations <strong className="text-slate-900">{formData.name}</strong>! Your seat for{' '}
                  <strong className="text-[#0B3C6D]">{courseTitle}</strong> is now officially reserved.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 mb-6 text-xs text-slate-700 font-medium max-w-md mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Payment ID:</span>
                    <span className="font-mono font-bold text-slate-900">{paymentResult?.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amount Paid:</span>
                    <span className="font-bold text-emerald-700">₹199</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Batch Category:</span>
                    <span className="font-bold text-slate-900 capitalize">{formData.batchCategory.replace('-', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Preferred Month:</span>
                    <span className="font-bold text-slate-900">{formData.preferredMonth}</span>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  style={{ color: '#FFFFFF', backgroundColor: '#0B3C6D' }}
                  className="w-full max-w-md py-3.5 px-6 rounded-2xl text-white text-sm font-bold transition-all shadow-md cursor-pointer hover:bg-[#14B8A6]"
                >
                  Done & Return to Course Page
                </button>
              </div>
            ) : status === 'cancelled' ? (
              /* CANCELLED / CALLBACK STATE */
              <div className="py-4 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3 border border-amber-200">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-[#0F172A] mb-1">Need Counselor Assistance?</h3>
                <p className="text-xs text-slate-600 mb-5 max-w-md mx-auto">
                  Faced an issue during payment or have questions before reserving? Request an instant 1-on-1 callback from our senior counselor.
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 mb-6 max-w-md mx-auto">
                  <div><span className="text-slate-400">Candidate:</span> <strong className="text-slate-900">{formData.name || 'Not provided'}</strong></div>
                  <div><span className="text-slate-400">Phone:</span> <strong className="text-slate-900">{formData.phone || 'Not provided'}</strong></div>
                  <div><span className="text-slate-400">Preferred Month:</span> <strong className="text-slate-900">{formData.preferredMonth}</strong></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <button
                    onClick={handleRequestCallback}
                    style={{ color: '#FFFFFF' }}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-teal-600 to-[#0B3C6D] text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4 text-white" /> Request Call Back Now
                  </button>

                  <button
                    onClick={() => setStatus('idle')}
                    className="py-3 px-4 rounded-xl text-xs font-extrabold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-4 h-4" /> Retry Payment (₹199)
                  </button>
                </div>
              </div>
            ) : status === 'callback-submitted' ? (
              /* CALLBACK CONFIRMED */
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-[#0F172A] mb-2">Callback Request Received</h3>
                <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto">{callbackMsg}</p>
                <button
                  onClick={onClose}
                  className="w-full max-w-md py-3 px-6 rounded-xl bg-[#0B3C6D] text-white text-sm font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              /* MAIN FORM */
              <form onSubmit={handlePayment} className="space-y-6">
                
                {/* SECTION 1: Personal Details */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-[#0D9488] font-black text-xs flex items-center justify-center">1</span>
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Candidate Details</h4>
                  </div>

                  <div className="space-y-3">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                            placeholder="e.g. Abhishek Kumar"
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/15 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address *</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                            placeholder="name@example.com"
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/15 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & College/Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number (10 Digits) *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                            placeholder="9876543210"
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/15 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">College / Company Name *</label>
                        <div className="relative">
                          <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            required
                            value={formData.college}
                            onChange={(e) => setFormData((d) => ({ ...d, college: e.target.value }))}
                            placeholder="College or Organization"
                            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/15 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Address / City *</label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData((d) => ({ ...d, address: e.target.value }))}
                          placeholder="City, State & Pincode"
                          className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/15 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Batch Preferences */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-[#0D9488] font-black text-xs flex items-center justify-center">2</span>
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Batch Preferences & Timing</h4>
                  </div>

                  {/* Batch Profile Cards */}
                  <div className="mb-3">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">Select Profile *</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Fresher Option Card */}
                      <div
                        onClick={() => setFormData((d) => ({ ...d, batchCategory: 'fresher' }))}
                        className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                          formData.batchCategory === 'fresher'
                            ? 'border-[#14B8A6] bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30 shadow-md ring-2 ring-[#14B8A6]/20'
                            : 'border-slate-200/90 bg-slate-50/60 hover:bg-slate-100/60'
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${formData.batchCategory === 'fresher' ? 'bg-[#14B8A6] text-white' : 'bg-slate-200 text-slate-600'}`}>
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="flex-1 pr-4">
                          <div className="text-xs font-black text-slate-900">Fresher / Graduate</div>
                          <div className="text-[10px] text-slate-500 font-medium mt-0.5 leading-tight">
                            Morning, Afternoon & Evening Slots
                          </div>
                        </div>
                        {formData.batchCategory === 'fresher' && (
                          <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#14B8A6] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Working Professional Option Card */}
                      <div
                        onClick={() => setFormData((d) => ({ ...d, batchCategory: 'working-professional' }))}
                        className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                          formData.batchCategory === 'working-professional'
                            ? 'border-[#14B8A6] bg-gradient-to-br from-teal-50/80 via-white to-teal-50/30 shadow-md ring-2 ring-[#14B8A6]/20'
                            : 'border-slate-200/90 bg-slate-50/60 hover:bg-slate-100/60'
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${formData.batchCategory === 'working-professional' ? 'bg-[#0B3C6D] text-white' : 'bg-slate-200 text-slate-600'}`}>
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="flex-1 pr-4">
                          <div className="text-xs font-black text-slate-900">Working Professional</div>
                          <div className="text-[10px] text-slate-500 font-medium mt-0.5 leading-tight">
                            Dedicated Evening & Weekend Tracks
                          </div>
                        </div>
                        {formData.batchCategory === 'working-professional' && (
                          <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#14B8A6] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Timing & Preferred Month */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Batch Timing *</label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <select
                          value={formData.batchTiming}
                          onChange={(e) => setFormData((d) => ({ ...d, batchTiming: e.target.value }))}
                          className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/15 transition-all appearance-none"
                        >
                          {formData.batchCategory === 'working-professional' ? (
                            <>
                              <option value="6:00 PM - 8:00 PM (Evening)">6:00 PM - 8:00 PM (Evening Slot)</option>
                              <option value="Custom / Flexible Timing">Choose Custom / Flexible Timing</option>
                            </>
                          ) : (
                            <>
                              <option value="11:00 AM - 1:00 PM (Morning)">11:00 AM - 1:00 PM (Morning Slot)</option>
                              <option value="3:00 PM - 5:00 PM (Afternoon)">3:00 PM - 5:00 PM (Afternoon Slot)</option>
                              <option value="6:00 PM - 8:00 PM (Evening)">6:00 PM - 8:00 PM (Evening Slot)</option>
                              <option value="Custom / Flexible Timing">Choose Custom / Flexible Timing</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Preferred Month *</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <select
                          value={formData.preferredMonth}
                          onChange={(e) => setFormData((d) => ({ ...d, preferredMonth: e.target.value }))}
                          className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-slate-900 text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/15 transition-all appearance-none"
                        >
                          {monthsList.map((m, idx) => (
                            <option key={idx} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                </div>

                {errorMsg && <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">{errorMsg}</p>}

                {/* 100% REFUND GUARANTEE SHIELD CARD */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-emerald-50/90 border border-emerald-200/90 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0 shadow-sm mt-0.5">
                    <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      100% Risk-Free 24-Hour Refund Guarantee
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </h5>
                    <p className="text-[11px] text-emerald-900 leading-relaxed font-medium mt-0.5">
                      If you change your mind for any reason, cancel your seat reservation within 24 hours and the full ₹199 amount will be automatically refunded back to your account without any questions.
                    </p>
                  </div>
                </div>

                {/* HIGH-IMPACT GRADIENT SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{ color: '#FFFFFF' }}
                  className="w-full py-4 px-6 rounded-2xl text-base font-black transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-xl shadow-teal-600/25 hover:shadow-2xl hover:shadow-teal-600/40 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 bg-gradient-to-r from-[#14B8A6] via-[#0B3C6D] to-[#0D9488] bg-[length:200%_auto] hover:bg-right"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span className="text-white font-extrabold" style={{ color: '#ffffff' }}>Connecting to Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
                      <span className="text-white font-black tracking-wide" style={{ color: '#ffffff' }}>Reserve Seat Now (Pay ₹199 via Razorpay)</span>
                      <ArrowRight className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
                    </>
                  )}
                </button>

                {/* Footer SSL trust badge */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-semibold pt-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted Payment by</span>
                  <RazorpayLogo className="h-3.5 inline-block ml-0.5" />
                </div>
              </form>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
