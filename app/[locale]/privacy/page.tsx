// TODO: Marcel — review with a German privacy resource
// (e.g. e-recht24.de generator) before going live.

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, Link } from "@/i18n/routing";
import { Section } from "@/components/Section";
import { SITE_URL } from "@/lib/links";

type Params = { locale: (typeof routing.locales)[number] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/${locale === "de" ? "datenschutz" : "privacy"}`,
      languages: {
        en: "/en/privacy",
        de: "/de/datenschutz",
        "x-default": "/en/privacy",
      },
    },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale === "de" ? <PrivacyDe /> : <PrivacyEn />;
}

function PrivacyEn() {
  return (
    <Section snap={false}>
      <article className="prose-page mx-auto max-w-[700px]">
        <h1 className="!text-4xl !font-bold !text-text-primary !tracking-tight !leading-tight">
          Privacy Policy
        </h1>
        <p className="text-text-tertiary">Last updated: 2026</p>

        <h2>1. Data controller</h2>
        <p>
          The data controller for this website is Marcel Kueck. For full contact
          details, see the{" "}
          <Link href="/impressum">Impressum</Link>.
        </p>

        <h2>2. Hosting (Vercel Inc., USA)</h2>
        <p>
          This site is hosted by Vercel Inc., 440 N Barranca Avenue #4133,
          Covina, CA 91723, USA. Connections to Vercel servers may involve a
          transfer of personal data to the United States. The transfer is
          covered by the EU Standard Contractual Clauses (SCCs) Vercel
          provides as part of its data processing addendum.
        </p>

        <h2>3. Server log files</h2>
        <p>
          Vercel automatically collects and stores server log files for
          security and operational purposes. These include: IP address,
          timestamp, requested URL, referrer URL, user agent. Logs are kept
          for up to 7 days, then deleted. Legal basis: Art. 6(1)(f) GDPR
          (legitimate interest in operating a secure website).
        </p>

        <h2>4. Vercel Analytics</h2>
        <p>
          We use Vercel Analytics to understand how visitors use the site.
          Vercel Analytics is privacy-friendly: it does not use cookies and
          does not collect personally identifiable information. Visit data is
          aggregated and anonymized. Legal basis: Art. 6(1)(f) GDPR.
        </p>

        <h2>5. Google Calendar scheduler</h2>
        <p>
          When you click the &ldquo;Book a discovery call&rdquo; link, you are
          taken to a Google Calendar booking page hosted by Google Ireland
          Ltd. Google receives the personal data you submit through that
          page. Google&rsquo;s privacy policy applies. The booking page is
          only loaded after you actively click the link.
        </p>

        <h2>6. External links</h2>
        <p>
          This site links to external services including Substack, GitHub,
          LinkedIn, and X. We do not embed tracking scripts from these
          services on this site, but their own privacy policies apply when
          you follow the links.
        </p>

        <h2>7. Cookies</h2>
        <p>
          This site does not set any cookies of its own.
        </p>

        <h2>8. Your rights</h2>
        <p>
          Under the GDPR, you have the right to access (Art. 15),
          rectification (Art. 16), erasure (Art. 17), restriction of
          processing (Art. 18), data portability (Art. 20), and the right to
          object to processing (Art. 21). To exercise any of these rights,
          contact{" "}
          <a href="mailto:hello@marcelkueck.dev">hello@marcelkueck.dev</a>.
        </p>

        <h2>9. Right to complain</h2>
        <p>
          You have the right to lodge a complaint with a supervisory
          authority. The competent authority is the Bayerisches Landesamt für
          Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach, Germany.
        </p>
      </article>
    </Section>
  );
}

function PrivacyDe() {
  return (
    <Section snap={false}>
      <article className="prose-page mx-auto max-w-[700px]">
        <h1 className="!text-4xl !font-bold !text-text-primary !tracking-tight !leading-tight">
          Datenschutzerklärung
        </h1>
        <p className="text-text-tertiary">Letzte Aktualisierung: 2026</p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Verantwortlicher für diese Website ist Marcel Kueck. Vollständige
          Kontaktdaten finden Sie im{" "}
          <Link href="/impressum">Impressum</Link>.
        </p>

        <h2>2. Hosting (Vercel Inc., USA)</h2>
        <p>
          Diese Website wird von Vercel Inc., 440 N Barranca Avenue #4133,
          Covina, CA 91723, USA gehostet. Bei Verbindungen zu Vercel-Servern
          können personenbezogene Daten in die USA übertragen werden. Die
          Übermittlung ist durch die EU-Standardvertragsklauseln (SCC)
          abgesichert, die Vercel im Rahmen seines Auftragsverarbeitungs-
          vertrags bereitstellt.
        </p>

        <h2>3. Server-Logfiles</h2>
        <p>
          Vercel erhebt und speichert automatisch Server-Logfiles aus
          Sicherheits- und Betriebsgründen. Erfasst werden u.a. IP-Adresse,
          Zeitstempel, aufgerufene URL, Referrer-URL und User Agent. Die
          Logs werden bis zu 7 Tage aufbewahrt und danach gelöscht.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
          Interesse am sicheren Betrieb der Website).
        </p>

        <h2>4. Vercel Analytics</h2>
        <p>
          Wir nutzen Vercel Analytics, um zu verstehen, wie Besucher die
          Website nutzen. Vercel Analytics ist datenschutzfreundlich: Es
          werden keine Cookies gesetzt und keine personenbezogenen Daten
          erfasst. Besuchsdaten werden aggregiert und anonymisiert.
          Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
        </p>

        <h2>5. Google Calendar Scheduler</h2>
        <p>
          Wenn Sie auf &bdquo;Erstgespräch buchen&ldquo; klicken, werden Sie
          zu einer Google-Calendar-Buchungsseite weitergeleitet, die von
          Google Ireland Ltd. bereitgestellt wird. Google erhält die Daten,
          die Sie auf dieser Seite eingeben. Es gilt die Datenschutz-
          erklärung von Google. Die Buchungsseite wird erst geladen, wenn
          Sie aktiv auf den Link klicken.
        </p>

        <h2>6. Externe Links</h2>
        <p>
          Diese Website verlinkt auf externe Dienste wie Substack, GitHub,
          LinkedIn und X. Wir binden keine Tracking-Skripte dieser Dienste
          auf dieser Seite ein, deren eigene Datenschutzerklärungen gelten
          jedoch, sobald Sie den Links folgen.
        </p>

        <h2>7. Cookies</h2>
        <p>Diese Website setzt keine eigenen Cookies.</p>

        <h2>8. Ihre Rechte</h2>
        <p>
          Nach der DSGVO haben Sie das Recht auf Auskunft (Art. 15),
          Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
          Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und
          Widerspruch gegen die Verarbeitung (Art. 21). Zur Ausübung dieser
          Rechte wenden Sie sich an{" "}
          <a href="mailto:hello@marcelkueck.dev">hello@marcelkueck.dev</a>.
        </p>

        <h2>9. Beschwerderecht</h2>
        <p>
          Sie haben das Recht, sich bei einer Aufsichtsbehörde zu
          beschweren. Zuständig ist das Bayerische Landesamt für
          Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.
        </p>
      </article>
    </Section>
  );
}
