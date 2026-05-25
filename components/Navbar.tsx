'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/courses/', label: 'Courses' },
  { href: '/internships/', label: 'Internships' },
  { href: '/placements/', label: 'Placements' },
  { href: '/blog/', label: 'Blog' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="ThePlaceMate - Home">
              <Image
                src="/images/theplacemate-logo.png"
                alt="ThePlaceMate Training and Internship Logo"
                title="ThePlaceMate"
                width={120}
                height={40}
                className="h-9 w-auto object-contain group-hover:drop-shadow-[0_0_12px_rgba(99,102,241,0.5)] transition-all duration-300"
                priority
                fetchPriority="high"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[#94a3b8] hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/courses/"
                className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors"
              >
                Explore Programs
              </Link>
              <Link
                href="/contact/"
                className="btn-primary text-sm flex items-center gap-1.5 relative z-10"
              >
                <span className="relative z-10">Apply Now</span>
                <ChevronRight className="w-3.5 h-3.5 relative z-10" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-white/[0.04] transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-strong border-b border-white/[0.08] md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/[0.04] rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 pb-1 flex flex-col gap-2">
                <Link
                  href="/contact/"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary text-sm text-center relative z-10"
                >
                  <span className="relative z-10">Apply Now</span>
                </Link>
                <Link
                  href="/courses/"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary text-sm text-center"
                >
                  Explore Programs
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
