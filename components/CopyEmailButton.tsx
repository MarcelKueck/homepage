"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";

const EMAIL = "hello@marcelkueck.dev";

export function CopyEmailButton({ className = "" }: { className?: string }) {
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

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy email address ${EMAIL}`}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-button-bg px-6 py-3 text-sm font-semibold text-button-text transition-colors hover:bg-text-secondary ${className}`}
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
    </button>
  );
}
