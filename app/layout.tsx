import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import FloatingContactForm from '@/components/FloatingContactForm'
import ApplyModal from '@/components/ApplyModal'
import CounselingModal from '@/components/CounselingModal'
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
  metadataBase: new URL("https://www.theplacemate.in"),
  title: {
    default: "PlaceMate – Industry-Focused Training & Internship Platform",
    template: "%s | PlaceMate"
  },
  description: "ThePlaceMate Industry-focused tech training and internship programs with real placement support across India.",
  keywords: ["tech training India", "full stack development course", "AI engineering bootcamp", "internship with placement", "coding bootcamp India", "MERN stack course Mumbai", "placement support India"],
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "PlaceMate – Industry-Focused Training & Internship Platform",
    description: "Industry-focused tech training and internship programs with placement support across India.",
    url: "https://www.theplacemate.in",
    siteName: "PlaceMate",
    images: [
      {
        url: "https://www.theplacemate.in/logo.png",
        width: 500,
        height: 500,
        alt: "PlaceMate Logo",
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlaceMate – Industry-Focused Training & Internship Platform",
    description: "Industry-focused tech training and internship programs with placement support across India.",
    images: ["https://www.theplacemate.in/logo.png"],
    creator: "@theplacemate",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: "YOUR_ACTUAL_VERIFICATION_CODE" }
}

export const viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head />
      <body className="bg-[#F8FAFC] text-[#0F172A] antialiased overflow-x-hidden font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PlaceMate",
              "url": "https://www.theplacemate.in",
              "logo": "https://www.theplacemate.in/logo.png"
            })
          }}
        />
        {children}
        <FloatingContactForm />
        <ApplyModal />
        <CounselingModal />
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
