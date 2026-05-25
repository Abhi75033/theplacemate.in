import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import FloatingContactForm from '@/components/FloatingContactForm'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.theplacemate.in'),
  title: {
    default: 'PlaceMate — Industry-Focused Training & Internship Platform',
    template: '%s | PlaceMate',
  },
  description:
    'PlaceMate offers expert-led training programs in Full Stack Development, AI, UI/UX Design, DevOps & more with real internships and placement support across India.',
  keywords: [
    'PlaceMate',
    'tech training',
    'internship platform',
    'full stack development course',
    'AI engineering course',
    'placement support',
    'coding bootcamp India',
    'online training with placement',
  ],
  authors: [{ name: 'PlaceMate', url: 'https://www.theplacemate.in/' }],
  creator: 'PlaceMate',
  publisher: 'PlaceMate',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'PlaceMate — Industry-Focused Training & Internship Platform',
    description:
      'Expert-led training with real projects, internships, and placement support. Full Stack, AI, UI/UX, DevOps & more.',
    type: 'website',
    url: 'https://www.theplacemate.in/',
    siteName: 'PlaceMate',
    locale: 'en_IN',
    images: [
      {
        url: '/images/theplacemate-logo.png',
        width: 1200,
        height: 630,
        alt: 'ThePlaceMate — Training & Internship Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlaceMate — Industry-Focused Training & Internships',
    description:
      'Expert-led cohort programs with real projects, internships, and placement support.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/images/theplacemate-logo.png',
  },
  verification: {
    // TODO: Replace with your actual Google Search Console verification code
    // Go to https://search.google.com/search-console → Add Property → HTML tag method
    google: 'PASTE_YOUR_CODE_HERE',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'EducationalOrganization'],
  name: 'PlaceMate',
  alternateName: 'PlaceMate India',
  url: 'https://www.theplacemate.in/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.theplacemate.in/images/theplacemate-logo.png',
    width: 512,
    height: 512,
  },
  image: 'https://www.theplacemate.in/images/theplacemate-logo.png',
  description: 'Industry-focused tech training platform offering expert-led courses in Full Stack Development, AI, UI/UX Design, DevOps & more with real internships and placement support.',
  foundingDate: '2023',
  sameAs: [
    'https://www.linkedin.com/company/theplacemate',
    'https://twitter.com/theplacemate',
    'https://www.instagram.com/theplacemate',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-6394753801',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    ratingCount: '2847',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PlaceMate',
  url: 'https://www.theplacemate.in/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.theplacemate.in/courses/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="bg-[#050508] text-[#f8fafc] antialiased overflow-x-hidden font-sans">
        {children}
        <FloatingContactForm />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  )
}
