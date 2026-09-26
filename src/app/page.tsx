import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

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
    <div className="pb-20">
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand">New season</p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-6xl">
              Things worth
              <br />
              keeping.
            </h1>
            <p className="mt-4 max-w-md text-muted">
              A small, considered catalog across electronics, home, fashion, and more —
              picked for quality, not volume.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/s"
                className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper hover:bg-brand"
              >
                Shop everything
              </Link>
              <Link
                href={`/s?category=${categories[0]?.slug ?? ""}`}
                className="rounded-full border border-line px-6 py-3 text-sm font-medium hover:border-ink"
              >
                Browse {categories[0]?.name ?? "categories"}
              </Link>
            </div>
          </div>

          {spotlight && spotlightImage && (
            <Link
              href={`/product/${spotlight.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-line/40"
            >
              <Image
                src={spotlightImage}
                alt={spotlight.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-surface/90 px-4 py-3 backdrop-blur">
                <p className="line-clamp-1 text-sm font-medium">{spotlight.title}</p>
                <p className="text-xs text-muted">Most loved this month</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/s?category=${c.slug}`}
              className="rounded-full border border-line px-4 py-2 text-sm hover:border-ink"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl">Most loved right now</h2>
          <Link href="/s" className="text-sm text-brand hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
