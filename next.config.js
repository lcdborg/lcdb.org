const path = require('path')

module.exports = {
  output: 'standalone',
  trailingSlash: false,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    largePageDataBytes: 2 * 1000000
  },

  async redirects() {
    return [
      {
        source: '/shn/:path*',
        destination: '/source/:path*',
        permanent: true,
      },
    ]
  }
}
