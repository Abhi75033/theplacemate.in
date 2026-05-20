import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import TrustBanner from '@/components/TrustBanner'
import ProgramsSection from '@/components/ProgramsSection'
import CurriculumTimeline from '@/components/CurriculumTimeline'
import ProjectsSection from '@/components/ProjectsSection'
import InternshipSection from '@/components/InternshipSection'
import CertificatesSection from '@/components/CertificatesSection'
import PlacementSection from '@/components/PlacementSection'
import MentorsSection from '@/components/MentorsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CommunitySection from '@/components/CommunitySection'
import DesignSection from '@/components/DesignSection'
import GenAISection from '@/components/GenAISection'
import CTASection from '@/components/CTASection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import { faqSchema } from '@/lib/schemas'

const HOME_FAQS = [
  { q: 'Do I need prior coding experience to join?', a: 'No! Most of our programs are designed for absolute beginners. We start from zero and progressively build your skills. As long as you have curiosity and commitment, you\'re ready to start.' },
  { q: 'Is the internship certificate valid and recognized?', a: 'Yes. You receive a verified internship completion certificate from PlaceMate and optionally from our partner startups. These are real internship experiences with actual project work — not just participation certificates.' },
  { q: 'Are sessions live or pre-recorded?', a: 'We offer a hybrid model — live mentor sessions 3x per week for Q&A, code reviews, and standups, plus recorded module content you can learn at your own pace. All live sessions are also recorded for replay.' },
  { q: 'What kind of placement support do you provide?', a: 'We provide placement assistance — including resume reviews, LinkedIn optimization, mock interviews, portfolio feedback, and access to our hiring partner network for referrals.' },
  { q: 'Are there EMI or payment plan options?', a: 'Yes! We offer flexible EMI options starting from ₹3,000/month with 0% interest for qualifying students. We also offer need-based scholarships.' },
  { q: 'How long is each program?', a: 'Programs range from 8 to 16 weeks depending on the track. Full Stack Development and AI Engineering are 14–16 weeks, while Freelancing Accelerator and Graphic Design are 8–10 weeks.' },
  { q: 'Will I receive a certification?', a: 'Yes, you receive a PlaceMate program completion certificate, internship certificate, and project completion badges for each production app you ship.' },
  { q: 'What kind of projects will I actually build?', a: 'You\'ll build 5–8 production-grade projects including: AI SaaS dashboards, full-stack applications, chatbots, automation tools — all deployed live with real domains.' },
]

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }} />
      <Navbar />
      <HeroSection />
      <TrustBanner />
      <ProgramsSection />
      <CurriculumTimeline />
      <ProjectsSection />
      <InternshipSection />
      <CertificatesSection />
      <GenAISection />
      <DesignSection />
      <PlacementSection />
      <MentorsSection />
      <TestimonialsSection />
      <CommunitySection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  )
}
