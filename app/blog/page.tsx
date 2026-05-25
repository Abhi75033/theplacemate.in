import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { ALL_BLOG_POSTS } from '@/lib/blog-index'
import { Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Tech Career Guides, Course Reviews & Industry Insights',
  description: 'Read PlaceMate\'s blog for career guides, course comparisons, placement tips, and tech industry insights. Actionable advice for students, freshers, and professionals.',
  alternates: { canonical: 'https://www.theplacemate.in/blog/' },
  openGraph: {
    title: 'PlaceMate Blog — Career Guides & Tech Insights',
    description: 'Actionable career guides, course reviews, and tech industry insights from PlaceMate.',
    url: 'https://www.theplacemate.in/blog/',
    siteName: 'PlaceMate',
    images: [{ url: '/og-blog.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: 'PlaceMate Blog', description: 'Career guides and tech insights for students and professionals.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const CATEGORY_COLORS: Record<string, string> = {
  'Career Guide': '#6366f1',
  'Course Guide': '#06b6d4',
  'Success Stories': '#10b981',
  'Platform Guide': '#8b5cf6',
}

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12),transparent_70%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }]} />
          <div className="mt-8 text-center mb-16">
            <span className="tag mb-4 inline-flex">PlaceMate Blog</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Career guides & <span className="gradient-text">tech insights</span>
            </h1>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              Actionable advice on choosing the right tech career path, landing internships, preparing for interviews, and building skills that companies actually hire for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {ALL_BLOG_POSTS.map((post) => {
              const catColor = CATEGORY_COLORS[post.category] || '#6366f1'
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.15] transition-all card-hover block relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: `linear-gradient(90deg, transparent, ${catColor}, transparent)` }} />
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                      style={{ color: catColor, borderColor: `${catColor}40`, background: `${catColor}10` }}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#64748b]">
                      <Clock className="w-3 h-3" />{post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">{post.title}</h2>
                  <p className="text-sm text-[#94a3b8] leading-relaxed mb-4 line-clamp-2">{post.description}</p>
                  <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: catColor }}>
                    Read More <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
