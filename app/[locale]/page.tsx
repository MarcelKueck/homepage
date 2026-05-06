import Image from "next/image";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Github, Linkedin, Twitter, BookOpen } from "lucide-react";

import { routing } from "@/i18n/routing";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { Headline } from "@/components/Headline";
import { Button } from "@/components/Button";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { PhotoGridItem } from "@/components/PhotoGridItem";
import { SocialCard } from "@/components/SocialCard";
import { CALENDAR_URL, SOCIAL_LINKS, SITE_URL } from "@/lib/links";

const WORKED_WITH: Array<{ name: string; domain: string }> = [
  { name: "TU Munich", domain: "tum.de" },
  { name: "Siemens", domain: "siemens.com" },
  { name: "Devanthro", domain: "devanthro.com" },
  { name: "University of Oxford", domain: "ox.ac.uk" },
  { name: "Motion Sports", domain: "motionsports.de" },
];

const PHOTOS = [
  // TODO: Replace with real photo
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
  // TODO: Replace with real photo
  "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&h=400&fit=crop",
  // TODO: Replace with real photo
  "https://images.unsplash.com/photo-1527430253228-e93688616381?w=400&h=400&fit=crop",
  // TODO: Replace with real photo
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop",
  // TODO: Replace with real photo
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop",
  // TODO: Replace with real photo
  "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400&h=400&fit=crop",
  // TODO: Replace with real photo
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop",
  // TODO: Replace with real photo
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop",
];

type Params = { locale: (typeof routing.locales)[number] };

export default async function HomePage({ params }: { params: Promise<Params> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const captions = t.raw("photoGrid.captions") as string[];

  return (
    <>
      <PersonJsonLd />

      {/* HERO */}
      <Section as="section" id="hero" ariaLabelledBy="hero-headline" nextSection="#featured">
        <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div className="md:col-span-5">
            {/* TODO: Replace with real photo */}
            <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-[24px] bg-bg-secondary md:max-w-[440px]">
              <Image
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=600&fit=crop"
                alt={t("hero.imageAlt")}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 md:col-span-7 md:gap-6">
            <SectionLabel>{t("hero.label")}</SectionLabel>
            <Headline
              as="h1"
              id="hero-headline"
              className="display-headline text-balance"
              before={t("hero.headlineBefore")}
              accent={t("hero.headlineAccent")}
              after={t("hero.headlineAfter")}
            />
            <p className="max-w-prose text-text-secondary">{t("hero.body")}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Button as="link" href="/work-with-me" variant="primary" className="w-full sm:w-auto">
                {tc("workWithMe")}
              </Button>
              <Button as="link" href="/projects" variant="secondary" className="w-full sm:w-auto">
                {tc("seeProjects")}
              </Button>
            </div>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {tc("bookDiscoveryCall")}
            </a>
          </div>
        </div>
      </Section>

      {/* FEATURED PROJECT */}
      <Section alt id="featured" ariaLabelledBy="featured-headline" nextSection="#about">
        <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div className="order-2 flex flex-col gap-5 md:order-1 md:gap-6">
            <SectionLabel>{t("featured.label")}</SectionLabel>
            <Headline
              id="featured-headline"
              before={t("featured.headlineBefore")}
              accent={t("featured.headlineAccent")}
              after={t("featured.headlineAfter")}
            />
            <p className="max-w-prose text-text-secondary">{t("featured.body")}</p>
            <div className="pt-2">
              <span className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-tertiary">
                {tc("caseStudyComingSoon")}
              </span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            {/* TODO: Replace with real photo (Motion Sports screenshot) */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[600px] overflow-hidden rounded-[24px] bg-bg-tertiary">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                alt={t("featured.imageAlt")}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" ariaLabelledBy="about-headline" nextSection="#worked-with">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <div>
            {/* TODO: Replace with real photo */}
            <div className="relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[24px] bg-bg-secondary">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop"
                alt={t("about.imageAlt")}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <SectionLabel>{t("about.label")}</SectionLabel>
            <Headline
              id="about-headline"
              before={t("about.headlineBefore")}
              accent={t("about.headlineAccent")}
              after={t("about.headlineAfter")}
            />
            <p className="max-w-prose text-text-secondary">{t("about.p1")}</p>
            <p className="max-w-prose text-text-secondary">{t("about.p2")}</p>
            <div className="pt-2">
              <Button as="link" href="/work-with-me" variant="primary">
                {tc("workWithMe")}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* WORKED WITH */}
      <Section alt id="worked-with" nextSection="#photos">
        <div className="flex flex-col items-center gap-10 text-center">
          <SectionLabel>{t("workedWith.label")}</SectionLabel>
          {/* TODO: Swap Google favicon URLs for high-resolution SVG logos in /public/logos/. */}
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-14">
            {WORKED_WITH.map(({ name, domain }) => (
              <li key={name} className="flex items-center justify-center" title={name}>
                <Image
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
                  alt={name}
                  width={48}
                  height={48}
                  unoptimized
                  className="h-10 w-10 object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12 sm:w-12"
                />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* PHOTO GRID */}
      <Section id="photos" ariaLabelledBy="photo-grid-label" nextSection="#social">
        <h2 id="photo-grid-label" className="sr-only">
          Life in photos
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {PHOTOS.map((src, i) => (
            <PhotoGridItem key={src} src={src} alt={captions[i] ?? ""} />
          ))}
        </div>
      </Section>

      {/* SOCIAL */}
      <Section alt id="social" ariaLabelledBy="social-headline" nextSection="#contact">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <SectionLabel>{t("social.label")}</SectionLabel>
            <Headline
              id="social-headline"
              before={t("social.headlineBefore")}
              accent={t("social.headlineAccent")}
              after={t("social.headlineAfter")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            <SocialCard href={SOCIAL_LINKS.github} label="GitHub" icon={<Github size={28} />} />
            <SocialCard href={SOCIAL_LINKS.linkedin} label="LinkedIn" icon={<Linkedin size={28} />} />
            <SocialCard href={SOCIAL_LINKS.x} label="X / Twitter" icon={<Twitter size={28} />} />
            <SocialCard href={SOCIAL_LINKS.substack} label="Substack" icon={<BookOpen size={28} />} />
          </div>
        </div>
      </Section>

      {/* FINAL CTA — snap disabled so the footer is reachable below it */}
      <Section snap={false} id="contact" ariaLabelledBy="cta-headline">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Headline
            id="cta-headline"
            className="display-headline text-balance"
            before={t("finalCta.headlineBefore")}
            accent={t("finalCta.headlineAccent")}
            after={t("finalCta.headlineAfter")}
          />
          <p className="max-w-prose text-text-secondary">{t("finalCta.body")}</p>
          <div className="flex w-full flex-col items-stretch justify-center gap-3 pt-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <CopyEmailButton className="w-full sm:w-auto" />
            <Button
              as="a"
              href={CALENDAR_URL}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              {tc("bookCall")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marcel Kueck",
    jobTitle: "Freelance Automation & AI Engineer",
    url: SITE_URL,
    email: "mailto:hello@marcelkueck.dev",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Munich",
      addressCountry: "DE",
    },
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.x,
      SOCIAL_LINKS.substack,
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
