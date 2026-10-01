import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { SOCIAL_LINKS } from "@/lib/links";
import { Container } from "./Container";

const SOCIALS = [
  { key: "github", href: SOCIAL_LINKS.github },
  { key: "linkedin", href: SOCIAL_LINKS.linkedin },
  { key: "x", href: SOCIAL_LINKS.x },
  { key: "substack", href: SOCIAL_LINKS.substack },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const year = new Date().getFullYear();

  const linkClass = "text-text-secondary transition-colors hover:text-text-primary";

  return (
    <footer aria-label={t("label")} className="border-t border-border bg-bg-primary">
      <Container>
        <div className="grid gap-10 py-14 text-sm md:grid-cols-12 md:gap-8 md:py-16">
          <div className="flex flex-col gap-4 md:col-span-5">
            <Link href="/" className="flex items-center gap-3" aria-label={tn("homeLabel")}>
              <Image src="/icons/mark.png" alt="" width={240} height={116} className="h-6 w-auto" />
              <span className="text-[0.9375rem] font-semibold tracking-tight">Marcel Kück</span>
            </Link>
            <p className="max-w-sm text-text-secondary">{t("tagline")}</p>
          </div>

          <nav aria-label={t("pagesHeading")} className="flex flex-col gap-3 md:col-span-2 md:col-start-7">
            <p className="mono-label text-text-tertiary">{t("pagesHeading")}</p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/projects" className={linkClass}>
                  {tn("projects")}
                </Link>
              </li>
              <li>
                <Link href="/work-with-me" className={linkClass}>
                  {tn("workWithMe")}
                </Link>
              </li>
              <li>
                <Link href="/build-log" className={linkClass}>
                  {tn("buildLog")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col gap-3 md:col-span-2">
            <p className="mono-label text-text-tertiary">{t("elsewhereHeading")}</p>
            <ul className="flex flex-col gap-2">
              {SOCIALS.map((s) => (
                <li key={s.key}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t(s.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 md:col-span-2">
            <p className="mono-label text-text-tertiary">{t("legalHeading")}</p>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/impressum" className={linkClass}>
                  {t("impressum")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 font-mono text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Marcel Kück</p>
          <p>{t("location")}</p>
        </div>
      </Container>
    </footer>
  );
}
