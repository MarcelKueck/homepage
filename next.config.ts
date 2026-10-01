import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // exali professional-liability insurance verification seal shown on the
      // Impressum page.
      { protocol: "https", hostname: "www.exali.de" },
    ],
  },
};

export default withNextIntl(nextConfig);
