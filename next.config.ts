import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // Ye line 'out' folder banane ke liye zaroori hai
  images: {
    unoptimized: true,   // Static export mein images ke liye ye zaroori hota hai
  },
};

export default nextConfig;