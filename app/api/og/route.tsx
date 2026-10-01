import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const COPY: Record<string, { label: string; before: string; accent: string; sub: string }> = {
  en: {
    label: "Independent R&D Engineer · Munich",
    before: "From idea to",
    accent: "working prototype.",
    sub: "Mechanics · Electronics · Software · AI",
  },
  de: {
    label: "Freiberuflicher R&D Engineer · München",
    before: "Von der Idee zum",
    accent: "funktionierenden Prototyp.",
    sub: "Mechanik · Elektronik · Software · KI",
  },
};

const GRID = "rgba(91, 123, 213, 0.12)";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") === "de" ? "de" : "en";
  const { label, before, accent, sub } = COPY[locale];

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
          backgroundImage: `linear-gradient(to right, ${GRID} 1px, transparent 1px), linear-gradient(to bottom, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: "#FF3B3B" }} />
          <div
            style={{
              color: "#A4ACBB",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {label}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#F4F5F7", fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {before}
          </div>
          <div style={{ color: "#FF3B3B", fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {accent}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #2A3349",
            paddingTop: 28,
            color: "#A4ACBB",
            fontSize: 26,
          }}
        >
          <div style={{ color: "#F4F5F7", fontWeight: 700 }}>Marcel Kück</div>
          <div>{sub}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
