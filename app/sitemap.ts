import { MetadataRoute } from 'next'
import { COURSES } from '@/lib/courses'
import { INDEXABLE_CITY_SLUGS } from '@/lib/city-content'
import { ALL_CITIES } from '@/lib/cities'

const BASE = 'https://www.theplacemate.in'

export default function sitemap(): MetadataRoute.Sitemap {
  // --- 1. Static pages ---
  const staticPages = [
    { url: `${BASE}/`, lastModified: '2025-06-01', changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE}/about/`, lastModified: '2025-06-01', changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE}/courses/`, lastModified: '2025-06-01', changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/internships/`, lastModified: '2025-06-01', changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE}/placements/`, lastModified: '2025-06-01', changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${BASE}/contact/`, lastModified: '2025-06-01', changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE}/blog/`, lastModified: '2025-06-01', changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE}/privacy-policy/`, lastModified: '2025-06-01', changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE}/terms/`, lastModified: '2025-06-01', changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${BASE}/courses-by-city/`, lastModified: '2025-06-01', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/best-tech-courses-india/`, lastModified: '2025-06-01', changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  // --- 2. Individual course pages ---
  const indexableCourses = COURSES.filter(c => c.description && c.description.trim() !== '' && c.outcomes && c.outcomes.length > 0)
  const coursePages = indexableCourses.map(c => ({
    url: `${BASE}/courses/${c.slug}/`,
    lastModified: '2025-06-01',
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // --- 3. Priority city×course pages ---
  const indexableCities = ALL_CITIES.filter(c => INDEXABLE_CITY_SLUGS.has(c.slug))
  const cityCoursePages = indexableCourses.flatMap(c =>
    indexableCities.map(city => ({
      url: `${BASE}/courses/${c.slug}/${city.slug}/`,
      lastModified: '2025-06-01',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // --- 4. Blog pages ---
  const blogSlugs = [
    'top-10-it-courses-after-12th-india-2025',
    'best-full-stack-development-course-mumbai-2025',
    'how-to-get-it-internship-india-fresher',
    'data-science-vs-web-development-2025',
    'placemate-placement-success-stories-2024',
    'best-digital-marketing-courses-pune-placement',
    'what-is-placemate-complete-guide',
  ]
  const blogPages = blogSlugs.map(slug => ({
    url: `${BASE}/blog/${slug}/`,
    lastModified: '2025-06-01',
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...coursePages, ...cityCoursePages, ...blogPages]
}
