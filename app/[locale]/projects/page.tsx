import type { Metadata } from "next";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { SectionLabel } from "@/components/SectionLabel";
import { Headline } from "@/components/Headline";
import { Button } from "@/components/Button";
import { CopyEmailButton } from "@/components/CopyEmailButton";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFilter } from "@/components/ProjectFilter";
import { PROJECT_LINKS, SITE_URL } from "@/lib/links";
import { PROJECT_CATEGORIES, PROJECT_KEYS, PROJECTS } from "@/lib/projects";

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

function ProjectsContent() {
  const t = useTranslations("projects");
  const tc = useTranslations("common");

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

  const filters = [
    { key: "all", label: t("filters.all"), count: PROJECT_KEYS.length },
    ...PROJECT_CATEGORIES.map((c) => ({
      key: c,
      label: t(`filters.${c}`),
      count: PROJECT_KEYS.filter((k) => PROJECTS[k].categories.includes(c)).length,
    })),
  ];

  return (
    <>
      <section aria-labelledby="projects-headline" className="relative overflow-hidden">
        <div aria-hidden="true" className="blueprint-grid blueprint-fade pointer-events-none absolute inset-0" />
        <Container className="relative pb-12 pt-10 md:pb-16 md:pt-16">
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
            <p className="max-w-2xl text-lg leading-relaxed text-text-secondary">{t("intro")}</p>
          </div>
        </Container>
      </section>

      <Section className="pt-0">
        <ProjectFilter filters={filters} groupLabel={t("filterLabel")}>
          {PROJECT_KEYS.map((key, i) => {
            const project = PROJECTS[key];
            const title = t(`items.${key}.title`);
            return (
              <ProjectCard
                key={key}
                index={i + 1}
                title={title}
                description={t.rich(`items.${key}.description`, { marieLou: marieLouLink })}
                tags={t.raw(`items.${key}.tags`) as string[]}
                categories={project.categories}
                categoryLabels={project.categories.map((c) => t(`filters.${c}`))}
                image={{ src: project.image, alt: title }}
                cta={{ label: t(`items.${key}.ctaLabel`), href: project.href }}
              />
            );
          })}
        </ProjectFilter>
      </Section>

      <Section divider ariaLabelledBy="projects-cta-headline">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Headline
            id="projects-cta-headline"
            className="section-headline text-balance"
            before={t("cta.headlineBefore")}
            accent={t("cta.headlineAccent")}
            after={t("cta.headlineAfter")}
          />
          <p className="text-lg text-text-secondary">{t("cta.body")}</p>
          <div className="flex w-full flex-col items-stretch justify-center gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center">
            <CopyEmailButton className="w-full sm:w-auto" />
            <Button as="link" href="/work-with-me" variant="secondary" arrow="internal" className="w-full sm:w-auto">
              {tc("workWithMe")}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
