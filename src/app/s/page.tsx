import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import SortSelect from "@/components/SortSelect";
import type { Prisma } from "@prisma/client";

const SORTS = {
  featured: { label: "Featured", orderBy: { reviewCount: "desc" } as Prisma.ProductOrderByWithRelationInput },
  price_asc: { label: "Price: Low to High", orderBy: { priceCents: "asc" } as Prisma.ProductOrderByWithRelationInput },
  price_desc: { label: "Price: High to Low", orderBy: { priceCents: "desc" } as Prisma.ProductOrderByWithRelationInput },
  rating: { label: "Avg. Customer Review", orderBy: { rating: "desc" } as Prisma.ProductOrderByWithRelationInput },
  newest: { label: "Newest Arrivals", orderBy: { createdAt: "desc" } as Prisma.ProductOrderByWithRelationInput },
};

type SortKey = keyof typeof SORTS;

export default async function SearchPage({
  searchParams,
}: PageProps<"/s">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const categorySlug = typeof sp.category === "string" ? sp.category : undefined;
  const maxPrice = typeof sp.maxPrice === "string" ? Number(sp.maxPrice) : undefined;
  const sortKey: SortKey = (typeof sp.sort === "string" && sp.sort in SORTS ? sp.sort : "featured") as SortKey;

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  const where: Prisma.ProductWhereInput = {
    ...(q
      ? {
          OR: [
            { title: { contains: q } },
            { brand: { contains: q } },
            { description: { contains: q } },
          ],
        }
      : {}),
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    ...(maxPrice ? { priceCents: { lte: maxPrice } } : {}),
  };

  const products = await prisma.product.findMany({
    where,
    orderBy: SORTS[sortKey].orderBy,
  });

  function buildHref(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (categorySlug) params.set("category", categorySlug);
    if (maxPrice) params.set("maxPrice", String(maxPrice));
    if (sortKey !== "featured") params.set("sort", sortKey);
    for (const [k, v] of Object.entries(overrides)) {
      if (v === undefined) params.delete(k);
      else params.set(k, v);
    }
    return `/s?${params.toString()}`;
  }

  const priceCaps = [2500, 5000, 10000, 25000];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <p className="mb-4 text-sm text-gray-700">
        {products.length} results {q && <>for &quot;{q}&quot;</>}
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="w-full shrink-0 md:w-56">
          <h3 className="mb-2 font-bold">Department</h3>
          <ul className="mb-6 space-y-1 text-sm">
            <li>
              <Link
                href={buildHref({ category: undefined })}
                className={`hover:underline ${!categorySlug ? "font-bold text-price" : "text-link"}`}
              >
                All Departments
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={buildHref({ category: c.slug })}
                  className={`hover:underline ${categorySlug === c.slug ? "font-bold text-price" : "text-link"}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mb-2 font-bold">Price</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href={buildHref({ maxPrice: undefined })}
                className={`hover:underline ${!maxPrice ? "font-bold text-price" : "text-link"}`}
              >
                Any price
              </Link>
            </li>
            {priceCaps.map((cap) => (
              <li key={cap}>
                <Link
                  href={buildHref({ maxPrice: String(cap) })}
                  className={`hover:underline ${maxPrice === cap ? "font-bold text-price" : "text-link"}`}
                >
                  Under ${(cap / 100).toFixed(0)}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-end gap-2 text-sm">
            <span className="text-gray-600">Sort by:</span>
            <SortSelect current={sortKey} />
          </div>

          {products.length === 0 ? (
            <p className="rounded bg-white p-8 text-center text-gray-600 shadow">
              No results found. Try a different search or clear filters.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
