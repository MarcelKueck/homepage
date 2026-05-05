import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Search, Bot, Workflow, Cpu } from "lucide-react";

import { routing } from "@/i18n/routing";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { Headline } from "@/components/Headline";
import { Button } from "@/components/Button";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ServiceCard } from "@/components/ServiceCard";
import { CALENDAR_URL, SITE_URL } from "@/lib/links";

type Params = { locale: (typeof routing.locales)[number] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "work" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/${locale === "de" ? "zusammenarbeit" : "work-with-me"}`,
      languages: {
        en: "/en/work-with-me",
        de: "/de/zusammenarbeit",
        "x-default": "/en/work-with-me",
      },
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WorkContent />;
}

const SERVICE_KEYS = ["audit", "agent", "workflow", "integration"] as const;
const SERVICE_ICONS: Record<(typeof SERVICE_KEYS)[number], React.ReactNode> = {
  audit: <Search size={20} />,
  agent: <Bot size={20} />,
  workflow: <Workflow size={20} />,
  integration: <Cpu size={20} />,
};

function WorkContent() {
  const t = useTranslations("work");
  const tc = useTranslations("common");
  const steps = t.raw("process.steps") as Array<{ title: string; body: string }>;

  return (
    <>
      {/* HERO */}
      <Section ariaLabelledBy="work-headline">
        <div className="flex max-w-3xl flex-col gap-6">
          <SectionLabel>{t("hero.label")}</SectionLabel>
          <Headline
            as="h1"
            id="work-headline"
            className="display-headline text-balance"
            before={t("hero.headlineBefore")}
            accent={t("hero.headlineAccent")}
            after={t("hero.headlineAfter")}
          />
          <p className="text-text-secondary">{t("hero.body")}</p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <CopyEmailButton />
            <Button
              as="a"
              href={CALENDAR_URL}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tc("bookCall")}
            </Button>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section alt ariaLabelledBy="services-headline">
        <div className="mb-12 flex flex-col gap-4">
          <SectionLabel>{t("services.label")}</SectionLabel>
          <h2 id="services-headline" className="section-headline text-balance">
            {t("services.headline")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICE_KEYS.map((key) => (
            <ServiceCard
              key={key}
              title={t(`services.items.${key}.title`)}
              body={t(`services.items.${key}.body`)}
              pricing={t(`services.items.${key}.pricing`)}
              icon={SERVICE_ICONS[key]}
            />
          ))}
        </div>
      </Section>

      {/* PROCESS */}
      <Section ariaLabelledBy="process-headline">
        <div className="mb-12 flex flex-col gap-4">
          <SectionLabel>{t("process.label")}</SectionLabel>
          <Headline
            id="process-headline"
            before={t("process.headlineBefore")}
            accent={t("process.headlineAccent")}
            after={t("process.headlineAfter")}
          />
        </div>
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex flex-col gap-3 rounded-[24px] border border-border bg-bg-secondary p-7"
            >
              <span className="text-accent text-sm font-semibold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl font-semibold text-text-primary">{step.title}</h3>
              <p className="text-text-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* CASE STUDIES */}
      <Section alt ariaLabelledBy="cases-headline">
        <div className="mb-12 flex flex-col gap-4">
          <SectionLabel>{t("cases.label")}</SectionLabel>
          <h2 id="cases-headline" className="section-headline text-balance">
            {t("cases.headline")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-[24px] border border-border bg-bg-primary">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              {/* TODO: Replace with real photo (Motion Sports screenshot) */}
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt={t("cases.motionSports.client")}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4 p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-text-primary">
                  {t("cases.motionSports.client")}
                </h3>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {t("cases.motionSports.badge")}
                </span>
              </div>
              <p className="text-text-secondary">{t("cases.motionSports.description")}</p>
            </div>
          </article>

          <article className="flex flex-col items-start justify-center gap-5 rounded-[24px] border border-dashed border-border bg-bg-primary p-10">
            <h3 className="section-headline !text-2xl text-text-primary">
              {t("cases.placeholder.title")}
            </h3>
            <Button as="a" href={`mailto:hello@marcelkueck.dev`} variant="secondary">
              {tc("getInTouch")}
            </Button>
          </article>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section ariaLabelledBy="work-cta-headline">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 id="work-cta-headline" className="display-headline text-balance">
            {tc("workWithMe")}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <CopyEmailButton />
            <Button
              as="a"
              href={CALENDAR_URL}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tc("bookCall")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
