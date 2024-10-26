/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ice.frostsky.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pump.mypinata.cloud',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
