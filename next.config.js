/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://34.118.94.209:8088/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
