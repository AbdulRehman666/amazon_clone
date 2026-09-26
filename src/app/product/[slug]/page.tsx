import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import StarRating from "@/components/StarRating";
import AddToCartForm from "@/components/AddToCartForm";
import ProductCard from "@/components/ProductCard";

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
  if (!product) notFound();

  const images = JSON.parse(product.images) as string[];
  const bullets = JSON.parse(product.bullets) as string[];

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    take: 4,
  });

  const discountPct = product.listPriceCents
    ? Math.round(100 - (product.priceCents / product.listPriceCents) * 100)
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>{" "}
        /{" "}
        <Link href={`/s?category=${product.category.slug}`} className="hover:text-ink">
          {product.category.name}
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid grid-cols-[80px_1fr] gap-3">
          <div className="hidden flex-col gap-3 sm:flex">
            {images.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-line/40">
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-line/40">
            <Image
              src={images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              className="object-cover"
              priority
            />
            {discountPct && (
              <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-medium text-paper">
                −{discountPct}%
              </span>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-muted">{product.brand}</p>
          <h1 className="mt-1 font-display text-3xl leading-tight">{product.title}</h1>
          <div className="mt-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="lg" />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-medium">{formatCents(product.priceCents)}</span>
            {product.listPriceCents && (
              <span className="text-lg text-muted line-through">
                {formatCents(product.listPriceCents)}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-success">In stock · ships in 1-2 days</p>

          <div className="mt-6 rounded-2xl border border-line p-5">
            <AddToCartForm productId={product.id} />
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted">
              Highlights
            </h2>
            <ul className="space-y-2 text-sm text-ink">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-line pt-6 text-sm text-muted">
            <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted">
              Description
            </h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-display text-2xl">You might also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
