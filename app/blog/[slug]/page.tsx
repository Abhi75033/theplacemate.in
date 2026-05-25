import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { ALL_BLOG_POSTS, getBlogBySlug } from '@/lib/blog-index'
import { articleSchema } from '@/lib/schemas'
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react'

export const revalidate = 86400

export async function generateStaticParams() {
  return ALL_BLOG_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://www.theplacemate.in/blog/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.theplacemate.in/blog/${post.slug}/`,
      siteName: 'PlaceMate',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [{ url: `/og-blog-${post.slug}.png`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

function renderContent(content: string) {
  // Simple markdown-like rendering for blog content
  return content.split('\n\n').map((block, i) => {
    const trimmed = block.trim()
    if (!trimmed) return null

    // Bold headers (lines starting with **)
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      const text = trimmed.slice(2, -2)
      return <h2 key={i} className="text-xl font-bold text-white mt-8 mb-4">{text}</h2>
    }

    // Process inline markdown: bold and links
    const parts: (string | JSX.Element)[] = []
    let remaining = trimmed
    let partKey = 0

    while (remaining.length > 0) {
      // Check for links first: [text](/url)
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/)
      // Check for bold: **text**
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/)

      const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity
      const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity

      if (linkIdx === Infinity && boldIdx === Infinity) {
        parts.push(remaining)
        break
      }

      if (linkIdx < boldIdx && linkMatch) {
        if (linkIdx > 0) parts.push(remaining.slice(0, linkIdx))
        parts.push(
          <Link key={`l${partKey++}`} href={linkMatch[2]} className="text-[#6366f1] hover:text-[#8b5cf6] underline underline-offset-2 transition-colors">
            {linkMatch[1]}
          </Link>
        )
        remaining = remaining.slice(linkIdx + linkMatch[0].length)
      } else if (boldMatch) {
        if (boldIdx > 0) parts.push(remaining.slice(0, boldIdx))
        parts.push(<strong key={`b${partKey++}`} className="text-white font-semibold">{boldMatch[1]}</strong>)
        remaining = remaining.slice(boldIdx + boldMatch[0].length)
      }
    }

    return <p key={i} className="text-[#94a3b8] leading-relaxed mb-4">{parts}</p>
  })
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug)
  if (!post) notFound()

  const currentIndex = ALL_BLOG_POSTS.findIndex(p => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? ALL_BLOG_POSTS[currentIndex - 1] : null
  const nextPost = currentIndex < ALL_BLOG_POSTS.length - 1 ? ALL_BLOG_POSTS[currentIndex + 1] : null

  return (
    <main>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema({ title: post.title, description: post.description, slug: post.slug, date: post.date, modified: post.modified })) }} />

      <article className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.08),transparent_70%)]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title, href: `/blog/${post.slug}` }]} />

          <div className="mt-8 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="tag">{post.category}</span>
              <span className="flex items-center gap-1 text-xs text-[#64748b]">
                <Clock className="w-3 h-3" />{post.readTime}
              </span>
              <span className="text-xs text-[#64748b]">{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">{post.title}</h1>
            <p className="text-lg text-[#94a3b8]">{post.description}</p>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-10 border border-white/[0.06]">
            {renderContent(post.content)}
          </div>

          {/* Navigation */}
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="glass rounded-xl p-4 border border-white/[0.06] hover:border-[#6366f1]/20 transition-all flex items-center gap-3">
                <ArrowLeft className="w-4 h-4 text-[#6366f1] shrink-0" />
                <div>
                  <div className="text-[10px] text-[#64748b]">Previous</div>
                  <div className="text-sm font-semibold text-white line-clamp-1">{prevPost.title}</div>
                </div>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="glass rounded-xl p-4 border border-white/[0.06] hover:border-[#6366f1]/20 transition-all flex items-center gap-3 text-right sm:justify-end">
                <div>
                  <div className="text-[10px] text-[#64748b]">Next</div>
                  <div className="text-sm font-semibold text-white line-clamp-1">{nextPost.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#6366f1] shrink-0" />
              </Link>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 glass rounded-2xl p-6 border border-[#6366f1]/20 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Ready to start your tech career?</h3>
            <p className="text-sm text-[#94a3b8] mb-4">Explore PlaceMate&apos;s training programs with real projects, internships, and placement support.</p>
            <Link href="/courses" className="btn-primary inline-flex items-center gap-2 text-sm relative z-10">
              <span className="relative z-10">Explore Programs</span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
