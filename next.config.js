const path = require('path')

module.exports = {
  output: 'standalone',
  trailingSlash: false,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
}
