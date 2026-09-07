'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, Lock, CheckCircle2, Loader2, ArrowRight, CreditCard, Sparkles } from 'lucide-react'

interface RazorpayModalProps {
  isOpen: boolean
  onClose: () => void
  courseTitle: string
  planTitle: string
  planDuration: string
  numericPrice: number
  formattedPrice: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

// Official Razorpay Logo SVG Component
function RazorpayLogo({ className = "h-5" }: { className?: string }) {
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

export default function RazorpayModal({
  isOpen,
  onClose,
  courseTitle,
  planTitle,
  planDuration,
  numericPrice,
  formattedPrice,
}: RazorpayModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [paymentResult, setPaymentResult] = useState<{ paymentId: string; orderId: string } | null>(null)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle')
      setErrorMsg('')
      setPaymentResult(null)
    }
  }, [isOpen])

  // Helper to load Razorpay SDK dynamically
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
      setStatus('error')
      return
    }

    try {
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded) {
        setErrorMsg('Failed to load Razorpay SDK. Please check your internet connection.')
        setStatus('error')
        return
      }

      // Step 1: Create Order via backend API
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numericPrice,
          courseTitle,
          planTitle: `${planTitle} (${planDuration})`,
        }),
      })

      const orderData = await res.json()

      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to create payment order')
      }

      // If simulated mode (no live keys configured)
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
            planTitle,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: cleanPhone,
          }),
        })
        const verifyData = await verifyRes.json()
        setPaymentResult({
          paymentId: verifyData.paymentId || 'pay_simulated_demo',
          orderId: orderData.orderId,
        })
        setStatus('success')
        return
      }

      // Step 2: Launch Official Razorpay Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'ThePlaceMate',
        description: `${courseTitle} — ${planDuration}`,
        image: '/images/theplacemate-logo-icon.png',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Step 3: Verify Payment Signature
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                courseTitle,
                planTitle,
                customerName: formData.name,
                customerEmail: formData.email,
                customerPhone: cleanPhone,
              }),
            })

            const verifyData = await verifyRes.json()

            if (verifyRes.ok && verifyData.success) {
              setPaymentResult({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
              })
              setStatus('success')
            } else {
              setErrorMsg(verifyData.error || 'Payment verification failed')
              setStatus('error')
            }
          } catch (err: any) {
            setErrorMsg(err.message || 'Payment verification failed')
            setStatus('error')
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: cleanPhone,
        },
        theme: {
          color: '#14B8A6',
        },
        modal: {
          ondismiss: function () {
            setStatus('idle')
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err: any) {
      console.error('Razorpay Error:', err)
      setErrorMsg(err.message || 'Payment process failed. Please try again.')
      setStatus('error')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 text-left overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer z-20"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-2">Enrollment Successful!</h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>! Your payment for{' '}
                <strong className="text-[#0B3C6D]">{courseTitle} ({planDuration})</strong> has been received.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-2 mb-6 text-xs text-slate-700 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment ID:</span>
                  <span className="font-bold text-slate-900">{paymentResult?.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="font-bold text-slate-900">{paymentResult?.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">{formattedPrice}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-6 text-xs text-slate-500 font-medium">
                <span>Secured by</span>
                <RazorpayLogo className="h-4" />
              </div>

              <button
                onClick={onClose}
                style={{ color: '#FFFFFF', backgroundColor: '#0B3C6D' }}
                className="w-full py-3.5 px-6 rounded-2xl text-white text-sm font-bold transition-all shadow-md cursor-pointer hover:bg-[#14B8A6]"
              >
                Close & Return to Course
              </button>
            </div>
          ) : (
            <div>
              {/* Top Bar with Razorpay Official Branding Logo */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#0C2340] text-[11px] font-bold border border-slate-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Secured by</span>
                  <RazorpayLogo className="h-3.5 ml-0.5 inline-block" />
                </span>
              </div>

              <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">Complete Your Enrollment</h3>
              <p className="text-xs text-slate-500 font-medium mb-5">Enter your details to proceed to Razorpay payment</p>

              {/* Receipt Summary Box */}
              <div className="bg-gradient-to-br from-[#0284C7]/8 via-slate-50 to-[#0C2340]/5 border border-[#0284C7]/20 rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-black text-slate-900">{courseTitle}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{planTitle} ({planDuration})</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-[#0C2340]">{formattedPrice}</div>
                    <div className="text-[10px] text-emerald-700 font-bold">0% No-Cost EMI Available</div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 transition-all [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 transition-all [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-4 focus:ring-[#0284C7]/15 transition-all [&:-webkit-autofill]:bg-white [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]"
                  />
                </div>

                {errorMsg && <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">{errorMsg}</p>}

                {/* AWESOME GRADIENT ACTION BUTTON WITH RAZORPAY BRANDING */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{ color: '#FFFFFF' }}
                  className="w-full py-4 px-6 rounded-2xl text-base font-black transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-xl shadow-[#0284C7]/25 hover:shadow-2xl hover:shadow-[#0284C7]/40 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 mt-3 bg-gradient-to-r from-[#14B8A6] via-[#0C2340] to-[#0284C7] bg-[length:200%_auto] hover:bg-right"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span className="text-white font-extrabold">Connecting to Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
                      <span className="text-white font-black tracking-wide">Pay {formattedPrice} via Razorpay</span>
                      <ArrowRight className="w-5 h-5 text-white shrink-0 stroke-[2.5]" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-600 font-semibold pt-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted by</span>
                  <RazorpayLogo className="h-3.5 inline-block" />
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
