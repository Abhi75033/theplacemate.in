import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'About PlaceMate — Our Mission, Vision & Training Approach',
  description: 'PlaceMate is an industry-focused training and internship platform helping students, freshers, and professionals build real skills with expert mentorship and placement support.',
  alternates: { canonical: 'https://www.theplacemate.in/about/' },
  openGraph: {
    title: 'About PlaceMate — Our Mission & Training Approach',
    description: 'Learn about PlaceMate\'s mission to bridge the gap between education and employment through hands-on training, real internships, and career support.',
    url: 'https://www.theplacemate.in/about/',
    siteName: 'PlaceMate',
    images: [{ url: '/og-about.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'About PlaceMate', description: 'Industry-focused training with real internships and placement support.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const VALUES = [
  { icon: '🎯', title: 'Industry-First Curriculum', desc: 'Every module is designed with input from hiring managers and senior engineers at top tech companies. We teach what the industry actually needs, not outdated textbook theory.' },
  { icon: '🛠️', title: 'Learn by Building', desc: 'Students complete 5 to 8 production-grade projects during each program. These are deployed, live applications — not toy projects that sit in a GitHub graveyard.' },
  { icon: '🤝', title: 'Real Internship Experience', desc: 'Every program includes a structured internship phase where students work on actual company projects with deadlines, code reviews, and team collaboration.' },
  { icon: '📈', title: 'Career Support System', desc: 'From resume building and LinkedIn optimization to mock interviews and referral networks, we provide end-to-end career support that continues after graduation.' },
]

const STATS = [
  { value: '2,800+', label: 'Students Trained' },
  { value: '500+', label: 'Projects Deployed' },
  { value: '80+', label: 'Hiring Partners' },
  { value: '8', label: 'Specialized Programs' },
  { value: '85%', label: 'Interview Rate in 60 Days' },
  { value: '3.2x', label: 'Avg Salary Growth' },
]

const TEAM = [
  { name: 'Industry Mentors', count: '25+', desc: 'Working professionals from companies like Razorpay, Swiggy, Zerodha, and TCS who bring real-world perspective to every session.' },
  { name: 'Career Coaches', count: '10+', desc: 'Dedicated career advisors who help students with resume reviews, interview preparation, and job search strategies.' },
  { name: 'Curriculum Advisors', count: '8', desc: 'Senior engineers and hiring managers who review and update our curriculum quarterly to match current industry demands.' },
]

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'About', href: '/about' }]} />

          <div className="mt-8 text-center">
            <span className="tag mb-4 inline-flex">About PlaceMate</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Bridging Education <span className="gradient-text">& Employment</span>
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed mb-4">
              PlaceMate was founded with a clear mission: to eliminate the gap between what colleges teach and what companies actually hire for. We are a training and internship platform built for students, freshers, and working professionals who want to gain real, employable skills — not just certificates.
            </p>
            <p className="text-base text-[#64748b] max-w-3xl mx-auto leading-relaxed">
              Based in India and serving learners globally, PlaceMate combines expert-led instruction, hands-on project work, structured internship experience, and comprehensive placement support into cohort-based programs that produce job-ready professionals. Our graduates work at startups, mid-size product companies, and large enterprises across the technology sector.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0a0a12] relative">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-5 text-center border border-white/[0.06]">
                <div className="text-2xl sm:text-3xl font-black gradient-text mb-1">{s.value}</div>
                <div className="text-xs text-[#94a3b8]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              What makes PlaceMate <span className="gradient-text">different</span>
            </h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto">
              We focus on outcomes, not just content delivery. Every aspect of our platform is designed to get you hired.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-[#6366f1]/20 transition-all card-hover">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-[#6366f1]/10 border border-[#6366f1]/20">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="section-padding bg-[#0a0a12] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Our <span className="gradient-text">approach</span>
            </h2>
          </div>
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
              <h3 className="text-xl font-bold text-white mb-3">Cohort-Based Learning</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Every program runs as a structured cohort with fixed timelines, peer groups, and accountability systems. Students progress together through curriculum modules, project milestones, and internship phases. This creates a collaborative learning environment where peers push each other forward and mentors can provide focused attention. Each cohort is capped at 40 students to maintain quality of instruction and mentorship.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
              <h3 className="text-xl font-bold text-white mb-3">Industry Mentor Network</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                Our mentors are not career instructors — they are working professionals at technology companies who bring current industry context to every session. They conduct live code reviews, architecture discussions, and mock interviews based on actual hiring processes at their companies. This direct exposure to how real engineering and design teams operate gives PlaceMate students a significant advantage during job applications and interviews.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.06]">
              <h3 className="text-xl font-bold text-white mb-3">Structured Internship Phase</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                The final phase of every program involves working on real projects for partner companies or internal startup projects. Students experience actual development workflows — agile sprints, pull request reviews, deployment pipelines, and stakeholder presentations. This internship experience, documented with verifiable certificates, bridges the experience gap that most fresh graduates struggle with during their job search.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Our <span className="gradient-text">team</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {TEAM.map((t, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/[0.06] text-center">
                <div className="text-3xl font-black gradient-text mb-2">{t.count}</div>
                <h3 className="text-lg font-bold text-white mb-2">{t.name}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a12] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(99,102,241,0.08),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Ready to start your <span className="gradient-text">journey?</span>
          </h2>
          <p className="text-[#94a3b8] mb-8">Explore our programs and find the right fit for your career goals.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/courses" className="btn-primary inline-flex items-center gap-2 relative z-10">
              <span className="relative z-10">Explore Programs</span>
            </Link>
            <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
