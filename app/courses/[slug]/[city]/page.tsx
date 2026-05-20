import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import CourseFAQ from '@/components/CourseFAQ'
import StickyCTA from '@/components/StickyCTA'
import LeadForm from '@/components/LeadForm'
import CertificatesSection from '@/components/CertificatesSection'
import { COURSES, getCourseBySlug } from '@/lib/courses'
import { ALL_CITIES, getCityBySlug } from '@/lib/cities'
import { getCityContent } from '@/lib/city-content'
import { localBusinessSchema } from '@/lib/schemas'
import { faqSchema } from '@/lib/schemas'
import { CheckCircle2, Clock, BarChart2, Monitor, Briefcase, MapPin } from 'lucide-react'

export const revalidate = 86400

export async function generateStaticParams() {
  // Pre-build only top 30 high-priority pages at build time
  // All other 1,762+ pages are generated on first request and cached via ISR
  const topCourses = ['full-stack-web-development', 'generative-ai-engineering', 'ui-ux-design']
  const topCities = ['mumbai', 'pune', 'delhi', 'bangalore', 'hyderabad', 'thane', 'noida', 'gurugram', 'chennai', 'kolkata']

  return topCourses.flatMap(slug =>
    topCities.map(city => ({ slug, city }))
  )
}

export async function generateMetadata({ params }: { params: { slug: string; city: string } }): Promise<Metadata> {
  const course = getCourseBySlug(params.slug)
  const city = getCityBySlug(params.city)
  if (!course || !city) return {}

  return {
    title: `Best ${course.title} Training in ${city.name} 2025 | Placement Support`,
    description: `Looking for ${course.title} training in ${city.name}? PlaceMate offers expert-led ${course.title} courses with hands-on projects and placement assistance. Enroll now at theplacemate.in.`,
    keywords: [`${course.title} training ${city.name}`, `${course.title} course ${city.name}`, `best ${course.title.toLowerCase()} institute ${city.name}`, 'PlaceMate', 'placement support', ...course.techs.slice(0, 3)],
    alternates: {
      canonical: `https://theplacemate.in/courses/${course.slug}/${city.slug}`,
      languages: { [city.hreflang]: `https://theplacemate.in/courses/${course.slug}/${city.slug}` },
    },
    openGraph: {
      title: `${course.title} Training in ${city.name} | PlaceMate`,
      description: `Expert-led ${course.title} training accessible from ${city.name} with real projects and placement support.`,
      url: `https://theplacemate.in/courses/${course.slug}/${city.slug}`,
      siteName: 'PlaceMate',
      images: [{ url: '/logo.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${course.title} in ${city.name} | PlaceMate`, description: `Expert-led training with placement support in ${city.name}.` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export default function LocationCoursePage({ params }: { params: { slug: string; city: string } }) {
  const course = getCourseBySlug(params.slug)
  const city = getCityBySlug(params.city)
  if (!course || !city) notFound()

  const content = getCityContent(city, course)
  const otherCourses = COURSES.filter(c => c.slug !== course.slug).slice(0, 3)

  return (
    <main className="pb-16 md:pb-0">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(city.name)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(content.faqs)) }} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]" style={{ background: `radial-gradient(ellipse, ${course.color}18, transparent 70%)` }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Courses', href: '/courses' },
            { label: course.title, href: `/courses/${course.slug}` },
            { label: city.name, href: `/courses/${course.slug}/${city.slug}` },
          ]} />

          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4" style={{ color: course.color }} />
              <span className="text-sm" style={{ color: course.color }}>{city.name}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
              {course.title} Training in {city.name} <span className="gradient-text">| PlaceMate</span>
            </h1>
            <p className="text-base text-[#94a3b8] leading-relaxed mb-6 max-w-4xl">{content.intro}</p>

            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-1.5 text-sm text-[#94a3b8] glass px-3 py-1.5 rounded-full border border-white/[0.08]">
                <Clock className="w-4 h-4" style={{ color: course.color }} />{course.duration}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#94a3b8] glass px-3 py-1.5 rounded-full border border-white/[0.08]">
                <BarChart2 className="w-4 h-4" style={{ color: course.color }} />{course.level}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#94a3b8] glass px-3 py-1.5 rounded-full border border-white/[0.08]">
                <Monitor className="w-4 h-4" style={{ color: course.color }} />{course.mode}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#enroll-city" id="enroll-city" className="btn-primary flex items-center gap-2 text-sm relative z-10">
                <span className="relative z-10">Join PlaceMate&apos;s {course.title} Training in {city.name}</span>
              </a>
              <Link href={`/courses/${course.slug}`} className="btn-secondary flex items-center gap-2 text-sm">
                Full Course Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Learn in this City */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">
            Why Learn {course.title} in <span className="gradient-text">{city.name}</span>
          </h2>
          <div className="space-y-4">
            {content.whyLearn.map((point, i) => (
              <div key={i} className="flex items-start gap-3 glass rounded-xl p-4 border border-white/[0.06]">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: course.color }} />
                <p className="text-sm text-[#94a3b8] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">
            {course.title} Course <span className="gradient-text">Highlights</span> for {city.name} Students
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {course.outcomes.map((o, i) => (
              <div key={i} className="glass rounded-2xl p-5 border border-white/[0.06] text-center">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-3" style={{ color: course.color }} />
                <p className="text-sm text-[#94a3b8]">{o}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-white mb-4">Technologies you will master</h3>
            <div className="flex flex-wrap gap-2">
              {course.techs.map(tech => (
                <span key={tech} className="glass rounded-lg px-4 py-2 text-sm border border-white/[0.06]" style={{ color: course.color, borderColor: `${course.color}30` }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Placement in City */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">
            Placement Support in <span className="gradient-text">{city.name}</span>
          </h2>
          <div className="glass rounded-2xl p-6 border border-white/[0.06]">
            <p className="text-sm text-[#94a3b8] leading-relaxed mb-6">{content.placementInfo}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {['Resume optimization for local market', 'Mock interviews with regional focus', 'Hiring partner referrals', 'LinkedIn profile optimization', 'Portfolio review and feedback', 'Post-program career coaching'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[#94a3b8]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: course.color }} />{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Priority City: Job Market Stats */}
      {content.isPriority && content.jobMarketStats && (
        <section className="py-16 relative">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">
              {course.title} Job Market in <span className="gradient-text">{city.name}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {content.jobMarketStats.map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-4 border border-white/[0.06] text-center">
                  <div className="text-lg font-bold text-white mb-1" style={{ color: i === 0 ? course.color : undefined }}>{stat.value}</div>
                  <div className="text-xs text-[#64748b]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Priority City: Top Employers */}
      {content.isPriority && content.topEmployers && content.topEmployers.length > 0 && (
        <section className="py-16 bg-[#0a0a12] relative">
          <div className="absolute inset-0 grid-overlay opacity-20" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-8">
              Top {course.title} Employers in <span className="gradient-text">{city.name}</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {content.topEmployers.map((emp, i) => (
                <div key={i} className="flex items-center gap-3 glass rounded-xl p-4 border border-white/[0.06]">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0" style={{ background: `${course.color}20`, color: course.color }}>{i + 1}</div>
                  <span className="text-sm text-[#94a3b8]">{emp}</span>
                </div>
              ))}
            </div>
            {content.itParks && (
              <div className="mt-6 glass rounded-xl p-4 border border-white/[0.06]">
                <h3 className="text-sm font-bold text-white mb-2">Key IT Hubs & Tech Parks in {city.name}</h3>
                <p className="text-sm text-[#94a3b8]">{content.itParks}</p>
              </div>
            )}
            {content.avgSalary && (
              <div className="mt-3 glass rounded-xl p-4 border border-white/[0.06]">
                <h3 className="text-sm font-bold text-white mb-2">Average Salary for {course.title} Freshers in {city.name}</h3>
                <p className="text-sm text-[#94a3b8]">Entry-level {course.title.toLowerCase()} professionals in {city.name} can expect packages around <strong className="text-white">{content.avgSalary}</strong> with verified project experience and internship certification.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Internship */}
      <section className="py-16 relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
            <div className="flex items-start gap-4">
              <Briefcase className="w-8 h-8 shrink-0" style={{ color: course.color }} />
              <div>
              <h3 className="text-xl font-bold text-white mb-2">Internship from {city.name}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  {content.internshipText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CertificatesSection />

      {/* Lead Form */}
      <section className="py-16 relative">
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">Enroll for <span className="gradient-text">{course.title}</span> in {city.name}</h2>
          <LeadForm courseName={course.title} cityName={city.name} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">
            {course.title} in {city.name} — <span className="gradient-text">FAQs</span>
          </h2>
          <CourseFAQ faqs={content.faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]" style={{ background: `radial-gradient(circle, ${course.color}10, transparent 70%)` }} />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            Join PlaceMate&apos;s {course.title} Training in {city.name}
          </h2>
          <p className="text-[#94a3b8] mb-8">Start your tech career journey with expert mentorship, real projects, and placement support.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#enroll-city" className="btn-primary inline-flex items-center gap-2 relative z-10">
              <span className="relative z-10">Enroll Today</span>
            </a>
            <Link href={`/courses/${course.slug}`} className="btn-secondary inline-flex items-center gap-2">
              View Full Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Other Courses */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-black text-white text-center mb-6">Other programs available in {city.name}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherCourses.map(r => (
              <Link key={r.slug} href={`/courses/${r.slug}/${city.slug}`} className="glass rounded-xl p-4 border border-white/[0.06] hover:border-white/[0.15] transition-all block text-center">
                <div className="text-2xl mb-2">{r.icon}</div>
                <div className="text-sm font-semibold text-white">{r.title}</div>
                <div className="text-xs text-[#64748b] mt-1">in {city.name}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/courses" className="text-sm text-[#6366f1] hover:text-[#8b5cf6] transition-colors">
              ← View All Courses
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA courseName={`${course.title} in ${city.name}`} />
    </main>
  )
}
