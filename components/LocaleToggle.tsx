"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { routing } from "@/i18n/routing";

export function LocaleToggle({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;

    // Map current localized path to canonical pathname key, then to next locale's path.
    const segments = (pathname || "/").split("/").filter(Boolean);
    // Drop current locale segment
    if (segments[0] === locale) segments.shift();
    const currentLocalized = "/" + segments.join("/");

    // Find the canonical key whose value for current locale matches.
    let canonicalKey: keyof typeof routing.pathnames = "/";
    for (const key of Object.keys(routing.pathnames) as Array<keyof typeof routing.pathnames>) {
      const def = routing.pathnames[key];
      const localizedForCurrent =
        typeof def === "string" ? def : def[locale as keyof typeof def];
      if (localizedForCurrent === currentLocalized || (currentLocalized === "" && localizedForCurrent === "/")) {
        canonicalKey = key;
        break;
      }
    }

    const def = routing.pathnames[canonicalKey];
    const localizedForNext =
      typeof def === "string" ? def : def[next as keyof typeof def];

    const targetPath =
      localizedForNext === "/"
        ? `/${next}`
        : `/${next}${localizedForNext}`;

    startTransition(() => {
      router.replace(targetPath);
    });
    void params;
  }

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`inline-flex items-center gap-0.5 rounded-full border border-border-strong p-0.5 font-mono text-[0.6875rem] font-medium ${className}`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            disabled={isPending}
            onClick={() => switchTo(l)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 uppercase tracking-[0.08em] transition-colors ${
              active
                ? "bg-text-primary text-button-text"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
