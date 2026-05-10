# marcelkueck.dev

Personal freelance website for Marcel Kueck — Automation & AI Engineer based in Munich.

## Stack

- **Next.js 15** (App Router, RSC)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first via `@theme` in `app/globals.css` — no `tailwind.config.js`)
- **next-intl v3** (localized pathnames for `en` and `de`)
- **next/font** (Geist Sans + Geist Mono)
- **lucide-react** (icons)
- **@vercel/analytics** (privacy-friendly analytics)
- **@vercel/og** (dynamic Open Graph image at `/api/og`)

## Develop locally

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000> — the root redirects to `/en` (or `/de` based on `Accept-Language`).

```bash
pnpm build       # production build
pnpm start       # serve production build
pnpm lint        # next lint
```

## Routes

| Path                       | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| `/`                        | Locale redirect (`/en` or `/de`)         |
| `/en`, `/de`               | Home                                     |
| `/en/projects`, `/de/projekte` | Projects list                        |
| `/en/work-with-me`, `/de/zusammenarbeit` | Services + case studies     |
| `/en/build-log`, `/de/build-log` | Substack landing + meta refresh    |
| `/en/impressum`, `/de/impressum` | Legal notice (German law)          |
| `/en/privacy`, `/de/datenschutz` | Privacy policy                     |
| `/sitemap.xml`             | Sitemap with hreflang alternates         |
| `/robots.txt`              | Robots                                   |
| `/api/og?locale=en|de`     | Dynamic OG image (1200×630)              |

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel — no environment variables required.
3. Vercel auto-detects Next.js. Build command: `pnpm build`. Output: managed by Vercel.
4. After the first deploy, connect the `marcelkueck.dev` domain in the Vercel dashboard.

## Where to swap real assets

Every placeholder is a `// TODO:` comment so they are easy to grep:

```bash
grep -rn "TODO:" app components lib messages
```

### Photos

All Unsplash placeholder URLs live next to a `// TODO: Replace with real photo` comment.

- **Hero portrait** — `app/[locale]/page.tsx` (HERO section)
- **Featured project image** — `app/[locale]/page.tsx` (FEATURED section, also in `app/[locale]/work-with-me/page.tsx`)
- **About portrait** — `app/[locale]/page.tsx` (ABOUT section)
- **8-photo life grid** — `PHOTOS` array at the top of `app/[locale]/page.tsx`
- **Project card images** — `IMAGES` map in `app/[locale]/projects/page.tsx`

When real images arrive, replace the URLs and remove the `// TODO:` comments. The `next/image` configuration in `next.config.ts` already allows `images.unsplash.com`; if real assets live elsewhere, add their hostname to `images.remotePatterns`.

### Links

External links live in `lib/links.ts`:

- `CALENDAR_URL` — Google Calendar scheduler URL
- `SOCIAL_LINKS.github` / `linkedin` / `x` — confirm handles match real accounts
- `PROJECT_LINKS.openArm` / `coffeeRoaster` / `leRobot` — set real GitHub URLs

### Legal pages

- `app/[locale]/impressum/page.tsx` — fill the `[PLACEHOLDER: …]` lines (street, ZIP, phone, VAT ID).
- `app/[locale]/privacy/page.tsx` — review with a German privacy resource (e.g. e-recht24.de generator) before going live.

### Copy

All page copy is in `messages/en.json` and `messages/de.json`. Both languages are required to be in sync — there is no fallback locale.

## TODO markers in the codebase

Run `grep -rn "TODO:" app components lib messages` to see them all. Categories:


- `// TODO: confirm handle` — social URLs in `lib/links.ts`
- `// TODO: replace with real <project> GitHub URL` — `lib/links.ts`
- `// TODO: Replace with real photo` — every `<Image>` placeholder
- `// TODO: Replace with real photo (Motion Sports screenshot)` — featured/case-study image
- `// TODO: Marcel must fill in placeholders … before this page is published.` — top of `app/[locale]/impressum/page.tsx`
- `// TODO: Marcel — review with a German privacy resource …` — top of `app/[locale]/privacy/page.tsx`
- `[PLACEHOLDER: …]` — inline text placeholders in the Impressum page

## Project structure

```
app/
  [locale]/
    layout.tsx            // html/body, Nav, Footer, NextIntlClientProvider
    page.tsx              // Home
    projects/page.tsx     // Projects list (canonical EN slug)
    work-with-me/page.tsx // Services + case studies
    build-log/page.tsx    // Substack landing + meta refresh
    impressum/page.tsx
    privacy/page.tsx
    not-found.tsx
  api/og/route.tsx        // Edge-runtime OG image
  layout.tsx              // Pass-through root layout
  not-found.tsx           // Global 404 (own html/body)
  globals.css             // Tailwind v4 + @theme tokens
  robots.ts
  sitemap.ts
components/               // Button, Container, Nav, Footer, ProjectCard, …
i18n/                     // routing.ts (pathnames) + request.ts
lib/                      // links.ts (URLs, email, site URL)
messages/                 // en.json, de.json
middleware.ts             // next-intl middleware
next.config.ts
postcss.config.mjs
```

## Design tokens

Defined in `app/globals.css` under `@theme`:

| Token                    | Value     |
| ------------------------ | --------- |
| `--color-bg-primary`     | `#0A0E1A` |
| `--color-bg-secondary`   | `#11162A` |
| `--color-bg-tertiary`    | `#1A2138` |
| `--color-text-primary`   | `#FFFFFF` |
| `--color-text-secondary` | `#9CA3AF` |
| `--color-text-tertiary`  | `#6B7280` |
| `--color-accent`         | `#FF3B3B` |
| `--color-accent-hover`   | `#E62E2E` |
| `--color-border`         | `#1F2937` |

All Tailwind utilities (`bg-bg-primary`, `text-accent`, …) are auto-generated from these tokens.
