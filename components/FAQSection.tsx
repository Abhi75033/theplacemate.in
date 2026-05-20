'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Do I need prior coding experience to join?',
    a: 'No! Most of our programs are designed for absolute beginners. We start from zero and progressively build your skills. As long as you have curiosity and commitment, you\'re ready to start.',
  },
  {
    q: 'Is the internship certificate valid and recognized?',
    a: 'Yes. You receive a verified internship completion certificate from PlaceMate and optionally from our partner startups. These are real internship experiences with actual project work — not just participation certificates.',
  },
  {
    q: 'Are sessions live or pre-recorded?',
    a: 'We offer a hybrid model — live mentor sessions 3x per week for Q&A, code reviews, and standups, plus recorded module content you can learn at your own pace. All live sessions are also recorded for replay.',
  },
  {
    q: 'What kind of placement support do you provide?',
    a: 'We provide placement assistance — including resume reviews, LinkedIn optimization, mock interviews, portfolio feedback, and access to our hiring partner network for referrals. We do not guarantee placements, but we provide comprehensive career support.',
  },
  {
    q: 'Are there EMI or payment plan options?',
    a: 'Yes! We offer flexible EMI options starting from ₹3,000/month with 0% interest for qualifying students. We also offer need-based scholarships. Reach out to our counseling team for personalized payment options.',
  },
  {
    q: 'How long is each program?',
    a: 'Programs range from 8 to 16 weeks depending on the track. Full Stack Development and AI Engineering are 14–16 weeks, while Freelancing Accelerator and Graphic Design are 8–10 weeks. All timelines include the internship and career prep phases.',
  },
  {
    q: 'Will I receive a certification?',
    a: 'Yes, you receive a PlaceMate program completion certificate, internship certificate, and project completion badges for each production app you ship. These are verifiable credentials you can add to your LinkedIn profile.',
  },
  {
    q: 'What kind of projects will I actually build?',
    a: 'You\'ll build 5–8 production-grade projects including: AI SaaS dashboards, full-stack applications, chatbots, automation tools, and more — all deployed live with real domains. Team-based projects simulate actual company workflows with agile sprints and code reviews.',
  },
]

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="glass rounded-2xl border border-white/[0.06] hover:border-[#6366f1]/20 transition-all overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
      >
        <span className="text-sm sm:text-base font-semibold text-white pr-2">{faq.q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
          <ChevronDown className={`w-5 h-5 transition-colors ${open ? 'text-[#6366f1]' : 'text-[#64748b]'}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <div className="h-px bg-white/[0.06] mb-4" />
              <p className="text-sm text-[#94a3b8] leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <section id="faq" className="section-padding relative overflow-hidden bg-[#0a0a12]">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="tag mb-4 inline-flex">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Everything you want to <span className="gradient-text">know</span>
          </h2>
          <p className="text-[#94a3b8]">Answers to the most common questions from our students.</p>
        </motion.div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-10 glass rounded-2xl p-6 border border-[#6366f1]/20 text-center">
          <p className="text-sm text-[#94a3b8] mb-3">Still have questions? Our counseling team is happy to help.</p>
          <a href="#" className="btn-primary inline-flex text-sm relative z-10">
            <span className="relative z-10">Book Free Counseling Call</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
