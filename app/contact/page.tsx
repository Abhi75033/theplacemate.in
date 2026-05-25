import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact PlaceMate — Get in Touch for Enquiries',
  description: 'Reach out to PlaceMate for course enquiries, placement support details, or partnership opportunities. Call, email, or visit us to start your tech career journey today.',
  alternates: { canonical: 'https://www.theplacemate.in/contact/' },
  openGraph: {
    title: 'Contact PlaceMate — Enquiries & Support',
    description: 'Get in touch with PlaceMate for training enquiries, demo sessions, and career counseling.',
    url: 'https://www.theplacemate.in/contact/',
    siteName: 'PlaceMate',
    images: [{ url: '/og-contact.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Contact PlaceMate', description: 'Reach out for course enquiries and placement support.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PlaceMate',
  url: 'https://www.theplacemate.in/',
  telephone: '+91-9845953801',
  email: 'hello@theplacemate.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Sa 09:00-19:00',
}

const INFO = [
  { icon: Mail, label: 'Email Us', value: 'hello@theplacemate.in', href: 'mailto:hello@theplacemate.in' },
  { icon: Phone, label: 'Call Us', value: '+91 63947 53801', href: 'tel:+916394753801' },
  { icon: MapPin, label: 'Location', value: 'Mumbai, Maharashtra, India', href: '#' },
  { icon: Clock, label: 'Working Hours', value: 'Mon–Sat, 9 AM – 7 PM IST', href: '#' },
]

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Contact', href: '/contact' }]} />
          <div className="mt-8 text-center">
            <span className="tag mb-4 inline-flex">Get in Touch</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Contact <span className="gradient-text">PlaceMate</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl mx-auto">
              Have questions about our programs, placement support, or partnership opportunities? Our team responds within 24 hours on business days.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {INFO.map((item, i) => (
                <a key={i} href={item.href} className="glass rounded-2xl p-5 border border-white/[0.06] hover:border-[#6366f1]/20 transition-all flex items-center gap-4 block">
                  <div className="w-12 h-12 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#64748b] mb-0.5">{item.label}</div>
                    <div className="text-sm font-semibold text-white">{item.value}</div>
                  </div>
                </a>
              ))}

              <div className="glass rounded-2xl p-6 border border-white/[0.06] mt-6">
                <h3 className="text-lg font-bold text-white mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/courses" className="text-sm text-[#94a3b8] hover:text-white transition-colors block">→ Browse All Courses</Link>
                  <Link href="/placements" className="text-sm text-[#94a3b8] hover:text-white transition-colors block">→ Placement Records</Link>
                  <Link href="/internships" className="text-sm text-[#94a3b8] hover:text-white transition-colors block">→ Internship Programs</Link>
                  <Link href="/about" className="text-sm text-[#94a3b8] hover:text-white transition-colors block">→ About PlaceMate</Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
              <h2 className="text-xl font-bold text-white mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="text-xs text-[#94a3b8] mb-1 block">Full Name</label>
                  <input id="contact-name" type="text" required className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/40 focus:outline-none transition-all" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-xs text-[#94a3b8] mb-1 block">Email</label>
                  <input id="contact-email" type="email" required className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/40 focus:outline-none transition-all" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="text-xs text-[#94a3b8] mb-1 block">Phone</label>
                  <input id="contact-phone" type="tel" className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/40 focus:outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <label htmlFor="contact-interest" className="text-xs text-[#94a3b8] mb-1 block">Interested In</label>
                  <select id="contact-interest" className="w-full glass rounded-xl px-4 py-3 text-sm text-white border border-white/[0.08] focus:border-[#6366f1]/40 focus:outline-none transition-all bg-transparent">
                    <option value="" className="bg-[#111120]">Select a program</option>
                    <option value="full-stack" className="bg-[#111120]">Full Stack Web Development</option>
                    <option value="ai" className="bg-[#111120]">Generative AI & AI Engineering</option>
                    <option value="graphic" className="bg-[#111120]">Graphic Designing</option>
                    <option value="uiux" className="bg-[#111120]">UI/UX Design</option>
                    <option value="backend" className="bg-[#111120]">Backend Engineering</option>
                    <option value="automation" className="bg-[#111120]">AI Automation</option>
                    <option value="devops" className="bg-[#111120]">DevOps & Deployment</option>
                    <option value="freelancing" className="bg-[#111120]">Freelancing Accelerator</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-xs text-[#94a3b8] mb-1 block">Message</label>
                  <textarea id="contact-message" rows={4} className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#475569] border border-white/[0.08] focus:border-[#6366f1]/40 focus:outline-none transition-all resize-none" placeholder="Tell us about your goals..." />
                </div>
                <button type="submit" className="w-full btn-primary text-sm py-3 relative z-10">
                  <span className="relative z-10">Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
