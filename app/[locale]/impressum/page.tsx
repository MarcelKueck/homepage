// TODO: Marcel must fill in placeholders (street, ZIP, phone, VAT ID)
// before this page is published.

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

  return (
    <Section snap={false}>
      <article className="prose-page mx-auto max-w-[700px]">
        <h1 className="!text-4xl !font-bold !text-text-primary !tracking-tight !leading-tight">
          Impressum
        </h1>

        <h2>Angaben gemäß § 5 TMG / Information according to § 5 TMG</h2>
        <p>
          Marcel Kueck
          <br />
          [PLACEHOLDER: Street + house number]
          <br />
          [PLACEHOLDER: ZIP] Munich
          <br />
          Germany
        </p>

        <h2>Contact / Kontakt</h2>
        <p>
          Email:{" "}
          <a href="mailto:hello@marcelkueck.dev">hello@marcelkueck.dev</a>
          <br />
          Phone: [PLACEHOLDER: business phone number]
        </p>

        <h2>Umsatzsteuer-Identifikationsnummer / VAT ID</h2>
        <p>[PLACEHOLDER: USt-IdNr — Not yet applicable until issued]</p>

        <h2>
          Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV / Responsible for
          content
        </h2>
        <p>Marcel Kueck (address as above)</p>

        <h2>Berufsbezeichnung / Professional designation</h2>
        <p>
          Freiberufler nach § 18 EStG (Selbstständige Tätigkeit im Bereich
          Software-Engineering)
        </p>

        <h2>Streitschlichtung / Dispute resolution</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr
          </a>
          .
        </p>
        <p>
          Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </article>
    </Section>
  );
}
