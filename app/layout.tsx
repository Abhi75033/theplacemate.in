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

export const metadata = {
  metadataBase: new URL("https://www.theplacemate.in"),
  title: {
    default: "PlaceMate — Industry-Focused Training & Internship Platform",
    template: "%s | PlaceMate"
  },
  description: "PlaceMate offers cohort-based training in Full Stack Development, AI Engineering, UI/UX Design, DevOps & more with real internships and placement support across 377 cities in India.",
  keywords: ["tech training India", "full stack development course", "AI engineering bootcamp", "internship with placement", "coding bootcamp India", "MERN stack course Mumbai", "placement support India"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PlaceMate",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }]
  },
  twitter: { card: "summary_large_image", site: "@theplacemate" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: "YOUR_ACTUAL_VERIFICATION_CODE" }
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
