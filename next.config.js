/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['ur-blog.vercel.app'],
  }
}

module.exports = nextConfig
