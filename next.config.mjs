/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Enforce linting in production builds
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Enforce type checking in production builds
    ignoreBuildErrors: false,
  },
  images: {
    // Enable image optimization for production
    unoptimized: process.env.NODE_ENV === 'development',
    // Add allowed domains for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
}

export default nextConfig
