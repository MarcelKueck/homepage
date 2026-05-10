import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Google's favicon service — used as a placeholder logo source for the
      // "Worked with" strip. TODO: replace with high-resolution SVG logos.
      { protocol: "https", hostname: "www.google.com" },
    ],
  },
};

export default withNextIntl(nextConfig);
