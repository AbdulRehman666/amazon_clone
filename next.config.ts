import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Admins can paste a product image URL from any host, so we can't maintain
    // an allowlist of remote patterns. Skips Next's optimization proxy (which
    // enforces that allowlist) and serves images directly instead.
    unoptimized: true,
  },
};

export default nextConfig;
