# Marlo — an original storefront concept

A full-stack e-commerce storefront with its own product and visual design: browse,
search & filter, product detail, cart, sign-up/sign-in, checkout, order history, and a
role-gated admin console for order fulfillment and catalog management. Built with
Next.js 16 (App Router, Server Actions), Prisma + SQLite, and Tailwind CSS.

This started as a literal Amazon clone, then was reworked at the reviewer's request into
an original interface: same idea (a small, considered catalog storefront) and the same
real, connected backend, but its own layout, typography, and visual language rather than
an Amazon skin.

## What's here (and why)

The **golden path a shopper actually walks**: land on the homepage → search or browse a
category → open a product → add to cart → sign up → pay → see the order in your history.
On top of that, a second path for the store side: an admin signs in → sees every order
on a Kanban board by fulfillment stage → moves orders along → manages the catalog.

- **Catalog**: 28+ products across 6 categories, real (rights-cleared) photography,
  ratings, review counts, and strikethrough list prices.
- **Search & filters**: full-text search across title/brand/description, department
  filter, price-cap filter, and 5 sort orders — all via server-rendered query params, so
  every filtered view is a shareable/bookmarkable URL.
- **Cart**: guest-friendly. It lives in an httpOnly cookie, not a database row, so
  browsing and adding to cart never requires an account.
- **Auth**: email/password with hashed passwords (bcrypt) and a signed JWT session
  cookie (jose), carrying a `role` claim (`customer` | `admin`). Account is only
  required at checkout; admin routes are only reachable by the `admin` role.
- **Checkout**: single-page shipping + payment form, computes tax/shipping/total, and
  creates a real order record with status `pending`.
- **Orders**: customers see their order history and a live status badge (Pending → In
  Progress → Shipped → Completed) that updates the moment an admin moves it.
- **Admin — orders**: a Kanban board (`/admin/orders`) with one column per status.
  Each order card moves forward/back a stage with a single click; the customer's own
  order page reflects the change immediately.
- **Admin — products**: full CRUD (`/admin/products`) — create, edit (title, brand,
  category, price, list price, stock, description, highlights, image URLs), and delete.

### Deliberately left out

- **Reviews you can write.** Ratings/counts are seeded and displayed, but there's no
  review submission flow.
- **Multi-step checkout wizard.** Collapsed to one page with two sections; the
  interesting problem (order creation, totals, the auth gate) doesn't need three round
  trips to prove out.
- **Real payments.** Card fields are collected and validated for shape, but only the
  brand and last 4 digits are ever persisted.
- **Drag-and-drop on the Kanban board.** Orders move stage via an explicit button, not a
  drag gesture — same outcome, far less client-side complexity and no failure mode where
  a drop silently doesn't register.
- **Image uploads.** Admins paste an image URL rather than uploading a file — no blob
  storage is wired up. `next/image` optimization is disabled (`unoptimized: true`) since
  an admin-editable catalog can point at literally any host.
- **Seller marketplace, wishlists, recommendations, multiple addresses/payment
  methods, product variants (size/color).**

## Stack notes

- **Next.js 16** — ships breaking changes from the Next.js most training data knows:
  `middleware.ts` is now `proxy.ts`/`export function proxy`, route `params`/
  `searchParams` are `Promise`s you `await`, and there's a dedicated `next typegen`
  command for the generated `PageProps`/`LayoutProps` helpers used throughout this repo.
  The framework's own bundled docs (`node_modules/next/dist/docs/`) were read before
  writing route code.
- **Prisma** — pinned to the classic `5.x` CLI/client. The `latest` tag has moved to an
  entirely different "Developer Platform" CLI (`prisma deploy`, `prisma project`, cloud
  auth) aimed at Prisma's hosted product, not a local schema/migrate/generate workflow.

## Running it locally

```bash
npm install
npm run db:push      # creates prisma/dev.db from schema.prisma
npm run db:seed      # seeds categories, products, and an admin user
npm run dev          # http://localhost:3000
```

Copy `.env.example` to `.env` first with `DATABASE_URL` and `AUTH_SECRET` set.

### Admin login

The seed script creates one admin account:

- Email: `admin@marlo.test`
- Password: `AdminPass123!`

Override with `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars before seeding. **Change this
password (or delete/reseed the admin user) before deploying anywhere public.**

## Deploying

The app uses SQLite via Prisma on the local filesystem, which needs a **persistent
disk** — this rules out purely serverless hosts (Vercel's default) unless you swap the
datasource to Postgres.

1. **Railway / Render / Fly.io**: run the DB setup at **start time**, not build time —
   most native-runtime plans build and run in separate containers/filesystems, so a
   `prisma db push`/`db seed` done during the build step won't exist when the app
   actually starts. Start Command: `npm run db:push && npm run db:seed && npm run start`.
2. **Vercel**: swap `provider = "sqlite"` to `provider = "postgresql"` in
   `prisma/schema.prisma` and point `DATABASE_URL` at a Postgres instance (Vercel
   Postgres or Neon both have a one-click free tier).

## Agent capture

This repo was built with Claude Code, with prompt/response capture wired up per the
assignment brief. See [`CAPTURE-TEST.md`](CAPTURE-TEST.md) for how the hook works and
how it was verified, and [`.agent-logs/`](.agent-logs/) for the raw session logs.
