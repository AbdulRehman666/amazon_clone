import Link from "next/link";
import Image from "next/image";
import StarRating from "@/components/StarRating";
import QuickAddButton from "@/components/QuickAddButton";
import { formatCents } from "@/lib/money";
import type { Product } from "@prisma/client";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const images = JSON.parse(product.images) as string[];
  const secondImage = images[1] && images[1] !== images[0] ? images[1] : null;
  const discountPct = product.listPriceCents
    ? Math.round(100 - (product.priceCents / product.listPriceCents) * 100)
    : null;

  return (
    <div
      className="group relative flex h-full flex-col animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="relative mb-3 aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-line/60 to-line/20 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
        <Link href={`/product/${product.slug}`} className="relative block h-full w-full">
          <Image
            src={images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 260px"
            priority={index < 4}
            className={`object-cover transition-all duration-500 ease-out group-hover:scale-110 ${
              secondImage ? "group-hover:opacity-0" : ""
            }`}
          />
          {secondImage && (
            <Image
              src={secondImage}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 260px"
              className="absolute inset-0 object-cover opacity-0 scale-110 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
            />
          )}
        </Link>

        {discountPct && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-brand to-accent2 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
            −{discountPct}%
          </span>
        )}

        <QuickAddButton productId={product.id} />
      </div>

      <Link href={`/product/${product.slug}`} className="flex flex-1 flex-col">
        <p className="text-[11px] uppercase tracking-wide text-muted">{product.brand}</p>
        <p className="line-clamp-2 text-sm text-ink transition-colors group-hover:text-brand">
          {product.title}
        </p>
        <div className="mt-1">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-semibold text-ink">{formatCents(product.priceCents)}</span>
          {product.listPriceCents && (
            <span className="text-sm text-muted line-through">
              {formatCents(product.listPriceCents)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
