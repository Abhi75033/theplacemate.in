export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function courseSchema(course: { name: string; description: string; slug: string; duration: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.name,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'PlaceMate',
      url: 'https://theplacemate.in',
      logo: 'https://theplacemate.in/logo.png',
    },
    url: `https://theplacemate.in/courses/${course.slug}`,
    timeRequired: course.duration,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      ratingCount: '2847',
      reviewCount: '1243',
    },
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function localBusinessSchema(city: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `PlaceMate ${city}`,
    url: 'https://theplacemate.in',
    logo: 'https://theplacemate.in/logo.png',
    image: 'https://theplacemate.in/logo.png',
    address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'IN' },
    telephone: '+91-6394753801',
    email: 'hello@theplacemate.in',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5',
      ratingCount: '2847',
    },
  }
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export function articleSchema(post: { title: string; description: string; slug: string; date: string; modified: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'PlaceMate', url: 'https://theplacemate.in', logo: 'https://theplacemate.in/logo.png' },
    publisher: { '@type': 'Organization', name: 'PlaceMate', url: 'https://theplacemate.in', logo: { '@type': 'ImageObject', url: 'https://theplacemate.in/logo.png' } },
    datePublished: post.date,
    dateModified: post.modified,
    mainEntityOfPage: `https://theplacemate.in/blog/${post.slug}`,
    image: 'https://theplacemate.in/logo.png',
  }
}
