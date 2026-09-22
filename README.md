# amazan — a from-scratch Amazon rebuild

A full-stack e-commerce storefront rebuilding the core Amazon shopping experience:
browse, search & filter, product detail, cart, sign-up/sign-in, checkout, and order
history. Built with Next.js 16 (App Router, Server Actions), Prisma + SQLite, and
Tailwind CSS.

## What's here (and why)

Given the time box, I prioritized the **golden path a shopper actually walks**: land on
the homepage → search or browse a category → open a product → add to cart → sign up →
pay → see the order in your history. Everything below exists to make that path feel
real, not decorative.

- **Catalog**: 27 seeded products across 6 categories, with real (rights-cleared)
  Unsplash photography rather than placeholder boxes, ratings, review counts, and
  strikethrough list prices.
- **Search & filters**: full-text search across title/brand/description, department
  filter, price-cap filter, and 5 sort orders — all via server-rendered query params, so
  every filtered view is a shareable/bookmarkable URL (the same reason Amazon's own
  search results are plain GET requests).
- **Cart**: guest-friendly. It lives in an httpOnly cookie, not a database row, so
  browsing and adding to cart never requires an account — matching how Amazon treats a
  visitor's cart before they check out.
- **Auth**: email/password with hashed passwords (bcrypt) and a signed JWT session
  cookie (jose). Account is only required at checkout, mirroring Amazon's own gate.
- **Checkout**: single-page shipping + payment form (see "left out" below for why it's
  one page, not Amazon's multi-step wizard), computes tax/shipping/total, and creates a
  real order record.
- **Orders**: order history and order detail pages, scoped to the signed-in user.

### Deliberately left out

These are real Amazon features I chose not to build, because they don't sit on the
core path and each would have cost more time than the polish on what's above was worth:

- **Reviews you can write.** Ratings/counts are seeded and displayed, but there's no
  review submission flow — that's a second content system (moderation, verified
  purchase, helpful votes) orthogonal to buying something.
- **Multi-step checkout wizard.** Real Amazon is address → payment → review as three
  page loads. I collapsed it to one page with two sections, because the interesting
  problem (does the order get created correctly, are totals right, is it behind an auth
  gate) doesn't need three round trips to prove out.
- **Real payments.** Card fields are collected and validated for shape, but only the
  brand and last 4 digits are ever persisted — no card processor is wired up, and the
  fields are clearly labeled as a demo.
- **Seller marketplace, wishlists, recommendations, multiple addresses/payment
  methods, product variants (size/color).** All real, all secondary to "can you buy a
  thing."

## Stack notes

- **Next.js 16** — this ships breaking changes from the Next.js most training data
  knows (Prisma-style: `middleware.ts` is now `proxy.ts`/`export function proxy`,
  route `params`/`searchParams` are `Promise`s you `await`, and there's a dedicated
  `next typegen` command for the generated `PageProps`/`LayoutProps` helpers used
  throughout this repo). The framework's own bundled docs
  (`node_modules/next/dist/docs/`) were read before writing route code.
- **Prisma** — pinned to the classic `5.x` CLI/client. The `latest` tag has moved to an
  entirely different "Developer Platform" CLI (`prisma deploy`, `prisma project`, cloud
  auth) aimed at Prisma's hosted product, not a local schema/migrate/generate workflow —
  wrong tool for this project, so `prisma@5` and `@prisma/client@5` are pinned
  explicitly in `package.json`.

## Running it locally

```bash
npm install
npm run db:push      # creates prisma/dev.db from schema.prisma
npm run db:seed       # seeds categories + products
npm run dev            # http://localhost:3000
```

Copy `.env.example` to `.env` first (or use the one committed for local dev — see
below) with `DATABASE_URL` and `AUTH_SECRET` set.

## Deploying

The app uses SQLite via Prisma on the local filesystem, which needs a **persistent
disk** — this rules out purely serverless hosts (Vercel's default) unless you swap the
datasource to Postgres. The fastest path to a live link:

1. **Railway / Render / Fly.io** (recommended): these run your app in a long-lived
   container with a persistent volume, so SQLite works unmodified. Set `DATABASE_URL`
   and `AUTH_SECRET` as environment variables, and run `npm run db:push && npm run
   db:seed` once after first deploy (or in a release/start hook).
2. **Vercel**: works if you swap `provider = "sqlite"` to `provider = "postgresql"` in
   `prisma/schema.prisma` and point `DATABASE_URL` at a Postgres instance (Vercel
   Postgres or Neon both have a one-click free tier) — Prisma's schema and application
   code don't otherwise change.

## Agent capture

This repo was built with Claude Code, with prompt/response capture wired up per the
assignment brief. See [`CAPTURE-TEST.md`](CAPTURE-TEST.md) for how the hook works and
how it was verified, and [`.agent-logs/`](.agent-logs/) for the raw session logs.
