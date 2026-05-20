'use client'

import Link from 'next/link'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(236,72,153,0.08),transparent_70%)]" />

      <div className="relative text-center px-4">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Something went wrong
        </h2>
        <p className="text-[#94a3b8] text-base max-w-md mx-auto mb-8">
          We encountered an unexpected error. Please try again or navigate to another page.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={reset} className="btn-primary inline-flex items-center gap-2 text-sm relative z-10">
            <span className="relative z-10">Try Again</span>
          </button>
          <Link href="/" className="btn-secondary inline-flex items-center gap-2 text-sm">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
