/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['m.media-amazon.com', 'image.tmdb.org', 'images.unsplash.com'],
    },
      eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  };
  
  module.exports = nextConfig;
  


