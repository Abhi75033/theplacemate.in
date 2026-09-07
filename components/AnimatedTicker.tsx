'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useSpring, useInView } from 'framer-motion'

interface AnimatedTickerProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export default function AnimatedTicker({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 200 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isInView && mounted) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView, mounted])

  useEffect(() => {
    if (!mounted) return
    return springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted = Number(latest.toFixed(decimals)).toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
        ref.current.textContent = formatted
      }
    })
  }, [springValue, decimals, mounted])

  return (
    <span>
      {prefix}
      <span ref={ref}>{mounted ? '0' : value}</span>
      {suffix}
    </span>
  )
}
