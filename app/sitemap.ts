import { MetadataRoute } from 'next'
import { COURSES } from '@/lib/courses'
import { ALL_CITIES } from '@/lib/cities'

const BASE = 'https://theplacemate.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/courses`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/internships`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/placements`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ]

  const coursePages: MetadataRoute.Sitemap = COURSES.map(c => ({
    url: `${BASE}/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const locationPages: MetadataRoute.Sitemap = COURSES.flatMap(c =>
    ALL_CITIES.map(city => ({
      url: `${BASE}/courses/${c.slug}/${city.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  const blogSlugs = [
    'top-10-it-courses-after-12th-india-2025',
    'best-full-stack-development-course-mumbai-2025',
    'how-to-get-it-internship-india-fresher',
    'data-science-vs-web-development-2025',
    'placemate-placement-success-stories-2024',
    'best-digital-marketing-courses-pune-placement',
    'what-is-placemate-complete-guide',
  ]

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...coursePages, ...locationPages, ...blogPages]
}
