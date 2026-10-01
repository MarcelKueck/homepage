import { useTranslations } from "next-intl";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

export default function LocaleNotFound() {
  const t = useTranslations("notFound");
  return (
    <Section>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-10 text-center">
        <p className="mono-label text-accent">Error 404</p>
        <h1 className="display-headline text-balance">{t("title")}</h1>
        <p className="text-lg text-text-secondary">{t("body")}</p>
        <Button as="link" href="/" variant="primary" arrow="internal">
          {t("cta")}
        </Button>
      </div>
    </Section>
  );
}
