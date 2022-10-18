const path = require('path')

module.exports = {
  output: 'standalone',
  trailingSlash: false,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
  },
}
