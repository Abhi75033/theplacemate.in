import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { COURSES } from '@/lib/courses'
import { Clock, BarChart2, Briefcase, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'All Courses — Training Programs with Placement Support',
  description: 'Explore PlaceMate\'s industry-focused training programs in Full Stack Development, AI Engineering, UI/UX Design, DevOps, and more. Expert mentors, real projects, and placement support.',
  alternates: { canonical: 'https://www.theplacemate.in/courses/' },
  openGraph: {
    title: 'All Courses — PlaceMate Training Programs',
    description: 'Industry-focused training with real internships and placement support across 8 specialized programs.',
    url: 'https://www.theplacemate.in/courses/',
    siteName: 'PlaceMate',
    images: [{ url: '/og-courses.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'PlaceMate Courses', description: 'Explore 8 industry-focused training programs with placement support.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default function CoursesPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Courses', href: '/courses' }]} />
          <div className="mt-8 text-center mb-16">
            <span className="tag mb-4 inline-flex">8 Industry Programs</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Choose your <span className="gradient-text">career path</span>
            </h1>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              Every program combines expert-led training, hands-on projects, real internship experience, and structured placement support. Pick the track that matches your career ambition.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {COURSES.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group relative glass rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 cursor-pointer overflow-hidden card-hover block"
              >
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${course.color}, transparent)` }} />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: `${course.color}20`, border: `1px solid ${course.color}30` }}>
                      {course.icon}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-xs text-[#94a3b8]">
                        <Clock className="w-3 h-3" />{course.duration}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#94a3b8]">
                        <BarChart2 className="w-3 h-3" />{course.level}
                      </div>
                    </div>
                  </div>

                  <h2 className="text-lg font-bold text-white mb-2">{course.title}</h2>
                  <p className="text-xs text-[#94a3b8] mb-3">{course.shortDesc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.techs.slice(0, 5).map(tech => (
                      <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-full border"
                        style={{ color: course.color, borderColor: `${course.color}40`, background: `${course.color}10` }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2 mb-4 border border-white/[0.04]">
                    <Briefcase className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                    <span className="text-[10px] text-[#94a3b8]">{course.internship}</span>
                  </div>

                  <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border border-white/[0.08] group-hover:border-opacity-60 transition-all"
                    style={{ color: course.color }}>
                    View Details
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
