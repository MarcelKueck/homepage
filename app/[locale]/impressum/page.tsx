import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Section } from "@/components/Section";
import { SITE_URL } from "@/lib/links";

type Params = { locale: (typeof routing.locales)[number] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impressum" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/impressum`,
      languages: {
        en: "/en/impressum",
        de: "/de/impressum",
        "x-default": "/en/impressum",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "impressum" });

  return (
    <Section snap={false}>
      <article className="prose-page mx-auto max-w-[700px]">
        <h1 className="!text-4xl !font-bold !text-text-primary !tracking-tight !leading-tight">
          {t("title")}
        </h1>

        <h2>{t("addressHeading")}</h2>
        <p>
          Marcel Kück
          <br />
          Hermann-Löns-Straße 22A
          <br />
          82194 Gröbenzell
          <br />
          Germany
        </p>

        <h2>{t("contactHeading")}</h2>
        <p>
          {t("contactEmailLabel")}:{" "}
          <a href="mailto:hello@marcelkueck.dev">hello@marcelkueck.dev</a>
          <br />
          {t("contactPhoneLabel")}: +49 155 10365957
        </p>

        <h2>{t("vatHeading")}</h2>
        <p>{t("vatText")}</p>

        <h2>{t("responsibleHeading")}</h2>
        <p>{t("responsibleText")}</p>

        <h2>{t("designationHeading")}</h2>
        <p>{t("designationText")}</p>

        <h2>{t("disputeHeading")}</h2>
        <p>
          {t("disputeText1")}{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>
        <p>{t("disputeText2")}</p>
      </article>
    </Section>
  );
}
