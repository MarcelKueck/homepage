import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Bot,
  Building2,
  Cpu,
  FlaskConical,
  Microscope,
  Rocket,
  ScanSearch,
  Users,
  Workflow,
  Wrench,
} from "lucide-react";

import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { Headline } from "@/components/Headline";
import { Button } from "@/components/Button";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { CornerMarks } from "@/components/CornerMarks";
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

const AUDIENCES: Array<{ key: string; icon: ReactNode }> = [
  { key: "startups", icon: <Rocket size={20} strokeWidth={1.75} /> },
  { key: "industry", icon: <Building2 size={20} strokeWidth={1.75} /> },
  { key: "research", icon: <Microscope size={20} strokeWidth={1.75} /> },
];

const SERVICES: Array<{ key: string; icon: ReactNode }> = [
  { key: "feasibility", icon: <ScanSearch size={20} strokeWidth={1.75} /> },
  { key: "prototype", icon: <Wrench size={20} strokeWidth={1.75} /> },
  { key: "electronics", icon: <Cpu size={20} strokeWidth={1.75} /> },
  { key: "robotics", icon: <Bot size={20} strokeWidth={1.75} /> },
  { key: "lab", icon: <FlaskConical size={20} strokeWidth={1.75} /> },
  { key: "ai", icon: <Workflow size={20} strokeWidth={1.75} /> },
];

const CASES = [
  { key: "oxford", image: "/projects/oxford-bioreactor.jpg" },
  { key: "motionSports", image: "/projects/motion-sports-16-10.jpg" },
] as const;

function WorkContent() {
  const t = useTranslations("work");
  const tc = useTranslations("common");
  const steps = t.raw("process.steps") as Array<{ title: string; body: string }>;
  const toolbox = t.raw("toolbox.groups") as Array<{ title: string; items: string[] }>;

  const contactButtons = (
    <>
      <CopyEmailButton className="w-full sm:w-auto" />
      <Button
        as="a"
        href={CALENDAR_URL}
        variant="secondary"
        target="_blank"
        rel="noopener noreferrer"
        arrow="external"
        className="w-full sm:w-auto"
      >
        {tc("bookCall")}
      </Button>
    </>
  );

  return (
    <>
      {/* HERO */}
      <section aria-labelledby="work-headline" className="relative overflow-hidden">
        <div aria-hidden="true" className="blueprint-grid blueprint-fade pointer-events-none absolute inset-0" />
        <Container className="relative pb-16 pt-10 md:pb-24 md:pt-16">
          <div className="flex max-w-4xl flex-col gap-6">
            <SectionLabel>{t("hero.label")}</SectionLabel>
            <Headline
              as="h1"
              id="work-headline"
              className="display-headline text-balance"
              before={t("hero.headlineBefore")}
              accent={t("hero.headlineAccent")}
              after={t("hero.headlineAfter")}
            />
            <p className="max-w-[42rem] text-lg leading-relaxed text-text-secondary">{t("hero.body")}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
              {contactButtons}
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <p className="mono-label mb-5 flex items-center gap-2.5 text-text-tertiary">
              <Users size={14} aria-hidden="true" />
              {t("audiences.label")}
            </p>
            <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border md:grid-cols-3">
              {AUDIENCES.map(({ key, icon }) => (
                <li key={key} className="flex flex-col gap-3 bg-bg-primary p-7">
                  <span className="text-accent" aria-hidden="true">
                    {icon}
                  </span>
                  <h2 className="pt-2 text-lg font-semibold tracking-tight">
                    {t(`audiences.items.${key}.title`)}
                  </h2>
                  <p className="text-[0.9375rem] leading-relaxed text-text-secondary">
                    {t(`audiences.items.${key}.body`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <Section alt divider id="services" ariaLabelledBy="services-headline">
        <div className="reveal mb-12 flex flex-col gap-5 md:mb-16">
          <SectionLabel index="01">{t("services.label")}</SectionLabel>
          <Headline
            id="services-headline"
            before={t("services.headlineBefore")}
            accent={t("services.headlineAccent")}
            after={t("services.headlineAfter")}
          />
        </div>
        <ul className="reveal grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ key, icon }, i) => (
            <li key={key}>
              <ServiceCard
                index={`S-${String(i + 1).padStart(2, "0")}`}
                title={t(`services.items.${key}.title`)}
                body={t(`services.items.${key}.body`)}
                meta={t(`services.items.${key}.meta`)}
                icon={icon}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* PROCESS */}
      <Section divider id="process" ariaLabelledBy="process-headline">
        <div className="reveal mb-12 flex flex-col gap-5 md:mb-16">
          <SectionLabel index="02">{t("process.label")}</SectionLabel>
          <Headline
            id="process-headline"
            before={t("process.headlineBefore")}
            accent={t("process.headlineAccent")}
            after={t("process.headlineAfter")}
          />
        </div>
        <ol className="reveal relative grid gap-10 md:grid-cols-4 md:gap-6">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[1.0625rem] hidden h-px bg-gradient-to-r from-accent via-border-strong to-border md:block"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col gap-3">
              <span className="relative z-10 flex h-[2.125rem] w-fit items-center rounded-full border border-border-strong bg-bg-primary px-3 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="pt-3 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-text-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* TOOLBOX */}
      <Section alt divider id="toolbox" ariaLabelledBy="toolbox-headline">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="reveal flex flex-col gap-5 md:col-span-4">
            <SectionLabel index="03">{t("toolbox.label")}</SectionLabel>
            <Headline
              id="toolbox-headline"
              before={t("toolbox.headlineBefore")}
              accent={t("toolbox.headlineAccent")}
              after={t("toolbox.headlineAfter")}
            />
          </div>
          <dl className="reveal grid gap-x-8 sm:grid-cols-2 md:col-span-8">
            {toolbox.map((group) => (
              <div key={group.title} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-border py-5">
                <dt className="mono-label pt-0.5 text-text-tertiary">{group.title}</dt>
                <dd>
                  <ul className="flex flex-col gap-1.5 text-[0.9375rem] text-text-primary">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* CASES */}
      <Section divider id="cases" ariaLabelledBy="cases-headline">
        <div className="reveal mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-5">
            <SectionLabel index="04">{t("cases.label")}</SectionLabel>
            <Headline
              id="cases-headline"
              before={t("cases.headlineBefore")}
              accent={t("cases.headlineAccent")}
              after={t("cases.headlineAfter")}
            />
          </div>
          <Button as="link" href="/projects" variant="secondary" arrow="internal" className="self-start md:self-auto">
            {tc("allProjects")}
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {CASES.map(({ key, image }) => (
            <article
              key={key}
              className="reveal flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-secondary"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-tertiary">
                <Image
                  src={image}
                  alt={t(`cases.${key}.title`)}
                  fill
                  sizes="(min-width: 768px) 600px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-semibold tracking-tight">{t(`cases.${key}.title`)}</h3>
                  <span className="mono-label rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-accent">
                    {t(`cases.${key}.badge`)}
                  </span>
                </div>
                <p className="text-text-secondary">{t(`cases.${key}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section
        aria-labelledby="work-cta-headline"
        className="section-padding relative overflow-hidden border-t border-border"
      >
        <div
          aria-hidden="true"
          className="blueprint-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_20%,transparent_75%)]"
        />
        <Container className="relative">
          <div className="reveal relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-2 py-6 text-center">
            <Headline
              id="work-cta-headline"
              className="display-headline text-balance"
              before={t("cta.headlineBefore")}
              accent={t("cta.headlineAccent")}
              after={t("cta.headlineAfter")}
            />
            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">{t("cta.body")}</p>
            <div className="flex w-full flex-col items-stretch justify-center gap-3 pt-3 sm:w-auto sm:flex-row sm:items-center">
              {contactButtons}
            </div>
            <CornerMarks inset="-4px" className="hidden md:block" />
          </div>
        </Container>
      </section>
    </>
  );
}
