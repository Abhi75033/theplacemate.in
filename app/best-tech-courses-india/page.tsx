import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { faqSchema } from '@/lib/schemas'
import { Trophy, Star, MapPin, Clock, Users, IndianRupee } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Best Tech Courses in India 2025 — Top-Rated Programs with Placement | PlaceMate',
  description: 'Explore the best tech training courses in India for 2025. Compare Full Stack Development, AI, Data Science, UI/UX Design courses by salary outcomes, placement rates, and duration.',
  alternates: { canonical: 'https://www.theplacemate.in/best-tech-courses-india/' },
  openGraph: {
    title: 'Best Tech Courses in India 2025 | PlaceMate',
    description: 'Compare India\'s top-rated tech training programs — Full Stack, AI, Data Science, UI/UX, DevOps — with real placement data and salary outcomes.',
    url: 'https://www.theplacemate.in/best-tech-courses-india/',
    siteName: 'PlaceMate',
    images: [{ url: '/og-home.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'Best Tech Courses India 2025 | PlaceMate', description: 'Compare top tech training programs with real placement data.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const BEST_COURSES = [
  {
    rank: 1,
    title: 'Full Stack Web Development',
    slug: 'full-stack-web-development',
    icon: '🌐',
    color: '#6366f1',
    duration: '16 Weeks',
    salary: '₹5–18 LPA',
    rating: 4.9,
    reviews: 847,
    students: '620+',
    highlights: [
      'React, Next.js, Node.js, PostgreSQL',
      '5 production-grade projects',
      '4-week startup internship',
      '87% placement rate',
    ],
    why: 'Full Stack Development consistently tops India\'s IT hiring demand. In 2025, full stack roles are the most advertised on Naukri.com, LinkedIn India, and Instahyre. PlaceMate\'s 16-week program gets you production-ready with hands-on projects deployed on real infrastructure — not toy apps.',
    citySlugs: ['mumbai', 'bangalore', 'delhi', 'pune', 'hyderabad'],
  },
  {
    rank: 2,
    title: 'Generative AI & AI Engineering',
    slug: 'generative-ai-engineering',
    icon: '🤖',
    color: '#06b6d4',
    duration: '14 Weeks',
    salary: '₹8–28 LPA',
    rating: 4.9,
    reviews: 612,
    students: '340+',
    highlights: [
      'LangChain, RAG, Vector DBs, OpenAI API',
      'Build AI assistants and automation agents',
      'Hugging Face & fine-tuning',
      '82% placed in AI/ML roles',
    ],
    why: 'AI Engineering is the fastest-growing tech role in India in 2025. Every major company is hiring AI engineers to build copilots, automation pipelines, and intelligent search systems. This program is the most comprehensive AI Engineering cohort in India — covering LLMs, RAG architectures, and agentic workflows.',
    citySlugs: ['bangalore', 'hyderabad', 'noida', 'pune', 'mumbai'],
  },
  {
    rank: 3,
    title: 'Data Science & Machine Learning',
    slug: 'data-science',
    icon: '📊',
    color: '#10b981',
    duration: '16 Weeks',
    salary: '₹6–22 LPA',
    rating: 4.8,
    reviews: 723,
    students: '510+',
    highlights: [
      'Python, Pandas, Scikit-learn, TensorFlow',
      'End-to-end ML project pipelines',
      'SQL + BI dashboard skills included',
      '84% placement rate',
    ],
    why: 'Data Science remains one of the top 5 highest-paying tech roles in India. The program covers the full data pipeline — from SQL querying and data cleaning to model building and production deployment — equipping students for roles at analytics firms, BFSI companies, and product startups.',
    citySlugs: ['hyderabad', 'bangalore', 'pune', 'delhi', 'chennai'],
  },
  {
    rank: 4,
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    icon: '🎨',
    color: '#ec4899',
    duration: '12 Weeks',
    salary: '₹4–14 LPA',
    rating: 4.8,
    reviews: 534,
    students: '280+',
    highlights: [
      'Figma, design systems, user research',
      '4 client-brief capstone projects',
      'Portfolio published on Behance & Dribbble',
      '80% placed as UX/Product Designers',
    ],
    why: 'As India\'s product and SaaS industry matures, the demand for skilled UX designers has skyrocketed. Companies are no longer satisfied with just developers — they need designers who understand user psychology and system design. This program bridges that gap with real client project exposure.',
    citySlugs: ['mumbai', 'bangalore', 'pune', 'delhi', 'gurugram'],
  },
  {
    rank: 5,
    title: 'DevOps & Cloud Computing',
    slug: 'devops-deployment',
    icon: '⚙️',
    color: '#f59e0b',
    duration: '10 Weeks',
    salary: '₹7–20 LPA',
    rating: 4.8,
    reviews: 418,
    students: '210+',
    highlights: [
      'Docker, Kubernetes, AWS, GitHub Actions',
      'CI/CD pipeline implementation',
      'Infrastructure as Code (Terraform)',
      '83% placed as DevOps / Cloud Engineers',
    ],
    why: 'Cloud and DevOps skills command a 40–60% salary premium over standard developer roles. As India\'s IT services and product firms move to cloud-native architectures, there is a critical shortage of DevOps engineers. This program produces job-ready engineers in just 10 weeks.',
    citySlugs: ['bangalore', 'noida', 'gurugram', 'hyderabad', 'mumbai'],
  },
  {
    rank: 6,
    title: 'Backend Engineering',
    slug: 'backend-engineering',
    icon: '🖥️',
    color: '#8b5cf6',
    duration: '12 Weeks',
    salary: '₹6–18 LPA',
    rating: 4.8,
    reviews: 389,
    students: '190+',
    highlights: [
      'Node.js, Go, PostgreSQL, Redis, Docker',
      'Microservices and system design',
      'API rate limiting, caching, message queues',
      '81% placed in backend roles',
    ],
    why: 'Backend roles are the backbone of every tech product. This program is specifically designed for students who want to specialize in server-side engineering — covering system design principles that are tested in interviews at companies like Razorpay, Zerodha, Swiggy, and Meesho.',
    citySlugs: ['bangalore', 'pune', 'hyderabad', 'noida', 'mumbai'],
  },
  {
    rank: 7,
    title: 'AI Automation',
    slug: 'ai-automation',
    icon: '⚡',
    color: '#06b6d4',
    duration: '8 Weeks',
    salary: '₹3–12 LPA',
    rating: 4.7,
    reviews: 312,
    students: '250+',
    highlights: [
      'Make.com, n8n, Zapier, ChatGPT API',
      'No-code / low-code automation',
      'Build AI chatbots and workflows',
      '75% placed or freelancing at ₹50k+/month',
    ],
    why: 'AI Automation is the fastest way to become a high-income freelancer or automation consultant without deep coding knowledge. Businesses across India are paying ₹30,000–₹1,50,000/month for professionals who can set up automated workflows using tools like Make.com and n8n.',
    citySlugs: ['mumbai', 'delhi', 'ahmedabad', 'jaipur', 'pune'],
  },
  {
    rank: 8,
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: '📱',
    color: '#f97316',
    duration: '10 Weeks',
    salary: '₹3–10 LPA',
    rating: 4.7,
    reviews: 445,
    students: '480+',
    highlights: [
      'SEO, SEM, Meta Ads, Google Ads, Analytics',
      'Content marketing and influencer strategy',
      'Growth hacking for startups',
      '78% placed in marketing roles',
    ],
    why: 'Digital Marketing is one of the most accessible entry points into the tech industry and one of the highest ROI skills for small businesses. This program covers paid advertising, organic SEO, content strategy, and performance analytics — skills every company needs in 2025.',
    citySlugs: ['mumbai', 'delhi', 'pune', 'ahmedabad', 'jaipur'],
  },
  {
    rank: 9,
    title: 'Graphic Designing',
    slug: 'graphic-designing',
    icon: '🖌️',
    color: '#ec4899',
    duration: '8 Weeks',
    salary: '₹2.5–8 LPA',
    rating: 4.7,
    reviews: 328,
    students: '360+',
    highlights: [
      'Adobe Photoshop, Illustrator, InDesign',
      'Brand identity and packaging design',
      'Social media content creation',
      '72% placed or freelancing',
    ],
    why: 'Graphic Design is a perennially high-demand skill as India\'s digital economy grows. From social media to product packaging, every brand needs visual designers. This program is ideal for creative students seeking a structured path into the design industry.',
    citySlugs: ['mumbai', 'delhi', 'jaipur', 'chandigarh', 'ahmedabad'],
  },
  {
    rank: 10,
    title: 'Freelancing Accelerator',
    slug: 'freelancing-accelerator',
    icon: '💼',
    color: '#f59e0b',
    duration: '8 Weeks',
    salary: '₹3–15 LPA (freelance)',
    rating: 4.7,
    reviews: 267,
    students: '310+',
    highlights: [
      'Upwork, Fiverr, LinkedIn strategy',
      'High-ticket proposal writing',
      'Personal brand building',
      '68% earning ₹50k+/month after 3 months',
    ],
    why: 'Freelancing is the fastest way to earn without being dependent on a single employer. This program compresses years of trial and error into 8 weeks — teaching how to find clients, set premium rates, and build a recurring freelance income on platforms like Upwork and Fiverr.',
    citySlugs: ['mumbai', 'delhi', 'bangalore', 'pune', 'hyderabad'],
  },
]

const FAQS = [
  {
    q: 'Which is the best tech course in India in 2025?',
    a: 'The best tech course in India in 2025 depends on your goal. For highest salary: Generative AI & AI Engineering (₹8–28 LPA). For easiest entry: Full Stack Web Development (₹5–18 LPA). For creative careers: UI/UX Design (₹4–14 LPA). For infrastructure roles: DevOps & Cloud Computing (₹7–20 LPA). All of these programs are available at PlaceMate with placement support.',
  },
  {
    q: 'Which PlaceMate course has the highest placement rate?',
    a: 'Full Stack Web Development has the highest placement rate at PlaceMate (87%), followed by Data Science (84%), DevOps (83%), and AI Engineering (82%). All programs include placement support with mock interviews, resume building, and direct hiring partner referrals.',
  },
  {
    q: 'What is the average salary after completing a PlaceMate course?',
    a: 'Average starting salaries vary by program. Full Stack graduates average ₹6–8 LPA. AI Engineering graduates average ₹9–12 LPA. Data Science graduates average ₹7–10 LPA. DevOps engineers average ₹9–14 LPA. These figures are based on 2024 placement outcomes from PlaceMate graduates.',
  },
  {
    q: 'Can I get a job after a short-term tech course?',
    a: 'Yes. PlaceMate\'s 8–16 week programs are specifically designed to make you job-ready. Our 2024 batch reported 85% of graduates secured interviews within 60 days of completion, and 72% received job offers within 90 days. The key is the combination of real projects, internship experience, and active placement support.',
  },
  {
    q: 'Are these courses available online?',
    a: 'Yes. All PlaceMate programs are available online as live cohorts. Sessions are conducted live on weekday evenings and weekends, making them accessible from any city in India. Session recordings are shared after each class. You can attend from Mumbai, Bangalore, Delhi, Pune, Hyderabad, or any other city.',
  },
  {
    q: 'Does PlaceMate offer EMI options?',
    a: 'Yes. PlaceMate offers 0% interest EMI plans of 3, 6, and 12 months through partner financial institutions. Income Share Agreement (ISA) options are also available for selected programs where fees are paid after placement.',
  },
]

const cityNames: Record<string, string> = {
  mumbai: 'Mumbai', bangalore: 'Bangalore', delhi: 'Delhi', pune: 'Pune',
  hyderabad: 'Hyderabad', noida: 'Noida', gurugram: 'Gurugram', chennai: 'Chennai',
  ahmedabad: 'Ahmedabad', jaipur: 'Jaipur', chandigarh: 'Chandigarh', kolkata: 'Kolkata',
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Tech Courses in India 2025 — Top-Rated Programs with Placement',
  description: 'Comprehensive guide to the best tech training courses in India in 2025, comparing Full Stack Development, AI, Data Science, and more based on placement rates and salary data.',
  author: { '@type': 'Organization', name: 'PlaceMate', url: 'https://www.theplacemate.in/' },
  publisher: { '@type': 'Organization', name: 'PlaceMate', url: 'https://www.theplacemate.in/', logo: { '@type': 'ImageObject', url: 'https://www.theplacemate.in/logo.png' } },
  datePublished: '2025-01-15',
  dateModified: '2025-06-01',
  mainEntityOfPage: 'https://www.theplacemate.in/best-tech-courses-india/',
}

export default function BestTechCoursesPage() {
  return (
    <main>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Best Tech Courses in India 2025', href: '/best-tech-courses-india/' }]} />
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-[#f59e0b]" />
              <span className="text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">2025 Rankings</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Best Tech Courses in <span className="gradient-text">India 2025</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-3xl leading-relaxed mb-6">
              Choosing the right tech course can be the difference between landing a ₹5 LPA job and a ₹18 LPA role. We ranked PlaceMate&apos;s top 10 programs based on <strong className="text-white">placement rates</strong>, <strong className="text-white">salary outcomes</strong>, <strong className="text-white">student reviews</strong>, and <strong className="text-white">2025 job market demand</strong>.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-[#64748b]">
              <span>📅 Last updated: June 2025</span>
              <span>👥 Based on 2,800+ student outcomes</span>
              <span>🏢 80+ hiring partner data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Rankings */}
      <section className="py-8 relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {BEST_COURSES.map((course) => (
              <div key={course.slug} className="glass rounded-2xl border border-white/[0.06] overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-white/[0.04]">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-black border" style={{ borderColor: `${course.color}40`, background: `${course.color}12`, color: course.color }}>
                      #{course.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <span className="text-2xl">{course.icon}</span>
                        <h2 className="text-xl font-black text-white">{course.title}</h2>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#64748b] flex-wrap mt-2">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                        <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{course.salary} avg salary</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students} students trained</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{course.rating} ({course.reviews} reviews)</span>
                      </div>
                    </div>
                    <Link href={`/courses/${course.slug}/`} className="btn-primary text-sm hidden sm:inline-flex items-center gap-2 shrink-0">
                      View Course
                    </Link>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Why it&apos;s top-ranked in 2025</h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{course.why}</p>
                    <Link href={`/courses/${course.slug}/`} className="mt-4 btn-primary text-sm inline-flex items-center gap-2 sm:hidden">
                      View Course
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Key highlights</h3>
                    <ul className="space-y-2">
                      {course.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                          <span className="text-[#6366f1] mt-0.5">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <p className="text-xs text-[#475569] mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" />Available in:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {course.citySlugs.map(citySlug => (
                          <Link key={citySlug} href={`/courses/${course.slug}/${citySlug}/`}
                            className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.08] text-[#64748b] hover:text-white hover:border-white/20 transition-all">
                            {cityNames[citySlug] || citySlug}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-[#0a0a12] relative overflow-x-auto">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white mb-8">Quick <span className="gradient-text">Comparison</span> Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 pr-6 text-[#64748b] font-medium whitespace-nowrap">Course</th>
                  <th className="text-left py-3 px-4 text-[#64748b] font-medium whitespace-nowrap">Duration</th>
                  <th className="text-left py-3 px-4 text-[#64748b] font-medium whitespace-nowrap">Avg Salary</th>
                  <th className="text-left py-3 px-4 text-[#64748b] font-medium whitespace-nowrap">Placement Rate</th>
                  <th className="text-left py-3 px-4 text-[#64748b] font-medium whitespace-nowrap">Rating</th>
                </tr>
              </thead>
              <tbody>
                {BEST_COURSES.slice(0, 8).map((c) => (
                  <tr key={c.slug} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-6 font-semibold text-white whitespace-nowrap">
                      <Link href={`/courses/${c.slug}/`} className="hover:text-[#6366f1] transition-colors">
                        {c.icon} {c.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-[#94a3b8] whitespace-nowrap">{c.duration}</td>
                    <td className="py-3 px-4 text-[#10b981] whitespace-nowrap font-medium">{c.salary}</td>
                    <td className="py-3 px-4 text-[#94a3b8] whitespace-nowrap">{c.highlights[3]?.split('%')[0]}%</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="flex items-center gap-1 text-yellow-400"><Star className="w-3 h-3 fill-yellow-400" />{c.rating}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 relative">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white text-center mb-10">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass rounded-xl p-5 border border-white/[0.06]">
                <h3 className="text-sm font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a12] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.10),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Ready to start your <span className="gradient-text">tech career?</span></h2>
          <p className="text-[#94a3b8] mb-8">Talk to a PlaceMate career counselor — free 30-minute session. We&apos;ll help you pick the right course for your goals and city job market.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/courses/" className="btn-primary inline-flex items-center gap-2">Browse All Courses</Link>
            <Link href="/contact/" className="btn-secondary inline-flex items-center gap-2">Free Career Counseling</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
