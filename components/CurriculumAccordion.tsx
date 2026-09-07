'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'

function TypingText({ text, color }: { text: string; color: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  
  return (
    <span ref={ref} className="font-mono">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0, delay: index * 0.02 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

interface Module {
  title: string
  topics: string[]
}

export default function CurriculumAccordion({ modules, color }: { modules: Module[]; color: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {modules.map((mod, i) => (
        <div key={i} className="glass rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                {i + 1}
              </div>
              <span className="text-sm sm:text-base font-semibold text-white">{mod.title}</span>
            </div>
            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
              <ChevronDown className={`w-5 h-5 transition-colors ${openIndex === i ? 'text-[#6366f1]' : 'text-[#64748b]'}`} />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="px-5 pb-5">
                  <div className="h-px bg-white/[0.06] mb-4" />
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {mod.topics.map((topic, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#94a3b8] mt-2">
                        <span style={{ color }} className="shrink-0 mt-0.5">✓</span>
                        <TypingText text={topic} color={color} />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
