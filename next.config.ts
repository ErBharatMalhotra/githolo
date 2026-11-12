import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disabling cacheComponents to allow normal edge/node API handlers and route dynamic behavior
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
};

export default nextConfig;
