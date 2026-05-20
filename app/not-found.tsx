import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Page Not Found | PlaceMate',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(99,102,241,0.08),transparent_70%)]" />

        <div className="relative text-center px-4">
          <div className="text-[120px] sm:text-[180px] font-black gradient-text leading-none mb-4 select-none">
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Page not found — but your career path is.
          </h1>
          <p className="text-[#94a3b8] text-base max-w-md mx-auto mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/courses" className="btn-primary inline-flex items-center gap-2 text-sm relative z-10">
              <span className="relative z-10">Browse All Courses</span>
            </Link>
            <Link href="/" className="btn-secondary inline-flex items-center gap-2 text-sm">
              Go to Homepage
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
