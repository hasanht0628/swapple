# Swapple

> Point. Scan. Swap up.

Swapple is a mobile-first web app that scans any product, shelf, or cart and
returns nutritional verdicts (**good / caution / avoid**) tuned to your personal
health priorities, with better-brand recommendations.

This repository contains the **foundation and architecture**: Next.js App Router
scaffold, design-system tokens, Supabase auth/DB/storage wiring, the two-pass
OpenAI scan flow, product-data enrichment, Stripe billing, and all API routes.
The polished visual screens are intentionally left as minimal placeholders for a
follow-up UI pass (search for `TODO(ui)`).

## Tech stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS v4**
- **Supabase** — magic-link auth, Postgres, Storage (`scan-images`)
- **OpenAI** SDK — server-side vision analysis (two-pass)
- **Stripe** — `$9/mo` "Swapple Plus" subscription
- **Zod** — runtime validation + structured-output schema

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your keys (see below)
npm run dev
```

Open http://localhost:3000.

### Environment variables

All required vars are documented in [`.env.example`](./.env.example):

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | Base URL for Stripe redirects |
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | **secret** | Service-role key (Stripe webhook) |
| `OPENAI_API_KEY` | **secret** | OpenAI vision calls (server-only) |
| `OPENAI_SCAN_MODEL` | optional | Override vision model (default `gpt-4o`) |
| `STRIPE_SECRET_KEY` | **secret** | Stripe API |
| `STRIPE_WEBHOOK_SECRET` | **secret** | Verify webhook signatures |
| `STRIPE_PRICE_ID` | config | Price id for Swapple Plus |
| `USDA_FDC_API_KEY` | config | USDA FoodData Central enrichment |
| `GS1_API_BASE` / `GS1_API_KEY` | optional | GS1 barcode lookup adapter |

### Database setup

Apply the migration in [`supabase/migrations/0001_init.sql`](./supabase/migrations/0001_init.sql)
to your Supabase project (via the Supabase SQL editor or `supabase db push`).
It creates the enums, tables, indexes, RLS policies, the new-user trigger, and
the private `scan-images` storage bucket with per-user policies.

## Project structure

```text
app/
  (marketing)/        # public landing (no auth)
  (auth)/             # sign-in + /auth/callback
  (onboarding)/       # intro -> priorities -> confirm
  (app)/              # signed-in shell: home, capture, scans, tracker, profile
  api/                # scans, profile, stripe (checkout/portal/webhook)
lib/
  supabase/           # browser/server/middleware clients + storage
  openai/             # analyzeScan (two-pass), prompts, schema
  productData/        # OFF -> USDA -> GS1 -> model enrichment waterfall
  billing/            # stripe client + subscription gating
  auth/               # requireUser
  priorities.ts, verdicts.ts, disclaimer.ts, scans.ts
types/                # database, scan, productData
supabase/             # migrations + seed.sql
middleware.ts         # session refresh + auth/onboarding redirects
```

## Scan flow (POST /api/scans)

1. Authenticate + load profile (priorities, subscription).
2. Upload the image to Supabase Storage (`scan-images`, per-user prefix).
3. Insert a `scans` row (`status=processing`).
4. **Pass 1** — OpenAI identifies items (names, brands, barcodes).
5. Enrich each item: Open Food Facts → USDA → GS1 → model fallback.
6. **Pass 2** — OpenAI analyzes items with enriched data + priorities.
7. Validate against the JSON schema, persist `scan_items`, complete the scan.
8. Return a gated DTO.

## Gating rules

- Free users always get `verdict`, `free_reason`, and `general_principle`. No
  scan limits.
- **`good`** items: full detail (`detailed_reason`, `priority_tradeoffs`,
  `brand_recommendations`) is **always free**.
- **`caution` / `avoid`** items: those detail fields are **paid-only** and are
  omitted from API responses for free users (`locked: true`).

> We never accept payment from brands. Your subscription is the only thing that
> funds our rankings — so they answer to you.

_Swapple provides nutritional food guidance only. This is not medical advice._

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
