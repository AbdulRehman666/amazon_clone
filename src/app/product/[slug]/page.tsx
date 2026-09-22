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
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 text-sm text-gray-600">
        <Link href="/" className="hover:underline hover:text-link">
          Home
        </Link>{" "}
        &rsaquo;{" "}
        <Link href={`/s?category=${product.category.slug}`} className="hover:underline hover:text-link">
          {product.category.name}
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,420px)_1fr_320px]">
        <div className="flex gap-3">
          <div className="hidden flex-col gap-2 sm:flex">
            {images.map((src, i) => (
              <div
                key={i}
                className="relative h-16 w-16 overflow-hidden rounded border border-gray-300 bg-gray-50"
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-50">
            <Image
              src={images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-link hover:underline">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-medium">{product.title}</h1>
          <div className="mt-2 flex items-center gap-2 border-b border-gray-200 pb-3">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="lg" />
          </div>

          <div className="mt-3 space-y-1">
            {discountPct && (
              <p className="text-lg text-price">
                -{discountPct}%{" "}
                <span className="text-sm text-gray-500 line-through">
                  {formatCents(product.listPriceCents!)}
                </span>
              </p>
            )}
            <p className="flex items-baseline gap-1">
              <span className="text-sm">$</span>
              <span className="text-3xl">{(product.priceCents / 100).toFixed(2).split(".")[0]}</span>
              <span className="text-sm">{(product.priceCents / 100).toFixed(2).split(".")[1]}</span>
            </p>
            <p className="text-xs text-gray-600">
              Prices include VAT. FREE delivery <b>tomorrow</b> if you order within the next few
              hours.
            </p>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <h2 className="mb-2 font-bold">About this item</h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-gray-800">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4 text-sm text-gray-800">
            <h2 className="mb-2 font-bold">Product description</h2>
            <p>{product.description}</p>
          </div>
        </div>

        <div className="h-fit rounded-md border border-gray-200 p-4 shadow-sm">
          <p className="flex items-baseline gap-1">
            <span className="text-sm">$</span>
            <span className="text-2xl">{(product.priceCents / 100).toFixed(2).split(".")[0]}</span>
            <span className="text-sm">{(product.priceCents / 100).toFixed(2).split(".")[1]}</span>
          </p>
          <p className="text-sm text-success">In Stock</p>
          <p className="mt-1 text-sm text-gray-700">
            FREE delivery <b>tomorrow</b>.
            <br />
            Ships from and sold by amazan.
          </p>

          <AddToCartForm productId={product.id} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold">Related products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
