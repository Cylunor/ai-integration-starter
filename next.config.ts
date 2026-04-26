import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["openai", "@anthropic-ai/sdk"]
  }
};

export default nextConfig;
