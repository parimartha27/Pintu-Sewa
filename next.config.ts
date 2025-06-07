import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "example.com", "images.unsplash.com", "unsplash.com", "res.cloudinary.com","picsum.photos"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
}

export default nextConfig
