'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function ProgressRing({ color }: { color: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const radius = 8
  const circumference = 2 * Math.PI * radius

  return (
    <div ref={ref} className="relative w-5 h-5 flex items-center justify-center shrink-0">
      <svg width="20" height="20" className="rotate-[-90deg]">
        <circle
          cx="10"
          cy="10"
          r={radius}
          stroke={`${color}30`}
          strokeWidth="2"
          fill="transparent"
        />
        <motion.circle
          cx="10"
          cy="10"
          r={radius}
          stroke={color}
          strokeWidth="2"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: 0 } : { strokeDashoffset: circumference }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
    </div>
  )
}

export default function AnimatedCourseTools({ techs, color }: { techs: string[], color: string }) {
  return (
    <section className="py-16 bg-[#0a0a12] relative">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-white text-center mb-8">
          Tools & Technologies <span className="gradient-text">Covered</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {techs.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-2 glass rounded-xl pl-3 pr-5 py-2.5 border border-white/[0.06] text-sm font-medium hover:border-white/[0.15] transition-all card-hover"
              style={{ color, borderColor: `${color}30` }}
            >
              <ProgressRing color={color} />
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
