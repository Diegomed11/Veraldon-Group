import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio es estático: `next build` deja el resultado en `out/` y Cloudflare lo sirve tal cual.
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
