import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb", // or leave empty
      allowedOrigins: ["*"], // or specify domains
    },
  },
};

export default nextConfig;