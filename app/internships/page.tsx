import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { COURSES } from '@/lib/courses'
import CertificatesSection from '@/components/CertificatesSection'
import { InternshipTimeline, InternshipBenefits } from '@/components/InternshipSections'

export const metadata: Metadata = {
  title: 'Internship Programs — Real Work Experience at PlaceMate',
  description: 'PlaceMate internship programs offer real-world project experience with startup partners. Gain verifiable internship certificates, build your portfolio, and prepare for full-time roles.',
  alternates: { canonical: 'https://theplacemate.in/internships' },
  openGraph: {
    title: 'Internship Programs — Real Work Experience | PlaceMate',
    description: 'Structured internships with real companies. Build production projects, gain experience, earn certificates.',
    url: 'https://theplacemate.in/internships',
    siteName: 'PlaceMate',
    images: [{ url: '/og-internships.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'PlaceMate Internships', description: 'Real-world internship programs with startup partners.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}



export default function InternshipsPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(6,182,212,0.12),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Internships', href: '/internships' }]} />
          <div className="mt-8 text-center">
            <span className="tag mb-4 inline-flex">Internship Programs</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Real internships, <span className="gradient-text-cyan">real experience</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
              Every PlaceMate program includes a structured internship phase where you work on actual company projects with professional workflows. This is not a simulation — you ship real features, attend real standups, and earn a verifiable internship certificate that strengthens your resume.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <InternshipTimeline />

      {/* Benefits */}
      <InternshipBenefits />

      <CertificatesSection />

      {/* Programs with internships */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-white mb-8">Programs with <span className="gradient-text">internship tracks</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSES.map(c => (
              <Link key={c.slug} href={`/courses/${c.slug}`} className="glass rounded-xl p-4 border border-white/[0.06] hover:border-white/[0.15] transition-all text-center block">
                <div className="text-2xl mb-2">{c.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{c.title}</div>
                <div className="text-xs text-[#64748b]">{c.internship}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
