import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { CornerMarks } from "@/components/CornerMarks";
import { SectionLabel } from "@/components/SectionLabel";
import { Headline } from "@/components/Headline";
import { Button } from "@/components/Button";
import { SOCIAL_LINKS, SITE_URL } from "@/lib/links";

type Params = { locale: (typeof routing.locales)[number] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "buildLog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/build-log`,
      languages: {
        en: "/en/build-log",
        de: "/de/build-log",
        "x-default": "/en/build-log",
      },
    },
    robots: { index: false, follow: true },
  };
}

export default async function BuildLogPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BuildLogContent />;
}

function BuildLogContent() {
  const t = useTranslations("buildLog");
  return (
    <section
      aria-labelledby="buildlog-headline"
      className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden py-20"
    >
      <div aria-hidden="true" className="blueprint-grid blueprint-fade pointer-events-none absolute inset-0" />
      <Container className="relative">
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-[var(--radius-card)] border border-border bg-bg-secondary/80 p-10 text-center backdrop-blur-sm sm:p-14">
          <CornerMarks />
          <SectionLabel>{t("label")}</SectionLabel>
          <Headline
            as="h1"
            id="buildlog-headline"
            className="section-headline text-balance"
            before={t("headlineBefore")}
            accent={t("headlineAccent")}
            after={t("headlineAfter")}
          />
          <p className="text-lg leading-relaxed text-text-secondary">{t("body")}</p>
          <Button
            as="a"
            href={SOCIAL_LINKS.substack}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
            arrow="external"
          >
            {t("cta")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
