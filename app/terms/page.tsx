import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Terms of Service — PlaceMate',
  description: 'Read PlaceMate\'s Terms of Service governing use of our training platform, courses, internship programs, and placement support services.',
  alternates: { canonical: 'https://www.theplacemate.in/terms/' },
  openGraph: {
    title: 'Terms of Service | PlaceMate',
    description: 'Terms governing use of PlaceMate training and internship programs.',
    url: 'https://www.theplacemate.in/terms/',
    siteName: 'PlaceMate',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.10),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Terms of Service', href: '/terms/' }]} />
          <div className="mt-8">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">Terms of <span className="gradient-text">Service</span></h1>
            <p className="text-sm text-[#64748b] mb-10">Last updated: 1 June 2025</p>

            <div className="prose prose-invert max-w-none space-y-8 text-[#94a3b8] text-sm leading-relaxed">

              <section>
                <h2 className="text-lg font-bold text-white mb-3">1. Acceptance of Terms</h2>
                <p>By accessing or using the PlaceMate website at <strong>www.theplacemate.in</strong>, enrolling in any of our training programs, or using any PlaceMate services, you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree with any part of these Terms, you may not use our services.</p>
                <p className="mt-2">These Terms constitute a legally binding agreement between you and PlaceMate. These Terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">2. Eligibility</h2>
                <p>To enroll in PlaceMate programs, you must:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Be at least 18 years of age, or have parental/guardian consent if between 16-18</li>
                  <li>Provide accurate, complete, and current registration information</li>
                  <li>Have access to a computer or device with internet connectivity</li>
                  <li>Not be barred from receiving services under applicable law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">3. Program Enrollment and Fees</h2>
                <p><strong className="text-white">Enrollment:</strong> Enrollment in a program is confirmed only upon receipt of payment or execution of an EMI agreement. PlaceMate reserves the right to accept or decline any enrollment at its sole discretion.</p>
                <p className="mt-2"><strong className="text-white">Fees:</strong> All program fees are listed in Indian Rupees (INR). Fees are subject to change. The price at the time of enrollment confirmation is binding for that cohort. GST is applicable as per prevailing Indian tax law.</p>
                <p className="mt-2"><strong className="text-white">EMI Plans:</strong> EMI options are provided through third-party financial partners. PlaceMate does not directly extend credit. Defaults on EMI payments may result in suspension of access to program materials.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">4. Refund Policy</h2>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li><strong>Within 7 days of enrollment:</strong> Full refund minus processing fees, if you have not attended more than 2 live sessions.</li>
                  <li><strong>After 7 days but before 25% of program completion:</strong> 50% refund of the program fee.</li>
                  <li><strong>After 25% program completion:</strong> No refund. However, you may transfer enrollment to the next cohort once at no additional charge.</li>
                  <li><strong>Internship phase:</strong> No refunds once the internship placement has been facilitated.</li>
                </ul>
                <p className="mt-2">To request a refund, email <a href="mailto:hello@theplacemate.in" className="text-[#6366f1] hover:underline">hello@theplacemate.in</a> with your enrollment details. Refunds are processed within 10 business days.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">5. Program Delivery and Access</h2>
                <p>PlaceMate delivers programs through live online sessions, recorded content, and project-based assignments. We reserve the right to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Modify program schedules with reasonable notice (minimum 48 hours for session changes)</li>
                  <li>Update curriculum content to reflect current industry practices</li>
                  <li>Replace individual mentors while maintaining program quality standards</li>
                  <li>Temporarily suspend live sessions for unforeseen circumstances (public holidays, technical issues)</li>
                </ul>
                <p className="mt-2">Program access (recorded content, materials) remains available for 6 months after your cohort completion date.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">6. Certificates and Credentials</h2>
                <p>PlaceMate issues program completion certificates and internship certificates to students who:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Complete at least 80% of the program curriculum and assignments</li>
                  <li>Successfully deliver the required capstone project(s)</li>
                  <li>Complete the designated internship phase (for internship certificates)</li>
                  <li>Have no outstanding payment obligations</li>
                </ul>
                <p className="mt-2">Certificates are issued digitally via email. Physical copies are not provided by default. Certificate issuance typically takes 7-14 business days after program completion.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">7. Placement Assistance</h2>
                <p>PlaceMate provides placement <em>assistance</em> — not guaranteed placement. Our placement support includes resume review, mock interviews, and referral network access. Placement outcomes depend on individual student performance, market conditions, and employer requirements.</p>
                <p className="mt-2">PlaceMate does not guarantee employment, specific salary packages, or job offers. Published placement statistics represent past outcomes and are not guarantees of future results.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">8. Student Conduct</h2>
                <p>Students must:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Treat mentors, staff, and fellow students with respect in all interactions</li>
                  <li>Not share login credentials, session recordings, or course materials with non-enrolled individuals</li>
                  <li>Not use AI tools to submit others&apos; work as their own in assignments</li>
                  <li>Maintain professional conduct during internship placements</li>
                  <li>Not engage in harassment, discrimination, or abusive behavior</li>
                </ul>
                <p className="mt-2">Violation of these conduct standards may result in immediate enrollment termination without refund.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">9. Intellectual Property</h2>
                <p>All curriculum materials, session recordings, design templates, and content produced by PlaceMate are the exclusive intellectual property of PlaceMate. Students are granted a personal, non-transferable license to use these materials for their own learning during and after the program.</p>
                <p className="mt-2">Projects created by students during programs belong to the student, unless explicitly developed as part of a partner company&apos;s codebase during the internship phase, in which case the partner company&apos;s IP terms apply.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">10. Limitation of Liability</h2>
                <p>To the maximum extent permitted by applicable Indian law, PlaceMate&apos;s total liability to you for any claim arising from or related to these Terms or our services shall not exceed the total fees paid by you to PlaceMate in the 12 months preceding the claim.</p>
                <p className="mt-2">PlaceMate is not liable for indirect, incidental, special, or consequential damages including loss of employment opportunity, loss of income, or career outcome claims.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">11. Changes to Terms</h2>
                <p>PlaceMate reserves the right to modify these Terms at any time. We will notify enrolled students of material changes via email or website notice with at least 14 days advance notice. Continued enrollment or use of services after such notice constitutes acceptance of updated Terms.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">12. Contact and Grievances</h2>
                <p>For any questions, grievances, or disputes related to these Terms, please contact our Grievance Officer:</p>
                <div className="glass rounded-xl p-4 border border-white/[0.06] mt-3 inline-block">
                  <p><strong className="text-white">PlaceMate Grievance Officer</strong></p>
                  <p>Email: <a href="mailto:hello@theplacemate.in" className="text-[#6366f1] hover:underline">hello@theplacemate.in</a></p>
                  <p>Phone: <a href="tel:+916394753801" className="text-[#6366f1] hover:underline">+91 63947 53801</a></p>
                  <p>Response time: Within 30 days of receiving the grievance</p>
                  <p>Address: 12th Floor, Trade Tower, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India</p>
                </div>
              </section>

              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-xs text-[#475569]">Also see: <Link href="/privacy-policy/" className="text-[#6366f1] hover:underline">Privacy Policy</Link> · <Link href="/contact/" className="text-[#6366f1] hover:underline">Contact Us</Link> · <Link href="/courses/" className="text-[#6366f1] hover:underline">All Programs</Link></p>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
