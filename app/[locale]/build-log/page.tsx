import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Section } from "@/components/Section";
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
    <>
      {/* Client-side redirect via meta refresh ensures the user ends up on Substack
          while still allowing search engines and reduced-motion users to read
          the fallback card. */}
      <meta httpEquiv="refresh" content={`0; url=${SOCIAL_LINKS.substack}`} />
      <Section ariaLabelledBy="buildlog-headline">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-[24px] border border-border bg-bg-secondary p-10 text-center sm:p-14">
          <Headline
            as="h1"
            id="buildlog-headline"
            className="display-headline !text-4xl sm:!text-5xl text-balance"
            before={t("headlineBefore")}
            accent={t("headlineAccent")}
            after={t("headlineAfter")}
          />
          <p className="text-text-secondary">{t("body")}</p>
          <Button
            as="a"
            href={SOCIAL_LINKS.substack}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("cta")}
          </Button>
        </div>
      </Section>
    </>
  );
}
