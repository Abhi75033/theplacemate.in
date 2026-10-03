'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Zap, ShieldCheck, Sparkles, Users, ArrowRight } from 'lucide-react'
import SeatReservationModal from '@/components/SeatReservationModal'

interface TimeBlock {
  value: number
  label: string
}

function DigitCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center group cursor-default">
      <div className="relative">
        {/* Card Box - Clean high-contrast theme styling */}
        <div className="w-16 h-18 sm:w-22 sm:h-24 rounded-xl sm:rounded-2xl bg-slate-100/90 border border-slate-200/90 shadow-inner flex items-center justify-center overflow-hidden relative group-hover:border-teal-400/60 transition-colors">
          
          {/* Subtle split line */}
          <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-slate-200/80 z-20" />

          {/* Animated Number */}
          <div className="relative z-10 flex items-center justify-center overflow-hidden w-full h-full">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: -12, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 12, opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                className="text-2xl sm:text-4xl font-black tabular-nums tracking-tight text-[#0B3C6D] select-none"
              >
                {value}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Label */}
      <span className="mt-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500 group-hover:text-teal-600 transition-colors">
        {label}
      </span>
    </div>
  )
}

function ColonSeparator() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 pb-5 sm:pb-6 px-1">
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        className="w-2 h-2 rounded-full bg-teal-500 shadow-sm shadow-teal-500/40"
      />
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="w-2 h-2 rounded-full bg-teal-500 shadow-sm shadow-teal-500/40"
      />
    </div>
  )
}

export default function CohortCountdownTimer() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getTimeRemaining = useCallback((): TimeBlock[] => {
    const now = new Date()
    // Silent IST Midnight target calculation
    const istOffset = 5.5 * 60 * 60 * 1000
    const istNow = new Date(now.getTime() + istOffset)
    const istMidnight = new Date(istNow)
    istMidnight.setHours(24, 0, 0, 0)
    
    let diffMs = istMidnight.getTime() - istNow.getTime()
    if (diffMs <= 0) diffMs = 24 * 60 * 60 * 1000

    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)

    return [
      { value: hours, label: 'Hours' },
      { value: minutes, label: 'Minutes' },
      { value: seconds, label: 'Seconds' },
    ]
  }, [])

  const [time, setTime] = useState<TimeBlock[]>(() => getTimeRemaining())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setTime(getTimeRemaining())
    }, 1000)
    return () => clearInterval(interval)
  }, [getTimeRemaining])

  if (!mounted) {
    return (
      <section className="relative py-6 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-[180px]" />
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-6 sm:py-8 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Main Card */}
        <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-300 p-6 sm:p-8 overflow-hidden">
          
          {/* Top Accent Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500" />

          {/* Content */}
          <div className="flex flex-col items-center text-center">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-700 text-xs font-extrabold tracking-wide mb-3 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>LIMITED SEATS AVAILABLE · ADMISSION CLOSING SOON</span>
            </div>

            {/* Heading & Subtitle */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight mb-1">
              Next Cohort Starts In
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">
              Secure your spot before enrollment closes for this batch
            </p>

            {/* Countdown Digits */}
            <div className="flex items-center gap-3 sm:gap-5 mb-2">
              <DigitCard value={String(time[0].value).padStart(2, '0')} label={time[0].label} />
              <ColonSeparator />
              <DigitCard value={String(time[1].value).padStart(2, '0')} label={time[1].label} />
              <ColonSeparator />
              <DigitCard value={String(time[2].value).padStart(2, '0')} label={time[2].label} />
            </div>

            {/* High Converting Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsModalOpen(true)}
              style={{ color: '#FFFFFF' }}
              className="mt-5 w-full max-w-md py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 via-[#0B3C6D] to-teal-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 transition-all cursor-pointer"
            >
              <Flame className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
              <span>Reserve Seat Now (Pay ₹199 Only)</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.button>

            {/* Capacity Progress Bar */}
            <div className="w-full max-w-md pt-5 border-t border-slate-100 flex flex-col gap-2 mt-6">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#0F172A] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Cohort Capacity</span>
                </span>
                <span className="text-teal-600 font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 89% Seats Filled
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/80">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '89%' }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 shadow-sm"
                />
              </div>

              {/* Footer Trust Notes */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mt-1">
                <span className="flex items-center gap-1 text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> 100% Placement Assistance
                </span>
                <span className="text-amber-600 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> Only 4 Seats Remaining
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Seat Reservation Modal */}
      <SeatReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}




