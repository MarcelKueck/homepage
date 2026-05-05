import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { Headline } from "@/components/Headline";
import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "@/i18n/routing";
import { PROJECT_LINKS, SITE_URL } from "@/lib/links";

type Params = { locale: (typeof routing.locales)[number] };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${SITE_URL}/${locale}/${locale === "de" ? "projekte" : "projects"}`,
      languages: {
        en: "/en/projects",
        de: "/de/projekte",
        "x-default": "/en/projects",
      },
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsContent />;
}

const PROJECT_KEYS = [
  "motionSports",
  "rechnungsApi",
  "shareYourSpace",
  "openArm",
  "coffeeRoaster",
  "leRobot",
] as const;

const IMAGES: Record<(typeof PROJECT_KEYS)[number], string> = {
  // TODO: Replace with real photo
  motionSports: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
  // TODO: Replace with real photo
  rechnungsApi: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
  // TODO: Replace with real photo
  shareYourSpace: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
  // TODO: Replace with real photo
  openArm: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=500&fit=crop",
  // TODO: Replace with real photo
  coffeeRoaster: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop",
  // TODO: Replace with real photo
  leRobot: "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=800&h=500&fit=crop",
};

const CTA_HREFS: Record<(typeof PROJECT_KEYS)[number], string | undefined> = {
  motionSports: undefined,
  rechnungsApi: PROJECT_LINKS.rechnungsApi,
  shareYourSpace: PROJECT_LINKS.shareYourSpace,
  openArm: PROJECT_LINKS.openArm,
  coffeeRoaster: PROJECT_LINKS.coffeeRoaster,
  leRobot: PROJECT_LINKS.leRobot,
};

function ProjectsContent() {
  const t = useTranslations("projects");

  return (
    <>
      <Section ariaLabelledBy="projects-headline">
        <div className="flex max-w-3xl flex-col gap-6">
          <SectionLabel>{t("label")}</SectionLabel>
          <Headline
            as="h1"
            id="projects-headline"
            className="display-headline text-balance"
            before={t("headlineBefore")}
            accent={t("headlineAccent")}
            after={t("headlineAfter")}
          />
          <p className="text-text-secondary">{t("intro")}</p>
          <Link
            href="/work-with-me"
            className="inline-flex w-fit items-center text-sm font-semibold text-accent hover:text-accent-hover"
          >
            {t("freelanceLink")}
          </Link>
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-8 md:grid-cols-2">
          {PROJECT_KEYS.map((key) => {
            const title = t(`items.${key}.title`);
            const desc = t(`items.${key}.description`);
            const tags = t.raw(`items.${key}.tags`) as string[];
            const ctaLabel = t(`items.${key}.ctaLabel`);
            const href = CTA_HREFS[key];
            return (
              <ProjectCard
                key={key}
                title={title}
                description={desc}
                tags={tags}
                image={{ src: IMAGES[key], alt: title }}
                cta={{
                  label: ctaLabel,
                  href,
                  disabled: !href,
                }}
              />
            );
          })}
        </div>
      </Section>
    </>
  );
}
