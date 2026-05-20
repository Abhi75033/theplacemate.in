/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'avatars.githubusercontent.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async redirects() {
    const { redirects: customRedirects } = require('./lib/redirects')
    return [
      { source: '/courses/:slug/', destination: '/courses/:slug', permanent: true },
      { source: '/courses/:slug/:city/', destination: '/courses/:slug/:city', permanent: true },
      { source: '/blog/:slug/', destination: '/blog/:slug', permanent: true },
      { source: '/about/', destination: '/about', permanent: true },
      { source: '/contact/', destination: '/contact', permanent: true },
      { source: '/internships/', destination: '/internships', permanent: true },
      { source: '/placements/', destination: '/placements', permanent: true },
      ...customRedirects,
    ]
  },
}

module.exports = nextConfig
