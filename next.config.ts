import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.espncdn.com",
      },
      {
        protocol: "https",
        hostname: "unavatar.io",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
