# marcelkueck.dev

Personal website of Marcel Kück, independent R&D engineer in Munich.

## Stack

- **Next.js 16** (App Router, React Server Components, static generation)
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first via `@theme` in `app/globals.css`, no `tailwind.config.js`)
- **next-intl v4** (localized pathnames for `en` and `de`)
- **next/font**: Geist Sans, Geist Mono, Instrument Serif (italic accents)
- **lucide-react** (icons), **@vercel/analytics**, **@vercel/og** (share image at `/api/og`)

## Develop locally

```bash
pnpm install
pnpm dev        # http://localhost:3000, redirects to /en or /de
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint       # eslint
```

## Routes

| Path                                      | Purpose                                   |
| ----------------------------------------- | ----------------------------------------- |
| `/en`, `/de`                              | Home                                      |
| `/en/projects`, `/de/projekte`            | All projects with category filter         |
| `/en/work-with-me`, `/de/zusammenarbeit`  | Services, process, toolbox, recent work   |
| `/en/build-log`, `/de/build-log`          | Substack landing page                     |
| `/en/impressum`, `/de/impressum`          | Legal notice                              |
| `/en/privacy`, `/de/datenschutz`          | Privacy policy                            |
| `/sitemap.xml`, `/robots.txt`             | SEO                                       |
| `/api/og?locale=en\|de`                   | Open Graph image (1200×630)               |

## Where things live

| What                         | File                                                     |
| ---------------------------- | -------------------------------------------------------- |
| All page copy (EN / DE)      | `messages/en.json`, `messages/de.json` (keep in sync)    |
| Projects: order, images, categories, links | `lib/projects.ts`                         |
| Featured projects on home    | `FEATURED_PROJECTS` in `lib/projects.ts`                 |
| External links, email        | `lib/links.ts`                                           |
| Photo slots (see below)      | `lib/photos.ts`                                          |
| Design tokens                | `@theme` block in `app/globals.css`                      |
| Share image text             | `app/api/og/route.tsx`                                   |

To add a project: add an entry to `lib/projects.ts` and an `items.<key>` block with
`title`, `description`, `tags` and `ctaLabel` to both message files. A `summary` is
only needed if the project is featured on the home page.

## Adding photos

Some photos don't exist yet. Save a file under one of these paths and it is picked
up automatically on the next build, no code change needed. Until then the fallback
is shown (or an icon tile for the workshop machines).

| Save as                              | Used for                         | Format                       |
| ------------------------------------ | -------------------------------- | ---------------------------- |
| `public/photos/portrait-workshop.jpg`| Hero portrait                    | Portrait 4:5, ≥ 1200 × 1500  |
| `public/workshop/overview.jpg`       | Large workshop photo             | Landscape 3:2, ≥ 2000 px wide|
| `public/workshop/fdm-printer.jpg`    | FDM 3D printing tile             | Landscape 16:10, ≥ 1200 px   |
| `public/workshop/resin-printer.jpg`  | Resin 3D printing tile           | Landscape 16:10, ≥ 1200 px   |
| `public/workshop/cnc.jpg`            | CNC machining tile               | Landscape 16:10, ≥ 1200 px   |
| `public/workshop/electronics.jpg`    | Electronics bench tile           | Landscape 16:10, ≥ 1200 px   |

All images go through `next/image`, so large originals are fine; they are resized
and converted to modern formats on request.

## Assets referenced from outside the site

`public/icons/logo-email.png` and `public/icons/photo-half-circle.png` are used in the
email signature. Don't rename or delete them.

## Deploy

Hosted on Vercel. Push to `main`; Vercel builds with `pnpm build`. No environment
variables are required.
