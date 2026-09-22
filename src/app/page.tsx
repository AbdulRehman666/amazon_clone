import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      products: {
        take: 4,
        orderBy: { reviewCount: "desc" },
      },
    },
  });

  const featured = await prisma.product.findMany({
    orderBy: { reviewCount: "desc" },
    take: 8,
  });

  return (
    <div className="bg-background pb-16">
      <div className="relative h-[260px] w-full overflow-hidden bg-gradient-to-b from-[#232f3e] to-background sm:h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1600&q=70&auto=format&fit=crop"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="-mt-24 grid grid-cols-1 gap-4 sm:-mt-32 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((cat) => (
            <div key={cat.id} className="rounded-md bg-white p-4 shadow">
              <h2 className="mb-3 text-xl font-bold">{cat.name}</h2>
              <div className="grid grid-cols-2 gap-2">
                {cat.products.slice(0, 4).map((p) => {
                  const images = JSON.parse(p.images) as string[];
                  return (
                    <Link key={p.id} href={`/product/${p.slug}`} className="block">
                      <div className="relative aspect-square w-full overflow-hidden rounded bg-gray-50">
                        <Image src={images[0]} alt={p.title} fill sizes="150px" className="object-cover" />
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link
                href={`/s?category=${cat.slug}`}
                className="mt-3 inline-block text-sm text-link hover:underline"
              >
                Shop {cat.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-md bg-white p-4 shadow">
          <h2 className="mb-4 text-xl font-bold">Best sellers in amazan</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(4).map((cat) => (
            <div key={cat.id} className="rounded-md bg-white p-4 shadow">
              <h2 className="mb-3 text-xl font-bold">{cat.name}</h2>
              <div className="grid grid-cols-2 gap-2">
                {cat.products.slice(0, 4).map((p) => {
                  const images = JSON.parse(p.images) as string[];
                  return (
                    <Link key={p.id} href={`/product/${p.slug}`} className="block">
                      <div className="relative aspect-square w-full overflow-hidden rounded bg-gray-50">
                        <Image src={images[0]} alt={p.title} fill sizes="150px" className="object-cover" />
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link
                href={`/s?category=${cat.slug}`}
                className="mt-3 inline-block text-sm text-link hover:underline"
              >
                Shop {cat.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
