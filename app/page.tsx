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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "PlaceMate",
  "url": "https://www.theplacemate.in",
  "logo": "https://www.theplacemate.in/images/theplacemate-logo-icon.png",
  "description": "PlaceMate offers industry-focused cohort training programs in Full Stack Development, AI Engineering, UI/UX Design, DevOps, and more with real internships and placement support across India.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12th Floor, Trade Tower, Bandra Kurla Complex",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400051",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@theplacemate.in",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/theplacemate",
    "https://www.instagram.com/theplacemate",
    "https://twitter.com/theplacemate"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tech Training Programs",
    "itemListElement": [
      {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Full Stack Web Development"}},
      {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Generative AI & AI Engineering"}},
      {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "UI/UX Design"}},
      {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "DevOps & Deployment"}},
      {"@type": "Offer", "itemOffered": {"@type": "Course", "name": "Backend Engineering"}}
    ]
  }
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do I need prior coding experience to join PlaceMate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No prior coding experience is required. PlaceMate programs are designed for beginners and take you from zero to industry-ready through structured cohort training."
      }
    },
    {
      "@type": "Question",
      "name": "Is the internship certificate from PlaceMate valid and recognized?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. PlaceMate internship certificates are issued after completing real startup projects and are recognized by 80+ hiring partners across India."
      }
    },
    {
      "@type": "Question",
      "name": "Are PlaceMate sessions live or pre-recorded?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PlaceMate primarily offers live cohort-based sessions with daily standups, code reviews, and mentor 1:1s. Recordings are available for enrolled students."
      }
    },
    {
      "@type": "Question",
      "name": "What placement support does PlaceMate provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "PlaceMate provides ATS-optimized resume building, LinkedIn optimization, 5+ mock interviews, portfolio review, DSA prep, and direct referrals to 80+ hiring partners."
      }
    },
    {
      "@type": "Question",
      "name": "Does PlaceMate offer EMI or payment plan options?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, EMI and flexible payment plan options are available for all PlaceMate programs. Apply free and discuss payment options during counseling."
      }
    },
    {
      "@type": "Question",
      "name": "How long are PlaceMate training programs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Programs range from 8 to 16 weeks depending on the track. Full Stack is 16 weeks, AI Engineering is 14 weeks, and shorter tracks like Freelancing Accelerator are 8 weeks."
      }
    }
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PlaceMate",
  "url": "https://www.theplacemate.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.theplacemate.in/courses/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
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
