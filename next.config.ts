import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admins can paste a product image URL from any host, so we can't maintain
    // a fixed allowlist. Next still validates the hostname against
    // remotePatterns even when unoptimized, so allow every https host and
    // skip the optimization proxy (serves the original URL directly).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    unoptimized: true,
  },
};

export default nextConfig;
