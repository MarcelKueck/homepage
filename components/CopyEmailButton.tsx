"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { EMAIL } from "@/lib/links";

export function CopyEmailButton({
  className = "",
  variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const t = useTranslations("common");
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  const variantClasses =
    variant === "primary"
      ? "bg-button-bg text-button-text hover:bg-white"
      : "border border-border-strong text-text-primary hover:border-text-primary hover:bg-text-primary hover:text-button-text";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={t("copyEmailLabel", { email: EMAIL })}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-200 ${variantClasses} ${className}`}
    >
      {copied ? (
        <>
          <Check size={16} aria-hidden="true" />
          <span>{t("copied")}</span>
        </>
      ) : (
        <>
          <Copy size={16} aria-hidden="true" />
          <span>{EMAIL}</span>
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? t("copied") : ""}
      </span>
    </button>
  );
}
