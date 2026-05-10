import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://marcelkueck.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{ key: keyof typeof routing.pathnames; priority: number }> = [
    { key: "/", priority: 1.0 },
    { key: "/projects", priority: 0.9 },
    { key: "/work-with-me", priority: 0.9 },
    { key: "/build-log", priority: 0.5 },
    { key: "/impressum", priority: 0.3 },
    { key: "/privacy", priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { key, priority } of routes) {
    const def = routing.pathnames[key];
    for (const locale of routing.locales) {
      const localized = typeof def === "string" ? def : def[locale as keyof typeof def];
      const path = localized === "/" ? `/${locale}` : `/${locale}${localized}`;
      const altLanguages: Record<string, string> = {};
      for (const altLocale of routing.locales) {
        const altLocalized =
          typeof def === "string" ? def : def[altLocale as keyof typeof def];
        const altPath =
          altLocalized === "/" ? `/${altLocale}` : `/${altLocale}${altLocalized}`;
        altLanguages[altLocale] = `${SITE_URL}${altPath}`;
      }
      entries.push({
        url: `${SITE_URL}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority,
        alternates: { languages: altLanguages },
      });
    }
  }
  return entries;
}
