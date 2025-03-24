/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = withBundleAnalyzer({
  output: 'export',
  experimental: {
      optimizePackageImports: [
          'framer-motion',
          'scrollmagic',
          'gsap',
          '@reduxjs/toolkit',
          'react-share'
      ]
  },
  images: {
      remotePatterns: [{
          hostname: 'res.cloudinary.com'
      }],
      unoptimized: true
  }
})

module.exports = nextConfig