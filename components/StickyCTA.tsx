'use client'

import { Phone } from 'lucide-react'

export default function StickyCTA({ courseName }: { courseName: string }) {
  const scrollToForm = () => {
    const form = document.getElementById('lead-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Focus the first input after scroll
      setTimeout(() => {
        const firstInput = form.querySelector('input') as HTMLInputElement
        if (firstInput) firstInput.focus()
      }, 500)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 shadow-2xl">
      <div className="flex items-center gap-3">
        <a
          href="tel:+916394753801"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-700 transition-all shrink-0"
          aria-label={`Call about ${courseName}`}
        >
          <Phone className="w-4 h-4 text-teal-400" />
          Call
        </a>
        <button
          onClick={scrollToForm}
          className="btn-primary cta-shimmer flex-1 text-center text-sm py-2.5 relative z-10 font-black shadow-lg shadow-teal-500/20"
        >
          <span className="relative z-10 text-white font-extrabold tracking-wide">Enroll Now</span>
        </button>
      </div>
    </div>
  )
}
