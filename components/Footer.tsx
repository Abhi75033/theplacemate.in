'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, Instagram, Twitter, Mail, ArrowRight, MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { COURSES } from '@/lib/courses'
import { ALL_CITIES } from '@/lib/cities'

const COURSE_CATEGORIES: Record<string, string[]> = {
  'Development': ['full-stack-web-development','full-stack-python-development','full-stack-java-development','mern-stack-development','mean-stack-development','java-development','python-development','backend-engineering'],
  'AI, Data & Cloud': ['generative-ai-engineering','ai-automation','data-science','data-analytics','cloud-computing','devops-deployment','software-testing'],
  'Design & Creative': ['ui-ux-design','graphic-designing','video-editing','photo-editing','digital-marketing'],
  'Business & Skills': ['freelancing-accelerator','sales-and-marketing','human-resource-management','finance-courses','english-communication'],
}

const TOP_CITY_SLUGS = ['mumbai','pune','delhi','bangalore','hyderabad','chennai','kolkata','noida','gurugram','ahmedabad','jaipur','thane','lucknow','chandigarh','kochi','surat','nagpur','indore','nashik','coimbatore']

const POPULAR_COMBOS = [
  { label: 'Full Stack Dev in Mumbai', href: '/courses/full-stack-web-development/mumbai/' },
  { label: 'Data Science in Bangalore', href: '/courses/data-science/bangalore/' },
  { label: 'Digital Marketing in Delhi', href: '/courses/digital-marketing/delhi/' },
  { label: 'MERN Stack in Pune', href: '/courses/mern-stack-development/pune/' },
  { label: 'Software Testing in Hyderabad', href: '/courses/software-testing/hyderabad/' },
  { label: 'Python Dev in Chennai', href: '/courses/python-development/chennai/' },
  { label: 'Java Dev in Noida', href: '/courses/java-development/noida/' },
  { label: 'Cloud Computing in Gurugram', href: '/courses/cloud-computing/gurugram/' },
  { label: 'AI Engineering in Kolkata', href: '/courses/generative-ai-engineering/kolkata/' },
  { label: 'Data Analytics in Ahmedabad', href: '/courses/data-analytics/ahmedabad/' },
  { label: 'HR Management in Jaipur', href: '/courses/human-resource-management/jaipur/' },
  { label: 'Video Editing in Mumbai', href: '/courses/video-editing/mumbai/' },
]

function ExpandableSection({ title, icon, children, previewCount, totalCount }: { title: string; icon?: React.ReactNode; children: React.ReactNode; previewCount: number; totalCount: number }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h4 className="text-xs font-semibold text-white uppercase tracking-wider">{title}</h4>
        <span className="text-[10px] text-[#475569] glass px-2 py-0.5 rounded-full">{totalCount}</span>
      </div>
      {children}
      {totalCount > previewCount && (
        <button onClick={() => setExpanded(!expanded)}
          className="mt-3 flex items-center gap-1.5 text-[11px] text-[#6366f1] hover:text-[#8b5cf6] transition-colors group">
          {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {expanded ? 'Show Less' : `View All ${totalCount} ${title.toLowerCase()}`}
        </button>
      )}
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showAllCities, setShowAllCities] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  const courseMap = Object.fromEntries(COURSES.map(c => [c.slug, c]))
  const topCities = ALL_CITIES.filter(c => TOP_CITY_SLUGS.includes(c.slug)).sort((a, b) => a.name.localeCompare(b.name))
  const remainingCities = ALL_CITIES.filter(c => !TOP_CITY_SLUGS.includes(c.slug)).sort((a, b) => a.name.localeCompare(b.name))

  return (
    <footer className="relative overflow-hidden bg-[#0B3C6D] border-t border-white/10 text-white">
      <div className="absolute inset-0 grid-overlay opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(20,184,166,0.15),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA */}
        <div className="py-12 border-b border-white/[0.06]">
          <div className="grid sm:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Ready to <span className="gradient-text">start building?</span>
              </h3>
              <p className="text-white/70 text-sm">Join 2,800+ students already on their career journey.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Link href="/contact/" className="btn-primary flex items-center justify-center gap-2 text-sm relative z-10">
                <span className="relative z-10">Apply Now</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </Link>
              <Link href="/courses/" className="btn-secondary flex items-center justify-center gap-2 text-sm">
                Explore Programs
              </Link>
            </div>
          </div>
        </div>

        {/* ALL Courses — always visible */}
        <div className="py-10 border-b border-white/[0.06]">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-6">All Programs <span className="text-[#475569] normal-case font-normal">({COURSES.length} courses)</span></h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Object.entries(COURSE_CATEGORIES).map(([category, slugs]) => {
              const courses = slugs.map(s => courseMap[s]).filter(Boolean)
              return (
                <div key={category}>
                  <div className="text-[11px] font-medium text-[#14B8A6] uppercase tracking-wider mb-3">{category}</div>
                  <ul className="space-y-1.5">
                    {courses.map(c => (
                      <li key={c.slug}>
                        <Link href={`/courses/${c.slug}/`} className="text-xs text-white/60 hover:text-[#14B8A6] transition-colors flex items-center gap-1">
                          <span>{c.icon}</span> {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* ALL Cities — with expand */}
        <div className="py-10 border-b border-white/[0.06]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#14B8A6]" />
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Training Locations <span className="text-white/50 normal-case font-normal">({ALL_CITIES.length} cities)</span></h4>
            </div>
            <button onClick={() => setShowAllCities(!showAllCities)}
              className="flex items-center gap-1 text-[11px] text-[#14B8A6] hover:text-[#F97316] transition-colors">
              {showAllCities ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {showAllCities ? 'Show Less' : `View All ${ALL_CITIES.length} Cities`}
            </button>
          </div>

          {/* Top cities always visible */}
          <div className="flex flex-wrap gap-x-1 gap-y-1.5 mb-2">
            {topCities.map((city, i) => (
              <span key={city.slug} className="inline-flex items-center">
                <Link href={`/courses/full-stack-web-development/${city.slug}/`} className="text-xs text-white/60 hover:text-[#14B8A6] transition-colors">
                  {city.name}
                </Link>
                {i < topCities.length - 1 && <span className="text-white/20 mx-1.5">·</span>}
              </span>
            ))}
          </div>

          {/* Expanded: remaining cities */}
          <AnimatePresence>
            {showAllCities && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="pt-3 border-t border-white/[0.04]">
                  <div className="flex flex-wrap gap-x-1 gap-y-1.5">
                    {remainingCities.map((city, i) => (
                      <span key={city.slug} className="inline-flex items-center">
                        <Link href={`/courses/full-stack-web-development/${city.slug}/`} className="text-[11px] text-white/40 hover:text-[#14B8A6] transition-colors">
                          {city.name}
                        </Link>
                        {i < remainingCities.length - 1 && <span className="text-white/20 mx-1">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Popular course×city combos */}
        <div className="py-8 border-b border-white/[0.06]">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Popular Training Programs</h4>
          <div className="flex flex-wrap gap-2">
            {POPULAR_COMBOS.map(combo => (
              <Link key={combo.href} href={combo.href}
                className="text-[11px] text-white/75 hover:text-white glass px-3 py-1.5 rounded-full border border-white/10 hover:border-[#14B8A6]/40 transition-all">
                {combo.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom grid */}
        <div className="py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="ThePlaceMate - Home">
              <Image
                src="/images/theplacemate-logo-icon.png"
                alt="ThePlaceMate Training and Internship Logo"
                title="ThePlaceMate"
                width={30}
                height={30}
                className="w-[30px] h-[30px] object-contain shrink-0"
              />
              <span className="text-lg font-bold">
                The<span className="gradient-text">PlaceMate</span>
              </span>
            </Link>
            <p className="text-xs text-white/70 leading-relaxed mb-4 max-w-[200px]">
              Industry-focused tech training and internship programs with real placement support across India.
            </p>
            <div className="flex gap-2">
              {[
                { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/theplacemate' },
                { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/theplacemate' },
                { Icon: Twitter, label: 'Twitter', href: 'https://twitter.com/theplacemate' },
                { Icon: Mail, label: 'Email', href: 'mailto:hello@theplacemate.in' },
              ].map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:border-[#14B8A6]/40 border border-white/10 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Company</div>
            <ul className="space-y-2">
              {[
                { label: 'About Us', href: '/about/' },
                { label: 'Blog', href: '/blog/' },
                { label: 'Placements', href: '/placements/' },
                { label: 'Internships', href: '/internships/' },
                { label: 'All Courses', href: '/courses/' },
                { label: 'Courses by City', href: '/courses-by-city/' },
                { label: 'Best Tech Courses', href: '/best-tech-courses-india/' },
                { label: 'Contact', href: '/contact/' },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="text-xs text-white/70 hover:text-[#14B8A6] transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Resources</div>
            <ul className="space-y-2">
              {[
                { label: 'Career Guides', href: '/blog/' },
                { label: 'Success Stories', href: '/placements/' },
                { label: 'DS vs Web Dev', href: '/blog/data-science-vs-web-development-2025/' },
                { label: 'Internship Guide', href: '/blog/how-to-get-it-internship-india-fresher/' },
                { label: 'Top IT Courses', href: '/blog/top-10-it-courses-after-12th-india-2025/' },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="text-xs text-white/70 hover:text-[#14B8A6] transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Stay Updated</div>
            <p className="text-xs text-white/70 mb-3">Get cohort updates and career tips.</p>
            {subscribed ? (
              <div className="text-xs text-[#14B8A6] font-medium">🎉 You&apos;re subscribed!</div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required
                  className="w-full glass rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 border border-white/20 focus:border-[#14B8A6]/60 focus:outline-none transition-all" />
                <button type="submit" className="btn-primary text-sm px-5 py-2.5 w-full relative z-10">
                  <span className="relative z-10">Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© 2025 PlaceMate. All rights reserved. Registered Address: 12th Floor, Trade Tower, Bandra Kurla Complex, Mumbai, Maharashtra 400051.</span>
          <div className="flex gap-4">
            <Link href="/privacy-policy/" className="hover:text-[#14B8A6] transition-colors">Privacy Policy</Link>
            <Link href="/terms/" className="hover:text-[#14B8A6] transition-colors">Terms of Service</Link>
          </div>
          <span>Made with ❤️ for aspiring engineers</span>
        </div>
      </div>
    </footer>
  )
}
