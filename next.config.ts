import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.100.104",
    "192.168.1.104",
    "192.168.100.*",
    "localhost:3000",
    "localhost:3001",
    "localhost:3002"
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
