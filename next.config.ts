import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["icuhoipcqehsbuwjtspu.supabase.co"],
  },
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // ✅ fixed structure
  },
};

export default nextConfig;
