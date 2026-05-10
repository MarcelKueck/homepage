import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/projects": {
      en: "/projects",
      de: "/projekte",
    },
    "/work-with-me": {
      en: "/work-with-me",
      de: "/zusammenarbeit",
    },
    "/build-log": {
      en: "/build-log",
      de: "/build-log",
    },
    "/impressum": {
      en: "/impressum",
      de: "/impressum",
    },
    "/privacy": {
      en: "/privacy",
      de: "/datenschutz",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
