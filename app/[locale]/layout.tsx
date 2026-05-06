import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = "https://marcelkueck.dev";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) return {};
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("metaTitle"),
      template: "%s — Marcel Kueck",
    },
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        de: "/de",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      siteName: "Marcel Kueck",
      title: t("metaTitle"),
      description: t("metaDescription"),
      locale: locale === "de" ? "de_DE" : "en_US",
      images: [
        {
          url: `/api/og?locale=${locale}`,
          width: 1200,
          height: 630,
          alt: "Marcel Kueck — Automation & AI Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("metaTitle"),
      description: t("metaDescription"),
      images: [`/api/og?locale=${locale}`],
    },
    icons: {
      icon: "/freelancer_icon.svg",
      shortcut: "/freelancer_icon.svg",
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a href="#main" className="skip-link">
            {t("skipToContent")}
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
