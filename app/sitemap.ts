import { MetadataRoute } from 'next'
import { COURSES } from '@/lib/courses'
import { INDEXABLE_CITY_SLUGS } from '@/lib/city-content'
import { ALL_CITIES } from '@/lib/cities'

const BASE = 'https://www.theplacemate.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // --- 1. Static pages ---
  const staticPages = [
    { url: `${BASE}/`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE}/about/`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE}/courses/`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/internships/`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE}/placements/`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE}/contact/`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE}/blog/`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: `${BASE}/privacy-policy/`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.3 },
    { url: `${BASE}/terms/`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.3 },
    { url: `${BASE}/courses-by-city/`, lastModified: currentDate, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE}/best-tech-courses-india/`, lastModified: currentDate, changeFrequency: 'monthly' as const, priority: 0.8 },
  ]

  // --- 2. Individual course pages ---
  const indexableCourses = COURSES.filter(c => c.description && c.description.trim() !== '' && c.outcomes && c.outcomes.length > 0)
  const coursePages = indexableCourses.map(c => ({
    url: `${BASE}/courses/${c.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // --- 3. Priority city×course pages ---
  const indexableCities = ALL_CITIES.filter(c => INDEXABLE_CITY_SLUGS.has(c.slug))
  const cityCoursePages = indexableCourses.flatMap(c =>
    indexableCities.map(city => ({
      url: `${BASE}/courses/${c.slug}/${city.slug}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
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
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...coursePages, ...cityCoursePages, ...blogPages]
}
