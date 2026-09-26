import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

const CATEGORY_ICONS: Record<string, string> = {
  electronics: "⚡",
  "home-kitchen": "🏡",
  fashion: "👗",
  beauty: "✨",
  "toys-games": "🎲",
  "sports-outdoors": "🏕️",
};

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      products: {
        take: 1,
        orderBy: { reviewCount: "desc" },
      },
    },
  });

  const featured = await prisma.product.findMany({
    orderBy: { reviewCount: "desc" },
    take: 8,
  });

  const spotlight = featured[0];
  const spotlightImage = spotlight ? (JSON.parse(spotlight.images) as string[])[0] : null;

  return (
    <div className="overflow-x-clip pb-24">
      <section className="relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden
          className="animate-gradient pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-brand/40 via-accent2/30 to-transparent blur-3xl"
        />
        <div
          aria-hidden
          className="animate-gradient pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-gradient-to-br from-accent2/30 to-brand/20 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 sm:pb-20 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
              New season
            </p>
            <h1 className="mt-3 font-display text-5xl italic leading-[1.05] sm:text-7xl">
              Things worth
              <br />
              <span className="bg-gradient-to-r from-brand via-orange-300 to-accent2 bg-clip-text not-italic text-transparent">
                keeping.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-white/60">
              A small, considered catalog across electronics, home, fashion, and more —
              picked for quality, not volume.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/s"
                className="rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand/30 transition-transform hover:scale-105"
              >
                Shop everything
              </Link>
              <Link
                href={`/s?category=${categories[0]?.slug ?? ""}`}
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-white/50"
              >
                Browse {categories[0]?.name ?? "categories"}
              </Link>
            </div>
          </div>

          {spotlight && spotlightImage && (
            <Link
              href={`/product/${spotlight.slug}`}
              className="group relative block aspect-[4/3] animate-fade-up overflow-hidden rounded-[2rem] bg-white/5 shadow-2xl shadow-black/40 [animation-delay:150ms]"
            >
              <Image
                src={spotlightImage}
                alt={spotlight.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover transition duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-ink/80 px-4 py-3 text-paper backdrop-blur transition-transform duration-300 group-hover:-translate-y-1">
                <p className="line-clamp-1 text-sm font-medium">{spotlight.title}</p>
                <p className="text-xs text-white/50">Most loved this month</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/s?category=${c.slug}`}
              style={{ animationDelay: `${i * 50}ms` }}
              className="animate-fade-up flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-md"
            >
              <span>{CATEGORY_ICONS[c.slug] ?? "•"}</span>
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl italic">Most loved right now</h2>
          <Link href="/s" className="text-sm text-brand hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
