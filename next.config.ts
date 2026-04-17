import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.twroz.wiki",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

