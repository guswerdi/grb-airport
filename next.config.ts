import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400, // 31 days to reduce repeat Vercel Image Transformations
    deviceSizes: [640, 828, 1080, 1600],
    imageSizes: [128, 384],
    qualities: [40, 75],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
