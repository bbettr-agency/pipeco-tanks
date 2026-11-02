# Pipeco Tanks South Africa — Website

Marketing + lead-generation website for **Pipeco Tanks South Africa**, a supplier and
installer of sectional water tanks offering complete turnkey water-storage solutions.

> **Accuracy note.** Pipeco's sectional tanks are **manufactured in Malaysia**. Pipeco
> **South Africa supplies and installs** the tanks and provides **turnkey solutions**,
> including locally built **civil foundations** and **elevated steel stands**. Do not
> describe the South African business as a local tank manufacturer.

---

## 1. Project overview

A bespoke, single-page (homepage) industrial website built on the Bbettr Website OS
foundation. It presents Pipeco's product range (GRP, pressed steel, stainless steel
sectional tanks), turnkey capabilities, mining refuge chambers, industries served,
selected installations and a quotation enquiry flow.

## 2. Technology stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript** (strict)
- **Tailwind CSS 3.4** — design tokens in `tailwind.config.ts`
- **Motion** (`motion/react`) via the in-repo `engine/motion` system
- **lucide-react** icons · self-hosted Google fonts (**Archivo** + **IBM Plex Sans**)
- **next/image** for optimised photography
- Quote submissions proxied through a **Next.js Route Handler** to a webhook (GoHighLevel-style)

No database. No client-side secrets.

## 3. Installation

```bash
npm install
```

Node 18+ recommended.

## 4. Local development

```bash
npm run dev        # http://localhost:3000
```

Optional local env (see §9): create `.env.local` from `.env.example`.

## 5. Production build

```bash
npm run build      # production build + type-check + lint
npm run start      # serve the production build
npm run lint       # eslint only
```

## 6. Project structure

```text
pipeco-tanks/
├── app/
│   ├── api/quote/route.ts     # secure server-side quote → webhook proxy
│   ├── layout.tsx             # fonts, metadata, JSON-LD, header/footer
│   ├── page.tsx               # renders views/homepage
│   ├── robots.ts  sitemap.ts
│   └── globals.css
├── components/
│   ├── layout/                # Container
│   ├── sections/              # homepage sections (hero, tank-solutions, capabilities,
│   │                          #   refuge-chambers, industries, installations,
│   │                          #   why-pipeco, final-cta)
│   ├── funnel/                # quote form (lead-capture)
│   ├── ui/                    # button, logo, placeholder, section-intro
│   ├── site-header.tsx        # navigation
│   └── site-footer.tsx
├── config/                    # all copy/content + settings (see list below)
├── engine/motion/             # approved motion primitives (Reveal, Stagger, hero…)
├── lib/                       # metadata.ts, schema.ts
├── public/
│   ├── brand/pipeco-logo.png  # official logo (only brand asset)
│   └── images/                # photography, organised per section (see §7)
├── views/homepage.tsx         # section composition / order
├── docs/reference/            # onboarding PDF + original reference screenshots
├── IMAGE-UPLOAD-GUIDE.md      # where each photo goes + how to wire it
├── .env.example               # env placeholders (no secrets)
└── package.json  next.config.js  tailwind.config.ts  tsconfig.json
```

Config files (`config/`): `site-config.ts`, `homepage-config.ts`, `products-config.ts`,
`image-config.ts`, `seo-config.ts`, `quote-config.ts`, `navigation-config.ts`.

## 7. Image management

All imagery is driven from one registry: **`config/image-config.ts`**. Each slot either
shows a real photo (`src` set) or a labelled placeholder (`src: null`). Photos live under
`public/images/` in a per-section folder structure
(`homepage/`, `products/`, `mining-refuge-chambers/`, `projects/`, `turnkey-solutions/`,
`company/`). To publish a photo: drop it in the matching folder and set `src` on the slot.

See **[IMAGE-UPLOAD-GUIDE.md](./IMAGE-UPLOAD-GUIDE.md)** for the full folder → slot map and
recommended formats/ratios.

## 8. Quotation form architecture

- The client form (`components/funnel/quote-form.tsx`) posts JSON to **`/api/quote`**.
- The browser **never** calls the webhook directly.
- `app/api/quote/route.ts` (server) validates + sanitises input, applies a honeypot and a
  best-effort rate limit, and forwards the enquiry to the webhook with a server-side timeout.
- Client **and** server validation, product-specific tank-type preselection
  (`/?tank=grp#contact`), and loading / success / error states.
- **Fail-safe:** if the webhook env var is not set, submissions return a clear error and are
  **never** faked as successful or silently dropped.

## 9. Environment variables

| Variable | Scope | Purpose |
|---|---|---|
| `PIPECO_QUOTE_WEBHOOK_URL` | **server-only** | Destination for validated quote enquiries. Never prefix with `NEXT_PUBLIC_`; never commit the real value. |

Set it in **Vercel → Project → Settings → Environment Variables** and in local `.env.local`.
`.env.example` contains placeholders only. Until it is configured, the quote form fails safe.

## 10. GitHub & Vercel workflow

- **Repo:** `bbettr-agency/pipeco-tanks`
- **Development branch:** `homepage` — pushes trigger **Preview** deployments on Vercel.
- **Vercel project:** `pipeco-tanks` (Bbettr Projects team). The repo is connected via Vercel's
  Git integration; framework auto-detects Next.js.
- `main` is kept intact; **no force-pushes**.
- The live WordPress site (`pipecoza.com`) and its DNS are **not** touched by this project.

```bash
git add -A
git commit -m "…"
git push origin homepage      # → Vercel preview deployment
```

## 11. Outstanding before launch

- [ ] **Configure `PIPECO_QUOTE_WEBHOOK_URL`** in Vercel + test an end-to-end submission.
- [ ] **Stainless steel** product photo (its folder is empty) — plus wire the
      **installations** section to real project photography (still placeholders).
- [ ] Confirm verifiable claims with Pipeco (certifications, capacities, standards, operating
      hours, nameable projects, the mining refuge-chamber survival figure).
- [ ] Decide the production domain / go-live plan (no DNS change made yet).
- [ ] Final client review sign-off.
