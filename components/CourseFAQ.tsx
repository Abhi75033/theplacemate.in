'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CourseFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="glass rounded-2xl border border-white/[0.06] hover:border-[#6366f1]/20 transition-all overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left"
          >
            <span className="text-sm sm:text-base font-semibold text-white pr-2">{faq.q}</span>
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
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
