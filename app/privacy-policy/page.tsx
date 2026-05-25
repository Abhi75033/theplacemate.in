import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Privacy Policy — PlaceMate',
  description: 'Read the PlaceMate Privacy Policy to understand how we collect, use, and protect your personal data in compliance with Indian IT Act and global data protection standards.',
  alternates: { canonical: 'https://www.theplacemate.in/privacy-policy/' },
  openGraph: {
    title: 'Privacy Policy | PlaceMate',
    description: 'How PlaceMate collects, uses, and protects your data.',
    url: 'https://www.theplacemate.in/privacy-policy/',
    siteName: 'PlaceMate',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.10),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Privacy Policy', href: '/privacy-policy/' }]} />
          <div className="mt-8">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">Privacy <span className="gradient-text">Policy</span></h1>
            <p className="text-sm text-[#64748b] mb-10">Last updated: 1 June 2025</p>

            <div className="prose prose-invert max-w-none space-y-8 text-[#94a3b8] text-sm leading-relaxed">

              <section>
                <h2 className="text-lg font-bold text-white mb-3">1. Introduction</h2>
                <p>PlaceMate (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the website <strong>www.theplacemate.in</strong>. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website or enroll in our training programs. By using our platform, you agree to the terms described in this policy.</p>
                <p className="mt-2">Our practices comply with the Information Technology Act, 2000, the Information Technology (Amendment) Act, 2008, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, as applicable in India.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">2. Information We Collect</h2>
                <p>We collect the following categories of information:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li><strong>Identity Data:</strong> Full name, email address, phone number, city, and educational background provided during registration or enquiry forms.</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device type, IP address, and referral source collected automatically through cookies and analytics tools.</li>
                  <li><strong>Communications Data:</strong> Messages sent through our contact form, WhatsApp, or email support channels.</li>
                  <li><strong>Payment Data:</strong> We do not store payment card details. Payments are processed via third-party gateways (Razorpay, Stripe) that maintain their own security certifications.</li>
                  <li><strong>Consent Records:</strong> When you opt-in to marketing communications, we record your consent timestamp and method.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">3. How We Use Your Information</h2>
                <p>We use your personal information to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Respond to enquiries and process enrolments into our programs</li>
                  <li>Deliver course materials, schedule sessions, and communicate program updates</li>
                  <li>Send placement support resources, job referrals, and career guidance with your consent</li>
                  <li>Improve website functionality and content through aggregated analytics</li>
                  <li>Comply with legal obligations and prevent fraudulent activity</li>
                  <li>Send transactional emails (enrolment confirmations, receipts, session reminders)</li>
                </ul>
                <p className="mt-2">We do not sell, rent, or trade your personal data to any third parties for marketing purposes.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">4. Cookies and Tracking</h2>
                <p>We use the following types of cookies:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li><strong>Strictly Necessary Cookies:</strong> Required for the website to function. Cannot be disabled.</li>
                  <li><strong>Analytics Cookies:</strong> Google Analytics 4 — helps us understand visitor behavior in aggregate. Data is anonymized.</li>
                  <li><strong>Marketing Cookies:</strong> Used only when you have given explicit consent for promotional communication.</li>
                </ul>
                <p className="mt-2">You can manage or delete cookies through your browser settings. Disabling analytics cookies will not affect website functionality.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">5. Data Retention</h2>
                <p>We retain your personal data for as long as necessary to provide services and meet legal requirements:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Enrolment and student records: 7 years from course completion (for certificate validation)</li>
                  <li>Enquiry and marketing data: 2 years from last interaction, or until you withdraw consent</li>
                  <li>Analytics data: 26 months (Google Analytics default)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                  <li><strong>Correction:</strong> Ask us to correct inaccurate or incomplete data</li>
                  <li><strong>Deletion:</strong> Request erasure of your data subject to legal retention requirements</li>
                  <li><strong>Objection:</strong> Object to processing for marketing purposes at any time</li>
                  <li><strong>Portability:</strong> Request your data in a structured, machine-readable format</li>
                </ul>
                <p className="mt-2">To exercise any of these rights, email us at <a href="mailto:hello@theplacemate.in" className="text-[#6366f1] hover:underline">hello@theplacemate.in</a>. We will respond within 30 days.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">7. Third-Party Services</h2>
                <p>We use the following third-party services that may process your data under their own privacy policies:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Google Analytics 4 (analytics)</li>
                  <li>Razorpay / Stripe (payment processing)</li>
                  <li>Vercel (website hosting)</li>
                  <li>WhatsApp Business API (communication)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">8. Security</h2>
                <p>We implement industry-standard security measures including HTTPS encryption, access controls, and secure data storage. While no online transmission is 100% secure, we are committed to protecting your information using reasonable commercial standards.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">9. Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically. We will notify you of material changes by posting a notice on our website or sending an email to registered users. Continued use of our services after such notice constitutes acceptance of the updated policy.</p>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-3">10. Contact Us</h2>
                <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact:</p>
                <div className="glass rounded-xl p-4 border border-white/[0.06] mt-3 inline-block">
                  <p><strong className="text-white">PlaceMate</strong></p>
                  <p>Email: <a href="mailto:hello@theplacemate.in" className="text-[#6366f1] hover:underline">hello@theplacemate.in</a></p>
                  <p>Phone: <a href="tel:+916394753801" className="text-[#6366f1] hover:underline">+91 63947 53801</a></p>
                  <p>Address: 12th Floor, Trade Tower, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India</p>
                </div>
              </section>

              <div className="pt-4 border-t border-white/[0.06]">
                <p className="text-xs text-[#475569]">Also see: <Link href="/terms/" className="text-[#6366f1] hover:underline">Terms of Service</Link> · <Link href="/contact/" className="text-[#6366f1] hover:underline">Contact Us</Link></p>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
