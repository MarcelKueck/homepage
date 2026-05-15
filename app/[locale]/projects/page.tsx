import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
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
  "oxfordBioreactor",
  "motionSports",
  "rechnungsApi",
  "shareYourSpace",
  "openArm",
  "leRobot",
  "rustyRobots",
  "rustML",
  "laMarcello",
  "murph",
  "coffeeRoaster",
  "svEsting",
] as const;

const IMAGES: Record<(typeof PROJECT_KEYS)[number], string> = {
  oxfordBioreactor: "/projects/oxford-bioreactor.jpg",
  motionSports: "/projects/motion-sports-16-10.jpg",
  rechnungsApi: "/projects/rechnungs-api.jpg",
  shareYourSpace: "/projects/share-your-space.jpg",
  openArm: "/projects/open-arm.jpg",
  leRobot: "/projects/le-robot.jpg",
  rustyRobots: "/projects/rusty-robots.jpg",
  rustML: "/projects/rust-ml.jpg",
  laMarcello: "/projects/la-marcello.jpg",
  murph: "/projects/murph.jpg",
  coffeeRoaster: "/projects/coffee-roaster.jpg",
  svEsting: "/projects/sv-esting.jpg",
};

const CTA_HREFS: Record<(typeof PROJECT_KEYS)[number], string | undefined> = {
  oxfordBioreactor: undefined,
  motionSports: undefined,
  rechnungsApi: PROJECT_LINKS.rechnungsApi,
  shareYourSpace: PROJECT_LINKS.shareYourSpace,
  openArm: PROJECT_LINKS.openArm,
  leRobot: PROJECT_LINKS.leRobot,
  rustyRobots: PROJECT_LINKS.rustyRobots,
  rustML: PROJECT_LINKS.rustML,
  laMarcello: PROJECT_LINKS.laMarcello,
  murph: PROJECT_LINKS.murph,
  coffeeRoaster: PROJECT_LINKS.coffeeRoaster,
  svEsting: PROJECT_LINKS.svEsting,
};

function ProjectsContent() {
  const t = useTranslations("projects");

  return (
    <>
      <Section snap={false}>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
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
