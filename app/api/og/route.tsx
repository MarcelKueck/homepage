import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const COPY: Record<string, { headline: string; sub: string }> = {
  en: {
    headline: "Automation & AI for businesses that want to ship.",
    sub: "Marcel Kück — Freelance Automation & AI Engineer · Munich",
  },
  de: {
    headline: "Automatisierung & KI für Unternehmen, die liefern wollen.",
    sub: "Marcel Kück — Freiberuflicher Automatisierungs- & KI-Engineer · München",
  },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") === "de" ? "de" : "en";
  const { headline, sub } = COPY[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0E1A",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "#FF3B3B",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          marcel.developer
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            display: "flex",
          }}
        >
          {headline}
        </div>
        <div
          style={{
            color: "#9CA3AF",
            fontSize: 28,
            fontWeight: 400,
          }}
        >
          {sub}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
