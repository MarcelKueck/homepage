import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CircuitBoard,
  Code,
  Cpu,
  DraftingCompass,
  Drill,
  Droplets,
  Layers,
  RefreshCw,
} from "lucide-react";

import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { Headline } from "@/components/Headline";
import { Button } from "@/components/Button";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { CornerMarks } from "@/components/CornerMarks";
import { Ticker } from "@/components/Ticker";
import { WorkshopTile } from "@/components/WorkshopTile";
import { CALENDAR_URL, EMAIL, PROJECT_LINKS, SITE_URL, SOCIAL_LINKS } from "@/lib/links";
import { FEATURED_PROJECTS, PROJECTS } from "@/lib/projects";
import { photo } from "@/lib/photos";

type Params = { locale: (typeof routing.locales)[number] };

const DISCIPLINES = [
  { key: "mechanics", icon: DraftingCompass },
  { key: "electronics", icon: CircuitBoard },
  { key: "software", icon: Code },
  { key: "ai", icon: Bot },
] as const;

const SOCIALS = [
  { label: "GitHub", href: SOCIAL_LINKS.github },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "X", href: SOCIAL_LINKS.x },
  { label: "Substack", href: SOCIAL_LINKS.substack },
];

export default async function HomePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function rise(step: number): CSSProperties {
  return { "--rise-step": step } as CSSProperties;
}

function HomeContent() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const tp = useTranslations("projects");

  const marieLouLink = (chunks: ReactNode) => (
    <a
      href={PROJECT_LINKS.marieLouCoffee}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link text-text-primary"
    >
      {chunks}
    </a>
  );

  const workshopPhotos = {
    overview: photo("workshopOverview"),
    fdm: photo("workshopFdm"),
    resin: photo("workshopResin"),
    cnc: photo("workshopCnc"),
    electronics: photo("workshopElectronics"),
  };

  return (
    <>
      <PersonJsonLd />

      {/* HERO */}
      <section id="hero" aria-labelledby="hero-headline" className="relative overflow-hidden">
        <div aria-hidden="true" className="blueprint-grid blueprint-fade pointer-events-none absolute inset-0" />
        <Container className="relative">
          <div className="grid items-center gap-14 pb-16 pt-8 md:grid-cols-12 md:gap-10 md:pb-24 md:pt-14 lg:gap-16">
            <div className="flex flex-col gap-6 md:col-span-7">
              <div className="rise" style={rise(0)}>
                <SectionLabel>{t("hero.label")}</SectionLabel>
              </div>
              <div className="rise" style={rise(1)}>
                <Headline
                  as="h1"
                  id="hero-headline"
                  className="display-headline text-balance"
                  before={t("hero.headlineBefore")}
                  accent={t("hero.headlineAccent")}
                  after={t("hero.headlineAfter")}
                />
              </div>
              <div className="rise flex max-w-[38rem] flex-col gap-4" style={rise(2)}>
                <p className="text-lg leading-relaxed text-text-secondary">{t("hero.intro")}</p>
                <p className="text-[0.9375rem] leading-relaxed text-text-tertiary">
                  {t("hero.background")}
                </p>
              </div>
              <div
                className="rise flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center"
                style={rise(3)}
              >
                <Button as="link" href="/work-with-me" variant="primary" arrow="internal" className="w-full sm:w-auto">
                  {tc("startProject")}
                </Button>
                <Button as="link" href="/projects" variant="secondary" className="w-full sm:w-auto">
                  {tc("seeProjects")}
                </Button>
              </div>
            </div>

            <div className="rise md:col-span-5" style={rise(2)}>
              <figure className="relative mx-auto w-full max-w-[400px] md:ml-auto md:mr-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-image)] bg-bg-tertiary">
                  <Image
                    src={photo("heroPortrait")}
                    alt={t("hero.imageAlt")}
                    fill
                    priority
                    sizes="(min-width: 768px) 400px, 90vw"
                    className="object-cover object-[50%_25%]"
                  />
                  <span className="mono-label absolute left-4 top-4 rounded-md bg-bg-primary/75 px-2 py-1 text-text-secondary backdrop-blur-sm">
                    {t("hero.figure")}
                  </span>
                </div>
                <CornerMarks />
                <figcaption className="absolute inset-x-4 bottom-4 overflow-hidden rounded-lg border border-white/10 bg-bg-primary/80 font-mono text-[0.6875rem] uppercase tracking-[0.06em] backdrop-blur-md">
                  <dl className="grid grid-cols-[auto_1fr]">
                    <dt className="border-b border-r border-white/10 px-3 py-2 text-text-tertiary">
                      {t("hero.titleBlock.name")}
                    </dt>
                    <dd className="border-b border-white/10 px-3 py-2 text-text-primary">Marcel Kück</dd>
                    <dt className="border-b border-r border-white/10 px-3 py-2 text-text-tertiary">
                      {t("hero.titleBlock.role")}
                    </dt>
                    <dd className="border-b border-white/10 px-3 py-2 text-text-primary">
                      {t("hero.titleBlock.roleValue")}
                    </dd>
                    <dt className="border-r border-white/10 px-3 py-2 text-text-tertiary">
                      {t("hero.titleBlock.base")}
                    </dt>
                    <dd className="flex items-center justify-between px-3 py-2 text-text-primary">
                      {t("hero.titleBlock.baseValue")}
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </dd>
                  </dl>
                </figcaption>
              </figure>
            </div>
          </div>
        </Container>
        <Ticker items={t.raw("ticker") as string[]} label={t("tickerLabel")} />
      </section>

      {/* DISCIPLINES */}
      <Section id="disciplines" ariaLabelledBy="disciplines-headline">
        <div className="reveal grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-5 md:col-span-6">
            <SectionLabel index="01">{t("disciplines.label")}</SectionLabel>
            <Headline
              id="disciplines-headline"
              before={t("disciplines.headlineBefore")}
              accent={t("disciplines.headlineAccent")}
              after={t("disciplines.headlineAfter")}
            />
          </div>
          <p className="text-lg leading-relaxed text-text-secondary md:col-span-5 md:col-start-8 md:self-end">
            {t("disciplines.body")}
          </p>
        </div>

        <ul className="reveal mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-border sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {DISCIPLINES.map(({ key, icon: Icon }, i) => (
            <li key={key} className="flex flex-col gap-4 bg-bg-primary p-7 transition-colors duration-300 hover:bg-bg-secondary">
              <div className="flex items-center justify-between">
                <Icon size={22} aria-hidden="true" className="text-accent" strokeWidth={1.75} />
                <span className="font-mono text-xs text-text-tertiary">{String.fromCharCode(65 + i)}</span>
              </div>
              <h3 className="pt-4 text-xl font-semibold tracking-tight">
                {t(`disciplines.items.${key}.title`)}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-text-secondary">
                {t(`disciplines.items.${key}.body`)}
              </p>
              <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-5 font-mono text-[0.8125rem] text-text-secondary">
                {(t.raw(`disciplines.items.${key}.points`) as string[]).map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-accent">
                      +
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      {/* WORKSHOP */}
      <Section alt divider id="workshop" ariaLabelledBy="workshop-headline">
        <div className="reveal grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-5 md:col-span-6">
            <SectionLabel index="02">{t("workshop.label")}</SectionLabel>
            <Headline
              id="workshop-headline"
              before={t("workshop.headlineBefore")}
              accent={t("workshop.headlineAccent")}
              after={t("workshop.headlineAfter")}
            />
          </div>
          <p className="text-lg leading-relaxed text-text-secondary md:col-span-5 md:col-start-8 md:self-end">
            {t("workshop.body")}
          </p>
        </div>

        <div className="reveal mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
          <figure className="relative min-h-[320px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg-tertiary md:col-span-2 md:row-span-2 md:min-h-[520px]">
            <Image
              src={workshopPhotos.overview}
              alt={t("workshop.overviewAlt")}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
            <CornerMarks inset="14px" />
            <figcaption className="absolute bottom-6 left-6 flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span className="mono-label text-text-primary">{t("workshop.overviewCaption")}</span>
            </figcaption>
          </figure>

          <WorkshopTile
            index="W-01"
            title={t("workshop.items.fdm.title")}
            body={t("workshop.items.fdm.body")}
            icon={<Layers size={20} strokeWidth={1.75} />}
            image={workshopPhotos.fdm}
          />
          <WorkshopTile
            index="W-02"
            title={t("workshop.items.resin.title")}
            body={t("workshop.items.resin.body")}
            icon={<Droplets size={20} strokeWidth={1.75} />}
            image={workshopPhotos.resin}
          />
          <WorkshopTile
            index="W-03"
            title={t("workshop.items.cnc.title")}
            body={t("workshop.items.cnc.body")}
            icon={<Drill size={20} strokeWidth={1.75} />}
            image={workshopPhotos.cnc}
          />
          <WorkshopTile
            index="W-04"
            title={t("workshop.items.electronics.title")}
            body={t("workshop.items.electronics.body")}
            icon={<Cpu size={20} strokeWidth={1.75} />}
            image={workshopPhotos.electronics}
          />

          <article className="relative flex flex-col gap-4 overflow-hidden rounded-[var(--radius-card)] border border-accent/40 bg-accent/[0.06] p-6">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/50 text-accent">
                <RefreshCw size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="font-mono text-xs text-text-tertiary">W-05</span>
            </div>
            <h3 className="pt-3 text-lg font-semibold tracking-tight">{t("workshop.loop.title")}</h3>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-[0.06em] text-text-primary">
              {(t.raw("workshop.loop.steps") as string[]).map((step, i, all) => (
                <li key={step} className="flex items-center gap-2">
                  {step}
                  {i < all.length - 1 ? (
                    <ArrowRight size={12} aria-hidden="true" className="text-accent" />
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="text-[0.9375rem] leading-relaxed text-text-secondary">{t("workshop.loop.body")}</p>
          </article>
        </div>
      </Section>

      {/* SELECTED WORK */}
      <Section divider id="work" ariaLabelledBy="work-headline">
        <div className="reveal flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-5">
            <SectionLabel index="03">{t("work.label")}</SectionLabel>
            <Headline
              id="work-headline"
              before={t("work.headlineBefore")}
              accent={t("work.headlineAccent")}
              after={t("work.headlineAfter")}
            />
            <p className="text-lg leading-relaxed text-text-secondary">{t("work.body")}</p>
          </div>
          <Button as="link" href="/projects" variant="secondary" arrow="internal" className="self-start md:self-auto">
            {tc("allProjects")}
          </Button>
        </div>

        <ul className="mt-12 grid gap-x-6 gap-y-12 md:mt-16 md:grid-cols-2">
          {FEATURED_PROJECTS.map((key, i) => {
            const project = PROJECTS[key];
            return (
              <li key={key} className="reveal group flex flex-col gap-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-image)] border border-border bg-bg-tertiary">
                  <Image
                    src={project.image}
                    alt={tp(`items.${key}.title`)}
                    fill
                    sizes="(min-width: 768px) 600px, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="mono-label absolute left-4 top-4 rounded-md bg-bg-primary/80 px-2 py-1 text-text-secondary backdrop-blur-sm">
                    {String(i + 1).padStart(2, "0")} / {String(FEATURED_PROJECTS.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="mono-label text-accent">
                    {project.categories.map((c) => tp(`filters.${c}`)).join(" · ")}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight">{tp(`items.${key}.title`)}</h3>
                  <p className="max-w-xl text-text-secondary">{tp(`items.${key}.summary`)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* ABOUT */}
      <Section alt divider id="about" ariaLabelledBy="about-headline">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="reveal order-2 md:order-1 md:col-span-5">
            <div className="grid grid-cols-2 gap-4 md:sticky md:top-28">
              <div className="relative aspect-[3/5] overflow-hidden rounded-[var(--radius-image)] border border-border bg-bg-tertiary">
                <Image
                  src="/photos/lab-research.jpg"
                  alt={t("about.imageAltLab")}
                  fill
                  sizes="(min-width: 768px) 240px, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="relative mt-12 aspect-[3/5] overflow-hidden rounded-[var(--radius-image)] border border-border bg-bg-tertiary">
                <Image
                  src="/photos/robot.jpg"
                  alt={t("about.imageAltRobot")}
                  fill
                  sizes="(min-width: 768px) 240px, 45vw"
                  className="object-cover object-[45%_50%]"
                />
              </div>
            </div>
          </div>

          <div className="reveal order-1 flex flex-col gap-5 md:order-2 md:col-span-7">
            <SectionLabel index="04">{t("about.label")}</SectionLabel>
            <Headline
              id="about-headline"
              before={t("about.headlineBefore")}
              accent={t("about.headlineAccent")}
              after={t("about.headlineAfter")}
            />
            <div className="flex max-w-[40rem] flex-col gap-5 pt-2 text-text-secondary">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t.rich("about.p3", { marieLou: marieLouLink })}</p>
            </div>
            <div className="pt-3">
              <Button as="link" href="/work-with-me" variant="primary" arrow="internal">
                {tc("workWithMe")}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <section id="contact" aria-labelledby="contact-headline" className="section-padding relative overflow-hidden border-t border-border">
        <div aria-hidden="true" className="blueprint-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_20%,transparent_75%)]" />
        <Container className="relative">
          <div className="reveal mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <SectionLabel index="05">{t("contact.label")}</SectionLabel>
            <Headline
              as="h2"
              id="contact-headline"
              className="display-headline text-balance"
              before={t("contact.headlineBefore")}
              accent={t("contact.headlineAccent")}
              after={t("contact.headlineAfter")}
            />
            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">{t("contact.body")}</p>
            <div className="flex w-full flex-col items-stretch justify-center gap-3 pt-3 sm:w-auto sm:flex-row sm:items-center">
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
            </div>
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3 pt-6">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.08em] text-text-tertiary transition-colors hover:text-text-primary"
                  >
                    {s.label}
                    <ArrowUpRight
                      size={13}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}

function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcel Kück",
    jobTitle: "Independent R&D Engineer",
    url: SITE_URL,
    email: `mailto:${EMAIL}`,
    image: `${SITE_URL}/photos/profile1.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Munich",
      addressCountry: "DE",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Technical University of Munich",
    },
    knowsAbout: [
      "Prototype development",
      "Mechanical design",
      "3D printing",
      "CNC machining",
      "Embedded systems",
      "Robotics",
      "Machine learning",
      "AI agents",
      "Workflow automation",
    ],
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.x, SOCIAL_LINKS.substack],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
