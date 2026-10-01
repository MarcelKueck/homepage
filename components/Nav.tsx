"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { Container } from "./Container";
import { LocaleToggle } from "./LocaleToggle";

const NAV_ITEMS = [
  { key: "projects", href: "/projects" },
  { key: "workshop", href: { pathname: "/", hash: "workshop" } },
  { key: "about", href: { pathname: "/", hash: "about" } },
  { key: "buildLog", href: "/build-log" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
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

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function isActive(href: (typeof NAV_ITEMS)[number]["href"]) {
    return typeof href === "string" && pathname === href;
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-border bg-bg-primary/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <Link href="/" className="group flex items-center gap-3" aria-label={t("homeLabel")}>
            <Image
              src="/icons/mark.png"
              alt=""
              width={240}
              height={116}
              priority
              className="h-6 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-[0.9375rem] font-semibold tracking-tight text-text-primary">
              Marcel Kück
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`text-sm transition-colors hover:text-text-primary ${
                    isActive(item.href) ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <LocaleToggle />
            <Link
              href="/work-with-me"
              className="inline-flex items-center justify-center rounded-full bg-button-bg px-5 py-2 text-sm font-semibold text-button-text transition-colors hover:bg-white"
            >
              {t("workWithMe")}
            </Link>
          </div>

          <button
            type="button"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-text-primary md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </Container>

      {open ? (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto md:hidden">
          <Container>
            <ul className="flex flex-col border-t border-border pt-4">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.key} className="border-b border-border">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4 text-2xl font-semibold tracking-tight text-text-primary"
                  >
                    <span className="font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-5 pb-10 pt-8">
              <Link
                href="/work-with-me"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-button-bg px-5 py-3.5 text-sm font-semibold text-button-text"
              >
                {t("workWithMe")}
              </Link>
              <LocaleToggle className="self-start" />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
