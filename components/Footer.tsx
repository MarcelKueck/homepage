import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Container } from "./Container";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer aria-label="Site footer" className="border-t border-border bg-bg-primary">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 py-10 text-sm text-text-tertiary md:flex-row md:items-center">
          <p className="max-w-md">{t("tagline")}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/impressum" className="transition-colors hover:text-text-primary">
                {t("impressum")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition-colors hover:text-text-primary">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/marcelkueck"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-text-primary"
              >
                {t("github")}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/marcel-kueck/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-text-primary"
              >
                {t("linkedin")}
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
