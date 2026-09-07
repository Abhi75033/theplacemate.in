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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong border-t border-white/[0.08] px-4 py-3">
      <div className="flex items-center gap-3">
        <a
          href="tel:+916394753801"
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.1] text-sm text-[#94a3b8] hover:text-white transition-all shrink-0"
          aria-label={`Call about ${courseName}`}
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <button
          onClick={scrollToForm}
          className="btn-primary cta-shimmer flex-1 text-center text-sm py-2.5 relative z-10"
        >
          <span className="relative z-10">Enroll Now</span>
        </button>
      </div>
    </div>
  )
}
