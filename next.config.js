/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  // Optimasi untuk production
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig