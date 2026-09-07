import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Placement Records & Success Stories — PlaceMate Results',
  description: 'See PlaceMate placement results, student success stories, and career outcomes. 85% of graduates land interviews within 60 days with an average 3.2x salary growth after completing our programs.',
  alternates: { canonical: 'https://www.theplacemate.in/placements/' },
  openGraph: {
    title: 'Placement Records & Success Stories | PlaceMate',
    description: 'Real placement results from PlaceMate graduates. Career transformations with verifiable outcomes.',
    url: 'https://www.theplacemate.in/placements/',
    siteName: 'PlaceMate',
    images: [{ url: '/og-placements.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'PlaceMate Placements', description: 'Real student success stories and placement outcomes.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const OUTCOMES = [
  { value: '85%', label: 'Land interviews within 60 days of completing the program' },
  { value: '3.2x', label: 'Average salary jump compared to pre-program earnings' },
  { value: '80+', label: 'Hiring partners actively recruiting from our network' },
  { value: '500+', label: 'Student portfolios deployed with live production URLs' },
]

const STORIES = [
  { name: 'Aarav Shah', role: 'Full Stack Engineer', company: 'Razorpay', program: 'Full Stack Web Development', salary: '₹18 LPA', city: 'Mumbai', avatar: 'AS', color: '#6366f1', quote: 'The program gave me production experience that my CS degree never could. I shipped 6 apps during the cohort, and the internship phase connected me directly with my current employer. The mock interviews prepared me for every question I faced.' },
  { name: 'Preethi Rao', role: 'UI/UX Designer', company: 'Swiggy', program: 'UI/UX Design', salary: '₹14 LPA', city: 'Bangalore', avatar: 'PR', color: '#ec4899', quote: 'Coming from an arts background, I had zero tech exposure. The mentors helped me build 12 case studies, and my portfolio was strong enough to land interviews at three top startups. I received an offer before the cohort ended.' },
  { name: 'Karan Mehta', role: 'AI Engineer', company: 'AI Startup', program: 'Generative AI & AI Engineering', salary: '₹22 LPA', city: 'Delhi', avatar: 'KM', color: '#06b6d4', quote: 'Building actual RAG pipelines and deploying AI products during the program made all the difference. The mentors from industry provided feedback that textbooks never cover. I now lead AI product development at my company.' },
  { name: 'Simran Kaur', role: 'DevOps Engineer', company: 'TCS', program: 'DevOps & Deployment', salary: '₹16 LPA', city: 'Pune', avatar: 'SK', color: '#10b981', quote: 'Transitioning from IT support to DevOps felt impossible until I joined PlaceMate. The hands-on labs with Docker, Kubernetes, and AWS gave me confidence. The career coaching team helped me negotiate a package I never expected.' },
  { name: 'Rohan Deshmukh', role: 'Backend Developer', company: 'Zerodha', program: 'Backend Engineering', salary: '₹20 LPA', city: 'Hyderabad', avatar: 'RD', color: '#8b5cf6', quote: 'The system design modules and real deployment projects set this program apart. I built a production API serving 10K requests per minute during my internship. That project alone carried my entire interview process at three companies.' },
  { name: 'Ananya Sharma', role: 'Freelance Designer', company: 'Self-employed', program: 'Graphic Designing', salary: '₹8L/year freelancing', city: 'Jaipur', avatar: 'AS', color: '#f59e0b', quote: 'Within two months of completing the program, I had three recurring clients and was earning more than my previous full-time job. The portfolio building sessions and client pitching practice were exactly what I needed to start freelancing confidently.' },
]

const SUPPORT_STEPS = [
  { title: 'Resume Building', desc: 'ATS-optimized resume crafted with expert feedback targeting specific roles and companies in your skill domain.' },
  { title: 'LinkedIn Optimization', desc: 'Profile headline, summary, and skills section optimized for recruiter visibility and relevant keyword matching.' },
  { title: 'Mock Interviews', desc: 'Five or more rounds of technical and behavioral mock interviews with detailed performance feedback and improvement plans.' },
  { title: 'Portfolio Review', desc: 'Project presentations reviewed for technical depth, visual quality, and recruiter impact by industry professionals.' },
  { title: 'Referral Network', desc: 'Direct access to our hiring partner network for referrals, job openings, and fast-track interview opportunities.' },
  { title: 'DSA & System Design Prep', desc: 'Structured preparation for technical interview rounds covering data structures, algorithms, and system design patterns.' },
]

export default function PlacementsPage() {
  const placementSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "PlaceMate Student Placements 2025",
    "description": "Verified placement results of PlaceMate graduates at top Indian companies.",
    "itemListElement": STORIES.map((s, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Person",
        "name": s.name,
        "jobTitle": s.role,
        "worksFor": {
          "@type": "Organization",
          "name": s.company
        },
        "description": `Placed at ${s.company} with ${s.salary} package after completing PlaceMate ${s.program} cohort`
      }
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placementSchema) }}
      />
      <Navbar />
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.12),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Placements', href: '/placements' }]} />
          <div className="mt-8 text-center">
            <span className="tag mb-4 inline-flex">Placement Records</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
              Real results, <span className="gradient-text">real careers</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto">
              PlaceMate provides structured placement assistance — not empty guarantees. Our approach combines resume preparation, interview coaching, portfolio development, and access to our hiring partner network to help graduates land roles that match their skills and ambitions.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 bg-[#0a0a12] relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OUTCOMES.map((o, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center border border-white/[0.06]">
                <div className="text-3xl font-black gradient-text mb-2">{o.value}</div>
                <div className="text-xs text-[#94a3b8]">{o.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-12">Student <span className="gradient-text">success stories</span></h2>
          <div className="grid md:grid-cols-2 gap-5">
            {STORIES.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/[0.06] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)` }} />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)` }}>{s.avatar}</div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white">{s.name}</div>
                    <div className="text-xs text-[#64748b]">{s.role} @ {s.company} · {s.city}</div>
                  </div>
                  <div className="text-sm font-bold" style={{ color: s.color }}>{s.salary}</div>
                </div>
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-3 italic">&ldquo;{s.quote}&rdquo;</p>
                <div className="text-xs text-[#64748b]">Program: {s.program}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Steps */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-12">Our placement <span className="gradient-text">support process</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SUPPORT_STEPS.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/[0.06]">
                <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center text-sm font-bold text-[#6366f1] mb-3">{i + 1}</div>
                <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(99,102,241,0.08),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Start your <span className="gradient-text">career transformation</span></h2>
          <p className="text-[#94a3b8] mb-8">Explore our programs and take the first step toward your new career.</p>
          <Link href="/courses" className="btn-primary inline-flex items-center gap-2 relative z-10">
            <span className="relative z-10">Explore Programs</span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
