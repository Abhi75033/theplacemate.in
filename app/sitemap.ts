import { MetadataRoute } from 'next'
import { COURSES } from '@/lib/courses'
import { INDEXABLE_CITY_SLUGS } from '@/lib/city-content'
import { ALL_CITIES } from '@/lib/cities'

const BASE = 'https://www.theplacemate.in'

// Use generateSitemaps to create a sitemap index with multiple sub-sitemaps
// id 0 = static + trust pages
// id 1 = course detail pages
// id 2 = priority city×course pages (only cities with real content)
// id 3 = blog pages
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  // --- Sub-sitemap 0: Static pages ---
  if (id === 0) {
    return [
      { url: `${BASE}/`, lastModified: '2025-06-01', changeFrequency: 'weekly', priority: 1.0 },
      { url: `${BASE}/about/`, lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE}/courses/`, lastModified: '2025-06-01', changeFrequency: 'weekly', priority: 0.9 },
      { url: `${BASE}/internships/`, lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE}/placements/`, lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE}/contact/`, lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.3 },
      { url: `${BASE}/blog/`, lastModified: '2025-06-01', changeFrequency: 'weekly', priority: 0.6 },
      { url: `${BASE}/privacy-policy/`, lastModified: '2025-06-01', changeFrequency: 'yearly', priority: 0.2 },
      { url: `${BASE}/terms/`, lastModified: '2025-06-01', changeFrequency: 'yearly', priority: 0.2 },
      { url: `${BASE}/courses-by-city/`, lastModified: '2025-06-01', changeFrequency: 'weekly', priority: 0.8 },
      { url: `${BASE}/best-tech-courses-india/`, lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.8 },
    ]
  }

  // --- Sub-sitemap 1: Individual course pages (25 courses) ---
  if (id === 1) {
    const indexableCourses = COURSES.filter(c => c.description && c.description.trim() !== '' && c.outcomes && c.outcomes.length > 0)
    return indexableCourses.map(c => ({
      url: `${BASE}/courses/${c.slug}/`,
      lastModified: '2025-06-01',
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  }

  // --- Sub-sitemap 2: Priority city×course pages ONLY ---
  // Only cities with real industry data (not templated content)
  if (id === 2) {
    const indexableCities = ALL_CITIES.filter(c => INDEXABLE_CITY_SLUGS.has(c.slug))
    const indexableCourses = COURSES.filter(c => c.description && c.description.trim() !== '' && c.outcomes && c.outcomes.length > 0)
    return indexableCourses.flatMap(c =>
      indexableCities.map(city => ({
        url: `${BASE}/courses/${c.slug}/${city.slug}/`,
        lastModified: '2025-06-01',
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    )
  }

  // --- Sub-sitemap 3: Blog pages ---
  const blogSlugs = [
    'top-10-it-courses-after-12th-india-2025',
    'best-full-stack-development-course-mumbai-2025',
    'how-to-get-it-internship-india-fresher',
    'data-science-vs-web-development-2025',
    'placemate-placement-success-stories-2024',
    'best-digital-marketing-courses-pune-placement',
    'what-is-placemate-complete-guide',
  ]

  return blogSlugs.map(slug => ({
    url: `${BASE}/blog/${slug}/`,
    lastModified: '2025-06-01',
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
}
