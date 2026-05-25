import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { COURSES } from '@/lib/courses'
import { TIER1_INDIA } from '@/lib/cities'
import { faqSchema } from '@/lib/schemas'
import { MapPin, BookOpen, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Training Courses by City — Find Tech Courses Near You | PlaceMate',
  description: 'Find expert-led tech training programs in your city. PlaceMate offers Full Stack, AI, UI/UX, DevOps, Data Science courses with placement support in 50+ cities across India.',
  alternates: { canonical: 'https://www.theplacemate.in/courses-by-city/' },
  openGraph: {
    title: 'Tech Training Courses by City in India | PlaceMate',
    description: 'Find expert-led tech courses with placement support in your city. 25+ programs across 50+ Indian cities.',
    url: 'https://www.theplacemate.in/courses-by-city/',
    siteName: 'PlaceMate',
    images: [{ url: '/og-courses.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Courses by City | PlaceMate', description: 'Tech training with placement support in 50+ Indian cities.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const CITY_HUB_FAQS = [
  {
    q: 'Does PlaceMate offer training in my city?',
    a: 'PlaceMate offers online and hybrid training programs accessible from 50+ cities across India including Mumbai, Delhi, Bangalore, Pune, Hyderabad, Chennai, Kolkata, Noida, Gurugram, and many more. All live sessions are conducted online, making our programs accessible from anywhere in India.',
  },
  {
    q: 'Can I attend training from a Tier-2 or Tier-3 city?',
    a: 'Yes. Since PlaceMate programs are primarily online, students from Tier-2 and Tier-3 cities can fully participate in all live sessions, mentorship calls, and project reviews. We also have hybrid options in major cities for students who prefer in-person elements.',
  },
  {
    q: 'Are placement opportunities available in my city?',
    a: 'PlaceMate\'s hiring partner network spans remote-first companies, startups, and enterprises across India. Most hiring partners accept remote candidates, and we actively work with companies in Tier-1 hubs (Mumbai, Bangalore, Delhi, Hyderabad, Pune) for local placements.',
  },
  {
    q: 'What is the best tech course to do in India in 2025?',
    a: 'In 2025, the highest-demand courses are Full Stack Web Development, Generative AI & AI Engineering, Data Science & Machine Learning, and DevOps & Cloud Computing. All these programs are offered by PlaceMate with placement support across India.',
  },
  {
    q: 'How do I know which course is right for me?',
    a: 'PlaceMate offers free 30-minute career counseling sessions to help you choose the right program based on your background, goals, and city job market. Reach out via our Contact page or call +91 63947 53801.',
  },
]

const CATEGORY_GROUPS = [
  {
    name: 'Development',
    color: '#6366f1',
    courses: ['full-stack-web-development', 'backend-engineering', 'mern-stack-development', 'mean-stack-development', 'full-stack-python-development', 'full-stack-java-development', 'java-development', 'python-development'],
  },
  {
    name: 'AI, Data & Cloud',
    color: '#06b6d4',
    courses: ['generative-ai-engineering', 'ai-automation', 'data-science', 'data-analytics', 'cloud-computing', 'devops-deployment', 'software-testing'],
  },
  {
    name: 'Design & Creative',
    color: '#ec4899',
    courses: ['ui-ux-design', 'graphic-designing', 'video-editing', 'photo-editing', 'digital-marketing'],
  },
  {
    name: 'Business & Skills',
    color: '#f59e0b',
    courses: ['freelancing-accelerator', 'sales-and-marketing', 'human-resource-management', 'finance-courses', 'english-communication'],
  },
]

const TOP_CITIES = TIER1_INDIA.slice(0, 20)

export default function CoursesByCityPage() {
  const courseMap = Object.fromEntries(COURSES.map(c => [c.slug, c]))

  return (
    <main>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(CITY_HUB_FAQS)) }} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Courses by City', href: '/courses-by-city/' }]} />
          <div className="mt-8 text-center">
            <span className="tag mb-4 inline-flex">50+ Cities Covered</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Tech Training <span className="gradient-text">Near You</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
              PlaceMate offers expert-led training programs in Full Stack Development, AI Engineering, UI/UX Design, DevOps, Data Science and more — accessible from every major city in India. Find courses available in your city and start your tech career today.
            </p>
          </div>
        </div>
      </section>

      {/* Top Cities Grid */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-5 h-5 text-[#6366f1]" />
            <h2 className="text-2xl font-black text-white">Browse <span className="gradient-text">by City</span></h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {TOP_CITIES.map(city => (
              <Link
                key={city.slug}
                href={`/courses/full-stack-web-development/${city.slug}/`}
                className="glass rounded-xl p-4 border border-white/[0.06] hover:border-[#6366f1]/30 transition-all text-center group"
              >
                <div className="text-2xl mb-2">🏙️</div>
                <div className="text-sm font-semibold text-white group-hover:text-[#6366f1] transition-colors">{city.name}</div>
                <div className="text-[10px] text-[#475569] mt-1">{COURSES.length}+ courses</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Courses by Category */}
      <section className="py-16 relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-5 h-5 text-[#6366f1]" />
            <h2 className="text-2xl font-black text-white">All <span className="gradient-text">Programs</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {CATEGORY_GROUPS.map(group => (
              <div key={group.name} className="glass rounded-2xl p-6 border border-white/[0.06]">
                <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: group.color }}>{group.name}</div>
                <ul className="space-y-2">
                  {group.courses.map(slug => {
                    const course = courseMap[slug]
                    if (!course) return null
                    return (
                      <li key={slug}>
                        <Link href={`/courses/${slug}/`} className="flex items-center gap-2 text-sm text-[#64748b] hover:text-white transition-colors group">
                          <span>{course.icon}</span>
                          <span className="flex-1">{course.title}</span>
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: group.color }} />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Course × City Combos */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white mb-8">Popular <span className="gradient-text">Course + City</span> Combinations</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: 'Full Stack in Mumbai', slug: 'full-stack-web-development', city: 'mumbai' },
              { label: 'AI Engineering in Bangalore', slug: 'generative-ai-engineering', city: 'bangalore' },
              { label: 'Data Science in Hyderabad', slug: 'data-science', city: 'hyderabad' },
              { label: 'UI/UX Design in Pune', slug: 'ui-ux-design', city: 'pune' },
              { label: 'DevOps in Noida', slug: 'devops-deployment', city: 'noida' },
              { label: 'Backend Engineering in Gurugram', slug: 'backend-engineering', city: 'gurugram' },
              { label: 'MERN Stack in Delhi', slug: 'mern-stack-development', city: 'delhi' },
              { label: 'Cloud Computing in Chennai', slug: 'cloud-computing', city: 'chennai' },
              { label: 'Python Dev in Kolkata', slug: 'python-development', city: 'kolkata' },
              { label: 'Digital Marketing in Ahmedabad', slug: 'digital-marketing', city: 'ahmedabad' },
              { label: 'Graphic Design in Jaipur', slug: 'graphic-designing', city: 'jaipur' },
              { label: 'Software Testing in Thane', slug: 'software-testing', city: 'thane' },
            ].map(combo => (
              <Link
                key={`${combo.slug}-${combo.city}`}
                href={`/courses/${combo.slug}/${combo.city}/`}
                className="glass rounded-xl p-4 border border-white/[0.06] hover:border-[#6366f1]/20 transition-all text-sm text-[#94a3b8] hover:text-white flex items-center gap-2"
              >
                <ChevronRight className="w-3.5 h-3.5 text-[#6366f1] shrink-0" />
                {combo.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 relative">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-10">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="space-y-4">
            {CITY_HUB_FAQS.map((faq, i) => (
              <div key={i} className="glass rounded-xl p-5 border border-white/[0.06]">
                <h3 className="text-sm font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
