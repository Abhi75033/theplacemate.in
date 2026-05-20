import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import CurriculumAccordion from '@/components/CurriculumAccordion'
import CourseFAQ from '@/components/CourseFAQ'
import StickyCTA from '@/components/StickyCTA'
import LeadForm from '@/components/LeadForm'
import CertificatesSection from '@/components/CertificatesSection'
import AnimatedCourseTools from '@/components/AnimatedCourseTools'
import CourseHeroAnimation from '@/components/CourseHeroAnimation'
import { COURSES, getCourseBySlug, getRelatedCourses } from '@/lib/courses'
import { getCurriculum, getFAQs, getTestimonials } from '@/lib/course-details'
import { TIER1_INDIA } from '@/lib/cities'
import { courseSchema, faqSchema } from '@/lib/schemas'
import { Clock, BarChart2, Monitor, Briefcase, CheckCircle2, Quote, ChevronRight } from 'lucide-react'

export const revalidate = 86400

export async function generateStaticParams() {
  return COURSES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = getCourseBySlug(params.slug)
  if (!course) return {}
  return {
    title: `${course.title} Training & Certification | Placement Support`,
    description: `Master ${course.title} with PlaceMate's expert-led ${course.duration} program. Hands-on projects, real internship experience, and placement assistance. Enroll at theplacemate.in.`,
    keywords: [course.title, `${course.title} training`, `${course.title} course`, `${course.title} certification`, 'placement support', 'online training', 'PlaceMate', 'internship', ...course.techs.slice(0, 3)],
    alternates: { canonical: `https://theplacemate.in/courses/${course.slug}` },
    openGraph: {
      title: `${course.title} Training & Certification | PlaceMate`,
      description: `Expert-led ${course.title} program with hands-on projects, internship, and placement support.`,
      url: `https://theplacemate.in/courses/${course.slug}`,
      siteName: 'PlaceMate',
      images: [{ url: '/logo.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: `${course.title} | PlaceMate`, description: `${course.duration} program with projects, internship & placement support.` },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug)
  if (!course) notFound()

  const curriculum = getCurriculum(course.slug, course)
  const faqs = getFAQs(course.slug, course)
  const testimonials = getTestimonials(course.slug, course)
  const related = getRelatedCourses(course.slug)
  const topCities = TIER1_INDIA.slice(0, 15)

  return (
    <main className="pb-16 md:pb-0">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema({ name: course.title, description: course.description, slug: course.slug, duration: course.duration })) }} />
      {faqs.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />}

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <CourseHeroAnimation slug={course.slug} color={course.color} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Courses', href: '/courses' }, { label: course.title, href: `/courses/${course.slug}` }]} />
          <div className="mt-8 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-4xl mb-4">{course.icon}</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">{course.title}</h1>
              <p className="text-base text-[#94a3b8] leading-relaxed mb-6">{course.description}</p>
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
                <a href="#enroll" id="enroll" className="btn-primary flex items-center gap-2 text-sm relative z-10">
                  <span className="relative z-10">Enroll Now</span>
                </a>
                <a href="#curriculum" className="btn-secondary flex items-center gap-2 text-sm">View Curriculum</a>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 border border-white/[0.06]">
              <h3 className="text-lg font-bold text-white mb-4">What you will learn</h3>
              <ul className="space-y-3">
                {course.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#94a3b8]">
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: course.color }} />{o}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center gap-2 bg-white/[0.03] rounded-lg px-4 py-3 border border-white/[0.04]">
                <Briefcase className="w-4 h-4 text-[#10b981] shrink-0" />
                <span className="text-sm text-[#94a3b8]">{course.internship}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools */}
      <AnimatedCourseTools techs={course.techs} color={course.color} />

      {/* Curriculum */}
      <section id="curriculum" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-12">Course <span className="gradient-text">Curriculum</span></h2>
          <CurriculumAccordion modules={curriculum} color={course.color} />
        </div>
      </section>

      {/* Batch Info */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-8">Batch <span className="gradient-text">Details</span></h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-5 border border-white/[0.06] text-center">
              <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: course.color }} />
              <div className="text-sm font-bold text-white mb-1">Duration</div>
              <div className="text-xs text-[#94a3b8]">{course.duration} (includes internship)</div>
            </div>
            <div className="glass rounded-2xl p-5 border border-white/[0.06] text-center">
              <Monitor className="w-6 h-6 mx-auto mb-2" style={{ color: course.color }} />
              <div className="text-sm font-bold text-white mb-1">Mode</div>
              <div className="text-xs text-[#94a3b8]">{course.mode}</div>
            </div>
            <div className="glass rounded-2xl p-5 border border-white/[0.06] text-center">
              <BarChart2 className="w-6 h-6 mx-auto mb-2" style={{ color: course.color }} />
              <div className="text-sm font-bold text-white mb-1">Schedule</div>
              <div className="text-xs text-[#94a3b8]">Weekday & Weekend batches available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Assistance */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">Placement <span className="gradient-text">Assistance</span></h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {['ATS-optimized resume building', 'LinkedIn profile optimization', '5+ mock interview rounds', 'Portfolio review with mentors', 'Hiring partner referral network', 'DSA & system design prep'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 glass rounded-xl p-4 border border-white/[0.06]">
                <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: course.color }} />
                <span className="text-sm text-[#94a3b8]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CertificatesSection />

      {/* Testimonials */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-8">Student <span className="gradient-text">Reviews</span></h2>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="glass rounded-2xl p-5 border border-white/[0.06] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${course.color}60, transparent)` }} />
                <Quote className="w-6 h-6 mb-3 opacity-30" style={{ color: course.color }} />
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}88)` }}>{t.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-[#64748b]">{t.role} · {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-8">Enroll in <span className="gradient-text">{course.title}</span></h2>
          <LeadForm courseName={course.title} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-12">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <CourseFAQ faqs={faqs} />
        </div>
      </section>

      {/* Available Cities */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-4">We offer this course in <span className="gradient-text">these cities</span></h2>
          <p className="text-sm text-[#64748b] text-center mb-8">Click any city to see location-specific details and job market information</p>
          <div className="flex flex-wrap justify-center gap-2">
            {topCities.map(city => (
              <Link key={city.slug} href={`/courses/${course.slug}/${city.slug}`}
                className="text-xs glass px-3 py-1.5 rounded-full border border-white/[0.06] text-[#94a3b8] hover:text-white hover:border-[#6366f1]/30 transition-all">
                {city.name}
              </Link>
            ))}
            <Link href={`/courses/${course.slug}/mumbai`} className="text-xs px-3 py-1.5 rounded-full border border-[#6366f1]/30 text-[#6366f1] font-medium">
              Browse All Cities →
            </Link>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="section-padding relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-8">Related <span className="gradient-text">Programs</span></h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {related.map(r => (
              <Link key={r.slug} href={`/courses/${r.slug}`} className="glass rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.15] transition-all card-hover block">
                <div className="text-3xl mb-3">{r.icon}</div>
                <h3 className="text-base font-bold text-white mb-1">{r.title}</h3>
                <p className="text-xs text-[#64748b] mb-3">{r.shortDesc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: r.color }}>
                  View Details <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA courseName={course.title} />
    </main>
  )
}
