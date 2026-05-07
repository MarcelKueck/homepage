"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Container } from "./Container";
import { LocaleToggle } from "./LocaleToggle";

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-border bg-bg-primary/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav aria-label="Primary" className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center" aria-label="marcel.developer – home">
            <Image
              src="/freelancer_logo_white_text.svg"
              alt="marcel.developer"
              width={840}
              height={192}
              priority
              className="h-48 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
              {t("home")}
            </Link>
            <Link href="/projects" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
              {t("projects")}
            </Link>
            <Link href="/build-log" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
              {t("buildLog")}
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LocaleToggle />
            <Link
              href="/work-with-me"
              className="inline-flex items-center justify-center rounded-full bg-button-bg px-5 py-2 text-sm font-semibold text-button-text transition-colors hover:bg-text-secondary"
            >
              {t("workWithMe")}
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </Container>

      {open ? (
        <div className="md:hidden">
          <Container>
            <div className="flex flex-col gap-2 pb-6 pt-2">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-text-primary hover:bg-bg-secondary"
              >
                {t("home")}
              </Link>
              <Link
                href="/projects"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-text-primary hover:bg-bg-secondary"
              >
                {t("projects")}
              </Link>
              <Link
                href="/build-log"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-text-primary hover:bg-bg-secondary"
              >
                {t("buildLog")}
              </Link>
              <Link
                href="/work-with-me"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-button-bg px-5 py-3 text-sm font-semibold text-button-text"
              >
                {t("workWithMe")}
              </Link>
              <div className="mt-3">
                <LocaleToggle />
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
