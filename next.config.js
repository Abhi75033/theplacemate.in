/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
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
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'theplacemate.in' }],
        destination: 'https://www.theplacemate.in/:path*',
        permanent: true,
      },
      ...customRedirects,
    ]
  },
}

module.exports = nextConfig
