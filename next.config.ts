import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // enables static export for GitHub Pages
  basePath: isProd ? "/tarteeb-landing" : "",
  assetPrefix: isProd ? "/tarteeb-landing/" : "",
  images: {
    unoptimized: true, // disable next/image optimization (needed for static export)
  },
};

export default nextConfig;
